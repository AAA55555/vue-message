/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'blue-400': '#5181B8',
        'blue-420': '#4A76A8',
        'blue-600': '#2A5885',
        'blue-640': '#224B7A',
        'blue-800': '#1D3A5C',
        'blue-bright': '#5C9CE6',
        'gray-400': '#939393',
        'gray-600': '#656565',
        'gray-700': '#555555',
        'gray-800': '#333333',
        'gray-900': '#222222',
        'gray-950': '#141414',
        'gray-960': '#0A0A0A',
        white: '#ffffff',
        red: '#E64646',
        'red-light': '#FFD6CC',
        green: '#4BB34B'
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
      }
    },
    fontFamily: {
      sans: ['Roboto', 'Helvetica', 'Arial', 'sans-serif']
    }
  },
  plugins: []
}
