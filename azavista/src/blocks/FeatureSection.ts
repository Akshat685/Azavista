import type { Block } from "payload";

export const FeatureSection: Block = {
  slug: "featureSection",
  labels: { singular: "Feature Section", plural: "Feature Sections" },
  fields: [
    { name: "title", type: "text", label: "Title", required: false },
    { name: "heading", type: "text", required: true },
    { name: "description", type: "richText", label: "Description", required: false },
    {
      name: "backgroundVariant",
      type: "select",
      label: "Background",
      defaultValue: "none",
      options: [
        { label: "None", value: "none" },
        { label: "Light Grey", value: "light" },
      ],
    },
    {
      name: "cta",
      type: "group",
      fields: [
        { name: "label", type: "text" },
        { name: "url", type: "text" },
        { name: "variant", type: "select", options: [
          { label: "Primary", value: "primary" },
          { label: "Secondary", value: "secondary" },
        ], defaultValue: "primary" },
      ],
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "imageOnRight",
      type: "checkbox",
      defaultValue: true,
      label: "Place image on right",
    }
  ],
};


