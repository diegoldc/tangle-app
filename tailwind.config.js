const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        'deep-purple': '#673AB7', // Puedes usar el valor hexadecimal para Deep Purple (similar al Material Design)
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}

