import { CollectionConfig } from "payload";

export const PlatformMenu: CollectionConfig = {
  slug: "platformMenu",
  labels: {
    singular: "Platform Menu",
    plural: "Platform Menu",
  },
  fields: [
    {
      name: "category",
      type: "text",
      required: true,
    },
    {
      name: "items",
      type: "array",
      required: true,
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
          name: "link",
          type: "text",
          required: true,
        },
        {
          name: "icon",
          type: "upload",
          relationTo: "media", // works with Cloudinary plugin
        },
      ],
    },
  ],
};

