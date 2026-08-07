export interface Template {
  id: string;
  name: string;
  description: string;
  prompt: string;
  icon: string;
}

export const templates: Template[] = [
  {
    id: "student",
    name: "Student Dashboard",
    description: "CGPA, attendance, subject marks, performance charts, upcoming exams",
    prompt: "Create a student performance dashboard with marks, attendance, subject-wise performance chart, and upcoming exams",
    icon: "🎓",
  },
  {
    id: "startup",
    name: "Startup Finance",
    description: "Revenue, expenses, profit, burn rate, monthly charts",
    prompt: "Create a startup finance dashboard with revenue, expenses, profit, burn rate, monthly revenue chart, and expense breakdown",
    icon: "🚀",
  },
  {
    id: "ecommerce",
    name: "E-Commerce Analytics",
    description: "Sales, orders, revenue, top products, customer stats",
    prompt: "Create an e-commerce analytics dashboard with total sales, orders, average order value, top products table, and sales distribution chart",
    icon: "🛒",
  },
  {
    id: "project",
    name: "Project Management",
    description: "Tasks, progress, timeline, team assignments",
    prompt: "Create a project management dashboard with total tasks, completed tasks, progress bar, task table, and project milestones timeline",
    icon: "📋",
  },
  {
    id: "expense",
    name: "Expense Tracker",
    description: "Budget tracking, categories, transactions, spending trends",
    prompt: "Create an expense tracker with total expenses, budget remaining, expense categories pie chart, recent transactions table, and add expense form",
    icon: "💰",
  },
];

export const examplePrompts = [
  "Create a student performance dashboard with marks and attendance",
  "Create an expense tracker with categories and budget",
  "Create an e-commerce analytics dashboard",
  "Create a project management dashboard with tasks and timeline",
  "Create a startup burn-rate and revenue dashboard",
];
