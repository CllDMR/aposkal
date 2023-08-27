import type { Config } from "tailwindcss";

import baseConfig from "@acme/tailwind-config";

export default {
  content: [
    "./src/**/*.{ts,tsx}",
    "../../node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  presets: [baseConfig],
} satisfies Config;
