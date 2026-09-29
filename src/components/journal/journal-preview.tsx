import React from "react";
import Link from "next/link";
import Image from "next/image";
import { articles } from "@/lib/data/articles";

export const JournalPreview = () => {
  return (
    <section className="py-24 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-espresso uppercase tracking-wider">
              The Journal
            </h2>
            <p className="text-coffee text-sm mt-2">
              Stories, brew guides, and notes from the roastery.
            </p>
          </div>
          <Link
            href="/journal"
            className="text-espresso hover:text-coffee font-semibold text-sm uppercase tracking-wider mt-4 sm:mt-0 underline underline-offset-4"
          >
            Read All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.slice(0, 3).map((article) => (
            <Link
              key={article.id}
              href={`/journal/${article.slug}`}
              className="group flex flex-col"
            >
              <div className="relative aspect-[16/10] bg-sand overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="mt-4 flex-1 flex flex-col">
                <p className="text-coffee text-xs uppercase tracking-wider mb-2">
                  {new Date(article.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <h3 className="font-serif text-lg font-bold text-espresso group-hover:text-coffee transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="text-coffee text-sm mt-2 line-clamp-2">
                  {article.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
