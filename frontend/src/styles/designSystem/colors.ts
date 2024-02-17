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

type ColorScaleKeys<T extends string> =
  | T
  | `${T}10`
  | `${T}20`
  | `${T}30`
  | `${T}40`
  | `${T}50`
  | `${T}60`
  | `${T}70`
  | `${T}80`
  | `${T}90`;

type ColorScale<T extends string> = {
  [key in ColorScaleKeys<T>]: string;
};

function colorScale<T extends string>(
  name: T,
  baseColor: string
): ColorScale<T> {
  return {
    [`${name}10`]: `rgb(${baseColor} / 0.1)`,
    [`${name}20`]: `rgb(${baseColor} / 0.2)`,
    [`${name}30`]: `rgb(${baseColor} / 0.3)`,
    [`${name}40`]: `rgb(${baseColor} / 0.4)`,
    [`${name}50`]: `rgb(${baseColor} / 0.5)`,
    [`${name}60`]: `rgb(${baseColor} / 0.6)`,
    [`${name}70`]: `rgb(${baseColor} / 0.7)`,
    [`${name}80`]: `rgb(${baseColor} / 0.8)`,
    [`${name}90`]: `rgb(${baseColor} / 0.9)`,
    [`${name}`]: `rgb(${baseColor} / 1)`,
  } as ColorScale<T>;
}

const m = {
  ...colorScale("moon", "166 188 224"),
  ...colorScale("moonlight", "218 230 248"),
  ...colorScale("white", "255 255 255"),
  ...colorScale("main", "128 237 153"),
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
