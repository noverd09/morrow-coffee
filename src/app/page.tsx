import { HeroSection } from "@/components/hero/hero-section";
import { HourDial } from "@/components/products/hour-dial";
import { LineupIndex } from "@/components/products/lineup-index";
import { Manifesto } from "@/components/hero/manifesto";
import { JournalPreview } from "@/components/journal/journal-preview";
import { SunriseCta } from "@/components/hero/sunrise-cta";

export default function Home() {
  return (
    <>
      <HeroSection />
      <HourDial />
      <LineupIndex />
      <Manifesto />
      <JournalPreview />
      <SunriseCta />
    </>
  );
}
