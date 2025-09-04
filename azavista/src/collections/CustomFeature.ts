import { CollectionConfig } from "payload";

export const CustomFeature: CollectionConfig = {
  slug: "custom-feature",
  labels: {
    singular: "Custom Feature",
    plural: "Custom Features",
  },
  admin: {
    useAsTitle: "heading",
  },
  fields: [
    {
      name: "subheading",
      label: "Subheading",
      type: "text",
      required: true,
    },
    {
      name: "heading",
      label: "Heading",
      type: "text",
      required: true,
    },
    {
      name: "buttonLabel",
      label: "Button Label",
      type: "text",
      required: true,
    },
    {
      name: "buttonUrl",
      label: "Button URL",
      type: "text",
      required: true,
    },
    {
      name: "image",
      label: "Image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
  ],
};

export default CustomFeature;
