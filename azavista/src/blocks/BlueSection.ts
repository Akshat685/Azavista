import type { Block } from "payload";

export const BlueSection: Block = {
  slug: "blueSection",
  labels: { singular: "Blue Section", plural: "Blue Sections" },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      label: "Heading",
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      label: "Description",
    },
    {
      name: "buttonText",
      type: "text",
      required: true,
      label: "Button Text",
    },
    {
      name: "buttonUrl",
      type: "text",
      required: true,
      label: "Button URL",
    },
    {
      name: "backgroundColor",
      type: "select",
      label: "Background Color",
      defaultValue: "bg-blue-600",
      options: [
        { label: "Blue", value: "bg-blue-600" },
        { label: "Gray", value: "bg-gray-600" },
      ],
    },
  ],
};
