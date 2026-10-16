import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ColumnLines } from "@/components/motion/ColumnLines";
import { LineReveal } from "@/components/motion/LineReveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Rail } from "@/components/motion/Rail";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { ContactInfo } from "@/components/sections/contact/ContactInfo";
import { MapEmbed } from "@/components/sections/contact/MapEmbed";
import { contact } from "@/content/contact";
import { site } from "@/content/site";
import { FaqSection } from "@/components/sections/faq/FaqSection";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Afaq Al Manzel Interiors. Share your property, requirements, and vision, and our Dubai team will help shape the next step.",
};

export default function ContactPage() {
  return (
    <>
    <section
      aria-labelledby="contact-title"
      className="relative overflow-x-clip bg-ivory pb-24 pt-[clamp(120px,15vw,285px)] text-ink lg:[--cell:calc((100vw_-_4rem)/4)] xl:pb-[160px] xl:[--cell:min(320px,25vw)]"
    >
      <ColumnLines lineClassName="bg-terracotta/30" />

      <Rail />

      {/* ---------- Title ---------- */}
      <Container className="relative">
        <div className="pb-16 lg:h-[var(--cell)] lg:pb-0">
          <div className="inline-flex flex-col items-end">
            <LineReveal
              id="contact-title"
              as="h1"
              lines={[contact.title]}
              className="font-display text-[56px] leading-[0.95] sm:text-7xl xl:text-[106px]"
            />
            <Reveal delay={0.4}>
              <p className="mt-3 text-sm uppercase tracking-[0.08em] md:text-lg">{contact.subtitle}</p>
            </Reveal>
          </div>
        </div>
      </Container>

      <Rail />

      {/* ---------- Statement ---------- */}
      <Container className="relative">
        <div className="py-12 lg:grid lg:h-[var(--cell)] lg:grid-cols-4 lg:py-0">
          <LineReveal
            as="h2"
            lines={contact.statement}
            className="font-sans text-3xl font-medium leading-[1.15] tracking-tight sm:text-4xl lg:col-span-2 lg:col-start-3 lg:pt-1 xl:text-[54px]"
          />
        </div>
      </Container>

      <Rail />

      {/* ---------- Intro + form ---------- */}
      <Container className="relative">
        <div className="grid gap-14 pb-16 lg:grid-cols-4 lg:gap-0 lg:pb-[190px]">
          <div className="lg:col-span-2 lg:pr-[90px]">
            <Reveal>
              <p className="pt-3 text-lg leading-snug md:text-[22px]">{contact.intro}</p>
            </Reveal>
            <ParallaxImage
              src={contact.image.src}
              alt={contact.image.alt}
              fill
              sizes="(min-width: 1024px) 515px, 100vw"
              fade={false}
              speed={40}
              wrapperClassName="aspect-[515/450]"
              className="mt-10 lg:w-[90%]"
            />
          </div>
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </Container>

      <Rail />

      {/* ---------- Info ---------- */}
      <Container className="relative">
        <ContactInfo />
      </Container>

      <Rail />

      {/* ---------- Map ---------- */}
      <Container className="relative mt-16 lg:mt-[70px]">
               <MapEmbed src={site.mapEmbed} title={`Map showing ${site.name}`} />
      </Container>
    </section>
     <FaqSection id="contact-faq" items={contact.faq} />
     </>
  );
}