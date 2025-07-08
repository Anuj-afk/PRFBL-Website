// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        zoomIn: {
          "0%": {}
        },
      },
      transform: {
        'rotate-y-180': 'rotateY(180deg)',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.rotate-y-180': {
          transform: 'rotateY(180deg)',
        },
        '.-rotate-y-180': {
          transform: 'rotateY(-180deg)',
        },
      });
    },
  ],
}
