import type { Metadata } from "next";
import { AboutHero } from "@/components/sections/about-page/AboutHero";
import { AboutStory } from "@/components/sections/about-page/AboutStory";
import { OurStory } from "@/components/sections/about-page/OurStory";
import { VisionMission } from "@/components/sections/about-page/VisionMission";
import { Materials } from "@/components/sections/about-page/Materials";
import { aboutPage } from "@/content/about-page";
import { ValuesSection } from "@/components/sections/values/ValuesSection";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Afaq Al Manzel Interiors is a Dubai-based interior design and turnkey solutions company creating refined spaces through thoughtful design, technical expertise, and complete execution.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <OurStory />
      <VisionMission />
          <Materials data={aboutPage.materials} />
         <ValuesSection id="approach" data={aboutPage.approach} />
    </>
  );
}
