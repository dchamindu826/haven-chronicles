// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // --- මේක තමයි අලුත්, වැදගත්ම කොටස ---
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5173', // Your local dev server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  }
  // ------------------------------------
})