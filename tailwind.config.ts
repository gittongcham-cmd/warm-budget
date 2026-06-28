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
        cream: "#fff7ed",
        linen: "#ffeadf",
        clay: "#ff8f70",
        persimmon: "#ffad8d",
        cocoa: "#5a4037",
        moss: "#70b99f",
        rosewood: "#f67280",
        ink: "#3f302a",
        mint: "#a7d7c5",
        lavender: "#c7b7ff",
        butter: "#ffe08a"
      },
      boxShadow: {
        warm: "0 16px 36px rgba(255, 143, 112, 0.16)"
      }
    }
  },
  plugins: []
};

export default config;
