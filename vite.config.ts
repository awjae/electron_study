import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  optimizeDeps: {
    exclude: ['main.js'],
  },
  build: {
    outDir: 'build',
    // rollupOptions: {
    //   output: {
    //     format: 'cjs'
    //   }
    // }
  },
  /*server: {
    host: '10.80.17.120',
    proxy: {
      '/api': {
        target: 'http://172.27.2.222:8080/',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
        ws: true
      }
    }
  }*/
})
