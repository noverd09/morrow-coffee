"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Minus, Plus } from "lucide-react";
import { useCart } from "@/lib/hooks/use-cart";

export const CartDrawer = () => {
  const { items, isOpen, setIsOpen, updateQuantity, removeFromCart, subtotal } = useCart();

  const shippingThreshold = 50;
  const remainingForFreeShipping = Math.max(0, shippingThreshold - subtotal);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-espresso/40 z-50 transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-ivory z-50 shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-sand">
          <h2 className="text-xl font-serif font-bold text-espresso uppercase tracking-wider">
            Cart
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-espresso hover:text-coffee transition-colors"
            aria-label="Close cart"
          >
            <X size={24} />
          </button>
        </div>

        {/* Free shipping banner */}
        {items.length > 0 && (
          <div className="px-6 py-3 bg-sand/30 text-sm text-coffee">
            {remainingForFreeShipping > 0 ? (
              <>
                Add <span className="font-semibold text-espresso">${remainingForFreeShipping.toFixed(2)}</span> more for free shipping
              </>
            ) : (
              <span className="text-sage font-medium">🎉 You qualify for free shipping!</span>
            )}
          </div>
        )}

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-coffee mb-4">Your cart is empty</p>
              <Link
                href="/shop"
                onClick={() => setIsOpen(false)}
                className="inline-block px-6 py-3 bg-espresso text-ivory hover:bg-espresso/90 transition-colors text-sm font-medium uppercase tracking-wider"
              >
                Shop Coffee
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item, index) => {
                const sizeMultiplier = item.size === "500g" ? 1.8 : item.size === "1kg" ? 3.2 : 1;
                const itemPrice = item.product.price * sizeMultiplier;

                return (
                  <div key={index} className="flex gap-4">
                    <div className="relative w-20 h-20 bg-sand flex-shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-espresso font-medium text-sm mb-1">
                        {item.product.name}
                      </h3>
                      <p className="text-coffee text-xs mb-2">
                        {item.size} · {item.grind}
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-sand">
                          <button
                            onClick={() => updateQuantity(index, item.quantity - 1)}
                            className="p-1 hover:bg-sand/30 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(index, item.quantity + 1)}
                            className="p-1 hover:bg-sand/30 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-coffee hover:text-espresso text-xs underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="text-espresso font-medium text-sm">
                      ${(itemPrice * item.quantity).toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-sand p-6 space-y-4">
            <div className="flex justify-between text-espresso">
              <span className="font-medium">Subtotal</span>
              <span className="font-bold text-lg">${subtotal.toFixed(2)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={() => setIsOpen(false)}
              className="block w-full py-4 bg-espresso text-ivory hover:bg-espresso/90 transition-colors text-center text-sm font-bold uppercase tracking-widest"
            >
              Checkout
            </Link>
            <Link
              href="/cart"
              onClick={() => setIsOpen(false)}
              className="block text-center text-coffee hover:text-espresso text-sm underline"
            >
              View Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
