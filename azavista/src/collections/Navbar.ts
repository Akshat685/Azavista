import type { CollectionConfig } from "payload";

export const Navbar: CollectionConfig = {
  slug: "navbar",
  admin: {
    useAsTitle: "label", // now this exists ✅
  },
  access: {
    read: () => true, // 👈 makes navbar public
  },
  fields: [
    {
      name: "label",
      type: "text",
      required: true,
      label: "Navbar Label", // e.g. "Main Navbar" / "Footer Navbar"
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "links",
      type: "array",
      label: "Navigation Links",
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "url",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "ctaLabel",
      type: "text",
      required: false,
      label: "CTA Button Label",
    },
    {
      name: "ctaUrl",
      type: "text",
      required: false,
      label: "CTA Button URL",
    },
    // Legacy embedded menus removed in favor of flexible menuItems
    // Flexible menu builder allowing unlimited menu items from admin
    {
      name: "menuItems",
      type: "blocks",
      label: "Menus",
      labels: { singular: "Menu", plural: "Menus" },
      admin: {
        description: "Add menu items for the navbar. Choose Link or Mega Menu.",
      },
      blocks: [
        {
          slug: "link",
          labels: { singular: "Link", plural: "Links" },
          fields: [
            { name: "label", type: "text", required: true },
            { name: "url", type: "text", required: true },
          ],
        },
        {
          slug: "megaMenu",
          labels: { singular: "Mega Menu", plural: "Mega Menus" },
          fields: [
            { name: "label", type: "text", required: true, label: "Menu Button Label" },
            { name: "order", type: "number", label: "Order", defaultValue: 0 },
            {
              name: "highlight",
              type: "group",
              admin: { description: "Optional left highlight card" },
              fields: [
                { name: "title", type: "text" },
                { name: "description", type: "textarea" },
                { name: "link", type: "text" },
                { name: "image", type: "upload", relationTo: "media" },
              ],
            },
            {
              name: "columns",
              type: "array",
              label: "Columns",
              admin: { description: "Add one or more columns with items" },
              fields: [
                { name: "order", type: "number", label: "Order", defaultValue: 0 },
                { name: "category", type: "text", required: true },
                {
                  name: "items",
                  type: "array",
                  fields: [
                    { name: "title", type: "text", required: true },
                    { name: "description", type: "textarea" },
                    { name: "link", type: "text" },
                    { name: "icon", type: "upload", relationTo: "media" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
