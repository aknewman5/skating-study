# CLAUDE.md — Figure Skating Study Assistant

## Project Overview

A web-based study tool for U.S. Figure Skating technical panel candidates preparing for the 2026 National Technical Panel Seminar (2025–2026 season). It uses Claude AI (via the Anthropic API) as an interactive tutor for learning rules about jumps, spins, steps, choreographic sequences, and general calling procedure.

**Live at:** Deployed on Render. Runs as a Node/Express server with a SQLite database.

---

## Tech Stack

- **Runtime:** Node.js >= 18
- **Server:** Express 4 (`server.js`)
- **Database:** SQLite via `better-sqlite3` — file: `feedback.db` (created at project root on first run)
- **AI:** Anthropic SDK (`@anthropic-ai/sdk`) — model: `claude-sonnet-4-20250514`
- **Frontend:** Single-file React 18 app (`public/app.jsx`) — transpiled in-browser by Babel Standalone (no build step)
- **No bundler.** The frontend loads React, ReactDOM, and Babel from CDN, fetches `app.jsx`, transforms it client-side, and mounts it.

---

## File Structure

```
skating-study/
├── server.js                 # Express server, all API routes, DB setup
├── package.json              # Dependencies and scripts (npm start → node server.js)
├── feedback.db               # SQLite DB (auto-created, gitignored)
├── DEPLOYMENT_README.md      # Render deployment notes
├── CLAUDE.md                 # This file
└── public/
    ├── index.html            # Entry point — loads React/Babel from CDN, fetches app.jsx
    ├── app.jsx               # Entire React frontend (~3000 lines, single file)
    ├── admin.html            # Standalone vanilla-JS admin dashboard (legacy/alternate)
    └── TP-Handbook-Singles-2025-26.pdf  # Source PDF handbook served for in-app viewing
```

---

## Architecture

### Frontend (public/app.jsx)

The entire frontend is a single `app.jsx` file with no build step. `index.html` fetches it, uses Babel to transpile JSX in the browser, and mounts the `App` component. React hooks (`useState`, `useEffect`, `useCallback`, `useRef`) are destructured from the global `React` object.

The app has an **artifact compatibility mode** — when running on `claude.ai`, API calls go directly to the Anthropic API instead of the backend proxy, and feedback/progress features are disabled.

### Backend (server.js)

A standard Express server that:
1. Serves static files from `public/`
2. Proxies chat requests to the Anthropic API
3. Manages feedback, notifications, changelog, and progress via SQLite
4. Provides password-protected admin endpoints
5. Optionally sends daily email digests via SendGrid

### Data Flow

```
User → HomeScreen (enter name) → Dashboard → select category + mode → ModeScreen
                                     ↕
                              Progress saved to server (debounced 800ms)
                              Feedback submitted via modal or auto-dispute detection
                              Notifications polled from server
```

---

## Component Map

### Screens (top-level routing via `screen` state in `App`)

| Screen       | State Value   | Component           | Description |
|-------------|---------------|---------------------|-------------|
| Home        | `"home"`      | `HomeScreen`        | Name entry, start button |
| Dashboard   | `"dashboard"` | `Dashboard`         | Category cards, tabs, progress |
| Mode        | `"mode"`      | `ModeScreen`        | Routes to active study mode |
| Settings    | `"settings"`  | `SettingsScreen`    | API key config, usage stats |

### Dashboard Tabs

| Tab       | Component            | Description |
|-----------|---------------------|-------------|
| Study     | (inline in Dashboard) | Category cards with mode selection buttons |
| Progress  | `ProgressAnalytics`  | Per-category stats, mastery levels, coverage bars |
| TPH Index | `TPHIndex`           | Searchable citation index (`TPH_INDEX` constant) |
| Handbook  | `TPHViewer`          | Embedded PDF viewer for the handbook |
| Changelog | `ChangelogPanel`     | Public-facing resolved feedback entries |
| Admin     | `AdminDashboard`     | Password-protected feedback review panel |

### Study Modes (rendered by `ModeScreen`)

| Mode       | Component         | AI-Powered | Description |
|-----------|-------------------|------------|-------------|
| Learn     | `LearnMode`       | Yes        | Guided conversation — phase-by-phase teaching with checking questions |
| Quiz      | `QuizMode`        | Yes        | Multiple-choice from `QUESTION_BANK`; AI explains answers. Falls back to `AIGeneratedQuiz` if no questions for category |
| Flashcard | `FlashcardMode`   | No         | Tap-to-reveal cards from `QUESTION_BANK.flashcards`; self-rating (know/unsure/learn) |
| Reference | `ReferenceMode`   | Yes        | Free-form rule lookup chat with quick-suggestion buttons |

### Shared Components

| Component      | Used By | Purpose |
|---------------|---------|---------|
| `ChatBubble`  | Learn, Reference | Styled message bubble with optional "Report issue" button |
| `ChatInput`   | Learn, Reference | Text input with Send button |
| `LoadingState` | AIGeneratedQuiz | Centered spinner/loading text |
| `FeedbackModal` | Learn, Quiz, Reference | Modal for reporting AI errors (issue + suggested correction) |
| `NotificationBell` | Dashboard header | Badge with unread count, dropdown list of notifications |
| `WeakAreasPanel` | Dashboard (Study tab) | Shows categories below 75% accuracy after 10+ attempts |

### Key Data Constants (embedded in app.jsx)

| Constant           | Line  | Description |
|-------------------|-------|-------------|
| `QUESTION_BANK`   | ~4    | Embedded JSON — `mc_questions` (multiple choice) and `flashcards` arrays |
| `FRAMEWORK_CONTENT` | ~7  | Large string — the AI's knowledge base (condensed TPH handbook content) |
| `CATEGORIES`      | ~743  | 5 categories: jumps, spins, steps, choreo, general |
| `MODES`           | ~751  | 4 modes: learn, quiz, flashcard, reference |
| `TPH_INDEX`       | ~759  | Citation index with section codes (e.g., `§JUMP.ROT`) |
| `DISPUTE_PATTERNS` | ~1276 | Regex array for auto-detecting user disputes with AI answers |

---

## Database Schema (SQLite — feedback.db)

### `feedback`
| Column          | Type    | Description |
|----------------|---------|-------------|
| id             | INTEGER | PK, autoincrement |
| username       | TEXT    | Submitter's name |
| category       | TEXT    | jumps/spins/steps/choreo/general |
| mode           | TEXT    | learn/quiz/reference |
| issue          | TEXT    | What the user reported as wrong |
| correction     | TEXT    | User's suggested fix (optional) |
| ai_response    | TEXT    | The AI response being disputed |
| trigger_message | TEXT   | The user message that triggered the issue |
| feedback_type  | TEXT    | `'report'` / `'dispute'` / `'suggestion'` |
| status         | TEXT    | `'pending'` / `'accepted'` / `'rejected'` / `'deferred'` |
| reviewer_notes | TEXT    | Admin's notes (visible to candidate in notification) |
| reviewed_by    | TEXT    | Reviewer name |
| reviewed_at    | TEXT    | Timestamp of review |
| created_at     | TEXT    | Submission timestamp |
| updated_at     | TEXT    | Last update timestamp |

### `notifications`
| Column      | Type    | Description |
|------------|---------|-------------|
| id         | INTEGER | PK, autoincrement |
| username   | TEXT    | Recipient candidate |
| feedback_id | INTEGER | FK → feedback.id |
| title      | TEXT    | Notification title |
| message    | TEXT    | Notification body |
| read       | INTEGER | 0 = unread, 1 = read |
| created_at | TEXT    | Timestamp |

### `changelog`
| Column      | Type    | Description |
|------------|---------|-------------|
| id         | INTEGER | PK, autoincrement |
| feedback_id | INTEGER | FK → feedback.id (optional) |
| title      | TEXT    | Public-facing title |
| description | TEXT   | Description of the change |
| category   | TEXT    | Element category |
| change_type | TEXT   | `'fix'` / `'improvement'` / `'new'` |
| created_at | TEXT    | Timestamp |

### `email_digest_log`
| Column         | Type    | Description |
|---------------|---------|-------------|
| id            | INTEGER | PK, autoincrement |
| sent_at       | TEXT    | When digest was sent |
| feedback_count | INTEGER | Items included |
| recipient     | TEXT    | Email address |

### `progress`
| Column     | Type    | Description |
|-----------|---------|-------------|
| username  | TEXT    | PK — candidate name |
| data      | TEXT    | JSON blob of progress data |
| updated_at | TEXT   | Last update |

**Indexes:** `idx_feedback_status`, `idx_feedback_username`, `idx_notifications_username`, `idx_notifications_read`

---

## API Routes

### Public — Candidate-facing

| Method | Route | Description |
|--------|-------|-------------|
| POST   | `/api/chat` | Send a message to Claude (proxied). Body: `{ message, username }` |
| POST   | `/api/feedback` | Submit feedback report. Body: `{ username, category, mode, issue, correction, aiResponse, triggerMessage, type }` |
| POST   | `/api/feedback/dispute` | Submit auto-detected dispute. Body: `{ username, category, mode, triggerMessage, aiResponse }` |
| GET    | `/api/feedback/mine/:username` | Get a user's own feedback history |
| GET    | `/api/notifications/:username` | Get notifications + unread count |
| POST   | `/api/notifications/:id/read` | Mark one notification read. Body: `{ username }` |
| POST   | `/api/notifications/read-all` | Mark all notifications read. Body: `{ username }` |
| GET    | `/api/changelog` | Get public changelog. Query: `?limit=20` |
| GET    | `/api/progress/:username` | Get saved progress JSON |
| PUT    | `/api/progress/:username` | Save progress. Body: `{ progress: {...} }` |

### Admin — Password-protected (header: `x-admin-password`)

| Method | Route | Description |
|--------|-------|-------------|
| GET    | `/api/admin/feedback` | All feedback, paginated. Query: `?limit=50&offset=0&status=pending` |
| GET    | `/api/admin/stats` | Feedback stats by category and status |
| POST   | `/api/admin/feedback/:id/review` | Review a feedback item. Body: `{ status, reviewerNotes, reviewedBy, addToChangelog, changelogTitle, changelogDescription, changeType }` |

---

## Feedback System — How It Works

### 1. Manual Reports (user-initiated)

In **Learn**, **Quiz**, and **Reference** modes, every AI response has a small "Report issue" button below it. Clicking it opens the `FeedbackModal` which captures:
- **What's wrong** (required) — free text describing the error
- **What should it say** (optional) — the user's suggested correction
- The AI response text is attached automatically

Submitted via `POST /api/feedback` with `feedback_type: "report"`.

### 2. Auto-Detected Disputes

When a user types a message matching any pattern in `DISPUTE_PATTERNS` (e.g., "that's wrong", "you're incorrect", "the handbook says..."), the system automatically submits a dispute via `POST /api/feedback/dispute` with `feedback_type: "dispute"`. The user's message and recent conversation context are captured. This happens silently — the user is not interrupted.

### 3. Admin Review Flow

1. Admin logs into the Admin tab (dashboard) or `admin.html` with the admin password
2. Views feedback filtered by status (pending/accepted/rejected/deferred)
3. For each pending item, admin can:
   - Set status: Accept / Reject / Defer
   - Add reviewer notes (visible to the submitter)
   - Optionally add to public changelog (with title and change type: fix/improvement/new)
4. On review submission:
   - Feedback status is updated
   - A **notification** is created for the submitter with the review decision and notes
   - If "add to changelog" is checked and status is accepted, a **changelog entry** is created

### 4. Notification Delivery

- `NotificationBell` component (in dashboard header) polls `GET /api/notifications/:username` on mount
- Shows unread count badge
- Dropdown lists recent notifications with read/unread styling
- "Mark all read" button available
- Individual notifications can be marked read by clicking

### 5. Email Digest (optional)

If `SENDGRID_API_KEY` and `EMAIL_TO` are set:
- 30 seconds after server start, checks for pending feedback
- Then every 24 hours, sends a digest email listing all pending items
- Tracked in `email_digest_log` table

---

## Progress Tracking

Progress is tracked per-username and persisted server-side in the `progress` table as a JSON blob.

**Shape of progress data:**
```json
{
  "jumps": {
    "correct": 12,
    "incorrect": 3,
    "seen": ["q_jump_001", "q_jump_002"],
    "learnTopics": ["Jumps_exchange_0", "Jumps_exchange_2"],
    "flashcardsSeen": 8
  }
}
```

- **Quiz mode** increments `correct`/`incorrect` and tracks `seen` question IDs
- **Learn mode** tracks `learnTopics` (every 2 exchanges = 1 topic)
- **Flashcard mode** increments `flashcardsSeen`
- Saves are debounced (800ms) via `saveProgress()` to avoid hammering the server

---

## Environment Variables

| Variable           | Required | Description |
|-------------------|----------|-------------|
| `ANTHROPIC_API_KEY` | Yes     | Anthropic API key for Claude |
| `PORT`             | No       | Server port (default: 3000) |
| `ADMIN_PASSWORD`   | No       | Admin dashboard password (default: `admin2026`) |
| `SENDGRID_API_KEY` | No       | SendGrid key for email digests |
| `EMAIL_TO`         | No       | Digest recipient email |
| `EMAIL_FROM`       | No       | Digest sender email (default: `noreply@skatestudy.app`) |

---

## Running Locally

```bash
npm install
ANTHROPIC_API_KEY=sk-ant-... node server.js
# Open http://localhost:3000
```

---

## Key Patterns to Know

- **No build step:** `app.jsx` is served raw and transpiled by Babel in the browser. Changes to `app.jsx` are live on refresh.
- **Single-file frontend:** All components, constants, question bank, and framework content live in one ~3000-line file.
- **Dual-mode API calls:** `callClaude()` in `app.jsx` detects whether it's running on `claude.ai` (artifact mode) or on the deployed server, and routes API calls accordingly.
- **In-memory chat history:** `server.js` stores conversation history per username in a JS object (`conversationHistory`), not in the database. Lost on server restart.
- **Admin auth:** Simple password check via `x-admin-password` header or `?pw=` query param. No sessions or tokens.
