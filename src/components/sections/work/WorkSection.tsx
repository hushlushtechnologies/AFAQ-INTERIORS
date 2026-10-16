import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { LineReveal } from "@/components/motion/LineReveal";
import { Reveal } from "@/components/motion/Reveal";
import { work } from "@/content/work";
import { contactHref } from "@/content/navigation";
import { WorkTile } from "./WorkTile";

const img = work.images;
const WIDE = "(min-width: 1024px) 55vw, 100vw";

export function WorkSection() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="bg-ivory pb-24 pt-8 text-ink md:pb-32 xl:pb-[180px]"
    >
      {/* ---------- Header ---------- */}
      <Container>
        <Reveal>
          <p className="text-base text-accent">{work.eyebrow}</p>
        </Reveal>
        <div className="mt-4 grid gap-10 lg:grid-cols-2 lg:items-end">
          <LineReveal
            id="work-heading"
            as="h2"
            lines={work.title}
            className="font-display text-[40px] leading-[1.1] sm:text-5xl lg:text-6xl xl:text-[84px]"
          />
          <div className="lg:pb-2">
            <Reveal>
              <p className="max-w-[640px] text-lg leading-snug md:text-[22px]">{work.body}</p>
            </Reveal>
            <Reveal delay={0.15} className="mt-8 flex flex-wrap gap-4 md:gap-6">
              <Button href="/gallery" variant="accent">Discover Our Work</Button>
              <Button href={contactHref} variant="outline">Contact Us</Button>
            </Reveal>
          </div>
        </div>
      </Container>

      {/* ---------- Full-bleed mosaic ---------- */}
      <div
        className="mt-14 grid auto-rows-[var(--row)] grid-flow-row-dense grid-cols-2 gap-[3vw] [--row:44vw]
                   lg:mt-16 lg:grid-flow-row lg:grid-cols-[415fr_414fr_594fr_414fr] lg:gap-[1.4vw] lg:[--row:21.5vw]"
      >
        {/* Row 1 */}
        <WorkTile color="bg-gold" corners={["tl", "tr", "bl"]} className="lg:col-start-1 lg:row-start-1" />
        <WorkTile
          image={img.living}
          sizes={WIDE}
          circle="right"
          corners={["tl", "tr", "br"]}
          delay={0.08}
          className="col-span-2 lg:col-span-2 lg:col-start-2 lg:row-start-1"
        />
        <WorkTile
          image={img.atrium}
          corners={["tr"]}
          delay={0.24}
          className="row-span-2 lg:col-start-4 lg:row-span-2 lg:row-start-1"
        />

        {/* Row 2 */}
        <WorkTile image={img.shelving} corners={["tl", "bl", "br"]} className="lg:col-start-1 lg:row-start-2" />
        <WorkTile image={img.arches} corners={["tr", "br"]} delay={0.08} className="lg:col-start-2 lg:row-start-2" />
        <WorkTile
          image={img.dining}
          sizes="(min-width: 1024px) 31vw, 50vw"
          corners={["tl", "tr", "bl"]}
          delay={0.16}
          className="lg:col-start-3 lg:row-start-2"
        />

        {/* Row 3 */}
        <WorkTile image={img.green} corners={["tl"]} className="lg:col-start-1 lg:row-start-3" />
        <WorkTile
          image={img.lounge}
          sizes={WIDE}
          circle="left"
          corners={["tl", "bl", "br"]}
          delay={0.08}
          className="col-span-2 lg:col-span-2 lg:col-start-2 lg:row-start-3"
        />
        <WorkTile image={img.teal} corners={["tr", "br", "bl"]} delay={0.24} className="lg:col-start-4 lg:row-start-3" />
      </div>
    </section>
  );
}