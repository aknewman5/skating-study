# TP Study Assistant — Deployment Guide

## Quick Start

### 1. Set up the project
```bash
mkdir skating-study && cd skating-study
# Copy these files into the directory:
# - server.js
# - package.json
# - public/index.html
# - public/app.jsx
# - public/admin.html
# - public/TP-Handbook-Singles-2025-26.pdf   ← NEW: the TPH PDF
npm install
```

### 2. Set your environment variables
```bash
export ANTHROPIC_API_KEY="sk-ant-your-key-here"
export ADMIN_PASSWORD="your-secret-password"
```

### 3. Run locally
```bash
npm start
# App:   http://localhost:3000
# Admin: http://localhost:3000/admin
```

## What's New: TPH Handbook Tab

The app now includes a **📄 TPH Handbook** tab on the dashboard that embeds the full ISU Technical Panel Handbook PDF directly in the app. Features:

- **Embedded PDF viewer** — browse the handbook without leaving the app
- **Quick Nav** — jump to any section with a filterable table of contents mapped to page numbers
- **Page controls** — navigate by page number, prev/next, first/last
- **Download & open** — links to open in a new tab or download the PDF

### Setup requirement
The PDF file (`TP-Handbook-Singles-2025-26.pdf`) must be in the `public/` directory so the Express static file server can serve it. Your `server.js` already serves everything in `public/` via:
```javascript
app.use(express.static('public'));
```

So just drop the PDF file into `public/` alongside `index.html` and `app.jsx`.

### If deploying to Render
The PDF is ~690KB — well within Render's static file limits. Just include it in your GitHub repo under `public/` and it will be deployed automatically.

## Deploy to Render

### 1. Create a GitHub repo
Push all files to a new GitHub repository.

### 2. Create a Render Web Service
- Go to render.com → New → Web Service
- Connect your GitHub repo
- Settings:
  - **Build Command:** `npm install`
  - **Start Command:** `npm start`
  - **Environment Variables:**
    - `ANTHROPIC_API_KEY` — your Anthropic API key
    - `ADMIN_PASSWORD` — password for the admin dashboard

### 3. Share the URL
Render gives you a URL like `https://skating-study.onrender.com`. Share this with your beta testers.
Your admin dashboard is at `https://skating-study.onrender.com/admin`.

## File Structure
```
skating-study/
├── server.js
├── package.json
├── feedback.json              (created automatically)
└── public/
    ├── index.html
    ├── app.jsx
    ├── admin.html
    └── TP-Handbook-Singles-2025-26.pdf   ← the handbook PDF
```

## Admin Dashboard

Access at `/admin` with your ADMIN_PASSWORD. Four tabs:

### Overview
- Total testers, AI responses used, manual reports, auto-flagged disputes
- Issues broken down by category (spins, jumps, steps, etc.)
- Recent feedback at a glance

### Feedback
- Every manual report and auto-detected dispute in one place
- Filter by type (manual vs. auto-dispute)
- Click AI responses to expand and see what the AI actually said

### Users
- See every tester and how many free responses they've used

### Framework
- View and edit the AI's knowledge base directly in the browser

## How It Works

### Architecture
- **Frontend:** React app served as static files (`public/`)
- **Backend:** Express server that proxies API calls to Anthropic
- **PDF:** Served as a static file, displayed in an iframe with custom navigation
- **Usage tracking:** In-memory per user (resets on server restart)
- **Feedback:** Saved to `feedback.json` (persists across restarts)

### Dashboard Tabs
- **📖 Study** — Category cards with Learn, Quiz, Flashcard, Reference modes
- **📊 My Progress** — Per-element accuracy, mastery levels, coverage stats
- **📑 TPH Index** — Searchable citation index with 60+ entries mapped to handbook sections
- **📄 TPH Handbook** — Full embedded PDF viewer with quick navigation

### Cost Estimate
- Each AI response ≈ 30K input tokens (framework) + ~500 output tokens
- At Sonnet pricing ($3/M input, $15/M output): ~$0.10 per response
- 10 testers × 25 free responses = 250 responses = ~$25 total

## Content Summary
- **120 MC questions:** 35 jumps, 75 spins, 10 ChSq
- **395 flashcards:** 38 jumps, 176 spins, 181 steps
- **27K char framework:** Spins (14 features, gateway concept, V flags), Jumps (4 phases, ERB, bonus), Steps (4 features, level caps), ChSq, Falls, General
- **28-page PDF:** Full ISU TP Handbook for Singles 2025-2026
- **AI modes:** Learn (Socratic teaching), Reference (rule lookup), Quiz explanations
