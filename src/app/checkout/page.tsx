"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Bag } from "@/components/brand/bag";
import { PageHead } from "@/components/ui/page-head";
import { useCart } from "@/lib/hooks/use-cart";

const Field = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  autoComplete,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  placeholder?: string;
}) => (
  <label className="block">
    <span className="label text-mute">{label}</span>
    <input
      className="field"
      type={type}
      name={name}
      required
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
      placeholder={placeholder}
    />
  </label>
);

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "United States",
  });

  const shippingCost = subtotal >= 50 || items.length === 0 ? 0 : 5.0;
  const total = subtotal + shippingCost;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    clearCart();
  };

  if (isSubmitted) {
    return (
      <div className="bg-sun min-h-[70vh] flex items-center">
        <div className="wrap section-md">
          <p className="label mb-6">Order placed</p>
          <h1 className="t-display text-[clamp(3rem,10vw,9rem)]">
            Thank you. <em>See you at sunrise.</em>
          </h1>
          <p className="mt-8 max-w-xl text-lg">
            We have your order and are getting it ready for roasting. A confirmation will go to{" "}
            <span className="font-medium">{formData.email}</span>, with tracking details once it ships.
          </p>
          <Link href="/" className="btn btn-ink mt-10">
            Back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageHead label="Checkout" title={<>Almost <em>there.</em></>} />

      <div className="wrap pb-24 md:pb-32">
        <div className="grid gap-14 lg:grid-cols-[1fr_440px] lg:gap-24 items-start">
          <form onSubmit={handleSubmit} className="space-y-12">
            <fieldset className="space-y-6">
              <legend className="t-h3 mb-6">Contact</legend>
              <Field
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                placeholder="you@example.com"
              />
            </fieldset>

            <fieldset className="space-y-6">
              <legend className="t-h3 mb-6">Shipping address</legend>
              <div className="grid grid-cols-2 gap-6">
                <Field label="First name" name="firstName" value={formData.firstName} onChange={handleChange} autoComplete="given-name" />
                <Field label="Last name" name="lastName" value={formData.lastName} onChange={handleChange} autoComplete="family-name" />
              </div>
              <Field label="Address" name="address" value={formData.address} onChange={handleChange} autoComplete="street-address" />
              <div className="grid grid-cols-2 gap-6">
                <Field label="City" name="city" value={formData.city} onChange={handleChange} autoComplete="address-level2" />
                <Field label="Postal code" name="postalCode" value={formData.postalCode} onChange={handleChange} autoComplete="postal-code" />
              </div>
              <label className="block">
                <span className="label text-mute">Country</span>
                <select name="country" value={formData.country} onChange={handleChange} className="field" autoComplete="country-name">
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                  <option>Australia</option>
                </select>
              </label>
            </fieldset>

            <button type="submit" disabled={items.length === 0} className="btn btn-dawn w-full py-5">
              Place order / ${total.toFixed(2)}
            </button>
          </form>

          <aside className="bg-oat p-8 space-y-6 lg:sticky lg:top-28" aria-label="Order summary">
            <h2 className="t-h3">Order summary</h2>

            {items.length === 0 ? (
              <p className="text-mute">
                Your bag is empty. <Link href="/shop" className="underline">Shop coffee</Link>
              </p>
            ) : (
              <ul className="divide-y divide-ink/15">
                {items.map((item, index) => {
                  const mult = item.size === "500g" ? 1.8 : item.size === "1kg" ? 3.2 : 1;
                  return (
                    <li key={index} className="py-4 first:pt-0 flex gap-4">
                      <div className="relative w-16 aspect-[4/5] bg-paper shrink-0 overflow-hidden">
                        <Bag
                          name={item.product.name}
                          origin={item.product.origin}
                          hour={item.product.hour}
                          className="absolute inset-x-1.5 top-2 w-[calc(100%-12px)] h-auto"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display text-xl leading-tight">{item.product.name}</h3>
                        <p className="label text-mute mt-1">
                          {item.size} / {item.grind.replace("-", " ")} / x{item.quantity}
                        </p>
                      </div>
                      <span className="tabular-nums">${(item.product.price * mult * item.quantity).toFixed(2)}</span>
                    </li>
                  );
                })}
              </ul>
            )}

            <dl className="border-t rule pt-5 space-y-3">
              <div className="flex justify-between">
                <dt className="label text-mute">Subtotal</dt>
                <dd className="tabular-nums">${subtotal.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="label text-mute">Shipping</dt>
                <dd className="tabular-nums">{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</dd>
              </div>
              <div className="flex justify-between items-baseline border-t rule pt-4">
                <dt className="label">Total</dt>
                <dd className="font-display text-3xl tabular-nums">${total.toFixed(2)}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </>
  );
}
