/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
    // "../../packages/ui/atoms/**/*.{ts,tsx}",
    // "../../packages/ui/molecules/**/*.{ts,tsx}",
    // "../../packages/ui/organisms/**/*.{ts,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#04B5A6",
        secondary: "#203A7F",
        info: "#00E1C7",
      },
    },
  },
  plugins: [],
};
