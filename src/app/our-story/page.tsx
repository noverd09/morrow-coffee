import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PageHead } from "@/components/ui/page-head";

export default function OurStoryPage() {
  return (
    <>
      <PageHead
        label="Our story"
        title={
          <>
            Small-batch coffee for <em>slow mornings.</em>
          </>
        }
      />

      <div className="wrap">
        <div className="relative aspect-[16/8] bg-oat overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1600&q=80"
            alt="Inside the Morrow Coffee roastery"
            fill
            sizes="(min-width: 1360px) 1248px, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </div>

      <section className="section-md">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <p className="label">01 / Why we started</p>
          <div className="space-y-6 text-xl max-w-2xl">
            <p>
              Morrow Coffee was born out of a simple desire: to make great specialty coffee more accessible,
              approachable, and part of everyday slow mornings.
            </p>
            <p className="text-mute">
              Too often, specialty coffee feels intimidating, filled with complex jargon, overly precious brewing
              methods, and an emphasis on exclusivity. We wanted to build something different: a roastery focused on
              quality and craft, but grounded in warmth and simplicity.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-bean text-paper on-dark section-lg">
        <div className="wrap">
          <blockquote className="t-h2 max-w-5xl">
            &ldquo;Coffee should be easy to love, thoughtful to source, and <em>roasted to celebrate the bean.</em>&rdquo;
          </blockquote>
        </div>
      </section>

      <section className="section-lg">
        <div className="wrap space-y-24 md:space-y-32">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div className="max-w-md">
              <p className="label mb-6">02 / Sourcing</p>
              <h2 className="t-h2">Thoughtful sourcing.</h2>
              <p className="mt-6 text-mute">
                We partner directly with smallholder farmers and independent cooperatives across Ethiopia, Colombia,
                Guatemala, and beyond. We pay premiums above Fair Trade prices to support sustainable farming practices
                and the communities behind every harvest.
              </p>
            </div>
            <div className="relative aspect-[4/3] bg-oat overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1000&q=80"
                alt="Coffee harvest"
                fill
                sizes="(min-width: 1024px) 600px, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div className="relative aspect-[4/3] bg-oat overflow-hidden order-2 lg:order-1">
              <Image
                src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1000&q=80"
                alt="Roasted coffee beans"
                fill
                sizes="(min-width: 1024px) 600px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="max-w-md order-1 lg:order-2">
              <p className="label mb-6">03 / Roasting</p>
              <h2 className="t-h2">Small-batch roasting.</h2>
              <p className="mt-6 text-mute">
                We roast in small batches on our vintage cast-iron roaster, adjusting profiles for each unique origin.
                We never over-roast, aiming instead to bring out the distinct fruit, floral, and sweet characteristics
                inherent in every coffee bean.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sun section-lg">
        <div className="wrap flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 className="t-h2 max-w-2xl">
            Taste the <em>difference.</em>
          </h2>
          <Link href="/shop" className="btn btn-ink self-start md:self-auto">
            Explore our coffees
          </Link>
        </div>
      </section>
    </>
  );
}
