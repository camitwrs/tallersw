/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif']
      },
      colors: {
        'p-Blue': '#082340',
        'p-White': '#f4f4f4',
        'p-Gray': '#505152',
        'p-l-Gray': '#dadada'
      }
    },
  },
  plugins: [],
};
