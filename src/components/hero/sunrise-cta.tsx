"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export const SunriseCta = () => {
  return (
    <section className="relative overflow-hidden bg-sun text-ink section-lg">
      <div className="wrap relative z-10">
        <p className="label mb-8">06 / Tomorrow</p>
        <h2 className="t-display text-[clamp(3.5rem,13vw,12rem)]">
          See you
          <br />
          <em>at sunrise.</em>
        </h2>
        <div className="mt-12 flex flex-wrap gap-3">
          <Link href="/shop" className="btn btn-ink">
            Shop all coffee
          </Link>
          <a href="#hour" className="btn btn-line">
            Pick your hour
          </a>
        </div>
      </div>
      <motion.div
        className="absolute -right-[8vw] -bottom-[18vw] w-[min(60vw,720px)] aspect-square rounded-full bg-ember"
        initial={{ y: 80, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      />
    </section>
  );
};
