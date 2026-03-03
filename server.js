const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// ─── Database Setup ──────────────────────────────────────────────────────────
const DB_PATH = path.join(__dirname, 'data', 'feedback.db');

if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
}

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL DEFAULT 'manual',
    username TEXT NOT NULL DEFAULT 'anonymous',
    user_id TEXT,
    category TEXT,
    mode TEXT,
    issue TEXT,
    ai_response TEXT,
    user_message TEXT,
    correction TEXT,
    conversation TEXT,
    trigger_message TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    reviewer TEXT,
    reviewer_notes TEXT,
    reviewed_at TEXT,
    framework_updated INTEGER DEFAULT 0,
    changelog_id INTEGER,
    user_notified INTEGER DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS changelog (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT,
    change_type TEXT NOT NULL DEFAULT 'fix',
    feedback_ids TEXT,
    author TEXT NOT NULL DEFAULT 'Admin',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS user_notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    feedback_id INTEGER,
    changelog_id INTEGER,
    message TEXT NOT NULL,
    read INTEGER DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (feedback_id) REFERENCES feedback(id),
    FOREIGN KEY (changelog_id) REFERENCES changelog(id)
  );

  CREATE INDEX IF NOT EXISTS idx_feedback_status ON feedback(status);
  CREATE INDEX IF NOT EXISTS idx_feedback_user ON feedback(user_id);
  CREATE INDEX IF NOT EXISTS idx_notifications_user ON user_notifications(user_id);
  CREATE INDEX IF NOT EXISTS idx_notifications_unread ON user_notifications(user_id, read);
`);

// ─── Migrate existing feedback.json if present ───────────────────────────────
const FEEDBACK_FILE = path.join(__dirname, 'feedback.json');
if (fs.existsSync(FEEDBACK_FILE)) {
  try {
    const existing = JSON.parse(fs.readFileSync(FEEDBACK_FILE, 'utf8'));
    if (existing.length > 0) {
      const insert = db.prepare(`
        INSERT OR IGNORE INTO feedback (type, username, category, mode, issue, ai_response, user_message, correction, conversation, trigger_message, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      const migrate = db.transaction((items) => {
        for (const f of items) {
          insert.run(
            f.type || 'manual', f.username || 'anonymous',
            f.category || null, f.mode || null, f.issue || null,
            f.aiResponse || null, f.userMessage || null, f.correction || null,
            f.conversation ? JSON.stringify(f.conversation) : null,
            f.triggerMessage || null, f.timestamp || new Date().toISOString()
          );
        }
      });
      migrate(existing);
      fs.renameSync(FEEDBACK_FILE, FEEDBACK_FILE + '.migrated');
      console.log(`[MIGRATE] Imported ${existing.length} feedback entries from JSON to SQLite`);
    }
  } catch (e) {
    console.error('[MIGRATE] Error:', e.message);
  }
}

// ─── Usage tracking (in-memory) ──────────────────────────────────────────────
const FREE_LIMIT = 25;
const usage = {};

// ─── Admin Configuration ─────────────────────────────────────────────────────
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'changeme2026';
const EMAIL_ENABLED = !!(process.env.EMAIL_TO && process.env.SENDGRID_API_KEY);
let frameworkOverride = null;

function adminAuth(req, res, next) {
  const key = req.headers['x-admin-key'];
  if (key !== ADMIN_PASSWORD) return res.status(401).json({ error: 'Unauthorized' });
  next();
}

// ─── Feedback Endpoints (Public) ─────────────────────────────────────────────

app.post('/api/feedback', (req, res) => {
  const { username, userId, category, mode, issue, aiResponse, userMessage, correction } = req.body;
  try {
    const result = db.prepare(`
      INSERT INTO feedback (type, username, user_id, category, mode, issue, ai_response, user_message, correction)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run('manual', username || 'anonymous', userId || null, category, mode, issue, aiResponse, userMessage, correction);
    console.log(`[FEEDBACK #${result.lastInsertRowid}] ${username} in ${category}/${mode}: ${issue?.slice(0, 100)}`);
    res.json({ ok: true, id: result.lastInsertRowid });
  } catch (e) {
    res.status(500).json({ error: 'Failed to save feedback' });
  }
});

app.post('/api/feedback/dispute', (req, res) => {
  const { username, userId, category, mode, conversation, triggerMessage } = req.body;
  try {
    const result = db.prepare(`
      INSERT INTO feedback (type, username, user_id, category, mode, conversation, trigger_message)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run('auto_dispute', username || 'anonymous', userId || null, category, mode,
      conversation ? JSON.stringify(conversation) : null, triggerMessage);
    console.log(`[DISPUTE #${result.lastInsertRowid}] ${username} in ${category}/${mode}`);
    res.json({ ok: true, id: result.lastInsertRowid });
  } catch (e) {
    res.status(500).json({ error: 'Failed to save dispute' });
  }
});

app.get('/api/feedback/summary', (req, res) => {
  const total = db.prepare('SELECT COUNT(*) as c FROM feedback').get().c;
  const pending = db.prepare("SELECT COUNT(*) as c FROM feedback WHERE status='pending'").get().c;
  const accepted = db.prepare("SELECT COUNT(*) as c FROM feedback WHERE status='accepted'").get().c;
  const rejected = db.prepare("SELECT COUNT(*) as c FROM feedback WHERE status='rejected'").get().c;
  const byCategory = db.prepare('SELECT category, COUNT(*) as count FROM feedback GROUP BY category').all();
  res.json({ total, pending, accepted, rejected, byCategory });
});

// ─── Admin Feedback Management ───────────────────────────────────────────────

app.get('/api/admin/feedback', adminAuth, (req, res) => {
  const { status, category, type, limit = 50, offset = 0 } = req.query;
  let query = 'SELECT * FROM feedback WHERE 1=1';
  const params = [];
  if (status) { query += ' AND status = ?'; params.push(status); }
  if (category) { query += ' AND category = ?'; params.push(category); }
  if (type) { query += ' AND type = ?'; params.push(type); }
  query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
  params.push(Number(limit), Number(offset));

  const feedback = db.prepare(query).all(...params);
  const total = db.prepare('SELECT COUNT(*) as c FROM feedback').get().c;
  const pendingCount = db.prepare("SELECT COUNT(*) as c FROM feedback WHERE status='pending'").get().c;
  res.json({ feedback, total, pending: pendingCount });
});

app.patch('/api/admin/feedback/:id', adminAuth, (req, res) => {
  const { id } = req.params;
  const { status, reviewer, reviewerNotes, frameworkUpdated } = req.body;
  if (!['accepted', 'rejected', 'noted', 'pending'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  try {
    db.prepare(`
      UPDATE feedback SET status=?, reviewer=?, reviewer_notes=?, framework_updated=?, reviewed_at=datetime('now') WHERE id=?
    `).run(status, reviewer || 'Admin', reviewerNotes || null, frameworkUpdated ? 1 : 0, id);

    const feedback = db.prepare('SELECT * FROM feedback WHERE id = ?').get(id);
    if (feedback && feedback.user_id) {
      const statusMsg = {
        accepted: 'Your feedback was accepted and will be incorporated into the framework.',
        rejected: 'Your feedback was reviewed but not incorporated.',
        noted: 'Your feedback has been noted for future consideration.'
      };
      const message = reviewerNotes
        ? `${statusMsg[status] || 'Reviewed.'} Reviewer note: "${reviewerNotes}"`
        : statusMsg[status] || 'Your feedback was reviewed.';
      db.prepare('INSERT INTO user_notifications (user_id, feedback_id, message) VALUES (?, ?, ?)')
        .run(feedback.user_id, id, message);
    }
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: 'Failed to update feedback' });
  }
});

app.post('/api/admin/feedback/bulk', adminAuth, (req, res) => {
  const { ids, status, reviewer, reviewerNotes } = req.body;
  if (!ids || !Array.isArray(ids)) return res.status(400).json({ error: 'ids must be an array' });
  const update = db.prepare('UPDATE feedback SET status=?, reviewer=?, reviewer_notes=?, reviewed_at=datetime(\'now\') WHERE id=?');
  const bulk = db.transaction((items) => { for (const id of items) update.run(status, reviewer || 'Admin', reviewerNotes || null, id); });
  bulk(ids);
  res.json({ ok: true, updated: ids.length });
});

// ─── Changelog Endpoints ─────────────────────────────────────────────────────

app.get('/api/changelog', (req, res) => {
  const entries = db.prepare('SELECT * FROM changelog ORDER BY created_at DESC LIMIT 20').all();
  res.json({ entries });
});

app.post('/api/admin/changelog', adminAuth, (req, res) => {
  const { title, description, category, changeType, feedbackIds, author } = req.body;
  if (!title || !description) return res.status(400).json({ error: 'title and description required' });
  try {
    const result = db.prepare(`
      INSERT INTO changelog (title, description, category, change_type, feedback_ids, author) VALUES (?, ?, ?, ?, ?, ?)
    `).run(title, description, category || null, changeType || 'fix',
      feedbackIds ? JSON.stringify(feedbackIds) : null, author || 'Admin');

    if (feedbackIds && Array.isArray(feedbackIds)) {
      const updateFb = db.prepare('UPDATE feedback SET changelog_id = ? WHERE id = ?');
      const getFb = db.prepare('SELECT * FROM feedback WHERE id = ?');
      const notify = db.prepare('INSERT INTO user_notifications (user_id, feedback_id, changelog_id, message) VALUES (?, ?, ?, ?)');
      for (const fId of feedbackIds) {
        updateFb.run(result.lastInsertRowid, fId);
        const fb = getFb.get(fId);
        if (fb && fb.user_id) {
          notify.run(fb.user_id, fId, result.lastInsertRowid, `Framework updated based on your feedback: "${title}"`);
        }
      }
    }
    res.json({ ok: true, id: result.lastInsertRowid });
  } catch (e) {
    res.status(500).json({ error: 'Failed to add changelog entry' });
  }
});

app.delete('/api/admin/changelog/:id', adminAuth, (req, res) => {
  db.prepare('DELETE FROM changelog WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

// ─── User Notifications ──────────────────────────────────────────────────────

app.get('/api/notifications/:userId', (req, res) => {
  const notifications = db.prepare(
    'SELECT * FROM user_notifications WHERE user_id = ? AND read = 0 ORDER BY created_at DESC'
  ).all(req.params.userId);
  res.json({ notifications, unread: notifications.length });
});

app.get('/api/notifications/:userId/all', (req, res) => {
  const notifications = db.prepare(
    'SELECT * FROM user_notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 50'
  ).all(req.params.userId);
  const unread = notifications.filter(n => !n.read).length;
  res.json({ notifications, unread });
});

app.post('/api/notifications/:userId/read', (req, res) => {
  const { ids } = req.body;
  if (ids && Array.isArray(ids)) {
    const mark = db.prepare('UPDATE user_notifications SET read = 1 WHERE id = ? AND user_id = ?');
    for (const id of ids) mark.run(id, req.params.userId);
  } else {
    db.prepare('UPDATE user_notifications SET read = 1 WHERE user_id = ?').run(req.params.userId);
  }
  res.json({ ok: true });
});

// ─── Admin Stats ─────────────────────────────────────────────────────────────

app.get('/api/admin/stats', adminAuth, (req, res) => {
  const feedback = {
    total: db.prepare('SELECT COUNT(*) as c FROM feedback').get().c,
    pending: db.prepare("SELECT COUNT(*) as c FROM feedback WHERE status='pending'").get().c,
    accepted: db.prepare("SELECT COUNT(*) as c FROM feedback WHERE status='accepted'").get().c,
    rejected: db.prepare("SELECT COUNT(*) as c FROM feedback WHERE status='rejected'").get().c,
    noted: db.prepare("SELECT COUNT(*) as c FROM feedback WHERE status='noted'").get().c,
    today: db.prepare("SELECT COUNT(*) as c FROM feedback WHERE created_at >= date('now')").get().c,
    thisWeek: db.prepare("SELECT COUNT(*) as c FROM feedback WHERE created_at >= date('now', '-7 days')").get().c,
  };
  const clog = {
    total: db.prepare('SELECT COUNT(*) as c FROM changelog').get().c,
    thisWeek: db.prepare("SELECT COUNT(*) as c FROM changelog WHERE created_at >= date('now', '-7 days')").get().c,
  };
  const topCategories = db.prepare(
    "SELECT category, COUNT(*) as count FROM feedback WHERE category IS NOT NULL GROUP BY category ORDER BY count DESC LIMIT 10"
  ).all();
  res.json({ feedback, changelog: clog, topCategories, activeUsers: Object.keys(usage).length });
});

app.get('/api/admin/users', adminAuth, (req, res) => {
  res.json({ users: { ...usage } });
});

// ─── Admin Framework ─────────────────────────────────────────────────────────

app.get('/api/admin/framework', adminAuth, (req, res) => {
  if (frameworkOverride) return res.json({ framework: frameworkOverride, source: 'override' });
  try {
    const appJsx = fs.readFileSync(path.join(__dirname, 'public', 'app.jsx'), 'utf8');
    const match = appJsx.match(/const FRAMEWORK_CONTENT = `([\s\S]*?)`;/);
    const framework = match ? match[1].replace(/\\`/g, '`').replace(/\\\\/g, '\\') : 'Could not extract';
    res.json({ framework, source: 'built-in' });
  } catch (e) {
    res.json({ framework: 'Error: ' + e.message, source: 'error' });
  }
});

app.post('/api/admin/framework', adminAuth, (req, res) => {
  frameworkOverride = req.body.framework;
  console.log(`[ADMIN] Framework updated (${frameworkOverride.length} chars)`);
  res.json({ ok: true, chars: frameworkOverride.length });
});

app.post('/api/admin/verify', (req, res) => {
  res.json({ ok: req.body.password === ADMIN_PASSWORD });
});

// ─── Email Digest ────────────────────────────────────────────────────────────

async function sendDailyDigest() {
  if (!EMAIL_ENABLED) return;
  const pending = db.prepare("SELECT COUNT(*) as c FROM feedback WHERE status='pending'").get().c;
  const todayNew = db.prepare("SELECT COUNT(*) as c FROM feedback WHERE created_at >= date('now', '-1 day')").get().c;
  if (todayNew === 0 && pending === 0) return;

  const recent = db.prepare("SELECT * FROM feedback WHERE created_at >= date('now', '-1 day') ORDER BY created_at DESC LIMIT 10").all();
  const summary = recent.map(f =>
    `- [${f.type}] ${f.username} | ${f.category}/${f.mode}: ${(f.issue || f.trigger_message || 'No description').slice(0, 120)}`
  ).join('\n');

  const body = [
    'TP Study Assistant — Daily Feedback Digest',
    '============================================',
    '', `Pending review: ${pending}`, `New in last 24h: ${todayNew}`,
    '', 'Recent feedback:', summary || '(none)',
    '', `Review at: ${process.env.RENDER_EXTERNAL_URL || 'https://skating-study.onrender.com'}/admin`
  ].join('\n');

  try {
    await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: process.env.EMAIL_TO }] }],
        from: { email: process.env.EMAIL_FROM || 'noreply@skating-study.onrender.com', name: 'TP Study Assistant' },
        subject: `[TP Study] ${todayNew} new feedback, ${pending} pending review`,
        content: [{ type: 'text/plain', value: body }]
      })
    });
    console.log('[EMAIL] Daily digest sent');
  } catch (e) {
    console.error('[EMAIL] Failed:', e.message);
  }
}

setInterval(sendDailyDigest, 24 * 60 * 60 * 1000);
setTimeout(sendDailyDigest, 60 * 1000);

// ─── Chat Proxy ──────────────────────────────────────────────────────────────

app.post('/api/chat', async (req, res) => {
  const { messages, system, username, userApiKey } = req.body;
  let apiKey = userApiKey || process.env.ANTHROPIC_API_KEY;
  let usingFreeLimit = !userApiKey;

  if (!apiKey) return res.status(500).json({ error: 'No API key configured' });

  if (usingFreeLimit && username) {
    const count = usage[username.toLowerCase()] || 0;
    if (count >= FREE_LIMIT) {
      return res.status(429).json({
        error: 'free_limit_reached',
        message: `You've used all ${FREE_LIMIT} free AI responses. Enter your own Anthropic API key in Settings to continue.`,
        used: count, limit: FREE_LIMIT
      });
    }
  }

  try {
    let systemPrompt = system || '';
    if (frameworkOverride && systemPrompt.includes('Your knowledge base:')) {
      systemPrompt = systemPrompt.replace(/Your knowledge base:\n[\s\S]*?\n\n/, `Your knowledge base:\n${frameworkOverride}\n\n`);
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 1024, system: systemPrompt, messages: messages || [] })
    });

    const data = await response.json();
    if (!response.ok) {
      if (userApiKey) return res.status(response.status).json({ error: 'api_error', message: data.error?.message || 'API failed.' });
      return res.status(response.status).json(data);
    }

    if (usingFreeLimit && username) {
      const key = username.toLowerCase();
      usage[key] = (usage[key] || 0) + 1;
    }

    const usageInfo = usingFreeLimit && username ? {
      used: usage[username.toLowerCase()] || 0, limit: FREE_LIMIT,
      remaining: FREE_LIMIT - (usage[username.toLowerCase()] || 0)
    } : null;

    res.json({ ...data, _usage: usageInfo });
  } catch (err) {
    console.error('API proxy error:', err);
    res.status(500).json({ error: 'Proxy error', message: err.message });
  }
});

// ─── Usage ───────────────────────────────────────────────────────────────────

app.get('/api/usage/:username', (req, res) => {
  const key = req.params.username.toLowerCase();
  const used = usage[key] || 0;
  res.json({ used, limit: FREE_LIMIT, remaining: FREE_LIMIT - used });
});

// ─── Serve Admin & SPA Fallback ──────────────────────────────────────────────

app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'public', 'admin.html')));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

// ─── Shutdown ────────────────────────────────────────────────────────────────

process.on('SIGINT', () => { db.close(); process.exit(); });
process.on('SIGTERM', () => { db.close(); process.exit(); });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Database: ${DB_PATH}`);
  console.log(`Email digest: ${EMAIL_ENABLED ? 'enabled' : 'disabled (set EMAIL_TO + SENDGRID_API_KEY)'}`);
});
