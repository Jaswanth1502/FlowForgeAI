"use client";
import Link from "next/link";
import FlowForgeLogo from "@/components/FlowForgeLogo";

export default function NotFound() {
  return (
    <div className="landing-page" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <FlowForgeLogo size={48} />
      </div>
      <h1 style={{ fontSize: "48px", fontWeight: 800, color: "var(--on-surface)", marginBottom: "12px" }}>404</h1>
      <h2 style={{ fontSize: "24px", fontWeight: 600, color: "var(--on-surface-variant)", marginBottom: "16px" }}>Page Not Found</h2>
      <p style={{ color: "var(--on-surface-variant)", maxWidth: "460px", marginBottom: "28px" }}>
        The requested URL could not be found. Return home or open the workspace to continue building interfaces.
      </p>
      <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
        <Link href="/" className="btn-primary">
          Return to Home
        </Link>
        <Link href="/workspace" className="btn-secondary">
          Open Workspace
        </Link>
      </div>
    </div>
  );
}
