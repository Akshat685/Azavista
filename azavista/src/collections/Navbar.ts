import type { CollectionConfig } from "payload";

export const Navbar: CollectionConfig = {
  slug: "navbar",
  admin: {
    useAsTitle: "label",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "label",
      type: "text",
      required: true
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "logoUrl",
      type: "text",
      required: false,
      label: "Logo URL",
      admin: {
        description: "URL for the logo to redirect to (e.g., / for home page)",
      },
      defaultValue: "/",
    },
    // {
    //   name: "links",
    //   type: "array",
    //   label: "Navigation Links",
    //   fields: [
    //     {
    //       name: "label",
    //       type: "text",
    //       required: true,
    //     },
    //     {
    //       name: "url",
    //       type: "text",
    //       required: true,
    //     },
    //   ],
    // },
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

    {
      name: "menuItems",
      type: "blocks",
      label: "Menus",
      labels: { singular: "Menu", plural: "Menus" },
      admin: {
        description: "Make menu items for the navbar.",
      },
      blocks: [
        // {
        //   slug: "link",
        //   labels: { singular: "Link", plural: "Links" },
        //   fields: [
        //     { name: "label", type: "text", required: true },
        //     { name: "url", type: "text", required: true },
        //   ],
        // },
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
                { name: "linkText", type: "text", label: "Link Text" },
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
