"use server";
import { z } from "zod";
import { Resend } from "resend";
import { site } from "@/content/site";

type Field = "name" | "phone" | "email" | "service" | "message";

export type EnquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<Field, string>>;
  values?: Partial<Record<Field, string>>;
};

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  phone: z.string().trim().regex(/^\+?[\d\s()-]{7,20}$/, "Please enter a valid phone number."),
  email: z.email("Please enter a valid email address."),
  service: z.string().min(1, "Please choose a service."),
  message: z.string().trim().max(2000, "Please keep your message under 2,000 characters."),
});

export async function sendEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  // Honeypot: real visitors never see or fill this field
  if (formData.get("company")) return { status: "success" };

  const values = {
    name: String(formData.get("name") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    email: String(formData.get("email") ?? ""),
    service: String(formData.get("service") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  const parsed = schema.safeParse(values);
  if (!parsed.success) {
    const errors: EnquiryState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as Field;
      errors[key] ??= issue.message;
    }
    return { status: "error", message: "Please check the highlighted fields.", errors, values };
  }

  const d = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    if (process.env.NODE_ENV === "production") {
      console.error("[enquiry] RESEND_API_KEY is not set");
      return { status: "error", message: "We couldn’t send your enquiry right now. Please call or email us directly.", values };
    }
    console.info("[enquiry] (dev, not emailed)", d);
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
        `Phone: ${d.phone}`,
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
    return {
      status: "error",
      message: "Something went wrong sending your enquiry. Please try again or call us directly.",
      values,
    };
  }
}