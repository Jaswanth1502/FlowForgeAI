"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import UIRenderer from "./UIRenderer";
import { examplePrompts } from "@/lib/templates";
import { generateReactComponent, generateHTMLWebpage } from "@/lib/export-generators";
import { downloadDirectPDF } from "@/lib/pdf-generator";
import FlowForgeLogo from "./FlowForgeLogo";
import FrameSequenceBackground from "./FrameSequenceBackground";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface User {
  id: string;
  email: string;
  name: string;
}

const LOADING_STEPS = [
  "Understanding your request…",
  "Planning interface layout…",
  "Selecting components…",
  "Building your workflow…",
  "Finalizing interface…",
];

const FREE_MODELS = [
  {
    id: "gemini-2.0-flash",
    name: "Gemini 2.0 Flash",
    providerLabel: "Google Gemini API (gemini-2.0-flash)",
    badge: "Fast & Free",
    badgeType: "rec",
    desc: "Google's ultra-fast 2.0 Flash model. Best for UI generation.",
  },
  {
    id: "gemini-1.5-flash",
    name: "Gemini 1.5 Flash",
    providerLabel: "Google Gemini API (gemini-1.5-flash)",
    badge: "Balanced",
    badgeType: "fast",
    desc: "Google's high-speed 1.5 Flash multimodal model.",
  },
  {
    id: "gemini-1.5-pro",
    name: "Gemini 1.5 Pro",
    providerLabel: "Google Gemini API (gemini-1.5-pro)",
    badge: "Pro",
    badgeType: "builtin",
    desc: "Google's advanced reasoning and large context model.",
  },
  {
    id: "gpt-4o",
    name: "GPT-4o",
    providerLabel: "OpenAI API (gpt-4o)",
    badge: "Flagship",
    badgeType: "rec",
    desc: "OpenAI's flagship high-intelligence multimodal model.",
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4o Mini",
    providerLabel: "OpenAI API (gpt-4o-mini)",
    badge: "Lightweight",
    badgeType: "fast",
    desc: "Fast and affordable model for everyday UI tasks.",
  },
  {
    id: "o3-mini",
    name: "o3-mini Reasoning",
    providerLabel: "OpenAI API (o3-mini Reasoning)",
    badge: "Reasoning",
    badgeType: "community",
    desc: "OpenAI's high-speed STEM and coding reasoning model.",
  },
  {
    id: "claude-3.5-sonnet",
    name: "Claude 3.5 Sonnet",
    providerLabel: "Anthropic Claude 3.5 Sonnet",
    badge: "Smartest",
    badgeType: "offline",
    desc: "Anthropic's top-tier AI model for code and design synthesis.",
  },
  {
    id: "deepseek-r1",
    name: "DeepSeek R1",
    providerLabel: "DeepSeek V3 / R1 (Reasoner)",
    badge: "Deep Think",
    badgeType: "community",
    desc: "DeepSeek's state-of-the-art open reasoning model.",
  },
];

export default function WorkspaceClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const workflowId = searchParams.get("workflow");
  const [user, setUser] = useState<User | null>(null);
  const [prompt, setPrompt] = useState("");
  const [schema, setSchema] = useState<any>(null);
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [modifyInput, setModifyInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [modifying, setModifying] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveTitle, setSaveTitle] = useState("");
  const [showExport, setShowExport] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gemini-2.0-flash");
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileName, setProfileName] = useState("FlowForge Creator");
  const [profileEmail, setProfileEmail] = useState("creator@flowforge.ai");
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [rightSidebarOpen, setRightSidebarOpen] = useState<boolean>(true);
  const resultRef = useRef<HTMLDivElement>(null);
  const promptRef = useRef<HTMLTextAreaElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, modifying]);

  useEffect(() => {
    fetch("/api/auth/me").then(r => r.json()).then(d => {
      if (d.user) {
        setUser(d.user);
        if (d.user.name) setProfileName(d.user.name);
        if (d.user.email) setProfileEmail(d.user.email);
      }
    }).catch(() => {});

    // Subscribe to live Firebase Auth state
    try {
      import("@/lib/firebase").then(({ subscribeToAuth }) => {
        const unsubscribe = subscribeToAuth((fbUser) => {
          if (fbUser) {
            const name = fbUser.displayName || fbUser.email?.split("@")[0] || "FlowForge Creator";
            const email = fbUser.email || "creator@flowforge.ai";
            setUser({ id: fbUser.uid, email, name });
            setProfileName(name);
            setProfileEmail(email);
          }
        });
        return () => unsubscribe();
      });
    } catch {}
  }, []);

  useEffect(() => {
    if (workflowId) {
      fetch(`/api/workflows/${workflowId}`)
        .then(r => r.json())
        .then(data => {
          if (data.workflow) {
            setSchema(data.workflow.uiSchema);
            setCurrentPrompt(data.workflow.prompt);
            setPrompt(data.workflow.prompt);
          }
        })
        .catch(() => {});
    }
  }, [workflowId]);

  useEffect(() => {
    promptRef.current?.focus();
  }, []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const generate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    setLoadingStep(0);

    const stepInterval = setInterval(() => {
      setLoadingStep(s => (s < LOADING_STEPS.length - 1 ? s + 1 : s));
    }, 600);

    try {
      let generatedSchema: any = null;
      try {
        const res = await fetch("/api/ai/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: prompt.trim(), model: selectedModel }),
        });
        const data = await res.json();
        if (res.ok && data.schema) {
          generatedSchema = data.schema;
        }
      } catch {}

      if (!generatedSchema) {
        const { generateClientSchema } = await import("@/lib/client-generator");
        generatedSchema = generateClientSchema(prompt.trim());
      }

      // Save generated output & chat context for the dedicated Preview Page
      sessionStorage.setItem("flowforge_current_schema", JSON.stringify(generatedSchema));
      sessionStorage.setItem("flowforge_current_prompt", prompt.trim());
      sessionStorage.setItem("flowforge_selected_model", selectedModel);
      sessionStorage.setItem(
        "flowforge_chat_messages",
        JSON.stringify([
          { role: "user", content: prompt.trim() },
          {
            role: "assistant",
            content: `Generated "${generatedSchema.title || "Interface"}" with ${generatedSchema.components?.length || 0} UI components.`,
          },
        ])
      );

      // Navigate directly to the dedicated Output Preview page
      router.push("/preview");
    } catch (e: any) {
      setError(e.message || "Failed to generate interface. Please try again.");
    } finally {
      clearInterval(stepInterval);
      setLoading(false);
    }
  };

  const modify = async () => {
    if (!modifyInput.trim()) return;
    const userQuery = modifyInput.trim();
    setChatMessages(prev => [...prev, { role: "user", content: userQuery }]);
    setModifyInput("");
    setModifying(true);
    setError(null);

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
      if (!res.ok) throw new Error(data.error || "Modification failed");
      setSchema(data.schema);
      if (!currentPrompt) setCurrentPrompt(userQuery);
      setChatMessages(prev => [
        ...prev,
        { role: "assistant", content: `Applied: "${userQuery}". Updated ${data.schema.title || "Interface"}.` }
      ]);
      showToast("Interface updated successfully!");
    } catch (e: any) {
      const errorMsg = e.message || "Failed to update interface. Please try again.";
      setError(errorMsg);
      setChatMessages(prev => [
        ...prev,
        { role: "assistant", content: `⚠️ ${errorMsg}` }
      ]);
    } finally {
      setModifying(false);
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

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    showToast("Logged out successfully");
  };

  const exportJSON = () => {
    if (!schema) return;
    const blob = new Blob([JSON.stringify(schema, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${schema.title || "workflow"}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("JSON schema exported!");
    setShowExport(false);
  };

  const exportReact = () => {
    if (!schema) return;
    const code = generateReactComponent(schema as any);
    const blob = new Blob([code], { type: "text/typescript-jsx" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `FlowForgeUI.tsx`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("React component exported! Paste directly into VS Code.");
    setShowExport(false);
  };

  const exportHTML = () => {
    if (!schema) return;
    const html = generateHTMLWebpage(schema as any);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `index.html`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Standalone HTML exported! Open in VS Code Live Server.");
    setShowExport(false);
  };

  const copyToClipboard = async (text: string, successMessage: string) => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.left = "-999999px";
        textarea.style.top = "-999999px";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      showToast(successMessage);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      showToast("Failed to copy to clipboard");
    }
    setShowExport(false);
  };

  const copyJSON = () => {
    if (!schema) return;
    copyToClipboard(JSON.stringify(schema, null, 2), "JSON schema copied! (Tip: Use Copy React for runnable code)");
  };

  const copyReact = () => {
    if (!schema) return;
    const code = generateReactComponent(schema as any);
    copyToClipboard(code, "Runnable React / Next.js (.tsx) copied! Paste in VS Code to run.");
  };

  const exportPDF = () => {
    if (!schema) return;
    downloadDirectPDF(schema as any);
    showToast("PDF document exported and downloaded directly!");
    setShowExport(false);
  };

  const copyHTML = () => {
    if (!schema) return;
    const html = generateHTMLWebpage(schema as any);
    copyToClipboard(html, "Standalone HTML webpage copied! Paste into index.html to run in VS Code.");
  };

  const printUI = () => {
    window.print();
    setShowExport(false);
  };

  return (
    <div className="workspace-layout">
      {/* 240-Frame Motion Background */}
      <FrameSequenceBackground />

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
              title={sidebarCollapsed ? "Expand sidebar (Shift right)" : "Collapse sidebar (Shift left)"}
              aria-label="Toggle sidebar collapse"
            >
              <span className="toggle-icon">{sidebarCollapsed ? "▶" : "◀"}</span>
              <span className="toggle-label">{sidebarCollapsed ? "Expand" : "Collapse"}</span>
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="sidebar-nav">
            <button
              onClick={() => { setSchema(null); setPrompt(""); setCurrentPrompt(""); setError(null); setSidebarOpen(false); }}
              className="sidebar-item active"
              title="New Workflow"
            >
              <span className="sidebar-item-icon">✦</span>
              <span className="sidebar-item-text">New Workflow</span>
            </button>
            <Link href="/workflows" className="sidebar-item" title="My Workflows">
              <span className="sidebar-item-icon">📁</span>
              <span className="sidebar-item-text">My Workflows</span>
            </Link>
            <button
              onClick={() => {
                setPrompt("Create a student performance dashboard with marks, attendance, subject-wise performance chart, and upcoming exams");
                setSidebarOpen(false);
              }}
              className="sidebar-item"
              title="Templates"
            >
              <span className="sidebar-item-icon">📋</span>
              <span className="sidebar-item-text">Templates</span>
            </button>
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
              <div className="user-avatar">{ (user?.name || profileName).charAt(0).toUpperCase() }</div>
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

      {/* Main content */}
      <main className={`workspace-main ${sidebarCollapsed ? "sidebar-collapsed" : ""} ${schema && rightSidebarOpen ? "has-right-sidebar" : ""}`}>
        {!schema && !loading && (
          <div className="workspace-prompt-section">
            <div className="prompt-header">
              <h1>Describe what you want to build</h1>
              <p>Tell FlowForge AI what interface you need, and watch it come to life.</p>
            </div>
            <div className="prompt-box">
              <textarea
                ref={promptRef}
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder="Create a student performance dashboard with marks, attendance and upcoming exams…"
                rows={4}
                onKeyDown={e => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    generate();
                  }
                }}
              />
              <div className="prompt-actions">
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span className="ai-provider-label">AI Provider:</span>
                  <div className="model-selector-container">
                    <button
                      type="button"
                      className="model-selector-btn"
                      onClick={() => setShowModelDropdown(!showModelDropdown)}
                    >
                      <span className="model-selected-name">
                        {FREE_MODELS.find(m => m.id === selectedModel)?.providerLabel || selectedModel}
                      </span>
                      <span className="model-arrow">▼</span>
                    </button>
                    {showModelDropdown && (
                      <div className="model-dropdown-menu">
                        <div className="model-options-list">
                          {FREE_MODELS.map((m) => (
                            <button
                              key={m.id}
                              type="button"
                              className={`model-option-item ${selectedModel === m.id ? "active" : ""}`}
                              onClick={() => {
                                setSelectedModel(m.id);
                                setShowModelDropdown(false);
                              }}
                            >
                              <span className="model-item-check">{selectedModel === m.id ? "✓" : ""}</span>
                              <span className="model-item-text">{m.providerLabel || m.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Clear & Generate UI Buttons on Right */}
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <button className="btn-clear" onClick={() => setPrompt("")}>Clear</button>
                  <button className="btn-generate" onClick={generate} disabled={!prompt.trim()}>
                    <span>✨</span> Generate UI
                  </button>
                </div>
              </div>
            </div>
            <div className="example-prompts">
              <p className="example-label">Try an example:</p>
              <div className="example-list">
                {examplePrompts.map((ex, i) => (
                  <button key={i} className="example-chip" onClick={() => setPrompt(ex)}>
                    {ex}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="loading-state">
            <div className="loading-spinner" />
            <div className="loading-steps">
              {LOADING_STEPS.map((step, i) => (
                <div key={i} className={`loading-step ${i <= loadingStep ? "active" : ""} ${i === loadingStep ? "current" : ""}`}>
                  <span className="step-icon">{i <= loadingStep ? "✓" : "○"}</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="error-banner">
            <span>⚠️ {error}</span>
            <button onClick={() => { setError(null); if (!schema) generate(); }}>
              {schema ? "Dismiss" : "Retry"}
            </button>
          </div>
        )}

        {schema && !loading && (
          <div ref={resultRef} className="result-section">
            <div className="result-toolbar">
              <div className="toolbar-left">
                <button className="toolbar-btn" onClick={() => { setSchema(null); setPrompt(currentPrompt); }}>
                  ← Back to Prompt
                </button>
              </div>
              <div className="toolbar-right">
                <button
                  className="toolbar-btn copilot-toggle-btn"
                  onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
                  title="Toggle AI Copilot Sidebar"
                  style={{
                    background: "rgba(255, 255, 255, 0.4)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255, 255, 255, 0.55)",
                    fontWeight: 600,
                    marginRight: "6px"
                  }}
                >
                  <span>✨</span>
                  <span>{rightSidebarOpen ? "Hide AI Sidebar" : "AI Sidebar"}</span>
                </button>
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
                <button className="toolbar-btn save-btn" onClick={() => {
                  setSaveTitle(schema.title || "");
                  setShowSaveModal(true);
                }}>
                  💾 Save Workflow
                </button>
              </div>
            </div>

            <UIRenderer schema={schema} />
          </div>
        )}
      </main>

      {/* Right AI Assistant Sidebar */}
      {schema && !loading && (
        <aside className={`workspace-right-sidebar ${rightSidebarOpen ? "open" : "collapsed"}`}>
          <div className="right-sidebar-header">
            <div className="right-sidebar-title">
              <span className="copilot-icon">✨</span>
              <span className="copilot-text">AI Copilot</span>
            </div>
            <div className="right-sidebar-controls">
              <span className="right-sidebar-model-badge">
                {FREE_MODELS.find(m => m.id === selectedModel)?.name || "Gemini 2.0"}
              </span>
              <button
                className="right-sidebar-toggle-btn"
                onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
                title={rightSidebarOpen ? "Collapse AI Chatbot" : "Expand AI Chatbot"}
                aria-label="Toggle AI Chatbot"
              >
                {rightSidebarOpen ? "▶" : "◀"}
              </button>
            </div>
          </div>

          {rightSidebarOpen && (
            <>
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
                  onChange={e => setModifyInput(e.target.value)}
                  placeholder="Tell AI how to change this interface…"
                  onKeyDown={e => {
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
            </>
          )}
        </aside>
      )}

      {/* Floating Re-open Button when right sidebar is collapsed */}
      {schema && !rightSidebarOpen && (
        <button
          className="floating-ai-copilot-btn"
          onClick={() => setRightSidebarOpen(true)}
          title="Open AI Copilot Sidebar"
        >
          <span>✨</span>
          <span>AI Copilot</span>
        </button>
      )}

      {/* Toast */}
      {toast && <div className="toast-notification">{toast}</div>}

      {/* Save Modal */}
      {showSaveModal && (
        <div className="modal-overlay" onClick={() => setShowSaveModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Save Workflow</h3>
            <input
              value={saveTitle}
              onChange={e => setSaveTitle(e.target.value)}
              placeholder="Workflow name"
              autoFocus
              onKeyDown={e => { if (e.key === "Enter") saveWorkflow(); }}
            />
            <div className="modal-actions">
              <button onClick={() => setShowSaveModal(false)} className="btn-cancel">Cancel</button>
              <button onClick={saveWorkflow} className="btn-save" disabled={!saveTitle.trim()}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Profile & Account Modal */}
      {showProfileModal && (
        <div className="modal-overlay" onClick={() => setShowProfileModal(false)}>
          <div className="modal-content profile-modal-dialog" onClick={e => e.stopPropagation()}>
            <div className="info-modal-header" style={{ marginBottom: "18px", paddingBottom: "12px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0, display: "flex", alignItems: "center", gap: "8px", fontSize: "18px", fontWeight: 700 }}>
                <span>👤</span> Profile & Account
              </h3>
              <button
                type="button"
                className="info-modal-close"
                onClick={() => setShowProfileModal(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Profile Hero Header */}
            <div className="profile-modal-hero">
              <div className="profile-large-avatar">
                {(user?.name || profileName).charAt(0).toUpperCase()}
              </div>
              <div className="profile-hero-info">
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "#0f172a" }}>
                    {user?.name || profileName}
                  </h4>
                  <span className="profile-status-badge">● Active Tier</span>
                </div>
                <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#64748b" }}>
                  {user?.email || profileEmail}
                </p>
              </div>
            </div>

            {/* Editable Profile Inputs */}
            <div className="profile-edit-section">
              <div className="profile-input-group">
                <label>Display Name</label>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  placeholder="Your Name"
                />
              </div>
              <div className="profile-input-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={profileEmail}
                  onChange={(e) => setProfileEmail(e.target.value)}
                  placeholder="name@example.com"
                />
              </div>
            </div>

            {/* Account Stats / Capabilities */}
            <div className="profile-capabilities-grid">
              <div className="cap-card">
                <span className="cap-label">AI Engine</span>
                <span className="cap-value">{FREE_MODELS.find(m => m.id === selectedModel)?.name || "Gemini 2.0"}</span>
              </div>
              <div className="cap-card">
                <span className="cap-label">UI Generation</span>
                <span className="cap-value" style={{ color: "#16a34a" }}>Unlimited Free</span>
              </div>
              <div className="cap-card">
                <span className="cap-label">Storage</span>
                <span className="cap-value">Cloud & Local</span>
              </div>
            </div>

            {/* Quick Account Switchers */}
            <div className="profile-switchers-box">
              <span className="switchers-label">Instant Account Switch</span>
              <div className="switchers-buttons">
                <button
                  type="button"
                  className="btn-profile-preset"
                  onClick={async () => {
                    const res = await fetch("/api/auth/login", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ isDemo: true }),
                    });
                    const data = await res.json();
                    if (data.user) {
                      setUser(data.user);
                      setProfileName(data.user.name);
                      setProfileEmail(data.user.email);
                      showToast("Switched to Demo Account!");
                    }
                  }}
                >
                  ⚡ Demo Account
                </button>
                <button
                  type="button"
                  className="btn-profile-preset"
                  onClick={async () => {
                    try {
                      const { loginWithGoogle } = await import("@/lib/firebase");
                      const cred = await loginWithGoogle();
                      if (cred.user) {
                        const name = cred.user.displayName || "Google Creator";
                        const email = cred.user.email || "creator@flowforge.ai";
                        setUser({ id: cred.user.uid, email, name });
                        setProfileName(name);
                        setProfileEmail(email);
                        showToast(`Connected with Firebase (${name})`);
                        return;
                      }
                    } catch (fbErr: any) {
                      console.warn("Firebase popup note:", fbErr?.message || fbErr);
                    }
                    const res = await fetch("/api/auth/login", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ provider: "google" }),
                    });
                    const data = await res.json();
                    if (data.user) {
                      setUser(data.user);
                      setProfileName(data.user.name);
                      setProfileEmail(data.user.email);
                      showToast("Switched to Google Profile!");
                    }
                  }}
                >
                  🔥 Firebase / Google
                </button>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="modal-actions" style={{ marginTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              {user ? (
                <button
                  type="button"
                  onClick={() => { logout(); setShowProfileModal(false); }}
                  className="btn-cancel"
                  style={{ color: "#ef4444" }}
                >
                  Sign Out
                </button>
              ) : (
                <div />
              )}
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => setShowProfileModal(false)}
                  className="btn-cancel"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn-save"
                  onClick={() => {
                    if (user) {
                      setUser({ ...user, name: profileName, email: profileEmail });
                    } else {
                      setUser({ id: "custom-user", name: profileName, email: profileEmail });
                    }
                    setShowProfileModal(false);
                    showToast("Profile preferences updated!");
                  }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
