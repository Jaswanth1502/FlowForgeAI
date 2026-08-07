import { Suspense } from "react";
import WorkspaceClient from "@/components/WorkspaceClient";

export const metadata = {
  title: "Workspace — FlowForge AI",
};

export default function WorkspacePage() {
  return (
    <Suspense fallback={
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <div className="loading-spinner" />
      </div>
    }>
      <WorkspaceClient />
    </Suspense>
  );
}