module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      textColor: {
        'hedge-me': '#5483C7',
      },
      backgroundColor: {
        'hedge-me': '#5483C7',
      },
      ringColor: {
        'hedge-me': '#5483C7',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}