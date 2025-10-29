/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rick-cyan': '#41B1C7',
        'rick-pink': '#f6b3e5',
        'rick-lavender': '#c876ff',
        'rick-purple': '#7232f2',
        'rick-indigo': '#20115b',
        'rick-black': '#010108',
        'rick-white': '#ffffff',
        'dark-bg': '#010108',
        'dark-surface': '#20115b',
        'dark-border': '#7232f2',
        'dark-text': '#f6b3e5',
        'dark-accent': '#c876ff',
      },
      fontFamily: {
        'rick': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
