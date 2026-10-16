import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollRevealText } from "@/components/motion/ScrollRevealText";
import { about } from "@/content/about";
import { contactHref } from "@/content/navigation";
import { AboutCollage } from "./AboutCollage";

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-ivory py-24 text-ink md:py-32 xl:py-[180px]"
    >
      <Container>
        <div className="lg:pl-[128px]">
          {/* Intro */}
          <div className="grid gap-10 lg:grid-cols-[408fr_714fr] lg:gap-[30px]">
            <ImageReveal
              src={about.intro.image}
              alt={about.intro.alt}
              fill
              sizes="(min-width: 1024px) 408px, 100vw"
              wrapperClassName="aspect-[408/570]"
            />

            <div className="flex flex-col justify-between gap-10 lg:pt-12">
              <div>
                <Reveal>
                  <p className="text-lg text-accent">About Us</p>
                </Reveal>
                <LineReveal
                  id="about-heading"
                  as="h2"
                  lines={about.intro.title}
                  className="mt-4 font-display text-[40px] leading-[1.1] sm:text-5xl lg:text-6xl xl:text-[84px]"
                />
              </div>

              <ScrollRevealText
                paragraphs={about.intro.body}
                className="text-lg leading-snug md:text-[22px]"
              />
            </div>
          </div>

          {/* Collage */}
          <AboutCollage />

          {/* Outro */}
          <div className="mt-24 grid gap-8 md:mt-32 lg:grid-cols-[385px_1fr] xl:mt-[150px]">
            <LineReveal
              as="h3"
              lines={about.outro.title}
              className="font-display text-3xl leading-[1.1] md:text-4xl xl:text-[44px]"
            />
            <div>
              <Reveal>
                <p className="max-w-[620px] text-lg leading-snug md:text-[22px]">{about.outro.body}</p>
              </Reveal>
              <Reveal delay={0.15} className="mt-8 flex flex-wrap gap-4 md:gap-6">
                <Button href="/about" variant="accent">Discover Our Story</Button>
                <Button href={contactHref} variant="outline">Contact Us</Button>
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}