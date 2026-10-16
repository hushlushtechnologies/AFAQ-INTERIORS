import { AboutSection } from "@/components/sections/about/AboutSection";
import { FaqSection } from "@/components/sections/faq/FaqSection";
import { Hero } from "@/components/sections/Hero";
import { ProcessSection } from "@/components/sections/process/ProcessSection";
import { ProductsSection } from "@/components/sections/products/ProductsSection";
import { ServicesSection } from "@/components/sections/services/ServicesSection";
import { SignatureSection } from "@/components/sections/signature/SignatureSection";
import { ValuesSection } from "@/components/sections/values/ValuesSection";
import { WhySection } from "@/components/sections/why/WhySection";
import { WorkSection } from "@/components/sections/work/WorkSection";
import { faq } from "@/content/faq";
import { values } from "@/content/values";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesSection />

      <WorkSection />
      <WhySection />
      <ProductsSection />
      <SignatureSection />
      <ProcessSection />
      <ValuesSection data={values} />
          <FaqSection items={faq.items} title={faq.title} />
    </>
  );
}
