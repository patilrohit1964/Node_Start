/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#ffffff',
          dark: '#1a1a1a',
        },
        secondary: {
          light: '#f3f4f6',
          dark: '#374151',
        },
        text: {
          light: '#000000',
          dark: '#ffffff',
        }
      },
    },
  },
  plugins: [require("daisyui")],
};
