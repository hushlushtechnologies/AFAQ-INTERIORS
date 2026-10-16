"use client";
import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { process } from "@/content/process";

function PlusMinus({ open }: { open: boolean }) {
  const bar = cn(
    "absolute transition-colors duration-500",
    open ? "bg-accent" : "bg-cream",
  );
  return (
    <span aria-hidden className="relative block size-8 shrink-0 md:size-9">
      <span className={cn(bar, "inset-x-0 top-[calc(50%-1px)] h-0.5")} />
      <motion.span
        className={cn(bar, "inset-y-0 left-[calc(50%-1px)] w-0.5")}
        animate={{ rotate: open ? 90 : 0 }}
        transition={{ duration: 0.5, ease: ease.inOut }}
      />
    </span>
  );
}

export function ProcessAccordion() {
  const baseId = useId();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <ul className="divide-y divide-accent/15 border-b border-accent/15">
      {process.steps.map((step, i) => {
        const isOpen = open.has(i);
        const btnId = `${baseId}-btn-${i}`;
        const panelId = `${baseId}-panel-${i}`;

        return (
          <motion.li
            key={step.title}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: ease.out, delay: i * 0.06 }}
          >
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className={cn(
                  "group flex w-full cursor-pointer items-center justify-between gap-6 pt-6 text-left transition-[padding] duration-500 md:pt-7",
                  isOpen ? "pb-2" : "pb-6 md:pb-7",
                )}
              >
                <span
                  className={cn(
                    "font-display text-xl transition-colors duration-500 md:text-2xl",
                    isOpen
                      ? "text-gold"
                      : "text-cream group-hover:text-gold/80",
                  )}
                >
                  {step.title}
                </span>
                <PlusMinus open={isOpen} />
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="panel"
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  className="overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease: ease.inOut }}
                >
                  <div className="  pb-7 pr-12 md:pr-16">
                    <p className="text-lg text-white">{step.subtitle}</p>
                    <p className="mt-5 max-w-[980px] text-[15px] leading-relaxed text-white/75 md:text-base">
                      {step.text}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.li>
        );
      })}
    </ul>
  );
}
