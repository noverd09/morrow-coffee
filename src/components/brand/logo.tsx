import React from "react";

export const LogoMark = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
    <path d="M6 22a10 10 0 0 1 20 0z" fill="#2E3D8C" />
    <rect x="2" y="23.5" width="28" height="2.5" fill="currentColor" />
  </svg>
);

export const Logo = ({ className = "" }: { className?: string }) => (
  <span className={`inline-flex items-center gap-2 ${className}`}>
    <LogoMark />
    <span className="font-display text-[1.75rem] leading-none tracking-tight lowercase">morrow</span>
  </span>
);
