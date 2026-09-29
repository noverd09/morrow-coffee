"use client";

import React, { useState } from "react";
import Link from "next/link";
import { products } from "@/lib/data/products";
import { Product, RoastLevel } from "@/lib/types";

export const CoffeeFinder = () => {
  const [selectedRoast, setSelectedRoast] = useState<RoastLevel | null>(null);
  const [selectedFlavor, setSelectedFlavor] = useState<string | null>(null);
  const [recommendation, setRecommendation] = useState<Product | null>(null);

  const findCoffee = () => {
    let filtered = products;

    // Filter by roast
    if (selectedRoast) {
      filtered = filtered.filter((p) => p.roastLevel === selectedRoast);
    }

    // Filter by flavor profile
    if (selectedFlavor === "fruity") {
      filtered = filtered.filter((p) =>
        p.tastingNotes.some((note) =>
          ["strawberry", "blackcurrant", "plum", "red apple", "grapefruit"].some((fruit) =>
            note.toLowerCase().includes(fruit)
          )
        )
      );
    } else if (selectedFlavor === "chocolatey") {
      filtered = filtered.filter((p) =>
        p.tastingNotes.some((note) =>
          ["chocolate", "cocoa", "caramel", "toffee"].some((sweet) =>
            note.toLowerCase().includes(sweet)
          )
        )
      );
    }

    // Return first match or random if multiple
    if (filtered.length > 0) {
      setRecommendation(filtered[Math.floor(Math.random() * filtered.length)]);
    }
  };

  React.useEffect(() => {
    if (selectedRoast && selectedFlavor) {
      findCoffee();
    }
  }, [selectedRoast, selectedFlavor]);

  return (
    <section className="py-20 bg-ivory">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-espresso uppercase tracking-wider mb-8">
          Find Your Coffee
        </h2>

        <div className="space-y-10">
          {/* Roast Level */}
          <div>
            <label className="block text-sm font-semibold text-espresso uppercase tracking-wider mb-4">
              Roast
            </label>
            <div className="flex justify-center gap-4 flex-wrap">
              {(["light", "medium", "dark"] as RoastLevel[]).map((roast) => (
                <button
                  key={roast}
                  onClick={() => setSelectedRoast(roast)}
                  className={`px-6 py-3 border-2 transition-colors text-sm font-medium uppercase tracking-wider ${
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

          {/* Flavor Profile */}
          <div>
            <label className="block text-sm font-semibold text-espresso uppercase tracking-wider mb-4">
              Flavor
            </label>
            <div className="flex justify-center gap-4 flex-wrap">
              {["fruity", "balanced", "chocolatey"].map((flavor) => (
                <button
                  key={flavor}
                  onClick={() => setSelectedFlavor(flavor)}
                  className={`px-6 py-3 border-2 transition-colors text-sm font-medium uppercase tracking-wider ${
                    selectedFlavor === flavor
                      ? "bg-espresso text-ivory border-espresso"
                      : "border-sand text-coffee hover:border-coffee"
                  }`}
                >
                  {flavor}
                </button>
              ))}
            </div>
          </div>

          {/* Recommendation */}
          {recommendation && (
            <div className="mt-12 p-8 bg-sand/30 border border-sand">
              <p className="text-sm text-coffee uppercase tracking-wider mb-2">
                We recommend
              </p>
              <h3 className="text-2xl font-serif font-bold text-espresso mb-2">
                {recommendation.name}
              </h3>
              <p className="text-coffee mb-4">
                {recommendation.tastingNotes.join(" · ")}
              </p>
              <Link
                href={`/product/${recommendation.slug}`}
                className="inline-block px-6 py-3 bg-espresso text-ivory hover:bg-espresso/90 transition-colors text-sm font-semibold uppercase tracking-wider"
              >
                View Coffee
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
