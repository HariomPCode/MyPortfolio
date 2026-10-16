import type { Config } from "tailwindcss";
// Colors come from CSS variables in src/app/globals.css (change the accent there).
const v = (n: string) => `rgb(var(--${n}) / <alpha-value>)`;
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { bg: v("bg"), surface: v("surface"), line: v("line"), fg: v("fg"), muted: v("muted"), accent: v("accent"), "accent-fg": v("accent-fg") },
      fontFamily: { display: ["var(--font-display)"], sans: ["var(--font-body)"], mono: ["var(--font-mono)"] },
    },
  },
} satisfies Config;
