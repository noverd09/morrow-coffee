import React from "react";
import { products } from "@/lib/data/products";

const origins = [...products].sort((a, b) => a.hour - b.hour).map((p) => p.origin);

const Sun = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" className="shrink-0">
    <path d="M1 10a6 6 0 0 1 12 0z" fill="#F5C9C2" />
  </svg>
);

/** The horizon: every origin we roast, running along the ground line. */
export const OriginTicker = () => {
  const row = (hidden: boolean) => (
    <ul className="flex items-center gap-8 pr-8" aria-hidden={hidden || undefined}>
      {origins.map((o, i) => (
        <li key={`${o}-${i}`} className="flex items-center gap-8 label whitespace-nowrap">
          {o}
          <Sun />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="bg-ink text-paper on-dark h-14 flex items-center overflow-hidden">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
};
