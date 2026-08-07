/**
 * FlowForge AI Client-Side Synthesis Engine
 * Provides fallback UI schema generation directly in the browser
 * for static deployments like GitHub Pages.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

export function generateClientSchema(prompt: string): any {
  const p = prompt.toLowerCase();

  // 1. Student / Education
  if (p.includes("student") || p.includes("school") || p.includes("mark") || p.includes("exam") || p.includes("attendance")) {
    return {
      title: "Student Performance Dashboard",
      description: "Comprehensive tracking for academic performance, subject marks, attendance, and upcoming exams.",
      components: [
        {
          type: "hero",
          title: "Student Academic Dashboard",
          subtitle: "Welcome back, Alex! Here is your latest performance overview.",
          badge: "Academic Year 2025-2026",
          ctaText: "View Full Gradebook",
        },
        {
          type: "metrics",
          title: "Academic Highlights",
          items: [
            { label: "Overall GPA", value: "3.85 / 4.0", change: "+0.15 vs last term", trend: "up" },
            { label: "Attendance Rate", value: "96.4%", change: "+2.1% this month", trend: "up" },
            { label: "Completed Credits", value: "84 / 120", change: "70% progress", trend: "neutral" },
            { label: "Class Rank", value: "#4 of 142", change: "Top 3% percentile", trend: "up" },
          ],
        },
        {
          type: "chart",
          chartType: "bar",
          title: "Subject Marks Breakdown",
          description: "Individual subject scores out of 100",
          data: [
            { label: "Mathematics", value: 92 },
            { label: "Physics", value: 88 },
            { label: "Computer Science", value: 98 },
            { label: "Chemistry", value: 85 },
            { label: "English Lit", value: 90 },
          ],
        },
        {
          type: "table",
          title: "Upcoming Exam Schedule",
          columns: ["Subject", "Exam Date", "Duration", "Room", "Status"],
          rows: [
            ["Advanced Algorithms", "Oct 15, 2025", "2 Hours", "Lab 304", "Scheduled"],
            ["Quantum Physics", "Oct 18, 2025", "3 Hours", "Hall A", "Preparation"],
            ["Organic Chemistry", "Oct 22, 2025", "2.5 Hours", "Hall C", "Scheduled"],
            ["Data Structures", "Oct 25, 2025", "2 Hours", "Lab 102", "Scheduled"],
          ],
        },
        {
          type: "progress",
          title: "Coursework Completion Status",
          items: [
            { label: "Computer Science Lab 4", percentage: 95 },
            { label: "Physics Research Project", percentage: 80 },
            { label: "Calculus Problem Set 6", percentage: 60 },
          ],
        },
      ],
    };
  }

  // 2. Finance / Expense / Revenue
  if (p.includes("finance") || p.includes("expense") || p.includes("budget") || p.includes("revenue") || p.includes("money") || p.includes("burn")) {
    return {
      title: "Financial Analytics & Burn-Rate Tracker",
      description: "Track monthly expenses, revenue streams, net cash flow, and runway metrics.",
      components: [
        {
          type: "hero",
          title: "Financial Control Center",
          subtitle: "Real-time visibility into revenue, operating expenses, and monthly runway.",
          badge: "Q3 Financial Summary",
          ctaText: "Export Accounting Report",
        },
        {
          type: "metrics",
          title: "Financial KPIs",
          items: [
            { label: "Monthly Recurring Revenue", value: "$48,500", change: "+14.2% MoM", trend: "up" },
            { label: "Gross Burn Rate", value: "$18,200", change: "-4.5% expenses", trend: "down" },
            { label: "Net Cash Flow", value: "+$30,300", change: "Positive margin", trend: "up" },
            { label: "Runway Remaining", value: "32 Months", change: "+4 months added", trend: "up" },
          ],
        },
        {
          type: "chart",
          chartType: "line",
          title: "Revenue vs Expense Trend",
          description: "6-month monthly revenue growth alongside operating cost trajectory",
          data: [
            { label: "May", value: 32000 },
            { label: "Jun", value: 36000 },
            { label: "Jul", value: 41000 },
            { label: "Aug", value: 44500 },
            { label: "Sep", value: 48500 },
          ],
        },
        {
          type: "table",
          title: "Recent Transaction Ledger",
          columns: ["Description", "Category", "Date", "Amount", "Status"],
          rows: [
            ["AWS Cloud Infrastructure", "Hosting & Cloud", "Oct 01, 2025", "-$2,450.00", "Settled"],
            ["Enterprise Client Retainer", "Revenue", "Oct 03, 2025", "+$15,000.00", "Received"],
            ["SaaS Subscriptions", "Software Tools", "Oct 04, 2025", "-$890.00", "Settled"],
            ["Payroll Disbursement", "Operations", "Oct 05, 2025", "-$12,500.00", "Processed"],
          ],
        },
      ],
    };
  }

  // 3. E-Commerce Analytics
  if (p.includes("e-commerce") || p.includes("ecommerce") || p.includes("store") || p.includes("product") || p.includes("sales") || p.includes("cart")) {
    return {
      title: "E-Commerce Sales Analytics",
      description: "Monitor product performance, customer orders, conversion rates, and inventory status.",
      components: [
        {
          type: "hero",
          title: "Store Performance Dashboard",
          subtitle: "Track order volume, top selling SKUs, and checkout conversion channels.",
          badge: "Live Store Activity",
          ctaText: "Manage Inventory",
        },
        {
          type: "metrics",
          title: "E-Commerce Metrics",
          items: [
            { label: "Total Sales Revenue", value: "$124,800", change: "+18.6% vs last week", trend: "up" },
            { label: "Total Orders", value: "1,420", change: "+210 orders today", trend: "up" },
            { label: "Average Order Value", value: "$87.88", change: "+$4.50 boost", trend: "up" },
            { label: "Cart Conversion Rate", value: "3.64%", change: "+0.4% conversion", trend: "up" },
          ],
        },
        {
          type: "chart",
          chartType: "bar",
          title: "Top Product Category Revenue",
          description: "Revenue distribution across product catalog",
          data: [
            { label: "Electronics", value: 54000 },
            { label: "Apparel", value: 32000 },
            { label: "Home Decor", value: 21000 },
            { label: "Beauty & Personal", value: 17800 },
          ],
        },
        {
          type: "table",
          title: "Recent Orders",
          columns: ["Order ID", "Customer", "Items", "Total Amount", "Status"],
          rows: [
            ["#ORD-9081", "Sarah Jenkins", "Wireless Headphones x1", "$149.00", "Shipped"],
            ["#ORD-9082", "David Chen", "Ergonomic Desk Chair x1", "$299.00", "Processing"],
            ["#ORD-9083", "Emily Watson", "Mechanical Keyboard x1", "$120.00", "Delivered"],
            ["#ORD-9084", "Marcus Vance", "USB-C Hub & Cable Pack", "$65.00", "Shipped"],
          ],
        },
      ],
    };
  }

  // 4. Default / Project Management / General Workspace
  return {
    title: "Project Management Dashboard",
    description: "Overview of active sprint tasks, team productivity, project milestones, and timeline progress.",
    components: [
      {
        type: "hero",
        title: "FlowForge Project Workspace",
        subtitle: `Generated UI workspace tailored to: "${prompt}"`,
        badge: "Sprint #14 Active",
        ctaText: "Create New Task",
      },
      {
        type: "metrics",
        title: "Sprint Performance KPIs",
        items: [
          { label: "Active Tasks", value: "28 Tasks", change: "12 in review", trend: "neutral" },
          { label: "Sprint Completion", value: "78%", change: "+14% velocity", trend: "up" },
          { label: "Open Pull Requests", value: "6 PRs", change: "All reviewed", trend: "up" },
          { label: "Team Velocity", value: "42 Pts", change: "+5 pts peak", trend: "up" },
        ],
      },
      {
        type: "chart",
        chartType: "bar",
        title: "Task Distribution by Status",
        description: "Current breakdown of workflow tasks across board columns",
        data: [
          { label: "Backlog", value: 14 },
          { label: "In Progress", value: 9 },
          { label: "Code Review", value: 5 },
          { label: "Completed", value: 24 },
        ],
      },
      {
        type: "table",
        title: "Project Milestones",
        columns: ["Task Name", "Assignee", "Priority", "Due Date", "Status"],
        rows: [
          ["Glassmorphism UI Redesign", "Jaswanth S.", "High", "Oct 12, 2025", "In Progress"],
          ["Vector PDF Export Engine", "Dev Team", "Critical", "Oct 14, 2025", "Completed"],
          ["AI Copilot Sidebar Refinement", "AI Engine", "High", "Oct 16, 2025", "In Review"],
          ["GitHub Actions Deployment Pipeline", "DevOps", "Medium", "Oct 20, 2025", "Scheduled"],
        ],
      },
    ],
  };
}

export function modifyClientSchema(schema: any, instruction: string): any {
  const inst = instruction.toLowerCase();
  const currentComps = Array.isArray(schema.components) ? [...schema.components] : [];

  if (inst.includes("pie chart") || inst.includes("chart")) {
    currentComps.push({
      type: "chart",
      chartType: "pie",
      title: "Category Distribution",
      description: "Proportional breakdown of generated metrics",
      data: [
        { label: "Category A", value: 45 },
        { label: "Category B", value: 30 },
        { label: "Category C", value: 25 },
      ],
    });
  } else if (inst.includes("warning") || inst.includes("alert") || inst.includes("card")) {
    currentComps.unshift({
      type: "hero",
      title: "⚠️ System Status Alert",
      subtitle: `Notice: ${instruction}`,
      badge: "High Priority",
      ctaText: "Acknowledge",
    });
  } else if (inst.includes("schedule") || inst.includes("timeline")) {
    currentComps.push({
      type: "timeline",
      title: "Upcoming Project Milestones",
      items: [
        { date: "Oct 15", title: "Sprint Planning", description: "Review backlog items & assign points" },
        { date: "Oct 22", title: "Release Candidate 1", description: "Deploy build to staging environment" },
        { date: "Oct 30", title: "Production Launch", description: "Final validation & public release" },
      ],
    });
  } else if (inst.includes("remove")) {
    if (currentComps.length > 1) {
      currentComps.pop();
    }
  } else {
    currentComps.push({
      type: "metrics",
      title: "Updated Metrics",
      items: [
        { label: "Updated Status", value: "Active", change: instruction, trend: "up" },
        { label: "Efficiency Rating", value: "99.4%", change: "Optimized", trend: "up" },
      ],
    });
  }

  return {
    ...schema,
    title: schema.title || "FlowForge Application",
    components: currentComps,
  };
}
