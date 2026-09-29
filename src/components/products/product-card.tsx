"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";
import { useCart } from "@/lib/hooks/use-cart";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, "250g", "whole-bean", 1);
  };

  return (
    <div className="group flex flex-col">
      <Link href={`/product/${product.slug}`} className="block relative aspect-[4/5] bg-sand overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Roast badge */}
        <div className="absolute top-3 left-3 bg-ivory/90 backdrop-blur-sm px-2.5 py-1 text-xs uppercase tracking-wider font-semibold text-espresso">
          {product.roastLevel}
        </div>
      </Link>

      <div className="mt-4 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-2">
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-serif text-lg font-bold text-espresso group-hover:text-coffee transition-colors">
              {product.name}
            </h3>
          </Link>
          <span className="font-medium text-espresso">${product.price}</span>
        </div>

        <p className="text-coffee text-xs uppercase tracking-wider mt-1">{product.origin}</p>

        <p className="text-coffee/80 text-xs mt-2 line-clamp-1">
          {product.tastingNotes.join(" · ")}
        </p>

        <button
          onClick={handleQuickAdd}
          className="mt-4 w-full py-2.5 border border-espresso text-espresso hover:bg-espresso hover:text-ivory transition-colors text-xs font-semibold uppercase tracking-wider"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
