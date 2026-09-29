import { Article } from "@/lib/types";

export const articles: Article[] = [
  {
    id: "1",
    title: "How to Brew Better Filter Coffee",
    slug: "how-to-brew-better-filter-coffee",
    excerpt: "Master the fundamentals of pour-over brewing to unlock the full potential of your coffee beans.",
    content: `<p>Great filter coffee starts with understanding the basics: water temperature, grind size, and brewing time. Here's how to dial in your perfect cup.</p>`,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80",
    date: "2026-09-15",
    author: "Sarah Chen",
  },
  {
    id: "2",
    title: "Meet the Roaster: Behind the Scenes",
    slug: "meet-the-roaster",
    excerpt: "A conversation with our head roaster about craft, process, and what makes great coffee.",
    content: `<p>We sat down with Alex to talk about the art and science of roasting, how we source our beans, and what goes into every batch.</p>`,
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1200&q=80",
    date: "2026-09-10",
    author: "Michael Torres",
  },
  {
    id: "3",
    title: "Understanding Coffee Origins",
    slug: "understanding-coffee-origins",
    excerpt: "Explore how geography, altitude, and processing methods shape the flavor in your cup.",
    content: `<p>Coffee terroir is real. From Ethiopian highlands to Colombian mountains, discover how origin defines flavor.</p>`,
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1200&q=80",
    date: "2026-09-05",
    author: "Sarah Chen",
  },
];

export const getArticleBySlug = (slug: string): Article | undefined => {
  return articles.find((article) => article.slug === slug);
};
