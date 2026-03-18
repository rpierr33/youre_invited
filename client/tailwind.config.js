/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A96E',
          light: '#E8D5B0',
          dark: '#8B5E3C',
        },
        navy: {
          DEFAULT: '#1B3A4B',
          light: '#2A5A6E',
          dark: '#0F2530',
        },
        charcoal: '#2C2C2C',
        'warm-gray': '#8A8580',
        'light-warm': '#F9F7F4',
        border: '#E8E6E3',
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
