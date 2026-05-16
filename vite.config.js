import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        }
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://agency-ai-ruby-two.vercel.app', // ✅ Updated URL
        changeOrigin: true,
      }
    }
  }
});

// For more configuration options, see https://vitejs.dev/config/