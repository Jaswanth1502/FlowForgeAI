"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import UIRenderer from "./UIRenderer";
import { downloadDirectPDF } from "@/lib/pdf-generator";
import FlowForgeLogo from "./FlowForgeLogo";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface User {
  id: string;
  email: string;
  name: string;
}

const FREE_MODELS = [
  { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash", providerLabel: "Google Gemini API (gemini-2.0-flash)" },
  { id: "gemini-1.5-flash", name: "Gemini 1.5 Flash", providerLabel: "Google Gemini API (gemini-1.5-flash)" },
  { id: "gpt-4o", name: "GPT-4o", providerLabel: "OpenAI API (gpt-4o)" },
  { id: "gpt-4o-mini", name: "GPT-4o Mini", providerLabel: "OpenAI API (gpt-4o-mini)" },
  { id: "o3-mini", name: "o3-mini Reasoning", providerLabel: "OpenAI API (o3-mini Reasoning)" },
  { id: "claude-3.5-sonnet", name: "Claude 3.5 Sonnet", providerLabel: "Anthropic Claude 3.5 Sonnet" },
  { id: "deepseek-r1", name: "DeepSeek R1", providerLabel: "DeepSeek V3 / R1 (Reasoner)" },
];

export default function PreviewClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const workflowId = searchParams.get("workflow");

  const [user, setUser] = useState<User | null>(null);
  const [schema, setSchema] = useState<any>(null);
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [modifyInput, setModifyInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [modifying, setModifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveTitle, setSaveTitle] = useState("");
  const [selectedModel, setSelectedModel] = useState("gemini-2.0-flash");
  const [profileName, setProfileName] = useState("FlowForge Creator");
  const [profileEmail, setProfileEmail] = useState("creator@flowforge.ai");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [rightSidebarOpen, setRightSidebarOpen] = useState<boolean>(true);

  const resultRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, modifying]);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (d.user) {
          setUser(d.user);
          if (d.user.name) setProfileName(d.user.name);
          if (d.user.email) setProfileEmail(d.user.email);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (workflowId) {
      setLoading(true);
      fetch(`/api/workflows/${workflowId}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.workflow) {
            setSchema(data.workflow.uiSchema);
            setCurrentPrompt(data.workflow.prompt || "");
            setChatMessages([
              { role: "user", content: data.workflow.prompt || "Loaded workflow" },
              { role: "assistant", content: `Loaded "${data.workflow.title}" output.` }
            ]);
          } else {
            setError("Workflow not found.");
          }
        })
        .catch(() => setError("Failed to load workflow."))
        .finally(() => setLoading(false));
    } else {
      // Hydrate from sessionStorage
      try {
        const storedSchemaStr = sessionStorage.getItem("flowforge_current_schema");
        const storedPrompt = sessionStorage.getItem("flowforge_current_prompt") || "";
        const storedMessagesStr = sessionStorage.getItem("flowforge_chat_messages");
        const storedModel = sessionStorage.getItem("flowforge_selected_model");

        if (storedModel) setSelectedModel(storedModel);
        if (storedPrompt) setCurrentPrompt(storedPrompt);

        if (storedSchemaStr) {
          const parsedSchema = JSON.parse(storedSchemaStr);
          setSchema(parsedSchema);
          if (storedMessagesStr) {
            setChatMessages(JSON.parse(storedMessagesStr));
          } else {
            setChatMessages([
              { role: "user", content: storedPrompt || "Generated prompt" },
              { role: "assistant", content: `Generated "${parsedSchema.title || "Interface"}" successfully.` }
            ]);
          }
        } else {
          // If no schema in storage, navigate back to prompt builder
          router.replace("/workspace");
        }
      } catch (err) {
        console.error("Hydration error:", err);
        router.replace("/workspace");
      } finally {
        setLoading(false);
      }
    }
  }, [workflowId, router]);

  const modify = async () => {
    if (!modifyInput.trim()) return;
    const userQuery = modifyInput.trim();

    const updatedMessages = [...chatMessages, { role: "user" as const, content: userQuery }];
    setChatMessages(updatedMessages);
    setModifyInput("");
    setModifying(true);
    setError(null);

    try {
      let updatedSchema: any = null;
      try {
        const res = await fetch("/api/ai/modify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            schema: schema || undefined,
            currentSchema: schema || undefined,
            instruction: userQuery,
            model: selectedModel,
          }),
        });
        const data = await res.json();
        if (res.ok && data.schema) {
          updatedSchema = data.schema;
        }
      } catch {}

      if (!updatedSchema) {
        const { modifyClientSchema } = await import("@/lib/client-generator");
        updatedSchema = modifyClientSchema(schema, userQuery);
      }

      setSchema(updatedSchema);
      sessionStorage.setItem("flowforge_current_schema", JSON.stringify(updatedSchema));

      const newMessages = [
        ...updatedMessages,
        { role: "assistant" as const, content: `Applied: "${userQuery}". Updated ${updatedSchema.title || "Interface"}.` }
      ];
      setChatMessages(newMessages);
      sessionStorage.setItem("flowforge_chat_messages", JSON.stringify(newMessages));

      showToast("Interface updated successfully!");
    } catch (e: any) {
      const errorMsg = e.message || "Failed to update interface. Please try again.";
      setError(errorMsg);
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant" as const, content: `⚠️ ${errorMsg}` }
      ]);
    } finally {
      setModifying(false);
    }
  };

  const exportPDF = async () => {
    if (!schema) return;
    try {
      showToast("Generating PDF document...");
      downloadDirectPDF(schema);
      showToast("PDF exported successfully!");
    } catch (err) {
      console.error("PDF Export error:", err);
      showToast("Failed to generate PDF. Retrying...");
      window.print();
    }
  };

  const saveWorkflow = async () => {
    if (!saveTitle.trim() || !schema) return;

    try {
      if (!user) {
        const authRes = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isDemo: true }),
        });
        const authData = await authRes.json();
        if (authData.user) setUser(authData.user);
      }

      const res = await fetch("/api/workflows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: saveTitle.trim(),
          description: schema.description || "",
          prompt: currentPrompt,
          uiSchema: schema,
        }),
      });
      if (!res.ok) throw new Error("Save failed");
      setShowSaveModal(false);
      setSaveTitle("");
      showToast("Workflow saved successfully!");
    } catch {
      showToast("Failed to save workflow");
    }
  };

  return (
    <div className="workspace-layout">
      {/* Mobile menu toggle */}
      <button className="mobile-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle sidebar">
        <span>{sidebarOpen ? "✕" : "☰"}</span>
      </button>

      {/* Sidebar with smooth side-shift animation */}
      <aside className={`workspace-sidebar ${sidebarOpen ? "open" : ""} ${sidebarCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar-top">
          {/* Bar 1: Logo */}
          <div className="sidebar-logo-bar">
            <Link href="/" className="sidebar-logo" title="FlowForge AI">
              <FlowForgeLogo size={24} />
              <span className="logo-text">FlowForge<span className="logo-ai">AI</span></span>
            </Link>
          </div>

          {/* Bar 2: Collapse & Shift Toggle */}
          <div className="sidebar-toggle-bar">
            <button
              className="sidebar-collapse-toggle"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-label="Toggle sidebar collapse"
            >
              <span className="toggle-icon">{sidebarCollapsed ? "▶" : "◀"}</span>
              <span className="toggle-label">{sidebarCollapsed ? "Expand" : "Collapse"}</span>
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="sidebar-nav">
            <Link
              href="/workspace"
              className="sidebar-item"
              title="New Workflow"
            >
              <span className="sidebar-item-icon">✦</span>
              <span className="sidebar-item-text">New Workflow</span>
            </Link>
            <Link href="/workflows" className="sidebar-item" title="My Workflows">
              <span className="sidebar-item-icon">📁</span>
              <span className="sidebar-item-text">My Workflows</span>
            </Link>
            <Link href="/workspace" className="sidebar-item" title="Templates">
              <span className="sidebar-item-icon">📋</span>
              <span className="sidebar-item-text">Templates</span>
            </Link>
            <Link href="/settings" className="sidebar-item" title="Settings">
              <span className="sidebar-item-icon">⚙️</span>
              <span className="sidebar-item-text">Settings</span>
            </Link>
          </nav>
        </div>

        <div className="sidebar-bottom">
          <Link href="/" className="sidebar-back-home-btn" title="Back to Home">
            <span className="sidebar-item-icon">🏠</span>
            <span className="sidebar-item-text">Back to Home</span>
          </Link>
          <div
            className="sidebar-user-card"
            onClick={() => setShowProfileModal(true)}
            title="Open Profile & Settings"
            role="button"
            tabIndex={0}
          >
            <div className="user-avatar-wrapper">
              <div className="user-avatar">{(user?.name || profileName).charAt(0).toUpperCase()}</div>
              <span className="online-status-dot" title="Active" />
            </div>
            <div className="user-info">
              <span className="user-name">{user?.name || profileName}</span>
              <span className="user-email">{user?.email || profileEmail}</span>
            </div>
            <button
              className="profile-quick-btn"
              onClick={(e) => { e.stopPropagation(); setShowProfileModal(true); }}
              title="Open Profile"
              aria-label="Open Profile"
            >
              ⚙️
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* Main content area displaying the Output */}
      <main className={`workspace-main ${sidebarCollapsed ? "sidebar-collapsed" : ""} has-right-sidebar`}>
        {loading && (
          <div className="loading-state">
            <div className="loading-spinner" />
            <p style={{ color: "var(--on-surface-variant)", fontWeight: 600 }}>Loading output canvas...</p>
          </div>
        )}

        {error && (
          <div className="error-banner">
            <span>⚠️ {error}</span>
            <button onClick={() => router.push("/workspace")}>
              Return to Prompt Builder
            </button>
          </div>
        )}

        {schema && !loading && (
          <div ref={resultRef} className="result-section">
            <div className="result-toolbar">
              <div className="toolbar-left">
                <button
                  className="toolbar-btn"
                  onClick={() => router.push("/workspace")}
                  title="Return to Prompt Builder"
                >
                  ← Back to Prompt Builder
                </button>
              </div>
              <div className="toolbar-right">
                <button
                  className="toolbar-btn export-pdf-btn"
                  onClick={exportPDF}
                  title="Export data directly as PDF (.pdf)"
                  style={{
                    background: "linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)",
                    color: "#ffffff",
                    fontWeight: 700,
                    border: "1px solid rgba(255, 255, 255, 0.18)",
                    boxShadow: "0 2px 10px rgba(79, 70, 229, 0.35)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  <span>📑</span>
                  <span>Export as PDF</span>
                </button>
                <button
                  className="toolbar-btn save-btn"
                  onClick={() => {
                    setSaveTitle(schema.title || "");
                    setShowSaveModal(true);
                  }}
                >
                  💾 Save Workflow
                </button>
              </div>
            </div>

            {/* Dedicated Output Page Canvas */}
            <UIRenderer schema={schema} />
          </div>
        )}
      </main>

      {/* Right AI Assistant Sidebar (Permanently Visible) */}
      {schema && !loading && (
        <aside className="workspace-right-sidebar">
          <div className="right-sidebar-header">
            <div className="right-sidebar-title">
              <span className="copilot-icon">✨</span>
              <span className="copilot-text">AI Copilot</span>
            </div>
            <div className="right-sidebar-controls">
              <span className="right-sidebar-model-badge">
                {FREE_MODELS.find((m) => m.id === selectedModel)?.name || "Gemini 2.0"}
              </span>
            </div>
          </div>

          {/* Chat Messages Log */}
          <div className="right-sidebar-chat-body">
            {chatMessages.length === 0 && (
              <div className="chat-empty-state">
                <span>✨ Ask AI to customize, add, or remove components in real-time.</span>
              </div>
            )}
            {chatMessages.map((msg, i) => (
              <div key={i} className={`chat-message-row ${msg.role}`}>
                <div className="chat-message-bubble">
                  <span className="chat-message-role">{msg.role === "user" ? "You" : "FlowForge AI"}</span>
                  <p className="chat-message-text">{msg.content}</p>
                </div>
              </div>
            ))}
            {modifying && (
              <div className="chat-message-row assistant modifying">
                <div className="chat-message-bubble">
                  <span className="chat-message-role">FlowForge AI</span>
                  <p className="chat-message-text">
                    <span className="modify-spinner inline" /> Updating interface...
                  </p>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Action Suggestion Chips */}
          <div className="right-sidebar-suggestions">
            <span className="suggestions-label">Quick Actions:</span>
            <div className="suggestions-list">
              {["Add a pie chart", "Add warning card", "Add upcoming schedule", "Remove component"].map((s, i) => (
                <button
                  key={i}
                  className="right-sidebar-chip"
                  onClick={() => setModifyInput(s)}
                >
                  + {s}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <div className="right-sidebar-input-box">
            <textarea
              value={modifyInput}
              onChange={(e) => setModifyInput(e.target.value)}
              placeholder="Tell AI how to change this interface…"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  modify();
                }
              }}
              disabled={modifying}
              rows={2}
            />
            <button
              onClick={modify}
              disabled={!modifyInput.trim() || modifying}
              className="right-sidebar-send-btn"
              title="Apply AI modification"
            >
              {modifying ? <span className="modify-spinner" /> : "Apply ✨"}
            </button>
          </div>
        </aside>
      )}

      {/* Toast Notification */}
      {toast && <div className="toast-notification">{toast}</div>}

      {/* Save Modal */}
      {showSaveModal && (
        <div className="modal-overlay" onClick={() => setShowSaveModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Save Workflow</h3>
            <input
              value={saveTitle}
              onChange={(e) => setSaveTitle(e.target.value)}
              placeholder="Workflow name"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") saveWorkflow();
              }}
            />
            <div className="modal-actions">
              <button className="btn-modal-cancel" onClick={() => setShowSaveModal(false)}>
                Cancel
              </button>
              <button className="btn-modal-save" onClick={saveWorkflow} disabled={!saveTitle.trim()}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
