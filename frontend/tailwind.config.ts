import { Config } from "tailwindcss";

import colors from "./src/styles/designSystem/colors";
import borderRadius from "./src/styles/designSystem/radius";

/* https://tailwindcss.com/docs/guides/vite */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  darkMode: "class",
  theme: {
    colors,
    borderRadius,
  },
};

export default config;
