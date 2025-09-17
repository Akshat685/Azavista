import type { Block } from "payload";

export const IntegratedTool: Block = {
  slug: "integratedTool",
  labels: { singular: "Integrated Tool", plural: "Integrated Tools" },
  fields: [
    {
      name: "heading",
      type: "text",
      label: "Heading",
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
    },
    {
      name: "items",
      type: "array",
      labels: {
        singular: "Item",
        plural: "Items",
      },
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          label: "Image",
        },
      ],
    },
  ],
};


