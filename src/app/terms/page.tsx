import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal/LegalPage";
import { terms } from "@/content/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for using the Afaq Al Manzel Interiors website.",
};

export default function TermsPage() {
  return <LegalPage doc={terms} />;
}