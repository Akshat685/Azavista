import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { Block } from "payload";

export const TabSections: Block = {
  slug: "tabSection",
  labels: {
    singular: "Tabs Section",
    plural: "Tabs Sections",
  },
 
  fields: [
    {
      name: "tabs",
      label: "Tabs",
      type: "array",
      required: true,
      minRows: 1,
      labels: {
        singular: "Tab",
        plural: "Tabs",
      },
      fields: [
        {
          name: "tabLabel",
          label: "Tab Label",
          type: "text",
          required: true,
        },
        {
          name: "heading",
          label: "Heading",
          type: "text",
          required: true,
        },
        {
          name: "description",
          label: "Description",
          type: "richText",
          editor: lexicalEditor(),
          required: true,
        },
        {
          name: "image",
          label: "Image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
    {
      name: "buttonLabel",
      label: "Button Label",
      type: "text",
    },
    {
      name: "buttonUrl",
      label: "Button URL",
      type: "text",
    },
  ],
};

