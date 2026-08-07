export const SYSTEM_PROMPT = `You are the FlowForge Generative UI Planning Engine.

Your highest priority is USER INTENT ALIGNMENT.

Your task is to convert the user's natural-language application or website requirements into a structured JSON UI schema.

Before generating components, internally identify:
* application or website type
* requested domain
* target audience
* main purpose
* important user actions
* information that must be displayed
* whether the user requested a full application, page, or section
* which supported components realistically belong to that exact interface

The generated UI MUST be specifically designed for the user's request.

Never generate a generic dashboard layout for every request.

Never reuse unrelated components, personas, sections, datasets, or concepts simply because they appeared in previous templates or examples.

Never assume a student or teacher persona unless the request clearly belongs to an educational domain.

DOMAIN CONSISTENCY:
Once the domain is identified, every component must remain compatible with that domain.

For example:
Developer Portfolio:
Hero, About, Skills, Projects, Experience, Education, Contact.
Do NOT include Attendance, Subjects, GPA, Exams, Assignments, or Classroom components unless explicitly requested.

E-Commerce Store:
Products, Categories, Product Grid, Cart, Checkout, Orders.
Do NOT include analytics unless an admin/dashboard interface was explicitly requested.

Restaurant:
Hero, Menu, Featured Dishes, Reservations, Hours, Contact.
Do NOT include SaaS metrics or unrelated analytics.

PAGE-AWARE GENERATION:
If the user asks for a specific page or section, generate only that page or section.

Examples:
'login page'
→ authentication form/actions only.

'contact page'
→ contact information/form only.

'projects section'
→ project-related components only.

COMPONENT SELECTION:
Use only supported FlowForge components:
hero
card
list
grid
metric
chart
table
form
button
progress
timeline

Do not use metrics/charts by default.
Every generated component must have a clear reason to exist in the requested domain.

DATA:
Do not invent unsupported personal statistics or achievements.
Use neutral placeholders when user data is unavailable.

MODIFICATIONS:
When modifying an existing interface:
* preserve existing components unless removal was requested
* use the existing schema as domain context
* modify matching components directly whenever possible
* avoid duplicate sections
* preserve unrelated content

OUTPUT:
Return ONLY valid JSON.

Root format:
{
  "title": "...",
  "description": "...",
  "components": [...]
}

Do not output Markdown.
Do not output explanations.
Do not output HTML/CSS/JavaScript.
Do not include unsupported components.

Before returning the JSON, silently verify:
1. Does this interface match the requested domain?
2. Does every component belong?
3. Did I accidentally mix another domain?
4. Did I assume a student persona without evidence?
5. Did I add analytics unnecessarily?
6. Did I respect page/section scope?
7. Are all components supported?
8. Is the result valid JSON?

Correct any mismatch before returning.`;

export type JsonRecord = Record<string, unknown>;

export type ComponentType =
  | "hero"
  | "card"
  | "list"
  | "grid"
  | "metric"
  | "chart"
  | "table"
  | "form"
  | "button"
  | "progress"
  | "timeline";

export type ChartType = "bar" | "line" | "pie" | "doughnut";

export type FieldType =
  | "text"
  | "number"
  | "email"
  | "select"
  | "date"
  | "checkbox"
  | "textarea";

export interface ProviderConfig {
  endpoint: string;
  apiKey: string;
  model: string;
}

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface UIIntent {
  rawPrompt: string;
  normalizedPrompt: string;
  displayTopic: string;
  domain:
    | "portfolio"
    | "student_portfolio"
    | "student"
    | "restaurant"
    | "ecommerce_store"
    | "ecommerce_analytics"
    | "hospital"
    | "saas_website"
    | "startup_finance"
    | "project_management"
    | "expense_tracker"
    | "cargo_management"
    | "gym_management"
    | "booking"
    | "custom";
  broadIntent:
    | "auth"
    | "booking"
    | "catalog"
    | "content"
    | "community"
    | "utility"
    | "portfolio"
    | "website"
    | "management"
    | "analytics"
    | "application";
  pageScope: "full" | "login" | "contact" | "projects" | "analytics";
  isPageRequest: boolean;
  explicitAnalyticsRequested: boolean;
}

export const SUPPORTED_COMPONENT_TYPES = new Set<ComponentType>([
  "hero",
  "card",
  "list",
  "grid",
  "metric",
  "chart",
  "table",
  "form",
  "button",
  "progress",
  "timeline",
]);

export const SUPPORTED_CHART_TYPES = new Set<ChartType>(["bar", "line", "pie", "doughnut"]);

export const SUPPORTED_FIELD_TYPES = new Set<FieldType>([
  "text",
  "number",
  "email",
  "select",
  "date",
  "checkbox",
  "textarea",
]);

/* ==========================================================================
   Intent & Domain Classification Helpers
   ========================================================================== */

export function normalizePrompt(prompt: string): string {
  if (!prompt || typeof prompt !== "string") return "";
  return prompt
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, " ")
    .replace(/\s+/g, " ");
}

export function extractDisplayTopic(prompt: string): string {
  if (!prompt || typeof prompt !== "string") return "Custom Interface";
  const cleaned = prompt
    .trim()
    .replace(/^(?:please\s+)?(?:create|build|generate|make|design|show|give me|render)\s+(?:an?|the)\s+/i, "")
    .replace(/^(?:create|build|generate|make|design)\s+/i, "")
    .replace(/\s+(?:dashboard|system|application|app|portal|platform|interface|website|site|page)\b/gi, "")
    .trim();

  if (!cleaned) return "Custom Workspace";

  const words = cleaned.split(/\s+/);
  return words
    .map((w) => (w.length > 0 ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : ""))
    .join(" ");
}

export function extractEntityName(instruction: string, context?: string): string {
  if (!instruction || typeof instruction !== "string") return "New Item";

  const quotesMatch = instruction.match(/["']([^"']+)["']/);
  if (quotesMatch?.[1]) return quotesMatch[1].trim();

  const namedMatch = instruction.match(/\b(?:named|called|title|titled)\s+([a-zA-Z0-9_\- ]+?)(?=\s+(?:to|into|with|in|for)\b|$)/i);
  if (namedMatch?.[1]) return namedMatch[1].trim();

  const addMatch = instruction.match(/\b(?:add|insert|include|create)\s+(?:an?|the|new)?\s*([a-zA-Z0-9_\- ]+?)(?=\s+(?:to|into|in|with|field|subject|project|patient|item)\b|$)/i);
  if (addMatch?.[1]) {
    const raw = addMatch[1].trim();
    if (!/^(?:a|an|the|new|item|entry|row|record)$/i.test(raw)) {
      return raw;
    }
  }

  if (context) {
    const contextMatch = instruction.match(new RegExp(`\\b(?:add|insert)\\s+([a-zA-Z0-9_\\- ]+?)\\s+${context}\\b`, "i"));
    if (contextMatch?.[1]) return contextMatch[1].trim();
  }

  return "New Item";
}

export function pluralizeLabel(label: string): string {
  if (!label) return "";
  if (label.endsWith("y") && !/[aeiou]y$/i.test(label)) {
    return label.slice(0, -1) + "ies";
  }
  if (label.endsWith("s") || label.endsWith("sh") || label.endsWith("ch") || label.endsWith("x")) {
    return label + "es";
  }
  return label + "s";
}

export function classifyUIIntent(prompt: string): UIIntent {
  const norm = normalizePrompt(prompt);
  const displayTopic = extractDisplayTopic(prompt);

  const explicitAnalyticsRequested = /\b(?:analytics|metrics|kpi|kpis|monitoring|reporting|stats|dashboard)\b/i.test(norm);

  // 1. Page-Aware Scope Detection (Highest Priority)
  let pageScope: UIIntent["pageScope"] = "full";
  let isPageRequest = false;

  if (/\b(?:login|sign in|signin|authentication|auth page|login form)\b/i.test(norm) && !/\bdashboard\b/i.test(norm)) {
    pageScope = "login";
    isPageRequest = true;
  } else if (/\b(?:contact us|contact page|contact form|inquiry page|get in touch)\b/i.test(norm) && !/\bportfolio\b/i.test(norm)) {
    pageScope = "contact";
    isPageRequest = true;
  } else if (/\b(?:projects? section|projects? page|portfolio projects?|case studies section)\b/i.test(norm)) {
    pageScope = "projects";
    isPageRequest = true;
  } else if (/\b(?:analytics page|analytics tab|sales dashboard|analytics dashboard)\b/i.test(norm)) {
    pageScope = "analytics";
    isPageRequest = true;
  }

  // 2. Domain Detection
  let domain: UIIntent["domain"] = "custom";
  let broadIntent: UIIntent["broadIntent"] = "application";

  if (
    /\b(?:student portfolio|academic portfolio|student cv|student resume|scholar portfolio|student showcase)\b/i.test(norm) ||
    (/\bstudent\b/i.test(norm) && /\bportfolio\b/i.test(norm))
  ) {
    domain = "student_portfolio";
    broadIntent = "portfolio";
  } else if (
    /\b(?:portfolio|personal site|personal website|developer portfolio|designer portfolio|resume|cv|bio|professional profile|showcase)\b/i.test(norm) ||
    (/\bdeveloper\b/i.test(norm) && /\b(?:site|portfolio|showcase|web)\b/i.test(norm))
  ) {
    domain = "portfolio";
    broadIntent = "portfolio";
  } else if (
    /\b(?:student|academic|marks|cgpa|gradebook|classroom|exam|exams|subject|subjects|student performance|student management|school portal)\b/i.test(norm)
  ) {
    domain = "student";
    broadIntent = "management";
  } else if (
    /\b(?:restaurant|food|cafe|bistro|dining|menu|culinary|dishes|bakery|pizzeria|coffee shop)\b/i.test(norm)
  ) {
    domain = "restaurant";
    broadIntent = "website";
  } else if (
    /\b(?:e-commerce|ecommerce|store|shop|shopping|marketplace|products|product grid|cart|checkout|clothing store|retail)\b/i.test(norm)
  ) {
    if (explicitAnalyticsRequested) {
      domain = "ecommerce_analytics";
      broadIntent = "analytics";
    } else {
      domain = "ecommerce_store";
      broadIntent = "catalog";
    }
  } else if (
    /\b(?:hospital|patient|patients|doctor|doctors|clinic|medical|healthcare|ward|vitals|bed occupancy|emergency admission)\b/i.test(norm)
  ) {
    domain = "hospital";
    broadIntent = "management";
  } else if (
    /\b(?:saas|landing page|marketing site|saas website|pricing page|product features|hero section)\b/i.test(norm)
  ) {
    domain = "saas_website";
    broadIntent = "website";
  } else if (
    /\b(?:startup finance|burn rate|runway|financial dashboard|revenue expenses|seed round|investor dashboard)\b/i.test(norm)
  ) {
    domain = "startup_finance";
    broadIntent = "analytics";
  } else if (
    /\b(?:project management|kanban|task management|sprint|tasks dashboard|milestones)\b/i.test(norm)
  ) {
    domain = "project_management";
    broadIntent = "management";
  } else if (
    /\b(?:expense tracker|budget tracker|spending tracker|personal finance|expenses)\b/i.test(norm)
  ) {
    domain = "expense_tracker";
    broadIntent = "analytics";
  } else if (
    /\b(?:cargo|freight|logistics|shipment|shipments|shipping|fleet|warehouse|cargo management)\b/i.test(norm)
  ) {
    domain = "cargo_management";
    broadIntent = "management";
  } else if (
    /\b(?:gym|fitness|workout|crossfit|gym membership|personal training|trainer schedule)\b/i.test(norm)
  ) {
    domain = "gym_management";
    broadIntent = "management";
  } else if (
    /\b(?:hotel booking|flight booking|reservation|ticket booking|room reservation)\b/i.test(norm)
  ) {
    domain = "booking";
    broadIntent = "booking";
  } else {
    // Broad intent fallback classifier
    if (/\b(?:login|signup|auth|register|password)\b/i.test(norm)) broadIntent = "auth";
    else if (/\b(?:booking|reserve|reservation|appointment)\b/i.test(norm)) broadIntent = "booking";
    else if (/\b(?:store|shop|catalog|marketplace|inventory)\b/i.test(norm)) broadIntent = "catalog";
    else if (/\b(?:blog|article|news|cms|content|docs|documentation)\b/i.test(norm)) broadIntent = "content";
    else if (/\b(?:community|chat|forum|feed|social|messages|discussions)\b/i.test(norm)) broadIntent = "community";
    else if (/\b(?:tool|calculator|converter|generator|utility|scanner)\b/i.test(norm)) broadIntent = "utility";
    else if (/\b(?:manage|management|operations|tracker|portal|records|admin)\b/i.test(norm)) broadIntent = "management";
    else if (explicitAnalyticsRequested) broadIntent = "analytics";
    else if (/\b(?:website|site|landing|agency|company)\b/i.test(norm)) broadIntent = "website";
    else broadIntent = "application";
  }

  return {
    rawPrompt: prompt,
    normalizedPrompt: norm,
    displayTopic,
    domain,
    broadIntent,
    pageScope,
    isPageRequest,
    explicitAnalyticsRequested,
  };
}

/* ==========================================================================
   Universal Domain-Aware Generator Engine
   ========================================================================== */

export function buildUniversalFallback(
  prompt: string,
  intent?: UIIntent,
  selectedModel?: string
): JsonRecord {
  const info = intent || classifyUIIntent(prompt);
  const topic = info.displayTopic;
  const model = (selectedModel || "gemini-2.0-flash").toLowerCase();

  // 1. Page-Specific Generation
  if (info.isPageRequest) {
    if (info.pageScope === "login") {
      return {
        title: `${topic} Authentication`,
        description: `Secure sign in and user authentication portal for ${topic}`,
        components: [
          {
            type: "card",
            title: `Welcome to ${topic}`,
            content: "Please enter your verified credentials to access your account, manage settings, and view authorized resources.",
            icon: "🔐",
          },
          {
            type: "form",
            title: "Sign In to Your Account",
            fields: [
              { name: "username", label: "User Name", fieldType: "text", placeholder: "Enter user name..." },
              { name: "password", label: "Password", fieldType: "text", placeholder: "••••••••" },
              { name: "remember", label: "Remember this device for 30 days", fieldType: "checkbox" },
            ],
          },
          {
            type: "button",
            label: "Sign In",
            variant: "primary",
            action: "submit-login",
          },
          {
            type: "button",
            label: "Sign in with Google",
            variant: "secondary",
            action: "google-signin",
          },
          {
            type: "button",
            label: "Demo Login",
            variant: "outline",
            action: "demo-login",
          },
          {
            type: "button",
            label: "Forgot Password / Reset",
            variant: "secondary",
            action: "forgot-password",
          },
        ],
      };
    }

    if (info.pageScope === "contact") {
      return {
        title: `${topic} Contact & Inquiries`,
        description: `Get in touch with the ${topic} team for support, partnerships, or general inquiries`,
        components: [
          {
            type: "card",
            title: "Contact Information",
            content: "We are here to help. Reach out to our dedicated team and we will respond within 24 business hours.",
            icon: "📬",
          },
          {
            type: "form",
            title: "Send a Message",
            fields: [
              { name: "name", label: "Full Name", fieldType: "text", placeholder: "Your full name" },
              { name: "email", label: "Email Address", fieldType: "email", placeholder: "you@example.com" },
              { name: "subject", label: "Inquiry Subject", fieldType: "select", options: ["General Inquiry", "Technical Support", "Partnership", "Billing"] },
              { name: "message", label: "Message / Details", fieldType: "textarea", placeholder: "Write your message here..." },
            ],
          },
          {
            type: "button",
            label: "Send Message",
            variant: "primary",
            action: "submit-contact",
          },
        ],
      };
    }

    if (info.pageScope === "projects") {
      return {
        title: "Featured Engineering Projects",
        description: "Showcase of technical projects, open-source software, and architecture design",
        components: [
          {
            type: "grid",
            title: "Technical Projects",
            items: [
              { title: "FlowForge AI", description: "Generative UI workflow orchestration engine and dynamic canvas renderer.", tags: ["TypeScript", "Next.js", "AI"] },
              { title: "DataPulse Mesh", description: "Real-time analytics engine and distributed telemetry streaming pipeline.", tags: ["Go", "React", "gRPC"] },
              { title: "CloudScale UI", description: "Enterprise design system and accessible component library.", tags: ["React", "CSS", "Storybook"] },
              { title: "NeuralCanvas", description: "Interactive visual workspace for generative models and node workflows.", tags: ["Python", "FastAPI", "Canvas"] },
            ],
          },
          {
            type: "list",
            title: "Open Source Contributions",
            items: [
              { title: "Next.js Core", subtitle: "Improved server actions streaming performance", badge: "Merged", icon: "⚡" },
              { title: "Drizzle ORM", subtitle: "PostgreSQL transaction pool connection optimizations", badge: "Active", icon: "📦" },
              { title: "Tailwind CSS", subtitle: "Custom modern glassmorphism utility presets", badge: "Contributor", icon: "🎨" },
            ],
          },
        ],
      };
    }
  }

  // 2. Specific Domain Templates
  if (info.domain === "portfolio") {
    return {
      title: "Developer & Professional Portfolio",
      description: "Full-stack developer portfolio showcasing engineering projects, technical stack, career experience, and contact form",
      components: [
        {
          type: "hero",
          title: "Senior Full-Stack Engineer",
          subtitle: "Designing and building modern web applications, scalable cloud microservices, and AI-powered workflow automation systems.",
          actionText: "View Featured Projects",
          icon: "👨‍💻",
        },
        {
          type: "card",
          title: "About Me",
          content: "Passionate software engineer focused on building elegant, performant, and user-centric web applications. Specializing in TypeScript, modern frontend architectures, and cloud microservices.",
          icon: "✨",
        },
        {
          type: "progress",
          title: "Core Technical Stack Proficiency",
          value: 94,
          label: "TypeScript, React, Next.js, Node.js & PostgreSQL",
        },
        {
          type: "grid",
          title: "Featured Software Projects",
          items: [
            { title: "FlowForge AI", description: "Generative UI workflow orchestration engine and dynamic canvas renderer.", tags: ["TypeScript", "Next.js", "AI"] },
            { title: "DataPulse Mesh", description: "Real-time analytics engine and distributed telemetry streaming pipeline.", tags: ["Go", "React", "gRPC"] },
            { title: "CloudScale UI", description: "Enterprise design system and accessible component library.", tags: ["React", "CSS", "Storybook"] },
            { title: "NeuralCanvas", description: "Interactive visual workspace for generative models and node workflows.", tags: ["Python", "FastAPI", "Canvas"] },
          ],
        },
        {
          type: "timeline",
          title: "Career & Work Experience",
          events: [
            { title: "Staff Software Engineer - Acme Cloud", date: "2024 - Present", status: "current", description: "Leading core platform architecture, design systems, and AI integrations." },
            { title: "Senior Frontend Developer - TechCorp", date: "2022 - 2024", status: "completed", description: "Built high-performance design system and component libraries." },
            { title: "Full-Stack Engineer - StartupLab", date: "2020 - 2022", status: "completed", description: "Engineered scalable real-time messaging APIs and microservices." },
          ],
        },
        {
          type: "form",
          title: "Get In Touch / Hire Me",
          fields: [
            { name: "name", label: "Your Name", fieldType: "text", placeholder: "e.g. Sarah Connor" },
            { name: "email", label: "Email Address", fieldType: "email", placeholder: "sarah@example.com" },
            { name: "projectType", label: "Inquiry Type", fieldType: "select", options: ["Full-time Role", "Contract Project", "Consulting", "Other"] },
            { name: "message", label: "Project Details / Message", fieldType: "textarea", placeholder: "Tell me about your project..." },
          ],
        },
      ],
    };
  }

  if (info.domain === "student_portfolio") {
    return {
      title: "Student & Academic Portfolio",
      description: "Academic background, research coursework, technical projects, publications, and education milestones",
      components: [
        {
          type: "hero",
          title: "Computer Science & Engineering Scholar",
          subtitle: "Undergraduate researcher focused on algorithms, distributed computing, and machine learning systems.",
          actionText: "View Research Projects",
          icon: "🎓",
        },
        {
          type: "card",
          title: "Academic Background & Research Focus",
          content: "Dedicated student passionate about computer systems, artificial intelligence, and applied software engineering. Actively seeking internship opportunities and collaborative research initiatives.",
          icon: "📚",
        },
        {
          type: "progress",
          title: "Degree Progress & Core Academic Competencies",
          value: 88,
          label: "Data Structures, Systems Programming, Machine Learning & Algorithms",
        },
        {
          type: "grid",
          title: "Featured Academic & Capstone Projects",
          items: [
            { title: "Distributed Consensus Simulator", description: "Raft consensus implementation with dynamic network partition visualization.", tags: ["Go", "Distributed Systems", "Academic"] },
            { title: "Neural Vision Classifier", description: "Lightweight convolutional model for real-time biomedical image segmentation.", tags: ["Python", "PyTorch", "Research"] },
            { title: "FlowForge UI Engine", description: "Declarative component layout renderer and domain schema compiler.", tags: ["TypeScript", "Next.js", "Open Source"] },
            { title: "Database Query Optimizer", description: "Cost-based B-tree index analyzer and relational query execution engine.", tags: ["C++", "Database Systems"] },
          ],
        },
        {
          type: "timeline",
          title: "Education, Degree Milestones & Honors",
          events: [
            { title: "B.S. in Computer Science - University of Science & Tech", date: "2022 - 2026 (Expected)", status: "current", description: "Dean's Honor List, Specialization in Intelligent Systems & Architecture." },
            { title: "Undergraduate Research Assistant - AI Systems Lab", date: "2024 - Present", status: "current", description: "Conducting benchmarks on deep learning model compression and quantization." },
            { title: "Lead Organizer - University Hackathon", date: "Fall 2024", status: "completed", description: "Coordinated 48-hour student hackathon with 350+ active participants." },
          ],
        },
        {
          type: "form",
          title: "Academic Inquiries & Collaboration",
          fields: [
            { name: "contactName", label: "Full Name", fieldType: "text", placeholder: "e.g. Dr. Arthur Miller" },
            { name: "email", label: "Email Address", fieldType: "email", placeholder: "miller@university.edu" },
            { name: "inquiryType", label: "Inquiry Type", fieldType: "select", options: ["Research Opportunity", "Internship / Employment", "Academic Collaboration", "General Inquiry"] },
            { name: "message", label: "Message / Academic Proposal", fieldType: "textarea", placeholder: "Discuss research collaboration, project review, or opportunities..." },
          ],
        },
      ],
    };
  }

  if (info.domain === "student") {
    return {
      title: "Student Performance Dashboard",
      description: "Academic progress tracking, subject marks, attendance rates, and upcoming exam schedules",
      components: [
        { type: "metric", title: "CGPA", value: "8.4", icon: "🎓", change: "+0.3", trend: "up" },
        { type: "metric", title: "Average Marks", value: "82%", icon: "📊", change: "+4%", trend: "up" },
        { type: "metric", title: "Attendance", value: "89%", icon: "📅", change: "-1%", trend: "down" },
        { type: "metric", title: "Subjects Passed", value: "12/12", icon: "✅", trend: "neutral" },
        {
          type: "chart",
          title: "Subject-wise Performance",
          chartType: "bar",
          labels: ["Mathematics", "Physics", "Chemistry", "Computer Science", "English", "Electronics"],
          datasets: [{ label: "Marks (%)", data: [88, 76, 82, 95, 90, 72], backgroundColor: "#6366f1" }],
        },
        {
          type: "chart",
          title: "Monthly Attendance Trend",
          chartType: "line",
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [{ label: "Attendance %", data: [92, 88, 85, 90, 89, 91], backgroundColor: "rgba(99,102,241,0.2)" }],
        },
        {
          type: "table",
          title: "Subject Details & Attendance",
          columns: ["Subject", "Marks", "Grade", "Attendance", "Status"],
          rows: [
            ["Mathematics", "88", "A", "92%", "Passed"],
            ["Physics", "76", "B+", "85%", "Passed"],
            ["Chemistry", "82", "A", "88%", "Passed"],
            ["Computer Science", "95", "A+", "94%", "Passed"],
            ["English", "90", "A+", "96%", "Passed"],
            ["Electronics", "72", "B", "78%", "Passed"],
          ],
        },
        {
          type: "timeline",
          title: "Upcoming Academic Exams",
          events: [
            { title: "DBMS Mid-Term Examination", date: "Aug 15, 2025", status: "upcoming", description: "Hall 3 - Relational Algebra & SQL" },
            { title: "Computer Networks Practical Lab", date: "Aug 18, 2025", status: "upcoming", description: "Networking Lab - Packet Routing" },
            { title: "Operating Systems Final Project Review", date: "Aug 22, 2025", status: "upcoming", description: "CS Lab 2 - Kernel Scheduler" },
          ],
        },
      ],
    };
  }

  if (info.domain === "restaurant") {
    return {
      title: "Artisan Bistro & Gourmet Dining",
      description: "Explore our seasonal culinary tasting menu, chef specials, dining reservations, and restaurant atmosphere",
      components: [
        {
          type: "hero",
          title: "Artisan Wood-Fired & Seasonal Fare",
          subtitle: "Experience farm-to-table gourmet dining crafted with organic heirloom ingredients, aged steaks, and sommelier-curated wine pairings.",
          actionText: "Reserve a Dining Table",
          icon: "🍷",
        },
        {
          type: "card",
          title: "Our Culinary Philosophy",
          content: "Every dish is curated by our executive chef using locally sourced organic produce, ethically raised meats, and fresh hand-picked herbs.",
          icon: "🌿",
        },
        {
          type: "table",
          title: "Signature Culinary Menu",
          columns: ["Dish Name", "Category", "Price", "Dietary", "Chef Rating"],
          rows: [
            ["Truffle Wild Mushroom Risotto", "Main Course", "$28.00", "Vegetarian / GF", "4.9 ⭐"],
            ["Pan-Seared Atlantic Salmon", "Seafood", "$34.00", "Gluten-Free", "4.8 ⭐"],
            ["Prime Wagyu Ribeye (12oz)", "Steakhouse", "$58.00", "Keto", "5.0 ⭐"],
            ["Burrata & Heirloom Tomato Salad", "Appetizer", "$18.00", "Vegetarian", "4.7 ⭐"],
            ["Dark Chocolate Lava Cake", "Dessert", "$14.00", "Decadent", "4.9 ⭐"],
          ],
        },
        {
          type: "card",
          title: "Opening Hours & Location",
          content: "Tuesday – Friday: 5:00 PM – 10:30 PM\nSaturday – Sunday: 12:00 PM – 11:00 PM\n142 Gourmet Boulevard, Downtown Culinary District",
          icon: "📍",
        },
        {
          type: "form",
          title: "Reserve a Dining Table",
          fields: [
            { name: "guestName", label: "Full Name", fieldType: "text", placeholder: "e.g. Alex Morgan" },
            { name: "guests", label: "Number of Guests", fieldType: "select", options: ["1 Guest", "2 Guests", "4 Guests", "6+ Guests Group"] },
            { name: "date", label: "Reservation Date", fieldType: "date" },
            { name: "time", label: "Preferred Time Slot", fieldType: "select", options: ["5:30 PM", "7:00 PM", "8:30 PM", "10:00 PM"] },
            { name: "notes", label: "Special Requests / Dietary Needs", fieldType: "textarea", placeholder: "Anniversary, window seating, allergies..." },
          ],
        },
      ],
    };
  }

  if (info.domain === "ecommerce_store") {
    return {
      title: "Modern Online Store & Collection",
      description: "Discover premium apparel, trending lifestyle accessories, seasonal offers, and direct checkout",
      components: [
        {
          type: "hero",
          title: "Autumn Collection & Essentials",
          subtitle: "Explore our latest collection of sustainable handcrafted apparel, urban accessories, and smart gear with free worldwide delivery.",
          actionText: "Shop New Arrivals",
          icon: "🛍️",
        },
        {
          type: "grid",
          title: "Featured Products",
          items: [
            { title: "Wireless Active Earbuds", description: "Active noise cancelling with 32hr battery life and water resistance.", tags: ["Electronics", "$129"] },
            { title: "All-Weather Trail Runners", description: "Breathable mesh runners with ergonomic grip sole.", tags: ["Footwear", "$145"] },
            { title: "Minimalist Smart Watch", description: "Heart rate monitor, sleep tracking, and sapphire glass display.", tags: ["Accessories", "$199"] },
            { title: "Organic Cotton Hoodie", description: "Heavyweight brushed organic fleece with relaxed modern fit.", tags: ["Apparel", "$85"] },
          ],
        },
        {
          type: "list",
          title: "Shop By Category",
          items: [
            { title: "Electronics & Audio", subtitle: "Earbuds, headphones, and portable chargers", badge: "Hot", icon: "🎧" },
            { title: "Apparel & Activewear", subtitle: "Sustainable organic daily essentials", badge: "New", icon: "👕" },
            { title: "Footwear & Trail", subtitle: "Ergonomic running shoes and outdoor boots", badge: "Sale", icon: "👟" },
          ],
        },
        {
          type: "card",
          title: "Customer Guarantees & Shipping",
          content: "✓ 30-Day Money Back Guarantee\n✓ Free Express Shipping on orders over $50\n✓ 24/7 Dedicated Customer Care",
          icon: "🛡️",
        },
        {
          type: "form",
          title: "Quick Checkout & Order Details",
          fields: [
            { name: "customerName", label: "Full Name", fieldType: "text", placeholder: "Jane Doe" },
            { name: "email", label: "Email Address", fieldType: "email", placeholder: "jane@example.com" },
            { name: "shippingAddress", label: "Shipping Address", fieldType: "textarea", placeholder: "Street, City, Postal Code" },
            { name: "paymentMethod", label: "Payment Method", fieldType: "select", options: ["Credit / Debit Card", "Apple Pay", "PayPal", "Klarna"] },
          ],
        },
      ],
    };
  }

  if (info.domain === "ecommerce_analytics") {
    return {
      title: "E-Commerce Analytics Dashboard",
      description: "Monitor total sales, order volumes, customer lifetime value, and top performing products",
      components: [
        { type: "metric", title: "Total Sales", value: "$128,450", icon: "💵", change: "+18%", trend: "up" },
        { type: "metric", title: "Total Orders", value: "1,420", icon: "📦", change: "+24%", trend: "up" },
        { type: "metric", title: "Avg. Order Value", value: "$90.45", icon: "🛒", change: "+4.2%", trend: "up" },
        { type: "metric", title: "Conversion Rate", value: "3.8%", icon: "🎯", change: "+0.5%", trend: "up" },
        {
          type: "chart",
          title: "Monthly Revenue & Sales Growth",
          chartType: "line",
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
          datasets: [{ label: "Monthly Revenue ($)", data: [14200, 18500, 22100, 26400, 31000, 38200, 44500], backgroundColor: "rgba(99,102,241,0.2)" }],
        },
        {
          type: "table",
          title: "Top Performing Store Products",
          columns: ["Product Name", "SKU", "Units Sold", "Revenue", "Stock Status"],
          rows: [
            ["Wireless Active Earbuds", "SKU-8921", "480 Units", "$61,920", "In Stock"],
            ["All-Weather Trail Runners", "SKU-4412", "310 Units", "$44,950", "In Stock"],
            ["Minimalist Smart Watch", "SKU-1099", "190 Units", "$37,810", "Low Stock"],
            ["Organic Cotton Hoodie", "SKU-7723", "240 Units", "$20,400", "In Stock"],
          ],
        },
      ],
    };
  }

  if (info.domain === "hospital") {
    return {
      title: "Hospital & Patient Management System",
      description: "Comprehensive patient care tracking, doctor schedules, bed capacity, and medical vitals",
      components: [
        { type: "metric", title: "Total Patients", value: "248", icon: "🏥", change: "+12 Today", trend: "up" },
        { type: "metric", title: "ICU Bed Occupancy", value: "85%", icon: "🛏️", change: "+3%", trend: "up" },
        { type: "metric", title: "Doctors On Duty", value: "34", icon: "👨‍⚕️", trend: "neutral" },
        { type: "metric", title: "Emergency Admissions", value: "14", icon: "🚨", change: "-2", trend: "down" },
        {
          type: "progress",
          title: "Hospital Bed Capacity",
          value: 82,
          label: "164 of 200 Beds Occupied",
        },
        {
          type: "chart",
          title: "Departmental Patient Load",
          chartType: "bar",
          labels: ["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Emergency", "Oncology"],
          datasets: [{ label: "Patients Admitted", data: [45, 32, 28, 54, 68, 21], backgroundColor: "#6366f1" }],
        },
        {
          type: "table",
          title: "Active Patient Directory",
          columns: ["Patient Name", "Age/Gender", "Ward/Room", "Attending Doctor", "Status", "Vitals"],
          rows: [
            ["Robert Chen", "45 / M", "Ward A - Rm 102", "Dr. Sarah Jenkins", "Admitted", "BP: 120/80, HR: 72 bpm"],
            ["Emily Watson", "29 / F", "ICU - Bed 04", "Dr. Marcus Vance", "Critical", "BP: 135/90, HR: 88 bpm"],
            ["David Miller", "62 / M", "Ward B - Rm 215", "Dr. Priya Patel", "Stable", "BP: 118/75, HR: 68 bpm"],
            ["Sophia Martinez", "8 / F", "Pediatrics - Rm 05", "Dr. Elena Rostova", "Recovering", "BP: 110/70, HR: 80 bpm"],
            ["James Wilson", "53 / M", "Ward C - Rm 308", "Dr. Michael Chang", "Discharge Ready", "BP: 122/82, HR: 74 bpm"],
          ],
        },
        {
          type: "form",
          title: "New Patient Admission & Vitals Form",
          fields: [
            { name: "patientName", label: "Patient Full Name", fieldType: "text", placeholder: "e.g. John Doe" },
            { name: "age", label: "Age", fieldType: "number", placeholder: "35" },
            { name: "gender", label: "Gender", fieldType: "select", options: ["Male", "Female", "Other"] },
            { name: "department", label: "Department", fieldType: "select", options: ["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Emergency", "General"] },
            { name: "vitals", label: "Initial Vitals & Symptoms", fieldType: "textarea", placeholder: "Enter BP, Heart Rate, Symptoms..." },
          ],
        },
        {
          type: "timeline",
          title: "Today's Medical Schedule & Doctor Rounds",
          events: [
            { title: "Morning Doctor Rounds - Ward A & B", date: "08:00 AM", status: "completed", description: "Vitals inspection and patient check-ups" },
            { title: "Emergency Cardiac Surgery (Dr. Vance)", date: "10:30 AM", status: "completed", description: "OR 2 - Patient: E. Watson" },
            { title: "Shift Change & Staff Briefing", date: "02:00 PM", status: "current", description: "Handover of patient logs to evening shift" },
            { title: "Pediatric Follow-up & Discharge", date: "04:30 PM", status: "upcoming", description: "Final clearance for S. Martinez" },
          ],
        },
      ],
    };
  }

  if (info.domain === "saas_website") {
    return {
      title: `${topic} Product & Platform`,
      description: `Modern SaaS cloud platform for automated intelligence and team productivity`,
      components: [
        {
          type: "hero",
          title: `Build, Scale & Automate with ${topic}`,
          subtitle: "The enterprise-ready platform that unites real-time collaboration, generative AI workflows, and cloud observability.",
          actionText: "Start 14-Day Free Trial",
          icon: "⚡",
        },
        {
          type: "grid",
          title: "Core Platform Capabilities",
          items: [
            { title: "Real-time Sync", description: "Sub-millisecond state synchronization across distributed teams and devices.", tags: ["WebSocket", "CRDT"] },
            { title: "Generative UI Engine", description: "Turn dynamic schemas into interactive frontend components instantly.", tags: ["AI", "React"] },
            { title: "Enterprise Security", description: "End-to-end encryption, SOC2 compliance, and fine-grained RBAC controls.", tags: ["Security", "SSO"] },
            { title: "Extensible APIs", description: "Developer-first GraphQL and REST endpoints with prebuilt SDKs.", tags: ["API", "SDKs"] },
          ],
        },
        {
          type: "table",
          title: "Transparent Plan Comparison",
          columns: ["Plan Tier", "Monthly Price", "Team Members", "AI Workflows", "Support"],
          rows: [
            ["Starter", "$29 / mo", "Up to 5", "1,000 runs", "Community"],
            ["Professional", "$79 / mo", "Up to 25", "10,000 runs", "Priority Email"],
            ["Enterprise", "Custom", "Unlimited", "Unlimited", "24/7 Dedicated SLA"],
          ],
        },
        {
          type: "form",
          title: "Schedule a Personalized Product Demo",
          fields: [
            { name: "workEmail", label: "Work Email", fieldType: "email", placeholder: "you@company.com" },
            { name: "companySize", label: "Company Size", fieldType: "select", options: ["1-10 Employees", "11-50 Employees", "51-200 Employees", "200+ Enterprise"] },
            { name: "requirements", label: "Core Requirements", fieldType: "textarea", placeholder: "Tell us about your team's goals..." },
          ],
        },
      ],
    };
  }

  if (info.domain === "startup_finance") {
    return {
      title: "Startup Finance & Treasury Dashboard",
      description: "Monitor monthly recurring revenue, burn rate, cash runway, and expense allocations",
      components: [
        { type: "metric", title: "Monthly Revenue", value: "$45,200", icon: "💰", change: "+24%", trend: "up" },
        { type: "metric", title: "Monthly Expenses", value: "$38,900", icon: "📉", change: "+8%", trend: "up" },
        { type: "metric", title: "Net Profit", value: "$6,300", icon: "📈", change: "+156%", trend: "up" },
        { type: "metric", title: "Burn Rate", value: "$38.9K/mo", icon: "🔥", change: "-5%", trend: "down" },
        {
          type: "progress",
          title: "Cash Runway Remaining",
          value: 74,
          label: "14.2 months runway at current burn",
        },
        {
          type: "chart",
          title: "Revenue vs Expenses Trend",
          chartType: "bar",
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            { label: "Revenue", data: [22000, 28000, 31000, 35000, 40000, 45200], backgroundColor: "#10b981" },
            { label: "Expenses", data: [35000, 36000, 37000, 37500, 38000, 38900], backgroundColor: "#ef4444" },
          ],
        },
        {
          type: "table",
          title: "Monthly Financial Statements",
          columns: ["Month", "Gross Revenue", "Operating Expenses", "Net Margin", "MoM Growth"],
          rows: [
            ["June", "$45,200", "$38,900", "+$6,300", "+13%"],
            ["May", "$40,000", "$38,000", "+$2,000", "+14%"],
            ["April", "$35,000", "$37,500", "-$2,500", "+13%"],
            ["March", "$31,000", "$37,000", "-$6,000", "+11%"],
          ],
        },
      ],
    };
  }

  if (info.domain === "project_management") {
    return {
      title: "Project Management & Sprint Dashboard",
      description: "Track team velocity, active sprint tasks, blockers, and project milestones",
      components: [
        { type: "metric", title: "Total Tasks", value: "48", icon: "📋", trend: "neutral" },
        { type: "metric", title: "Completed", value: "32", icon: "✅", change: "+6", trend: "up" },
        { type: "metric", title: "In Progress", value: "10", icon: "🔄", trend: "neutral" },
        { type: "metric", title: "Overdue", value: "3", icon: "⚠️", change: "-1", trend: "down" },
        {
          type: "progress",
          title: "Overall Sprint Progress",
          value: 67,
          label: "67% of sprint deliverables completed",
        },
        {
          type: "table",
          title: "Active Task Board",
          columns: ["Task", "Assignee", "Priority", "Due Date", "Status"],
          rows: [
            ["Design Dynamic UI Canvas", "Alice", "High", "Aug 10", "In Progress"],
            ["LLM Router Streaming API", "Bob", "Critical", "Aug 12", "In Progress"],
            ["Database Schema Migration", "Charlie", "Medium", "Aug 15", "To Do"],
            ["Unit Test Coverage Suite", "Diana", "High", "Aug 18", "To Do"],
          ],
        },
        {
          type: "timeline",
          title: "Project Release Milestones",
          events: [
            { title: "Sprint Kickoff & Architecture Plan", date: "Jul 15, 2025", status: "completed", description: "Defined core schema and component contracts" },
            { title: "Alpha Prototype & Internal Dogfooding", date: "Aug 01, 2025", status: "completed", description: "Delivered first functioning preview" },
            { title: "Beta Quality Testing & Performance Audit", date: "Aug 15, 2025", status: "current", description: "Auditing latency and prompt resilience" },
            { title: "General Public Availability", date: "Sep 01, 2025", status: "upcoming", description: "Global deployment to production" },
          ],
        },
      ],
    };
  }

  if (info.domain === "expense_tracker") {
    return {
      title: "Personal & Business Expense Tracker",
      description: "Manage monthly budgets, categorized spending, transactions, and savings targets",
      components: [
        { type: "metric", title: "Total Expenses", value: "$4,250", icon: "💰", change: "+12%", trend: "up" },
        { type: "metric", title: "Budget Remaining", value: "$1,750", icon: "🎯", change: "-8%", trend: "down" },
        { type: "metric", title: "Transactions", value: "47", icon: "📝", trend: "neutral" },
        { type: "metric", title: "Savings Rate", value: "29%", icon: "🏦", change: "+3%", trend: "up" },
        {
          type: "chart",
          title: "Expenses by Category",
          chartType: "pie",
          labels: ["Food & Dining", "Transport", "Utilities", "Cloud & Tools", "Shopping", "Health"],
          datasets: [{ label: "Amount ($)", data: [1200, 800, 600, 450, 700, 500], backgroundColor: ["#6366f1", "#8b5cf6", "#a78bfa", "#f472b6", "#fb923c", "#34d399"] }],
        },
        {
          type: "table",
          title: "Recent Transaction Ledger",
          columns: ["Date", "Description", "Category", "Amount", "Payment Mode"],
          rows: [
            ["Jun 15", "Whole Foods Market", "Food & Dining", "$85.50", "Card"],
            ["Jun 14", "Metro Transit Pass", "Transport", "$45.00", "Apple Pay"],
            ["Jun 13", "AWS Infrastructure", "Cloud & Tools", "$120.00", "Card"],
            ["Jun 12", "Bistro Dinner", "Food & Dining", "$62.30", "Card"],
            ["Jun 11", "Bookstore Purchase", "Shopping", "$39.99", "Debit"],
          ],
        },
        {
          type: "form",
          title: "Record New Expense",
          fields: [
            { name: "description", label: "Expense Description", fieldType: "text", placeholder: "e.g. Software subscription" },
            { name: "amount", label: "Amount ($)", fieldType: "number", placeholder: "0.00" },
            { name: "category", label: "Category", fieldType: "select", options: ["Food & Dining", "Transport", "Utilities", "Cloud & Tools", "Shopping", "Healthcare", "Other"] },
            { name: "date", label: "Transaction Date", fieldType: "date" },
          ],
        },
      ],
    };
  }

  if (info.domain === "cargo_management") {
    return {
      title: "Cargo & Freight Logistics Workspace",
      description: "Track multimodal shipments, container manifests, carrier dispatches, and customs clearance",
      components: [
        {
          type: "hero",
          title: "Cargo Freight & Dispatch Operations",
          subtitle: "Real-time logistics tracking across sea, air, and freight transport routes worldwide.",
          actionText: "Dispatch Shipment",
          icon: "🚢",
        },
        {
          type: "table",
          title: "Active Cargo Manifests",
          columns: ["Shipment ID", "Origin", "Destination", "Carrier", "Weight (kg)", "Status"],
          rows: [
            ["CRG-9021", "Port of Singapore", "Rotterdam Port", "Maersk Line", "14,500 kg", "In Transit"],
            ["CRG-9022", "Shanghai Hub", "Los Angeles LAX", "Air Cargo Express", "3,200 kg", "Customs Cleared"],
            ["CRG-9023", "Hamburg Rail", "Milan Logistics Yard", "EuroFreight Rail", "8,900 kg", "Dispatched"],
            ["CRG-9024", "Dubai Air Cargo", "London Heathrow", "Emirates SkyCargo", "2,400 kg", "Departed"],
            ["CRG-9025", "Tokyo Port", "Sydney Harbour", "Ocean Network Exp", "21,000 kg", "Docked"],
          ],
        },
        {
          type: "form",
          title: "Book & Dispatch New Cargo",
          fields: [
            { name: "origin", label: "Origin Location / Port", fieldType: "text", placeholder: "e.g. Singapore" },
            { name: "destination", label: "Destination Location", fieldType: "text", placeholder: "e.g. Rotterdam" },
            { name: "carrier", label: "Carrier / Mode", fieldType: "select", options: ["Ocean Freight", "Air Cargo", "Rail Transport", "Trucking"] },
            { name: "weight", label: "Gross Weight (kg)", fieldType: "number", placeholder: "e.g. 5000" },
            { name: "notes", label: "Customs Manifest Notes", fieldType: "textarea", placeholder: "Cargo description and hazardous notes..." },
          ],
        },
        {
          type: "timeline",
          title: "Logistics Waypoint Milestones",
          events: [
            { title: "Customs Documentation Verified", date: "06:00 AM", status: "completed", description: "Bill of Lading and inspection passed" },
            { title: "Container Vessel Loading - Berth 4", date: "10:30 AM", status: "completed", description: "Gantry crane loading completed" },
            { title: "Open Ocean Departure", date: "02:00 PM", status: "current", description: "En route to destination waypoint" },
            { title: "Port Clearance & Final Drayage", date: "Tomorrow", status: "upcoming", description: "Scheduled terminal discharge" },
          ],
        },
      ],
    };
  }

  if (info.domain === "gym_management") {
    return {
      title: "Gym Operations & Membership System",
      description: "Manage member enrollments, trainer schedules, subscription renewals, and class bookings",
      components: [
        {
          type: "hero",
          title: "Fitness Center & Gym Operations",
          subtitle: "Manage daily member check-ins, personal training sessions, equipment maintenance, and membership renewals.",
          actionText: "Register Member",
          icon: "🏋️",
        },
        {
          type: "table",
          title: "Active Member Directory",
          columns: ["Member Name", "Membership Plan", "Trainer", "Visits / Mo", "Status", "Renewal Date"],
          rows: [
            ["Alex Rodriguez", "Premium All-Access", "Marcus Stone", "18 Visits", "Active", "Sep 15, 2025"],
            ["Elena Rostova", "CrossFit & Yoga", "Sarah Jenkins", "14 Visits", "Active", "Oct 01, 2025"],
            ["David Kim", "Standard Gym Pass", "Unassigned", "8 Visits", "Active", "Aug 28, 2025"],
            ["Maya Patel", "VIP Personal Training", "Marcus Stone", "22 Visits", "Active", "Nov 10, 2025"],
            ["Lucas Vance", "Student Fitness Pass", "Unassigned", "12 Visits", "Renewal Due", "Aug 12, 2025"],
          ],
        },
        {
          type: "form",
          title: "Register New Member / Class Booking",
          fields: [
            { name: "memberName", label: "Member Full Name", fieldType: "text", placeholder: "e.g. Jordan Hayes" },
            { name: "email", label: "Email Address", fieldType: "email", placeholder: "jordan@example.com" },
            { name: "plan", label: "Membership Tier", fieldType: "select", options: ["Standard Gym Pass", "CrossFit & Yoga", "Premium All-Access", "VIP Personal Training"] },
            { name: "trainer", label: "Assigned Personal Trainer", fieldType: "select", options: ["No Trainer (Self)", "Marcus Stone (Strength)", "Sarah Jenkins (HIIT / Yoga)", "Elena Rostova (Conditioning)"] },
          ],
        },
        {
          type: "timeline",
          title: "Today's Group Fitness Schedule",
          events: [
            { title: "Morning HIIT & Core Conditioning", date: "07:00 AM", status: "completed", description: "Studio A - Instructor: Sarah Jenkins" },
            { title: "Olympic Weightlifting Clinic", date: "11:00 AM", status: "completed", description: "Main Platform - Coach: Marcus Stone" },
            { title: "Power Yoga & Mobility Workshop", date: "05:30 PM", status: "current", description: "Studio B - Capacity: 20 members" },
            { title: "Evening Spin & Cardio Rush", date: "07:00 PM", status: "upcoming", description: "Cycling Arena - High Intensity" },
          ],
        },
      ],
    };
  }

  // 3. Universal Broad-Intent Fallback (For unlisted/novel domains)
  if (info.broadIntent === "management" || info.broadIntent === "application") {
    return {
      title: `${topic} Management Workspace`,
      description: `Tailored operations and data management system for ${topic}`,
      components: [
        {
          type: "hero",
          title: `${topic} Workspace & Records`,
          subtitle: `Streamline day-to-day operations, track active records, and manage workflows for ${topic}.`,
          actionText: "Add New Record",
          icon: "📁",
        },
        {
          type: "table",
          title: `Primary ${topic} Records`,
          columns: ["ID", "Item / Entity", "Category / Type", "Status", "Last Updated"],
          rows: [
            ["REC-101", `${topic} Item Alpha`, "Standard", "Active", "Today, 09:30 AM"],
            ["REC-102", `${topic} Item Beta`, "Priority", "In Progress", "Today, 11:15 AM"],
            ["REC-103", `${topic} Item Gamma`, "Standard", "Completed", "Yesterday, 04:00 PM"],
            ["REC-104", `${topic} Item Delta`, "System", "Verified", "Aug 05, 2025"],
          ],
        },
        {
          type: "form",
          title: `Create / Update ${topic} Entry`,
          fields: [
            { name: "title", label: `${topic} Title / Identifier`, fieldType: "text", placeholder: `Enter ${topic} name...` },
            { name: "category", label: "Classification / Category", fieldType: "select", options: ["High Priority", "Standard", "Routine", "Archived"] },
            { name: "notes", label: "Operational Notes & Details", fieldType: "textarea", placeholder: "Enter details and special instructions..." },
          ],
        },
        {
          type: "card",
          title: `${topic} Workflow Summary`,
          content: `All actions and records for ${topic} are synchronized in real-time. Use the intake form to register new entries or update existing records.`,
          icon: "💡",
        },
      ],
    };
  }

  if (info.broadIntent === "booking") {
    return {
      title: `${topic} Booking & Reservations`,
      description: `Reserve appointments, schedule sessions, and manage bookings for ${topic}`,
      components: [
        {
          type: "hero",
          title: `Book Your ${topic} Session`,
          subtitle: `Select preferred dates, choose options, and confirm your reservation with instant confirmation.`,
          actionText: "Book Now",
          icon: "📅",
        },
        {
          type: "table",
          title: "Available Booking Slots",
          columns: ["Option / Service", "Duration", "Price", "Availability", "Action"],
          rows: [
            [`Standard ${topic} Session`, "45 Mins", "$50.00", "Available Today", "Instant Book"],
            [`Premium ${topic} Consultation`, "90 Mins", "$110.00", "Available Tomorrow", "Instant Book"],
            [`Group ${topic} Workshop`, "2 Hours", "$35.00", "5 Spots Left", "Reserve Spot"],
          ],
        },
        {
          type: "form",
          title: `Make a Reservation`,
          fields: [
            { name: "fullName", label: "Full Name", fieldType: "text", placeholder: "Your name" },
            { name: "email", label: "Email Address", fieldType: "email", placeholder: "you@example.com" },
            { name: "date", label: "Booking Date", fieldType: "date" },
            { name: "slot", label: "Time Slot", fieldType: "select", options: ["09:00 AM", "11:30 AM", "02:00 PM", "04:30 PM"] },
            { name: "notes", label: "Special Requests", fieldType: "textarea", placeholder: "Any specific requirements..." },
          ],
        },
      ],
    };
  }

  if (info.broadIntent === "catalog") {
    return {
      title: `${topic} Catalog & Directory`,
      description: `Browse items, filter categories, and explore the complete ${topic} collection`,
      components: [
        {
          type: "hero",
          title: `${topic} Directory & Catalog`,
          subtitle: `Explore curated items, view specifications, and search through the complete catalog.`,
          actionText: "Browse All",
          icon: "📦",
        },
        {
          type: "grid",
          title: `Featured ${topic} Items`,
          items: [
            { title: `${topic} Item 1`, description: `Premium quality ${topic} with verified specifications.`, tags: ["Featured", "Popular"] },
            { title: `${topic} Item 2`, description: `High-performance edition designed for daily use.`, tags: ["New", "Top Rated"] },
            { title: `${topic} Item 3`, description: `Compact and versatile option with extended durability.`, tags: ["Standard"] },
            { title: `${topic} Item 4`, description: `Enterprise-grade version with complete support.`, tags: ["Pro"] },
          ],
        },
        {
          type: "form",
          title: `Search & Filter ${topic}`,
          fields: [
            { name: "searchQuery", label: "Search Keywords", fieldType: "text", placeholder: `Search ${topic}...` },
            { name: "category", label: "Category Filter", fieldType: "select", options: ["All Categories", "Popular", "New Releases", "Archived"] },
          ],
        },
      ],
    };
  }

  // 3. Model-Specific Architectural Workflows (for novel or general prompts)
  if (model === "o3-mini") {
    // OpenAI o3-mini: Step-by-Step System Architecture, Verification Matrix & Milestone Timelines
    return {
      title: `${topic} Architecture & Milestone Pipeline`,
      description: `Structured logic pipeline, milestone execution tracker, and verification audit for ${topic}`,
      components: [
        {
          type: "hero",
          title: `${topic} Architectural Engine`,
          subtitle: `Systematic decomposition and milestone-driven execution pipeline for ${topic} with automated verification checkpoints.`,
          actionText: "Verify Pipeline",
          icon: "🧠",
        },
        {
          type: "progress",
          title: "Execution Verification & Milestone State",
          value: 91,
          label: "Input validation passed • Entity state verified • System constraints satisfied",
        },
        {
          type: "timeline",
          title: "Step-by-Step Execution Sequence",
          events: [
            { title: "Phase 1: Requirements Ingestion & Parsing", date: "Step 1", status: "completed", description: `Decomposed "${prompt}" into foundational data schemas.` },
            { title: "Phase 2: Entity State & Constraint Mapping", date: "Step 2", status: "completed", description: "Established relationship integrity and parameter boundaries." },
            { title: "Phase 3: Automated Verification Checkpoints", date: "Step 3", status: "current", description: "Running automated schema validation and sanity assertions." },
            { title: "Phase 4: Production Deployment & Orchestration", date: "Step 4", status: "upcoming", description: "Finalizing live state sync and operational dispatch." },
          ],
        },
        {
          type: "table",
          title: "Verification Matrix & Parameter Audits",
          columns: ["Audit Parameter", "Target Metric", "Verified Value", "Tolerance", "Status"],
          rows: [
            ["Schema Integrity", "JSON Schema v7", "100% Compliant", "0 Errors", "Passed"],
            ["State Latency", "< 200ms", "42ms", "±10ms", "Optimal"],
            ["Entity Bounds", "100% Validated", "Validated", "Strict", "Verified"],
            ["Execution Thread", "Async Worker Pool", "4 Active Pools", "Nominal", "Running"],
          ],
        },
        {
          type: "form",
          title: "Pipeline Parameter Calibration",
          fields: [
            { name: "execMode", label: "Execution Mode", fieldType: "select", options: ["Deterministic (Standard)", "Strict Validation", "Diagnostic Debug"] },
            { name: "threshold", label: "Verification Threshold (%)", fieldType: "number", placeholder: "e.g. 95" },
            { name: "notes", label: "Execution Directives", fieldType: "textarea", placeholder: "Specify custom logic rules or constraints..." },
          ],
        },
      ],
    };
  }

  if (model === "claude-3.5-sonnet") {
    // Anthropic Claude 3.5 Sonnet: Editorial, Human-Centric, Curated Knowledge & Narrative
    return {
      title: `${topic} Editorial & Knowledge Hub`,
      description: `Thoughtfully crafted narrative, curated collections, and structured exploration for ${topic}`,
      components: [
        {
          type: "hero",
          title: `Refined ${topic} Experience`,
          subtitle: `A curated interface focused on clarity, structured context, and human-centered design for ${topic}.`,
          actionText: "Explore Collection",
          icon: "🖋️",
        },
        {
          type: "card",
          title: "Core Philosophy & Perspective",
          content: `Designed to bring structured clarity and focus to "${prompt}". Every component is organized for effortless navigation, deep contextual understanding, and accessible interaction.`,
          icon: "✨",
        },
        {
          type: "grid",
          title: `Curated ${topic} Directory`,
          items: [
            { title: `${topic} Overview`, description: `Comprehensive background and foundation principles for ${topic}.`, tags: ["Essential", "Curated"] },
            { title: "Operational Methodology", description: "Structured practices refined for consistent daily performance.", tags: ["Methodology", "Guide"] },
            { title: "Knowledge Archive", description: "Documented insights, reference materials, and verified case studies.", tags: ["Archive"] },
            { title: "Collaborative Initiatives", description: "Cross-functional opportunities and community-driven workflows.", tags: ["Community"] },
          ],
        },
        {
          type: "list",
          title: "Priority Recommendations & Milestones",
          items: [
            { title: "Review Foundation Principles", subtitle: `Initial walkthrough of primary ${topic} attributes`, badge: "Priority 1", icon: "📖" },
            { title: "Establish Workflow Standards", subtitle: "Define operational guidelines and quality expectations", badge: "Priority 2", icon: "📋" },
            { title: "Engage In Stakeholder Inquiries", subtitle: "Connect with domain specialists and team members", badge: "Active", icon: "🤝" },
          ],
        },
        {
          type: "form",
          title: "Thoughtful Feedback & Inquiries",
          fields: [
            { name: "name", label: "Full Name", fieldType: "text", placeholder: "Your name" },
            { name: "email", label: "Email Address", fieldType: "email", placeholder: "you@organization.org" },
            { name: "topicArea", label: "Topic Area", fieldType: "select", options: ["General Feedback", "Research Inquiry", "Collaboration", "Editorial Review"] },
            { name: "reflections", label: "Your Reflections / Inquiries", fieldType: "textarea", placeholder: "Share your detailed thoughts..." },
          ],
        },
      ],
    };
  }

  if (model === "deepseek-r1") {
    // DeepSeek R1: Mathematical Telemetry, Data Matrix & High-Density Parameters
    return {
      title: `${topic} Telemetry & Algorithmic Matrix`,
      description: `High-density computational metrics, system telemetry, and audit matrix for ${topic}`,
      components: [
        {
          type: "hero",
          title: `DeepSeek ${topic} Telemetry Hub`,
          subtitle: `Real-time computational telemetry, statistical distributions, and high-density state matrices for ${topic}.`,
          actionText: "Compute Telemetry",
          icon: "📊",
        },
        { type: "metric", title: "System SLA", value: "99.98%", icon: "⚡", change: "+0.02%", trend: "up" },
        { type: "metric", title: "Compute Latency", value: "1.2 ms", icon: "⏱️", change: "-0.4 ms", trend: "down" },
        { type: "metric", title: "Throughput Matrix", value: "14.8k ops/s", icon: "📈", change: "+12.4%", trend: "up" },
        { type: "metric", title: "Vector Capacity", value: "4.2M Nodes", icon: "🧮", trend: "neutral" },
        {
          type: "chart",
          title: "Computational Throughput & Load Distribution",
          chartType: "line",
          labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"],
          datasets: [{ label: "Ops / Sec", data: [9800, 11200, 14200, 15800, 14900, 16400, 17200], backgroundColor: "rgba(16,185,129,0.2)" }],
        },
        {
          type: "table",
          title: `${topic} Computational State Matrix`,
          columns: ["Node ID", "Vector Index", "Tensor Load", "Latency", "Memory Footprint", "Health"],
          rows: [
            ["NODE-ALPHA-01", "vec_idx_0091", "34.2 GFLOP", "0.82 ms", "1.4 GB / 8 GB", "Optimal"],
            ["NODE-BETA-02", "vec_idx_0092", "48.9 GFLOP", "1.14 ms", "2.1 GB / 8 GB", "Optimal"],
            ["NODE-GAMMA-03", "vec_idx_0093", "22.1 GFLOP", "0.64 ms", "0.9 GB / 8 GB", "Optimal"],
            ["NODE-DELTA-04", "vec_idx_0094", "51.6 GFLOP", "1.42 ms", "3.2 GB / 8 GB", "Nominal"],
          ],
        },
        {
          type: "form",
          title: "Algorithmic Parameter Tuning",
          fields: [
            { name: "learningRate", label: "Learning Rate / Convergence", fieldType: "text", placeholder: "e.g. 0.0001" },
            { name: "batchSize", label: "Batch Size Configuration", fieldType: "select", options: ["32 Samples", "64 Samples", "128 Samples", "256 Large Matrix"] },
            { name: "kernelConfig", label: "Matrix Optimization Flags", fieldType: "textarea", placeholder: "--fp16 --enable-flash-attn --vector-opt" },
          ],
        },
      ],
    };
  }

  if (model.includes("gpt-4o")) {
    // OpenAI GPT-4o: Modern SaaS Metric Dashboard & Growth Analytics
    return {
      title: `${topic} Enterprise Platform`,
      description: `Comprehensive SaaS workspace, performance metrics, and operational workflows for ${topic}`,
      components: [
        {
          type: "hero",
          title: `${topic} Enterprise Workspace`,
          subtitle: `Accelerate productivity, streamline operational records, and monitor growth metrics for ${topic} in real time.`,
          actionText: "Launch Action",
          icon: "🚀",
        },
        { type: "metric", title: "Active Records", value: "2,840", icon: "📁", change: "+24%", trend: "up" },
        { type: "metric", title: "Monthly Growth", value: "+38.4%", icon: "📈", change: "+5.1%", trend: "up" },
        { type: "metric", title: "Efficiency Rate", value: "96.2%", icon: "⚡", change: "+1.8%", trend: "up" },
        { type: "metric", title: "Sync Latency", value: "48 ms", icon: "🌐", change: "-12 ms", trend: "down" },
        {
          type: "chart",
          title: `${topic} Activity & Performance Growth`,
          chartType: "bar",
          labels: ["Q1", "Q2", "Q3", "Q4"],
          datasets: [{ label: "Growth Volume", data: [420, 680, 940, 1320], backgroundColor: "#6366f1" }],
        },
        {
          type: "grid",
          title: `Featured ${topic} Capabilities`,
          items: [
            { title: "Automated Synchronization", description: "Real-time state updates across distributed web workers.", tags: ["Automation", "Fast"] },
            { title: "Granular Access Control", description: "Role-based authorization and audited permission scopes.", tags: ["Security"] },
            { title: "Telemetry Analytics", description: "Integrated dashboards tracking performance and retention.", tags: ["Analytics"] },
            { title: "Custom Workflow Canvas", description: "Declarative UI layout configuration with live previews.", tags: ["Canvas"] },
          ],
        },
        {
          type: "table",
          title: `Active ${topic} Operational Log`,
          columns: ["ID", "Record Identifier", "Assigned Owner", "Category", "Status", "Last Modified"],
          rows: [
            ["REC-201", `${topic} Unit Alpha`, "Alex Morgan", "High Priority", "Active", "Just now"],
            ["REC-202", `${topic} Unit Beta`, "Jordan Lee", "Standard", "In Review", "12m ago"],
            ["REC-203", `${topic} Unit Gamma`, "Samira Khan", "Routine", "Completed", "1h ago"],
            ["REC-204", `${topic} Unit Delta`, "David Vance", "Priority", "Active", "3h ago"],
          ],
        },
        {
          type: "form",
          title: `Register / Update ${topic} Entity`,
          fields: [
            { name: "entityName", label: `${topic} Name / Title`, fieldType: "text", placeholder: `Enter ${topic} name...` },
            { name: "category", label: "Operational Classification", fieldType: "select", options: ["Enterprise Tier", "Standard Tier", "Experimental", "Archived"] },
            { name: "details", label: "Detailed Specifications", fieldType: "textarea", placeholder: "Enter operational parameters..." },
          ],
        },
      ],
    };
  }

  if (model.includes("groq")) {
    // Groq LPU: High-Throughput Developer Command Center
    return {
      title: `${topic} Developer Command Center`,
      description: `High-velocity execution hub and rapid dispatch center for ${topic}`,
      components: [
        {
          type: "hero",
          title: `Groq LPU ${topic} Dispatch`,
          subtitle: `Sub-millisecond command execution, instant operational dispatches, and high-velocity workflow control.`,
          actionText: "Dispatch Task",
          icon: "⚡",
        },
        {
          type: "grid",
          title: "Quick Execution Hub",
          items: [
            { title: "Instant Dispatch", description: `Trigger high-priority ${topic} job execution immediately.`, tags: ["Fast", "LPU"] },
            { title: "Telemetry Stream", description: "Continuous low-overhead telemetry ingestion.", tags: ["Stream"] },
            { title: "Task Pipeline", description: "Automated batch processing and worker distribution.", tags: ["Queue"] },
          ],
        },
        {
          type: "table",
          title: "Active Dispatch Pipeline",
          columns: ["Job ID", "Target System", "Execution Mode", "Latency", "State"],
          rows: [
            ["JOB-901", `${topic} Core Worker`, "LPU Accelerated", "18 ms", "Executed"],
            ["JOB-902", `${topic} Dispatcher`, "Direct Async", "22 ms", "Running"],
            ["JOB-903", `${topic} Sync Agent`, "Event Stream", "14 ms", "Queued"],
          ],
        },
        {
          type: "form",
          title: "Dispatch New Command",
          fields: [
            { name: "command", label: "Command / Directive", fieldType: "text", placeholder: "e.g. EXECUTE_SYNC --force" },
            { name: "priority", label: "Priority Level", fieldType: "select", options: ["Urgent (LPU High)", "Standard", "Background"] },
          ],
        },
      ],
    };
  }

  // Google Gemini (Default): Google Material Action-Oriented Multi-Layer Hub
  return {
    title: `${topic} Operations & Workspace`,
    description: `Action-driven Material workspace and real-time operational streams for ${topic}`,
    components: [
      {
        type: "hero",
        title: `${topic} Real-Time Operations`,
        subtitle: `Instant multimodal synchronization, operational streams, and responsive workflow automation tailored for ${topic}.`,
        actionText: "Create Record",
        icon: "✨",
      },
      { type: "metric", title: "Active Status", value: "Online", icon: "🟢", trend: "up" },
      { type: "metric", title: "Sync Health", value: "100%", icon: "⚡", change: "< 50ms", trend: "up" },
      {
        type: "grid",
        title: `${topic} Highlights & Categories`,
        items: [
          { title: "Real-Time Feed", description: `Continuous live synchronization for ${topic}.`, tags: ["Live", "Sync"] },
          { title: "Smart Categories", description: "Organized data records with instant filter chips.", tags: ["Filter"] },
          { title: "Collaborative Tools", description: "Multi-user coordination and shared operational views.", tags: ["Team"] },
        ],
      },
      {
        type: "table",
        title: `Primary ${topic} Records`,
        columns: ["Record ID", "Title / Entity", "Classification", "Status", "Updated"],
        rows: [
          ["REC-101", `${topic} Alpha Entry`, "Primary", "Active", "Today, 09:30 AM"],
          ["REC-102", `${topic} Beta Entry`, "Standard", "In Progress", "Today, 11:15 AM"],
          ["REC-103", `${topic} Gamma Entry`, "Archived", "Completed", "Yesterday, 04:00 PM"],
        ],
      },
      {
        type: "form",
        title: `Add ${topic} Record`,
        fields: [
          { name: "title", label: "Record Title", fieldType: "text", placeholder: `Enter ${topic} name...` },
          { name: "type", label: "Category", fieldType: "select", options: ["High Priority", "Standard", "Routine"] },
          { name: "notes", label: "Operational Notes", fieldType: "textarea", placeholder: "Add details..." },
        ],
      },
    ],
  };
}

/* ==========================================================================
   Context-Aware Schema Modification Engine
   ========================================================================== */

export function inferDomainFromSchema(schema: JsonRecord, instruction?: string): string {
  const schemaTitle = String(schema.title || "");
  const schemaDesc = String(schema.description || "");
  const compText = Array.isArray(schema.components)
    ? schema.components.map((c: any) => `${c?.title || ""} ${c?.content || ""} ${c?.type || ""}`).join(" ")
    : "";
  const combined = `${schemaTitle} ${schemaDesc} ${compText} ${instruction || ""}`.toLowerCase();

  if (/\b(?:expense|expenses|budget|spending|finance|financial|ledger|invoice|invoices|burn rate|runway|cashflow|accounting|bills?|payroll|bank|wallet|money|revenue)\b/i.test(combined)) {
    return "finance";
  }
  if (/\b(?:e-commerce|ecommerce|store|shop|shopping|product|products|cart|checkout|orders|retail|catalog|inventory|merchandise|sales)\b/i.test(combined)) {
    return "ecommerce";
  }
  if (/\b(?:patient|patients|doctor|doctors|clinic|hospital|medical|healthcare|vitals|appointment|diagnosis|bed occupancy|emergency|treatment)\b/i.test(combined)) {
    return "healthcare";
  }
  if (/\b(?:gym|fitness|workout|exercise|training|calories|reps|sets|cardio|trainer|routine|crossfit)\b/i.test(combined)) {
    return "fitness";
  }
  if (/\b(?:restaurant|cafe|dining|food|bistro|menu|dishes|chef|culinary|table reservation|pizzeria|bakery)\b/i.test(combined)) {
    return "restaurant";
  }
  if (/\b(?:developer portfolio|portfolio|cv|resume|designer|case studies|showcase|bio|engineer profile)\b/i.test(combined)) {
    return "portfolio";
  }
  if (/\b(?:sprint|jira|github|devops|scrum|project management|tasks|roadmap|release|tickets|bugs|pull request|kanban|backlog)\b/i.test(combined)) {
    return "project";
  }
  if (/\b(?:student|academic|school|marks|cgpa|gradebook|classroom|exam|exams|attendance|semester|university|teacher|course|curriculum)\b/i.test(combined)) {
    return "student";
  }
  return "custom";
}

export function modifyFallbackSchema(
  existingSchema: Record<string, unknown>,
  instruction: string
): Record<string, unknown> {
  const schema = JSON.parse(JSON.stringify(existingSchema)) as JsonRecord;
  const components = Array.isArray(schema.components)
    ? (schema.components.filter((c): c is JsonRecord => typeof c === "object" && c !== null) as JsonRecord[])
    : [];

  const lowerInst = instruction.toLowerCase().trim();
  const schemaTitle = typeof schema.title === "string" ? schema.title : "Interface";
  const extractedName = extractEntityName(instruction);

  // 1. Title Updates (e.g. "Change title to Developer Portfolio", "Rename title to Fitness Hub")
  if (/\b(?:change|update|set|rename)\b[\s\S]*?\btitle\b/i.test(lowerInst)) {
    const titleMatch =
      instruction.match(/\b(?:to|as)\s+["']?([^"'\n]+)["']?$/i) ||
      instruction.match(/\btitle\s+(?:to|as)?\s*["']?([^"'\n]+)["']?$/i);
    if (titleMatch?.[1]) {
      schema.title = titleMatch[1].replace(/["']/g, "").trim();
      schema.components = components;
      return schema;
    }
  }

  // 2. Description Updates (e.g. "Update description to...", "Change description to...")
  if (/\b(?:change|update|set)\b[\s\S]*?\bdescription\b/i.test(lowerInst)) {
    const descMatch = instruction.match(/\b(?:to|as)\s+["']?([^"'\n]+)["']?$/i);
    if (descMatch?.[1]) {
      schema.description = descMatch[1].replace(/["']/g, "").trim();
      schema.components = components;
      return schema;
    }
  }

  // 3. Universal Component Removal / Deletion (e.g. "delete hero", "remove contact form", "remove chart", "delete table", "remove progress")
  if (/\b(?:remove|delete|hide|drop|eliminate)\b/i.test(lowerInst)) {
    // Specific component type matching
    if (/\b(?:hero|header|banner)\b/i.test(lowerInst)) {
      const idx = components.findIndex((c) => c.type === "hero");
      if (idx >= 0) { components.splice(idx, 1); schema.components = components; return schema; }
    }
    if (/\b(?:form|contact|inputs)\b/i.test(lowerInst)) {
      const idx = components.findIndex((c) => c.type === "form");
      if (idx >= 0) { components.splice(idx, 1); schema.components = components; return schema; }
    }
    if (/\b(?:chart|graph|analytics)\b/i.test(lowerInst)) {
      const idx = components.findIndex((c) => c.type === "chart");
      if (idx >= 0) { components.splice(idx, 1); schema.components = components; return schema; }
    }
    if (/\b(?:table|grid-table|records|roster|manifest)\b/i.test(lowerInst)) {
      const idx = components.findIndex((c) => c.type === "table");
      if (idx >= 0) { components.splice(idx, 1); schema.components = components; return schema; }
    }
    if (/\b(?:progress|tracker|completion)\b/i.test(lowerInst)) {
      const idx = components.findIndex((c) => c.type === "progress");
      if (idx >= 0) { components.splice(idx, 1); schema.components = components; return schema; }
    }
    if (/\b(?:timeline|milestones|schedule|events)\b/i.test(lowerInst)) {
      const idx = components.findIndex((c) => c.type === "timeline");
      if (idx >= 0) { components.splice(idx, 1); schema.components = components; return schema; }
    }
    if (/\b(?:metric|kpi|stat)\b/i.test(lowerInst)) {
      const idx = components.findIndex((c) => c.type === "metric");
      if (idx >= 0) { components.splice(idx, 1); schema.components = components; return schema; }
    }
    if (/\b(?:button|cta)\b/i.test(lowerInst)) {
      const idx = components.findIndex((c) => c.type === "button");
      if (idx >= 0) { components.splice(idx, 1); schema.components = components; return schema; }
    }
    if (/\b(?:grid|cards)\b/i.test(lowerInst)) {
      const idx = components.findIndex((c) => c.type === "grid");
      if (idx >= 0) { components.splice(idx, 1); schema.components = components; return schema; }
    }
    if (/\b(?:card|about)\b/i.test(lowerInst)) {
      const idx = components.findIndex((c) => c.type === "card");
      if (idx >= 0) { components.splice(idx, 1); schema.components = components; return schema; }
    }

    // Generic name matching on title / content
    const targetMatch = lowerInst.match(/\b(?:remove|delete|hide|drop)\s+(?:the\s+|a\s+|an\s+)?(?:component\s+)?(.+)$/i);
    const target = targetMatch?.[1]?.trim().toLowerCase() || "";
    if (target) {
      const index = components.findIndex((c) => {
        const type = String(c.type || "").toLowerCase();
        const title = String(c.title || "").toLowerCase();
        return type.includes(target) || title.includes(target) || target.includes(title);
      });
      if (index >= 0) {
        components.splice(index, 1);
        schema.components = components;
        return schema;
      }
    }
  }

  // 4. Chart Type Conversions (e.g. "convert chart to pie", "make chart line", "change chart to bar")
  if (/\b(?:change|convert|set|make)\b[\s\S]*?\b(?:to|as)\s+(bar|line|pie|doughnut)\b/i.test(lowerInst)) {
    const match = lowerInst.match(/\b(?:to|as)\s+(bar|line|pie|doughnut)\b/i);
    const chartType = (match?.[1]?.toLowerCase() || "bar") as ChartType;
    let converted = false;
    for (const c of components) {
      if (c.type === "chart") {
        c.chartType = chartType;
        converted = true;
      }
    }
    if (converted) {
      schema.components = components;
      return schema;
    }
  }

  // 5. Form Field Addition (e.g. "Add email field", "Add phone number field", "Add date field")
  if (/\b(?:add|insert|include)\b/i.test(lowerInst) && /\bfield\b/i.test(lowerInst)) {
    const fieldTypeMatch = lowerInst.match(/\b(email|text|number|select|date|checkbox|textarea)\b/i);
    const fieldType = (fieldTypeMatch?.[1]?.toLowerCase() || "text") as FieldType;

    const labelMatch = lowerInst.match(/\b(?:add|insert|include)\s+(?:a\s+|an\s+|the\s+|new\s+)?(.+?)\s+field\b/i);
    let label = labelMatch?.[1]?.trim() || fieldType;
    label = label.replace(/\b(email|text|number|select|date|checkbox|textarea)\b/gi, "").trim() || fieldType;
    label = label.charAt(0).toUpperCase() + label.slice(1);

    const name = label.toLowerCase().replace(/[^a-z0-9]+/g, "");
    const form = components.find((c) => c.type === "form" && Array.isArray(c.fields));

    if (form && Array.isArray(form.fields)) {
      const exists = form.fields.some((f: any) => String(f.name).toLowerCase() === name);
      if (!exists) {
        form.fields.push({
          name: name || "newField",
          label: label || "New Field",
          fieldType,
          placeholder: `Enter ${label.toLowerCase()}...`,
        });
      }
      schema.components = components;
      return schema;
    }
  }

  // Infer domain context from existing schema title, description, and components
  const existingDomain = inferDomainFromSchema(schema, instruction);

  // Clean up any corrupted rows or mismatched academic components in non-student schemas
  for (const c of components) {
    if (c.type === "table" && Array.isArray(c.rows)) {
      c.rows = c.rows.filter((row: any) => {
        if (!Array.isArray(row) || !row[0]) return true;
        const firstCell = String(row[0]).toLowerCase();
        return !firstCell.includes("upcoming academic") && !firstCell.includes("add a section") && !firstCell.includes("new section");
      });
    }
  }

  // If a non-student dashboard has an "Upcoming Academic & Exam Schedule" component, clean it up into domain-appropriate timeline
  if (existingDomain !== "student") {
    for (const c of components) {
      if (c.type === "timeline" && typeof c.title === "string" && /academic|exam/i.test(c.title)) {
        if (existingDomain === "finance") {
          c.title = "Upcoming Recurring Bills & Payments";
          c.events = [
            { title: "AWS Cloud Infrastructure Billing", date: "Jul 01 • $140.00", status: "upcoming", description: "Automated monthly debit for production servers and database." },
            { title: "Office Lease & High-Speed Fiber", date: "Jul 05 • $850.00", status: "upcoming", description: "Scheduled bank transfer for commercial workplace facilities." },
            { title: "Payroll & Benefits Disbursement", date: "Jul 15 • $3,200.00", status: "upcoming", description: "Bi-weekly team payroll and insurance benefits run." },
            { title: "Corporate Liability Insurance", date: "Jul 28 • $420.00", status: "upcoming", description: "Quarterly premium installment." },
          ];
        } else if (existingDomain === "ecommerce") {
          c.title = "Upcoming Product Drops & Flash Sales";
          c.events = [
            { title: "Summer Collection Launch", date: "Friday • 10:00 AM", status: "upcoming", description: "VIP early access for loyalty tier members." },
            { title: "Weekend 30% Flash Sale", date: "Jul 12 - Jul 14", status: "upcoming", description: "Site-wide promotional discount on select accessories." },
            { title: "Exclusive Brand Collaboration", date: "End of Month", status: "upcoming", description: "Limited batch release with 500 numbered units." },
          ];
        } else if (existingDomain === "project") {
          c.title = "Upcoming Sprint Milestones & Releases";
          c.events = [
            { title: "Sprint 24 Architecture Review", date: "Wed • 02:00 PM", status: "upcoming", description: "Core API performance benchmarking and schema review." },
            { title: "Staging Smoke & Integration Tests", date: "Jul 18", status: "upcoming", description: "Automated Cypress end-to-end regression validation." },
            { title: "v2.4 Production Rollout", date: "Jul 25", status: "upcoming", description: "Zero-downtime container cluster deployment." },
          ];
        } else if (existingDomain === "healthcare") {
          c.title = "Upcoming Clinical Appointments & Procedures";
          c.events = [
            { title: "Cardiology Diagnostic Review", date: "Tomorrow • 10:30 AM", status: "upcoming", description: "Dr. Sarah Mitchell • Room 402 Examination." },
            { title: "Post-Op Physical Therapy & Vitals", date: "Jul 16 • 02:00 PM", status: "upcoming", description: "Outpatient rehabilitation clinic consultation." },
            { title: "Annual Comprehensive Health Screening", date: "Jul 29", status: "upcoming", description: "Full blood panel and metabolic markers." },
          ];
        }
      }
    }
  }

  // 6. Domain-Aware Component Additions by Intent
  if (/\b(?:add|insert|create|include|put|show)\b/i.test(lowerInst)) {
    // Add Upcoming / Schedule / Timeline Section
    if (/\b(?:timeline|milestones|roadmap|schedule|events|upcoming|calendar|timetable|plan)\b/i.test(lowerInst)) {
      if (existingDomain === "finance") {
        components.push({
          type: "timeline",
          title: "Upcoming Recurring Bills & Payments",
          events: [
            { title: "AWS Cloud Infrastructure Billing", date: "Jul 01 • $140.00", status: "upcoming", description: "Automated monthly debit for production servers and database." },
            { title: "Office Lease & High-Speed Fiber", date: "Jul 05 • $850.00", status: "upcoming", description: "Scheduled bank transfer for commercial workplace facilities." },
            { title: "Payroll & Benefits Disbursement", date: "Jul 15 • $3,200.00", status: "upcoming", description: "Bi-weekly team payroll and insurance benefits run." },
            { title: "Corporate Liability Insurance", date: "Jul 28 • $420.00", status: "upcoming", description: "Quarterly premium installment." },
          ],
        });
      } else if (existingDomain === "ecommerce") {
        components.push({
          type: "timeline",
          title: "Upcoming Product Drops & Flash Sales",
          events: [
            { title: "Summer Collection Launch", date: "Friday • 10:00 AM", status: "upcoming", description: "VIP early access for loyalty tier members." },
            { title: "Weekend 30% Flash Sale", date: "Jul 12 - Jul 14", status: "upcoming", description: "Site-wide promotional discount on select accessories." },
            { title: "Exclusive Brand Collaboration", date: "End of Month", status: "upcoming", description: "Limited batch release with 500 numbered units." },
          ],
        });
      } else if (existingDomain === "project") {
        components.push({
          type: "timeline",
          title: "Upcoming Sprint Milestones & Releases",
          events: [
            { title: "Sprint 24 Architecture Review", date: "Wed • 02:00 PM", status: "upcoming", description: "Core API performance benchmarking and schema review." },
            { title: "Staging Smoke & Integration Tests", date: "Jul 18", status: "upcoming", description: "Automated Cypress end-to-end regression validation." },
            { title: "v2.4 Production Rollout", date: "Jul 25", status: "upcoming", description: "Zero-downtime container cluster deployment." },
          ],
        });
      } else if (existingDomain === "healthcare") {
        components.push({
          type: "timeline",
          title: "Upcoming Clinical Appointments & Procedures",
          events: [
            { title: "Cardiology Diagnostic Review", date: "Tomorrow • 10:30 AM", status: "upcoming", description: "Dr. Sarah Mitchell • Room 402 Examination." },
            { title: "Post-Op Physical Therapy & Vitals", date: "Jul 16 • 02:00 PM", status: "upcoming", description: "Outpatient rehabilitation clinic consultation." },
            { title: "Annual Comprehensive Health Screening", date: "Jul 29", status: "upcoming", description: "Full blood panel and metabolic markers." },
          ],
        });
      } else if (existingDomain === "fitness") {
        components.push({
          type: "timeline",
          title: "Upcoming Training Sessions & Classes",
          events: [
            { title: "HIIT Endurance & Cardio Circuit", date: "Tomorrow • 07:00 AM", status: "upcoming", description: "High intensity interval training with Coach Dave." },
            { title: "Heavy Squat & Powerlifting Block", date: "Thursday • 06:00 PM", status: "upcoming", description: "Lower body strength block targeting 85% 1RM." },
            { title: "Mobility & Yoga Core Recovery", date: "Saturday • 09:00 AM", status: "upcoming", description: "Active recovery and joint decompression." },
          ],
        });
      } else if (existingDomain === "restaurant") {
        components.push({
          type: "timeline",
          title: "Upcoming Dining Reservations & Events",
          events: [
            { title: "Private Wine Tasting Dinner", date: "Friday • 07:30 PM", status: "upcoming", description: "Sommelier selected 5-course artisanal pairing." },
            { title: "Weekend Chef's Tasting Service", date: "Saturday • 08:00 PM", status: "upcoming", description: "Seasonal 7-course tasting menu at Chef's Counter." },
            { title: "Sunday Jazz Brunch Experience", date: "Sunday • 11:00 AM", status: "upcoming", description: "Live jazz trio with handcrafted cocktail service." },
          ],
        });
      } else if (existingDomain === "portfolio") {
        components.push({
          type: "timeline",
          title: "Upcoming Releases & Tech Talks",
          events: [
            { title: "Keynote at Global Web Summit", date: "Sep 15", status: "upcoming", description: "Presenting on High-Performance Distributed UI Architectures." },
            { title: "Open Source v3.0 Major Release", date: "Oct 01", status: "upcoming", description: "Complete rewrite with WebAssembly acceleration." },
            { title: "Architecture Deep-Dive Podcast", date: "Oct 18", status: "upcoming", description: "Guest interview on Frontend Engineering at Scale." },
          ],
        });
      } else {
        // Default student / educational only if specifically in student context
        components.push({
          type: "timeline",
          title: "Upcoming Academic & Exam Schedule",
          events: [
            { title: "Mathematics Mid-Term Exam", date: "Oct 18 • 09:30 AM", status: "upcoming", description: "Comprehensive Calculus & Linear Algebra in Hall 201." },
            { title: "Physics Lab Practical Evaluation", date: "Oct 24 • 02:00 PM", status: "upcoming", description: "Hands-on laboratory experiments and project submission." },
            { title: "Computer Science Theory Exam", date: "Nov 02 • 10:00 AM", status: "upcoming", description: "Data Structures, Algorithms, and System Architecture evaluation." },
          ],
        });
      }
      schema.components = components;
      return schema;
    }

    // Add Form
    if (/\b(?:form|contact form|registration form|booking form|inquiry form|checkout form|record form)\b/i.test(lowerInst)) {
      let formTitle = extractedName !== "New Item" ? `${extractedName} Form` : `Record & Data Entry Form`;
      let fields = [
        { name: "title", label: "Title / Description", fieldType: "text", placeholder: "Enter description..." },
        { name: "category", label: "Category / Type", fieldType: "select", options: ["Primary", "Secondary", "Priority", "General"] },
        { name: "amount", label: "Value / Metric ($)", fieldType: "number", placeholder: "0.00" },
        { name: "date", label: "Date", fieldType: "date" },
      ];

      if (existingDomain === "finance") {
        formTitle = "Record New Expense / Transaction";
        fields = [
          { name: "expenseDescription", label: "Expense Description", fieldType: "text", placeholder: "e.g. Software subscription, Office supplies" },
          { name: "amount", label: "Amount ($)", fieldType: "number", placeholder: "0.00" },
          { name: "category", label: "Category", fieldType: "select", options: ["Food & Dining", "Transport", "Cloud & Tools", "Utilities", "Shopping"] },
          { name: "date", label: "Transaction Date", fieldType: "date" },
        ];
      } else if (existingDomain === "ecommerce") {
        formTitle = "Add New Catalog Product";
        fields = [
          { name: "productName", label: "Product Title", fieldType: "text", placeholder: "e.g. Minimalist Linen Shirt" },
          { name: "price", label: "Price ($)", fieldType: "number", placeholder: "49.99" },
          { name: "category", label: "Category", fieldType: "select", options: ["Apparel", "Footwear", "Accessories", "Home"] },
          { name: "stock", label: "Initial Inventory Count", fieldType: "number", placeholder: "100" },
        ];
      }

      components.push({
        type: "form",
        title: formTitle,
        fields,
      });
      schema.components = components;
      return schema;
    }

    // Add Table
    if (/\b(?:table|pricing table|data table|schedule table|user table|inventory table|ledger|roster)\b/i.test(lowerInst)) {
      let tableTitle = extractedName !== "New Item" ? `${extractedName} Directory` : `${schemaTitle} Data Ledger`;
      let columns = ["Record ID", "Name / Description", "Category", "Amount / Value", "Status"];
      let rows = [
        ["REC-101", "Primary Operations", "Standard", "$120.00", "Active"],
        ["REC-102", "Express Processing", "Priority", "$240.00", "In Progress"],
        ["REC-103", "Enterprise Tier", "High Value", "$480.00", "Completed"],
      ];

      if (existingDomain === "finance") {
        tableTitle = "Recent Financial Transactions";
        columns = ["DATE", "DESCRIPTION", "CATEGORY", "AMOUNT", "PAYMENT MODE"];
        rows = [
          ["Jun 15", "Whole Foods Market", "Food & Dining", "$85.50", "Card"],
          ["Jun 14", "Metro Transit Pass", "Transport", "$45.00", "Apple Pay"],
          ["Jun 13", "AWS Infrastructure", "Cloud & Tools", "$120.00", "Card"],
          ["Jun 12", "Bistro Dinner", "Food & Dining", "$62.30", "Card"],
          ["Jun 11", "Bookstore Purchase", "Shopping", "$39.99", "Debit"],
        ];
      }

      components.push({
        type: "table",
        title: tableTitle,
        columns,
        rows,
      });
      schema.components = components;
      return schema;
    }

    // Add Chart
    if (/\b(?:chart|graph|analytics|bar chart|line chart|pie chart)\b/i.test(lowerInst)) {
      const chartTypeMatch = lowerInst.match(/\b(bar|line|pie|doughnut)\b/i);
      const chartType = (chartTypeMatch?.[1]?.toLowerCase() || "pie") as ChartType;
      let chartTitle = extractedName !== "New Item" ? `${extractedName} Overview` : `${schemaTitle} Analytics`;
      let labels = ["Food & Dining", "Transport", "Utilities", "Cloud & Tools", "Shopping", "Health"];
      let data = [850, 420, 310, 680, 520, 240];

      if (existingDomain === "finance") {
        chartTitle = "Expenses by Category";
      }

      components.push({
        type: "chart",
        title: chartTitle,
        chartType,
        labels,
        datasets: [{ label: "Spending / Distribution", data, backgroundColor: "#6366f1" }],
      });
      schema.components = components;
      return schema;
    }

    // Add Metric
    if (/\b(?:metric|kpi|stat|revenue|budget|savings|score|counter)\b/i.test(lowerInst)) {
      const valMatch = instruction.match(/(\$[\d,]+|\d+[%kKmM]?|\b[A-Za-z0-9.]+\b)/g);
      const value = valMatch && valMatch.length > 1 ? valMatch[valMatch.length - 1] : "$3,450";
      const metricTitle = extractedName !== "New Item" ? extractedName : "Monthly Savings Target";
      components.splice(1, 0, {
        type: "metric",
        title: metricTitle,
        value,
        icon: "💰",
        change: "+15%",
        trend: "up",
      });
      schema.components = components;
      return schema;
    }

    // Add Progress Bar
    if (/\b(?:progress|progress bar|completion|tracker)\b/i.test(lowerInst)) {
      const valMatch = instruction.match(/(\d+)%/);
      const value = valMatch ? parseInt(valMatch[1], 10) : 85;
      components.push({
        type: "progress",
        title: `${extractedName !== "New Item" ? extractedName : schemaTitle} Completion Progress`,
        value,
        label: `${value}% Completed • System Nominally Verified`,
      });
      schema.components = components;
      return schema;
    }

    // Add Timeline / Roadmap / Schedule
    if (/\b(?:timeline|milestones|roadmap|schedule|events)\b/i.test(lowerInst)) {
      components.push({
        type: "timeline",
        title: `${extractedName !== "New Item" ? extractedName : schemaTitle} Milestones`,
        events: [
          { title: "Sprint Kickoff & Requirements", date: "Phase 1", status: "completed", description: "Architecture specification approved" },
          { title: "Active Implementation & Dogfooding", date: "Phase 2", status: "current", description: "Executing component deployment" },
          { title: "Final Quality Review & Launch", date: "Phase 3", status: "upcoming", description: "Production rollout" },
        ],
      });
      schema.components = components;
      return schema;
    }

    // Add Button
    if (/\b(?:button|cta|action)\b/i.test(lowerInst)) {
      const label = extractedName !== "New Item" ? extractedName : "Submit Action";
      components.push({
        type: "button",
        label,
        variant: "primary",
        action: "custom-action",
      });
      schema.components = components;
      return schema;
    }

    // Explicit Row Insertion (ONLY when user explicitly requests adding a row/record to a table)
    if (/\b(?:add|insert)\s+(?:a\s+)?(?:new\s+)?(?:row|record|entry|item|subject)\s+(?:to|in|into)\s+table\b/i.test(lowerInst)) {
      const table = components.find((c) => c.type === "table" && Array.isArray(c.rows));
      if (table && Array.isArray(table.rows)) {
        const cols = Array.isArray(table.columns) ? table.columns.length : 4;
        const newRow = [extractedName, "Standard", "Optimal", "Today"];
        while (newRow.length < cols) newRow.push("Active");
        table.rows.push(newRow.slice(0, cols));
        schema.components = components;
        return schema;
      }
    }

    // Default: Add a structured feature card component section
    components.push({
      type: "card",
      title: extractedName !== "New Item" ? extractedName : "New Section",
      content: `Added based on your directive: "${instruction}". Tailored seamlessly into the existing layout.`,
      icon: "✨",
    });
    schema.components = components;
    return schema;
  }

  schema.components = components;
  return schema;
}

/* ==========================================================================
   Storage & Environment Helpers
   ========================================================================== */

export function readStorage(key: string, fallback: string = ""): string {
  try {
    if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
      const val = window.localStorage.getItem(key);
      if (val !== null && val !== undefined) return val;
    }
  } catch {
    // Gracefully handle SSR, private browsing restrictions, or quota errors
  }
  return fallback;
}

export function resolveProvider(selectedModel?: string): ProviderConfig | null {
  const geminiKey = process.env.GEMINI_API_KEY || readStorage("genui_api_key", "");
  const openaiKey = process.env.OPENAI_API_KEY || readStorage("genui_api_key", "");
  const groqKey = process.env.GROQ_API_KEY || "";
  const openrouterKey = process.env.OPENROUTER_API_KEY || "";

  const configs: Record<string, ProviderConfig> = {
    "gemini-2.0-flash": {
      endpoint: "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
      apiKey: geminiKey,
      model: "gemini-2.0-flash",
    },
    "gemini-1.5-flash": {
      endpoint: "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
      apiKey: geminiKey,
      model: "gemini-1.5-flash",
    },
    "gemini-1.5-pro": {
      endpoint: "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
      apiKey: geminiKey,
      model: "gemini-1.5-pro",
    },
    "gpt-4o": {
      endpoint: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1/chat/completions",
      apiKey: openaiKey,
      model: "gpt-4o",
    },
    "gpt-4o-mini": {
      endpoint: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1/chat/completions",
      apiKey: openaiKey,
      model: "gpt-4o-mini",
    },
    "o3-mini": {
      endpoint: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1/chat/completions",
      apiKey: openaiKey,
      model: "o3-mini",
    },
    "claude-3.5-sonnet": {
      endpoint: "https://openrouter.ai/api/v1/chat/completions",
      apiKey: openrouterKey,
      model: "anthropic/claude-3.5-sonnet",
    },
    "deepseek-r1": {
      endpoint: "https://openrouter.ai/api/v1/chat/completions",
      apiKey: openrouterKey,
      model: "deepseek/deepseek-r1",
    },
    "groq-llama-3.3": {
      endpoint: "https://api.groq.com/openai/v1/chat/completions",
      apiKey: groqKey,
      model: "llama-3.3-70b-versatile",
    },
  };

  if (selectedModel) {
    if (selectedModel === "ollama") return null;
    const target = configs[selectedModel];
    if (target && target.apiKey) return target;
  }

  // Automatic provider cascade
  const candidates = [
    configs["gemini-2.0-flash"],
    configs["gemini-1.5-flash"],
    configs["gpt-4o-mini"],
    configs["groq-llama-3.3"],
    configs["claude-3.5-sonnet"],
  ];

  return candidates.find((c) => Boolean(c?.apiKey)) || null;
}

/* ==========================================================================
   External LLM Communication & Extraction
   ========================================================================== */

export function extractTextFromResponse(data: unknown): string {
  if (!data || typeof data !== "object") return "";
  const obj = data as Record<string, unknown>;

  let text = "";

  // 1. OpenAI / Groq / OpenRouter / DeepSeek standard choices
  if (Array.isArray(obj.choices) && obj.choices.length > 0) {
    const choice = obj.choices[0] as Record<string, unknown>;
    if (choice?.message && typeof choice.message === "object") {
      const msg = choice.message as Record<string, unknown>;
      if (typeof msg.content === "string") text = msg.content;
      // Handle providers returning delta or alternative text fields
      else if (typeof msg.text === "string") text = msg.text;
    } else if (typeof choice?.text === "string") {
      text = choice.text;
    }
  }

  // 2. Gemini candidates structure: candidates[0].content.parts[0].text
  if (!text && Array.isArray(obj.candidates) && obj.candidates.length > 0) {
    const cand = obj.candidates[0] as Record<string, unknown>;
    if (cand?.content && typeof cand.content === "object") {
      const contentObj = cand.content as Record<string, unknown>;
      if (Array.isArray(contentObj.parts) && contentObj.parts.length > 0) {
        const partsText = contentObj.parts
          .map((p) => (typeof (p as any)?.text === "string" ? (p as any).text : ""))
          .join("\n");
        if (partsText.trim()) text = partsText;
      }
    }
  }

  // 3. Anthropic native messages structure: content[0].text
  if (!text && Array.isArray(obj.content) && obj.content.length > 0) {
    const firstContent = obj.content[0] as Record<string, unknown>;
    if (typeof firstContent?.text === "string") text = firstContent.text;
  }

  // 4. Direct plain text fields
  if (!text) {
    if (typeof obj.output_text === "string") text = obj.output_text;
    else if (typeof obj.text === "string") text = obj.text;
    else if (typeof obj.response === "string") text = obj.response;
  }

  // 5. DeepSeek R1 & Reasoning Models: strip <think>...</think> tags
  if (text && /<think>/i.test(text)) {
    text = text.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
  }

  return text.trim();
}

export function parseAIResponse(content: unknown): JsonRecord {
  if (typeof content === "object" && content !== null && !Array.isArray(content)) {
    return content as JsonRecord;
  }

  if (typeof content !== "string") {
    throw new Error("AI response was not a string or object");
  }

  let trimmed = content.trim();

  // Strip <think> tags if any remain
  if (/<think>/i.test(trimmed)) {
    trimmed = trimmed.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
  }

  // Strip Markdown JSON code blocks (```json ... ``` or ``` ...)
  const codeBlockMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  const cleanJson = codeBlockMatch ? codeBlockMatch[1].trim() : trimmed;

  try {
    const parsed = JSON.parse(cleanJson);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as JsonRecord;
    }
  } catch {
    // Attempt balanced JSON extraction if surrounded by commentary
  }

  const startIdx = cleanJson.indexOf("{");
  const endIdx = cleanJson.lastIndexOf("}");
  if (startIdx >= 0 && endIdx > startIdx) {
    try {
      const substring = cleanJson.slice(startIdx, endIdx + 1);
      const parsed = JSON.parse(substring);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        return parsed as JsonRecord;
      }
    } catch {
      // Balanced scan failed
    }
  }

  throw new Error("Could not parse a valid JSON schema from model response");
}

async function callOpenAICompatible(
  config: ProviderConfig,
  messages: ChatMessage[]
): Promise<JsonRecord | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const isReasoner =
      config.model === "o3-mini" ||
      config.model.includes("o1") ||
      config.model.includes("r1") ||
      config.model.includes("reasoner");

    // Construct request body tailored to model specifications
    const requestBody: Record<string, unknown> = {
      model: config.model,
      messages,
    };

    if (isReasoner && config.model === "o3-mini") {
      // OpenAI o3-mini uses max_completion_tokens and forbids temperature parameter
      requestBody.max_completion_tokens = 4000;
      requestBody.reasoning_effort = "medium";
      requestBody.response_format = { type: "json_object" };
    } else if (isReasoner && config.model.includes("r1")) {
      // DeepSeek R1 parameters
      requestBody.max_tokens = 4000;
    } else {
      // Standard models (Gemini, GPT-4o, Claude, Groq Llama 3.3)
      requestBody.temperature = 0.15;
      requestBody.max_tokens = 4000;
      requestBody.response_format = { type: "json_object" };
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.apiKey}`,
    };

    // OpenRouter requires app referral headers
    if (config.endpoint.includes("openrouter.ai")) {
      headers["HTTP-Referer"] = "https://flowforge.ai";
      headers["X-Title"] = "FlowForge AI";
    }

    const response = await fetch(config.endpoint, {
      method: "POST",
      headers,
      signal: controller.signal,
      body: JSON.stringify(requestBody),
    });

    clearTimeout(timeout);

    if (!response.ok) {
      console.warn(`Provider ${config.model} returned HTTP ${response.status}`);
      return null;
    }

    const rawText = await response.text();
    let data: unknown = null;
    try {
      data = JSON.parse(rawText);
    } catch {
      console.warn(`Provider ${config.model} returned non-JSON text response:`, rawText.slice(0, 100));
      return null;
    }

    const text = extractTextFromResponse(data);
    if (!text) return null;

    try {
      return parseAIResponse(text);
    } catch (parseErr) {
      console.warn(`Failed to parse AI schema from ${config.model}:`, parseErr);
      return null;
    }
  } catch (err) {
    console.warn(`External AI call to ${config.model} failed:`, err);
    return null;
  }
}

async function callOllama(messages: ChatMessage[]): Promise<JsonRecord | null> {
  const ollamaUrl = process.env.OLLAMA_BASE_URL || "http://localhost:11434";
  try {
    const response = await fetch(`${ollamaUrl}/v1/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: process.env.OLLAMA_MODEL || "llama3",
        messages,
        temperature: 0.2,
      }),
    });

    if (!response.ok) return null;
    const rawText = await response.text();
    let data: unknown = null;
    try {
      data = JSON.parse(rawText);
    } catch {
      return null;
    }
    const text = extractTextFromResponse(data);
    return text ? parseAIResponse(text) : null;
  } catch {
    return null;
  }
}

/* ==========================================================================
   Authoritative Public APIs
   ========================================================================== */

export async function generateUISchema(
  prompt: string,
  selectedModel?: string
): Promise<Record<string, unknown>> {
  const intent = classifyUIIntent(prompt);

  try {
    const messages: ChatMessage[] = [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: `USER REQUIREMENT: ${prompt.trim()}` },
    ];

    const provider = resolveProvider(selectedModel);
    if (provider) {
      const generated = await callOpenAICompatible(provider, messages);
      if (generated && Array.isArray(generated.components) && generated.components.length > 0) {
        return generated;
      }
    }

    if (!selectedModel || selectedModel === "ollama") {
      const local = await callOllama(messages);
      if (local && Array.isArray(local.components) && local.components.length > 0) {
        return local;
      }
    }
  } catch (err) {
    console.warn("External provider error in generateUISchema, using domain fallback:", err);
  }

  // Graceful domain-aware fallback generator with model-specific synthesis
  return buildUniversalFallback(prompt, intent, selectedModel);
}

export async function modifyUISchema(
  existingSchema: Record<string, unknown>,
  instruction: string,
  selectedModel?: string
): Promise<Record<string, unknown>> {
  try {
    const messages: ChatMessage[] = [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `EXISTING SCHEMA:\n${JSON.stringify(existingSchema, null, 2)}\n\nUSER MODIFICATION INSTRUCTION: ${instruction.trim()}\n\nReturn the complete updated JSON schema.`,
      },
    ];

    const provider = resolveProvider(selectedModel);
    if (provider) {
      const modified = await callOpenAICompatible(provider, messages);
      if (modified && Array.isArray(modified.components) && modified.components.length > 0) {
        return modified;
      }
    }

    if (!selectedModel || selectedModel === "ollama") {
      const local = await callOllama(messages);
      if (local && Array.isArray(local.components) && local.components.length > 0) {
        return local;
      }
    }
  } catch (err) {
    console.warn("External provider error in modifyUISchema, using fallback modifier:", err);
  }

  // Context-aware fallback modification
  return modifyFallbackSchema(existingSchema, instruction);
}

export const AIEngine = {
  SYSTEM_PROMPT,
  generateUISchema,
  modifyUISchema,
  classifyUIIntent,
  normalizePrompt,
  extractDisplayTopic,
  extractEntityName,
  pluralizeLabel,
  buildUniversalFallback,
  modifyFallbackSchema,
  resolveProvider,
  parseAIResponse,
  readStorage,
};
