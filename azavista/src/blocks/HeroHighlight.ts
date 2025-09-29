import type { Block } from "payload";

export const HeroHighlight: Block = {
  slug: "heroHighlight",
  labels: {
    singular: "Hero Highlight",
    plural: "Hero Highlights",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Title",
    },
    {
      name: "description",
      type: "textarea",
      
      label: "Description",
    },
    {
      name: "primaryButton",
      type: "group",
      label: "Primary Button",
      fields: [
        {
          name: "label",
          type: "text",
          
        },
        {
          name: "link",
          type: "text",
          
        },
      ],
    },
    {
      name: "secondaryButton",
      type: "group",
      label: "Secondary Button",
      fields: [
        {
          name: "label",
          type: "text",
          
        },
        {
          name: "link",
          type: "text",
          
        },
      ],
    },
  ],
};
