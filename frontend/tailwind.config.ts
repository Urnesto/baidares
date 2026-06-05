import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        /* Forest greens */
        "forest-950": "#101d15",
        "forest-900": "#142419",
        "forest-800": "#1b2e22",
        "forest-700": "#244031",
        "forest-600": "#2e5638",

        /* Accent */
        accent:       "#2f6b3a",
        "accent-hover": "#27592f",

        /* Sage */
        "sage-400": "#9fb38e",
        "sage-300": "#c2d2b1",
        "sage-200": "#d8e2cb",

        /* Surfaces */
        paper:      "#f3f1e8",
        "paper-2":  "#ece9dd",
        surface:    "#ffffff",
        "surface-2": "#fbfaf4",
        cream:      "#f4f3ea",

        /* Text */
        ink:        "#18241c",
        "ink-soft": "#3c4a3f",
        muted:      "#6f7a68",
        "muted-2":  "#8b9583",

        /* Accents */
        amber:  "#caa24a",
        water:  "#6b9a93",
      },

      fontFamily: {
        sans:  ["Hanken Grotesk",   "system-ui",    "sans-serif"],
        serif: ["Instrument Serif", "Georgia",      "serif"],
        mono:  ["JetBrains Mono",   "ui-monospace", "monospace"],
      },

      borderRadius: {
        sm:      "0.75rem",
        DEFAULT: "1.125rem",
        lg:      "1.625rem",
        pill:    "999px",
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
        content: "73.75rem",
      },
    },
  },
};

export default config;
