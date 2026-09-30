"use client";

import React, { useState } from "react";
import { Product, Size, Grind } from "@/lib/types";
import { useCart } from "@/lib/hooks/use-cart";
import { ChevronDown } from "lucide-react";

interface ProductDetailsClientProps {
  product: Product;
}

type Panel = "details" | "brewing" | "shipping";

const sizes: Size[] = ["250g", "500g", "1kg"];
const grinds: Grind[] = ["whole-bean", "espresso", "filter"];

export function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<Size>("250g");
  const [selectedGrind, setSelectedGrind] = useState<Grind>("whole-bean");
  const [quantity, setQuantity] = useState(1);
  const [openPanel, setOpenPanel] = useState<Panel | null>("details");

  const sizeMultiplier = selectedSize === "500g" ? 1.8 : selectedSize === "1kg" ? 3.2 : 1;
  const finalPrice = product.price * sizeMultiplier;

  const panels: { id: Panel; title: string; body: React.ReactNode }[] = [
    {
      id: "details",
      title: "Product details",
      body: (
        <dl className="grid grid-cols-[8rem_1fr] gap-y-2">
          <dt className="label text-mute pt-1">Origin</dt>
          <dd>{product.origin}</dd>
          <dt className="label text-mute pt-1">Process</dt>
          <dd>{product.process}</dd>
          <dt className="label text-mute pt-1">Roast</dt>
          <dd className="capitalize">{product.roastLevel}</dd>
          <dt className="label text-mute pt-1">Best for</dt>
          <dd className="capitalize">{product.category}</dd>
        </dl>
      ),
    },
    {
      id: "brewing",
      title: "Brewing",
      body: (
        <dl className="grid grid-cols-[8rem_1fr] gap-y-2">
          <dt className="label text-mute pt-1">Methods</dt>
          <dd>Pour over, drip, French press, espresso</dd>
          <dt className="label text-mute pt-1">Water</dt>
          <dd>195 to 205&deg;F (90 to 96&deg;C)</dd>
          <dt className="label text-mute pt-1">Ratio</dt>
          <dd>1:16 coffee to water</dd>
        </dl>
      ),
    },
    {
      id: "shipping",
      title: "Shipping and returns",
      body: (
        <ul className="space-y-2">
          <li>Free shipping on orders over $50.</li>
          <li>Orders ship within 1 to 2 business days.</li>
          <li>30-day return policy for unopened bags.</li>
        </ul>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="label text-mute mb-4">
          {product.origin} / {product.process}
        </p>
        <h1 className="t-display text-[clamp(3rem,6vw,5.5rem)]">{product.name}</h1>
        <p className="font-display text-4xl mt-5" aria-live="polite">
          ${finalPrice.toFixed(2)}
        </p>
      </div>

      <p className="text-lg max-w-xl">{product.description}</p>

      <div>
        <p className="label text-mute mb-3">Tasting notes</p>
        <ul className="flex flex-wrap gap-2">
          {product.tastingNotes.map((n) => (
            <li key={n} className="font-display italic text-2xl border-b border-dawn pr-2">
              {n}
            </li>
          ))}
        </ul>
      </div>

      <fieldset>
        <legend className="label text-mute mb-3">Size</legend>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((s) => (
            <button key={s} type="button" className="chip py-3" aria-pressed={selectedSize === s} onClick={() => setSelectedSize(s)}>
              {s}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="label text-mute mb-3">Grind</legend>
        <div className="grid grid-cols-3 gap-2">
          {grinds.map((g) => (
            <button key={g} type="button" className="chip py-3" aria-pressed={selectedGrind === g} onClick={() => setSelectedGrind(g)}>
              {g.replace("-", " ")}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="label text-mute mb-3">Purchase</legend>
        <div className="grid grid-cols-2 gap-2">
          <button type="button" className="chip py-3" aria-pressed="true">
            One time
          </button>
          <button type="button" className="chip py-3" aria-pressed="false" disabled>
            Subscribe, coming soon
          </button>
        </div>
      </fieldset>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center border border-ink/30 self-start">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="size-12 hover:bg-oat transition-colors"
            aria-label="Decrease quantity"
          >
            &minus;
          </button>
          <span className="w-10 text-center tabular-nums" aria-live="polite">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="size-12 hover:bg-oat transition-colors"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <button
          type="button"
          onClick={() => addToCart(product, selectedSize, selectedGrind, quantity)}
          className="btn btn-dawn flex-1 py-4"
        >
          Add to bag / ${(finalPrice * quantity).toFixed(2)}
        </button>
      </div>

      <div className="border-t rule mt-4">
        {panels.map((p) => {
          const open = openPanel === p.id;
          return (
            <div key={p.id} className="border-b rule">
              <h2>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`panel-${p.id}`}
                  onClick={() => setOpenPanel(open ? null : p.id)}
                  className="w-full flex items-center justify-between py-5 label"
                >
                  {p.title}
                  <ChevronDown size={18} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
                </button>
              </h2>
              {open && (
                <div id={`panel-${p.id}`} className="pb-6 text-mute">
                  {p.body}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
