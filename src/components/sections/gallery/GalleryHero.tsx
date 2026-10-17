"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ease } from "@/lib/motion";
import { gallery } from "@/content/gallery";
import { Button } from "@/components/ui/Button";
import { LineReveal } from "@/components/motion/LineReveal";
import { FeaturedMarquee } from "./FeaturedMarquee";

const { hero } = gallery;

export function GalleryHero() {
  const leftRef = useRef<HTMLDivElement>(null);
  const reduce = !!useReducedMotion();
  const { scrollYProgress } = useScroll({ target: leftRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: ease.out, delay },
  });

  return (
    <section aria-labelledby="gallery-title" className="grid bg-ivory text-ink lg:h-svh lg:min-h-[680px] lg:grid-cols-2">
      {/* ---------- Left: video gallery teaser ---------- */}
      <div ref={leftRef} className="relative h-[75svh] min-h-[480px] overflow-hidden lg:h-full">
        <motion.div
          className="absolute inset-0 overflow-hidden"
          initial={reduce ? false : { clipPath: "inset(0% 100% 0% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 1.4, ease: ease.inOut }}
        >
          <motion.div className="absolute inset-x-0 -top-[8%] h-[116%]" style={reduce ? undefined : { y: imageY }}>
            <motion.div
              className="absolute inset-0"
              initial={reduce ? false : { scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2, ease: ease.out }}
            >
              <Image src={hero.video.image.src} alt={hero.video.image.alt} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </motion.div>
          </motion.div>
          <div aria-hidden className="absolute inset-0 bg-black/35" />
        </motion.div>

        <div className="relative z-10 grid h-full place-items-center px-6 text-center">
          <div>
            <motion.p className="text-lg text-gold" {...rise(0.8)}>{hero.video.eyebrow}</motion.p>
            <motion.h2 className="mt-3 font-display text-5xl text-cream sm:text-6xl xl:text-[72px]" {...rise(0.95)}>
              {hero.video.title}
            </motion.h2>
            <motion.div className="mt-8" {...rise(1.1)}>
              <Button href={hero.video.cta.href} variant="accent">{hero.video.cta.label}</Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ---------- Right: heading + marquee (cards run off the right edge) ---------- */}
      <div className="flex flex-col justify-center overflow-hidden py-20 pl-5 md:pl-8 lg:py-0 lg:pl-[22px] lg:pt-24">
        <motion.p className="text-lg text-accent" {...rise(0.5)}>{hero.eyebrow}</motion.p>
        <LineReveal
          id="gallery-title"
          as="h1"
          lines={hero.title}
          className="mt-2 pr-5 font-display text-[40px] leading-[1.08] sm:text-5xl xl:text-[64px]"
        />
        <div className="mt-8 lg:mt-10">
          <FeaturedMarquee items={hero.featured} />
        </div>
      </div>
    </section>
  );
}