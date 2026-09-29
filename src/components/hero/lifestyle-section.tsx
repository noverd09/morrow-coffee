import React from "react";
import Link from "next/link";
import Image from "next/image";

export const LifestyleSection = () => {
  return (
    <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1600&q=80"
        alt="Morning coffee ritual"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-espresso/30" />

      <div className="relative z-10 text-center text-ivory px-4 space-y-6">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold uppercase tracking-wider leading-tight">
          Your Morning,<br />Roasted Better.
        </h2>
        <Link
          href="/shop"
          className="inline-block px-8 py-4 bg-ivory text-espresso hover:bg-ivory/90 transition-colors text-sm font-bold uppercase tracking-widest mt-4"
        >
          Shop All Coffee
        </Link>
      </div>
    </section>
  );
};
