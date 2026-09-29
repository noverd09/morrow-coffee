"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/brand/logo";
import { useCart } from "@/lib/hooks/use-cart";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/our-story", label: "Story" },
  { href: "/journal", label: "Journal" },
];

export const Header = () => {
  const { items, setIsOpen } = useCart();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <div className="bg-ink text-paper on-dark">
        <p className="label wrap py-2.5 text-center">Free shipping on orders over $50</p>
      </div>

      <header className="sticky top-0 z-50 bg-paper border-b rule">
        <div className="wrap grid grid-cols-3 items-center h-16 md:h-20">
          <nav aria-label="Primary" className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={pathname.startsWith(l.href) ? "page" : undefined}
                className={`label link-under py-1 ${pathname.startsWith(l.href) ? "text-ember" : ""}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="label md:hidden justify-self-start py-3 -my-3"
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            Menu
          </button>

          <Link href="/" className="justify-self-center" aria-label="Morrow Coffee, home" onClick={() => setMenuOpen(false)}>
            <Logo />
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="label justify-self-end py-3 -my-3 link-under"
            aria-label={`Open bag, ${totalItems} ${totalItems === 1 ? "item" : "items"}`}
          >
            Bag <span className="text-ember">({totalItems})</span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-ink text-paper on-dark flex flex-col"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="wrap flex items-center justify-between h-16">
              <Logo />
              <button type="button" onClick={() => setMenuOpen(false)} className="label py-3 -my-3">
                Close
              </button>
            </div>
            <nav aria-label="Mobile" className="wrap flex-1 flex flex-col justify-center gap-2">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="t-display block text-[clamp(3.5rem,18vw,7rem)]"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
