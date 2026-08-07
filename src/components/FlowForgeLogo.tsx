import React from "react";

interface LogoProps {
  size?: number;
  className?: string;
}

export default function FlowForgeLogo({ size = 28, className = "" }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`flowforge-brand-logo ${className}`}
      style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}
      aria-label="FlowForge AI Logo"
    >
      <defs>
        <linearGradient id="ff-top-grad" x1="0" y1="0" x2="100" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="60%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#93c5fd" />
        </linearGradient>
        <linearGradient id="ff-mid-grad" x1="0" y1="40" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="50%" stopColor="#4f46e5" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        <linearGradient id="ff-bot-grad" x1="0" y1="80" x2="40" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4338ca" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <filter id="ff-glow" x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#3b82f6" floodOpacity="0.25" />
        </filter>
      </defs>

      <g filter="url(#ff-glow)">
        {/* Top Wing */}
        <path
          d="M 10 28 C 10 14 20 6 36 6 L 82 6 C 92 6 98 12 98 20 C 98 28 92 34 82 34 L 10 34 Z"
          fill="url(#ff-top-grad)"
        />

        {/* Middle Wing */}
        <path
          d="M 10 66 C 10 52 18 46 32 46 L 68 46 C 76 46 82 52 82 60 C 82 68 76 74 68 74 L 10 74 Z"
          fill="url(#ff-mid-grad)"
        />

        {/* Bottom Stem Block */}
        <path
          d="M 10 86 L 36 86 C 36 86 36 94 36 102 C 36 112 28 118 18 118 L 10 118 Z"
          fill="url(#ff-bot-grad)"
        />
      </g>
    </svg>
  );
}
