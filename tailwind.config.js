/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:       "#ffffff",
        surface:  "#ffffff",
        surface2: "#f8f9fa",
        border:   "#e8eaed",
        accent:   "#1a73e8",
        accent2:  "#1967d2",
        muted:    "#5f6368",
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