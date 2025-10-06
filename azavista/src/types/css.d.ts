// CSS Module declarations
declare module "*.module.css" {
  const content: { [className: string]: string };
  export default content;
}

// Global CSS imports
declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}

// SCSS Module declarations
declare module "*.module.scss" {
  const content: { [className: string]: string };
  export default content;
}

// Global SCSS imports
declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}