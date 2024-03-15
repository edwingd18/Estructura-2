/** @type {import('tailwindcss').Config} */
export default {
  content: [
    'node_modules/flowbite-react/lib/esm/**/*.js',
    "./src/**/*.{js,jsx,ts,tsx}",
],theme:{
  extend: {
    colors: {
      'agua': '#181725',
      'icon': '#E5E5EB'


    },
  },
},
  plugins: [require('flowbite/plugin')],
}

