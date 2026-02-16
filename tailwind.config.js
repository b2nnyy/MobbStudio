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
          DEFAULT: '#111827', // main text color (near-black)
          muted: '#6b7280',
          accent: '#dc2626', // brand red
        },
        background: {
          DEFAULT: '#ffffff',
          secondary: '#f3f4f6',
        },
      },
    },
  },
  plugins: [],
}


