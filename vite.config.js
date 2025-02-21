import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Tic-Tac-Toe-game/', // Set this to match your GitHub repository path
  server: {
    allowedHosts: [
      '3558-122-161-65-199.ngrok-free.app'
    ]
  }
})

