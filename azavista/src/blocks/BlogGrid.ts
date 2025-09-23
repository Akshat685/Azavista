import { Block } from "payload";

export const BlogGrid: Block = {
  slug: "blogGrid",
  labels: { singular: "Blog Grid", plural: "Blog Grids" },
  fields: [
    { name: "searchPlaceholder", type: "text", label: "Search Placeholder", defaultValue: "Search..." },
    {
      name: "types",
      type: "array",
      label: "Blog Types",
      admin: { description: "Add manual list of types for filtering" },
      fields: [{ name: "label", type: "text", required: true }],
    },
    {
      name: "items",
      type: "array",
      label: "Posts",
      fields: [
        { name: "type", type: "text", label: "Type" },
        { name: "category", type: "text", label: "Category" },
        { name: "title", type: "text", required: true },
        { name: "excerpt", type: "textarea" },
        { name: "image", type: "upload", relationTo: "media" },
        { name: "link", type: "text", label: "Article Link (slug or URL)" },
      ],
    },
  ],
};


