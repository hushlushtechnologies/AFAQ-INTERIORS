import { Container } from "@/components/ui/Container";
import { LineReveal } from "@/components/motion/LineReveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { ScrollRevealText } from "@/components/motion/ScrollRevealText";
import { careers } from "@/content/careers";

const { culture } = careers;

export function CareersCulture() {
  return (
    <section
      aria-labelledby="careers-culture-heading"
      className="bg-ivory py-24 text-ink md:py-32 xl:py-[180px]"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[714fr_408fr] lg:gap-[46px] lg:pl-[128px]">
          {/* Text: headline + paragraph, settled to the bottom like the design */}
          <div className="order-2 flex flex-col justify-end lg:order-none">
            <LineReveal
              id="careers-culture-heading"
              as="h2"
              lines={culture.title}
              className="font-display text-[40px] leading-[1.1] sm:text-5xl lg:text-6xl xl:text-[84px]"
            />
            <ScrollRevealText
              paragraphs={[culture.body]}
              className="mt-12 max-w-[700px] text-lg leading-snug md:text-[22px] lg:mt-[70px]"
            />
          </div>

          {/* Photo */}
          <ParallaxImage
            src={culture.image.src}
            alt={culture.image.alt}
            fill
            sizes="(min-width: 1024px) 408px, 100vw"
            fade={false}
            speed={50}
            direction="right"
            wrapperClassName="aspect-[408/570]"
            className="order-1 lg:order-none"
          />
        </div>
      </Container>
    </section>
  );
}