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
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (d.user) setUser(d.user);
      })
      .catch(() => {});
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    const endpoint = authMode === "login" ? "/api/auth/login" : "/api/auth/register";
    try {
      // Firebase Authentication integration
      try {
        const { loginWithEmail, registerWithEmail } = await import("@/lib/firebase");
        if (authMode === "login") {
          await loginWithEmail(authForm.email, authForm.password);
        } else {
          await registerWithEmail(authForm.email, authForm.password, authForm.name);
        }
      } catch (fbErr: any) {
        console.warn("Firebase Auth notice:", fbErr?.message || fbErr);
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(authForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Authentication failed");
      setUser(data.user);
      setShowAuthModal(false);
      setAuthForm({ email: "", password: "", name: "" });
      router.push("/workspace");
    } catch (err: any) {
      setAuthError(err.message || "Authentication failed");
    }
  };

  const handleGoogleLogin = async () => {
    setAuthError("");
    try {
      // Direct Firebase Google Auth Popup
      let fbUser: any = null;
      try {
        const { loginWithGoogle } = await import("@/lib/firebase");
        const cred = await loginWithGoogle();
        fbUser = cred.user;
      } catch (fbErr: any) {
        console.warn("Firebase Google popup note:", fbErr?.message || fbErr);
      }

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: "google",
          email: fbUser?.email || undefined,
          name: fbUser?.displayName || undefined,
          firebaseUid: fbUser?.uid || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Google login failed");
      setUser(data.user);
      setShowAuthModal(false);
      router.push("/workspace");
    } catch (e: any) {
      setAuthError(e.message || "Google sign in cancelled or failed");
    }
  };

  const handleDemoLogin = async () => {
    setAuthError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isDemo: true }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setUser(data.user);
      setShowAuthModal(false);
      router.push("/workspace");
    } catch (e: any) {
      setAuthError(e.message);
    }
  };

  const handleLogout = async () => {
    try {
      const { logoutFirebase } = await import("@/lib/firebase");
      await logoutFirebase();
    } catch {}
    await fetch("/api/auth/logout", { method: "POST" });
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


