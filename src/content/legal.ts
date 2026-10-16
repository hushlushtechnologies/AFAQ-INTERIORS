export type LegalSection = {
  title: string;
  body: string[];
  list?: string[];   // ← NEW: optional bullet points shown after the body
  contact?: boolean;
};

export type LegalDoc = {
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
};

export const terms: LegalDoc = {
  title: "Terms & Conditions",
  intro:
    "Welcome to the website of Afaq Al Manzel Interiors. By accessing or using this website, you agree to the following terms and conditions.",
  updated: "15 October 2026",
  sections: [
    {
      title: "Website Use",
      body: [
        "This website is provided for general information about our interior design, renovation, fit-out, furnishing, MEP, maintenance, and related services. You agree to use the website only for lawful purposes.",
      ],
    },
    {
      title: "Service Information",
      body: [
        "All service descriptions, images, designs, materials, and project information displayed on this website are for general reference. Actual project scope, pricing, materials, timelines, and deliverables will be confirmed separately through an approved proposal, quotation, or agreement.",
      ],
    },
    {
      title: "Enquiries & Quotations",
      body: [
        "Submitting an enquiry through the website does not create a contractual relationship. A project begins only after the relevant quotation, proposal, or agreement has been reviewed and accepted by both parties.",
      ],
    },
    {
      title: "Intellectual Property",
      body: [
        "All website content, including text, images, graphics, branding, designs, and layouts, belongs to Afaq Al Manzel Interiors or is used with appropriate permission. Content may not be copied, reproduced, or distributed without prior authorization.",
      ],
    },
    {
      title: "Project Images",
      body: [
        "Project photographs, renders, and visualizations displayed on this website are provided for portfolio and promotional purposes. Final results may vary depending on project requirements, site conditions, materials, and client preferences.",
      ],
    },
    {
      title: "Third-Party Links",
      body: [
        "Our website may contain links to third-party websites or platforms. Afaq Al Manzel Interiors is not responsible for the content, availability, or privacy practices of those external services.",
      ],
    },
    {
      title: "Limitation of Liability",
      body: [
        "While we aim to keep website information accurate and up to date, we do not guarantee that all content will always be complete or error-free. Afaq Al Manzel Interiors will not be responsible for losses resulting solely from reliance on information published on this website.",
      ],
    },
    {
      title: "Changes to These Terms",
      body: [
        "We may update these Terms & Conditions when required. Any changes will be published on this page with the revised update date.",
      ],
    },
    {
      title: "Contact Us",
      body: ["For questions regarding these Terms & Conditions, please contact:"],
      contact: true,
    },
  ],
};

 export const privacy: LegalDoc = {
  title: "Privacy Policy",
  intro:
    "Afaq Al Manzel Interiors respects your privacy and is committed to handling personal information responsibly.",
  updated: "15 October 2026",
  sections: [
    {
      title: "Information We Collect",
      body: [
        "When you contact us, submit an enquiry, or use our website, we may collect information such as your name, phone number, email address, project details, property information, and any files you choose to share.",
      ],
    },
    {
      title: "How We Use Your Information",
      body: ["We may use your information to:"],
      list: [
        "Respond to enquiries",
        "Provide project consultations",
        "Prepare quotations or proposals",
        "Communicate about our services",
        "Improve our website and customer experience",
      ],
    },
    {
      title: "Information Sharing",
      body: [
        "We do not sell your personal information. Information may only be shared with authorized team members, service providers, or project partners when necessary to respond to your request or deliver agreed services.",
      ],
    },
    {
      title: "Cookies & Website Data",
      body: [
        "Our website may use cookies or analytics tools to understand website usage, improve performance, and enhance the user experience.",
      ],
    },
    {
      title: "Data Security",
      body: [
        "We take reasonable measures to protect personal information from unauthorized access, misuse, loss, or disclosure.",
      ],
    },
    {
      title: "Third-Party Services",
      body: [
        "Our website may include links or integrations with third-party platforms such as maps, social media, analytics, or communication services. Their privacy practices are governed by their own policies.",
      ],
    },
    {
      title: "Your Information",
      body: [
        "You may contact us to request access to, correction of, or deletion of personal information you have provided, subject to applicable legal and business requirements.",
      ],
    },
    {
      title: "Policy Updates",
      body: [
        "We may update this Privacy Policy from time to time. Any changes will be published on this page with the revised update date.",
      ],
    },
    {
      title: "Contact Us",
      body: ["For questions regarding this Privacy Policy, please contact:"],
      contact: true,
    },
  ],
};
