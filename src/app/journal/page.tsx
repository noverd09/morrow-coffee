import React from "react";
import Link from "next/link";
import Image from "next/image";
import { articles } from "@/lib/data/articles";
import { PageHead } from "@/components/ui/page-head";

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date(date));

export default function JournalPage() {
  return (
    <>
      <PageHead
        label="The journal"
        title={
          <>
            Notes from <em>the roastery.</em>
          </>
        }
        intro="Stories, brew guides, and notes on the craft of great coffee."
      />

      <div className="wrap pb-24 md:pb-32">
        <ul className="border-t rule">
          {articles.map((a, i) => (
            <li key={a.id} className="border-b rule">
              <Link
                href={`/journal/${a.slug}`}
                className="group grid gap-6 py-10 md:grid-cols-[3rem_1fr_360px] md:items-center"
              >
                <span className="label hidden md:block">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="label text-mute mb-4">
                    {formatDate(a.date)} / {a.author}
                  </p>
                  <h2 className="t-h3 text-[clamp(2rem,4vw,3.5rem)] link-under w-fit">{a.title}</h2>
                  <p className="mt-4 text-mute max-w-xl line-clamp-3">{a.excerpt}</p>
                </div>
                <div className="relative aspect-[3/2] overflow-hidden bg-oat">
                  <Image
                    src={a.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 360px, 100vw"
                    className="object-cover grayscale transition duration-500 group-hover:grayscale-0 group-hover:scale-105"
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
