/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tub-blue': '#1da1f2',
        'tub-black': '#14171a',
        'tub-dark-gray': '#657786',
        'tub-light-gray': '#aab8c2',
        'tub-extra-light-gray': '#e1e8ed',
        'tub-background': '#15202b',
      },
    },
  },
  plugins: [],
}