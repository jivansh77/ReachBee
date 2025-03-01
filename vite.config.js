import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['fs', 'https', 'zlib', 'crypto', 'twitter-api-v2']
  },
  build: {
    rollupOptions: {
      external: ['fs', 'https', 'zlib', 'crypto']
    }
  },
  ssr: {
    noExternal: ['twitter-api-v2']
  }
})