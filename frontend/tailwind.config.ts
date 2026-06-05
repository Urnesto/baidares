import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        forest: {
          950: "#101d15",
          900: "#142419",
          800: "#1b2e22",
          700: "#244031",
          600: "#2e5638",
        },
        accent: {
          DEFAULT: "#2f6b3a",
          hover:   "#27592f",
        },
        sage: {
          400: "#9fb38e",
          300: "#c2d2b1",
          200: "#d8e2cb",
        },
        paper: {
          DEFAULT: "#f3f1e8",
          2:       "#ece9dd",
        },
        surface: {
          DEFAULT: "#ffffff",
          2:       "#fbfaf4",
        },
        ink: {
          DEFAULT: "#18241c",
          soft:    "#3c4a3f",
        },
        muted: {
          DEFAULT: "#6f7a68",
          2:       "#8b9583",
        },
        amber:  "#caa24a",
        water:  "#6b9a93",
      },

      fontFamily: {
        sans:  ["Hanken Grotesk",   "system-ui",    "sans-serif"],
        serif: ["Instrument Serif", "Georgia",      "serif"],
        mono:  ["JetBrains Mono",   "ui-monospace", "monospace"],
      },

      borderRadius: {
        sm:   "12px",
        DEFAULT: "18px",
        lg:   "26px",
        pill: "999px",
      },

      boxShadow: {
        sm: "0 1px 2px rgba(16,29,21,.05), 0 4px 14px rgba(16,29,21,.05)",
        DEFAULT: "0 2px 6px rgba(16,29,21,.06), 0 20px 44px rgba(16,29,21,.10)",
        lg: "0 30px 70px rgba(16,29,21,.22)",
      },

      transitionTimingFunction: {
        brand: "cubic-bezier(.4,.14,.2,1)",
      },

      maxWidth: {
        content: "1180px",
      },
    },
  },
};

export default config;
