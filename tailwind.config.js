/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mallow-pink': '#FCE7F3',
        'mallow-blue': '#E0F2FE',
        'mallow-cream': '#FEF3C7',
        'mallow-bg': '#FDFBF7',
        'mallow-text': '#374151'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
