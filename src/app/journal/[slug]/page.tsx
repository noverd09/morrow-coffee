import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { articles, getArticleBySlug } from "@/lib/data/articles";

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const otherArticles = articles.filter((a) => a.id !== article.id).slice(0, 2);

  return (
    <div className="bg-ivory">
      {/* Hero Image */}
      <div className="relative h-[60vh] min-h-[400px] bg-sand">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 to-transparent" />
      </div>

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <article className="bg-ivory p-8 sm:p-12 shadow-lg space-y-8">
          {/* Meta */}
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

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-espresso leading-tight">
            {article.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-coffee leading-relaxed border-l-2 border-espresso pl-6">
            {article.excerpt}
          </p>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none text-coffee leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Extended placeholder content for demonstration */}
          <div className="space-y-6 text-coffee leading-relaxed">
            <p>
              Coffee brewing is both an art and a science. While there's room for creativity and personal preference, understanding the fundamentals will help you consistently make better coffee at home.
            </p>
            <h2 className="text-2xl font-serif font-bold text-espresso mt-8 mb-4">
              The Basics
            </h2>
            <p>
              Start with freshly roasted beans—ideally within two to four weeks of their roast date. Grind just before brewing to preserve aromatics. Use filtered water heated to 195-205°F (90-96°C).
            </p>
            <p>
              A good starting ratio is 1:16 (coffee to water by weight). For example, 20 grams of coffee to 320 grams of water. Adjust to taste: more coffee for strength, less for a lighter cup.
            </p>
            <h2 className="text-2xl font-serif font-bold text-espresso mt-8 mb-4">
              Pour-Over Technique
            </h2>
            <p>
              Begin with a 30-45 second bloom phase, pouring just enough water to saturate the grounds. This releases trapped CO2 and allows for better extraction. Then pour slowly in circular motions, maintaining a steady water level.
            </p>
            <p>
              Total brew time should be around 3-4 minutes. If it's too fast, grind finer. If it's too slow, grind coarser. Take notes and refine your process over time.
            </p>
          </div>
        </article>

        {/* Related Articles */}
        {otherArticles.length > 0 && (
          <div className="mt-16 py-12 border-t border-sand">
            <h2 className="text-2xl font-serif font-bold text-espresso mb-8">
              Read More
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {otherArticles.map((a) => (
                <Link
                  key={a.id}
                  href={`/journal/${a.slug}`}
                  className="group flex flex-col"
                >
                  <div className="relative aspect-[16/10] bg-sand overflow-hidden mb-4">
                    <Image
                      src={a.image}
                      alt={a.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-espresso group-hover:text-coffee transition-colors">
                    {a.title}
                  </h3>
                  <p className="text-coffee text-sm mt-2 line-clamp-2">
                    {a.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Back to Journal */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/journal"
          className="inline-block text-espresso hover:text-coffee font-semibold text-sm uppercase tracking-wider underline underline-offset-4"
        >
          ← Back to Journal
        </Link>
      </div>
    </div>
  );
}
