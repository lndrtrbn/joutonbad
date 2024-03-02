/**
 * Colors used in the Tailwind design system.
 * Look at tailwind.config.ts.
 */

type Color = {
  DEFAULT: string;
  l: string;
  d: string;
  a: string;
};

const accent: Color = {
  DEFAULT: "#da3124",
  l: "#e15a50",
  d: "#ae271d",
  a: "#da312450",
};

const white: Color = {
  DEFAULT: "#f7f7f7",
  l: "#ffffff",
  d: "#f0f0f0",
  a: "#f7f7f740",
};

const black: Color = {
  DEFAULT: "#595959",
  l: "#919191",
  d: "#000000",
  a: "#59595940",
};

const green = "#80ed99";
const red = "#e63946";
const yellow = "#f6bd60";
const blue = "#3a86ff";

export const DEFAULT_MAIN_COLOR = "#80ED99";

const m = {
  moon: "rgb(166 188 224)",
  moonlight: "rgb(218 230 248)",
  white: "rgb(255 255 255)",
  black: "rgb(29 32 37)",
  main: "rgb(var(--color-main))",
};

const colors = {
  accent,
  white,
  black,
  green,
  red,
  yellow,
  blue,
  m,
};

type AllColors = keyof typeof colors.m;
type Opacity = "" | `/${number}`;
export type TextColor = `text-m-${AllColors}${Opacity}`;
export type BgColor = `bg-m-${AllColors}${Opacity}`;

export default colors;
