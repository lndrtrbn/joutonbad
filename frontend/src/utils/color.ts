import { DEFAULT_MAIN_COLOR } from "../styles/designSystem/colors";

export function hexToRgb(hex?: string) {
  if (!hex) return hexToRgb(DEFAULT_MAIN_COLOR);
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r} ${g} ${b}`;
}
