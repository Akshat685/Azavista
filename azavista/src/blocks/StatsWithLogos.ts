import { Block } from "payload";

export const StatsWithLogos: Block = {
  slug: "statsWithLogos",
  labels: {
    singular: "Stats with Logos",
    plural: "Stats with Logos",
  },
  fields: [
    {
      name: "heading",
      type: "text",
      label: "Heading",
    },
    {
      name: "stats",
      type: "array",
      label: "Stats",
      minRows: 1,
      fields: [
        {
          name: "percentage",
          type: "text",
          label: "Percentage (e.g. 25%)",
        },
        {
          name: "description",
          type: "text",
          label: "Description",
        },
      ],
    },
    {
      name: "logos",
      type: "array",
      label: "Logos",
      minRows: 1,
      fields: [
        {
          name: "logo",
          type: "upload",
          relationTo: "media", 
          label: "Logo",
        },
      ],
    },
  ],
};
