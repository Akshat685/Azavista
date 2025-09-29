import { Block } from "payload";

export const CustomerTestimonial: Block = {
  slug: "customerTestimonial",
  labels: {
    singular: "CustomerTestimonial",
    plural: "CustomerTestimonials",
  },
  fields: [
    {
      name: "logo",
      type: "upload",
      relationTo: "media", 
      label: "Company Logo",
    },
    {
      name: "quote",
      type: "textarea",
      label: "Quote",
    },
    {
      name: "author",
      type: "group",
      label: "Author",
      fields: [
        {
          name: "name",
          type: "text",
          label: "Name",
        },
        {
          name: "role",
          type: "text",
          label: "Role",
        },
        {
          name: "company",
          type: "text",
          label: "Company",
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media", 
          label: "Author Image",
        },
      ],
    },
  ],
};
