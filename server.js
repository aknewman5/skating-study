const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// ─── Usage tracking (in-memory, resets on restart) ────────────────────────────
const FREE_LIMIT = 25;
const usage = {}; // { username: count }

// ─── Feedback storage (persists to file) ─────────────────────────────────────
const fs = require('fs');
const FEEDBACK_FILE = path.join(__dirname, 'feedback.json');

function loadFeedback() {
  try { return JSON.parse(fs.readFileSync(FEEDBACK_FILE, 'utf8')); }
  catch { return []; }
}

function saveFeedback(entry) {
  const all = loadFeedback();
  all.push({ ...entry, id: Date.now(), timestamp: new Date().toISOString() });
  fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(all, null, 2));
  return all.length;
}

// ─── Feedback endpoints ──────────────────────────────────────────────────────

// Manual feedback from testers
app.post('/api/feedback', (req, res) => {
  const { username, category, mode, issue, aiResponse, userMessage, correction } = req.body;
  const count = saveFeedback({
    type: 'manual',
    username: username || 'anonymous',
    category, mode, issue, aiResponse, userMessage, correction
  });
  console.log(`[FEEDBACK #${count}] ${username} reported issue in ${category}/${mode}: ${issue?.slice(0, 100)}`);
  res.json({ ok: true, count });
});

// Auto-flagged disputes (AI detects pushback)
app.post('/api/feedback/dispute', (req, res) => {
  const { username, category, mode, conversation, triggerMessage } = req.body;
  const count = saveFeedback({
    type: 'auto_dispute',
    username: username || 'anonymous',
    category, mode, conversation, triggerMessage
  });
  console.log(`[AUTO-DISPUTE #${count}] ${username} pushed back in ${category}/${mode}: ${triggerMessage?.slice(0, 100)}`);
  res.json({ ok: true, count });
});

// View all feedback (for you)
app.get('/api/feedback', (req, res) => {
  const all = loadFeedback();
  res.json({ total: all.length, feedback: all });
});

// View summary
app.get('/api/feedback/summary', (req, res) => {
  const all = loadFeedback();
  const manual = all.filter(f => f.type === 'manual');
  const auto = all.filter(f => f.type === 'auto_dispute');
  const byCategory = {};
  all.forEach(f => { byCategory[f.category] = (byCategory[f.category] || 0) + 1; });
  res.json({ total: all.length, manual: manual.length, auto_disputes: auto.length, byCategory });
});

// ─── Admin Configuration ─────────────────────────────────────────────────────
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'changeme2026';

// Live framework override (editable from admin, resets on restart)
let frameworkOverride = null;

function adminAuth(req, res, next) {
  const key = req.headers['x-admin-key'];
  if (key !== ADMIN_PASSWORD) return res.status(401).json({ error: 'Unauthorized' });
  next();
}

// Serve admin page
app.get('/admin', (req, res) => {
  let html = fs.readFileSync(path.join(__dirname, 'public', 'admin.html'), 'utf8');
  res.send(html);
});

// Admin: verify password
app.post('/api/admin/verify', (req, res) => {
  res.json({ ok: req.body.password === ADMIN_PASSWORD });
});

// Admin: get all feedback
app.get('/api/admin/feedback', adminAuth, (req, res) => {
  res.json({ feedback: loadFeedback() });
});

// Admin: get all users and usage
app.get('/api/admin/users', adminAuth, (req, res) => {
  res.json({ users: { ...usage } });
});

// Admin: get framework
app.get('/api/admin/framework', adminAuth, (req, res) => {
  if (frameworkOverride) {
    return res.json({ framework: frameworkOverride, source: 'override' });
  }
  // Read from the app.jsx file
  try {
    const appJsx = fs.readFileSync(path.join(__dirname, 'public', 'app.jsx'), 'utf8');
    const match = appJsx.match(/const FRAMEWORK_CONTENT = `([\s\S]*?)`;/);
    const framework = match ? match[1].replace(/\\`/g, '`').replace(/\\\\/g, '\\') : 'Could not extract framework';
    res.json({ framework, source: 'built-in' });
  } catch (e) {
    res.json({ framework: 'Error reading framework: ' + e.message, source: 'error' });
  }
});

// Admin: update framework (live override)
app.post('/api/admin/framework', adminAuth, (req, res) => {
  frameworkOverride = req.body.framework;
  console.log(`[ADMIN] Framework updated (${frameworkOverride.length} chars)`);
  res.json({ ok: true, chars: frameworkOverride.length });
});

// ─── API proxy endpoint ──────────────────────────────────────────────────────
app.post('/api/chat', async (req, res) => {
  const { messages, system, username, userApiKey } = req.body;

  // Determine which API key to use
  let apiKey = userApiKey || process.env.ANTHROPIC_API_KEY;
  let usingFreeLimit = !userApiKey;

  if (!apiKey) {
    return res.status(500).json({ error: 'No API key configured' });
  }

  // Check free tier usage (only when using the shared key)
  if (usingFreeLimit && username) {
    const count = usage[username.toLowerCase()] || 0;
    if (count >= FREE_LIMIT) {
      return res.status(429).json({
        error: 'free_limit_reached',
        message: `You've used all ${FREE_LIMIT} free AI responses. Enter your own Anthropic API key in Settings to continue using AI features, or keep using Quiz and Flashcard modes.`,
        used: count,
        limit: FREE_LIMIT
      });
    }
  }

  try {
    // If admin has overridden the framework, swap it into the system prompt
    let systemPrompt = system || '';
    if (frameworkOverride && systemPrompt.includes('Your knowledge base:')) {
      systemPrompt = systemPrompt.replace(
        /Your knowledge base:\n[\s\S]*?\n\n/,
        `Your knowledge base:\n${frameworkOverride}\n\n`
      );
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: systemPrompt,
        messages: messages || []
      })
    });

    const data = await response.json();

    if (!response.ok) {
      // If user's own key failed, pass through the error
      if (userApiKey) {
        return res.status(response.status).json({ 
          error: 'api_error', 
          message: data.error?.message || 'API request failed. Check your API key.' 
        });
      }
      return res.status(response.status).json(data);
    }

    // Track usage only for free tier
    if (usingFreeLimit && username) {
      const key = username.toLowerCase();
      usage[key] = (usage[key] || 0) + 1;
    }

    // Return response with usage info
    const usageInfo = usingFreeLimit && username ? {
      used: usage[username.toLowerCase()] || 0,
      limit: FREE_LIMIT,
      remaining: FREE_LIMIT - (usage[username.toLowerCase()] || 0)
    } : null;

    res.json({ ...data, _usage: usageInfo });

  } catch (err) {
    console.error('API proxy error:', err);
    res.status(500).json({ error: 'Proxy error', message: err.message });
  }
});

// ─── Usage check endpoint ────────────────────────────────────────────────────
app.get('/api/usage/:username', (req, res) => {
  const key = req.params.username.toLowerCase();
  const used = usage[key] || 0;
  res.json({ used, limit: FREE_LIMIT, remaining: FREE_LIMIT - used });
});

// ─── SPA fallback ────────────────────────────────────────────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
