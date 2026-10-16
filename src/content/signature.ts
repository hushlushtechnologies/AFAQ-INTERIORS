export type Band = {
  label: string;
  image: { src: string; alt: string };
  height: string;
  feature?: { script: string; cta: { label: string; href: string } };
};

export const signature = {
  eyebrow: "Signature Work",
  title: ["Designed Around", "the Way You Live."],
  body: "From private cinemas to gaming rooms and wellness spaces, we create highly personalized interiors that turn everyday routines into elevated experiences.",
  bands: [
    {
      label: "Gaming Room Setup",
      image: { src: "/images/signature/gaming.jpg", alt: "Gaming room with neon lighting, racing rig and monitor setup" },
      height: "h-[260px] md:h-[max(240px,16.25vw)]",
    },
    {
      label: "Interior Solution",
      image: { src: "/images/signature/interior.jpg", alt: "Open-plan modern home with marble TV wall and timber slats" },
      height: "h-[460px] md:h-[max(440px,32.3vw)]",
      feature: { script: "Signature Space", cta: { label: "Contact Us", href: "/contact" } },
    },
    {
      label: "Theatre Room Setup",
      image: { src: "/images/signature/theatre.jpg", alt: "Private theatre room with red panelled walls and velvet armchairs" },
      height: "h-[260px] md:h-[max(240px,16.25vw)]",
    },
  ] satisfies Band[],
} as const;