const ALLOWED_TYPES = ["hero", "card", "list", "grid", "metric", "chart", "table", "form", "button", "progress", "timeline"];
const ALLOWED_CHART_TYPES = ["bar", "line", "pie", "doughnut"];
const ALLOWED_FIELD_TYPES = ["text", "number", "email", "select", "date", "checkbox", "textarea"];

interface ValidationResult {
  valid: boolean;
  errors: string[];
  sanitized: Record<string, unknown> | null;
}

export function validateUISchema(schema: unknown): ValidationResult {
  const errors: string[] = [];

  if (!schema || typeof schema !== "object") {
    return { valid: false, errors: ["Schema must be a JSON object"], sanitized: null };
  }

  const s = schema as Record<string, unknown>;

  if (typeof s.title !== "string" || !s.title) {
    errors.push("Schema must have a non-empty 'title' string");
  }

  if (!Array.isArray(s.components)) {
    return { valid: false, errors: ["Schema must have a 'components' array"], sanitized: null };
  }

  const sanitizedComponents: Record<string, unknown>[] = [];

  for (let i = 0; i < s.components.length; i++) {
    const comp = s.components[i] as Record<string, unknown>;
    if (!comp || typeof comp !== "object") {
      errors.push(`Component at index ${i} is not an object`);
      continue;
    }

    if (!ALLOWED_TYPES.includes(comp.type as string)) {
      errors.push(`Component at index ${i} has unsupported type: ${comp.type}`);
      continue;
    }

    // Reject any component containing code or scripts
    const compStr = JSON.stringify(comp);
    if (/<script/i.test(compStr) || /javascript:/i.test(compStr) || /eval\(/i.test(compStr) || /Function\(/i.test(compStr)) {
      errors.push(`Component at index ${i} contains potentially unsafe content`);
      continue;
    }

    const sanitized = sanitizeComponent(comp, i, errors);
    if (sanitized) {
      sanitizedComponents.push(sanitized);
    }
  }

  if (errors.length > 0 && sanitizedComponents.length === 0) {
    return { valid: false, errors, sanitized: null };
  }

  const result: Record<string, unknown> = {
    title: typeof s.title === "string" ? s.title : "Untitled Interface",
    description: typeof s.description === "string" ? s.description : "",
    components: sanitizedComponents,
  };

  return { valid: true, errors, sanitized: result };
}

function sanitizeComponent(comp: Record<string, unknown>, index: number, errors: string[]): Record<string, unknown> | null {
  const type = comp.type as string;

  switch (type) {
    case "hero":
      return {
        type: "hero",
        title: String(comp.title || "Welcome"),
        subtitle: typeof comp.subtitle === "string" ? comp.subtitle : typeof comp.content === "string" ? comp.content : undefined,
        actionText: typeof comp.actionText === "string" ? comp.actionText : typeof comp.cta === "string" ? comp.cta : undefined,
        actionUrl: typeof comp.actionUrl === "string" ? comp.actionUrl : undefined,
        image: typeof comp.image === "string" ? comp.image : undefined,
        icon: typeof comp.icon === "string" ? comp.icon : undefined,
      };

    case "list": {
      const items = Array.isArray(comp.items)
        ? (comp.items as Record<string, unknown>[]).map((it) => ({
            title: String(it.title || "Item"),
            subtitle: typeof it.subtitle === "string" ? it.subtitle : undefined,
            badge: typeof it.badge === "string" ? it.badge : undefined,
            icon: typeof it.icon === "string" ? it.icon : undefined,
          }))
        : [];
      return { type: "list", title: String(comp.title || "List"), items };
    }

    case "grid": {
      const items = Array.isArray(comp.items)
        ? (comp.items as Record<string, unknown>[]).map((it) => ({
            title: String(it.title || "Item"),
            description: typeof it.description === "string" ? it.description : undefined,
            image: typeof it.image === "string" ? it.image : undefined,
            link: typeof it.link === "string" ? it.link : undefined,
            tags: Array.isArray(it.tags) ? it.tags.map(String) : undefined,
          }))
        : [];
      return { type: "grid", title: String(comp.title || "Grid"), items };
    }

    case "metric":
      return {
        type: "metric",
        title: String(comp.title || "Metric"),
        value: String(comp.value ?? "0"),
        icon: typeof comp.icon === "string" ? comp.icon : undefined,
        change: typeof comp.change === "string" ? comp.change : undefined,
        trend: ["up", "down", "neutral"].includes(comp.trend as string) ? comp.trend : undefined,
      };

    case "card":
      return {
        type: "card",
        title: String(comp.title || "Card"),
        content: String(comp.content || ""),
        icon: typeof comp.icon === "string" ? comp.icon : undefined,
      };

    case "chart": {
      const chartType = ALLOWED_CHART_TYPES.includes(comp.chartType as string) ? comp.chartType : "bar";
      const labels = Array.isArray(comp.labels) ? comp.labels.map(String) : [];
      const datasets = Array.isArray(comp.datasets)
        ? (comp.datasets as Record<string, unknown>[]).map((ds) => ({
            label: String(ds.label || "Data"),
            data: Array.isArray(ds.data) ? ds.data.map(Number) : [],
            backgroundColor: ds.backgroundColor || "#6366f1",
          }))
        : [];
      return { type: "chart", title: String(comp.title || "Chart"), chartType, labels, datasets };
    }

    case "table": {
      const columns = Array.isArray(comp.columns) ? comp.columns.map(String) : [];
      const rows = Array.isArray(comp.rows)
        ? (comp.rows as unknown[][]).map((row) => (Array.isArray(row) ? row.map(String) : []))
        : [];
      return { type: "table", title: String(comp.title || "Table"), columns, rows };
    }

    case "form": {
      const fields = Array.isArray(comp.fields)
        ? (comp.fields as Record<string, unknown>[]).map((f) => ({
            name: String(f.name || "field"),
            label: String(f.label || "Field"),
            fieldType: ALLOWED_FIELD_TYPES.includes(f.fieldType as string) ? f.fieldType : "text",
            options: Array.isArray(f.options) ? f.options.map(String) : undefined,
            placeholder: typeof f.placeholder === "string" ? f.placeholder : undefined,
          }))
        : [];
      return { type: "form", title: String(comp.title || "Form"), fields };
    }

    case "button":
      return {
        type: "button",
        label: String(comp.label || "Button"),
        variant: ["primary", "secondary", "danger"].includes(comp.variant as string) ? comp.variant : "primary",
        action: String(comp.action || "click"),
      };

    case "progress":
      return {
        type: "progress",
        title: String(comp.title || "Progress"),
        value: Math.min(100, Math.max(0, Number(comp.value) || 0)),
        label: typeof comp.label === "string" ? comp.label : undefined,
      };

    case "timeline": {
      const events = Array.isArray(comp.events)
        ? (comp.events as Record<string, unknown>[]).map((e) => ({
            title: String(e.title || "Event"),
            date: String(e.date || ""),
            description: typeof e.description === "string" ? e.description : undefined,
            status: ["completed", "current", "upcoming"].includes(e.status as string) ? e.status : "upcoming",
          }))
        : [];
      return { type: "timeline", title: String(comp.title || "Timeline"), events };
    }

    default:
      errors.push(`Component at index ${index} has unknown type: ${type}`);
      return null;
  }
}
