import { buildUniversalFallback, modifyFallbackSchema, classifyUIIntent } from "../src/lib/ai";

const basePrompt = "Create an aerospace flight telemetry dashboard";
const intent = classifyUIIntent(basePrompt);
const initialSchema = buildUniversalFallback(basePrompt, intent, "gemini-2.0-flash");

console.log("=== Testing AI Modification Engine ===");
console.log("Initial Title:", initialSchema.title);
console.log("Initial Components:", (initialSchema.components as any[]).map((c) => c.type).join(", "));

const tests = [
  { inst: "Change title to Mission Control Telemetry 2026", check: (s: any) => s.title === "Mission Control Telemetry 2026", name: "Update Title" },
  { inst: "Update description to Live orbital trajectory stream", check: (s: any) => s.description === "Live orbital trajectory stream", name: "Update Description" },
  { inst: "Remove the hero section", check: (s: any) => !s.components.some((c: any) => c.type === "hero"), name: "Delete Hero" },
  { inst: "Delete the contact form", check: (s: any) => !s.components.some((c: any) => c.type === "form"), name: "Delete Form" },
  { inst: "Add a contact form", check: (s: any) => s.components.some((c: any) => c.type === "form"), name: "Add Form" },
  { inst: "Add pricing table", check: (s: any) => s.components.some((c: any) => c.type === "table"), name: "Add Table" },
  { inst: "Add monthly sales chart", check: (s: any) => s.components.some((c: any) => c.type === "chart"), name: "Add Chart" },
  { inst: "Add metric Total Revenue $85,000", check: (s: any) => s.components.some((c: any) => c.type === "metric"), name: "Add Metric" },
  { inst: "Add progress bar for 90%", check: (s: any) => s.components.some((c: any) => c.type === "progress"), name: "Add Progress" },
  { inst: "Add roadmap timeline", check: (s: any) => s.components.some((c: any) => c.type === "timeline"), name: "Add Timeline" },
  { inst: "Add email field", check: (s: any) => {
      const f = s.components.find((c: any) => c.type === "form");
      return f && f.fields && f.fields.some((fld: any) => fld.name.includes("email"));
    }, name: "Add Form Field" },
];

let currentSchema = JSON.parse(JSON.stringify(initialSchema));
let passedCount = 0;

for (const t of tests) {
  const modResult = modifyFallbackSchema(currentSchema, t.inst);
  const ok = t.check(modResult);
  if (ok) {
    console.log(`✅ [PASS] ${t.name}: "${t.inst}"`);
    passedCount++;
    currentSchema = modResult; // propagate
  } else {
    console.error(`❌ [FAIL] ${t.name}: "${t.inst}"`);
  }
}

console.log(`\nModification Engine Results: ${passedCount}/${tests.length} tests passed.`);
