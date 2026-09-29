"use client";

import React, { useRef } from "react";
import { motion, MotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";

const statement =
  "Independent farms grow it. We roast it in small batches, once a week, and then get out of the way.";
const words = statement.split(" ");

const Word = ({
  word,
  range,
  progress,
  still,
}: {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
  still: boolean;
}) => {
  const opacity = useTransform(progress, range, [0.22, 1]);
  return (
    <motion.span style={still ? undefined : { opacity }} className="inline-block mr-[0.25em]">
      {word}
    </motion.span>
  );
};

const steps = [
  {
    n: "01",
    title: "Sourced",
    copy: "From independent farms, one origin at a time.",
    art: (
      <>
        <path d="M4 62 L34 26 L52 46 L74 16 L116 62" />
        <circle cx="92" cy="20" r="8" className="stroke-sun" />
      </>
    ),
  },
  {
    n: "02",
    title: "Roasted",
    copy: "In small batches, so each bean gets its own curve.",
    art: (
      <>
        <path d="M4 58 C 26 58, 34 22, 62 24 S 100 12, 116 10" />
        <circle cx="116" cy="10" r="4" className="fill-sun stroke-sun" />
      </>
    ),
  },
  {
    n: "03",
    title: "Shipped",
    copy: "Fresh, straight to your door.",
    art: (
      <>
        <path d="M22 26 L60 10 L98 26 V58 L60 70 L22 58 Z" />
        <path d="M22 26 L60 42 L98 26 M60 42 V70" />
      </>
    ),
  },
];

export const Manifesto = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });

  return (
    <section className="section-lg bg-bean text-paper on-dark">
      <div className="wrap">
        <p className="label mb-8 text-sun">04 / How it gets to you</p>
        <div ref={ref}>
          <p className="t-h2 max-w-[18ch] md:max-w-5xl" aria-label={statement}>
            {words.map((w, i) => (
              <Word
                key={i}
                word={w}
                range={[i / words.length, Math.min((i + 1.5) / words.length, 1)]}
                progress={scrollYProgress}
                still={!!reduce}
              />
            ))}
          </p>
        </div>

        <ol className="mt-20 md:mt-28 grid gap-12 md:grid-cols-3 border-t rule pt-10">
          {steps.map((s, i) => (
            <li key={s.n}>
              <svg viewBox="0 0 120 76" className="w-full max-w-[220px] h-auto" fill="none" stroke="#F3EBDC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <motion.g
                  initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1.1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                  {s.art}
                </motion.g>
              </svg>
              <p className="label text-sun mt-6">{s.n}</p>
              <h3 className="t-h3 mt-2">{s.title}</h3>
              <p className="mt-3 text-paper/80 max-w-xs">{s.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
