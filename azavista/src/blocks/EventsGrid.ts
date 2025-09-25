import { Block } from "payload";

export const EventsGrid: Block = {
  slug: "eventsGrid",
  labels: { singular: "Events Grid", plural: "Events Grids" },
  fields: [
    {
      name: "eventTypeLabel",
      type: "text",
      
      defaultValue: "Event Type",
    },
    {
      name: "eventTypes",
      type: "array",
      label: "Event Types",
      fields: [{ name: "label", type: "text", required: true }],
    },
    {
      name: "regionLabel",
      type: "text",
      label: "Region Label",
      defaultValue: "Region",
    },
    {
      name: "regionsList",
      type: "array",
      label: "Regions",
      fields: [{ name: "label", type: "text", required: true }],
    },
    {
      name: "resetLabel",
      type: "text",
      label: "Reset Label",
      defaultValue: "Reset",
    },
    {
      name: "events",
      type: "array",
      label: "Events",
      labels: { singular: "Event", plural: "Events" },
      fields: [
        { name: "title", type: "text" },
        { name: "description", type: "textarea" },
        {
          name: "eventDate",
          type: "date",
          label: "Date",
          admin: {
            date: {
              pickerAppearance: 'dayOnly',
              displayFormat: 'MMMM d, yyyy',
            },
          },
        },
        {
          name: "eventType",
          type: "text",
          label: "Event Type",
        },
        {
          name: "region",
          type: "text",
          label: "Region",
        },
        { name: "image", type: "upload", relationTo: "media", label: "Image" },
        { name: "link", type: "text", label: "Link (slug or URL)" },
      ],
    },
  ],
};


