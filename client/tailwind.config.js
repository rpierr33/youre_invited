/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sage: {
          DEFAULT: '#809A7B',
          light: '#ADC9B8',
          dark: '#4B624B',
          mist: '#E2E9E1',
        },
        accent: {
          DEFAULT: '#9D7B2F',
          light: '#C9A96E',
        },
        forest: '#212721',
        charcoal: '#2D2A1F',
        taupe: '#B4AC9F',
        'light-warm': '#F9F6F2',
        surface: '#FDFCFA',
        'surface-warm': '#F5F0E7',
        border: '#E2DED9',
      },
      fontFamily: {
        cormorant: ['Cormorant Garamond', 'serif'],
        playfair: ['Playfair Display', 'serif'],
        body: ['Lato', 'sans-serif'],
        script: ['Great Vibes', 'cursive'],
      },
    },
  },
  plugins: [],
}
