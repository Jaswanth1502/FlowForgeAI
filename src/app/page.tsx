"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FlowForgeLogo from "@/components/FlowForgeLogo";
import FrameSequenceBackground from "@/components/FrameSequenceBackground";

export default function LandingPage() {
  const router = useRouter();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [authForm, setAuthForm] = useState({ email: "", password: "", name: "" });
  const [authError, setAuthError] = useState("");
  const [user, setUser] = useState<{ id: string; email: string; name?: string } | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("flowforge_user");
      if (stored) {
        try {
          setUser(JSON.parse(stored));
          return;
        } catch {}
      }
    }
    fetch("/api/auth/me")
      .then((r) => {
        const ct = r.headers.get("content-type");
        if (r.ok && ct && ct.includes("application/json")) {
          return r.json();
        }
        return null;
      })
      .then((d) => {
        if (d?.user) setUser(d.user);
      })
      .catch(() => {});
  }, []);

  const completeLogin = (userData: { id: string; email: string; name?: string }) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("flowforge_user", JSON.stringify(userData));
    }
    setUser(userData);
    setShowAuthModal(false);
    setAuthForm({ email: "", password: "", name: "" });
    router.push("/workspace");
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    const endpoint = authMode === "login" ? "/api/auth/login" : "/api/auth/register";

    let loggedInUser: any = null;

    try {
      const { loginWithEmail, registerWithEmail } = await import("@/lib/firebase");
      if (authMode === "login") {
        const cred = await loginWithEmail(authForm.email, authForm.password);
        if (cred?.user) {
          loggedInUser = {
            id: cred.user.uid,
            email: cred.user.email || authForm.email,
            name: cred.user.displayName || authForm.name || authForm.email.split("@")[0],
          };
        }
      } else {
        const cred = await registerWithEmail(authForm.email, authForm.password, authForm.name);
        if (cred?.user) {
          loggedInUser = {
            id: cred.user.uid,
            email: cred.user.email || authForm.email,
            name: authForm.name || cred.user.displayName || authForm.email.split("@")[0],
          };
        }
      }
    } catch (fbErr: any) {
      console.warn("Firebase Auth notice:", fbErr?.message || fbErr);
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(authForm),
      });
      const ct = res.headers.get("content-type");
      if (res.ok && ct && ct.includes("application/json")) {
        const data = await res.json();
        completeLogin(data.user);
        return;
      }
    } catch {}

    // Static export (GitHub Pages) fallback
    const fallbackUser = loggedInUser || {
      id: "user-" + Date.now(),
      email: authForm.email || "user@flowforge.ai",
      name: authForm.name || (authForm.email ? authForm.email.split("@")[0] : "Developer"),
    };
    completeLogin(fallbackUser);
  };

  const handleGoogleLogin = async () => {
    setAuthError("");
    try {
      const { loginWithGoogle } = await import("@/lib/firebase");
      const cred = await loginWithGoogle();
      const fbUser = cred.user;
      if (fbUser) {
        const authenticatedUser = {
          id: fbUser.uid,
          email: fbUser.email || "google.user@flowforge.ai",
          name: fbUser.displayName || fbUser.email?.split("@")[0] || "Google User",
        };
        completeLogin(authenticatedUser);
        return;
      }
    } catch (fbErr: any) {
      console.warn("Firebase Google Auth notice:", fbErr?.code, fbErr?.message);
      if (fbErr?.code === "auth/popup-closed-by-user" || fbErr?.code === "auth/cancelled-popup-request") {
        setAuthError("Google Sign-In popup was closed before completing.");
        return;
      }
      if (fbErr?.message && !fbErr.message.includes("failed to fetch")) {
        setAuthError(fbErr.message);
        return;
      }
    }

    // Secondary API route attempt
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider: "google" }),
      });
      const ct = res.headers.get("content-type");
      if (res.ok && ct && ct.includes("application/json")) {
        const data = await res.json();
        completeLogin(data.user);
        return;
      }
    } catch {}

    // Fallback for static host
    completeLogin({
      id: "google-user-" + Date.now(),
      email: "google.user@flowforge.ai",
      name: "Google Developer",
    });
  };

  const handleDemoLogin = async () => {
    setAuthError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isDemo: true }),
      });
      const ct = res.headers.get("content-type");
      if (res.ok && ct && ct.includes("application/json")) {
        const data = await res.json();
        completeLogin(data.user);
        return;
      }
    } catch {}

    const demoUser = {
      id: "demo-user-1",
      email: "demo@flowforge.ai",
      name: "Demo Creator",
    };
    completeLogin(demoUser);
  };

  const handleLogout = async () => {
    try {
      const { logoutFirebase } = await import("@/lib/firebase");
      await logoutFirebase();
    } catch {}
    if (typeof window !== "undefined") {
      localStorage.removeItem("flowforge_user");
    }
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {}
    setUser(null);
  };

  return (
    <div className="landing-page">
      {/* 240-Frame Upscaled Motion Sequence Background */}
      <FrameSequenceBackground />

      {/* Navigation */}
      <nav className="landing-nav">
        <Link href="/" className="nav-logo">
          <FlowForgeLogo size={26} />
          <span className="logo-text">FlowForge<span className="logo-ai">AI</span></span>
        </Link>
        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "14px", color: "#f8fafc" }}>
                👤 {user.name || user.email}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="nav-info-btn"
                title="Sign Out"
              >
                Sign Out
              </button>
              <Link href="/workspace" className="nav-cta">Go to Workspace</Link>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  setAuthMode("login");
                  setAuthError("");
                  setShowAuthModal(true);
                }}
                className="nav-info-btn"
                title="Sign In"
                aria-label="Sign In"
              >
                <span>🔑</span>
                <span>Sign In</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode("login");
                  setAuthError("");
                  setShowAuthModal(true);
                }}
                className="nav-cta"
              >
                Launch App
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Hero with Glassmorphism Card */}
      <section className="hero-section">
        <div className="hero-glass-card">
          <div className="hero-badge">✨ From Intent to Interface</div>
          <h1 className="hero-title">Build Any Interface. Just Describe It.</h1>
          <p className="hero-subtitle">
            FlowForge AI transforms natural-language requirements into functional,
            customizable interfaces in seconds. No code. No templates. Just describe what you need.
          </p>
          <div className="hero-actions">
            {user ? (
              <Link href="/workspace" className="btn-primary">
                ⚡ Create Your UI
              </Link>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("login");
                    setAuthError("");
                    setShowAuthModal(true);
                  }}
                  className="btn-primary"
                >
                  ⚡ Create Your UI
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("login");
                    setAuthError("");
                    setShowAuthModal(true);
                  }}
                  className="btn-secondary"
                >
                  🔑 Sign In
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>© 2025 FlowForge AI — From Intent to Interface. Built for the future of UI.</p>
      </footer>

      {/* Sign In / Auth Modal */}
      {showAuthModal && (
        <div className="modal-overlay" onClick={() => setShowAuthModal(false)}>
          <div className="modal-content auth-modal" onClick={(e) => e.stopPropagation()}>
            <div className="info-modal-header" style={{ marginBottom: "16px", paddingBottom: "12px" }}>
              <h3>{authMode === "login" ? "🔑 Sign In" : "✨ Create Account"}</h3>
              <button
                type="button"
                className="info-modal-close"
                onClick={() => setShowAuthModal(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleAuth}>
              {authMode === "register" && (
                <input
                  type="text"
                  placeholder="Full Name"
                  value={authForm.name}
                  onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                  required
                />
              )}
              <input
                type="email"
                placeholder="Email Address"
                value={authForm.email}
                onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={authForm.password}
                onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                required
              />
              {authError && <p className="auth-error">{authError}</p>}
              <button type="submit" className="btn-auth">
                {authMode === "login" ? "Sign In" : "Create Account"}
              </button>
            </form>

            {authMode === "login" && (
              <div className="auth-social-options">
                <div className="auth-divider">
                  <span>or continue with</span>
                </div>
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="btn-auth-google"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" style={{ marginRight: "4px" }}>
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"/>
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                  </svg>
                  <span>Continue with Google</span>
                </button>
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="btn-auth-demo"
                >
                  <span>🚀</span>
                  <span>Continue in Demo Mode</span>
                </button>
              </div>
            )}

            <p className="auth-switch">
              {authMode === "login" ? (
                <>Don&apos;t have an account? <button type="button" onClick={() => { setAuthMode("register"); setAuthError(""); }}>Sign Up</button></>
              ) : (
                <>Already have an account? <button type="button" onClick={() => { setAuthMode("login"); setAuthError(""); }}>Sign In</button></>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}


