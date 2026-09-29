"use client";

import React, { useState } from "react";
import { products } from "@/lib/data/products";
import { ProductCard } from "@/components/products/product-card";
import { Category, RoastLevel } from "@/lib/types";

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");
  const [selectedRoast, setSelectedRoast] = useState<RoastLevel | "all">("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high">("featured");

  // Filtering
  const filteredProducts = products.filter((product) => {
    if (selectedCategory !== "all" && product.category !== selectedCategory) {
      return false;
    }
    if (selectedRoast !== "all" && product.roastLevel !== selectedRoast) {
      return false;
    }
    return true;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    return a.featured ? -1 : 1;
  });

  return (
    <div className="py-12 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl font-serif font-bold text-espresso uppercase tracking-wider mb-4">
            Shop Coffee
          </h1>
          <p className="text-coffee">
            Small-batch, ethically sourced coffee roasted fresh weekly.
          </p>
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-sand mb-12">
          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-semibold text-espresso">Type:</span>
              <div className="flex gap-1">
                {(["all", "espresso", "filter"] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 text-xs uppercase tracking-wider font-medium border transition-colors ${
                      selectedCategory === cat
                        ? "bg-espresso text-ivory border-espresso"
                        : "border-sand text-coffee hover:border-coffee"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Roast Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-semibold text-espresso">Roast:</span>
              <div className="flex gap-1">
                {(["all", "light", "medium", "dark"] as const).map((roast) => (
                  <button
                    key={roast}
                    onClick={() => setSelectedRoast(roast)}
                    className={`px-3 py-1 text-xs uppercase tracking-wider font-medium border transition-colors ${
                      selectedRoast === roast
                        ? "bg-espresso text-ivory border-espresso"
                        : "border-sand text-coffee hover:border-coffee"
                    }`}
                  >
                    {roast}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-semibold text-espresso">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent border border-sand px-3 py-1 text-xs text-espresso focus:outline-none focus:border-coffee uppercase tracking-wider"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-coffee">No coffees match your filter selection.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
