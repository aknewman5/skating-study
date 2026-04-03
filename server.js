// ══════════════════════════════════════════════════════════════════════════════
// FIGURE SKATING STUDY ASSISTANT — SERVER
// Feedback, Review, Notification & Email Digest System
// ══════════════════════════════════════════════════════════════════════════════

const express = require("express");
const path = require("path");
const Anthropic = require("@anthropic-ai/sdk");
const Database = require("better-sqlite3");
const fs = require("fs");

const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const CONFIG = {
  PORT: process.env.PORT || 3000,
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY || "",
  MODEL: "claude-sonnet-4-20250514",
  // Admin password for review dashboard (set in Render env vars)
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "admin2026",
  // Optional SendGrid email digest
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || "",
  EMAIL_TO: process.env.EMAIL_TO || "",
  EMAIL_FROM: process.env.EMAIL_FROM || "noreply@skatestudy.app",
};

// ─── DATABASE SETUP ──────────────────────────────────────────────────────────
const db = new Database(path.join(__dirname, "feedback.db"));
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

// Create tables
db.exec(`
  -- Feedback submissions from candidates
  CREATE TABLE IF NOT EXISTS feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    category TEXT,
    mode TEXT,
    issue TEXT NOT NULL,
    correction TEXT,
    ai_response TEXT,
    trigger_message TEXT,
    feedback_type TEXT DEFAULT 'report',  -- 'report' | 'dispute' | 'suggestion'
    status TEXT DEFAULT 'pending',        -- 'pending' | 'accepted' | 'rejected' | 'deferred'
    reviewer_notes TEXT,
    reviewed_by TEXT,
    reviewed_at TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );

  -- Notifications for candidates when feedback is reviewed
  CREATE TABLE IF NOT EXISTS notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    feedback_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    read INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (feedback_id) REFERENCES feedback(id)
  );

  -- Changelog entries — public-facing resolved items
  CREATE TABLE IF NOT EXISTS changelog (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    feedback_id INTEGER,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT,
    change_type TEXT DEFAULT 'fix',  -- 'fix' | 'improvement' | 'new'
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (feedback_id) REFERENCES feedback(id)
  );

  -- Email digest tracking
  CREATE TABLE IF NOT EXISTS email_digest_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sent_at TEXT DEFAULT (datetime('now')),
    feedback_count INTEGER,
    recipient TEXT
  );

  -- Candidate progress tracking (persists across sessions, keyed by username)
  CREATE TABLE IF NOT EXISTS progress (
    username TEXT PRIMARY KEY,
    data TEXT NOT NULL DEFAULT '{}',
    updated_at TEXT DEFAULT (datetime('now'))
  );
`);

// Create indexes for performance
db.exec(`
  CREATE INDEX IF NOT EXISTS idx_feedback_status ON feedback(status);
  CREATE INDEX IF NOT EXISTS idx_feedback_username ON feedback(username);
  CREATE INDEX IF NOT EXISTS idx_notifications_username ON notifications(username);
  CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(username, read);
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS content_overrides (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    category TEXT NOT NULL,
    data TEXT NOT NULL,
    updated_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS content_framework (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    content TEXT NOT NULL,
    updated_at TEXT DEFAULT (datetime('now'))
  );
`);

// ─── LOAD DEFAULT CONTENT FROM app.jsx ──────────────────────────────────────
let QUESTION_BANK_DEFAULTS = { mc_questions: [], flashcards: [] };
try {
  const appContent = fs.readFileSync(path.join(__dirname, "public", "app.jsx"), "utf8");
  const startIdx = appContent.indexOf("QUESTION_BANK = {");
  if (startIdx !== -1) {
    const objStart = appContent.indexOf("{", startIdx);
    let depth = 0, endIdx = -1;
    for (let i = objStart; i < appContent.length; i++) {
      if (appContent[i] === "{") depth++;
      if (appContent[i] === "}") depth--;
      if (depth === 0) { endIdx = i; break; }
    }
    if (endIdx > objStart) {
      QUESTION_BANK_DEFAULTS = eval("(" + appContent.substring(objStart, endIdx + 1) + ")");
      console.log(`Loaded ${QUESTION_BANK_DEFAULTS.mc_questions.length} quiz questions and ${QUESTION_BANK_DEFAULTS.flashcards.length} flashcards from app.jsx`);
    }
  }
} catch (e) {
  console.error("Failed to parse QUESTION_BANK from app.jsx:", e.message);
}

// ─── PREPARED STATEMENTS ─────────────────────────────────────────────────────
const stmts = {
  // Feedback
  insertFeedback: db.prepare(`
    INSERT INTO feedback (username, category, mode, issue, correction, ai_response, trigger_message, feedback_type)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `),
  getFeedbackById: db.prepare(`SELECT * FROM feedback WHERE id = ?`),
  getFeedbackByStatus: db.prepare(`SELECT * FROM feedback WHERE status = ? ORDER BY created_at DESC`),
  getAllFeedback: db.prepare(`SELECT * FROM feedback ORDER BY created_at DESC LIMIT ? OFFSET ?`),
  getFeedbackCount: db.prepare(`SELECT COUNT(*) as count FROM feedback`),
  getFeedbackCountByStatus: db.prepare(`SELECT status, COUNT(*) as count FROM feedback GROUP BY status`),
  getUserFeedback: db.prepare(`SELECT * FROM feedback WHERE username = ? ORDER BY created_at DESC`),
  reviewFeedback: db.prepare(`
    UPDATE feedback 
    SET status = ?, reviewer_notes = ?, reviewed_by = ?, reviewed_at = datetime('now'), updated_at = datetime('now')
    WHERE id = ?
  `),

  // Notifications
  insertNotification: db.prepare(`
    INSERT INTO notifications (username, feedback_id, title, message) VALUES (?, ?, ?, ?)
  `),
  getUserNotifications: db.prepare(`
    SELECT * FROM notifications WHERE username = ? ORDER BY created_at DESC LIMIT 50
  `),
  getUnreadCount: db.prepare(`
    SELECT COUNT(*) as count FROM notifications WHERE username = ? AND read = 0
  `),
  markRead: db.prepare(`UPDATE notifications SET read = 1 WHERE id = ? AND username = ?`),
  markAllRead: db.prepare(`UPDATE notifications SET read = 1 WHERE username = ? AND read = 0`),

  // Changelog
  insertChangelog: db.prepare(`
    INSERT INTO changelog (feedback_id, title, description, category, change_type) VALUES (?, ?, ?, ?, ?)
  `),
  getChangelog: db.prepare(`SELECT * FROM changelog ORDER BY created_at DESC LIMIT ?`),

  // Stats
  getFeedbackStats: db.prepare(`
    SELECT 
      category,
      COUNT(*) as total,
      SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
      SUM(CASE WHEN status = 'accepted' THEN 1 ELSE 0 END) as accepted,
      SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected,
      SUM(CASE WHEN status = 'deferred' THEN 1 ELSE 0 END) as deferred
    FROM feedback GROUP BY category
  `),

  // Progress
  getProgress: db.prepare(`SELECT data FROM progress WHERE username = ?`),
  upsertProgress: db.prepare(`
    INSERT INTO progress (username, data, updated_at) VALUES (?, ?, datetime('now'))
    ON CONFLICT(username) DO UPDATE SET data = excluded.data, updated_at = datetime('now')
  `),

  // Content overrides
  getAllOverrides: db.prepare(`SELECT * FROM content_overrides ORDER BY category, id`),
  getOverridesByType: db.prepare(`SELECT * FROM content_overrides WHERE type = ? ORDER BY category, id`),
  getOverride: db.prepare(`SELECT * FROM content_overrides WHERE id = ?`),
  upsertOverride: db.prepare(`
    INSERT INTO content_overrides (id, type, category, data, updated_at) VALUES (?, ?, ?, ?, datetime('now'))
    ON CONFLICT(id) DO UPDATE SET data = excluded.data, category = excluded.category, updated_at = datetime('now')
  `),
  deleteOverride: db.prepare(`DELETE FROM content_overrides WHERE id = ?`),

  // Framework override
  getFrameworkOverride: db.prepare(`SELECT content FROM content_framework WHERE id = 1`),
  upsertFramework: db.prepare(`
    INSERT INTO content_framework (id, content, updated_at) VALUES (1, ?, datetime('now'))
    ON CONFLICT(id) DO UPDATE SET content = excluded.content, updated_at = datetime('now')
  `),
};

// ══════════════════════════════════════════════════════════════════════════════
// API ROUTES — FEEDBACK
// ══════════════════════════════════════════════════════════════════════════════

// Submit feedback (from candidate)
app.post("/api/feedback", (req, res) => {
  try {
    const { username, category, mode, issue, correction, aiResponse, triggerMessage, type } = req.body;
    if (!issue || !username) {
      return res.status(400).json({ error: "Username and issue are required" });
    }
    const result = stmts.insertFeedback.run(
      username,
      category || null,
      mode || null,
      issue,
      correction || null,
      aiResponse || null,
      triggerMessage || null,
      type || "report"
    );
    res.json({ success: true, id: result.lastInsertRowid });
  } catch (e) {
    console.error("Feedback insert error:", e);
    res.status(500).json({ error: "Failed to save feedback" });
  }
});

// Submit auto-detected dispute
app.post("/api/feedback/dispute", (req, res) => {
  try {
    const { username, category, mode, triggerMessage, aiResponse } = req.body;
    const result = stmts.insertFeedback.run(
      username || "anonymous",
      category || null,
      mode || null,
      `Auto-detected dispute: ${triggerMessage?.slice(0, 300) || ""}`,
      null,
      aiResponse || null,
      triggerMessage || null,
      "dispute"
    );
    res.json({ success: true, id: result.lastInsertRowid });
  } catch (e) {
    console.error("Dispute insert error:", e);
    res.status(500).json({ error: "Failed to save dispute" });
  }
});

// Get user's own feedback history
app.get("/api/feedback/mine/:username", (req, res) => {
  try {
    const rows = stmts.getUserFeedback.all(req.params.username);
    res.json({ feedback: rows });
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch feedback" });
  }
});

// ══════════════════════════════════════════════════════════════════════════════
// API ROUTES — NOTIFICATIONS
// ══════════════════════════════════════════════════════════════════════════════

// Get notifications for a user
app.get("/api/notifications/:username", (req, res) => {
  try {
    const notifications = stmts.getUserNotifications.all(req.params.username);
    const unread = stmts.getUnreadCount.get(req.params.username);
    res.json({ notifications, unreadCount: unread.count });
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

// Mark a single notification as read
app.post("/api/notifications/:id/read", (req, res) => {
  try {
    const { username } = req.body;
    stmts.markRead.run(req.params.id, username);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: "Failed to mark notification" });
  }
});

// Mark all notifications as read
app.post("/api/notifications/read-all", (req, res) => {
  try {
    const { username } = req.body;
    stmts.markAllRead.run(username);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: "Failed to mark notifications" });
  }
});

// ══════════════════════════════════════════════════════════════════════════════
// API ROUTES — CHANGELOG
// ══════════════════════════════════════════════════════════════════════════════

app.get("/api/changelog", (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const entries = stmts.getChangelog.all(limit);
    res.json({ changelog: entries });
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch changelog" });
  }
});

// ══════════════════════════════════════════════════════════════════════════════
// API ROUTES — PROGRESS (per-candidate, persistent)
// ══════════════════════════════════════════════════════════════════════════════

// Get progress for a candidate
app.get("/api/progress/:username", (req, res) => {
  try {
    const row = stmts.getProgress.get(req.params.username);
    if (row) {
      res.json({ progress: JSON.parse(row.data) });
    } else {
      res.json({ progress: {} });
    }
  } catch (e) {
    console.error("Progress fetch error:", e);
    res.status(500).json({ error: "Failed to fetch progress" });
  }
});

// Save/update progress for a candidate
app.put("/api/progress/:username", (req, res) => {
  try {
    const { progress } = req.body;
    if (!progress || typeof progress !== "object") {
      return res.status(400).json({ error: "Progress object required" });
    }
    stmts.upsertProgress.run(req.params.username, JSON.stringify(progress));
    res.json({ success: true });
  } catch (e) {
    console.error("Progress save error:", e);
    res.status(500).json({ error: "Failed to save progress" });
  }
});

// ══════════════════════════════════════════════════════════════════════════════
// API ROUTES — ADMIN (password-protected)
// ══════════════════════════════════════════════════════════════════════════════

function requireAdmin(req, res, next) {
  const pw = req.headers["x-admin-password"] || req.query.pw;
  if (pw !== CONFIG.ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

// Get all feedback with pagination
app.get("/api/admin/feedback", requireAdmin, (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;
    const status = req.query.status;

    let rows;
    if (status && status !== "all") {
      rows = stmts.getFeedbackByStatus.all(status);
    } else {
      rows = stmts.getAllFeedback.all(limit, offset);
    }

    const total = stmts.getFeedbackCount.get();
    const statusCounts = stmts.getFeedbackCountByStatus.all();

    res.json({
      feedback: rows,
      total: total.count,
      statusCounts: Object.fromEntries(statusCounts.map(r => [r.status, r.count])),
    });
  } catch (e) {
    console.error("Admin feedback error:", e);
    res.status(500).json({ error: "Failed to fetch feedback" });
  }
});

// Get feedback stats
app.get("/api/admin/stats", requireAdmin, (req, res) => {
  try {
    const stats = stmts.getFeedbackStats.all();
    const statusCounts = stmts.getFeedbackCountByStatus.all();
    res.json({ byCategory: stats, byStatus: Object.fromEntries(statusCounts.map(r => [r.status, r.count])) });
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

// Review a feedback item (accept/reject/defer)
app.post("/api/admin/feedback/:id/review", requireAdmin, (req, res) => {
  try {
    const { status, reviewerNotes, reviewedBy, addToChangelog, changelogTitle, changelogDescription, changeType } = req.body;
    const id = parseInt(req.params.id);

    if (!["accepted", "rejected", "deferred"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    // Get the feedback item first
    const feedback = stmts.getFeedbackById.get(id);
    if (!feedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    // Update feedback status
    stmts.reviewFeedback.run(status, reviewerNotes || null, reviewedBy || "admin", id);

    // Create notification for the submitter
    const statusLabel = status === "accepted" ? "✅ Accepted" : status === "rejected" ? "❌ Not accepted" : "⏳ Deferred";
    const notifTitle = `Feedback ${statusLabel}`;
    const notifMessage = reviewerNotes
      ? `Your feedback about "${feedback.issue.slice(0, 80)}..." was reviewed.\n\nReviewer notes: ${reviewerNotes}`
      : `Your feedback about "${feedback.issue.slice(0, 80)}..." was marked as ${status}.`;

    stmts.insertNotification.run(feedback.username, id, notifTitle, notifMessage);

    // Optionally add to changelog
    if (addToChangelog && status === "accepted") {
      stmts.insertChangelog.run(
        id,
        changelogTitle || `Fixed: ${feedback.issue.slice(0, 100)}`,
        changelogDescription || feedback.issue,
        feedback.category,
        changeType || "fix"
      );
    }

    res.json({ success: true, notificationCreated: true });
  } catch (e) {
    console.error("Review error:", e);
    res.status(500).json({ error: "Failed to review feedback" });
  }
});

// ══════════════════════════════════════════════════════════════════════════════
// API ROUTES — ADMIN: CONTENT MANAGEMENT
// ══════════════════════════════════════════════════════════════════════════════

// Verify admin password
app.post("/api/admin/verify", (req, res) => {
  const { password } = req.body;
  if (password === CONFIG.ADMIN_PASSWORD) {
    res.json({ ok: true });
  } else {
    res.status(401).json({ ok: false });
  }
});

// Get user usage stats
app.get("/api/admin/users", requireAdmin, (req, res) => {
  try {
    const rows = db.prepare(`SELECT username, data FROM progress`).all();
    const users = {};
    rows.forEach(r => {
      try {
        const d = JSON.parse(r.data);
        users[r.username] = d.totalResponses || 0;
      } catch { users[r.username] = 0; }
    });
    res.json({ users });
  } catch (e) {
    res.json({ users: {} });
  }
});

// Get framework (with override support)
app.get("/api/admin/framework", requireAdmin, (req, res) => {
  try {
    const override = stmts.getFrameworkOverride.get();
    if (override) {
      res.json({ framework: override.content, isOverride: true });
    } else {
      // Read default from app.jsx
      const appContent = fs.readFileSync(path.join(__dirname, "public", "app.jsx"), "utf8");
      const match = appContent.match(/const FRAMEWORK_CONTENT\s*=\s*`([\s\S]*?)`;/);
      res.json({ framework: match ? match[1] : "", isOverride: false });
    }
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch framework" });
  }
});

// Save framework (persists to DB now)
app.post("/api/admin/framework", requireAdmin, (req, res) => {
  try {
    const { framework } = req.body;
    stmts.upsertFramework.run(framework);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: "Failed to save framework" });
  }
});

// Get all content (defaults merged with overrides) for admin editor
app.get("/api/admin/content", requireAdmin, (req, res) => {
  try {
    const overrides = stmts.getAllOverrides.all();
    const overrideMap = {};
    overrides.forEach(o => { overrideMap[o.id] = JSON.parse(o.data); });

    // Merge defaults with overrides
    const mc_questions = QUESTION_BANK_DEFAULTS.mc_questions.map(q => ({
      ...q,
      ...(overrideMap[q.id] || {}),
      _modified: !!overrideMap[q.id]
    }));

    const flashcards = QUESTION_BANK_DEFAULTS.flashcards.map(f => ({
      ...f,
      ...(overrideMap[f.id] || {}),
      _modified: !!overrideMap[f.id]
    }));

    res.json({ mc_questions, flashcards });
  } catch (e) {
    console.error("Content fetch error:", e);
    res.status(500).json({ error: "Failed to fetch content" });
  }
});

// Save a content override (single question or flashcard)
app.put("/api/admin/content/:id", requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const { type, category, data } = req.body;
    if (!type || !category || !data) {
      return res.status(400).json({ error: "type, category, and data are required" });
    }
    stmts.upsertOverride.run(id, type, category, JSON.stringify(data));
    res.json({ ok: true });
  } catch (e) {
    console.error("Content save error:", e);
    res.status(500).json({ error: "Failed to save content" });
  }
});

// Revert a content override (back to default)
app.delete("/api/admin/content/:id", requireAdmin, (req, res) => {
  try {
    stmts.deleteOverride.run(req.params.id);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: "Failed to revert content" });
  }
});

// Public endpoint: get overrides for client app
app.get("/api/content/overrides", (req, res) => {
  try {
    const overrides = stmts.getAllOverrides.all();
    const overrideMap = {};
    overrides.forEach(o => { overrideMap[o.id] = JSON.parse(o.data); });

    const frameworkRow = stmts.getFrameworkOverride.get();

    res.json({
      overrides: overrideMap,
      framework: frameworkRow ? frameworkRow.content : null
    });
  } catch (e) {
    res.json({ overrides: {}, framework: null });
  }
});

// Serve admin page
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});

// ══════════════════════════════════════════════════════════════════════════════
// OPTIONAL: SENDGRID EMAIL DIGEST
// ══════════════════════════════════════════════════════════════════════════════

async function sendEmailDigest() {
  if (!CONFIG.SENDGRID_API_KEY || !CONFIG.EMAIL_TO) {
    return; // Email not configured — skip silently
  }

  try {
    const pending = stmts.getFeedbackByStatus.all("pending");
    if (pending.length === 0) return;

    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(CONFIG.SENDGRID_API_KEY);

    const summary = pending.map((f, i) =>
      `${i + 1}. [${f.feedback_type}] ${f.category || "general"} — ${f.issue.slice(0, 120)}\n   From: ${f.username} | ${f.created_at}`
    ).join("\n\n");

    await sgMail.send({
      to: CONFIG.EMAIL_TO,
      from: CONFIG.EMAIL_FROM,
      subject: `[Study Assistant] ${pending.length} pending feedback item(s)`,
      text: `You have ${pending.length} unreviewed feedback submission(s):\n\n${summary}\n\nLog in to the admin dashboard to review.`,
    });

    db.prepare(`INSERT INTO email_digest_log (feedback_count, recipient) VALUES (?, ?)`).run(pending.length, CONFIG.EMAIL_TO);
    console.log(`[Email Digest] Sent ${pending.length} items to ${CONFIG.EMAIL_TO}`);
  } catch (e) {
    console.error("[Email Digest] Failed:", e.message);
  }
}

// Run digest daily at 8 AM (or on server start if pending items exist)
if (CONFIG.SENDGRID_API_KEY && CONFIG.EMAIL_TO) {
  // Check on startup after 30 seconds
  setTimeout(sendEmailDigest, 30000);
  // Then every 24 hours
  setInterval(sendEmailDigest, 24 * 60 * 60 * 1000);
}

// ══════════════════════════════════════════════════════════════════════════════
// EXISTING: CHAT ENDPOINT (placeholder — integrate with your existing server.js)
// ══════════════════════════════════════════════════════════════════════════════

// In-memory conversation history per user session
const conversationHistory = {};
const MAX_HISTORY_MESSAGES = 20;

app.post("/api/chat", async (req, res) => {
  try {
    const { message, username } = req.body;
    if (!message) return res.status(400).json({ error: "Message required" });

    const key = username || "anonymous";
    if (!conversationHistory[key]) conversationHistory[key] = [];
    conversationHistory[key].push({ role: "user", content: message });
    if (conversationHistory[key].length > MAX_HISTORY_MESSAGES) {
      conversationHistory[key] = conversationHistory[key].slice(-MAX_HISTORY_MESSAGES);
    }

    if (!CONFIG.ANTHROPIC_API_KEY) {
      return res.json({ response: "API key not configured. Set ANTHROPIC_API_KEY in environment." });
    }

    const client = new Anthropic({ apiKey: CONFIG.ANTHROPIC_API_KEY });
    const response = await client.messages.create({
      model: CONFIG.MODEL,
      max_tokens: 4096,
      system: "You are a figure skating technical panel study assistant.",
      messages: conversationHistory[key],
    });

    const text = response.content?.[0]?.text || "No response.";
    conversationHistory[key].push({ role: "assistant", content: text });

    res.json({ response: text });
  } catch (e) {
    console.error("Chat error:", e);
    res.status(500).json({ error: "Chat failed" });
  }
});

// ─── START SERVER ────────────────────────────────────────────────────────────
app.listen(CONFIG.PORT, () => {
  console.log(`Server running on port ${CONFIG.PORT}`);
  console.log(`Admin dashboard: http://localhost:${CONFIG.PORT}/admin`);
  console.log(`Email digest: ${CONFIG.SENDGRID_API_KEY ? "ENABLED" : "disabled (no SENDGRID_API_KEY)"}`);
});
