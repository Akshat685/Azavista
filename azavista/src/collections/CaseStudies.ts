import { CollectionConfig } from "payload";

export const CaseStudies: CollectionConfig = {
  slug: "caseStudiesBlock",
  labels: {
    singular: "Case Studies ",
    plural: "Case Studies",
  },
  fields: [
    {
      name: "badge",
      type: "text",
      label: "Badge",
      required: true,
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
      name: "cards",
      type: "array",
      label: "Case Study Cards",
      minRows: 1,
      fields: [
        {
          name: "category",
          type: "text",
          label: "Category",
        },
        {
          name: "title",
          type: "text",
          label: "Card Title",
        },
        {
          name: "description",
          type: "textarea",
          label: "Card Description",
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          label: "Card Image",
        },
        {
          name: "link",
          type: "text",
          label: "Learn More Link",
        },
      ],
    },
  ],
};
