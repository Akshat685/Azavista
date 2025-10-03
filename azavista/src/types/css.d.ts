// CSS Module declarations
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

// Global CSS imports
declare module "*.css" {
  const content: any;
  export default content;
}

// SCSS Module declarations
declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}

// Global SCSS imports
declare module "*.scss" {
  const content: any;
  export default content;
}
