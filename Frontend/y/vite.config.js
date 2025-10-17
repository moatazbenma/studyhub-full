import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
    build: {
    cssMinify: 'esbuild' // Force Vite to use esbuild instead of lightningcss
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    allowedHosts: [
      '322bd694d365.ngrok-free.app'
    ]
  },
  css: {
    transformer: 'postcss'
  }
})
