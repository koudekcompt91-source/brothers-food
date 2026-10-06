import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: "var(--color-orange)",
        navy: "var(--color-navy)",
        black: "var(--color-black)",
        white: "var(--color-white)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      maxWidth: {
        shell: "1440px",
      },
    },
  },
  plugins: [],
};

export default config;
