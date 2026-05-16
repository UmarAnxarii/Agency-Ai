import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {  // ✅ Function instead of object
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://agency-ai-ruby-two.vercel.app',
        changeOrigin: true,
      }
    }
  }
});