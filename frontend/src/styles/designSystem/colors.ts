/**
 * Colors used in the Tailwind design system.
 * Look at tailwind.config.ts.
 */

export const DEFAULT_MAIN_COLOR = "#da3124";

const colors = {
  main: "rgb(var(--color-main))",
  white: "rgb(255 255 255)",
  black: "rgb(29 32 37)",
  error: "rgb(239 35 60)",
  success: "rgb(64 165 120)",
  bg: "rgb(247 249 250)",
};

type AllColors = keyof typeof colors | keyof typeof colors;
type Opacity = "" | `/${number}`;
export type TextColor = `text-${AllColors}${Opacity}`;
export type BgColor = `bg-${AllColors}${Opacity}`;

export default colors;
