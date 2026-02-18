/**
 * Brand and theme configuration.
 * Change these values to rebrand the product.
 */
export const config = {
  brand: {
    name: "StartupOS",
    tagline: "Run your startup like it already has an ops team.",
  },
  colors: {
    background: "#F6EFE6",
    backgroundAlt: "#F0E8DE",
    accent: "#D85C5C",
    accentHover: "#C44A4A",
    accentMuted: "#E8A0A0",
    text: "#2D2A26",
    textMuted: "#5C5650",
    border: "#E5DDD4",
    borderSoft: "#EDE6DC",
    cardBg: "#FFFFFF",
    success: "#4A9B6F",
    warning: "#D4A84B",
  },
  typography: {
    fontDisplay: "var(--font-display)",
    fontBody: "var(--font-body)",
  },
} as const;

export type Config = typeof config;
