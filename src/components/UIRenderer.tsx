"use client";
import { useState } from "react";
import dynamic from "next/dynamic";

const ChartComponent = dynamic(() => import("./ChartComponent"), { ssr: false });

/* eslint-disable @typescript-eslint/no-explicit-any */

interface UISchema {
  title: string;
  description?: string;
  components: any[];
}

export default function UIRenderer({ schema }: { schema: UISchema }) {
  if (!schema || !schema.components || !Array.isArray(schema.components)) return null;

  return (
    <div className="ui-renderer">
      <div className="renderer-header" style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: 800, color: "var(--text-primary)", marginBottom: "6px" }}>{schema.title}</h2>
        {schema.description && <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6 }}>{schema.description}</p>}
      </div>
      <div className="components-grid" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {schema.components.map((comp: any, i: number) => (
          <div key={`${comp.type}-${i}`} className={`component-wrapper component-${comp.type}`} style={{ animationDelay: `${i * 80}ms` }}>
            <RenderComponent component={comp} />
          </div>
        ))}
      </div>
    </div>
  );
}

function RenderComponent({ component }: { component: any }) {
  if (!component || !component.type) return null;

  switch (component.type.toLowerCase()) {
    case "hero":
      return <HeroComponent data={component} />;
    case "list":
      return <ListComponent data={component} />;
    case "grid":
      return <GridComponent data={component} />;
    case "metric":
    case "metrics":
      return <MetricsContainer data={component} />;
    case "card":
      return <CardComponent data={component} />;
    case "chart":
    case "charts":
      return <ChartCard data={component} />;
    case "table":
    case "tables":
      return <TableComponent data={component} />;
    case "form":
      return <FormComponent data={component} />;
    case "button":
      return <ButtonComponent data={component} />;
    case "progress":
      return <ProgressComponent data={component} />;
    case "timeline":
      return <TimelineComponent data={component} />;
    default:
      return (
        <div className="card-component" style={{ padding: "20px", borderRadius: "12px", background: "var(--bg-glass)", border: "1px solid var(--border)" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px" }}>{component.title || component.type}</h3>
          {component.description && <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>{component.description}</p>}
        </div>
      );
  }
}

function HeroComponent({ data }: { data: any }) {
  return (
    <div className="hero-component" style={{
      padding: "32px",
      borderRadius: "var(--radius-lg)",
      background: "linear-gradient(135deg, rgba(99, 102, 241, 0.14), rgba(124, 58, 237, 0.08))",
      border: "1px solid var(--border)",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      position: "relative"
    }}>
      {data.badge && (
        <div style={{
          display: "inline-flex",
          alignSelf: "flex-start",
          padding: "4px 12px",
          borderRadius: "16px",
          background: "rgba(99, 102, 241, 0.2)",
          color: "var(--primary-indigo)",
          fontSize: "12px",
          fontWeight: 700
        }}>
          {data.badge}
        </div>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {data.icon && <span style={{ fontSize: "28px" }}>{data.icon}</span>}
        <h2 style={{ fontSize: "26px", fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>{data.title}</h2>
      </div>
      {(data.subtitle || data.content || data.description) && (
        <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0, maxWidth: "720px" }}>
          {data.subtitle || data.content || data.description}
        </p>
      )}
      {(data.ctaText || data.actionText || data.cta) && (
        <div style={{ marginTop: "8px" }}>
          <button
            className="rendered-button variant-primary"
            onClick={() => alert(`Action: ${data.ctaText || data.actionText || data.cta}`)}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
              color: "#ffffff",
              border: "none",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            {data.ctaText || data.actionText || data.cta} →
          </button>
        </div>
      )}
    </div>
  );
}

function ListComponent({ data }: { data: any }) {
  const items = Array.isArray(data.items) ? data.items : [];
  return (
    <div className="list-component" style={{
      padding: "24px",
      borderRadius: "var(--radius-lg)",
      background: "var(--bg-glass)",
      border: "1px solid var(--border)"
    }}>
      {data.title && <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px", color: "var(--text-primary)" }}>{data.title}</h3>}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {items.map((item: any, idx: number) => (
          <div key={idx} style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            borderRadius: "8px",
            background: "rgba(99, 102, 241, 0.05)",
            border: "1px solid var(--border)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {item.icon && <span style={{ fontSize: "18px" }}>{item.icon}</span>}
              <div>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>{item.title || item.label || String(item)}</div>
                {(item.subtitle || item.description) && (
                  <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>{item.subtitle || item.description}</div>
                )}
              </div>
            </div>
            {item.badge && (
              <span style={{
                fontSize: "11px",
                fontWeight: 600,
                padding: "3px 8px",
                borderRadius: "12px",
                background: "rgba(99, 102, 241, 0.15)",
                color: "var(--accent-light)"
              }}>
                {item.badge}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function GridComponent({ data }: { data: any }) {
  const items = Array.isArray(data.items) ? data.items : [];
  return (
    <div className="grid-component" style={{
      padding: "24px",
      borderRadius: "var(--radius-lg)",
      background: "var(--bg-glass)",
      border: "1px solid var(--border)"
    }}>
      {data.title && <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px", color: "var(--text-primary)" }}>{data.title}</h3>}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "14px"
      }}>
        {items.map((item: any, idx: number) => (
          <div key={idx} style={{
            padding: "16px",
            borderRadius: "10px",
            background: "var(--bg-secondary)",
            border: "1px solid var(--border)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}>
            <div>
              <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "6px" }}>
                {item.title || item.label}
              </div>
              {(item.description || item.subtitle) && (
                <div style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: "10px" }}>
                  {item.description || item.subtitle}
                </div>
              )}
            </div>
            {Array.isArray(item.tags) && item.tags.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "8px" }}>
                {item.tags.map((tag: string, tIdx: number) => (
                  <span key={tIdx} style={{
                    fontSize: "11px",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    background: "rgba(99, 102, 241, 0.12)",
                    color: "var(--accent-light)"
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

function MetricsContainer({ data }: { data: any }) {
  const items = Array.isArray(data.items) ? data.items : [data];

  return (
    <div className="metrics-section" style={{ width: "100%" }}>
      {data.title && <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "12px", color: "var(--text-primary)" }}>{data.title}</h3>}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "14px"
      }}>
        {items.map((item: any, idx: number) => (
          <MetricComponent key={idx} data={item} />
        ))}
      </div>
    </div>
  );
}

function MetricComponent({ data }: { data: any }) {
  return (
    <div className="metric-card" style={{
      padding: "20px",
      borderRadius: "var(--radius-lg)",
      background: "var(--bg-glass)",
      border: "1px solid var(--border)",
      display: "flex",
      flexDirection: "column",
      gap: "6px"
    }}>
      <div className="metric-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span className="metric-title" style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)" }}>
          {data.label || data.title}
        </span>
        {data.icon && <span className="metric-icon" style={{ fontSize: "18px" }}>{data.icon}</span>}
      </div>
      <div className="metric-value" style={{ fontSize: "24px", fontWeight: 800, color: "var(--text-primary)" }}>
        {data.value}
      </div>
      {data.change && (
        <div style={{
          fontSize: "12px",
          fontWeight: 600,
          color: data.trend === "up" ? "#10b981" : data.trend === "down" ? "#ef4444" : "var(--text-muted)",
          display: "flex",
          alignItems: "center",
          gap: "4px"
        }}>
          <span>{data.trend === "up" ? "↑" : data.trend === "down" ? "↓" : "→"}</span>
          <span>{data.change}</span>
        </div>
      )}
    </div>
  );
}

function CardComponent({ data }: { data: any }) {
  return (
    <div className="card-component" style={{
      padding: "24px",
      borderRadius: "var(--radius-lg)",
      background: "var(--bg-glass)",
      border: "1px solid var(--border)"
    }}>
      <div className="card-header-row" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
        {data.icon && <span className="card-icon" style={{ fontSize: "20px" }}>{data.icon}</span>}
        <h3 style={{ fontSize: "17px", fontWeight: 700, margin: 0, color: "var(--text-primary)" }}>{data.title}</h3>
      </div>
      <div className="card-content" style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
        {data.content || data.description}
      </div>
    </div>
  );
}

function ChartCard({ data }: { data: any }) {
  let labels = data.labels;
  let datasets = data.datasets;

  if (!labels && Array.isArray(data.data)) {
    labels = data.data.map((d: any) => d.label || d.name || d.subject || d.month || "Item");
    datasets = [
      {
        label: data.title || "Values",
        data: data.data.map((d: any) => (typeof d.value === "number" ? d.value : parseFloat(d.value) || 0)),
        backgroundColor: [
          "rgba(99, 102, 241, 0.8)",
          "rgba(139, 92, 246, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(236, 72, 153, 0.8)"
        ]
      }
    ];
  }

  return (
    <div className="chart-card" style={{
      padding: "24px",
      borderRadius: "var(--radius-lg)",
      background: "var(--bg-glass)",
      border: "1px solid var(--border)"
    }}>
      <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "4px", color: "var(--text-primary)" }}>{data.title}</h3>
      {data.description && <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "16px" }}>{data.description}</p>}
      <ChartComponent
        chartType={data.chartType || "bar"}
        labels={labels || ["Item A", "Item B", "Item C", "Item D"]}
        datasets={datasets || [{ label: data.title || "Data", data: [40, 65, 80, 95], backgroundColor: "rgba(99, 102, 241, 0.8)" }]}
        title={data.title}
      />
    </div>
  );
}

function TableComponent({ data }: { data: any }) {
  const columns = Array.isArray(data.columns) ? data.columns : [];
  const rows = Array.isArray(data.rows) ? data.rows : [];

  return (
    <div className="table-component" style={{
      padding: "24px",
      borderRadius: "var(--radius-lg)",
      background: "var(--bg-glass)",
      border: "1px solid var(--border)"
    }}>
      {data.title && <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px", color: "var(--text-primary)" }}>{data.title}</h3>}
      <div className="table-scroll" style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid var(--border)", color: "var(--text-secondary)" }}>
              {columns.map((col: string, i: number) => (
                <th key={i} style={{ padding: "10px 12px", fontWeight: 600 }}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row: any, i: number) => {
              const cells = Array.isArray(row) ? row : Object.values(row);
              return (
                <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                  {cells.map((cell: any, j: number) => (
                    <td key={j} style={{ padding: "10px 12px", color: "var(--text-primary)" }}>{String(cell)}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FormComponent({ data }: { data: any }) {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Form submitted: " + JSON.stringify(formData, null, 2));
  };

  return (
    <div className="form-component" style={{
      padding: "24px",
      borderRadius: "var(--radius-lg)",
      background: "var(--bg-glass)",
      border: "1px solid var(--border)"
    }}>
      {data.title && <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px", color: "var(--text-primary)" }}>{data.title}</h3>}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {(data.fields || []).map((field: any, i: number) => (
          <div key={i} className="form-field" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label htmlFor={`field-${field.name}`} style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)" }}>{field.label}</label>
            {field.fieldType === "select" ? (
              <select
                id={`field-${field.name}`}
                value={formData[field.name] || ""}
                onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                style={{ padding: "10px", borderRadius: "6px", border: "1px solid var(--border)", background: "var(--bg-secondary)", color: "var(--text-primary)" }}
              >
                <option value="">Select...</option>
                {(field.options || []).map((opt: string, j: number) => (
                  <option key={j} value={opt}>{opt}</option>
                ))}
              </select>
            ) : field.fieldType === "textarea" ? (
              <textarea
                id={`field-${field.name}`}
                placeholder={field.placeholder || ""}
                value={formData[field.name] || ""}
                onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                rows={3}
                style={{ padding: "10px", borderRadius: "6px", border: "1px solid var(--border)", background: "var(--bg-secondary)", color: "var(--text-primary)" }}
              />
            ) : (
              <input
                type={field.fieldType || "text"}
                id={`field-${field.name}`}
                placeholder={field.placeholder || ""}
                value={formData[field.name] || ""}
                onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                style={{ padding: "10px", borderRadius: "6px", border: "1px solid var(--border)", background: "var(--bg-secondary)", color: "var(--text-primary)" }}
              />
            )}
          </div>
        ))}
        <button type="submit" className="form-submit-btn" style={{
          padding: "10px 20px",
          borderRadius: "8px",
          background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
          color: "#ffffff",
          border: "none",
          fontWeight: 600,
          cursor: "pointer",
          alignSelf: "flex-start",
          marginTop: "6px"
        }}>
          Submit
        </button>
      </form>
    </div>
  );
}

function ButtonComponent({ data }: { data: any }) {
  return (
    <button
      className={`rendered-button variant-${data.variant || "primary"}`}
      onClick={() => alert(`Action: ${data.action || data.label}`)}
      style={{
        padding: "10px 20px",
        borderRadius: "8px",
        background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
        color: "#ffffff",
        border: "none",
        fontWeight: 600,
        cursor: "pointer"
      }}
    >
      {data.label || data.title || "Action Button"}
    </button>
  );
}

function ProgressComponent({ data }: { data: any }) {
  const items = Array.isArray(data.items) ? data.items : [data];
  return (
    <div className="progress-component" style={{
      padding: "24px",
      borderRadius: "var(--radius-lg)",
      background: "var(--bg-glass)",
      border: "1px solid var(--border)"
    }}>
      {data.title && <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px", color: "var(--text-primary)" }}>{data.title}</h3>}
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {items.map((item: any, idx: number) => {
          const val = Math.min(100, Math.max(0, item.percentage ?? item.value ?? 50));
          return (
            <div key={idx}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", fontWeight: 600, marginBottom: "6px", color: "var(--text-primary)" }}>
                <span>{item.label || item.title || "Progress Item"}</span>
                <span style={{ color: "var(--primary-indigo)" }}>{val}%</span>
              </div>
              <div style={{ height: "8px", borderRadius: "4px", background: "rgba(99, 102, 241, 0.15)", overflow: "hidden" }}>
                <div style={{ width: `${val}%`, height: "100%", background: "linear-gradient(90deg, #6366f1, #4f46e5)", borderRadius: "4px", transition: "width 0.4s ease" }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TimelineComponent({ data }: { data: any }) {
  const events = Array.isArray(data.events) ? data.events : [];
  return (
    <div className="timeline-component" style={{
      padding: "24px",
      borderRadius: "var(--radius-lg)",
      background: "var(--bg-glass)",
      border: "1px solid var(--border)"
    }}>
      {data.title && <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px", color: "var(--text-primary)" }}>{data.title}</h3>}
      <div className="timeline-list" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {events.map((event: any, i: number) => (
          <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#6366f1", marginTop: "5px", flexShrink: 0 }} />
            <div>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <strong style={{ fontSize: "14px", color: "var(--text-primary)" }}>{event.title}</strong>
                {event.date && <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{event.date}</span>}
              </div>
              {event.description && <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "2px" }}>{event.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
