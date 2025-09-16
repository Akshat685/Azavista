"use client";

import HeroBlock from "./HeroBlock";
import SmarterEvents from "./SmarterEvents";
import TabsSection from "./TabsSection";
import CustomFeature from "./CustomFeature";
import WhyAzavista from "./WhyAzavista";
import CaseStudies from "./CaseStudies";
import Testimonials from "./Testimonials";
import Seamless from "./Seamless";
import Getstarted from "./Getstarted";
import ContactBlock from "./Contact";
import FeatureSection from "./FeatureSection";
import PlatformFeature from "./PlatformFeature";
import BlueSection from "./BlueSection";
import IntegratedTool from "./IntegratedTool";
import FAQ from "./FAQ";
import SplitFeature from "./SplitFeature";
import type { BlockData } from "../types";

interface PageBuilderProps {
  blocks?: BlockData[];
}

export default function PageBuilder({ blocks }: PageBuilderProps) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <>
      {blocks.map((block, i) => {
        switch (block.blockType) {
          case "hero":
            return <HeroBlock key={i} {...block} />;
          case "smarterEvents":
            return <SmarterEvents key={i} {...block} />;
          case "tabSection":
            return <TabsSection key={i} {...block} />;
          case "custom-feature":
            return <CustomFeature key={i} {...block} />;
          case "whyAzavista":
            return <WhyAzavista key={i} {...block} />;
          case "caseStudies":
            return <CaseStudies key={i} {...block} />;
          case "testimonials":
            return <Testimonials key={i} {...block} />;
          case "seamless":
            return <Seamless key={i} {...block} />;
          case "getstarted":
            return <Getstarted key={i} {...block} />;
          case "contact":
            return <ContactBlock key={i} {...block} />;
          case "featureSection":
            return <FeatureSection key={i} {...(block as any)} />;
          case "platformFeature":
            return <PlatformFeature key={i} {...(block as any)} />;
          case "blueSection":
            return <BlueSection key={i} {...(block as any)} />;
          case "integratedTool":
            return <IntegratedTool key={i} {...(block as any)} />;
          case "faq":
            return <FAQ key={i} {...(block as any)} />;
          case "splitFeature":
            return <SplitFeature key={i} {...(block as any)} />;
          default:
            return null;
        }
      })}
    </>
  );
}
