"use client";

import React from "react";
import Link from "next/link";
import { Bag } from "@/components/brand/bag";
import { PageHead } from "@/components/ui/page-head";
import { useCart } from "@/lib/hooks/use-cart";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, subtotal } = useCart();

  const shippingThreshold = 50;
  const shippingCost = subtotal >= shippingThreshold || items.length === 0 ? 0 : 5.0;
  const total = subtotal + shippingCost;

  return (
    <>
      <PageHead label="Your bag" title={<>Your <em>bag.</em></>} />

      <div className="wrap pb-24 md:pb-32">
        {items.length === 0 ? (
          <div className="border-t rule pt-12">
            <p className="t-h3 max-w-md">Nothing in your bag yet.</p>
            <p className="mt-3 text-mute">Pick a coffee for your first hour.</p>
            <Link href="/shop" className="btn btn-ink mt-8">
              Explore our coffees
            </Link>
          </div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-[1fr_400px] lg:gap-20 items-start">
            <ul className="border-t rule">
              {items.map((item, index) => {
                const mult = item.size === "500g" ? 1.8 : item.size === "1kg" ? 3.2 : 1;
                const itemPrice = item.product.price * mult;

                return (
                  <li key={index} className="flex gap-5 sm:gap-8 py-8 border-b rule">
                    <div className="w-24 sm:w-36 shrink-0 bg-oat relative aspect-[4/5] overflow-hidden self-start">
                      <Bag
                        name={item.product.name}
                        origin={item.product.origin}
                        hour={item.product.hour}
                        className="absolute inset-x-[14%] top-[10%] w-[72%] h-auto"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between gap-6">
                      <div className="flex justify-between gap-4">
                        <div>
                          <h2 className="t-h3">
                            <Link href={`/product/${item.product.slug}`} className="link-under">
                              {item.product.name}
                            </Link>
                          </h2>
                          <p className="label text-mute mt-2">
                            {item.size} / {item.grind.replace("-", " ")}
                          </p>
                        </div>
                        <p className="font-display text-2xl tabular-nums">${(itemPrice * item.quantity).toFixed(2)}</p>
                      </div>

                      <div className="flex items-center gap-5">
                        <div className="flex items-center border border-ink/30">
                          <button
                            type="button"
                            onClick={() => updateQuantity(index, item.quantity - 1)}
                            className="size-11 hover:bg-oat transition-colors"
                            aria-label={`Decrease ${item.product.name} quantity`}
                          >
                            &minus;
                          </button>
                          <span className="w-10 text-center tabular-nums">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(index, item.quantity + 1)}
                            className="size-11 hover:bg-oat transition-colors"
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

            <aside className="bg-oat p-8 space-y-6 lg:sticky lg:top-28" aria-label="Order summary">
              <h2 className="t-h3">Order summary</h2>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="label text-mute">Subtotal</dt>
                  <dd className="tabular-nums">${subtotal.toFixed(2)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="label text-mute">Shipping</dt>
                  <dd className="tabular-nums">{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</dd>
                </div>
                {shippingCost > 0 && (
                  <p className="label text-mute">Add ${(shippingThreshold - subtotal).toFixed(2)} for free shipping</p>
                )}
                <div className="flex justify-between items-baseline border-t rule pt-4">
                  <dt className="label">Total</dt>
                  <dd className="font-display text-3xl tabular-nums">${total.toFixed(2)}</dd>
                </div>
              </dl>
              <Link href="/checkout" className="btn btn-dawn w-full py-4">
                Proceed to checkout
              </Link>
            </aside>
          </div>
        )}
      </div>
    </>
  );
}
