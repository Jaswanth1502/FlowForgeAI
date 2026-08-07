import fs from "fs";
import path from "path";

function formatHTML(html) {
  let indent = 0;
  // Insert newlines between adjacent tags
  let formatted = html.replace(/></g, ">\n<");

  const lines = formatted.split("\n");
  const result = [];

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    // Check if line is closing tag
    if (line.match(/^<\//) && !line.match(/^<\/[^>]+><[^\/]/)) {
      indent = Math.max(0, indent - 1);
    }

    const padding = "  ".repeat(indent);
    result.push(padding + line);

    // Increase indent for opening tags (excluding void elements and self-closing tags)
    if (
      line.match(/^<[a-zA-Z0-9]+[^>]*>/) &&
      !line.match(/^<(meta|link|img|br|hr|input|area|base|col|embed|param|source|track|wbr)[^>]*>/i) &&
      !line.match(/<\/[a-zA-Z0-9]+>$/) &&
      !line.endsWith("/>") &&
      !line.startsWith("<!DOCTYPE")
    ) {
      indent++;
    }
  }

  return result.join("\n");
}

function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      console.log(`Formatting: ${fullPath}`);
      const raw = fs.readFileSync(fullPath, "utf-8");
      const formatted = formatHTML(raw);
      fs.writeFileSync(fullPath, formatted, "utf-8");
    }
  }
}

const outDir = path.resolve("./out");
if (fs.existsSync(outDir)) {
  processDirectory(outDir);
  console.log("All HTML files formatted cleanly!");
} else {
  console.error("out directory not found.");
}
