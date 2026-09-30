"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Bag } from "@/components/brand/bag";
import { useCart } from "@/lib/hooks/use-cart";

export const CartDrawer = () => {
  const { items, isOpen, setIsOpen, updateQuantity, removeFromCart, subtotal } = useCart();

  const shippingThreshold = 50;
  const remaining = Math.max(0, shippingThreshold - subtotal);
  const progress = Math.min(1, subtotal / shippingThreshold);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, setIsOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-ink/50 z-[70]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          <motion.aside
            className="fixed right-0 top-0 h-full w-full sm:w-[440px] bg-paper text-ink z-[71] flex flex-col border-l rule"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Your bag"
          >
            <div className="flex items-center justify-between px-6 h-16 border-b rule">
              <h2 className="t-h3">Your bag</h2>
              <button type="button" onClick={() => setIsOpen(false)} className="label py-3 -my-3" aria-label="Close bag">
                Close
              </button>
            </div>

            {items.length > 0 && (
              <div className="px-6 py-4 bg-oat">
                <p className="label">
                  {remaining > 0 ? (
                    <>Add ${remaining.toFixed(2)} for free shipping</>
                  ) : (
                    <>Free shipping unlocked</>
                  )}
                </p>
                <div className="mt-3 h-1 bg-ink/15" aria-hidden="true">
                  <div className="h-full bg-dawn transition-[width] duration-300" style={{ width: `${progress * 100}%` }} />
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <div className="py-16">
                  <p className="t-h3">Nothing here yet.</p>
                  <p className="mt-3 text-mute">Pick a coffee for your first hour.</p>
                  <Link href="/shop" onClick={() => setIsOpen(false)} className="btn btn-ink mt-8">
                    Shop coffee
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-ink/15">
                  {items.map((item, index) => {
                    const mult = item.size === "500g" ? 1.8 : item.size === "1kg" ? 3.2 : 1;
                    return (
                      <li key={index} className="flex gap-4 py-5 first:pt-0">
                        <div className="w-20 shrink-0 bg-oat overflow-hidden self-start aspect-[4/5] relative">
                          <Bag
                            name={item.product.name}
                            origin={item.product.origin}
                            hour={item.product.hour}
                            className="h-auto absolute inset-x-3 top-3 w-[calc(100%-24px)]"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between gap-3">
                            <h3 className="font-display text-xl leading-tight">{item.product.name}</h3>
                            <span className="tabular-nums">${(item.product.price * mult * item.quantity).toFixed(2)}</span>
                          </div>
                          <p className="label text-mute mt-1">
                            {item.size} / {item.grind.replace("-", " ")}
                          </p>
                          <div className="flex items-center gap-4 mt-3">
                            <div className="flex items-center border border-ink/30">
                              <button
                                type="button"
                                onClick={() => updateQuantity(index, item.quantity - 1)}
                                className="size-9 hover:bg-oat transition-colors"
                                aria-label={`Decrease ${item.product.name} quantity`}
                              >
                                &minus;
                              </button>
                              <span className="w-8 text-center text-sm tabular-nums">{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(index, item.quantity + 1)}
                                className="size-9 hover:bg-oat transition-colors"
                                aria-label={`Increase ${item.product.name} quantity`}
                              >
                                +
                              </button>
                            </div>
                            <button type="button" onClick={() => removeFromCart(index)} className="label link-under py-2">
                              Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t rule px-6 py-6 space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="label">Subtotal</span>
                  <span className="font-display text-3xl tabular-nums">${subtotal.toFixed(2)}</span>
                </div>
                <Link href="/checkout" onClick={() => setIsOpen(false)} className="btn btn-dawn w-full py-4">
                  Checkout
                </Link>
                <Link href="/cart" onClick={() => setIsOpen(false)} className="label link-under block text-center py-2">
                  View bag
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
