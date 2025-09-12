import { Block } from "payload";

export const Contact: Block = {
  slug: "contact",
  labels: {
    singular: "Contact",
    plural: "Contacts",
  },
  fields: [
    { name: "leftTitle", type: "text", label: "Left: Form Title", required: true },
    { name: "leftDescription", type: "textarea", label: "Left: Form Description", required: true },
    { name: "submitLabel", type: "text", label: "Submit Button Label", required: true },

    { name: "emailPlaceholder", type: "text", label: "Email Placeholder", required: true },
    { name: "firstNamePlaceholder", type: "text", label: "First Name Placeholder", required: true },
    { name: "lastNamePlaceholder", type: "text", label: "Last Name Placeholder", required: true },
    { name: "companyPlaceholder", type: "text", label: "Company Placeholder", required: true },

    { name: "countryLabel", type: "text", label: "Country Select Label", required: true },
    { name: "topicLabel", type: "text", label: "Topic Select Label", required: true },
    { name: "planningLabel", type: "text", label: "Planning Select Label", required: true },

    { name: "consentNewsText", type: "textarea", label: "Consent: News Opt-in Text", required: true },
    { name: "consentPrivacyText", type: "textarea", label: "Consent: Privacy Text", required: true },
    { name: "privacyUrl", type: "text", label: "Privacy Policy URL", required: true },

    {
      name: "countryOptions",
      type: "array",
      label: "Country Options",
      fields: [{ name: "label", type: "text", required: true }],
    },
    {
      name: "topicOptions",
      type: "array",
      label: "Topic Options",
      fields: [{ name: "label", type: "text", required: true }],
    },
    {
      name: "planningOptions",
      type: "array",
      label: "Planning Options",
      fields: [{ name: "label", type: "text", required: true }],
    },

    { name: "rightHeading", type: "text", label: "Right: Main Heading", required: true },
    {
      name: "features",
      type: "array",
      label: "Right: Features",
      minRows: 0,
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
      ],
    },

    { name: "trustHeading", type: "text", label: "Trust Section Heading", required: true },
    {
      name: "logos",
      type: "array",
      label: "Trusted Logos",
      fields: [
        { name: "logo", type: "upload", relationTo: "media", required: true },
        { name: "alt", type: "text", required: true },
      ],
    },
  ],
};


