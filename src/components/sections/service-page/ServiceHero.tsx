import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ColumnLines } from "@/components/motion/ColumnLines";
import { LineReveal } from "@/components/motion/LineReveal";
import { Rail } from "@/components/motion/Rail";
import { Reveal } from "@/components/motion/Reveal";
import { StepDots } from "@/components/motion/StepDots";
import type { ServicePage } from "@/content/service-pages";
import { contactHref } from "@/content/navigation";
import { ServiceHeroImage } from "./ServiceHeroImage";

export function ServiceHero({ data }: { data: ServicePage }) {
  return (
    <section
      aria-labelledby="service-title"
      className="relative overflow-x-clip bg-ivory pb-24 pt-[clamp(110px,12.5vw,240px)] text-ink md:pb-32"
    >
      {/* z-10 → the column lines run across the photo, like the design */}
      <ColumnLines lineClassName="bg-terracotta/30" className="z-10" />

      <Rail />

      {/* ---------- Eyebrow + title ---------- */}
      <Container className="relative">
        <div className="pb-8 pt-2 lg:h-[125px] lg:pb-0">
          <Reveal>
            <p className="text-base text-accent">{data.eyebrow}</p>
          </Reveal>
          <LineReveal
            id="service-title"
            as="h1"
            lines={[data.title]}
            className="mt-3 font-display text-[36px] leading-[1.1] sm:text-5xl xl:text-[64px]"
          />
        </div>
      </Container>

      <Rail />

      {/* ---------- Categories ---------- */}
      <Container className="relative">
        <ul className="grid grid-cols-2 gap-y-8 py-6 lg:h-[120px] lg:grid-cols-4 lg:py-0">
          {data.categories.map((cat, i) => (
            <li key={cat} className="flex flex-col justify-between gap-6 pr-4">
              <StepDots total={data.categories.length} active={i} delay={i * 0.12} className="lg:-mt-1" />
              <Reveal delay={0.2 + i * 0.12}>
                <p className="pb-1 font-display text-base uppercase text-terracotta xl:text-lg">{cat}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>

      <Rail />

      {/* ---------- Photo ---------- */}
      <div className="relative mt-12 px-4 md:px-7">
        <ServiceHeroImage src={data.image.src} alt={data.image.alt} watermark={data.watermark} />
      </div>

      {/* ---------- Intro + CTAs ---------- */}
      <Container className="relative">
        <div className="mt-12 lg:pl-[128px]">
          <Reveal>
            <p className="max-w-[1010px] text-lg leading-snug md:text-[22px]">{data.body}</p>
          </Reveal>
          <Reveal delay={0.15} className="mt-6 flex flex-wrap gap-4 md:gap-6">
            <Button href={contactHref} variant="accent">{data.primaryCta}</Button>
            <Button href="/gallery" variant="outline">Explore Our Work</Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}