import { CollectionConfig } from "payload";

export const ResourcesMenu: CollectionConfig = {
  slug: "resourcesMenu",
  labels: {
    singular: "Resources Menu",
    plural: "Resources Menu",
  },
  fields: [
    {
      name: "category",
      type: "text", // "Learn" or "Connect"
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

