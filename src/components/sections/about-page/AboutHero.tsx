"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { aboutPage } from "@/content/about-page";
import { contactHref } from "@/content/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const { hero } = aboutPage;
const headline = "font-display leading-none text-[40px] sm:text-6xl lg:text-[80px] xl:text-[96px]";

function RiseLine({ text, delay, reduce }: { text: string; delay: number; reduce: boolean }) {
  return (
    <span className="block overflow-hidden pb-[0.25em]">
      <motion.span
        className="block whitespace-nowrap"
        initial={reduce ? false : { y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.2, ease: ease.out, delay }}
      >
        {text}
      </motion.span>
    </span>
  );
}

export function AboutHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = !!useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const drift = isDesktop && !reduce;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const topX = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const bottomX = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section
      ref={ref}
      aria-labelledby="about-hero-title"
      className="relative overflow-x-clip bg-ivory pb-24 pt-36 text-ink md:pt-48 xl:pb-[140px] xl:pt-[230px]"
    >
      {/* One real heading for screen readers & SEO; the visual lines are decorative */}
      <h1 id="about-hero-title" className="sr-only">
        {hero.lines.join(" ")}
      </h1>

      {/* Line 1: sits on the image edge, drifts right on scroll */}
      <Container>
              <motion.div
          aria-hidden
          className={cn(headline, "relative z-10 mb-2 md:mb-3")}
          style={drift ? { x: topX } : undefined}
        >
          <RiseLine text={hero.lines[0]} delay={0.5} reduce={reduce} />
        </motion.div>
      </Container>

      {/* Image: opens from the centre, then parallax */}
      <div className="px-4 md:px-7">
        <motion.div
          className="relative aspect-[4/3] overflow-hidden md:aspect-[1864/676]"
          initial={reduce ? false : { clipPath: "inset(14% 22% 14% 22%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 1.6, ease: ease.inOut, delay: 0.2 }}
        >
          <motion.div
            className="absolute inset-x-0 -top-[10%] h-[120%]"
            style={reduce ? undefined : { y: imageY }}
          >
            <motion.div
              className="absolute inset-0"
              initial={reduce ? false : { scale: 1.25 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2, ease: ease.out, delay: 0.2 }}
            >
              <Image
                src={hero.image.src}
                alt={hero.image.alt}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Line 2: right-aligned under the image, drifts left on scroll */}
      <Container>
             <motion.div
          aria-hidden
          className={cn(headline, "relative z-10 mt-6 flex justify-end md:mt-8")}
          style={drift ? { x: bottomX } : undefined}
        >
          <RiseLine text={hero.lines[1]} delay={0.7} reduce={reduce} />
        </motion.div>

        {/* Intro + CTA */}
        <motion.div
          className="mt-10 md:mt-14"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: ease.out, delay: 1.1 }}
        >
          <p className="max-w-[650px] text-lg leading-snug md:text-[22px]">{hero.body}</p>
          <Button href={contactHref} variant="accent" className="mt-6">
            Contact Us
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}