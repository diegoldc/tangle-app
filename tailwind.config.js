const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        'deep-purple': '#673AB7',
        "light-purple": "#d8b4fe",
        "logo-purple" : "#352842"
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
  
}
