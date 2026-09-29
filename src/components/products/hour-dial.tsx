"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Bag } from "@/components/brand/bag";
import { products } from "@/lib/data/products";
import { useCart } from "@/lib/hooks/use-cart";
import { formatHour, onSky, phaseName, skyColor } from "@/lib/sky";

const MIN = 5;
const MAX = 11;
const sorted = [...products].sort((a, b) => a.hour - b.hour);

const arcPoint = (hour: number) => {
  const t = (hour - MIN) / (MAX - MIN);
  return { x: 400 - 360 * Math.cos(Math.PI * t), y: 290 - 250 * Math.sin(Math.PI * t) };
};

export const HourDial = () => {
  const { addToCart } = useCart();
  const [hour, setHour] = useState(7.25);

  const sky = skyColor(hour);
  const fg = onSky(sky);
  const sunFill = fg === "#F3EBDC" ? "#F2B233" : "#C23A12";
  const pos = arcPoint(hour);

  const nearest = sorted.reduce((best, p) => (Math.abs(p.hour - hour) < Math.abs(best.hour - hour) ? p : best));

  return (
    <section
      id="hour"
      className="section-lg scroll-mt-24 transition-colors duration-300"
      style={{ backgroundColor: sky, color: fg }}
    >
      <div className={`wrap ${fg === "#F3EBDC" ? "on-dark" : ""}`}>
        <p className="label mb-6">02 / The hour dial</p>
        <h2 className="t-h2 max-w-3xl">Which morning are you?</h2>

        <div className="mt-10 lg:mt-14 grid gap-10 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7">
            <div className="flex items-baseline gap-6 flex-wrap">
              <p className="font-display leading-[0.85] tracking-tighter tabular-nums text-[clamp(5rem,12vw,10rem)]" aria-hidden="true">
                {formatHour(hour)}
              </p>
              <p className="t-h3 italic">{phaseName(hour)}</p>
            </div>

            <svg viewBox="0 0 800 300" className="w-full h-auto mt-4" aria-hidden="true">
              <defs>
                <clipPath id="dial-clip">
                  <rect x="0" y="0" width="800" height="290" />
                </clipPath>
              </defs>
              <path
                d="M40 290A360 250 0 0 1 760 290"
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.45"
                strokeDasharray="3 7"
              />
              <line x1="0" y1="290" x2="800" y2="290" stroke="currentColor" strokeWidth="2" />
              <g clipPath="url(#dial-clip)">
                <circle cx={pos.x} cy={pos.y} r="34" fill={sunFill} />
              </g>
            </svg>

            <input
              type="range"
              className="dial -mt-2"
              min={MIN}
              max={MAX}
              step={0.25}
              value={hour}
              onChange={(e) => setHour(Number(e.target.value))}
              aria-label="Hour of the morning"
              aria-valuetext={`${formatHour(hour)}, ${phaseName(hour)}`}
            />
            <div className="flex justify-between label mt-1" aria-hidden="true">
              <span>05:00 Before light</span>
              <span>11:00 High morning</span>
            </div>

            <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Jump to a coffee">
              {sorted.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setHour(p.hour)}
                  aria-pressed={nearest.id === p.id}
                  className="label px-3 py-2 border border-current transition-colors duration-150"
                  style={nearest.id === p.id ? { backgroundColor: fg, color: sky } : undefined}
                >
                  {formatHour(p.hour)} {p.name.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={nearest.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="bg-paper text-ink p-6 md:p-8 grid grid-cols-[minmax(0,150px)_1fr] gap-6 items-end"
              >
                <Link href={`/product/${nearest.slug}`} aria-label={`View ${nearest.name}`}>
                  <Bag name={nearest.name} origin={nearest.origin} hour={nearest.hour} className="w-full h-auto" />
                </Link>
                <div className="pb-2">
                  <p className="label mb-3">Your coffee</p>
                  <h3 className="t-h3">{nearest.name}</h3>
                  <p className="mt-3 text-mute">{nearest.tastingNotes.join(", ")}</p>
                  <p className="label mt-4 text-mute">
                    {nearest.roastLevel} roast / ${nearest.price}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="btn btn-ink"
                      onClick={() => addToCart(nearest, "250g", "whole-bean", 1)}
                    >
                      Add to bag
                    </button>
                    <Link href={`/product/${nearest.slug}`} className="label link-under self-center py-2">
                      Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
