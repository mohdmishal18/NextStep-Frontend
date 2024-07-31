/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white : '#f0f8ff',
        primary: '#18181b',
        secondary: '#27272A',
        blue: '#007aff'
      }
    },
  },
  plugins: [],
}   