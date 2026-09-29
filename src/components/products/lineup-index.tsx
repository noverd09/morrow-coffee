import React from "react";
import Link from "next/link";
import { Bag } from "@/components/brand/bag";
import { products } from "@/lib/data/products";
import { formatHour, phaseName, skyColor } from "@/lib/sky";

const sorted = [...products].sort((a, b) => a.hour - b.hour);

export const LineupIndex = () => {
  return (
    <section className="section-lg">
      <div className="wrap">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <p className="label mb-6">03 / The lineup</p>
            <h2 className="t-h2 max-w-3xl">
              Six coffees, <em>first light</em> to high morning.
            </h2>
          </div>
          <Link href="/shop" className="btn btn-line self-start md:self-auto">
            Shop all coffee
          </Link>
        </div>

        <ol className="border-t rule">
          {sorted.map((p, i) => (
            <li key={p.id} className="border-b rule">
              <Link
                href={`/product/${p.slug}`}
                className="group relative grid items-center gap-x-6 gap-y-2 py-7 md:py-9 px-2 -mx-2 transition-colors duration-200 hover:bg-ink hover:text-paper grid-cols-[2.5rem_1fr_auto] md:grid-cols-[3rem_minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1.2fr)_9rem_4rem]"
              >
                <span className="label">{String(i + 1).padStart(2, "0")}</span>

                <span className="t-h3 text-[clamp(2rem,4.2vw,3.75rem)] transition-transform duration-300 ease-out group-hover:translate-x-3">
                  {p.name}
                </span>

                <span className="label hidden md:block opacity-80">
                  {p.origin}
                  <br />
                  {p.process}
                </span>

                <span className="hidden md:block opacity-90">{p.tastingNotes.join(", ")}</span>

                <span className="hidden md:flex items-center gap-3 label">
                  <span
                    className="inline-block size-4 rounded-full border border-current"
                    style={{ backgroundColor: skyColor(p.hour) }}
                    aria-hidden="true"
                  />
                  {formatHour(p.hour)}
                  <span className="sr-only">, {phaseName(p.hour)}</span>
                </span>

                <span className="font-display text-2xl text-right">${p.price}</span>

                <span className="hidden lg:block pointer-events-none absolute right-[19%] top-1/2 -translate-y-[62%] w-24 opacity-0 translate-y-3 transition duration-300 ease-out group-hover:opacity-100 group-hover:-translate-y-[62%]">
                  <Bag name={p.name} origin={p.origin} hour={p.hour} className="w-full h-auto" />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
