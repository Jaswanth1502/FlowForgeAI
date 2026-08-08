import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlowForge AI — From Intent to Interface",
  description:
    "Describe what you need, and AI builds the interface for you. Transform natural-language requirements into functional, customizable interfaces in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
