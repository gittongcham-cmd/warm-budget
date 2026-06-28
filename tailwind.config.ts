import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: "#fff8ed",
        linen: "#f6ead8",
        clay: "#d8783f",
        persimmon: "#ef8d48",
        cocoa: "#4d3428",
        moss: "#6f8a54",
        rosewood: "#a85d57",
        ink: "#2f241f"
      },
      boxShadow: {
        warm: "0 14px 35px rgba(150, 91, 45, 0.14)"
      }
    }
  },
  plugins: []
};

export default config;
