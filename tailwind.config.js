/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "dark-primary": "#101010",
        "dark-secondary": "#141417",
        "light-primary": "#F5F5F5",
        "light-secondary": "#E5E5E5",
      }
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
  ],
}
