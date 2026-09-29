import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { products, getProductBySlug } from "@/lib/data/products";
import { ProductDetailsClient } from "@/components/products/product-details-client";
import { ProductCard } from "@/components/products/product-card";
import { Bag } from "@/components/brand/bag";
import { formatHour, onSky, phaseName, skyColor } from "@/lib/sky";

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const sky = skyColor(product.hour);
  const fg = onSky(sky);

  const neighbours = products
    .filter((p) => p.id !== product.id)
    .sort((a, b) => Math.abs(a.hour - product.hour) - Math.abs(b.hour - product.hour))
    .slice(0, 3);

  return (
    <>
      <div className="wrap pt-6 pb-4">
        <Link href="/shop" className="label link-under">
          &larr; All coffee
        </Link>
      </div>

      <div className="wrap pb-20 md:pb-28">
        <div className="grid gap-10 lg:gap-16 lg:grid-cols-2 items-start">
          <div
            className="relative lg:sticky lg:top-28 aspect-[4/5] overflow-hidden"
            style={{ backgroundColor: sky, color: fg }}
          >
            <p className="label absolute top-5 left-5">
              {formatHour(product.hour)} / {phaseName(product.hour)}
            </p>
            <Bag
              name={product.name}
              origin={product.origin}
              hour={product.hour}
              className="absolute left-1/2 -translate-x-1/2 bottom-8 w-[62%] h-auto"
            />
          </div>

          <ProductDetailsClient product={product} />
        </div>
      </div>

      <section className="bg-oat section-md">
        <div className="wrap">
          <p className="label mb-4">Neighbouring hours</p>
          <h2 className="t-h2 mb-12 max-w-3xl">Drink these at the hours around it.</h2>
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {neighbours.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
