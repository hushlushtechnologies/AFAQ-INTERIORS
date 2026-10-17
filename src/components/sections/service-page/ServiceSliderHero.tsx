import { Button } from "@/components/ui/Button";
import { HeroSlider } from "@/components/sections/shared/HeroSlider";
import type { SliderService } from "@/content/service-pages";
import { contactHref } from "@/content/navigation";

export function ServiceSliderHero({ data }: { data: SliderService }) {
  const layout = data.heroLayout ?? "center";
  const theme = data.heroTheme ?? "light";

  return (
    <HeroSlider
      slides={data.slides}
      eyebrow={data.eyebrow}
      tagline={layout === "center" ? data.body : undefined}
      theme={theme}
      layout={layout}
      ariaLabel={`${data.eyebrow} projects`}
      actions={
        <>
          <Button href={contactHref} variant="accent">{data.primaryCta}</Button>
          {/* <Button href="/gallery" variant={theme === "dark" ? "outlineLight" : "outline"}>
            Explore Our Work
          </Button> */}
                    <Button
            href={data.secondaryCta?.href ?? "/gallery"}
            variant={theme === "dark" ? "outlineLight" : "outline"}
            {...(data.secondaryCta?.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {data.secondaryCta?.label ?? "Explore Our Work"}
          </Button>
        </>
      }
    />
  );
}