/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 35px 120px -40px rgba(56, 189, 248, 0.6)",
      },
      backgroundImage: {
        "hero-light": "radial-gradient(circle at top, rgba(56, 189, 248, 0.14), transparent 45%), radial-gradient(circle at bottom right, rgba(14, 165, 233, 0.12), transparent 35%)",
        "hero-dark": "radial-gradient(circle at top, rgba(56, 189, 248, 0.2), transparent 35%), radial-gradient(circle at bottom right, rgba(14, 165, 233, 0.18), transparent 30%)",
      },
    },
  },
  plugins: [],
}