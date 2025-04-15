import { theme } from 'tailwindcss/defaultConfig'
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', ...theme.fontFamily.sans],
      },
      fontSize: {
        xs: ["0.625rem", { lineHeight: "0.875rem" }],
        sm: ["0.75rem", { lineHeight: "1rem" }],
        md: ["0.875rem", { lineHeight: "1.125rem" }],
        lg: ["1.125rem", { lineHeight: "1.5rem" }],
        xl: ["1.5rem", { lineHeight: "2rem" }],
      },
      colors: {
        "blue-base": "#2C46B1",
        "blue-dark": "#2C4091",
        "danger": "#B12C4D",
      },
      screens: {
        sm: '390px',
        md: '992px',
      },
    },
  },
  plugins: [],
}