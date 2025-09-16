import type { Block } from "payload";

// Block schema for a generic split feature (used here for Registration Analytics)
export const SplitFeature: Block = {
  slug: "splitFeature",
  labels: { singular: "Split Feature", plural: "Split Features" },
  fields: [
    { name: "title", type: "text", label: "Title", required: false },
    { name: "badge", type: "text", label: "Badge", required: false },
    { name: "heading", type: "text", required: true },
    { name: "subheading", type: "text", label: "Subheading", required: false },
    { name: "description", type: "richText", required: false },
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
      name: "primaryCta",
      type: "group",
      fields: [
        { name: "label", type: "text" },
        { name: "url", type: "text" },
      ],
    },
    
    {
      name: "secondaryCta",
      type: "group",
      fields: [
        { name: "label", type: "text" },
        { name: "url", type: "text" },
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
    },
  ],
};


