import React from "react";
import Link from "next/link";
import Image from "next/image";
import { articles } from "@/lib/data/articles";

export default function JournalPage() {
  return (
    <div className="py-16 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-espresso uppercase tracking-wider mb-4">
            The Journal
          </h1>
          <p className="text-coffee leading-relaxed">
            Stories, brew guides, and notes from our roastery on the craft of great coffee.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/journal/${article.slug}`}
              className="group flex flex-col"
            >
              <div className="relative aspect-[16/10] bg-sand overflow-hidden mb-6">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="flex-1 flex flex-col space-y-3">
                <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-coffee">
                  <span>
                    {new Date(article.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span>·</span>
                  <span>{article.author}</span>
                </div>

                <h2 className="font-serif text-2xl font-bold text-espresso group-hover:text-coffee transition-colors leading-tight">
                  {article.title}
                </h2>

                <p className="text-coffee leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>

                <span className="text-espresso font-semibold text-sm uppercase tracking-wider underline underline-offset-4 group-hover:text-coffee transition-colors">
                  Read More
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
