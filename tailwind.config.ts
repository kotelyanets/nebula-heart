import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
      animation: {
        letterAnim: "letterAnim 4s linear infinite",
        transformAnim: "transformAnim 2s infinite alternate cubic-bezier(0.6, 0.8, 0.5, 1)",
        opacityAnim: "opacityAnim 4s infinite",
      },
      keyframes: {
        letterAnim: {
          "0%": { opacity: "0" },
          "5%": { opacity: "1", textShadow: "0 0 4px #fff", transform: "scale(1.1) translateY(-2px)" },
          "20%": { opacity: "0.2" },
          "100%": { opacity: "0" },
        },
        transformAnim: {
          "0%": { transform: "translate(-55%)" },
          "100%": { transform: "translate(55%)" },
        },
        opacityAnim: {
          "0%, 100%": { opacity: "0" },
          "15%": { opacity: "1" },
          "65%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
