import type { Block } from "payload";

export const GalleryMarquee: Block = {
  slug: "galleryMarquee",
  labels: {
    singular: "Gallery Marquee",
    plural: "Gallery Marquees",
  },
  fields: [
    {
      name: "images",
      type: "array",
      label: "Images",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          label: "Image",
        },
      ],
    },
  ],
};


