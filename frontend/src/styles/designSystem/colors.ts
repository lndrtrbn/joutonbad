import { colorScale } from "../../utils/color";

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

export const DEFAULT_MOBILE_MAIN_COLOR = "128 237 153";
const m = {
  ...colorScale("moon", "166 188 224"),
  ...colorScale("moonlight", "218 230 248"),
  ...colorScale("white", "255 255 255"),
  ...colorScale("main", "var(--color-main)"),
  ...colorScale("black", "29 32 37"),
  veryBlack: "#171a1f",
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

export type TextColor = `text-m-${keyof typeof colors.m}`;
export type BgColor = `bg-m-${keyof typeof colors.m}`;

export default colors;
