import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default {
  content: [],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.slate,
      primary: colors.indigo,
      secondary: colors.emerald,
      accent: colors.amber,
      success: colors.teal,
      info: colors.sky,
      warning: colors.orange,
      danger: colors.red,
      disabled: colors.slate,
      yellow: colors.yellow,
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
