/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["NUD Std", "sans-serif"],
      },
      colors: {
        "custom-blue": "#115e59",
        "custom-white": "#f4f4f4",
        "custom-gray": "#505152",
        "custom-lightgray": "#dadada",
      },
    },
  },
  plugins: [],
};
