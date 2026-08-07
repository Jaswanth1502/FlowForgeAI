"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import FlowForgeLogo from "@/components/FlowForgeLogo";

interface User {
  id: string;
  email: string;
  name: string;
}

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => { if (d.user) setUser(d.user); })
      .catch(() => {});
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    showToast("Logged out successfully");
  };

  return (
    <div className="page-container">
      <div className="page-nav">
        <Link href="/workspace">← Back to Workspace</Link>
        <Link href="/" className="nav-logo" style={{ fontSize: 16 }}>
          <FlowForgeLogo size={22} />
          <span className="logo-text">FlowForge<span className="logo-ai">AI</span></span>
        </Link>
      </div>

      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <h1 className="page-title" style={{ marginBottom: 8 }}>Settings</h1>
        <p style={{ color: "#64748b", fontSize: 15 }}>Manage your account, preferences, AI engine, and configurations.</p>
      </div>

      <div className="settings-grid">
        <div className="settings-card">
          <h3>
            <span>👤</span> Profile & Account
          </h3>
          {user ? (
            <>
              <div className="setting-row">
                <label>Name</label>
                <span>{user.name}</span>
              </div>
              <div className="setting-row">
                <label>Email</label>
                <span>{user.email}</span>
              </div>
              <div className="setting-row">
                <label>User ID</label>
                <span style={{ fontSize: 11, fontFamily: "monospace", color: "#64748b" }}>{user.id}</span>
              </div>
              <div style={{ marginTop: 20 }}>
                <button
                  onClick={logout}
                  className="btn-save"
                  style={{
                    width: "100%",
                    background: "#dc2626",
                    color: "white",
                    padding: "10px",
                    borderRadius: "8px",
                    fontWeight: 600
                  }}
                >
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <div style={{ padding: "12px 0" }}>
              <p style={{ color: "#475569", fontSize: 14, marginBottom: 16, lineHeight: 1.5 }}>
                Sign in to access account settings, save generated interfaces, and manage your profile.
              </p>
              <Link
                href="/workspace"
                className="btn-save"
                style={{
                  textDecoration: "none",
                  display: "block",
                  textAlign: "center",
                  background: "#4f46e5",
                  color: "white",
                  padding: "10px",
                  borderRadius: "8px",
                  fontWeight: 600
                }}
              >
                Go to Workspace to Sign In
              </Link>
            </div>
          )}
        </div>

        <div className="settings-card">
          <h3>
            <span>🧠</span> AI Engine & Free LLM Support
          </h3>
          <div className="setting-row">
            <label>Free LLM Engine</label>
            <span style={{ color: "#16a34a", fontWeight: 700 }}>● Active & Fully Functional</span>
          </div>
          <div className="setting-row">
            <label>Supported Models</label>
            <span>Gemini, Groq, OpenRouter, Ollama</span>
          </div>
          <div className="setting-row">
            <label>Status</label>
            <span style={{ color: "#16a34a", fontWeight: 600 }}>● Ready (No paid key required)</span>
          </div>
          <p style={{ fontSize: 12, color: "#64748b", marginTop: 12, lineHeight: 1.5 }}>
            FlowForge AI uses a dynamic free LLM engine that works 100% out of the box. You can also optionally configure <code>GEMINI_API_KEY</code>, <code>GROQ_API_KEY</code>, or <code>OLLAMA_BASE_URL</code>.
          </p>
        </div>

        <div className="settings-card">
          <h3>
            <span>⚙️</span> System Architecture
          </h3>
          <div className="setting-row">
            <label>Version</label>
            <span>1.0.0</span>
          </div>
          <div className="setting-row">
            <label>Architecture</label>
            <span>Generative UI (Schema Dynamic Engine)</span>
          </div>
          <p style={{ fontSize: 13, color: "#475569", marginTop: 12, lineHeight: 1.6 }}>
            FlowForge AI converts natural-language requirements into functional,
            customizable interfaces using a controlled JSON schema approach.
          </p>
        </div>

        <div className="settings-card">
          <h3>
            <span>🧱</span> Supported UI Components
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, paddingTop: 6 }}>
            {["Metric Card", "Content Card", "Chart (Bar/Line/Pie)", "Data Table", "Form", "Buttons", "Progress Bar", "Timeline"].map((c) => (
              <span
                key={c}
                style={{
                  padding: "6px 14px",
                  borderRadius: "20px",
                  background: "#f1f5f9",
                  border: "1px solid #e2e8f0",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#334155"
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {toast && <div className="toast-notification">{toast}</div>}
    </div>
  );
}
