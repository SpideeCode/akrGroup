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
          energy: '#2563EB', // Bleu Royal plus clair
          solar: '#38BDF8',  // Bleu Ciel
          telecom: '#60A5FA', // Bleu Doux
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
