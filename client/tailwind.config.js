/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';
import flowbitePlugin from 'flowbite/plugin';
import flowbiteReactPlugin from 'flowbite-react/tailwind';

export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        kurale: ['Kurale', 'sans-serif'],
      },
      colors: {
        customWhite: '#F1F9FB',
        buttonColor: '#65C1CE80',
        textColor: '#00659B',
      },
      screens: {
        487: '487px',
      },
      backgroundImage: {
        bishkek: "url('/src/assets/images/regions/bishkek.jpeg')",
        batken: "url('/src/assets/images/regions/batken.jpeg')",
        issykkol: "url('/src/assets/images/regions/issykkol.jpeg')",
        jalalabad: "url('/src/assets/images/regions/jalalabad.jpeg')",
        osh: "url('/src/assets/images/regions/osh.jpeg')",
        naryn: "url('/src/assets/images/regions/naryn.jpeg')",
        talas: "url('/src/assets/images/regions/talas.jpeg')",
      },
    },
  },
  plugins: [flowbitePlugin, flowbiteReactPlugin.plugin()],
};
