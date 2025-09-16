import type { CollectionConfig } from "payload";
import { Hero } from "../blocks/Hero";
import { SmarterEvents } from "@/blocks/SmarterEvents";
import { TabSections } from "@/blocks/TabSections"
import { CustomFeature } from "@/blocks/CustomFeature"
import { WhyAzavista } from "@/blocks/WhyAzavista";
import { CaseStudies } from "@/blocks/CaseStudies";
import { Testimonials } from "@/blocks/Testimonials";
import { Seamless } from "@/blocks/Seamless";
import { Getstarted } from "@/blocks/GetStarted";
import { Contact as ContactBlock } from "@/blocks/Contact";
import { FeatureSection } from "@/blocks/FeatureSection";
import { PlatformFeatures } from "@/blocks/PlatformFeatures";
import { BlueSection } from "@/blocks/BlueSection";
import { IntegratedTool } from "@/blocks/IntegratedTool";
import { FAQ } from "@/blocks/FAQ";
import { SplitFeature } from "@/blocks/SplitFeature";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description: "URL-friendly slug automatically generated from the title",
      },
    },
    {
      name: "pagebuilder",
      type: "blocks",
      blocks: [
        Hero,
        SmarterEvents,
        TabSections,
        CustomFeature,
        WhyAzavista,
        CaseStudies,
        Testimonials,
        Seamless,
        Getstarted,
        ContactBlock,
        FeatureSection,
        PlatformFeatures,
        BlueSection,
        IntegratedTool,
        FAQ,
        SplitFeature,
      ]
    }
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        // Automatically generate slug from title if not set
        if (data && !data.slug && data.title) {
          data.slug = data.title
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9\-]/g, "");
        }
        return data;
      },
    ],
  },
};
