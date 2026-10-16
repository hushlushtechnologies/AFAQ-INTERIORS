"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ease } from "@/lib/motion";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { Container } from "@/components/ui/Container";

type Props = { src: string; alt: string; watermark: string };

export function ServiceHeroImage({ src, alt, watermark }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = !!useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const show = reduce || inView;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const markX = useTransform(scrollYProgress, [0, 1], [0, -140]);

  return (
    <div ref={ref} className="relative aspect-[4/3] md:aspect-[1864/866]">
      {/* Photo: opens from the centre, then parallax */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ clipPath: reduce ? "inset(0% 0% 0% 0%)" : "inset(12% 22% 12% 22%)" }}
        animate={{ clipPath: show ? "inset(0% 0% 0% 0%)" : "inset(12% 22% 12% 22%)" }}
        transition={{ duration: 1.6, ease: ease.inOut }}
      >
        <motion.div
          className="absolute inset-x-0 -top-[10%] h-[120%]"
          style={reduce ? undefined : { y: imageY }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: reduce ? 1 : 1.2 }}
            animate={{ scale: show ? 1 : 1.2 }}
            transition={{ duration: 2, ease: ease.out }}
          >
            <Image src={src} alt={alt} fill priority sizes="100vw" className="object-cover" />
          </motion.div>
        </motion.div>

        {/* Watermark: aligned to the content column, rises letter by letter */}
        <div aria-hidden className="absolute inset-x-0 bottom-0">
          <Container>
            <motion.p
              className="flex overflow-hidden whitespace-pre font-sans text-[13vw] font-extralight uppercase leading-[0.78] text-white/75 lg:text-[8.4vw] xl:text-[160px]"
              style={isDesktop && !reduce ? { x: markX } : undefined}
            >
              {watermark.split("").map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ y: reduce ? "0%" : "100%" }}
                  animate={{ y: show ? "0%" : "100%" }}
                  transition={{ duration: 1, ease: ease.out, delay: 0.9 + i * 0.045 }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.p>
          </Container>
        </div>
      </motion.div>
    </div>
  );
}