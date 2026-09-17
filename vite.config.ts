import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Inline assets smaller than 4 KB as base64 to reduce requests
    assetsInlineLimit: 4096,
  },
})
