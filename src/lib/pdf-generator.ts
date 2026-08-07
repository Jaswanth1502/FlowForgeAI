/**
 * FlowForge AI High-Fidelity PDF Export Engine
 * Exports the complete, fully-styled layout of the generated UI task into PDF.
 */

export interface ExportUISchema {
  title: string;
  description?: string;
  components: Array<Record<string, any>>;
}

/**
 * Builds a standalone, print-perfect HTML document matching the exact UI layout.
 */
export function buildPrintableHTML(schema: ExportUISchema): string {
  const safeTitle = schema.title || "FlowForge AI Generated Application";
  const safeDesc = schema.description || "";
  const components = Array.isArray(schema.components) ? schema.components : [];

  const renderedComponents = components.map((comp: any) => {
    const type = comp.type || "card";
    const title = comp.title || comp.name || "";

    if (type === "hero") {
      return `
        <div class="pdf-card pdf-hero">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
            ${comp.icon ? `<span style="font-size: 28px;">${comp.icon}</span>` : ""}
            <h2 style="font-size: 22px; font-weight: 800; color: #1e1b4b; margin: 0;">${title}</h2>
          </div>
          ${comp.subtitle || comp.content ? `<p style="font-size: 14px; color: #475569; line-height: 1.5; margin: 0;">${comp.subtitle || comp.content}</p>` : ""}
          ${comp.actionText || comp.cta ? `<div style="margin-top: 12px;"><span class="pdf-btn">${comp.actionText || comp.cta} →</span></div>` : ""}
        </div>
      `;
    }

    if (type === "metric") {
      return `
        <div class="pdf-card pdf-metric">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b;">${title}</div>
              <div style="font-size: 26px; font-weight: 800; color: #1e1b4b; margin-top: 4px;">${comp.value || "0"}</div>
            </div>
            ${comp.change ? `<span class="pdf-badge ${String(comp.change).startsWith("-") ? "badge-neg" : "badge-pos"}">${comp.change}</span>` : comp.icon ? `<span style="font-size: 24px;">${comp.icon}</span>` : ""}
          </div>
        </div>
      `;
    }

    if (type === "table") {
      const cols: string[] = Array.isArray(comp.columns) ? comp.columns : ["Item", "Category", "Status", "Value"];
      const rows: any[][] = Array.isArray(comp.rows) ? comp.rows : [];
      return `
        <div class="pdf-card">
          <h3 style="font-size: 16px; font-weight: 700; color: #1e1b4b; margin-bottom: 12px;">${title}</h3>
          <table class="pdf-table">
            <thead>
              <tr>
                ${cols.map((c) => `<th>${c}</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${rows
                .map(
                  (row) => `
                <tr>
                  ${(Array.isArray(row) ? row : [row]).map((cell) => `<td>${cell}</td>`).join("")}
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </div>
      `;
    }

    if (type === "timeline") {
      const events = Array.isArray(comp.events) ? comp.events : [];
      return `
        <div class="pdf-card">
          <h3 style="font-size: 16px; font-weight: 700; color: #1e1b4b; margin-bottom: 14px;">${title}</h3>
          <div class="pdf-timeline">
            ${events
              .map(
                (ev: any) => `
              <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-body">
                  <div style="display: flex; justify-content: space-between; align-items: baseline;">
                    <div style="font-weight: 700; font-size: 14px; color: #1e1b4b;">${ev.title || "Milestone"}</div>
                    ${ev.date ? `<div style="font-size: 12px; font-weight: 600; color: #4338ca;">${ev.date}</div>` : ""}
                  </div>
                  ${ev.description ? `<div style="font-size: 12px; color: #64748b; margin-top: 3px; line-height: 1.4;">${ev.description}</div>` : ""}
                </div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      `;
    }

    if (type === "form") {
      const fields = Array.isArray(comp.fields) ? comp.fields : [];
      return `
        <div class="pdf-card">
          <h3 style="font-size: 16px; font-weight: 700; color: #1e1b4b; margin-bottom: 14px;">${title}</h3>
          <div class="pdf-form-grid">
            ${fields
              .map(
                (f: any) => `
              <div class="pdf-form-group">
                <label>${f.label || f.name}</label>
                <div class="pdf-input-box">${f.placeholder || f.fieldType || "Input"}</div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      `;
    }

    if (type === "chart") {
      const labels = Array.isArray(comp.labels) ? comp.labels : ["Metric A", "Metric B", "Metric C", "Metric D"];
      const dataset = comp.datasets?.[0]?.data || [65, 45, 80, 55];
      return `
        <div class="pdf-card">
          <h3 style="font-size: 16px; font-weight: 700; color: #1e1b4b; margin-bottom: 12px;">${title} <span style="font-size: 12px; color: #64748b; font-weight: 400;">(${comp.chartType || "Distribution"})</span></h3>
          <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 10px;">
            ${labels
              .map((lbl: string, idx: number) => {
                const val = dataset[idx] || 50;
                const pct = Math.min(100, Math.max(10, val));
                return `
                <div style="display: flex; align-items: center; gap: 10px; font-size: 12px;">
                  <span style="width: 110px; font-weight: 600; color: #334155;">${lbl}</span>
                  <div style="flex: 1; height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
                    <div style="height: 100%; width: ${pct}%; background: #4f46e5; border-radius: 4px;"></div>
                  </div>
                  <span style="width: 40px; text-align: right; color: #64748b; font-weight: 600;">${val}</span>
                </div>
              `;
              })
              .join("")}
          </div>
        </div>
      `;
    }

    if (type === "progress") {
      const val = comp.value || 75;
      return `
        <div class="pdf-card">
          <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 14px; color: #1e1b4b; margin-bottom: 6px;">
            <span>${title}</span>
            <span style="color: #4338ca;">${val}%</span>
          </div>
          <div style="height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden; margin-bottom: 6px;">
            <div style="height: 100%; width: ${val}%; background: #4f46e5; border-radius: 4px;"></div>
          </div>
          ${comp.label ? `<div style="font-size: 12px; color: #64748b;">${comp.label}</div>` : ""}
        </div>
      `;
    }

    // Default card
    return `
      <div class="pdf-card">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          ${comp.icon ? `<span style="font-size: 20px;">${comp.icon}</span>` : ""}
          <h3 style="font-size: 16px; font-weight: 700; color: #1e1b4b; margin: 0;">${title}</h3>
        </div>
        <p style="font-size: 13px; color: #475569; line-height: 1.5; margin: 0;">${comp.content || comp.subtitle || ""}</p>
      </div>
    `;
  }).join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${safeTitle} - FlowForge AI Export</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 12mm 14mm;
    }
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: #ffffff !important;
      color: #0f172a !important;
      padding: 16px;
      line-height: 1.4;
      font-size: 13px;
    }
    .pdf-header {
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 14px;
      margin-bottom: 18px;
    }
    .pdf-brand {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    .pdf-logo {
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #4338ca;
      background: #eef2ff;
      padding: 4px 10px;
      border-radius: 12px;
      display: inline-block;
    }
    .pdf-date {
      font-size: 11px;
      color: #64748b;
      font-weight: 500;
    }
    .pdf-title {
      font-size: 24px;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.02em;
      margin: 4px 0;
    }
    .pdf-desc {
      font-size: 13px;
      color: #475569;
      line-height: 1.5;
      max-width: 680px;
    }
    .pdf-grid {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .pdf-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 16px 18px;
      page-break-inside: avoid;
    }
    .pdf-hero {
      background: linear-gradient(135deg, #eef2ff 0%, #faf5ff 100%);
      border: 1px solid #c7d2fe;
    }
    .pdf-btn {
      display: inline-block;
      background: #4338ca;
      color: #ffffff;
      font-weight: 700;
      font-size: 12px;
      padding: 6px 14px;
      border-radius: 6px;
    }
    .pdf-badge {
      font-size: 11px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 6px;
    }
    .badge-pos { background: #dcfce7; color: #15803d; }
    .badge-neg { background: #fee2e2; color: #b91c1c; }
    .pdf-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
      text-align: left;
    }
    .pdf-table th {
      background: #edf2f7;
      color: #475569;
      font-weight: 700;
      padding: 8px 10px;
      border-bottom: 1px solid #cbd5e1;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .pdf-table td {
      padding: 8px 10px;
      border-bottom: 1px solid #e2e8f0;
      color: #1e293b;
    }
    .pdf-table tr:nth-child(even) td {
      background: #ffffff;
    }
    .pdf-timeline {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .timeline-item {
      display: flex;
      gap: 10px;
    }
    .timeline-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #4338ca;
      margin-top: 5px;
      flex-shrink: 0;
    }
    .timeline-body {
      flex: 1;
    }
    .pdf-form-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }
    .pdf-form-group label {
      display: block;
      font-size: 11px;
      font-weight: 600;
      color: #475569;
      margin-bottom: 3px;
    }
    .pdf-input-box {
      border: 1px solid #cbd5e1;
      background: #ffffff;
      padding: 6px 10px;
      border-radius: 6px;
      font-size: 12px;
      color: #94a3b8;
    }
    .pdf-footer {
      margin-top: 24px;
      padding-top: 10px;
      border-top: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      color: #94a3b8;
    }
  </style>
</head>
<body>
  <header class="pdf-header">
    <div class="pdf-brand">
      <span class="pdf-logo">⚡ FlowForge AI Studio</span>
      <span class="pdf-date">${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
    </div>
    <h1 class="pdf-title">${safeTitle}</h1>
    ${safeDesc ? `<p class="pdf-desc">${safeDesc}</p>` : ""}
  </header>

  <main class="pdf-grid">
    ${renderedComponents}
  </main>

  <footer class="pdf-footer">
    <span>Generated by FlowForge AI Application Engine</span>
    <span>Ready for Print & Archival PDF</span>
  </footer>
</body>
</html>`;
}

/**
 * Directly exports the entire layout as a high-resolution PDF document.
 */
export function downloadDirectPDF(schema: ExportUISchema): void {
  const html = buildPrintableHTML(schema);

  // Create an invisible iframe to host the print stream
  let iframe = document.getElementById("flowforge-print-frame") as HTMLIFrameElement | null;
  if (!iframe) {
    iframe = document.createElement("iframe");
    iframe.id = "flowforge-print-frame";
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "none";
    document.body.appendChild(iframe);
  }

  const doc = iframe.contentWindow?.document || iframe.contentDocument;
  if (!doc) return;

  doc.open();
  doc.write(html);
  doc.close();

  // Trigger high-fidelity print / Save as PDF
  setTimeout(() => {
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    }
  }, 300);
}
