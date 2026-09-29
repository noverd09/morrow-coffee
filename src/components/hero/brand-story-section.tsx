import React from "react";
import Link from "next/link";
import Image from "next/image";

export const BrandStorySection = () => {
  return (
    <section className="py-24 bg-sand/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative aspect-[5/6] order-2 lg:order-1">
            <Image
              src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1200&q=80"
              alt="Coffee roasting"
              fill
              className="object-cover shadow-md"
            />
          </div>

          {/* Content */}
          <div className="space-y-6 order-1 lg:order-2">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-espresso leading-tight">
              Coffee Should Be Easy to Love.
            </h2>
            <div className="space-y-4 text-coffee leading-relaxed">
              <p>
                We believe great coffee doesn't need to be complicated. It starts with sourcing exceptional beans from independent farms, roasting them in small batches to bring out their natural character, and delivering them fresh to your door.
              </p>
              <p>
                Every bag tells a story — of the people who grew it, the land it came from, and the care we put into roasting it. We're here to make that story part of your daily ritual.
              </p>
            </div>
            <Link
              href="/our-story"
              className="inline-block px-8 py-3 border-2 border-espresso text-espresso hover:bg-espresso hover:text-ivory transition-colors text-sm font-semibold uppercase tracking-wider mt-4"
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
