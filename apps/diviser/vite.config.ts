import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 5000,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
