import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Remplace 'bugdle' par le nom EXACT de ton futur repo GitHub
export default defineConfig({
  plugins: [react()],
  base: '/bugdle/',
})