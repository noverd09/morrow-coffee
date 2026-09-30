import React, { useId } from "react";
import { formatHour, onSky, skyColor } from "@/lib/sky";

interface BagProps {
  name: string;
  origin: string;
  hour: number;
  className?: string;
}

/** Generated packaging art. The sun sits higher on the label the lighter the roast. */
export const Bag = ({ name, origin, hour, className = "" }: BagProps) => {
  const uid = useId().replace(/:/g, "");
  const sky = skyColor(hour);
  const fg = onSky(sky);
  const t = Math.min(Math.max((hour - 5) / 6, 0), 1);
  const horizon = 232;
  const sunY = horizon + 34 - t * 120;
  const label = name.replace(/ (Sul de Minas|Huehuetenango)$/, "");
  const sub = name === label ? "" : name.slice(label.length).trim();

  return (
    <svg
      viewBox="0 0 300 400"
      className={className}
      role="img"
      aria-label={`${name} coffee bag, ${origin}`}
    >
      <defs>
        <clipPath id={`${uid}-sky`}>
          <rect x="30" y="86" width="240" height={horizon - 86} />
        </clipPath>
      </defs>
      <path
        d="M22 40h256l10 340a6 6 0 0 1-6 6H18a6 6 0 0 1-6-6z"
        fill="#1B120C"
        opacity="0.14"
        transform="translate(6 8)"
      />
      <path d="M22 40h256l10 340a6 6 0 0 1-6 6H18a6 6 0 0 1-6-6z" fill={sky} stroke={fg} strokeOpacity="0.4" strokeWidth="1.5" />
      <path d="M22 40h256l1 22H21z" fill="#000" opacity="0.14" />
      <path d="M22 62h256" stroke={fg} strokeOpacity="0.35" strokeDasharray="2 5" />
      <g clipPath={`url(#${uid}-sky)`}>
        <circle cx="150" cy={sunY} r="52" fill={fg === "#F3EBDC" ? "#F5C9C2" : "#A31F3A"} />
      </g>
      <rect x="30" y={horizon} width="240" height="2.5" fill={fg} />
      <text x="30" y="276" fill={fg} fontFamily="var(--font-mono), monospace" fontSize="11" letterSpacing="1.4">
        {formatHour(hour)}
      </text>
      <text
        x="270"
        y="276"
        fill={fg}
        fontFamily="var(--font-mono), monospace"
        fontSize="11"
        letterSpacing="1.4"
        textAnchor="end"
      >
        250G
      </text>
      <text x="30" y={sub ? 322 : 330} fill={fg} fontFamily="var(--font-display), serif" fontSize="44">
        {label}
      </text>
      {sub && (
        <text x="30" y="352" fill={fg} fontFamily="var(--font-display), serif" fontStyle="italic" fontSize="26">
          {sub}
        </text>
      )}
      <text x="30" y="376" fill={fg} fontFamily="var(--font-mono), monospace" fontSize="10" letterSpacing="1.4">
        {origin.toUpperCase()}
      </text>
    </svg>
  );
};
