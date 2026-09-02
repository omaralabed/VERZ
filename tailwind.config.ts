import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#08090D",
        surface: {
          50: "#1E222D",
          100: "#161821",
          200: "#10121A",
          300: "#0D0E15",
        },
        border: "#202533",
        accent: {
          cyan: "#00E5FF",
          green: "#00E676",
          purple: "#7C4DFF",
          amber: "#FFB300",
          red: "#FF3D00",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(0, 229, 255, 0.25)",
        "glow-green": "0 0 40px -10px rgba(0, 230, 118, 0.25)",
      },
      animation: {
        "pulse-fast": "pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
