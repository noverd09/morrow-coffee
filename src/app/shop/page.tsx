"use client";

import React, { useState } from "react";
import { products } from "@/lib/data/products";
import { ProductCard } from "@/components/products/product-card";
import { PageHead } from "@/components/ui/page-head";
import { Category, RoastLevel } from "@/lib/types";

type SortKey = "hour" | "price-low" | "price-high";

const Group = ({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="flex items-center gap-3 flex-wrap" role="group" aria-label={label}>
    <span className="label text-mute">{label}</span>
    <div className="flex gap-1.5 flex-wrap">
      {options.map((o) => (
        <button key={o} type="button" className="chip" aria-pressed={value === o} onClick={() => onChange(o)}>
          {o}
        </button>
      ))}
    </div>
  </div>
);

export default function ShopPage() {
  const [category, setCategory] = useState<Category | "all">("all");
  const [roast, setRoast] = useState<RoastLevel | "all">("all");
  const [sortBy, setSortBy] = useState<SortKey>("hour");

  const visible = products
    .filter((p) => (category === "all" || p.category === category) && (roast === "all" || p.roastLevel === roast))
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return a.hour - b.hour;
    });

  return (
    <>
      <PageHead
        label="The shop"
        title={
          <>
            All coffee, <em>by the hour.</em>
          </>
        }
        intro="Small-batch, ethically sourced coffee roasted fresh weekly. Sorted from before light to high morning."
      />

      <div className="wrap">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between py-6 border-y rule">
          <div className="flex flex-col gap-4 md:flex-row md:gap-8">
            <Group
              label="Type"
              options={["all", "espresso", "filter"] as const}
              value={category}
              onChange={(v) => setCategory(v as Category | "all")}
            />
            <Group
              label="Roast"
              options={["all", "light", "medium", "dark"] as const}
              value={roast}
              onChange={(v) => setRoast(v as RoastLevel | "all")}
            />
          </div>
          <label className="flex items-center gap-3">
            <span className="label text-mute">Sort</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className="label bg-transparent border border-ink/30 px-3 py-2.5 focus:border-ink"
            >
              <option value="hour">Hour of morning</option>
              <option value="price-low">Price, low to high</option>
              <option value="price-high">Price, high to low</option>
            </select>
          </label>
        </div>

        <p className="label text-mute mt-6" aria-live="polite">
          {visible.length} {visible.length === 1 ? "coffee" : "coffees"}
        </p>

        {visible.length === 0 ? (
          <p className="py-24 t-h3 text-mute">No coffees match that filter. Try a different roast.</p>
        ) : (
          <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 mt-8 pb-24 md:pb-32">
            {visible.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
