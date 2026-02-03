/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          cream: '#F8FAFC', // Slightly cooler white/blueish tint for modern look, or keep warm? User said "nature". Let's go warm but clean. #FDFBF7 is nice. Let's stick to a clean white/off-white.
          dark: '#003366', // Deep AKR Blue
          primary: '#00509E', // AKR Blue
          muted: '#64748B',
        },
        accent: {
          energy: '#F59E0B', // Yellow/Orange
          solar: '#10B981',  // Green
          telecom: '#8B5CF6', // Violet/Blue
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
