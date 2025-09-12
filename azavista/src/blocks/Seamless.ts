import { Block } from "payload";

export const Seamless: Block = {
  slug: "seamless",
  labels: {
    singular: "Seamless Block",
    plural: "Seamless Blocks",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "buttonLabel",
      type: "text",
    },
    {
      name: "buttonUrl",
      type: "text",
    },
    {
      name: "mainLogo",
      type: "upload",
      relationTo: "media",
    },
    
  ],
};


