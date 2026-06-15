/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:       "#05070f",
        surface:  "#0b0f19",
        surface2: "#121826",
        border:   "#1d2433",
        accent:   "#6366F1",
        accent2:  "#818CF8",
        muted:    "#64748B",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Outfit", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
}