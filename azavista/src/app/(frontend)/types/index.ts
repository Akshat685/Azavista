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
  image?: CloudinaryImage;
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

// Gallery Marquee types
export interface GalleryImageItem {
  image?: Media | number;
}

export interface GalleryMarqueeData {
  blockType: "galleryMarquee";
  images?: GalleryImageItem[];
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
  backgroundImage?: number | CloudinaryImage;
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



// Feature Section Block interfaces
export interface FeatureSectionBullet {
  text: string;
}

export interface FeatureSectionCTA {
  label?: string;
  url?: string;
  variant?: "primary" | "secondary";
}

export interface FeatureSection {
  blockType: "featureSection";
  title?: string;
  heading: string;
  backgroundVariant?: "none" | "light";
  description?: SerializedEditorState;
  cta?: FeatureSectionCTA;
  image: CloudinaryImage | number;
  imageOnRight?: boolean;
}

export interface PlatformFeature {
  blockType: "platformFeature";
  title: string;
  heading: string;
  description?: SerializedEditorState;
}

// Blue Section interfaces
export interface BlueSection {
  blockType: "blueSection";
  heading: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  backgroundColor?: string;
}

export interface IntegratedHero {
  blockType: "integratedHero";
  heading: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  backgroundImage: Media | number | CloudinaryImage;
}

// Integrated Tool block
export interface IntegratedToolItem {
  title: string;
  description: string;
  image?: CloudinaryImage; // Cloudinary media from Payload
  iconBg?: string; // Tailwind class or raw color for the tile background
}

export interface IntegratedTool {
  blockType: "integratedTool";
  heading?: string;
  description?: string;
  items?: IntegratedToolItem[];
}

// FAQ block
export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQBlockData {
  blockType: "faq";
  title?: string;
  items?: FAQItem[];
}

// Generic Split Feature block (used by Registration Analytics)
export interface SplitFeatureButton {
  label: string;
  url: string;
  variant: "primary" | "secondary";
}

export interface SplitFeatureBadge {
  text?: string;
  icon?: CloudinaryImage | number;
}

export interface SplitFeature {
  blockType: "splitFeature";
  title?: string;
  badge?: SplitFeatureBadge;
  heading: string;
  description?: SerializedEditorState;
  backgroundVariant?: "none" | "light";
  buttons?: SplitFeatureButton[];
  image: CloudinaryImage | number;
  imageOnRight?: boolean;
}

// Footer types
export interface FooterHeadquarter {
  title: string;
  address: string;
}

export interface FooterLinkItem {
  label: string;
  url: string;
}

export interface FooterLinkGroup {
  groupTitle: string;
  items: FooterLinkItem[];
}

export interface FooterSocialLink {
  platform: string;
  url: string;
  icon?: number | Media;
}

export interface FooterData {
  logo?: number | Media;
  headquarters: FooterHeadquarter[];
  links: FooterLinkGroup[];
  socialLinks: FooterSocialLink[];
  copyright: string;
}

// Navbar (Mega Menu) types
export interface MegaMenuItem {
  title?: string;
  description?: string;
  link?: string;
  icon?: Media | number;
}

export interface MegaMenuColumn {
  category?: string;
  items?: MegaMenuItem[];
  order?: number;
  createdAt?: string;
}

export interface MegaMenuHighlight {
  title?: string;
  description?: string;
  link?: string;
  linkText?: string;
  image?: Media | number | null;
}

export interface MegaMenuBlock {
  id?: string | number;
  blockType?: string;
  blockType_?: string;
  _blockType?: string;
  blockTypeSlug?: string;
  label?: string;
  columns?: MegaMenuColumn[];
  highlight?: MegaMenuHighlight;
}


// VideoSection Block interfaces
export interface VideoSection {
  blockType: "videoSection";
  heading: string;
  description1: string;
  description2: string;
  image: Media;
  // bottomText: string;
}

// Blog List block
export interface BlogListItem {
  category?: string;
  title: string;
  excerpt?: string;
  image?: Media | number | CloudinaryImage;
  link?: string;
}

export interface BlogListBlock {
  blockType: "blogList";
  featured?: BlogListItem;
  itemsRight?: BlogListItem[];
  
}

export interface BlogGridTypeItem {
  label: string;
}

export interface BlogGridPostItem {
  type?: string;
  category?: string;
  title: string;
  excerpt?: string;
  image?: Media | number | CloudinaryImage;
  link?: string;
}

export interface BlogGridBlock {
  blockType: "blogGrid";
  searchPlaceholder?: string;
  types?: BlogGridTypeItem[];
  items?: BlogGridPostItem[];
}

// Events grid types
export interface EventItem {
  title: string;
  description?: string;
  image?: Media | number | CloudinaryImage;
  link?: string;
  date?: string;
  eventType?: string;
  regions?: string[];
}

export interface EventsGridBlock {
  blockType: "eventsGrid";
  events?: EventItem[];
  eventTypes?: { label: string }[];
  eventTypeLabel?: string;
  regionLabel?: string;
  regionsList?: { label: string }[];
  resetLabel?: string;
}

export interface HeadingBlock {
  blockType: "heading";
  heading?: string;
}



// Blog page types (used by blog/[slug]/page.tsx)
export interface BlogSocialIcon {
  label?: string;
  url?: string;
  icon?: CloudinaryImage | number | Media | null;
}

export interface BlogPage {
  title?: string | null;
  subtitle?: string | null;
  slug?: string | null;
  category?: string | null;
  image?: CloudinaryImage | number | Media | null;
  publishedAt?: string | null;
  lastUpdatedAt?: string | null;
  updatedAt?: string | null;
  socialIcons?: BlogSocialIcon[] | null;
  bodyContent?: SerializedEditorState | null;
}


export interface IntegrateCardItem {
  title: string;
  description?: string;
  learnMore?: string;
  image?: Media | number | CloudinaryImage;
}

export interface IntegrateCardBlock {
  blockType: "integrateCard";
  title?: string;
  items?: IntegrateCardItem[];
}


export type BlockData =
  | HeroBlockData
  | VideoSection
  | SmarterEventsBlockData
  | TabsSectionData
  | CustomFeatureBlockData
  | WhyAzavistaBlockData
  | CaseStudiesBlockData
  | TestimonialsBlockData
  | SeamlessBlockData
  | GetstartedBlockData
  | ContactBlockData
  | FeatureSection
  | PlatformFeature
  | BlueSection
  | IntegratedTool
  | FAQBlockData
  | SplitFeature
  | GalleryMarqueeData
  | BlogListBlock
  | BlogGridBlock
  | EventsGridBlock
  | HeadingBlock
  | IntegrateCardBlock
  | IntegratedHero


  

