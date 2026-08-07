"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import FlowForgeLogo from "@/components/FlowForgeLogo";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface Workflow {
  id: string;
  title: string;
  description: string | null;
  prompt: string;
  uiSchema: any;
  createdAt: string;
  updatedAt: string;
}

export default function WorkflowsPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  useEffect(() => {
    fetch("/api/workflows")
      .then((r) => r.json())
      .then((data) => {
        if (data.workflows) setWorkflows(data.workflows);
        else setWorkflows([]);
      })
      .catch(() => setWorkflows([]))
      .finally(() => setLoading(false));
  }, []);

  const deleteWorkflow = async (id: string) => {
    try {
      const res = await fetch(`/api/workflows/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setWorkflows((prev) => prev.filter((w) => w.id !== id));
      showToast("Workflow deleted");
    } catch {
      showToast("Failed to delete workflow");
    }
    setDeleteId(null);
  };

  const duplicateWorkflow = async (wf: Workflow) => {
    try {
      const res = await fetch("/api/workflows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: `${wf.title} (Copy)`,
          description: wf.description,
          prompt: wf.prompt,
          uiSchema: wf.uiSchema,
        }),
      });
      const data = await res.json();
      if (data.workflow) {
        setWorkflows((prev) => [data.workflow, ...prev]);
        showToast("Workflow duplicated!");
      }
    } catch {
      showToast("Failed to duplicate");
    }
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

      <h1 className="page-title">My Workflows</h1>

      {loading && (
        <div className="empty-state">
          <div className="loading-spinner" style={{ margin: "0 auto" }} />
          <p style={{ marginTop: 16 }}>Loading workflows…</p>
        </div>
      )}

      {!loading && workflows.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">📁</div>
          <h3>No Workflows Yet</h3>
          <p>Generate your first UI and save it to see it here.</p>
          <Link href="/workspace" className="btn-primary" style={{ display: "inline-flex" }}>
            Create Your First Workflow
          </Link>
        </div>
      )}

      {!loading && !error && workflows.length > 0 && (
        <div className="workflows-grid">
          {workflows.map((wf) => (
            <div key={wf.id} className="workflow-card">
              <h3>{wf.title}</h3>
              {wf.description && <p className="wf-desc">{wf.description}</p>}
              <p className="wf-meta">
                Created {new Date(wf.createdAt).toLocaleDateString()} ·
                Updated {new Date(wf.updatedAt).toLocaleDateString()}
              </p>
              <div className="wf-actions">
                <Link href={`/preview?workflow=${wf.id}`} className="wf-btn wf-btn-open">Open</Link>
                <button onClick={() => duplicateWorkflow(wf)} className="wf-btn wf-btn-dup">Duplicate</button>
                <button onClick={() => setDeleteId(wf.id)} className="wf-btn wf-btn-delete">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete confirmation */}
      {deleteId && (
        <div className="modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Workflow?</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: 14, marginBottom: 20 }}>
              This action cannot be undone. The workflow will be permanently deleted.
            </p>
            <div className="modal-actions">
              <button onClick={() => setDeleteId(null)} className="btn-cancel">Cancel</button>
              <button onClick={() => deleteWorkflow(deleteId)} className="btn-save" style={{ background: "var(--danger)" }}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="toast-notification">{toast}</div>}
    </div>
  );
}
