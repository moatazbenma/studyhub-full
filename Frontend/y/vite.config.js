import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// ✅ Correct Tailwind setup (uses PostCSS, not @tailwindcss/vite)
export default defineConfig({
  plugins: [react()],
  build: {
    cssMinify: 'esbuild', // avoids lightningcss issue
    outDir: 'dist'
  },
  css: {
    // Tailwind runs through PostCSS automatically
    postcss: './postcss.config.js'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    allowedHosts: [
      '322bd694d365.ngrok-free.app'
    ]
  }
})
