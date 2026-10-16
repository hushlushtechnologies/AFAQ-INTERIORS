"use client";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { why } from "@/content/why";
import { ImageReveal } from "@/components/motion/ImageReveal";

const SEG = 0.3; // seconds each line segment takes to draw

export function WhyCards() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const show = reduce || inView;
  const total = why.points.length;

  const drawX = (delay: number) => ({
    initial: reduce ? false : { scaleX: 0 },
    animate: show ? { scaleX: 1 } : undefined,
    transition: { duration: SEG, ease: "linear" as const, delay },
  });

  const drawY = (delay: number) => ({
    initial: reduce ? false : { scaleY: 0 },
    animate: show ? { scaleY: 1 } : undefined,
    transition: { duration: 0.6, ease: ease.out, delay },
  });

  const rail = "absolute h-px origin-left bg-terracotta/40";

  return (
    <div
      ref={ref}
      className="grid gap-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-0 lg:gap-y-5"
    >
      {why.points.map((p, i) => {
        const first = i === 0;
        const last = i === total - 1;
        const d = SEG * (i + 1); // this card's line segment starts after the previous one

        return (
          <div key={p.title} className="group flex flex-col gap-5 lg:contents">
            {/* Image (grid row 1 on desktop) */}
            <div className={cn("lg:row-start-1", !last && "lg:pr-6")}>
              <ImageReveal
                src={p.image}
                alt={p.alt}
                fill
                delay={i * 0.12}
                sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                wrapperClassName={cn("aspect-[16/10]", last ? "lg:aspect-[320/175]" : "lg:aspect-[295/175]")}
                className="transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
            </div>

            {/* Text (grid row 2 on desktop) */}
            <div
              className={cn(
                "relative border-t border-terracotta/40 pt-4 lg:row-start-2 lg:border-0 lg:pb-5 lg:pt-0",
                !last && "lg:pr-6",
              )}
            >
              {/* Rails: desktop only */}
              <div aria-hidden className="hidden lg:block">
                <motion.span className={cn(rail, "inset-x-0 top-0")} {...drawX(d)} />
                <motion.span className={cn(rail, "inset-x-0 bottom-0")} {...drawX(d)} />
                {first && (
                  <>
                    <motion.span className={cn(rail, "right-full top-0 w-[50vw]")} {...drawX(0)} />
                    <motion.span className={cn(rail, "right-full bottom-0 w-[50vw]")} {...drawX(0)} />
                  </>
                )}
                {last && (
                  <>
                    <motion.span className={cn(rail, "left-full top-0 w-[50vw]")} {...drawX(d + SEG)} />
                    <motion.span className={cn(rail, "left-full bottom-0 w-[50vw]")} {...drawX(d + SEG)} />
                  </>
                )}
                <motion.span
                  className="absolute left-0 top-0 h-full w-px origin-top bg-terracotta/40"
                  {...drawY(d + 0.2)}
                />
              </div>

              {/* Step dots */}
              <div aria-hidden className="flex gap-1.5 lg:absolute lg:left-0 lg:top-0 lg:-translate-y-1/2">
                {Array.from({ length: total }).map((_, di) =>
                  di === i ? (
                    <motion.span
                      key={di}
                      className="size-2 rounded-full bg-terracotta"
                      initial={reduce ? false : { scale: 0 }}
                      animate={show ? { scale: 1 } : undefined}
                      transition={{ duration: 0.5, ease: ease.out, delay: d + 0.35 }}
                    />
                  ) : (
                    <span key={di} className="size-2 rounded-full bg-terracotta/25" />
                  ),
                )}
              </div>

              <motion.div
                className="mt-4 lg:mt-20"
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={show ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.8, ease: ease.out, delay: d + 0.25 }}
              >
                <h3 className="font-display text-xl text-terracotta transition-colors duration-500 group-hover:text-accent xl:text-[22px]">
                  {p.title}
                </h3>
                <p className="mt-2 max-w-[280px] text-[15px] leading-snug md:text-base">{p.text}</p>
              </motion.div>
            </div>
          </div>
        );
      })}
    </div>
  );
}