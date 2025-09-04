import type { CollectionConfig } from "payload";

export const Hero: CollectionConfig = {
  slug: "hero",
  labels: {
    singular: "Hero Section",
    plural: "Hero Sections",
  },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
    },
    {
      name: "subheading",
      type: "textarea",
    },
    {
      name: "buttons",
      type: "array",
      label: "Buttons",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "url", type: "text", required: true },
        {
          name: "variant",
          type: "select",
          options: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
          ],
          defaultValue: "primary",
        },
      ],
    },
    {
      name: "logos",
      type: "array",
      label: "Logos",
      fields: [
        { name: "logo", type: "upload", relationTo: "media", required: true },
        { name: "alt", type: "text" },
      ],
    },
  ],
};
