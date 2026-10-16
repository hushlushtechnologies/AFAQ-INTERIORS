import { services } from "./navigation";

export const contact = {
  title: "Contact Us",
  subtitle: "Afaq Al Manzel Interiors",
  statement: ["Get in touch and let’s", "create a solution that", "drives results."],
  intro:
    "Share a few details about your property, requirements, and vision. Our team will connect with you to understand the project in more detail.",
  image: { src: "/images/contact/living.jpg", alt: "Calm living room with a modular sofa and glass pendant lights" },
  serviceOptions: [...services.map((s) => s.label), "Other"],

    faq: [
    {
      q: "What information should I provide for an interior enquiry?",
      a: "Property type, location, approximate size, required services, budget range, and any design references are helpful.",
    },
    {
      q: "Can I contact Afaq before purchasing a property?",
      a: "Yes. Our team can discuss the interior potential and requirements of a property before you begin the project.",
    },
    {
      q: "Can I request a complete turnkey quotation?",
      a: "Yes. Depending on the project scope, we can provide design, technical, fit-out, MEP, furnishing, and handover solutions.",
    },
    {
      q: "Do you handle projects outside Dubai?",
      a: "Project availability across the UAE can be confirmed with our team based on the scope and location.",
    },
    {
      q: "Can I share floor plans and reference images?",
      a: "Yes. Floor plans, site photographs, moodboards, or reference imagery can help our team better understand your requirements.",
    },
    {
      q: "How will the team contact me after I submit an enquiry?",
      a: "A member of the Afaq team will review the enquiry and contact you using the details provided.",
    },
  ],
} as const;