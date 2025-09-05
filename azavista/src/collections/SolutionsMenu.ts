import { CollectionConfig } from "payload";

export const SolutionsMenu: CollectionConfig = {
  slug: "solutionsMenu",
  labels: {
    singular: "Solutions Menu",
    plural: "Solutions Menu",
  },
  fields: [
    {
      name: "highlight", // big left card
      type: "group",
      fields: [
        { name: "title", type: "text" },
        { name: "description", type: "textarea" },
        { name: "link", type: "text" },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
        },
      ],
    },
    {
      name: "category",
      type: "text",
      required: true,
    },
    {
      name: "items",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea" },
        { name: "link", type: "text" },
        {
          name: "icon",
          type: "upload",
          relationTo: "media",
        },
      ],
    },
  ],
};

