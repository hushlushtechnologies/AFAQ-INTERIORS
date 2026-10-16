import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Float } from "@/components/motion/Float";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { FADE_BOTTOM } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollArrow, type ArrowShape } from "@/components/motion/ScrollArrow";
import { ScrollLine } from "@/components/motion/ScrollLine";
import { ScrollRevealText } from "@/components/motion/ScrollRevealText";
import { why } from "@/content/why";
import { WhyCards } from "./WhyCards";

const arrowRise: ArrowShape = {
  viewBox: "0 0 180 135",
  d: "M2 128 C 30 130, 60 118, 85 104 S 140 84, 158 60 S 172 20, 174 8",
  head: "M168 12 L174 0 L180 12 Z",
};

export function WhySection() {
  return (
    <section
      id="why-us"
      aria-labelledby="why-heading"
      className="relative overflow-x-clip bg-ivory pb-24 pt-8 text-ink md:pb-32 xl:pb-[180px]"
    >
      {/* Right-hand guide line that grows with scroll */}
      <ScrollLine className="pointer-events-none absolute inset-y-0 left-[calc(50%+640px)] hidden w-px 2xl:block" />

      <Container>
        <Reveal>
          <p className="text-base text-accent">{why.eyebrow}</p>
        </Reveal>
        <LineReveal
          id="why-heading"
          as="h2"
          underline
          lines={why.title}
          className="mt-4 font-display text-[40px] leading-[1.15] sm:text-5xl lg:text-6xl xl:text-[84px]"
        />

        {/* Intro */}
        <div className="mt-20 grid gap-12 lg:mt-32 lg:grid-cols-[408px_1fr] lg:gap-[87px]">
          <Float speed={40}>
            <ImageReveal
              src={why.image.src}
              alt={why.image.alt}
              fill
              sizes="(min-width: 1024px) 408px, 100vw"
              wrapperClassName={cn("aspect-[408/516]", FADE_BOTTOM)}
            />
            <p aria-hidden className="absolute bottom-0 right-1 font-script text-2xl md:text-[30px]">
              {why.signature}
            </p>
            <ScrollArrow
              {...arrowRise}
              className="pointer-events-none absolute bottom-2 left-[101%] hidden w-[180px] lg:block"
            />
          </Float>

          <div className="lg:pt-1">
            <ScrollRevealText
              paragraphs={[why.lead]}
              className="max-w-[650px] text-2xl leading-snug xl:text-[28px]"
            />
            <Reveal delay={0.1}>
              <p className="mt-14 max-w-[650px] text-lg leading-snug md:text-[22px]">{why.body}</p>
            </Reveal>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-24 lg:mt-28">
          <WhyCards />
        </div>
      </Container>
    </section>
  );
}