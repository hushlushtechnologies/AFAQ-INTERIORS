"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { animate, motion, useAnimationFrame, useMotionValue, useReducedMotion } from "motion/react";
import { ease } from "@/lib/motion";
import type { FeaturedItem } from "@/content/gallery";

type Props = { items: readonly FeaturedItem[]; speed?: number };

export function FeaturedMarquee({ items, speed = 40 }: Props) {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLUListElement>(null);

  const x = useMotionValue(0);
  const half = useRef(0);          // width of one full set of cards
  const paused = useRef(false);    // hover / focus
  const dragging = useRef(false);
  const lastX = useRef(0);
  const lastT = useRef(0);
  const velocity = useRef(0);      // px per ms, for coasting after a fling

  // Two copies side by side → wrapping by exactly one set loops seamlessly
  const list = [...items, ...items];

  // Keep x within one set's width so the loop never runs out of cards
  const wrap = (v: number) => {
    const h = half.current;
    if (!h) return v;
    return (((v % h) + h) % h) - h;
  };

  // Measure one set (and re-measure on resize)
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => (half.current = el.scrollWidth / 2);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Every frame: coast after a fling, otherwise glide slowly
  useAnimationFrame((_, delta) => {
    if (dragging.current) return;

    if (Math.abs(velocity.current) > 0.02) {
      x.set(wrap(x.get() + velocity.current * delta));
      velocity.current *= Math.pow(0.94, delta / 16); // gentle slow-down
      return;
    }
    velocity.current = 0;

    if (reduce || paused.current) return;
    x.set(wrap(x.get() - (speed * delta) / 1000));
  });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    velocity.current = 0;
    lastX.current = e.clientX;
    lastT.current = performance.now();
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const now = performance.now();
    const dx = e.clientX - lastX.current;
    const dt = Math.max(1, now - lastT.current);
    velocity.current = dx / dt;
    lastX.current = e.clientX;
    lastT.current = now;
    x.set(wrap(x.get() + dx));
  };

  const endDrag = () => (dragging.current = false);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const card = (trackRef.current?.firstElementChild as HTMLElement | null)?.offsetWidth ?? 300;
    const target = x.get() + (e.key === "ArrowLeft" ? card : -card);
    animate(x, target, {
      duration: 0.5,
      ease: ease.out,
      onComplete: () => x.set(wrap(x.get())),
    });
  };

  return (
    <motion.div
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured interiors. Drag or use the arrow keys to browse."
      tabIndex={0}
      className="relative cursor-grab touch-pan-y select-none overflow-hidden outline-none active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-accent/60"
      initial={reduce ? false : { opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.2, ease: ease.out, delay: 0.7 }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerEnter={(e) => e.pointerType === "mouse" && (paused.current = true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && (paused.current = false)}
      onFocus={() => (paused.current = true)}
      onBlur={() => (paused.current = false)}
      onKeyDown={onKeyDown}
    >
      <motion.ul ref={trackRef} className="flex w-max" style={{ x }}>
        {list.map((item, i) => {
          const duplicate = i >= items.length;
          return (
            <li key={i} aria-hidden={duplicate || undefined} className="w-[220px] shrink-0 pr-5 md:w-[294px] md:pr-7">
              <article className="group/card border border-ink/40 bg-ivory">
                <div className="relative aspect-[266/280] overflow-hidden">
                  <Image
                    src={item.image.src}
                    alt={duplicate ? "" : item.image.alt}
                    fill
                    draggable={false}
                    sizes="(min-width: 768px) 266px, 200px"
                    className="pointer-events-none object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-105"
                  />
                </div>
                <div className="px-3 py-2.5 text-center">
                  <h3 className="font-display text-lg text-terracotta xl:text-xl">{item.title}</h3>
                  <p className="mt-0.5 text-sm">{item.subtitle}</p>
                </div>
              </article>
            </li>
          );
        })}
      </motion.ul>
    </motion.div>
  );
}