import type { Block } from "payload";

export const VideoSection: Block = {
  slug: "videoSection",
  labels: {
    singular: "Video Section",
    plural: "Video Sections",
  },
  fields: [
    {
      name: "heading",
      type: "text",
      label: "Main Heading",
    },
    {
      name: "description1",
      type: "textarea",
      label: "First Description",
    },
    {
      name: "description2",
      type: "textarea",
      label: "Second Description",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Image",
    },
    // {
    //   name: "bottomText",
    //   type: "text",
    //   required: true,
    //   label: "Bottom Text Overlay",
    // },
  ],
};
