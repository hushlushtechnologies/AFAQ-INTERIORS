"use server";
import { z } from "zod";
import { Resend } from "resend";
import { parsePhoneNumberFromString, type CountryCode } from "libphonenumber-js/max";
import { site } from "@/content/site";

type Field = "name" | "phone" | "phoneCountry" | "email" | "service" | "message";

export type EnquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<Field, string>>;
  values?: Partial<Record<Field, string>>;
};

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  phone: z.string().trim().min(1, "Please enter your phone number."),
  email: z.email("Please enter a valid email address."),
  service: z.string().min(1, "Please choose a service."),
  message: z.string().trim().max(2000, "Please keep your message under 2,000 characters."),
});

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

export async function sendEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  // Honeypot: real visitors never see or fill this field
  if (formData.get("company")) return { status: "success" };

  const values = {
    name: String(formData.get("name") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    phoneCountry: String(formData.get("phoneCountry") ?? "AE"),
    email: String(formData.get("email") ?? ""),
    service: String(formData.get("service") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  // 1. Basic field checks
  const parsed = schema.safeParse(values);
  const errors: NonNullable<EnquiryState["errors"]> = {};
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as Field;
      errors[key] ??= issue.message;
    }
  }

  // 2. Phone: validate against the selected country's real numbering rules
  const country = (/^[A-Z]{2}$/.test(values.phoneCountry) ? values.phoneCountry : "AE") as CountryCode;
  const phone = values.phone.trim() ? parsePhoneNumberFromString(values.phone, country) : undefined;
  if (values.phone.trim() && !phone?.isValid()) {
    errors.phone ??= `Please enter a valid ${regionNames.of(country) ?? ""} phone number.`;
  }

  if (!parsed.success || Object.keys(errors).length > 0 || !phone) {
    return { status: "error", message: "Please check the highlighted fields.", errors, values };
  }

  const d = parsed.data;
  const phoneIntl = phone.formatInternational(); // e.g. +971 50 123 4567
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    if (process.env.NODE_ENV === "production") {
      console.error("[enquiry] RESEND_API_KEY is not set");
      return { status: "error", message: "We couldn’t send your enquiry right now. Please call or email us directly.", values };
    }
    console.info("[enquiry] (dev, not emailed)", { ...d, phone: phoneIntl });
    return { status: "success" };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "Afaq Website <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL ?? site.email,
      replyTo: d.email,
      subject: `New enquiry: ${d.service} (${d.name})`,
      text: [
        `Name: ${d.name}`,
        `Phone: ${phoneIntl}`,
        `Email: ${d.email}`,
        `Service: ${d.service}`,
        "",
        d.message || "(No message)",
      ].join("\n"),
    });
    if (error) throw error;
    return { status: "success" };
  } catch (err) {
    console.error("[enquiry] send failed", err);
    const detail =
      process.env.NODE_ENV !== "production"
        ? ` [Dev details: ${err instanceof Error ? err.message : JSON.stringify(err)}]`
        : "";
    return {
      status: "error",
      message: `Something went wrong sending your enquiry. Please try again or call us directly.${detail}`,
      values,
    };
  }
}