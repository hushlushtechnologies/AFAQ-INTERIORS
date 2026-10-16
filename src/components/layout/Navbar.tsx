 "use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // ← NEW
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useLenis } from "lenis/react";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { contactHref } from "@/content/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MenuToggle } from "./MenuToggle";
import { MenuOverlay } from "./MenuOverlay";

// ← NEW: pages whose hero is dark (white icons). Every other page gets dark icons.
// const DARK_HERO_ROUTES = ["/"];
const DARK_HERO_ROUTES = ["/", "/careers"];

const intro = (delay: number) => ({
  initial: { opacity: 0, y: -16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: ease.out, delay },
});

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const lenis = useLenis();

  // ← NEW
  const pathname = usePathname();
  const onDark = DARK_HERO_ROUTES.includes(pathname);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > prev && y > 160);
  });

  // Lock scroll while the menu is open
  useEffect(() => {
    if (open) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
    }
  }, [open, lenis]);

  // Close the menu with the Escape key
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const dim = {
    animate: open ? { filter: "blur(6px)", opacity: 0.45 } : { filter: "blur(0px)", opacity: 1 },
    transition: { duration: 0.6, ease: ease.out },
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={false}
        animate={{ y: hidden && !open ? "-100%" : "0%" }}
        transition={{ duration: 0.6, ease: ease.inOut }}
      >
        <div
          className={cn(
            "transition-[background-color,padding,backdrop-filter] duration-500",
            scrolled && !open
              ? cn("py-4 backdrop-blur-md", onDark ? "bg-background/70" : "bg-ivory/80") // ← UPDATED
              : "py-6 md:pt-10 xl:pt-[88px]",
          )}
        >
          <Container className="grid grid-cols-3 items-center">
            <motion.div {...intro(0.2)} className="justify-self-start">
              {/* ← UPDATED: dark lines on light pages, white on the home hero and when open */}
              <MenuToggle
                open={open}
                onToggle={() => setOpen((o) => !o)}
                color={open || onDark ? "bg-white" : "bg-ink"}
              />
            </motion.div>

            {/* <motion.div {...intro(0.35)} className="justify-self-center">
              <motion.div {...dim} inert={open}>
                <Link href="/" aria-label="Afaq Interiors home">
                  <Image
                    src="/images/logo.png"
                    alt="Afaq Interiors"
                    width={140}
                    height={64}
                    priority
                    className="h-12 w-auto md:h-16"
                  />
                </Link>
              </motion.div>
            </motion.div> */}

                        <motion.div {...intro(0.35)} className="justify-self-center">
              <motion.div {...dim} inert={open}>
                <Link
                  href="/"
                  aria-label="Afaq Al Manzel Interiors, go to homepage"
                  className="relative flex flex-col items-center"
                >
                  <Image
                    src="/images/logo-mark.svg"
                    alt=""
                    width={64}   // ← set to your SVG's real width
                    height={60}  // ← set to your SVG's real height
                    priority
                    unoptimized
                    className={cn(
                      "h-auto transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      scrolled && !open ? "w-[44px] lg:w-[52px]" : "w-[52px] lg:w-[64px]",
                    )}
                  />
                  <span
                    className={cn(
                      "mt-1 whitespace-nowrap bg-[linear-gradient(90deg,#C78811_0.02%,#F5D124_61.61%,#C58510_123.21%)] bg-clip-text font-display font-semibold uppercase leading-none text-transparent",
                      "transition-[font-size,letter-spacing] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      scrolled && !open
                        ? "text-[6.5px] tracking-[0.24em] lg:text-[7px]"
                        : "text-[7px] tracking-[0.26em] lg:text-[8px]",
                    )}
                  >
                    Al Manzel Interior Design
                  </span>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div {...intro(0.5)} className="justify-self-end">
              <motion.div {...dim} inert={open}>
                <Button href={contactHref} variant="light" className="hidden sm:inline-flex">
                  Contact Us
                </Button>
              </motion.div>
            </motion.div>
          </Container>
        </div>
      </motion.header>

      <AnimatePresence>{open && <MenuOverlay onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  );
}