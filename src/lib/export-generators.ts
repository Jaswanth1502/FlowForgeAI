/**
 * FlowForge Code & Schema Export Generators
 * Generates standalone, executable code for React, Next.js, HTML, and AI Agents.
 */

export interface ExportUISchema {
  title: string;
  description?: string;
  components: Array<Record<string, any>>;
}

/**
 * Generate a complete, standalone, runnable React / Next.js component.
 * Can be pasted directly into any VS Code React/Next.js project and runs with 0 extra configuration.
 */
export function generateReactComponent(schema: ExportUISchema): string {
  const safeSchema = JSON.stringify(schema, null, 2);

  return `"use client";
import React, { useState } from "react";

// FlowForge AI Generated UI Component
// Paste this file directly into your React / Next.js project (e.g. components/GeneratedUI.tsx)

export const FLOWFORGE_SCHEMA = ${safeSchema};

export default function FlowForgeUI() {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent, title: string) => {
    e.preventDefault();
    setSubmitted(true);
    alert(\`Form "\${title}" submitted successfully!\\n\\nData: \${JSON.stringify(formData, null, 2)}\`);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0b0f19",
      color: "#f1f5f9",
      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      padding: "32px 16px"
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Header */}
        <header style={{ marginBottom: "32px", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 14px", borderRadius: "20px", background: "rgba(99,102,241,0.12)", color: "#818cf8", fontSize: "13px", fontWeight: 600, marginBottom: "12px" }}>
            ⚡ FlowForge AI Application
          </div>
          <h1 style={{ fontSize: "32px", fontWeight: 800, margin: "0 0 8px 0", letterSpacing: "-0.02em" }}>
            {FLOWFORGE_SCHEMA.title}
          </h1>
          {FLOWFORGE_SCHEMA.description && (
            <p style={{ color: "#94a3b8", fontSize: "16px", maxWidth: "680px", margin: "0 auto" }}>
              {FLOWFORGE_SCHEMA.description}
            </p>
          )}
        </header>

        {/* Components Grid */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {FLOWFORGE_SCHEMA.components.map((comp: any, idx: number) => {
            if (comp.type === "hero") {
              return (
                <section key={idx} style={{
                  padding: "36px",
                  borderRadius: "16px",
                  background: "linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(124, 58, 237, 0.08))",
                  border: "1px solid rgba(255, 255, 255, 0.1)"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                    {comp.icon && <span style={{ fontSize: "32px" }}>{comp.icon}</span>}
                    <h2 style={{ fontSize: "28px", fontWeight: 800, margin: 0 }}>{comp.title}</h2>
                  </div>
                  {(comp.subtitle || comp.content) && (
                    <p style={{ color: "#cbd5e1", fontSize: "16px", lineHeight: 1.6, maxWidth: "720px", marginBottom: "16px" }}>
                      {comp.subtitle || comp.content}
                    </p>
                  )}
                  {(comp.actionText || comp.cta) && (
                    <button
                      onClick={() => alert(\`Action triggered: \${comp.actionText || comp.cta}\`)}
                      style={{
                        padding: "12px 24px",
                        borderRadius: "10px",
                        background: "#6366f1",
                        color: "white",
                        fontWeight: 600,
                        border: "none",
                        cursor: "pointer",
                        boxShadow: "0 4px 14px rgba(99, 102, 241, 0.4)"
                      }}
                    >
                      {comp.actionText || comp.cta} →
                    </button>
                  )}
                </section>
              );
            }

            if (comp.type === "button") {
              const isGoogle = comp.action === "google-signin" || /google/i.test(String(comp.label || ""));
              const isDemo = comp.action === "demo-login" || /demo/i.test(String(comp.label || ""));
              return (
                <div key={idx} style={{ marginTop: "4px" }}>
                  <button
                    onClick={() => alert(\`Action: \${comp.label || comp.action}\`)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "12px 24px",
                      borderRadius: "8px",
                      background: isGoogle ? "rgba(255,255,255,0.08)" : isDemo ? "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(124,58,237,0.15))" : "#6366f1",
                      border: isGoogle ? "1px solid rgba(255,255,255,0.15)" : isDemo ? "1px solid rgba(99,102,241,0.4)" : "none",
                      color: "white",
                      fontWeight: 600,
                      cursor: "pointer",
                      fontSize: "14px",
                      boxShadow: isGoogle || isDemo ? "none" : "0 4px 14px rgba(99, 102, 241, 0.4)"
                    }}
                  >
                    {isGoogle ? "🌐 " : isDemo ? "⚡ " : ""}{comp.label}
                  </button>
                </div>
              );
            }

            if (comp.type === "card") {
              return (
                <div key={idx} style={{
                  padding: "24px",
                  borderRadius: "14px",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                    {comp.icon && <span style={{ fontSize: "22px" }}>{comp.icon}</span>}
                    <h3 style={{ fontSize: "18px", fontWeight: 700, margin: 0 }}>{comp.title}</h3>
                  </div>
                  <p style={{ color: "#cbd5e1", lineHeight: 1.6, margin: 0, whiteSpace: "pre-line" }}>
                    {comp.content}
                  </p>
                </div>
              );
            }

            if (comp.type === "grid") {
              const items = Array.isArray(comp.items) ? comp.items : [];
              return (
                <div key={idx} style={{
                  padding: "24px",
                  borderRadius: "14px",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)"
                }}>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "16px" }}>{comp.title}</h3>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: "16px"
                  }}>
                    {items.map((item: any, iIdx: number) => (
                      <div key={iIdx} style={{
                        padding: "18px",
                        borderRadius: "12px",
                        background: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid rgba(255, 255, 255, 0.06)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between"
                      }}>
                        <div>
                          <h4 style={{ fontSize: "16px", fontWeight: 700, margin: "0 0 8px 0" }}>{item.title}</h4>
                          {item.description && (
                            <p style={{ color: "#94a3b8", fontSize: "13px", lineHeight: 1.5, margin: "0 0 12px 0" }}>
                              {item.description}
                            </p>
                          )}
                        </div>
                        {Array.isArray(item.tags) && item.tags.length > 0 && (
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                            {item.tags.map((tag: string, tIdx: number) => (
                              <span key={tIdx} style={{
                                fontSize: "11px",
                                padding: "3px 8px",
                                borderRadius: "4px",
                                background: "rgba(99, 102, 241, 0.15)",
                                color: "#818cf8"
                              }}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            if (comp.type === "metric") {
              return (
                <div key={idx} style={{
                  padding: "20px 24px",
                  borderRadius: "14px",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}>
                  <div>
                    <div style={{ color: "#94a3b8", fontSize: "13px", fontWeight: 500, marginBottom: "4px" }}>
                      {comp.title}
                    </div>
                    <div style={{ fontSize: "28px", fontWeight: 800 }}>{comp.value}</div>
                  </div>
                  {comp.icon && <span style={{ fontSize: "32px" }}>{comp.icon}</span>}
                </div>
              );
            }

            if (comp.type === "progress") {
              return (
                <div key={idx} style={{
                  padding: "20px 24px",
                  borderRadius: "14px",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontWeight: 600 }}>
                    <span>{comp.title}</span>
                    <span style={{ color: "#818cf8" }}>{comp.value}%</span>
                  </div>
                  <div style={{ width: "100%", height: "10px", borderRadius: "5px", background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                    <div style={{ width: \`\${comp.value}%\`, height: "100%", background: "#6366f1", borderRadius: "5px" }} />
                  </div>
                  {comp.label && <div style={{ color: "#94a3b8", fontSize: "12px", marginTop: "8px" }}>{comp.label}</div>}
                </div>
              );
            }

            if (comp.type === "table") {
              const columns = Array.isArray(comp.columns) ? comp.columns : [];
              const rows = Array.isArray(comp.rows) ? comp.rows : [];
              return (
                <div key={idx} style={{
                  padding: "24px",
                  borderRadius: "14px",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  overflowX: "auto"
                }}>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "16px" }}>{comp.title}</h3>
                  <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)", color: "#94a3b8" }}>
                        {columns.map((col: string, cIdx: number) => (
                          <th key={cIdx} style={{ padding: "12px 14px", fontWeight: 600 }}>{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row: any[], rIdx: number) => (
                        <tr key={rIdx} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.04)" }}>
                          {row.map((cell: any, cIdx: number) => (
                            <td key={cIdx} style={{ padding: "12px 14px" }}>{String(cell)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            }

            if (comp.type === "timeline") {
              const events = Array.isArray(comp.events) ? comp.events : [];
              return (
                <div key={idx} style={{
                  padding: "24px",
                  borderRadius: "14px",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)"
                }}>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "16px" }}>{comp.title}</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {events.map((event: any, eIdx: number) => (
                      <div key={eIdx} style={{ display: "flex", gap: "14px" }}>
                        <div style={{
                          width: "12px",
                          height: "12px",
                          borderRadius: "50%",
                          background: event.status === "completed" ? "#10b981" : "#6366f1",
                          marginTop: "4px",
                          flexShrink: 0
                        }} />
                        <div>
                          <div style={{ fontWeight: 600, fontSize: "15px" }}>{event.title}</div>
                          {event.date && <div style={{ fontSize: "12px", color: "#818cf8", marginTop: "2px" }}>{event.date}</div>}
                          {event.description && <div style={{ fontSize: "13px", color: "#94a3b8", marginTop: "4px" }}>{event.description}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            if (comp.type === "form") {
              const fields = Array.isArray(comp.fields) ? comp.fields : [];
              return (
                <form key={idx} onSubmit={(e) => handleFormSubmit(e, comp.title)} style={{
                  padding: "24px",
                  borderRadius: "14px",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px"
                }}>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, margin: 0 }}>{comp.title}</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "14px" }}>
                    {fields.map((field: any, fIdx: number) => (
                      <div key={fIdx} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <label style={{ fontSize: "13px", fontWeight: 500, color: "#cbd5e1" }}>{field.label}</label>
                        {field.fieldType === "select" ? (
                          <select
                            onChange={(e) => handleInputChange(field.name, e.target.value)}
                            style={{
                              padding: "10px 12px",
                              borderRadius: "8px",
                              background: "#1e293b",
                              border: "1px solid rgba(255,255,255,0.1)",
                              color: "white"
                            }}
                          >
                            <option value="">Select option...</option>
                            {(field.options || []).map((opt: string, oIdx: number) => (
                              <option key={oIdx} value={opt}>{opt}</option>
                            ))}
                          </select>
                        ) : field.fieldType === "textarea" ? (
                          <textarea
                            placeholder={field.placeholder}
                            onChange={(e) => handleInputChange(field.name, e.target.value)}
                            rows={3}
                            style={{
                              padding: "10px 12px",
                              borderRadius: "8px",
                              background: "#1e293b",
                              border: "1px solid rgba(255,255,255,0.1)",
                              color: "white",
                              resize: "vertical"
                            }}
                          />
                        ) : (
                          <input
                            type={field.fieldType || "text"}
                            placeholder={field.placeholder}
                            onChange={(e) => handleInputChange(field.name, e.target.value)}
                            style={{
                              padding: "10px 12px",
                              borderRadius: "8px",
                              background: "#1e293b",
                              border: "1px solid rgba(255,255,255,0.1)",
                              color: "white"
                            }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    type="submit"
                    style={{
                      alignSelf: "flex-start",
                      padding: "12px 24px",
                      borderRadius: "8px",
                      background: "#6366f1",
                      color: "white",
                      fontWeight: 600,
                      border: "none",
                      cursor: "pointer",
                      marginTop: "8px"
                    }}
                  >
                    Submit Form
                  </button>
                </form>
              );
            }

            return null;
          })}
        </div>
      </div>
    </div>
  );
}
`;
}

/**
 * Generate a complete, standalone, runnable HTML + CSS + JS webpage.
 * Can be opened in any browser or with VS Code Live Server to immediately run the UI!
 */
export function generateHTMLWebpage(schema: ExportUISchema): string {
  const safeSchema = JSON.stringify(schema, null, 2);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${schema.title || "FlowForge AI Generated Application"}</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    :root {
      --bg: #0b0f19;
      --card-bg: rgba(255, 255, 255, 0.03);
      --border: rgba(255, 255, 255, 0.08);
      --accent: #6366f1;
      --accent-light: #818cf8;
      --text: #f1f5f9;
      --text-muted: #94a3b8;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      padding: 32px 16px;
      line-height: 1.5;
    }
    .container { max-width: 1100px; margin: 0 auto; }
    header { text-align: center; margin-bottom: 32px; }
    .badge {
      display: inline-block;
      padding: 6px 14px;
      border-radius: 20px;
      background: rgba(99, 102, 241, 0.15);
      color: var(--accent-light);
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 12px;
    }
    h1 { font-size: 32px; font-weight: 800; margin-bottom: 8px; }
    .desc { color: var(--text-muted); font-size: 16px; max-width: 680px; margin: 0 auto; }
    .stack { display: flex; flex-direction: column; gap: 24px; }
    .card {
      padding: 24px;
      border-radius: 14px;
      background: var(--card-bg);
      border: 1px solid var(--border);
    }
    .hero {
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(124, 58, 237, 0.08));
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 36px;
      border-radius: 16px;
    }
    .btn {
      display: inline-block;
      padding: 12px 24px;
      border-radius: 8px;
      background: var(--accent);
      color: white;
      font-weight: 600;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4);
      margin-top: 12px;
      text-decoration: none;
    }
    .btn-google {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid var(--border);
      color: white;
      box-shadow: none;
    }
    .btn-demo {
      background: linear-gradient(135deg, rgba(99,102,241,0.2), rgba(124,58,237,0.15));
      border: 1px solid rgba(99, 102, 241, 0.4);
      color: var(--accent-light);
      box-shadow: none;
    }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; }
    .grid-item {
      padding: 16px;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border);
    }
    .tag {
      font-size: 11px;
      padding: 3px 8px;
      border-radius: 4px;
      background: rgba(99, 102, 241, 0.15);
      color: var(--accent-light);
      display: inline-block;
      margin-top: 8px;
      margin-right: 4px;
    }
    table { width: 100%; border-collapse: collapse; text-align: left; }
    th { padding: 12px; border-bottom: 1px solid var(--border); color: var(--text-muted); font-size: 13px; }
    td { padding: 12px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-size: 14px; }
    .progress-bar { width: 100%; height: 10px; border-radius: 5px; background: rgba(255,255,255,0.08); overflow: hidden; margin: 8px 0; }
    .progress-fill { height: 100%; background: var(--accent); border-radius: 5px; }
    .form-group { margin-bottom: 14px; display: flex; flex-direction: column; gap: 6px; }
    input, select, textarea {
      padding: 10px 12px;
      border-radius: 8px;
      background: #1e293b;
      border: 1px solid var(--border);
      color: white;
      font-family: inherit;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="badge">⚡ FlowForge AI Application</div>
      <h1>${schema.title}</h1>
      ${schema.description ? `<p class="desc">${schema.description}</p>` : ""}
    </header>

    <div id="app" class="stack"></div>
  </div>

  <script>
    const SCHEMA = ${safeSchema};
    const app = document.getElementById("app");

    SCHEMA.components.forEach((comp, idx) => {
      const el = document.createElement("div");

      if (comp.type === "hero") {
        el.className = "hero";
        el.innerHTML = \`
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;">
            \${comp.icon ? \`<span style="font-size:32px;">\${comp.icon}</span>\` : ""}
            <h2 style="font-size:26px;font-weight:800;">\${comp.title}</h2>
          </div>
          \${comp.subtitle || comp.content ? \`<p style="color:#cbd5e1;font-size:16px;max-width:720px;margin-bottom:16px;">\${comp.subtitle || comp.content}</p>\` : ""}
          \${comp.actionText || comp.cta ? \`<button class="btn" onclick="alert('Action triggered!')">\${comp.actionText || comp.cta} →</button>\` : ""}
        \`;
      } else if (comp.type === "grid") {
        el.className = "card";
        const items = comp.items || [];
        el.innerHTML = \`
          <h3 style="font-size:18px;margin-bottom:16px;">\${comp.title}</h3>
          <div class="grid">
            \${items.map(item => \`
              <div class="grid-item">
                <h4 style="font-size:16px;font-weight:700;">\${item.title}</h4>
                \${item.description ? \`<p style="color:#94a3b8;font-size:13px;margin:6px 0 10px 0;">\${item.description}</p>\` : ""}
                \${Array.isArray(item.tags) ? item.tags.map(t => \`<span class="tag">\${t}</span>\`).join("") : ""}
              </div>
            \`).join("")}
          </div>
        \`;
      } else if (comp.type === "table") {
        el.className = "card";
        const cols = comp.columns || [];
        const rows = comp.rows || [];
        el.innerHTML = \`
          <h3 style="font-size:18px;margin-bottom:16px;">\${comp.title}</h3>
          <div style="overflow-x:auto;">
            <table>
              <thead><tr>\${cols.map(c => \`<th>\${c}</th>\`).join("")}</tr></thead>
              <tbody>
                \${rows.map(r => \`<tr>\${r.map(cell => \`<td>\${cell}</td>\`).join("")}</tr>\`).join("")}
              </tbody>
            </table>
          </div>
        \`;
      } else if (comp.type === "metric") {
        el.className = "card";
        el.innerHTML = \`
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <div>
              <div style="color:var(--text-muted);font-size:13px;">\${comp.title}</div>
              <div style="font-size:28px;font-weight:800;margin-top:4px;">\${comp.value}</div>
            </div>
            \${comp.icon ? \`<span style="font-size:32px;">\${comp.icon}</span>\` : ""}
          </div>
        \`;
      } else if (comp.type === "progress") {
        el.className = "card";
        el.innerHTML = \`
          <div style="display:flex;justify-content:space-between;margin-bottom:4px;font-weight:600;">
            <span>\${comp.title}</span>
            <span style="color:var(--accent-light);">\${comp.value}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width:\${comp.value}%;"></div>
          </div>
          \${comp.label ? \`<div style="color:var(--text-muted);font-size:12px;">\${comp.label}</div>\` : ""}
        \`;
      } else if (comp.type === "timeline") {
        el.className = "card";
        const events = comp.events || [];
        el.innerHTML = \`
          <h3 style="font-size:18px;margin-bottom:16px;">\${comp.title}</h3>
          <div style="display:flex;flex-direction:column;gap:14px;">
            \${events.map(ev => \`
              <div style="display:flex;gap:12px;">
                <div style="width:10px;height:10px;border-radius:50%;background:var(--accent);margin-top:5px;"></div>
                <div>
                  <div style="font-weight:600;font-size:15px;">\${ev.title}</div>
                  \${ev.date ? \`<div style="font-size:12px;color:var(--accent-light);">\${ev.date}</div>\` : ""}
                  \${ev.description ? \`<div style="font-size:13px;color:var(--text-muted);">\${ev.description}</div>\` : ""}
                </div>
              </div>
            \`).join("")}
          </div>
        \`;
      } else if (comp.type === "button") {
        el.className = "button-wrapper";
        const isGoogle = comp.action === "google-signin" || /google/i.test(comp.label || "");
        const isDemo = comp.action === "demo-login" || /demo/i.test(comp.label || "");
        el.innerHTML = \`
          <button class="btn \${isGoogle ? 'btn-google' : isDemo ? 'btn-demo' : ''}" onclick="alert('Action triggered: \${comp.label || comp.action}')">
            \${isGoogle ? '🌐 ' : isDemo ? '⚡ ' : ''}\${comp.label}
          </button>
        \`;
      } else if (comp.type === "form") {
        el.className = "card";
        const fields = comp.fields || [];
        el.innerHTML = \`
          <h3 style="font-size:18px;margin-bottom:16px;">\${comp.title}</h3>
          <form onsubmit="event.preventDefault(); alert('Form submitted successfully!');">
            <div class="grid">
              \${fields.map(f => \`
                <div class="form-group">
                  <label style="font-size:13px;color:#cbd5e1;">\${f.label}</label>
                  <input type="\${f.fieldType || 'text'}" placeholder="\${f.placeholder || ''}" />
                </div>
              \`).join("")}
            </div>
            <button type="submit" class="btn">Submit Form</button>
          </form>
        \`;
      } else if (comp.type === "card") {
        el.className = "card";
        el.innerHTML = \`
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
            \${comp.icon ? \`<span style="font-size:22px;">\${comp.icon}</span>\` : ""}
            <h3 style="font-size:18px;font-weight:700;">\${comp.title}</h3>
          </div>
          <p style="color:#cbd5e1;line-height:1.6;white-space:pre-line;">\${comp.content}</p>
        \`;
      }

      app.appendChild(el);
    });
  </script>
</body>
</html>
`;
}
