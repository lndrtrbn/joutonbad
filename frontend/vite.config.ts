import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react-swc";

import { defineConfig } from "vite";

import postcss from "./postcss.config";

export default defineConfig({
  plugins: [react(), svgr()],
  css: {
    postcss,
  },
});
