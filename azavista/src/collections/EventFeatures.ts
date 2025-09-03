import { CollectionConfig } from "payload";

export const EventFeatures: CollectionConfig = {
  slug: "event-features",
  labels: {
    singular: "Event Feature",
    plural: "Event Features",
  },
  admin: {
    useAsTitle: "tabLabel",
  },
  fields: [
    {
      name: "tabLabel",
      label: "Tab Label",
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
      name: "description",
      label: "Description",
      type: "richText", // You can change to 'richText' if you want formatting
      required: true,
    },
    {
      name: "buttonLabel",
      label: "Button Label",
      type: "text",
    },
    {
      name: "buttonUrl",
      label: "Button URL",
      type: "text",
    },
    {
      name: "image",
      label: "Image",
      type: "upload",
      relationTo: "media", // Payload's Media collection
      required: true,
    },
  ],
};

export default EventFeatures;
