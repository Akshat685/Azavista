import { Block } from "payload";

export const WhyAzavista: Block = {
  slug: "whyAzavista",
  labels: {
    singular: "Why Azavista",
    plural: "Why Azavista",
  },

  fields: [
    {
      name: "badge",
      type: "text",
      required: true,
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "subtitle",
      type: "textarea",
      required: true,
    },
    {
      name: "features",
      type: "array",
      labels: { singular: "Feature", plural: "Features" },
      fields: [
        {
          name: "icon",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "iconWidth",
          type: "number",
          label: "Icon Width (px)",
        },
        {
          name: "iconHeight",
          type: "number",
          label: "Icon Height (px)",
        },
        {
          name: "headingBlue",
          type: "text",
          required: true,
        },
        {
          name: "headingBlack",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          required: true,
        },
      ],
    },
  ],
};


