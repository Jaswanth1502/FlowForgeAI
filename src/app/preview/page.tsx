import { Suspense } from "react";
import PreviewClient from "@/components/PreviewClient";

export const metadata = {
  title: "Preview Output — FlowForge AI",
};

export default function PreviewPage() {
  return (
    <Suspense fallback={
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <div className="loading-spinner" />
      </div>
    }>
      <PreviewClient />
    </Suspense>
  );
}
