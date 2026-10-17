import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { ColumnLines } from "@/components/motion/ColumnLines";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { Rail } from "@/components/motion/Rail";
import { Reveal } from "@/components/motion/Reveal";
import { StepDots } from "@/components/motion/StepDots";
import type { DesignStyle, ServiceStyles as Styles } from "@/content/service-pages";
import { StyleBanner, StyleCard } from "./StyleMedia";

// Column widths traced from the 1280px design (they add up to 1280)
const collage = {
  // photos left, text right
  right: {
    grid: "lg:grid-cols-[380fr_19fr_332fr_19fr_210fr_320fr]",
    slots: ["lg:col-start-1 lg:h-full", "lg:col-start-3 lg:h-[73%] lg:self-end", "lg:col-start-5 lg:h-full"],
    text: "lg:col-start-6 lg:pl-5",
  },
  // text left, photos right
  left: {
    grid: "lg:grid-cols-[320fr_332fr_18fr_381fr_18fr_211fr]",
    slots: ["lg:col-start-2 lg:h-[73%] lg:self-end", "lg:col-start-4 lg:h-full", "lg:col-start-6 lg:h-full"],
    text: "lg:col-start-1",
  },
} as const;

function StyleCollage({
  style,
  index,
  total,
  align,
  className,
}: {
  style: DesignStyle;
  index: number;
  total: number;
  align: keyof typeof collage;
  className?: string;
}) {
  const cfg = collage[align];

  return (
    <div className={className}>
      <Rail />
      <Container>
        <div className={cn("grid grid-cols-3 gap-3 py-8 lg:aspect-[1280/354] lg:gap-0 lg:py-0", cfg.grid)}>
          <div className={cn("col-span-3 mb-4 lg:col-span-1 lg:row-start-1 lg:mb-0", cfg.text)}>
            <StepDots total={total} active={index} className="lg:-mt-1" />
            <LineReveal
              as="h3"
              lines={[style.title]}
              className="mt-4 font-display text-2xl text-terracotta xl:text-[28px]"
            />
                       {style.subtitle && (
              <Reveal delay={0.1}>
                <p className="mt-1 max-w-[290px] text-base leading-snug">{style.subtitle}</p>
              </Reveal>
            )}
          </div>

          {style.images.slice(0, 3).map((img, i) => (
            <ImageReveal
              key={img.src}
              src={img.src}
              alt={img.alt}
              fill
              delay={i * 0.12}
              sizes="(min-width: 1024px) 380px, 33vw"
              wrapperClassName={cn("group aspect-[3/4] lg:row-start-1 lg:aspect-auto", cfg.slots[i])}
              className="transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            />
          ))}
        </div>
      </Container>
      <Rail />
    </div>
  );
}

export function ServiceStyles({ data }: { data: Styles }) {
  const total = data.items.length;
  const [first, second, banner, ...cards] = data.items;

  return (
    <section
      aria-labelledby="styles-heading"
      className="relative overflow-x-clip bg-ivory py-24 text-ink md:py-32 xl:pb-[200px] xl:pt-[100px]"
    >
      <ColumnLines lineClassName="bg-terracotta/30" />

      {/* ---------- Header ---------- */}
      <Container className="relative">
        <Reveal>
          <p className="text-base text-accent">{data.eyebrow}</p>
        </Reveal>
        <div className="mt-3 grid gap-8 lg:grid-cols-2 lg:items-end">
          <LineReveal
            id="styles-heading"
            as="h2"
            lines={data.title}
            className="font-display text-[40px] leading-[1.1] sm:text-5xl xl:text-[80px]"
          />
          <Reveal delay={0.15}>
            <p className="max-w-[640px] text-lg leading-snug md:text-[22px] lg:pb-3">{data.body}</p>
          </Reveal>
        </div>
      </Container>

      {/* ---------- Collages ---------- */}
      <div className="relative mt-20 lg:mt-[220px]">
        {first && <StyleCollage style={first} index={0} total={total} align="right" />}
        {second && <StyleCollage style={second} index={1} total={total} align="left" className="mt-12 lg:mt-20" />}
      </div>

      {/* ---------- Banner + cards ---------- */}
      <Container className="relative mt-12 lg:mt-20">
        {banner && <StyleBanner style={banner} index={2} total={total} />}

        {cards.length > 0 && (
          <div className="mt-12 grid grid-cols-2 gap-4 lg:mt-20 lg:grid-cols-4 lg:gap-[18px]">
            {cards.map((s, i) => (
              <StyleCard key={s.id} style={s} index={i + 3} total={total} delay={i * 0.1} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}