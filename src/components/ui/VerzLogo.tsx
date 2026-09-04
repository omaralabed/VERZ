"use client";

import React from "react";

interface VerzLogoProps {
  size?: number | "sm" | "md" | "lg" | "xl";
  variant?: "icon" | "full" | "wordmark" | "badge";
  subtext?: string;
  className?: string;
  glow?: boolean;
}

export function VerzLogo({
  size = "md",
  variant = "full",
  subtext,
  className = "",
  glow = true,
}: VerzLogoProps) {
  const getDimension = () => {
    if (typeof size === "number") return size;
    switch (size) {
      case "sm":
        return 28;
      case "md":
        return 42;
      case "lg":
        return 52;
      case "xl":
        return 72;
      default:
        return 42;
    }
  };

  const dim = getDimension();
  const gradId = "verz-contour-grad";
  const glowFilterId = "verz-neon-glow";

  // Concept 5: The Dual Luminescent Contour VZ Emblem (Bold & Scaled)
  const Emblem = ({ width = dim, height = dim }: { width?: number; height?: number }) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:brightness-125 ${
        glow ? "drop-shadow-[0_0_12px_rgba(0,240,255,0.7)]" : ""
      }`}
    >
      <defs>
        <linearGradient id={gradId} x1="10%" y1="10%" x2="90%" y2="90%">
          <stop offset="0%" stopColor="#00F0FF" />
          <stop offset="50%" stopColor="#00E5A3" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>

        {/* Photonic neon glow filter for ultra-vivid look */}
        <filter id={glowFilterId} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Atmospheric Glow Underlayer */}
      <g filter={`url(#${glowFilterId})`} opacity="0.6">
        {/* V-Stem */}
        <path
          d="M10 14 L44 86 L60 14"
          stroke={`url(#${gradId})`}
          strokeWidth="15"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Z-Stem */}
        <path
          d="M60 14 L90 14 L50 86 L90 86"
          stroke={`url(#${gradId})`}
          strokeWidth="15"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Outer Luminous Neon Contour (Dual Wall) */}
      <path
        d="M10 14 L44 86 L60 14"
        stroke={`url(#${gradId})`}
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M60 14 L90 14 L50 86 L90 86"
        stroke={`url(#${gradId})`}
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Inner High-Precision Obsidian Channel Core */}
      <path
        d="M10 14 L44 86 L60 14"
        stroke="#06080D"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M60 14 L90 14 L50 86 L90 86"
        stroke="#06080D"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Central Luminous Quantum Nexus Node */}
      <circle cx="60" cy="14" r="3" fill="#FFFFFF" className="animate-pulse" />
    </svg>
  );

  // Pure Icon Only
  if (variant === "icon") {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <Emblem />
      </div>
    );
  }

  // Futuristic Badge / App Icon Style
  if (variant === "badge") {
    return (
      <div
        className={`relative inline-flex items-center justify-center rounded-xl border border-white/15 bg-black/60 p-2 shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-accent-cyan/50 hover:shadow-[0_0_20px_rgba(0,240,255,0.25)] ${className}`}
      >
        <Emblem width={dim * 1.1} height={dim * 1.1} />
      </div>
    );
  }

  // Size mappings for pure typography wordmark
  const getTypographySize = () => {
    switch (size) {
      case "sm":
        return {
          title: "text-2xl",
          sub: "text-[9px] tracking-[0.26em]",
        };
      case "lg":
        return {
          title: "text-4xl sm:text-5xl",
          sub: "text-xs sm:text-sm tracking-[0.35em]",
        };
      case "xl":
        return {
          title: "text-5xl sm:text-6xl",
          sub: "text-sm sm:text-base tracking-[0.38em]",
        };
      case "md":
      default:
        return {
          title: "text-3xl sm:text-[34px]",
          sub: "text-[10px] sm:text-[11px] tracking-[0.3em]",
        };
    }
  };

  const typo = getTypographySize();

  // Full Brand Logo: Pure Monolithic Wordmark + Subtitle (Bigger, Bold, Zero Gap)
  return (
    <div className={`inline-flex flex-col justify-center group ${className}`}>
      <div className="flex items-baseline leading-none">
        <span className={`font-mono ${typo.title} font-black tracking-tight text-white transition-colors group-hover:text-zinc-100`}>
          VER<span className="text-accent-cyan drop-shadow-[0_0_16px_rgba(0,240,255,0.75)]">Z.</span>
        </span>
        {subtext && (
          <span className="ml-2.5 rounded border border-accent-cyan/30 bg-accent-cyan/10 px-1.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-accent-cyan">
            {subtext}
          </span>
        )}
      </div>
      <span className={`font-mono ${typo.sub} text-accent-cyan/90 font-bold uppercase mt-1 leading-none drop-shadow-[0_0_8px_rgba(0,240,255,0.3)]`}>
        ADVANCED TECHNOLOGY LABS
      </span>
    </div>
  );
}
