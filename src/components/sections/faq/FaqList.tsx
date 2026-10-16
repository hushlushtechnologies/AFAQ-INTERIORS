"use client";
import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { PlusMinus } from "@/components/ui/PlusMinus";

export type FaqItem = { q: string; a: string };

export function FaqList({ items }: { items: readonly FaqItem[] }) {
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
    <ul className="divide-y divide-ink/15 border-b border-ink/15">
      {items.map((item, i) => {
        const isOpen = open.has(i);
        const btnId = `${baseId}-q-${i}`;
        const panelId = `${baseId}-a-${i}`;

        return (
          <motion.li
            key={item.q}
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
                  "group grid w-full cursor-pointer grid-cols-[auto_1fr] items-center gap-6 pt-7 text-left transition-[padding] duration-500 lg:gap-10",
                  isOpen ? "pb-3" : "pb-7",
                )}
              >
                <PlusMinus open={isOpen} closedClass="bg-ink" className="lg:ml-2.5" />
                <span className="font-display text-xl leading-snug transition-colors duration-500 group-hover:text-accent lg:text-right xl:text-[26px]">
                  {item.q}
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="answer"
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  className="overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease: ease.inOut }}
                >
                  <p className="pb-8 pl-14 text-base leading-snug lg:ml-auto lg:max-w-[1120px] lg:pl-0 lg:text-right xl:text-[17px]">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.li>
        );
      })}
    </ul>
  );
}