import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/TD-react-js-CoderHouse/',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
  },
})