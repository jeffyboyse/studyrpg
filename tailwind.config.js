/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.jsx",     // VIKTIGT för React
    "./resources/**/*.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}