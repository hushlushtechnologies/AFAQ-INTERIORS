import type { Metadata } from "next";
import { CareersHero } from "@/components/sections/careers/CareersHero";
import { CareersCulture } from "@/components/sections/careers/CareersCulture";
import { OpenRoles } from "@/components/sections/careers/OpenRoles";
import { careers } from "@/content/careers";
import { FaqSection } from "@/components/sections/faq/FaqSection";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join a multidisciplinary team of designers, engineers, project professionals, and makers shaping refined spaces across Dubai.",
};

export default function CareersPage() {
  return (
    <>
      <CareersHero />
       <CareersCulture />
         <OpenRoles />
         <FaqSection id="careers-faq" items={careers.faq} />
    </>
  );
}