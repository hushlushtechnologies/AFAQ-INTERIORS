import { Container } from "@/components/ui/Container";
import { LineReveal } from "@/components/motion/LineReveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";
import { SparkleDivider } from "@/components/motion/SparkleDivider";
import { ValuesTimeline, type TimelineItem } from "./ValuesTimeline";

export type ValuesData = {
  eyebrow: string;
  title: readonly string[];
  body: string;
  image: { src: string; alt: string };
  items: readonly TimelineItem[];
};

type Props = { data: ValuesData; id?: string };

export function ValuesSection({ data, id = "values" }: Props) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="bg-background pb-24 pt-10 text-cream md:pb-32 xl:pb-[200px]"
    >
      <Container>
        <SparkleDivider className="mx-auto w-full max-w-[930px]" />

        <div className="mt-24 grid gap-16 lg:mt-[260px] lg:grid-cols-[510px_1fr] lg:gap-[70px]">
          <div>
            <Reveal>
              <p className="text-base text-gold">{data.eyebrow}</p>
            </Reveal>
            <LineReveal
              id={headingId}
              as="h2"
              lines={data.title}
              className="mt-6 font-display text-[40px] leading-[1.1] sm:text-5xl lg:text-6xl xl:text-[84px]"
            />
            <Reveal delay={0.1}>
              <p className="mt-10 max-w-[510px] text-lg leading-snug md:text-[22px]">{data.body}</p>
            </Reveal>
            <ParallaxImage
              src={data.image.src}
              alt={data.image.alt}
              fill
              sizes="(min-width: 1024px) 510px, 100vw"
              fade={false}
              speed={40}
              wrapperClassName="aspect-[510/636]"
              className="mt-16"
            />
          </div>

          <ValuesTimeline items={data.items} />
        </div>
      </Container>
    </section>
  );
}