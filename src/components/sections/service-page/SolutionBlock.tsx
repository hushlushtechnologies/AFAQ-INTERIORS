import type { Solution } from "@/content/service-pages";
import { LineReveal } from "@/components/motion/LineReveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollArrow, type ArrowShape } from "@/components/motion/ScrollArrow";
import { StepDots } from "@/components/motion/StepDots";
import { BulletList } from "./BulletList";

// Arrow shapes traced from the design
const arrowAcross: ArrowShape = {
  viewBox: "0 0 130 30",
  d: "M2 4 C 40 2, 90 6, 120 22",
  head: "M112 16 L126 26 L110 28 Z",
};
const arrowRise: ArrowShape = {
  viewBox: "0 0 160 105",
  d: "M2 103 C 30 70, 70 30, 148 12",
  head: "M140 4 L156 11 L144 20 Z",
};
const arrowDownLeft: ArrowShape = {
  viewBox: "0 0 150 105",
  d: "M148 2 C 120 40, 80 80, 12 98",
  head: "M18 90 L2 100 L20 104 Z",
};
const arrowDownRight: ArrowShape = {
  viewBox: "0 0 100 105",
  d: "M2 2 C 20 30, 50 70, 90 98",
  head: "M80 96 L98 102 L90 88 Z",
};

const arrow = "pointer-events-none absolute hidden lg:block";

type Theme = "light" | "dark";

function SolutionText({ s, index, total, theme }: { s: Solution; index: number; total: number; theme: Theme }) {
  const dark = theme === "dark";
  return (
    <div>
      <StepDots
        total={total}
        active={index}
        inactiveClassName={dark ? "bg-cream" : undefined}
      />
      <LineReveal
        id={`${s.id}-title`}
        as="h3"
        lines={[s.title]}
        className={`mt-4 font-display text-2xl xl:text-[30px] ${dark ? "text-gold" : "text-terracotta"}`}
      />
      <Reveal delay={0.1}>
        <p className="mt-1 text-base xl:text-lg">{s.subtitle}</p>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="mt-10 max-w-[620px] text-lg leading-snug md:text-[22px] lg:mt-[60px]">{s.text}</p>
      </Reveal>
    </div>
  );
}

type Props = { s: Solution; index: number; total: number; theme?: Theme; className?: string };
 

export function SolutionBlock({ s, index, total, theme = "light", className }: Props) {
  const layoutA = index % 2 === 0;

  if (layoutA) {
    // List (left) → arrows → text (right); wide photo below on the left
    return (
      <article id={s.id} aria-labelledby={`${s.id}-title`} className={`scroll-mt-32 ${className ?? ""}`}>
        <div className="relative grid gap-10 lg:grid-cols-4 lg:gap-0">
          <BulletList items={s.items} className="order-2 lg:order-none lg:col-span-2 lg:w-[66%] lg:pt-1" />
          <div className="order-1 lg:order-none lg:col-span-2">
                       <SolutionText s={s} index={index} total={total} theme={theme} />
          </div>
          <ScrollArrow {...arrowAcross} className={`${arrow} left-[35%] top-[40px] w-[13%]`} />
          <ScrollArrow {...arrowRise} className={`${arrow} left-[33%] top-[145px] w-[15.5%]`} />
        </div>
        <ParallaxImage
          src={s.images[0].src}
          alt={s.images[0].alt}
          fill
          sizes="(min-width: 1024px) 640px, 100vw"
          fade={false}
          speed={40}
          direction="left"
          wrapperClassName="aspect-[640/435]"
          className="mt-10 lg:w-1/2"
        />
      </article>
    );
  }

  // Layout B: photo pair (right) → text (left) and list (right) below, with arrows between
  return (
    <article id={s.id} aria-labelledby={`${s.id}-title`} className={`scroll-mt-32 ${className ?? ""}`}>
      <div className="grid grid-cols-2 items-end gap-4 lg:ml-[50%] lg:gap-0">
        <ParallaxImage
          src={s.images[0].src}
          alt={s.images[0].alt}
          fill
          sizes="(min-width: 1024px) 300px, 50vw"
          fade={false}
          speed={70}
          direction="right"
          wrapperClassName="aspect-[297/333]"
          className="lg:w-[93%]"
        />
        <ParallaxImage
          src={(s.images[1] ?? s.images[0]).src}
          alt={(s.images[1] ?? s.images[0]).alt}
          fill
          sizes="(min-width: 1024px) 320px, 50vw"
          fade={false}
          speed={40}
          direction="right"
          wrapperClassName="aspect-[320/437]"
        />
      </div>

      <div className="relative mt-10 grid gap-10 lg:mt-0 lg:grid-cols-4 lg:gap-0">
        <div className="lg:col-span-2 lg:-mt-10">
               <SolutionText s={s} index={index} total={total} theme={theme} />
        </div>
        <BulletList items={s.items} className="lg:col-span-2 lg:pl-[200px] lg:pt-10" />
        <ScrollArrow {...arrowDownLeft} className={`${arrow} -top-10 left-[34%] w-[14.6%]`} />
        <ScrollArrow {...arrowDownRight} className={`${arrow} left-[53%] top-[70px] w-[9.4%]`} />
      </div>
    </article>
  );
}