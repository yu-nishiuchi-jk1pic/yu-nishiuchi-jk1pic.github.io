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
          DEFAULT: '#003366', // JEOLのイメージカラーに近い紺色
          light: '#004488',
          dark: '#002244',
        },
        secondary: {
          DEFAULT: '#0066cc', // SAAFウェブサイトのカラーに近い青色
          light: '#0088ff',
          dark: '#004499',
        },
        accent: {
          DEFAULT: '#ff9900', // アクセントカラー（オレンジ）
          light: '#ffaa33',
          dark: '#ee8800',
        },
        background: {
          light: '#f8f9fa',
          DEFAULT: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans JP', 'sans-serif'],
        heading: ['Noto Sans JP', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
