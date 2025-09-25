import type { Block } from "payload";

export const IntegratedHero: Block = {
  slug: "integratedHero",
  labels: { singular: "Integrated Hero", plural: "Integrated Heroes" },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      label: "Heading",
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
    },
    {
      name: "buttonText",
      type: "text",
      required: true,
      label: "Button Text",
    },
    {
      name: "buttonUrl",
      type: "text",
      required: true,
      label: "Button URL",
    },
    {
      name: "backgroundImage",
      type: "upload",
      relationTo: "media",
      label: "Background Image",
      required: true,
    },
  ],
};


