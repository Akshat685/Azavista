import { Block } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

export const PolicyContent: Block = {
  slug: "policyContent",
  labels: {
    singular: "Policy Content",
    plural: "Policy Contents",
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
    },
    {
      name: "lastUpdatedDate",
      label: "Last Updated Date",
      type: "date",
      admin: {
        date: {
          displayFormat: "yyyy-MM-dd",
        },
      },
    },
    {
      name: "lastUpdated",
      label: "Last Updated (legacy text)",
      type: "text",
      admin: {
        description: "Fallback text if date is not provided",
      },
    },
    {
      name: "sections",
      label: "Sections",
      type: "array",
      labels: {
        singular: "Section",
        plural: "Sections",
      },
      fields: [
        {
          name: "heading",
          label: "Heading",
          type: "text",
          required: true,
        },
        {
          name: "level",
          label: "Heading Level",
          type: "number",
          min: 1,
          max: 3,
        },
        {
          name: "content",
          label: "Content",
          type: "richText",
          editor: lexicalEditor(),
        },
      ],
    },
  ],
};


