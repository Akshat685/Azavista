import type { SerializedEditorState } from "lexical";

// Shared
export interface CloudinaryImage {
  cloudinary?: {
    secure_url?: string;
    width?: number;
    height?: number;
  };
  url?: string;
  thumbnailURL?: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface Media {
  id?: string | number;
  alt?: string;
  cloudinary?: CloudinaryImage["cloudinary"];
  thumbnailURL?: string;
  url?: string;
}

// HeroBlock
export interface Button {
  url: string;
  label: string;
  variant: "primary" | "secondary";
}

export interface Logo {
  logo?: CloudinaryImage;
  alt?: string;
}

export interface HeroBlockData {
  blockType: "hero";
  heading: string;
  subheading?: string;
  buttons?: Button[];
  logos?: Logo[];
}


// SmarterEvents
export interface SmarterEventsBlockData {
  blockType: "smarterEvents";
  heading: string;
  image: CloudinaryImage;
  categoryLabel: string;
  title: string;
  description: string;
  primaryButtonLabel?: string;
  primaryButtonUrl?: string;
  secondaryButtonLabel?: string;
  secondaryButtonUrl?: string;
}


// TabsSection
export interface Tab {
  tabLabel: string;
  heading: string;
  description: SerializedEditorState;
  image: CloudinaryImage;
}

export interface TabsSectionData {
  blockType: "tabSection";
  tabs: Tab[];
  buttonLabel?: string;
  buttonUrl?: string;
}



// Custom Feature Block interfaces
export interface CustomFeatureBlockData {
  blockType: "custom-feature";
  subheading?: string;
  heading?: string;
  buttonLabel?: string;
  buttonUrl?: string;
  image?: Media;
}   


// Why Azavista Block interfaces
export interface Feature {
  headingBlue?: string;
  headingBlack?: string;
  description?: string;
  icon?: CloudinaryImage;
}

export interface WhyAzavistaBlockData {
  blockType: "whyAzavista";
  badge?: string;
  title?: string;
  subtitle?: string;
  features?: Feature[];
}


// Case Studies Block interfaces
// export interface CaseStudyImage {
//   cloudinary?: {
//     secure_url?: string;
//     width?: number;
//     height?: number;
//   };
//   url?: string;
//   thumbnailURL?: string;
//   alt?: string;
// }

export interface CaseStudyCard {
  title?: string;
  description?: string;
  link?: string;
  category?: string;
  image?: CloudinaryImage;
}

export interface CaseStudiesBlockData {
  blockType: "caseStudies";
  badge?: string;
  title?: string;
  subtitle?: string;
  cards?: CaseStudyCard[];
}


// Testimonials Block interfaces
export interface TestimonialItem {
  quote: string;
  author: string;
  role?: string;
}

export interface TestimonialsBlockData {
  blockType: "testimonials";
  badge?: string;
  title?: string;
  subtitle?: string;
  items?: TestimonialItem[];
}


// Seamless Block interfaces
export interface LogoItem {
  logo?: { cloudinary?: { secure_url?: string }; url?: string };
  alt?: string;
}

export interface SeamlessBlockData {
  blockType: "seamless";
  title?: string;
  description?: string;
  buttonLabel?: string;
  buttonUrl?: string;
  mainLogo?: { cloudinary?: { secure_url?: string }; url?: string };
  logos?: LogoItem[];
}


// Get Started Block interfaces
export interface GetstartedBlockData {
  blockType: "getstarted";
  sectionLabel: string;
  heading: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage?: number | Media;
}

export interface ContactBlockData {
  blockType: "contact";
  leftTitle: string;
  leftDescription: string;
  submitLabel: string;
  emailPlaceholder: string;
  firstNamePlaceholder: string;
  lastNamePlaceholder: string;
  companyPlaceholder: string;
  countryLabel: string;
  topicLabel: string;
  planningLabel: string;
  consentNewsText: string;
  consentPrivacyText: string;
  privacyUrl: string;
  countryOptions?: { label: string }[];
  topicOptions?: { label: string }[];
  planningOptions?: { label: string }[];
  rightHeading: string;
  features?: { title: string; description: string }[];
  trustHeading: string;
  logos?: LogoItem[];
}



export type BlockData =
  | HeroBlockData
  | SmarterEventsBlockData
  | TabsSectionData
  | CustomFeatureBlockData
  | WhyAzavistaBlockData
  | CaseStudiesBlockData
  | TestimonialsBlockData
  | SeamlessBlockData
  | GetstartedBlockData
  | ContactBlockData