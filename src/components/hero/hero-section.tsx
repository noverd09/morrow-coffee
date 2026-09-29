"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Bag } from "@/components/brand/bag";
import { getProductBySlug } from "@/lib/data/products";
import { OriginTicker } from "./origin-ticker";

const expo = [0.16, 1, 0.3, 1] as const;

const Line = ({ children, delay }: { children: React.ReactNode; delay: number }) => (
  <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
    <motion.span
      className="block"
      initial={{ y: "110%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 0.9, delay, ease: expo }}
    >
      {children}
    </motion.span>
  </span>
);

export const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sunParallax = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const featured = getProductBySlug("ethiopia-guji")!;

  return (
    <section ref={ref} className="relative overflow-hidden flex flex-col min-h-[calc(100svh-104px)] md:min-h-[calc(100svh-120px)]">
      <div className="wrap relative z-10 flex-1 pt-10 md:pt-14 pb-10 lg:pb-16 flex flex-col justify-between gap-12">
        <h1 className="t-display max-w-[9ch] lg:max-w-none">
          <Line delay={0.1}>Pick your</Line>
          <Line delay={0.2}>
            <em className="text-ember">first hour.</em>
          </Line>
        </h1>

        <motion.div
          className="max-w-md space-y-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: expo }}
        >
          <p className="text-lg">
            Six small-batch coffees, ordered from dark roast to light like the sky between night and noon.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#hour" className="btn btn-ember">
              Choose your hour
            </a>
            <Link href="/shop" className="btn btn-line">
              Shop all coffee
            </Link>
          </div>
        </motion.div>
      </div>

      {/* One visual: the sun rising behind the morning's bag */}
      <div className="relative lg:absolute lg:right-[3vw] lg:bottom-14 w-full lg:w-[min(58vw,760px)] px-[var(--gutter)] lg:px-0 mt-4 lg:mt-0">
        <motion.div style={{ y: sunParallax }} className="relative w-full aspect-[2/1] overflow-hidden">
          <motion.div
            className="w-full aspect-square rounded-full bg-ember"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.6, delay: 0.1, ease: expo }}
          />
        </motion.div>
        <motion.div
          className="absolute left-1/2 bottom-0 w-[42%] max-w-[340px] -translate-x-1/2"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: expo }}
        >
          <Bag name={featured.name} origin={featured.origin} hour={featured.hour} className="w-full h-auto drop-shadow-none" />
        </motion.div>
      </div>

      <OriginTicker />
    </section>
  );
};
