"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product, Size, Grind } from "@/lib/types";
import { useCart } from "@/lib/hooks/use-cart";
import { ChevronDown, Star } from "lucide-react";

interface ProductDetailsClientProps {
  product: Product;
}

export function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<Size>("250g");
  const [selectedGrind, setSelectedGrind] = useState<Grind>("whole-bean");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"details" | "brewing" | "shipping" | null>("details");

  const sizeMultiplier = selectedSize === "500g" ? 1.8 : selectedSize === "1kg" ? 3.2 : 1;
  const finalPrice = product.price * sizeMultiplier;

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedGrind, quantity);
  };

  return (
    <>
      {/* Product Info */}
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl lg:text-4xl font-serif font-bold text-espresso mb-2">
            {product.name}
          </h1>
          <div className="flex items-center gap-2">
            <div className="flex text-sage">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={16} fill="currentColor" />
              ))}
            </div>
            <span className="text-coffee text-sm">(24 reviews)</span>
          </div>
        </div>

        <div className="text-2xl font-bold text-espresso">${finalPrice.toFixed(2)}</div>

        <p className="text-coffee leading-relaxed">{product.description}</p>

        {/* Tasting Notes */}
        <div>
          <h3 className="text-sm font-semibold text-espresso uppercase tracking-wider mb-2">
            Tasting Notes
          </h3>
          <p className="text-coffee">{product.tastingNotes.join(" · ")}</p>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-coffee font-medium">Origin</p>
            <p className="text-espresso">{product.origin}</p>
          </div>
          <div>
            <p className="text-coffee font-medium">Process</p>
            <p className="text-espresso">{product.process}</p>
          </div>
          <div>
            <p className="text-coffee font-medium">Roast Level</p>
            <p className="text-espresso capitalize">{product.roastLevel}</p>
          </div>
          <div>
            <p className="text-coffee font-medium">Category</p>
            <p className="text-espresso capitalize">{product.category}</p>
          </div>
        </div>

        {/* Size Selector */}
        <div>
          <label className="block text-sm font-semibold text-espresso uppercase tracking-wider mb-3">
            Size
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(["250g", "500g", "1kg"] as Size[]).map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`py-3 border-2 text-sm font-medium uppercase tracking-wider transition-colors ${
                  selectedSize === size
                    ? "bg-espresso text-ivory border-espresso"
                    : "border-sand text-coffee hover:border-coffee"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Grind Selector */}
        <div>
          <label className="block text-sm font-semibold text-espresso uppercase tracking-wider mb-3">
            Grind
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(["whole-bean", "espresso", "filter"] as Grind[]).map((grind) => (
              <button
                key={grind}
                onClick={() => setSelectedGrind(grind)}
                className={`py-3 border-2 text-xs font-medium uppercase tracking-wider transition-colors ${
                  selectedGrind === grind
                    ? "bg-espresso text-ivory border-espresso"
                    : "border-sand text-coffee hover:border-coffee"
                }`}
              >
                {grind}
              </button>
            ))}
          </div>
        </div>

        {/* Purchase Type */}
        <div>
          <label className="block text-sm font-semibold text-espresso uppercase tracking-wider mb-3">
            Purchase Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button className="py-3 border-2 border-espresso bg-espresso text-ivory text-sm font-medium uppercase tracking-wider">
              One-Time
            </button>
            <button className="py-3 border-2 border-sand text-coffee text-sm font-medium uppercase tracking-wider hover:border-coffee">
              Subscribe & Save 15%
            </button>
          </div>
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-semibold text-espresso uppercase tracking-wider">
            Quantity
          </label>
          <div className="flex items-center border-2 border-sand">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 py-2 hover:bg-sand/30 text-espresso"
            >
              −
            </button>
            <span className="px-6 py-2 font-medium text-espresso">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-4 py-2 hover:bg-sand/30 text-espresso"
            >
              +
            </button>
          </div>
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="w-full py-4 bg-espresso text-ivory hover:bg-espresso/90 transition-colors text-sm font-bold uppercase tracking-widest"
        >
          Add to Cart
        </button>
      </div>

      {/* Accordion Details */}
      <div className="mt-16 max-w-3xl mx-auto col-span-full">
        <div className="border-t border-sand">
          {/* Details Tab */}
          <button
            onClick={() => setActiveTab(activeTab === "details" ? null : "details")}
            className="w-full flex justify-between items-center py-4 text-left border-b border-sand"
          >
            <span className="font-semibold text-espresso uppercase tracking-wider text-sm">
              Product Details
            </span>
            <ChevronDown
              className={`transition-transform ${activeTab === "details" ? "rotate-180" : ""}`}
            />
          </button>
          {activeTab === "details" && (
            <div className="py-4 text-coffee text-sm leading-relaxed space-y-2">
              <p>
                <strong>Origin:</strong> {product.origin}
              </p>
              <p>
                <strong>Process:</strong> {product.process}
              </p>
              <p>
                <strong>Roast:</strong> {product.roastLevel}
              </p>
              <p>
                <strong>Altitude:</strong> 1,400-1,800 MASL
              </p>
              <p>
                <strong>Harvest:</strong> October - February
              </p>
            </div>
          )}

          {/* Brewing Tab */}
          <button
            onClick={() => setActiveTab(activeTab === "brewing" ? null : "brewing")}
            className="w-full flex justify-between items-center py-4 text-left border-b border-sand"
          >
            <span className="font-semibold text-espresso uppercase tracking-wider text-sm">
              Brewing Information
            </span>
            <ChevronDown
              className={`transition-transform ${activeTab === "brewing" ? "rotate-180" : ""}`}
            />
          </button>
          {activeTab === "brewing" && (
            <div className="py-4 text-coffee text-sm leading-relaxed space-y-2">
              <p>
                <strong>Recommended for:</strong> Pour over, drip, French press, espresso
              </p>
              <p>
                <strong>Water temp:</strong> 195-205°F (90-96°C)
              </p>
              <p>
                <strong>Ratio:</strong> 1:16 (coffee:water)
              </p>
            </div>
          )}

          {/* Shipping Tab */}
          <button
            onClick={() => setActiveTab(activeTab === "shipping" ? null : "shipping")}
            className="w-full flex justify-between items-center py-4 text-left border-b border-sand"
          >
            <span className="font-semibold text-espresso uppercase tracking-wider text-sm">
              Shipping & Returns
            </span>
            <ChevronDown
              className={`transition-transform ${activeTab === "shipping" ? "rotate-180" : ""}`}
            />
          </button>
          {activeTab === "shipping" && (
            <div className="py-4 text-coffee text-sm leading-relaxed space-y-2">
              <p>Free shipping on orders over $50.</p>
              <p>Orders ship within 1-2 business days.</p>
              <p>30-day return policy for unopened bags.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
