import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Set base path if deploying to a subdirectory
  // e.g., base: '/presentation-app/' for https://example.com/presentation-app/
  // Use './' for relative paths (works anywhere)
  base: './',
})

