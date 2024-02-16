import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['js-big-decimal']
  },
  build: {
    chunkSizeWarningLimit: 1600,
  },
  // server: {
  //   hmr: {
  //     protocol: 'ws',
  //     host: 'localhost'
  //   }
  // }
})


