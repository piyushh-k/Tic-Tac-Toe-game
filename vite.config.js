import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Tic-Tac-Toe-game/',
  build: {
    outDir: 'dist',
  },
  server: {
    allowedHosts: [
      '3558-122-161-65-199.ngrok-free.app'
    ]
  }
})

