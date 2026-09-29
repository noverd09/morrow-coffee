import { HeroSection } from "@/components/hero/hero-section";
import { FeaturedProducts } from "@/components/products/featured-products";
import { BrandStorySection } from "@/components/hero/brand-story-section";
import { CoffeeFinder } from "@/components/products/coffee-finder";
import { LifestyleSection } from "@/components/hero/lifestyle-section";
import { JournalPreview } from "@/components/journal/journal-preview";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedProducts />
      <BrandStorySection />
      <CoffeeFinder />
      <LifestyleSection />
      <JournalPreview />
    </div>
  );
}
