"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/hooks/use-cart";
import { CheckCircle } from "lucide-react";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form State
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
      <div className="py-20 bg-ivory">
        <div className="max-w-xl mx-auto px-4 text-center space-y-6">
          <div className="flex justify-center text-sage">
            <CheckCircle size={64} />
          </div>
          <h1 className="text-3xl font-serif font-bold text-espresso uppercase tracking-wider">
            Thank You for Your Order!
          </h1>
          <p className="text-coffee leading-relaxed">
            We've received your order and are getting it ready for roasting. We'll send a confirmation
            email to <span className="font-semibold text-espresso">{formData.email}</span> with tracking
            details once it ships.
          </p>
          <div className="pt-6">
            <Link
              href="/"
              className="inline-block px-8 py-4 bg-espresso text-ivory hover:bg-espresso/90 transition-colors text-sm font-semibold uppercase tracking-wider"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div>
            <h1 className="text-2xl font-serif font-bold text-espresso uppercase tracking-wider mb-8">
              Checkout
            </h1>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div>
                <h2 className="text-sm font-semibold text-espresso uppercase tracking-wider mb-4">
                  Contact Information
                </h2>
                <div>
                  <label className="block text-xs uppercase font-medium text-coffee mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-sand bg-ivory text-espresso focus:outline-none focus:border-coffee"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-4">
                <h2 className="text-sm font-semibold text-espresso uppercase tracking-wider mb-2">
                  Shipping Address
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-medium text-coffee mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-sand bg-ivory text-espresso focus:outline-none focus:border-coffee"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-medium text-coffee mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-sand bg-ivory text-espresso focus:outline-none focus:border-coffee"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-medium text-coffee mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-sand bg-ivory text-espresso focus:outline-none focus:border-coffee"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-medium text-coffee mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-sand bg-ivory text-espresso focus:outline-none focus:border-coffee"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-medium text-coffee mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-sand bg-ivory text-espresso focus:outline-none focus:border-coffee"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-medium text-coffee mb-1">
                    Country
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-sand bg-ivory text-espresso focus:outline-none focus:border-coffee"
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-espresso text-ivory hover:bg-espresso/90 transition-colors text-sm font-bold uppercase tracking-widest"
              >
                Place Order · ${total.toFixed(2)}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-sand/10 border border-sand p-6 h-fit space-y-6">
            <h2 className="text-lg font-serif font-bold text-espresso uppercase tracking-wider">
              Order Summary
            </h2>

            <div className="divide-y divide-sand">
              {items.map((item, index) => {
                const sizeMultiplier = item.size === "500g" ? 1.8 : item.size === "1kg" ? 3.2 : 1;
                const itemPrice = item.product.price * sizeMultiplier;

                return (
                  <div key={index} className="py-4 flex gap-4">
                    <div className="relative w-16 h-16 bg-sand flex-shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-espresso text-sm">{item.product.name}</h3>
                      <p className="text-xs text-coffee">
                        {item.size} · {item.grind}
                      </p>
                      <p className="text-xs text-coffee">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium text-espresso">
                      ${(itemPrice * item.quantity).toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-sand pt-4 space-y-2 text-sm">
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
              <div className="border-t border-sand pt-2 flex justify-between text-base font-bold text-espresso">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
