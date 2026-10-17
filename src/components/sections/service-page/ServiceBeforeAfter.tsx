import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { ColumnLines } from "@/components/motion/ColumnLines";
import { LineReveal } from "@/components/motion/LineReveal";
import { Reveal } from "@/components/motion/Reveal";
import { StepDots } from "@/components/motion/StepDots";
import type { ServiceBeforeAfter as Data } from "@/content/service-pages";
import { BeforeAfterSlider } from "./BeforeAfterSlider";

export function ServiceBeforeAfter({ data }: { data: Data }) {
  const total = data.projects.length;

  return (
    <section
      aria-labelledby="before-after-heading"
      className="relative overflow-x-clip bg-ivory py-24 text-ink md:py-32 xl:pb-[220px] xl:pt-[100px]"
    >
      <ColumnLines lineClassName="bg-terracotta/30" />

      <Container className="relative">
        {/* ---------- Header ---------- */}
        <Reveal>
          <p className="text-base text-accent">{data.eyebrow}</p>
        </Reveal>
        <div className="mt-3 grid gap-8 lg:grid-cols-2 lg:items-end">
          <LineReveal
            id="before-after-heading"
            as="h2"
            lines={data.title}
            className="font-display text-[40px] leading-[1.1] sm:text-5xl xl:text-[84px]"
          />
          <Reveal delay={0.15}>
            <p className="max-w-[640px] text-lg leading-snug md:text-[22px] lg:pb-3">{data.body}</p>
          </Reveal>
        </div>

        {/* ---------- Projects (alternating sides) ---------- */}
        <div className="mt-16 space-y-20 lg:mt-[150px]">
          {data.projects.map((p, i) => {
            const flip = i % 2 === 1;
            return (
              <article key={p.id} aria-labelledby={`${p.id}-title`} className="grid gap-8 lg:grid-cols-4 lg:gap-0">
                <div className={cn("lg:row-start-1", flip ? "lg:col-start-1 lg:pr-6" : "lg:col-start-4 lg:pl-[26px]")}>
                  <StepDots total={total} active={i} />
                  <LineReveal
                    id={`${p.id}-title`}
                    as="h3"
                    lines={[p.title]}
                    className="mt-4 font-display text-2xl leading-[1.15] text-terracotta xl:text-[30px]"
                  />
                  <Reveal delay={0.1}>
                    <p className="mt-2 text-base">{p.location}</p>
                  </Reveal>
                  <Reveal delay={0.2}>
                    <p className="mt-8 text-lg leading-snug md:text-[22px] lg:mt-[70px]">{p.scope.join(" · ")}</p>
                  </Reveal>
                </div>

                <div className={cn("lg:col-span-3 lg:row-start-1", flip ? "lg:col-start-2" : "lg:col-start-1")}>
                  <BeforeAfterSlider
                    before={p.before}
                    after={p.after}
                    label={p.title}
                    sizes="(min-width: 1024px) 960px, 100vw"
                  />
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}