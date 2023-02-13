/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridRow: {
        'span-8': 'span 8 / span 8',
      }
    },
  },
  darkMode: 'class',
  plugins: [],
};
