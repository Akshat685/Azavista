import type { CollectionConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";


export const Blogs: CollectionConfig = {
  slug: "blogs",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",

    },
    {
      name: "subtitle",
      type: "text",
      label: "Subtitle",
    },
    {
      name: "slug",
      type: "text",

      unique: true,
      admin: {
        description: "URL-friendly slug automatically generated from the title",
      },
    },
    {
      name: "category",
      type: "text",
      label: "Category",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Featured Image",
    },
    {
      name: "publishedAt",
      type: "date",
      label: "Original Publish Date",
      admin: { date: { pickerAppearance: 'dayOnly' } },
    },
    {
      name: "lastUpdatedAt",
      type: "date",
      label: "Last Updated Date",
      admin: { date: { pickerAppearance: 'dayOnly' } },
    },
    {
      name: "socialIcons",
      type: "array",
      label: "Share Icons",
      admin: { description: "Icons and links to display under the title." },
      fields: [
        { name: "label", type: "text", },
        { name: "url", type: "text", },
        { name: "icon", type: "upload", relationTo: "media", label: "Icon" },
      ],
    },
    {
      name: "bodyContent",
      type: "richText",
      editor: lexicalEditor(),

    }
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        // Automatically generate slug from title if not set
        if (data && !data.slug && data.title) {
          data.slug = data.title
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9\-]/g, "");
        }
        return data;
      },
    ],
  },
};
