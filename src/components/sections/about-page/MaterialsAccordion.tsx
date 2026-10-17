"use client";
import { useId, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { ease } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { PlusMinus } from "@/components/ui/PlusMinus";
import { ImageReveal } from "@/components/motion/ImageReveal";

// Remove: import { aboutPage } from "@/content/about-page";
// Remove: type Item = (typeof aboutPage.materials.items)[number];

export type MaterialItem = {
  title: string;
  text: string;
  image: string;
  detail: { src: string; alt: string };
};
 
const pad = (n: number) => String(n).padStart(2, "0");

function MaterialRow({
  item,
  index,
  isOpen,
  onToggle,
  baseId,
}: {
  item: MaterialItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  baseId: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const show = reduce || inView;

  const titleId = `${baseId}-t-${index}`;
  const panelId = `${baseId}-p-${index}`;

  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: show ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.8, ease: ease.out, delay },
  });

  return (
    <div ref={ref}>
      {/* ---------- Row ---------- */}
      <div className="relative">
        <motion.span
          aria-hidden
          className="absolute inset-x-0 top-0 h-px origin-left bg-ink/15"
          initial={reduce ? false : { scaleX: 0 }}
          animate={show ? { scaleX: 1 } : undefined}
          transition={{ duration: 1.2, ease: ease.inOut }}
        />

        <Container>
          <div className="group relative grid grid-cols-[2.5rem_1fr_auto_auto] items-center gap-4 py-5 lg:h-[var(--cell)] lg:grid-cols-4 lg:gap-0 lg:py-0">
            <motion.span className="text-sm tabular-nums md:text-base" {...rise(0.1)}>
              {pad(index + 1)}
            </motion.span>

            <motion.h3
              id={titleId}
              className="font-display text-2xl text-terracotta transition-transform duration-500 group-hover:translate-x-2 xl:text-[30px]"
              {...rise(0.2)}
            >
              {item.title}
            </motion.h3>

            <div className="w-20 lg:h-[72%] lg:w-full">
              <ImageReveal
                src={item.image}
                alt=""
                fill
                delay={0.15}
                sizes="(min-width: 1024px) 320px, 80px"
                wrapperClassName="aspect-[4/3] lg:aspect-auto lg:h-full"
                className="transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
            </div>

            <span className="justify-self-end lg:pr-2">
              <PlusMinus open={isOpen} closedClass="bg-ink" />
            </span>

            {/* Whole row is the click target */}
            <button
              type="button"
              aria-labelledby={titleId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={onToggle}
              className="absolute inset-0 z-10 cursor-pointer focus-visible:outline-offset-[-4px]"
            />
          </div>
        </Container>
      </div>

      {/* ---------- Detail panel ---------- */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="panel"
            id={panelId}
            role="region"
            aria-labelledby={titleId}
            className="relative overflow-hidden"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.7, ease: ease.inOut }}
          >
            <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-ink/15" />
            <Container>
              <div className="grid gap-6 pb-10 pt-6 lg:h-[var(--cell)] lg:grid-cols-4 lg:gap-0 lg:p-0">
                <motion.p
                  className="text-base leading-snug lg:col-span-2 lg:pr-10 lg:pt-[76px] xl:text-[19px]"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: ease.out, delay: 0.3 }}
                >
                  {item.text}
                </motion.p>
                <div className="lg:col-start-4">
                  <ImageReveal
                    src={item.detail.src}
                    alt={item.detail.alt}
                    fill
                    delay={0.25}
                    sizes="(min-width: 1024px) 320px, 100vw"
                    wrapperClassName="aspect-[320/180]"
                  />
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function MaterialsAccordion({ items }: { items: readonly MaterialItem[] }) {
  const baseId = useId();
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className="relative">
        {items.map((item, i) => (
        <MaterialRow
          key={item.title}
          item={item}
          index={i}
          isOpen={open.has(i)}
          onToggle={() => toggle(i)}
          baseId={baseId}
        />
      ))}
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-ink/15" />
    </div>
  );
}