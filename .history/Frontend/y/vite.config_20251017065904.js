import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
    build: {
    cssMinify: 'esbuild' // or remove this line to use default
  },
  server: {
    allowedHosts: [
      '322bd694d365.ngrok-free.app'
    ]
  },
})
