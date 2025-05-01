/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'brand': {
          'primary': '#5D3FD3',
          'light': '#7B62EB',
          'dark': '#4F33B0',
          'bg': '#F5F5F7',
          'text': '#1E1E1E',
          'cta': '#00BFA6',
          'cta-dark': '#00AB95',
        },
        'score': {
          'poor': '#EF4444',
          'average': '#F59E0B',
          'good': '#10B981',
        },
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
  safelist: [
    'text-white',
    'text-black',
    'bg-white',
    'bg-black'
  ]
}; 