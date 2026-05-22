import type { Config } from "https://esm.sh/tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        marine: "#0c2340",
        brons: "#b46b2a",
        mos: "#6b8e23",
        oceaan: "#008fc7",
      },
      fontFamily: {
        sans: ["Arial", "Helvetica", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;