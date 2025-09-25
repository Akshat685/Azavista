import { Block } from "payload";

export const Heading: Block = {
  slug: "heading",
  labels: { singular: "Heading", plural: "Headings" },
  fields: [
    { name: "heading", type: "text", label: "Heading" },
  ],
};


