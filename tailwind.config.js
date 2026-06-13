/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:       "#0B0F1A",
        surface:  "#111827",
        surface2: "#1a2235",
        border:   "#1f2d42",
        accent:   "#6366F1",
        accent2:  "#818CF8",
        muted:    "#64748B",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}