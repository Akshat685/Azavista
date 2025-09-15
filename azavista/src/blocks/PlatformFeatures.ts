import type { Block } from "payload";

export const PlatformFeatures: Block = {
  slug: "platformFeature",
  labels: { singular: "Platform Feature", plural: "Platform Features" },
  fields: [
    { name: "title", type: "text", required: true, label: "Title" },
    { name: "heading", type: "text", required: true, label: "Heading" },
    { name: "description", type: "richText", required: false, label: "Description" },
  ],
};


