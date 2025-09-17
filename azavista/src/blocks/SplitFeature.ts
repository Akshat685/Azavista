import type { Block } from "payload";

// Enhanced Block schema for Registration Analytics split feature
export const SplitFeature: Block = {
  slug: "splitFeature",
  labels: { 
    singular: "Split Feature", 
    plural: "Split Features" 
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Section Title",
      required: false,
      admin: {
        description: "Optional section title that appears above the main heading"
      }
    },
    {
      name: "badge",
      type: "group",
      label: "Badge",
      fields: [
        {
          name: "text",
          type: "text",
          label: "Badge Text",
          required: false,
          admin: {
            description: "Badge text (e.g., 'Registration Analytics')"
          }
        },
        {
          name: "icon",
          type: "upload",
          relationTo: "media",
          label: "Badge Icon",
          required: false,
          admin: {
            description: "Small icon to display before the badge text (SVG/PNG recommended)"
          }
        }
      ],
      admin: {
        description: "Badge with optional icon and text"
      }
    },
    {
      name: "heading",
      type: "text",
      label: "Main Heading",
      required: true,
      admin: {
        description: "Main headline for the section"
      }
    },
    {
      name: "description",
      type: "richText",
      label: "Description",
      required: false,
      admin: {
        description: "Rich text content with bullet points and detailed information"
      }
    },
    {
      name: "backgroundVariant",
      type: "select",
      label: "Background Style",
      defaultValue: "none",
      options: [
        { label: "White Background", value: "none" },
        { label: "Light Grey Background", value: "light" },
      ],
    },
    {
      name: "buttons",
      type: "array",
      label: "Call-to-Action Buttons",
      maxRows: 2,
      fields: [
        { 
          name: "label", 
          type: "text",
          label: "Button Text",
          required: true
        },
        { 
          name: "url", 
          type: "text",
          label: "Button URL",
          required: true
        },
        { 
          name: "variant", 
          type: "select", 
          label: "Button Style",
          options: [
            { label: "Primary (Filled)", value: "primary" },
            { label: "Secondary (Outlined)", value: "secondary" },
          ], 
          defaultValue: "primary" 
        },
      ],
      admin: {
        description: "Add up to 2 call-to-action buttons with customizable styles"
      }
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Feature Image",
      admin: {
        description: "Main image for the section (dashboard screenshot, product mockup, etc.)"
      }
    },
    {
      name: "imageOnRight",
      type: "checkbox",
      defaultValue: true,
      label: "Place Image on Right Side",
      admin: {
        description: "Toggle to switch the layout between image-left and image-right"
      }
    },
  ],
};