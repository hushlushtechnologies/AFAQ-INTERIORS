import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ColumnLines } from "@/components/motion/ColumnLines";
import { LineReveal } from "@/components/motion/LineReveal";
import { Reveal } from "@/components/motion/Reveal";
import { contactHref, services } from "@/content/navigation";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you’re looking for doesn’t exist or has moved.",
};

const quickLinks = [
  ...services.slice(0, 4),
  { label: "Gallery", href: "/gallery" },
  { label: "About Us", href: "/about" },
];

export default function NotFound() {
  return (
    <section
      aria-labelledby="not-found-title"
      className="relative flex min-h-svh items-center overflow-x-clip bg-ivory pb-24 pt-36 text-ink md:pt-44"
    >
      <ColumnLines lineClassName="bg-terracotta/30" />

      <Container className="relative">
        <div className="lg:pl-[128px]">
          {/* Giant soft "404" */}
          <LineReveal
            as="p"
            lines={["404"]}
            className="select-none font-display text-[clamp(120px,24vw,380px)] leading-[0.85] text-terracotta/20"
          />

          <div className="-mt-[0.6em] grid gap-10 text-[clamp(120px,24vw,380px)] lg:grid-cols-2 lg:items-end">
            <div className="text-base">
              <Reveal delay={0.2}>
                <p className="text-base text-accent">Page Not Found</p>
              </Reveal>
              <LineReveal
                id="not-found-title"
                as="h1"
                lines={["This Space Hasn’t", "Been Designed Yet."]}
                delay={0.25}
                className="mt-3 font-display text-[36px] leading-[1.1] sm:text-5xl xl:text-[64px]"
              />
            </div>

            <div className="text-base">
              <Reveal delay={0.4}>
                <p className="max-w-[520px] text-lg leading-snug md:text-[22px]">
                  The page you’re looking for may have moved or no longer exists. Let’s get you back to
                  something beautiful.
                </p>
              </Reveal>
              <Reveal delay={0.5} className="mt-8 flex flex-wrap gap-4 md:gap-6">
                <Button href="/" variant="accent">Back to Home</Button>
                <Button href={contactHref} variant="outline">Contact Us</Button>
              </Reveal>
            </div>
          </div>

          {/* Quick links */}
          <Reveal delay={0.6} className="mt-20 border-t border-terracotta/30 pt-8 lg:mt-28">
            <nav aria-label="Popular pages">
              <p className="font-display text-xl text-terracotta">Popular Pages</p>
              <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3 text-lg">
                {quickLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="link-underline hover:text-accent">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}