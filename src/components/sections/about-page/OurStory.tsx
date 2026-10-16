 import { Container } from "@/components/ui/Container";
import { ColumnLines } from "@/components/motion/ColumnLines";
import { LineReveal } from "@/components/motion/LineReveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollRevealText } from "@/components/motion/ScrollRevealText";
import { aboutPage } from "@/content/about-page";
import { StoryPillars } from "./StoryPillars";

const { ourStory } = aboutPage;

export function OurStory() {
  return (
    <section
      aria-labelledby="our-story-heading"
      className="relative bg-ivory py-24 text-ink md:py-32 xl:pb-[190px] xl:pt-[200px]"
    >
      {/* Vertical guide lines, aligned to the 4 content columns */}
      <ColumnLines />

      <Container className="relative">
        {/* Heading */}
        <Reveal>
          <p className="text-base text-accent">{ourStory.eyebrow}</p>
        </Reveal>
        <LineReveal
          id="our-story-heading"
          as="h2"
          lines={ourStory.title}
          className="mt-3 font-display text-[40px] leading-[1.1] sm:text-5xl xl:text-[64px]"
        />

        {/* Images + story */}
        <div className="mt-14 grid gap-12 lg:mt-[190px] lg:grid-cols-4 lg:gap-0">
          <div className="order-2 grid grid-cols-2 items-end lg:order-none lg:col-span-2 lg:pt-28">
            <ParallaxImage
              {...ourStory.images.team}
              fill
              sizes="(min-width: 1024px) 320px, 50vw"
              fade={false}
              speed={40}
              wrapperClassName="aspect-[320/436]"
            />
            <ParallaxImage
              {...ourStory.images.reception}
              fill
              sizes="(min-width: 1024px) 270px, 45vw"
              fade={false}
              speed={90}
              direction="right"
              wrapperClassName="aspect-[267/346]"
              className="ml-3 lg:ml-[18px] lg:w-[83%]"
            />
          </div>

          <ScrollRevealText
            paragraphs={ourStory.body}
            className="order-1 space-y-7 text-lg leading-snug md:text-[22px] lg:order-none lg:col-span-2 lg:col-start-3"
          />
        </div>

        {/* Pillars */}
        <div className="mt-20 lg:mt-[200px]">
          <StoryPillars items={ourStory.pillars} />
        </div>
      </Container>
    </section>
  );
}