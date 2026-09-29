import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function OurStoryPage() {
  return (
    <div className="bg-ivory py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <p className="text-xs uppercase font-semibold text-coffee tracking-widest">
            Our Story
          </p>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-espresso leading-tight">
            Small-Batch Coffee for Slow Mornings.
          </h1>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] bg-sand">
          <Image
            src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1600&q=80"
            alt="Morrow Coffee Roastery"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Narrative Section 1 */}
        <div className="space-y-6 text-coffee leading-relaxed text-lg">
          <p>
            Morrow Coffee was born out of a simple desire: to make great specialty coffee more accessible, approachable, and part of everyday slow mornings.
          </p>
          <p>
            Too often, specialty coffee feels intimidating — filled with complex jargon, overly precious brewing methods, and an emphasis on exclusivity. We wanted to build something different: a roastery focused on quality and craft, but grounded in warmth and simplicity.
          </p>
        </div>

        {/* Quote */}
        <div className="border-l-2 border-espresso pl-6 py-2 my-8">
          <p className="font-serif text-2xl text-espresso italic">
            "Coffee should be easy to love, thoughtful to source, and roasted to celebrate the bean."
          </p>
        </div>

        {/* Sourcing Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4 text-coffee leading-relaxed">
            <h2 className="text-2xl font-serif font-bold text-espresso">
              Thoughtful Sourcing
            </h2>
            <p>
              We partner directly with smallholder farmers and independent cooperatives across Ethiopia, Colombia, Guatemala, and beyond. We pay premiums above Fair Trade prices to support sustainable farming practices and the communities behind every harvest.
            </p>
          </div>
          <div className="relative aspect-[4/3] bg-sand">
            <Image
              src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80"
              alt="Coffee harvesting"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Roasting Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] bg-sand order-2 md:order-1">
            <Image
              src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80"
              alt="Coffee Roasting Process"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-4 text-coffee leading-relaxed order-1 md:order-2">
            <h2 className="text-2xl font-serif font-bold text-espresso">
              Small-Batch Roasting
            </h2>
            <p>
              We roast in small batches on our vintage cast-iron roaster, adjusting profiles for each unique origin. We never over-roast, aiming instead to bring out the distinct fruit, floral, and sweet characteristics inherent in every coffee bean.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8 border-t border-sand">
          <h3 className="text-2xl font-serif font-bold text-espresso mb-4">
            Taste the Difference
          </h3>
          <Link
            href="/shop"
            className="inline-block px-8 py-4 bg-espresso text-ivory hover:bg-espresso/90 transition-colors text-sm font-semibold uppercase tracking-wider"
          >
            Explore Our Coffees
          </Link>
        </div>
      </div>
    </div>
  );
}
