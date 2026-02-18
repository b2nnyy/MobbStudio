import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages-friendly asset paths (works for /<repo>/ and custom domains).
  // Override for project pages with e.g. `VITE_BASE_PATH=/your-repo/ npm run build`
  base: process.env.VITE_BASE_PATH ?? './',
  plugins: [react()],
})
