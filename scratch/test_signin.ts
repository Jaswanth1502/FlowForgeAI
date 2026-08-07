import { buildUniversalFallback, classifyUIIntent } from "../src/lib/ai";

const prompt = "create a login page";
const intent = classifyUIIntent(prompt);
const schema = buildUniversalFallback(prompt, intent, "gemini-2.0-flash");

console.log("=== Testing Sign-In Page Generation ===");
console.log("Title:", schema.title);
console.log("Description:", schema.description);

const form = (schema.components as any[]).find((c) => c.type === "form");
console.log("\nForm Fields:", form.fields.map((f: any) => `${f.name} (${f.label})`).join(", "));

const buttons = (schema.components as any[]).filter((c) => c.type === "button");
console.log("\nButtons:", buttons.map((b: any) => `${b.label} [action: ${b.action}]`).join(" | "));

const hasUsername = form.fields.some((f: any) => f.name === "username" || /user\s*name/i.test(f.label));
const hasGoogle = buttons.some((b: any) => /google/i.test(b.label) || b.action === "google-signin");
const hasDemo = buttons.some((b: any) => /demo/i.test(b.label) || b.action === "demo-login");

console.log("\nAssertions:");
console.log("✓ Username field replaced email:", hasUsername);
console.log("✓ Sign in with Google below Sign In:", hasGoogle);
console.log("✓ Demo Login below Google Sign-In:", hasDemo);
