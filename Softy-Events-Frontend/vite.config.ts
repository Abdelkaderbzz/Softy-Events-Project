import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
      '@src': path.resolve(__dirname, './src'),
      '@utils': path.resolve(__dirname, './utils'),
      '@hook': path.resolve(__dirname, './src/hook'),
      '@store': path.resolve(__dirname, './src/store'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@layout': path.resolve(__dirname, './src/layout'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@context': path.resolve(__dirname, './src/context'),
      '@features': path.resolve(__dirname, './src/features'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '^/users': {
        target: 'http://localhost:3007/',
      },
    },
  },
})
