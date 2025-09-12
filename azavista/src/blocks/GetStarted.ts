import { Block } from "payload";

export const Getstarted: Block = {
  slug: "getstarted",
  labels: {
    singular: "Getstarted",
    plural: "Getstarted Sections",
  },
  fields: [
    {
      name: "sectionLabel",
      type: "text",
      label: "Section Label",
      required: true,
    },
    {
      name: "heading",
      type: "text",
      label: "Heading",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
      required: true,
    },
    {
      name: "buttonText",
      type: "text",
      label: "Button Text",
      required: true,
    },
    {
      name: "buttonLink",
      type: "text",
      label: "Button Link",
      required: true,
    },
    {
      name: "backgroundImage",
      label: "Background Image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
  ],
};
