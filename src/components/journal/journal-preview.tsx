import React from "react";
import Link from "next/link";
import Image from "next/image";
import { articles } from "@/lib/data/articles";

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(date));

export const JournalPreview = () => {
  return (
    <section className="section-lg">
      <div className="wrap">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <p className="label mb-6">05 / The journal</p>
            <h2 className="t-h2">Notes from the roastery.</h2>
          </div>
          <Link href="/journal" className="btn btn-line self-start md:self-auto">
            Read the journal
          </Link>
        </div>

        <ul className="border-t rule">
          {articles.slice(0, 3).map((a) => (
            <li key={a.id} className="border-b rule">
              <Link
                href={`/journal/${a.slug}`}
                className="group grid gap-x-8 gap-y-4 py-8 md:grid-cols-[8rem_1.4fr_1fr_11rem] md:items-center"
              >
                <time dateTime={a.date} className="label text-mute">
                  {formatDate(a.date)}
                </time>
                <h3 className="t-h3 text-[clamp(1.75rem,3.2vw,2.75rem)] link-under self-start md:self-center w-fit">
                  {a.title}
                </h3>
                <p className="text-mute line-clamp-2">{a.excerpt}</p>
                <div className="relative aspect-[3/2] overflow-hidden bg-oat">
                  <Image
                    src={a.image}
                    alt=""
                    fill
                    sizes="176px"
                    className="object-cover grayscale transition duration-500 group-hover:grayscale-0 group-hover:scale-105"
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
