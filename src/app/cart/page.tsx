"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/hooks/use-cart";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, subtotal } = useCart();

  const shippingThreshold = 50;
  const shippingCost = subtotal >= shippingThreshold || items.length === 0 ? 0 : 5.0;
  const total = subtotal + shippingCost;

  return (
    <div className="py-12 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-bold text-espresso uppercase tracking-wider mb-8 text-center sm:text-left">
          Your Cart
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-sand/20 border border-sand">
            <p className="text-coffee text-lg mb-6">Your cart is currently empty.</p>
            <Link
              href="/shop"
              className="inline-block px-8 py-4 bg-espresso text-ivory hover:bg-espresso/90 transition-colors text-sm font-semibold uppercase tracking-wider"
            >
              Explore Our Coffees
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item, index) => {
                const sizeMultiplier = item.size === "500g" ? 1.8 : item.size === "1kg" ? 3.2 : 1;
                const itemPrice = item.product.price * sizeMultiplier;

                return (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row gap-6 p-6 bg-sand/10 border border-sand"
                  >
                    <div className="relative w-full sm:w-32 aspect-square bg-sand flex-shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <Link href={`/product/${item.product.slug}`}>
                            <h3 className="font-serif text-lg font-bold text-espresso hover:text-coffee transition-colors">
                              {item.product.name}
                            </h3>
                          </Link>
                          <span className="font-bold text-espresso">
                            ${(itemPrice * item.quantity).toFixed(2)}
                          </span>
                        </div>
                        <p className="text-coffee text-sm mt-1">
                          Size: <span className="text-espresso font-medium">{item.size}</span> | Grind:{" "}
                          <span className="text-espresso font-medium">{item.grind}</span>
                        </p>
                      </div>

                      <div className="flex justify-between items-center mt-6">
                        <div className="flex items-center border border-sand">
                          <button
                            onClick={() => updateQuantity(index, item.quantity - 1)}
                            className="px-3 py-1 text-espresso hover:bg-sand/30"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-4 py-1 text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(index, item.quantity + 1)}
                            className="px-3 py-1 text-espresso hover:bg-sand/30"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-coffee hover:text-espresso flex items-center gap-1 text-sm"
                        >
                          <Trash2 size={16} />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="bg-sand/20 border border-sand p-6 h-fit space-y-6">
              <h2 className="text-xl font-serif font-bold text-espresso uppercase tracking-wider">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-coffee">
                  <span>Subtotal</span>
                  <span className="text-espresso font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-coffee">
                  <span>Shipping</span>
                  <span className="text-espresso font-medium">
                    {shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                {shippingCost > 0 && (
                  <p className="text-xs text-coffee">
                    Add ${(shippingThreshold - subtotal).toFixed(2)} more for free shipping
                  </p>
                )}
                <div className="border-t border-sand pt-3 flex justify-between text-base font-bold text-espresso">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="block w-full py-4 bg-espresso text-ivory hover:bg-espresso/90 transition-colors text-center text-sm font-bold uppercase tracking-widest"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
