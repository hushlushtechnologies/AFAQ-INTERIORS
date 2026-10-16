import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal/LegalPage";
import { privacy } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Afaq Al Manzel Interiors collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return <LegalPage doc={privacy} />;
}