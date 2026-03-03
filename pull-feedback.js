// pull-feedback.js — Export pending feedback from feedback.db to markdown
// Usage: node pull-feedback.js [output-file]
//   Writes to stdout by default, or to the given file path.

const path = require("path");
const fs = require("fs");
const Database = require("better-sqlite3");

const dbPath = path.join(__dirname, "feedback.db");

if (!fs.existsSync(dbPath)) {
  console.error("Error: feedback.db not found at", dbPath);
  console.error("Run the server at least once to create the database.");
  process.exit(1);
}

const db = new Database(dbPath, { readonly: true });

const rows = db.prepare(`
  SELECT id, username, category, mode, issue, correction,
         ai_response, trigger_message, feedback_type, created_at
  FROM feedback
  WHERE status = 'pending'
  ORDER BY category, feedback_type, created_at DESC
`).all();

db.close();

if (rows.length === 0) {
  const msg = "# Pending Feedback\n\nNo pending feedback items.\n";
  const outFile = process.argv[2];
  if (outFile) {
    fs.writeFileSync(outFile, msg);
    console.log(`Written to ${outFile} (0 items)`);
  } else {
    process.stdout.write(msg);
  }
  process.exit(0);
}

// Group by category, then by feedback_type within each category
const grouped = {};
for (const row of rows) {
  const cat = row.category || "uncategorized";
  const type = row.feedback_type || "report";
  if (!grouped[cat]) grouped[cat] = {};
  if (!grouped[cat][type]) grouped[cat][type] = [];
  grouped[cat][type].push(row);
}

const typeLabels = {
  report: "Manual Reports",
  dispute: "Auto-Detected Disputes",
  suggestion: "Suggestions",
};

const lines = [];
lines.push("# Pending Feedback Summary");
lines.push("");
lines.push(`Generated: ${new Date().toLocaleString()}`);
lines.push(`Total pending items: **${rows.length}**`);
lines.push("");

// Quick stats table
const catCounts = {};
const typeCounts = {};
for (const row of rows) {
  const cat = row.category || "uncategorized";
  const type = row.feedback_type || "report";
  catCounts[cat] = (catCounts[cat] || 0) + 1;
  typeCounts[type] = (typeCounts[type] || 0) + 1;
}

lines.push("## At a Glance");
lines.push("");
lines.push("| Category | Count |");
lines.push("|----------|-------|");
for (const [cat, count] of Object.entries(catCounts).sort((a, b) => b[1] - a[1])) {
  lines.push(`| ${cat} | ${count} |`);
}
lines.push("");
lines.push("| Type | Count |");
lines.push("|------|-------|");
for (const [type, count] of Object.entries(typeCounts).sort((a, b) => b[1] - a[1])) {
  lines.push(`| ${typeLabels[type] || type} | ${count} |`);
}
lines.push("");

lines.push("---");
lines.push("");

// Detail sections
const categoryOrder = ["jumps", "spins", "steps", "choreo", "general", "uncategorized"];
const sortedCategories = Object.keys(grouped).sort((a, b) => {
  const ai = categoryOrder.indexOf(a);
  const bi = categoryOrder.indexOf(b);
  return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
});

for (const cat of sortedCategories) {
  const types = grouped[cat];
  const catTotal = Object.values(types).reduce((s, arr) => s + arr.length, 0);
  lines.push(`## ${cat.charAt(0).toUpperCase() + cat.slice(1)} (${catTotal})`);
  lines.push("");

  const typeOrder = ["report", "dispute", "suggestion"];
  const sortedTypes = Object.keys(types).sort((a, b) => {
    const ai = typeOrder.indexOf(a);
    const bi = typeOrder.indexOf(b);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });

  for (const type of sortedTypes) {
    const items = types[type];
    lines.push(`### ${typeLabels[type] || type} (${items.length})`);
    lines.push("");

    for (const item of items) {
      lines.push(`**#${item.id}** — _${item.username}_ · ${item.mode || "—"} · ${item.created_at}`);
      lines.push("");
      lines.push(`> ${item.issue}`);

      if (item.correction) {
        lines.push("");
        lines.push(`**Suggested fix:** ${item.correction}`);
      }

      if (item.trigger_message) {
        lines.push("");
        lines.push(`**User said:** "${item.trigger_message.slice(0, 300)}${item.trigger_message.length > 300 ? "..." : ""}"`);
      }

      if (item.ai_response) {
        lines.push("");
        lines.push("<details><summary>AI response context</summary>");
        lines.push("");
        lines.push(item.ai_response.slice(0, 500) + (item.ai_response.length > 500 ? "..." : ""));
        lines.push("");
        lines.push("</details>");
      }

      lines.push("");
      lines.push("---");
      lines.push("");
    }
  }
}

const markdown = lines.join("\n");
const outFile = process.argv[2];

if (outFile) {
  fs.writeFileSync(outFile, markdown);
  console.log(`Written to ${outFile} (${rows.length} items)`);
} else {
  process.stdout.write(markdown);
}
