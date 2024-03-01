import { DEFAULT_MOBILE_MAIN_COLOR } from "../styles/designSystem/colors";

export function hexToRgb(hex?: string) {
  if (!hex) return DEFAULT_MOBILE_MAIN_COLOR;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r} ${g} ${b}`;
}

export function rgbToHex(rgb = DEFAULT_MOBILE_MAIN_COLOR) {
  const [r, g, b] = rgb.split(" ").map((c) => parseInt(c, 10));
  function toHex(c: number) {
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  return "#" + toHex(r) + toHex(g) + toHex(b);
}

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

export function colorScale<T extends string>(
  name: T,
  baseColor: string,
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
