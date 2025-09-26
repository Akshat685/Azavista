import type { Block } from "payload"

export const CaseStudiesGrid: Block = {
  slug: "caseStudiesGrid",
  labels: {
    singular: "Case Studies Grid",
    plural: "Case Studies Grids",
  },
  fields: [
    {
      name: "industriesLabel",
      type: "text",
      label: "Industries Label",
    },
    {
      name: "regionsLabel",
      type: "text",
      label: "Regions Label",
    },
    {
      name: "solutionsLabel",
      type: "text",
      label: "Solutions Label",
    },
    {
      name: "resetLabel",
      type: "text",
      label: "Reset Label",
    },
    {
      name: "showIndustries",
      type: "checkbox",
      label: "Show Industries Filter",
    },
    {
      name: "showRegions",
      type: "checkbox",
      label: "Show Regions Filter",
    },
    {
      name: "showSolutions",
      type: "checkbox",
      label: "Show Solutions Filter",
    },
    {
      name: "industries",
      type: "array",
      label: "Industries",
      fields: [{ name: "label", type: "text" }],
    },
    {
      name: "regions",
      type: "array",
      label: "Regions",
      fields: [{ name: "label", type: "text"}],
    },
    {
      name: "solutions",
      type: "array",
      label: "Solutions",
      fields: [{ name: "label", type: "text" }],
    },
    {
      name: "items",
      type: "array",
      label: "Case Study Cards",
      labels: { singular: "Card", plural: "Cards" },
      minRows: 0,
      fields: [
        { name: "title", type: "text", label: "Title" },
        { name: "excerpt", type: "textarea", label: "Excerpt" },
        { name: "link", type: "text", label: "Link (slug or URL)" },
        { name: "mainImage", type: "upload", relationTo: "media", label: "Main Image" },
        { name: "badgeImage", type: "upload", relationTo: "media", label: "Badge Image (small logo)" },
        { name: "industry", type: "text", label: "Industry" },
        { name: "region", type: "text", label: "Region" },
        { name: "solution", type: "text", label: "Solution" },
      ],
    },
  ],
}


