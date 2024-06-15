/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
    screens: {
      'sm': '640px',
      'md': '768px',
      'ml': '900px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1400px',
      '3xl': '1500px',
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('flowbite/plugin')
  ],
}