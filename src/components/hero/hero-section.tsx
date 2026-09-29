import React from "react";
import Link from "next/link";
import Image from "next/image";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-espresso leading-tight tracking-tight">
              Good Coffee.<br />
              Slow Mornings.
            </h1>
            <p className="text-lg text-coffee max-w-lg leading-relaxed">
              Small-batch coffee roasted for everyday rituals. Sourced with care from independent farms around the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/shop"
                className="px-8 py-4 bg-espresso text-ivory hover:bg-espresso/90 transition-colors text-center text-sm font-semibold uppercase tracking-widest"
              >
                Shop Coffee
              </Link>
              <Link
                href="/our-story"
                className="px-8 py-4 border border-espresso text-espresso hover:bg-espresso hover:text-ivory transition-colors text-center text-sm font-semibold uppercase tracking-widest"
              >
                Our Story
              </Link>
            </div>
          </div>

          {/* Editorial Image */}
          <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none">
            <Image
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80"
              alt="Morrow Coffee Pour Over"
              fill
              className="object-cover shadow-lg"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};
