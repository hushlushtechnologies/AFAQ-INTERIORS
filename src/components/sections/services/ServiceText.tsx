"use client";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ease, stagger } from "@/lib/motion";
import type { Service } from "@/content/services";
import { LineReveal } from "@/components/motion/LineReveal";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: ease.out } },
};

export function ServiceText({ service, className }: { service: Service; className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div className={className}>
      <LineReveal as="h3" lines={service.title} className="font-display text-3xl leading-[1.15] xl:text-[40px]" />

      <motion.ul
        className="mt-5 space-y-2.5"
        variants={stagger(0.06, 0.25)}
        initial={reduce ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {service.items.map((label) => (
          <motion.li key={label} variants={item} className="flex items-center gap-2.5 text-base md:text-[17px]">
            <span aria-hidden className="size-2 shrink-0 rounded-full bg-gold" />
            {label}
          </motion.li>
        ))}
      </motion.ul>

      <Reveal delay={0.5} className="mt-7">
        <Button href={service.href} variant="outline" className="md:px-6 md:py-2.5 md:text-base">
          {service.cta}
        </Button>
      </Reveal>
    </div>
  );
}