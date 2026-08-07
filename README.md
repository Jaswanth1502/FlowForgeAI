# ✨ FlowForge AI — Autonomous Generative UI & Workflow Synthesis Engine

> **Transform Natural Language Prompts into Full-Scale Interactive Web Applications & Workflow Schemas.**

[![Deploy to GitHub Pages](https://github.com/Jaswanth1502/FlowForgeAI/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/Jaswanth1502/FlowForgeAI/actions/workflows/deploy-pages.yml)
[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-4f46e5?style=flat&logo=github)](https://Jaswanth1502.github.io/FlowForgeAI/)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.2.6-000000?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript)](https://www.typescriptlang.org/)

---

## 🌟 Key Features

### 1. 🎬 Hardware-Accelerated 240-Frame Sequence Background
- Real-time 240-frame motion sequence engine with pre-decoded image caching.
- Optimized GPU rendering (`will-change: opacity, transform`) providing fluid ambient movement across the Landing and Workspace pages.

### 2. 💎 Premium Sheer Glassmorphism Design System
- Modern visual hierarchy built with custom CSS tokens, backdrop filters, and subtle ambient glows.
- Ultra-legible contrast balance tuned specifically for high-visibility dynamic motion backdrops.

### 3. 🖥️ Dedicated Output Canvas (`/preview`)
- Dedicated full-screen output page for reviewing generated application interfaces.
- Clear separation between the prompt builder workspace (`/workspace`) and the rendered UI canvas (`/preview`).

### 4. ✨ Permanent AI Copilot Sidebar
- Fixed right-side conversational panel (`width: 340px`) with continuous chat history.
- Real-time interface modification engine — add charts, alerts, metrics, or alter components on the fly.

### 5. 📑 Vector PDF & Code Bundle Exporters
- High-fidelity print-exact PDF export engine (`downloadDirectPDF`).
- Multi-format code bundle downloads (React TSX & Vanilla HTML/CSS).

### 6. 🌐 Zero-Server Static Export & GitHub Pages CI/CD
- Full static HTML compilation (`output: "export"`) with client-side synthesis fallback (`client-generator.ts`).
- Automated GitHub Actions deployment pipeline (`.github/workflows/deploy-pages.yml`).

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: Vanilla CSS (Custom Design System & Glassmorphism Tokens)
- **Data Visualization**: Recharts / SVG Canvas
- **PDF Engine**: High-Fidelity Print-Exact Vector Exporter
- **Database / Auth**: Drizzle ORM / Firebase Authentication / Local Storage Hydration
- **CI/CD**: GitHub Actions & GitHub Pages

---

## 🚀 Quick Start (Local Development)

### 1. Clone the Repository
```bash
git clone https://github.com/Jaswanth1502/FlowForgeAI.git
cd FlowForgeAI
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Typecheck & Verification
```bash
npm run typecheck
```

### 5. Production Static Build
```bash
npm run build
```

---

## 🌐 Deployment

### GitHub Pages Deployment
1. Navigate to **Repository Settings** -> **Pages**.
2. Under **Build and deployment** -> **Source**, select **GitHub Actions**.
3. Every push to `main` will automatically trigger `.github/workflows/deploy-pages.yml` and publish your live application to:
   👉 **`https://Jaswanth1502.github.io/FlowForgeAI/`**

---

## 📜 License

MIT License © 2026 [Jaswanth1502](https://github.com/Jaswanth1502)
