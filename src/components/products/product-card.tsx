"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bag } from "@/components/brand/bag";
import { Product } from "@/lib/types";
import { useCart } from "@/lib/hooks/use-cart";
import { formatHour, phaseName } from "@/lib/sky";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const { addToCart } = useCart();

  return (
    <motion.article
      className="group flex flex-col"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: (index % 3) * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/product/${product.slug}`}
        className="relative block bg-oat aspect-[4/5] overflow-hidden"
        aria-label={`${product.name}, ${product.origin}`}
      >
        <span className="label absolute top-4 left-4 z-10">{formatHour(product.hour)}</span>
        <span className="label absolute top-4 right-4 z-10 text-mute">{phaseName(product.hour)}</span>
        <Bag
          name={product.name}
          origin={product.origin}
          hour={product.hour}
          className="absolute left-1/2 -translate-x-1/2 bottom-5 w-[62%] h-auto transition-transform duration-500 ease-out group-hover:-translate-y-2 motion-reduce:transition-none"
        />
      </Link>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="t-h3">
            <Link href={`/product/${product.slug}`} className="link-under">
              {product.name}
            </Link>
          </h3>
          <p className="label text-mute mt-2">{product.origin}</p>
        </div>
        <p className="font-display text-2xl">${product.price}</p>
      </div>

      <p className="mt-3 text-mute">{product.tastingNotes.join(", ")}</p>

      <button
        type="button"
        onClick={() => addToCart(product, "250g", "whole-bean", 1)}
        className="btn btn-line mt-5 w-full"
      >
        Add to bag
      </button>
    </motion.article>
  );
};
