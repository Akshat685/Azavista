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
  ],
};
