import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { articles, getArticleBySlug } from "@/lib/data/articles";

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date(date));

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const otherArticles = articles.filter((a) => a.id !== article.id).slice(0, 2);

  return (
    <>
      <header className="wrap pt-12 md:pt-20 pb-10">
        <Link href="/journal" className="label link-under">
          &larr; The journal
        </Link>
        <p className="label text-mute mt-10 mb-6">
          {formatDate(article.date)} / {article.author}
        </p>
        <h1 className="t-display text-[clamp(2.75rem,8vw,7rem)] max-w-5xl">{article.title}</h1>
      </header>

      <div className="wrap">
        <div className="relative aspect-[16/8] bg-oat overflow-hidden">
          <Image
            src={article.image}
            alt=""
            fill
            sizes="(min-width: 1360px) 1248px, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </div>

      <article className="wrap section-md">
        <div className="max-w-2xl mx-auto space-y-6 text-lg article-body">
          <p className="font-display text-3xl leading-snug border-l-2 border-dawn pl-6">{article.excerpt}</p>

          <div dangerouslySetInnerHTML={{ __html: article.content }} />

          <p>
            Coffee brewing is both an art and a science. While there&apos;s room for creativity and personal preference,
            understanding the fundamentals will help you consistently make better coffee at home.
          </p>
          <h2>The basics</h2>
          <p>
            Start with freshly roasted beans, ideally within two to four weeks of their roast date. Grind just before
            brewing to preserve aromatics. Use filtered water heated to 195 to 205&deg;F (90 to 96&deg;C).
          </p>
          <p>
            A good starting ratio is 1:16 (coffee to water by weight). For example, 20 grams of coffee to 320 grams of
            water. Adjust to taste: more coffee for strength, less for a lighter cup.
          </p>
          <h2>Pour-over technique</h2>
          <p>
            Begin with a 30 to 45 second bloom phase, pouring just enough water to saturate the grounds. This releases
            trapped CO2 and allows for better extraction. Then pour slowly in circular motions, maintaining a steady
            water level.
          </p>
          <p>
            Total brew time should be around 3 to 4 minutes. If it&apos;s too fast, grind finer. If it&apos;s too slow,
            grind coarser. Take notes and refine your process over time.
          </p>
        </div>
      </article>

      {otherArticles.length > 0 && (
        <section className="bg-oat section-md">
          <div className="wrap">
            <h2 className="t-h2 mb-12">Keep reading.</h2>
            <ul className="grid gap-10 sm:grid-cols-2">
              {otherArticles.map((a) => (
                <li key={a.id}>
                  <Link href={`/journal/${a.slug}`} className="group block">
                    <div className="relative aspect-[16/10] overflow-hidden bg-paper mb-5">
                      <Image
                        src={a.image}
                        alt=""
                        fill
                        sizes="(min-width: 640px) 600px, 100vw"
                        className="object-cover grayscale transition duration-500 group-hover:grayscale-0 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="t-h3 link-under w-fit">{a.title}</h3>
                    <p className="mt-3 text-mute line-clamp-2">{a.excerpt}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
