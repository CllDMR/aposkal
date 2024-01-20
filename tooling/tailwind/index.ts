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
      primary: colors.blue,
      secondary: colors.emerald,
      accent: colors.amber,
      success: colors.teal,
      info: colors.sky,
      warning: colors.orange,
      danger: colors.red,
      disabled: colors.slate,
    },

    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        fadein: "fadein 0.2s linear 0s 1 forwards",
      },
      keyframes: {
        fadein: {
          "0%": { opacity: "0" },
          "100%": { opacity: "100" },
        },
      },
    },

  },
  plugins: [require("@headlessui/tailwindcss")],
} satisfies Config;
