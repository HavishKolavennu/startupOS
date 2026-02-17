import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#F2EDE8",
          alt: "#EBE5DF",
          dark: "#E5DDD5",
        },
        crimson: {
          DEFAULT: "#D85C5C",
          hover: "#C44A4A",
          muted: "#E8A0A0",
          light: "#F5E5E5",
        },
        cyan: {
          DEFAULT: "#00C9B7",
          muted: "#7DD9CF",
          glow: "rgba(0, 201, 183, 0.35)",
        },
      },
      fontFamily: {
        display: ["Syne", "system-ui", "sans-serif"],
        body: ["DM Sans", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      boxShadow: {
        soft: "0 2px 12px -4px rgba(0, 0, 0, 0.06)",
        card: "0 4px 24px -8px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 201, 183, 0.08)",
        glow: "0 0 32px -8px rgba(216, 92, 92, 0.3)",
        "tech-glow": "0 0 24px -4px rgba(0, 201, 183, 0.25), 0 0 0 1px rgba(0, 201, 183, 0.15)",
        "cyan-glow": "0 0 24px -4px rgba(0, 201, 183, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
