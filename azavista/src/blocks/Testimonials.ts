import { Block } from "payload";

export const Testimonials: Block = {
  slug: "testimonials",
  labels: {
    singular: "Testimonials ",
    plural: "Testimonials ",
  },
  fields: [
    {
      name: "badge",
      type: "text",
      label: "Badge (e.g. Testimonials)",
    },
    {
      name: "title",
      type: "text",
      label: "Section Title",
      required: true,
    },
    {
      name: "subtitle",
      type: "textarea",
      label: "Section Subtitle",
    },
    {
      name: "items",
      type: "array",
      label: "Testimonials",
      minRows: 1,
      fields: [
        {
          name: "quote",
          type: "textarea",
          label: "Quote",
          required: true,
        },
        {
          name: "author",
          type: "text",
          label: "Author Name",
          required: true,
        },
        {
          name: "role",
          type: "text",
          label: "Role / Company",
        },
      ],
    },
  ],
};
