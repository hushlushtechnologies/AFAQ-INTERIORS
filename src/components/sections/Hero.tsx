// "use client";
// import { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import {
//   AnimatePresence,
//   motion,
//   useInView,
//   useReducedMotion,
//   useScroll,
//   useTransform,
// } from "motion/react";
// import { ease } from "@/lib/motion";
// import { cn } from "@/lib/utils";
// import { HERO_INTERVAL, heroSlides, heroTagline } from "@/content/hero";
// import { contactHref } from "@/content/navigation";
// import { Container } from "@/components/ui/Container";
// import { Button } from "@/components/ui/Button";

// const pad = (n: number) => String(n).padStart(2, "0");
// const KEN_BURNS = HERO_INTERVAL / 1000 + 1.5;

// export function Hero() {
//   const ref = useRef<HTMLElement>(null);
//   const reduce = useReducedMotion();
//   const inView = useInView(ref, { amount: 0.3 });

//   const [index, setIndex] = useState(0);
//   const [started, setStarted] = useState(false); // false = first page load
//   const [pageVisible, setPageVisible] = useState(true);

//   const total = heroSlides.length;
//   const slide = heroSlides[index];

//   const goTo = (i: number) => {
//     setStarted(true);
//     setIndex(i);
//   };

//   // Pause when the tab is hidden
//   useEffect(() => {
//     const onChange = () => setPageVisible(!document.hidden);
//     document.addEventListener("visibilitychange", onChange);
//     return () => document.removeEventListener("visibilitychange", onChange);
//   }, []);

//   // Autoplay (off for reduced motion, off-screen, or hidden tab)
//   useEffect(() => {
//     if (reduce || !inView || !pageVisible || total < 2) return;
//     const id = window.setTimeout(() => {
//       setStarted(true);
//       setIndex((i) => (i + 1) % total);
//     }, HERO_INTERVAL);
//     return () => window.clearTimeout(id);
//   }, [index, reduce, inView, pageVisible, total]);

//   // Scroll-linked parallax
//   const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
//   const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
//   const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
//   const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

//   return (
//     <section
//       ref={ref}
//       aria-roledescription="carousel"
//       aria-label="Featured interiors"
//       className="relative h-svh min-h-[640px] overflow-hidden bg-background"
//     >
//       {/* ---------- Background slides ---------- */}
//       <motion.div
//         className="absolute inset-0"
//         style={reduce ? undefined : { y: imageY }}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1.6, ease: ease.out }}
//       >
//         {heroSlides.map((s, i) => {
//           const active = i === index;
//           return (
//             <motion.div
//               key={s.image}
//               aria-hidden={!active}
//               className="absolute inset-0"
//               initial={{ opacity: i === 0 ? 1 : 0, scale: reduce ? 1 : 1.1 }}
//               animate={{
//                 opacity: active ? 1 : 0,
//                 scale: reduce ? 1 : active ? 1 : 1.1,
//                 transition: {
//                   opacity: { duration: 1.4, ease: ease.inOut },
//                   // Slow zoom-out while active; snap back once hidden
//                   scale: active
//                     ? { duration: KEN_BURNS, ease: "easeOut" }
//                     : { duration: 0, delay: 1.4 },
//                 },
//               }}
//             >
//               <Image
//                 src={s.image}
//                 alt={s.alt}
//                 fill
//                 priority={i === 0}
//                 sizes="100vw"
//                 quality={85}
//                 className="object-cover"
//               />
//             </motion.div>
//           );
//         })}

//         {/* Tint overlays: darker at the top for the navbar */}
//         <div aria-hidden className="absolute inset-0 bg-black/25" />
//         <div
//           aria-hidden
//           className="absolute inset-0 bg-linear-to-b from-background/85 via-background/30 to-background/60"
//         />
//       </motion.div>

//       {/* ---------- Content ---------- */}
//       <motion.div
//         className="relative z-10 h-full"
//         style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
//       >
//         <Container className="flex h-full flex-col pb-10 pt-32 md:pb-16 xl:pb-[100px]">
//           {/* Headline */}
//           <div className="flex flex-1 items-center">
//             <h1 className="font-display text-[36px] leading-[1.08] text-cream sm:text-5xl lg:pl-[128px] lg:text-7xl xl:text-[88px]">
//               <AnimatePresence mode="wait">
//                 <motion.span key={index} className="block" initial="hidden" animate="visible" exit="exit">
//                   {slide.title.map((line, li) => (
//                     <span key={li} className="block overflow-hidden pb-[0.08em]">
//                       <motion.span
//                         className="block"
//                         variants={{
//                           hidden: { y: reduce ? "0%" : "110%", opacity: reduce ? 0 : 1 },
//                           visible: {
//                             y: "0%",
//                             opacity: 1,
//                             transition: {
//                               duration: 1.1,
//                               ease: ease.out,
//                               delay: (started ? 0.1 : 0.7) + li * 0.12,
//                             },
//                           },
//                           exit: {
//                             y: reduce ? "0%" : "-110%",
//                             opacity: reduce ? 0 : 1,
//                             transition: { duration: 0.6, ease: ease.inOut, delay: li * 0.06 },
//                           },
//                         }}
//                       >
//                         {line}
//                       </motion.span>
//                     </span>
//                   ))}
//                 </motion.span>
//               </AnimatePresence>
//             </h1>
//           </div>

//           {/* Bottom row */}
//           <motion.div
//             className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"
//             initial={{ opacity: 0, y: 24 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1, ease: ease.out, delay: 1.1 }}
//           >
//             <div>
//               <p className="max-w-[460px] text-lg leading-snug text-white/90 md:text-[22px]">
//                 {heroTagline}
//               </p>

//               <div className="mt-6 flex items-center gap-4">
//                 <div className="flex items-center">
//                   {heroSlides.map((_, i) => (
//                     <button
//                       key={i}
//                       type="button"
//                       onClick={() => goTo(i)}
//                       aria-label={`Go to slide ${i + 1}`}
//                       aria-current={i === index}
//                       className="group grid size-4 cursor-pointer place-items-center"
//                     >
//                       <span
//                         className={cn(
//                           "size-2 rounded-full transition-all duration-500",
//                           i === index ? "scale-125 bg-accent" : "bg-white/80 group-hover:bg-white",
//                         )}
//                       />
//                     </button>
//                   ))}
//                 </div>

//                 <p className="font-display text-xl tabular-nums text-cream">
//                   <span className="sr-only">
//                     Slide {index + 1} of {total}
//                   </span>
//                   <span aria-hidden className="inline-flex">
//                     <span className="relative inline-flex overflow-hidden">
//                       <AnimatePresence mode="popLayout" initial={false}>
//                         <motion.span
//                           key={index}
//                           initial={{ y: "100%" }}
//                           animate={{ y: "0%" }}
//                           exit={{ y: "-100%" }}
//                           transition={{ duration: 0.6, ease: ease.out }}
//                         >
//                           {pad(index + 1)}
//                         </motion.span>
//                       </AnimatePresence>
//                     </span>
//                     /{pad(total)}
//                   </span>
//                 </p>
//               </div>
//             </div>

//             <Button href={contactHref} variant="accent" className="self-start sm:self-auto">
//               Contact Us
//             </Button>
//           </motion.div>
//         </Container>
//       </motion.div>
//     </section>
//   );
// }

import { Button } from "@/components/ui/Button";
import { HeroSlider } from "@/components/sections/shared/HeroSlider";
import { heroSlides, heroTagline } from "@/content/hero";
import { contactHref } from "@/content/navigation";

export function Hero() {
  return (
    <HeroSlider
      slides={heroSlides}
      tagline={heroTagline}
      theme="dark"
      actions={<Button href={contactHref} variant="accent">Contact Us</Button>}
    />
  );
}