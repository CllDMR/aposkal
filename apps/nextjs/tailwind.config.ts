import type { Config } from "tailwindcss";

import baseConfig from "@acme/tailwind-config";

export default {
  content: [
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/atoms/**/*.{ts,tsx}",
    "../../packages/ui/molecules/**/*.{ts,tsx}",
    "../../packages/ui/organisms/**/*.{ts,tsx}",
  ],
  presets: [baseConfig],
} satisfies Config;
