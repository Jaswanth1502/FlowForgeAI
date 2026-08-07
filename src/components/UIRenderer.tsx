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
  if (!schema || !schema.components) return null;

  return (
    <div className="ui-renderer">
      <div className="renderer-header">
        <h2>{schema.title}</h2>
        {schema.description && <p>{schema.description}</p>}
      </div>
      <div className="components-grid">
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
  switch (component.type) {
    case "hero": return <HeroComponent data={component} />;
    case "list": return <ListComponent data={component} />;
    case "grid": return <GridComponent data={component} />;
    case "metric": return <MetricComponent data={component} />;
    case "card": return <CardComponent data={component} />;
    case "chart": return <ChartCard data={component} />;
    case "table": return <TableComponent data={component} />;
    case "form": return <FormComponent data={component} />;
    case "button": return <ButtonComponent data={component} />;
    case "progress": return <ProgressComponent data={component} />;
    case "timeline": return <TimelineComponent data={component} />;
    default: return <div className="unknown-component">Unknown component: {component.type}</div>;
  }
}

function HeroComponent({ data }: { data: any }) {
  return (
    <div className="hero-component" style={{
      padding: "32px",
      borderRadius: "var(--radius-lg)",
      background: "linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(124, 58, 237, 0.06))",
      border: "1px solid var(--border)",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      position: "relative"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {data.icon && <span style={{ fontSize: "28px" }}>{data.icon}</span>}
        <h2 style={{ fontSize: "26px", fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>{data.title}</h2>
      </div>
      {(data.subtitle || data.content) && (
        <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0, maxWidth: "720px" }}>
          {data.subtitle || data.content}
        </p>
      )}
      {(data.actionText || data.cta) && (
        <div style={{ marginTop: "8px" }}>
          <button
            className="rendered-button variant-primary"
            onClick={() => alert(`Action: ${data.actionText || data.cta}`)}
          >
            {data.actionText || data.cta} →
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
      <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px" }}>{data.title}</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {items.map((item: any, idx: number) => (
          <div key={idx} style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 14px",
            borderRadius: "8px",
            background: "rgba(99, 102, 241, 0.04)",
            border: "1px solid var(--border)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {item.icon && <span>{item.icon}</span>}
              <div>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>{item.title}</div>
                {item.subtitle && <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{item.subtitle}</div>}
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
      <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px" }}>{data.title}</h3>
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
                {item.title}
              </div>
              {item.description && (
                <div style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: "10px" }}>
                  {item.description}
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
                    background: "rgba(99, 102, 241, 0.1)",
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

function MetricComponent({ data }: { data: any }) {
  return (
    <div className="metric-card">
      <div className="metric-header">
        {data.icon && <span className="metric-icon">{data.icon}</span>}
        <span className="metric-title">{data.title}</span>
      </div>
      <div className="metric-value">{data.value}</div>
      {data.change && (
        <div className={`metric-change ${data.trend === "up" ? "trend-up" : data.trend === "down" ? "trend-down" : "trend-neutral"}`}>
          {data.trend === "up" ? "↑" : data.trend === "down" ? "↓" : "→"} {data.change}
        </div>
      )}
    </div>
  );
}

function CardComponent({ data }: { data: any }) {
  return (
    <div className="card-component">
      <div className="card-header-row">
        {data.icon && <span className="card-icon">{data.icon}</span>}
        <h3>{data.title}</h3>
      </div>
      <div className="card-content">{data.content}</div>
    </div>
  );
}

function ChartCard({ data }: { data: any }) {
  return (
    <div className="chart-card">
      <h3>{data.title}</h3>
      <ChartComponent
        chartType={data.chartType}
        labels={data.labels || []}
        datasets={data.datasets || []}
        title={data.title}
      />
    </div>
  );
}

function TableComponent({ data }: { data: any }) {
  return (
    <div className="table-component">
      <h3>{data.title}</h3>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              {(data.columns || []).map((col: string, i: number) => (
                <th key={i}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(data.rows || []).map((row: string[], i: number) => (
              <tr key={i}>
                {row.map((cell: string, j: number) => (
                  <td key={j}>{cell}</td>
                ))}
              </tr>
            ))}
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
    <div className="form-component">
      <h3>{data.title}</h3>
      <form onSubmit={handleSubmit}>
        {(data.fields || []).map((field: any, i: number) => (
          <div key={i} className="form-field">
            <label htmlFor={`field-${field.name}`}>{field.label}</label>
            {field.fieldType === "select" ? (
              <select
                id={`field-${field.name}`}
                value={formData[field.name] || ""}
                onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
              >
                <option value="">Select...</option>
                {(field.options || []).map((opt: string, j: number) => (
                  <option key={j} value={opt}>{opt}</option>
                ))}
              </select>
            ) : field.fieldType === "checkbox" ? (
              <input
                type="checkbox"
                id={`field-${field.name}`}
                checked={formData[field.name] === "true"}
                onChange={(e) => setFormData({ ...formData, [field.name]: String(e.target.checked) })}
              />
            ) : field.fieldType === "textarea" ? (
              <textarea
                id={`field-${field.name}`}
                placeholder={field.placeholder || ""}
                value={formData[field.name] || ""}
                onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                rows={3}
              />
            ) : (
              <input
                type={field.fieldType || "text"}
                id={`field-${field.name}`}
                placeholder={field.placeholder || ""}
                value={formData[field.name] || ""}
                onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
              />
            )}
          </div>
        ))}
        <button type="submit" className="form-submit-btn">Submit</button>
      </form>
    </div>
  );
}

function ButtonComponent({ data }: { data: any }) {
  return (
    <button
      className={`rendered-button variant-${data.variant || "primary"}`}
      onClick={() => alert(`Action: ${data.action || data.label}`)}
    >
      {data.label}
    </button>
  );
}

function ProgressComponent({ data }: { data: any }) {
  const value = Math.min(100, Math.max(0, data.value || 0));
  return (
    <div className="progress-component">
      <div className="progress-header">
        <h3>{data.title}</h3>
        <span className="progress-value">{value}%</span>
      </div>
      <div className="progress-bar-bg">
        <div className="progress-bar-fill" style={{ width: `${value}%` }} />
      </div>
      {data.label && <p className="progress-label">{data.label}</p>}
    </div>
  );
}

function TimelineComponent({ data }: { data: any }) {
  return (
    <div className="timeline-component">
      <h3>{data.title}</h3>
      <div className="timeline-list">
        {(data.events || []).map((event: any, i: number) => (
          <div key={i} className={`timeline-item status-${event.status || "upcoming"}`}>
            <div className="timeline-dot" />
            <div className="timeline-content">
              <div className="timeline-event-header">
                <strong>{event.title}</strong>
                <span className="timeline-date">{event.date}</span>
              </div>
              {event.description && <p className="timeline-desc">{event.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
