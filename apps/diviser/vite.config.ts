
import { defineConfig, optimizeDeps } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from 'path'

// plugins: [svelte()],
export default defineConfig({
  resolve: {
		alias: {
			'@': resolve('/src')
		}
	},
	optimizeDeps: {
		exclude: ['@urql/svelte']
	},
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
