import type { Block } from "payload"

export const IntegrationsGrid: Block = {
  slug: "integrationsGrid",
  labels: {
    singular: "Integrations Grid",
    plural: "Integrations Grids",
  },
  fields: [
   
    {
      name: "searchPlaceholder",
      type: "text",
      label: "Search Placeholder",
      
    },
    {
      name: "filterByLabel",
      type: "text",
      label: "Filter By Label",
      
    },
    {
      name: "clearAllLabel",
      type: "text",
      label: "Clear All Label",
      
    },
    {
      name: "categoriesLabel",
      type: "text",
      label: "Categories Label",
      
    },
    {
      name: "showingResultsLabel",
      type: "text",
      label: "Showing Results Label",
      
    },
    {
      name: "resultsLabel",
      type: "text",
      label: "Results Label",
      
    },
    {
      name: "categories",
      type: "array",
      label: "Categories",
      fields: [
        {
          name: "label",
          type: "text",
          label: "Category Label",
          required: true,
        },
      ],
    },
    {
        name: "integrations",
        type: "array",
        label: "Integrations",
        minRows: 1,
        fields: [
          {
            name: "name",
            type: "text",
            label: "Integration Name",
            required: true,
          },
          {
            name: "description",
            type: "textarea",
            label: "Description",
          },
          {
            name: "logo",
            type: "upload",
            relationTo: "media",
            label: "Logo",
          },
          {
            name: "category",
            type: "text",
            label: "Category",
          },
          {
            name: "link",
            type: "text",
            label: "Link",
          },
        ],
      },
  ],
}
