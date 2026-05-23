import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          900: "#0b0a08",
          800: "#13110e",
          700: "#1c1916",
          600: "#26221d",
          500: "#37322a",
        },
        bone: {
          50: "#f6f1e7",
          100: "#ece4d2",
          200: "#d8ccb1",
          300: "#beae8b",
          400: "#9d8c6a",
        },
        champagne: {
          DEFAULT: "#c8a96a",
          dark: "#a8884c",
          light: "#dfc28a",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Cormorant Garamond", "serif"],
        body: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      letterSpacing: {
        widest: "0.2em",
        wider: "0.12em",
        wide: "0.06em",
      },
    },
  },
  plugins: [],
};

export default config;
