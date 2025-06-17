import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['antd'],
          motion: ['framer-motion'],
          utils: ['recharts', 'swiper']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  server: {
    host: true,
    port: 5173
  },
  preview: {
    port: 4173,
    host: true
  },
  define: {
    __API_URL__: JSON.stringify(process.env.VITE_API_BASE_URL || '/.netlify/functions/api')
  }
})
