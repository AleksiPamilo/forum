/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      'boxShadow': {
        'glow-1': '0 0 10px 1px rgba(0, 0, 255, 0.35)',
        'glow-2': '0 0 10px 2px rgba(0, 0, 255, 0.35)',
        'glow-3': '0 0 10px 3px rgba(0, 0, 255, 0.35)',
        'glow-4': '0 0 10px 4px rgba(0, 0, 255, 0.35)',
        'glow-5': '0 0 10px 5px rgba(0, 0, 255, 0.35)',
        'glow-6': '0 0 10px 6px rgba(0, 0, 255, 0.35)',
        'glow-7': '0 0 10px 7px rgba(0, 0, 255, 0.35)',
        'glow-8': '0 0 10px 8px rgba(0, 0, 255, 0.35)',
        'glow-9': '0 0 10px 9px rgba(0, 0, 255, 0.35)',
        'glow-10': '0 0 10px 10px rgba(0, 0, 255, 0.35)',
      }
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
  ],
}