import type { Block } from "payload";

export const SmarterEvents : Block = {
  slug: "smarterEvents",
  labels: {
    singular: "SmartEvent Feature",
    plural: "SmartEvent Features",
  },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "categoryLabel",
      type: "text",
      required: true,
    },
    {
      name: "icon",
      type: "upload",
      relationTo: "media",
      label: "Icon",
      required: false,
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "primaryButtonLabel",
      type: "text",
    },
    {
      name: "primaryButtonUrl",
      type: "text",
    },
    {
      name: "secondaryButtonLabel",
      type: "text",
    },
    {
      name: "secondaryButtonUrl",
      type: "text",
    },
  ],
};
