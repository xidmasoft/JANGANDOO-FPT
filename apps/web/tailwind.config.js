/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#005f73', // FPT Institutionnel
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#0a9396',
          foreground: '#ffffff',
        },
        accent: {
          DEFAULT: '#e9d8a6',
          foreground: '#001219',
        },
        background: '#f8f9fa',
        surface: '#ffffff',
        foreground: '#212529',
        muted: '#6c757d',
        border: '#dee2e6',
        success: '#2a9d8f',
        warning: '#e9c46a',
        destructive: '#e76f51',
        info: '#457b9d',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
