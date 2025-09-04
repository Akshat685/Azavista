import { CollectionConfig } from "payload";

export const WhyAzavista: CollectionConfig = {
  slug: "why-azavista",
  labels: {
    singular: "Why Azavista",
    plural: "Why Azavista",
  },
  access: {
    read: () => true, // Public access for frontend
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


