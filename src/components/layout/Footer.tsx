import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CurrentYear } from "@/components/ui/CurrentYear";
import { MailIcon, PhoneIcon, PinIcon, socialIcons } from "@/components/ui/icons";
import { LineReveal } from "@/components/motion/LineReveal";
import { Reveal } from "@/components/motion/Reveal";
import { SparkleDivider } from "@/components/motion/SparkleDivider";
import { contactHref, footerColumns, legalLinks } from "@/content/navigation";
import { site } from "@/content/site";
import { FooterBackdrop } from "./FooterBackdrop";

const colTitle = "font-display text-xl xl:text-[22px]";
const icon = "size-6 shrink-0 transition-colors duration-300 group-hover:text-accent";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ivory text-ink">
          <FooterBackdrop src="/images/footer/shapes.png" width={1920} height={1371} />
      <div className="relative z-10">
        {/* ---------- CTA ---------- */}
        <Container className="pt-24 text-center md:pt-32 xl:pt-[140px]">
          <LineReveal
            as="h2"
            lines={["Have a Space in Mind?", "Let’s Make It Exceptional."]}
            className="font-display text-4xl leading-[1.1] md:text-5xl xl:text-[64px]"
          />
          <Reveal delay={0.1}>
            <p className="mx-auto mt-8 max-w-[620px] text-lg leading-snug md:text-[22px]">
              Tell us about your space, vision, and requirements. Our team will help shape the next step.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="mt-9 flex flex-wrap justify-center gap-4 md:gap-6">
            <Button href={contactHref} variant="accent">Start Your Project</Button>
            <Button href={site.whatsappHref} variant="outline" target="_blank" rel="noopener noreferrer">
              WhatsApp Us
            </Button>
          </Reveal>
          <SparkleDivider className="mx-auto mt-20 w-full max-w-[930px] xl:mt-[100px]" />
        </Container>

        {/* ---------- Main ---------- */}
        <Container className="mt-20 xl:mt-[90px]">
          <div className="lg:pl-16">
            <Reveal>
              <Image
                src="/images/logo-dark.svg"
                alt={site.name}
                width={142}
                height={110}
                className="h-20 w-auto md:h-[110px]"
              />
            </Reveal>
            <LineReveal
              as="p"
              lines={["Interior Design. Design &", "Build. Turnkey Solutions."]}
              className="mt-10 font-display text-3xl leading-[1.15] md:text-4xl xl:text-[44px]"
            />
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-[440px] text-lg leading-snug md:text-[22px]">
                Creating refined spaces through design, craftsmanship, and complete execution.
              </p>
            </Reveal>

                       <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-[1fr_1.15fr_0.85fr_1.4fr] lg:gap-6 xl:mt-[70px]">
              {footerColumns.map((col, i) => (
                <Reveal key={col.title} delay={i * 0.08}>
                  <nav aria-label={col.title}>
                    <h2 className={colTitle}>{col.title}</h2>
                    <ul className="mt-6 space-y-4 text-lg">
                      {col.links.map((l) => (
                        <li key={l.href}>
                          <Link href={l.href} className="link-underline hover:text-accent">
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </Reveal>
              ))}

              <Reveal delay={0.24}>
                <h2 className={colTitle}>Contact Us</h2>
                <address className="mt-6 space-y-7 text-lg not-italic lg:pl-5">
                  <a href={site.phoneHref} className="group flex items-center gap-5">
                    <PhoneIcon className={icon} />
                    <span className="link-underline">{site.phone}</span>
                  </a>
                  <a href={`mailto:${site.email}`} className="group flex items-center gap-5">
                    <MailIcon className={icon} />
                                       <span className="link-underline [overflow-wrap:anywhere]">{site.email}</span>
                  </a>
                  <a href={site.mapHref} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-5">
                    <PinIcon className={icon} />
                    <span className="leading-snug">
                      {site.address.map((line) => (
                        <span key={line} className="block">{line}</span>
                      ))}
                    </span>
                  </a>
                </address>
              </Reveal>
            </div>
          </div>

          {/* ---------- Social ---------- */}
          <SparkleDivider className="mx-auto mt-20 w-full max-w-[930px] xl:mt-[80px]" />
          <div className="py-14 text-center xl:py-[60px]">
            <Reveal>
              <h2 className={colTitle}>Follow Us</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="mt-8 flex flex-wrap justify-center gap-x-12 gap-y-5">
                {site.socials.map((s) => {
                  const Icon = socialIcons[s.label];
                  return (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${s.label}: ${s.handle}`}
                        className="group inline-flex items-center gap-4 text-lg"
                      >
                        <Icon className={icon} />
                        <span className="link-underline">{s.handle}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </Container>

        {/* ---------- Bottom bar ---------- */}
        <div className="bg-peach">
          <Container className="flex flex-col gap-3 py-6 text-sm text-terracotta md:flex-row md:items-center md:justify-between md:text-base">
            <p>
              © <CurrentYear /> {site.name}. All Rights Reserved. Designed by:{" "}
              <span className="font-medium">Hush Lush Technologies</span>
            </p>
            <ul className="flex items-center gap-3">
              {legalLinks.map((l, i) => (
                <li key={l.href} className="flex items-center gap-3">
                  {i > 0 && <span aria-hidden>·</span>}
                  <Link href={l.href} className="link-underline">{l.label}</Link>
                </li>
              ))}
            </ul>
          </Container>
        </div>
      </div>
    </footer>
  );
}