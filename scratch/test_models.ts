import { buildUniversalFallback, classifyUIIntent } from "../src/lib/ai";

const prompt = "Create an aerospace flight telemetry dashboard";
const intent = classifyUIIntent(prompt);

const models = [
  "gemini-2.0-flash",
  "gpt-4o",
  "o3-mini",
  "claude-3.5-sonnet",
  "deepseek-r1",
  "groq-llama-3.3"
];

console.log("=== Testing Single Prompt Across All LLM Workflows ===");
console.log("Prompt:", prompt);
console.log("-------------------------------------------------------");

models.forEach((m) => {
  const result: any = buildUniversalFallback(prompt, intent, m);
  console.log(`\n[MODEL]: ${m}`);
  console.log(`Title: ${result.title}`);
  console.log(`Description: ${result.description}`);
  const components = Array.isArray(result.components) ? result.components : [];
  console.log(`Components (${components.length}):`, components.map((c: any) => c.type).join(", "));
});
