import type { Block } from "payload";

export const FAQ: Block = {
  slug: "faq",
  labels: { singular: "FAQ", plural: "FAQs" },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Section Title",
    },
    {
      name: "items",
      type: "array",
      labels: { singular: "FAQ Item", plural: "FAQ Items" },
      minRows: 1,
      fields: [
        { name: "question", type: "text", required: true, label: "Question" },
        { name: "answer", type: "textarea", required: true, label: "Answer" },
      ],
    },
  ],
};


