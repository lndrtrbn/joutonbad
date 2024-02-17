const borderRadius = {
  sm: "0.125rem",
  DEFAULT: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
  "4xl": "2rem",
  full: "9999px",
};

export type BorderRadius = `rounded-${keyof typeof borderRadius}`;

export default borderRadius;
