const colors = require('tailwindcss/colors');

module.exports = {
  mode: "jit",
  purge: ["./app/**/*.{ts,tsx}"],
  darkMode: "class",
  extend: {},
  theme: {
    colors: {
      ...colors,
      'light-dark': '#282c35',
    },
  },
  variants: {},
  plugins: []
};
