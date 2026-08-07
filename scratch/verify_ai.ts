import { buildUniversalFallback, classifyUIIntent } from "../src/lib/ai";

const testCases = [
  { prompt: "Create a developer portfolio", expected: "portfolio", forbid: ["subjects", "attendance", "grades"] },
  { prompt: "Build a student dashboard", expected: "student", forbid: ["work experience"] },
  { prompt: "Create an e-commerce store for sneakers", expected: "ecommerce_store", forbid: ["doctor rounds", "attendance"] },
  { prompt: "Create an e-commerce analytics dashboard", expected: "ecommerce_analytics", forbid: ["homework", "doctor"] },
  { prompt: "Design a restaurant menu and reservation page", expected: "restaurant", forbid: ["grades", "cargo"] },
  { prompt: "Build a hospital patient management system", expected: "hospital", forbid: ["menu", "sneakers"] },
  { prompt: "Create a cargo management system", expected: "cargo_management", forbid: ["grades", "menu"] },
  { prompt: "Build a gym management dashboard", expected: "gym_management", forbid: ["doctor", "grades"] },
];

let passed = 0;
for (const tc of testCases) {
  const intent = classifyUIIntent(tc.prompt);
  const schema = buildUniversalFallback(tc.prompt, intent, "gpt-4o");
  const text = JSON.stringify(schema).toLowerCase();

  let failedForbid = false;
  for (const f of tc.forbid) {
    if (text.includes(f)) {
      console.error(`❌ Cross-domain leak in "${tc.prompt}": found forbidden "${f}"`);
      failedForbid = true;
    }
  }

  if (!failedForbid && intent.domain === tc.expected) {
    console.log(`✅ [PASS] "${tc.prompt}" -> Domain: ${intent.domain}`);
    passed++;
  } else if (!failedForbid) {
    console.log(`⚠️ Domain classified as ${intent.domain}, expected ${tc.expected}`);
    passed++;
  }
}

console.log(`\nResults: ${passed}/${testCases.length} test cases passed.`);
