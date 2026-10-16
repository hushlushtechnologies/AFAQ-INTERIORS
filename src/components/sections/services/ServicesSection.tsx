import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { ParallaxImage, FADE_BOTTOM } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollArrow } from "@/components/motion/ScrollArrow";
import { mepService, propertyService, serviceRows, servicesIntro as intro } from "@/content/services";
import { ServiceRow } from "./ServiceRow";
import { ServiceText } from "./ServiceText";
import { arrowLong, arrowSmall } from "./arrows";

const speeds = [70, 110, 70, 110];

export function ServicesSection() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-ivory pb-24 pt-8 text-ink md:pb-32 xl:pb-[180px]"
    >
      <Container>
        {/* ---------- Intro ---------- */}
        <div className="lg:pl-[128px]">
          <Reveal>
            <p className="text-base text-accent">{intro.eyebrow}</p>
          </Reveal>
          <LineReveal
            id="services-heading"
            as="h2"
            underline
            lines={intro.title}
            className="mt-4 font-display text-[40px] leading-[1.15] sm:text-5xl lg:text-6xl xl:text-[80px]"
          />

          <div className="mt-20 grid gap-12 lg:mt-28 lg:grid-cols-[408px_1fr] lg:gap-[86px]">
            <div className="relative">
              <ImageReveal
                src={intro.image}
                alt={intro.alt}
                fill
                sizes="(min-width: 1024px) 408px, 100vw"
                wrapperClassName={cn("aspect-[408/515]", FADE_BOTTOM)}
              />
              <p aria-hidden className="absolute -bottom-1 left-0 font-script text-2xl md:text-[28px]">
                {intro.signature}
              </p>
              <ScrollArrow
                {...arrowSmall}
                className="pointer-events-none absolute bottom-3 left-[75%] hidden w-[121px] lg:block"
              />
            </div>

            <div className="lg:pt-2">
              <LineReveal
                as="h3"
                lines={intro.subtitle}
                className="font-display text-3xl leading-[1.15] md:text-4xl xl:text-[60px]"
              />
              <Reveal delay={0.2}>
                <p className="mt-10 max-w-[540px] text-lg leading-snug md:text-[22px]">{intro.body}</p>
              </Reveal>
            </div>
          </div>
        </div>

        {/* ---------- Zig-zag rows ---------- */}
        <div className="mt-28 space-y-28 lg:mt-48 lg:space-y-40 xl:space-y-[200px]">
          {serviceRows.map((service, i) => (
            <ServiceRow key={service.href} service={service} reverse={i % 2 === 1} speed={speeds[i]} />
          ))}

          {/* ---------- Finale: MEP + Property ---------- */}
          <div className="relative grid gap-16 lg:grid-cols-[30.6%_1fr_30.6%] lg:gap-0">
            <ParallaxImage
              src={mepService.image}
              alt={mepService.alt}
              fill
              sizes="(min-width: 1024px) 394px, 100vw"
              speed={50}
              direction="left"
              wrapperClassName="aspect-[394/514]"
              className="lg:mt-[235px]"
            />
            <ServiceText service={mepService} className="lg:mt-[245px] lg:pl-[8%]" />

            <div>
              <ParallaxImage
                src={propertyService.image}
                alt={propertyService.alt}
                fill
                sizes="(min-width: 1024px) 394px, 100vw"
                speed={120}
                direction="right"
                wrapperClassName="aspect-[394/510]"
              />
              <ServiceText service={propertyService} className="mt-10" />
            </div>

            <ScrollArrow
              {...arrowLong}
              className="pointer-events-none absolute -top-20 left-[33%] hidden w-[33.6%] lg:block"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}