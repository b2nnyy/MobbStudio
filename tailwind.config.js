/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ffffff',
          muted: '#a3a3a3',
        },
        background: {
          DEFAULT: '#0a0a0a',
          secondary: '#141414',
        },
      },
    },
  },
  plugins: [],
}

