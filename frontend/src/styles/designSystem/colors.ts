/**
 * Colors used in the Tailwind design system.
 * Look at tailwind.config.ts.
 */

export const DEFAULT_MAIN_COLOR = "#78e391";

const m = {
  moon: "rgb(166 188 224)",
  moonlight: "rgb(218 230 248)",
  white: "rgb(255 255 255)",
  black: "rgb(29 32 37)",
  main: "rgb(var(--color-main))",
};

const colors = {
  main: "rgb(var(--color-main))",
  white: "rgb(255 255 255)",
  black: "rgb(29 32 37)",
  error: "rgb(239 35 60)",
  m,
};

type AllColors = keyof typeof colors.m | keyof typeof colors;
type Opacity = "" | `/${number}`;
export type TextColor = `text-m-${AllColors}${Opacity}`;
export type BgColor = `bg-m-${AllColors}${Opacity}`;

export default colors;
