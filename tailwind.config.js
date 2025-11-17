/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './certificados.html',
    './**/*.html',
    './scripts/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        background: '#050816',
        surface: '#111827',
        primary: '#0ea5e9',
        accent: '#22c55e'
      }
    }
  },
  plugins: []
};
