/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './js/**/*.js'],
  theme: {
    extend: {
      colors: {
        ink: '#11150F',
        paper: '#F6F6F0',
        warm: '#ECE8DC',
        fern: '#2F7D49',
        sprout: '#D3F278',
        honey: '#F2B84B',
        cobalt: '#3A82F6',
        brand: {
          yellow: '#F5A623',
          green: '#059669',
          coral: '#F43F5E',
          cream: '#FAFAFA',
          charcoal: '#0F172A',
          gray: '#64748B',
        },
        gray: {
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        coral: { 50: '#FFF7ED', 100: '#FFEDD5' },
      },
      fontFamily: {
        heading: ['Bricolage Grotesque', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
      },
    },
  },
};
