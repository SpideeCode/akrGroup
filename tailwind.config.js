/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          cream: '#FCFAF7',
          dark: '#1A1A1A',
          muted: '#808080',
        },
        accent: {
          energy: '#FF4D00', // Un orange vibrant pour l'énergie
          solar: '#FFB800',  // Un jaune solaire
          telecom: '#0066FF', // Un bleu technologique
        }
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      borderWidth: {
        '3': '3px',
      }
    },
  },
  plugins: [],
};
