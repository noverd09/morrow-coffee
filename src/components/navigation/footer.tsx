import React from "react";
import Link from "next/link";

const columns = [
  {
    title: "Shop",
    links: [
      { href: "/shop", label: "All coffee" },
      { href: "/shop/espresso", label: "Espresso" },
      { href: "/shop/filter", label: "Filter" },
    ],
  },
  {
    title: "Morrow",
    links: [
      { href: "/our-story", label: "Our story" },
      { href: "/journal", label: "Journal" },
      { href: "/cart", label: "Your bag" },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="bg-ink text-paper on-dark overflow-hidden">
      <div className="wrap pt-20 md:pt-28">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr] pb-20">
          <div className="max-w-sm">
            <p className="t-h3">Six coffees, ordered by the sun.</p>
            <p className="mt-4 text-paper/70">Small-batch coffee from independent farms, roasted fresh weekly.</p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="label text-sun mb-5">{col.title}</h2>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="link-under">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Wordmark rising over the horizon */}
      <div className="relative select-none" aria-hidden="true">
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[12%] w-[min(38vw,520px)] aspect-[2/1] overflow-hidden">
          <div className="w-full aspect-square rounded-full bg-dawn-hi" />
        </div>
        <p className="relative font-display lowercase text-center leading-[0.8] tracking-tighter text-[clamp(6rem,27vw,26rem)] translate-y-[8%] text-paper">
          morrow
        </p>
      </div>
      <div className="bg-paper text-ink">
        <p className="label wrap py-4 flex flex-wrap justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} Morrow Coffee</span>
          <span>Pick your first hour</span>
        </p>
      </div>
    </footer>
  );
};
