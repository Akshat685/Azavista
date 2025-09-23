import { Block } from "payload";

export const BlogList: Block = {
  slug: "blogList",
  labels: {
    singular: "Blog List",
    plural: "Blog Lists",
  },
  fields: [
    {
      name: "featured",
      type: "group",
      label: "Featured Post",
      fields: [
        { name: "category", type: "text", label: "Category" },
        { name: "title", type: "text", label: "Title", required: true },
        { name: "excerpt", type: "textarea", label: "Excerpt" },
        { name: "image", type: "upload", relationTo: "media", label: "Image" },
        { name: "link", type: "text", label: "Article Link (slug or URL)", admin: { description: "Enter a slug like how-ai-... or a full URL" } },
      ],
    },
    {
      name: "itemsRight",
      type: "array",
      label: "Right Column Posts",
      fields: [
        { name: "category", type: "text", label: "Category" },
        { name: "title", type: "text", label: "Title", required: true },
        { name: "excerpt", type: "textarea", label: "Excerpt" },
        { name: "image", type: "upload", relationTo: "media", label: "Image" },
        { name: "link", type: "text", label: "Article Link (slug or URL)", admin: { description: "Enter a slug like how-ai-... or a full URL" } },
      ],
    },
    
  ],
};


