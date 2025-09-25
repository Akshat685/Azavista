import type { Block } from "payload";

export const IntegrateCard: Block = {
  slug: "integrateCard",
  labels: { singular: "Integrate Card", plural: "Integrate Cards" },
  fields: [
    {
      name: "title",
      type: "text",
      
      label: "Section Title",
    },
    {
      name: "items",
      type: "array",
      label: "Cards",
      
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          label: "Card Image",
        },
        {
          name: "title",
          type: "text",
          required: true,
          label: "Card Title",
        },
        {
          name: "description",
          type: "textarea",
          label: "Card Description",
        },
        {
          name: "learnMore",
          type: "text",
          label: "Learn More URL",
        },
      ],
    },
  ],
};


