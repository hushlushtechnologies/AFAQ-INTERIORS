"use client";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ease } from "@/lib/motion";

type Pillar = { title: string; subtitle: string };

export function StoryPillars({ items }: { items: readonly Pillar[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const show = reduce || inView;

  return (
    <div ref={ref} className="grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4 lg:gap-0">
      {items.map((p, i) => {
        const delay = i * 0.15;
        return (
          <div key={p.title} className="lg:pr-6">
            <div aria-hidden className="flex gap-1.5">
              {items.map((_, di) =>
                di === i ? (
                  <motion.span
                    key={di}
                    className="size-2 rounded-full bg-terracotta"
                    initial={reduce ? false : { scale: 0 }}
                    animate={show ? { scale: 1 } : undefined}
                    transition={{ duration: 0.5, ease: ease.out, delay: delay + 0.2 }}
                  />
                ) : (
                  <span key={di} className="size-2 rounded-full bg-terracotta/25" />
                ),
              )}
            </div>

            <motion.div
              className="mt-10 lg:mt-20"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={show ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.8, ease: ease.out, delay: delay + 0.35 }}
            >
              <h3 className="font-display text-xl text-terracotta xl:text-[22px]">{p.title}</h3>
              <p className="mt-1.5 text-[15px] md:text-base">{p.subtitle}</p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}