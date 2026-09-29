import React from "react";
import Link from "next/link";
import { getFeaturedProducts } from "@/lib/data/products";
import { ProductCard } from "./product-card";

export const FeaturedProducts = () => {
  const featured = getFeaturedProducts();

  return (
    <section className="py-20 bg-ivory border-t border-sand/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-espresso uppercase tracking-wider">
              Shop the Roasts
            </h2>
            <p className="text-coffee text-sm mt-2">
              Our curated selection of freshly roasted, small-batch coffee.
            </p>
          </div>
          <Link
            href="/shop"
            className="text-espresso hover:text-coffee font-semibold text-sm uppercase tracking-wider mt-4 sm:mt-0 underline underline-offset-4"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
