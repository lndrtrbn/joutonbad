import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";

import tailwindConfig from "./tailwind.config";

/* https://tailwindcss.com/docs/guides/vite */
export default {
  plugins: [tailwind(tailwindConfig), autoprefixer],
};
