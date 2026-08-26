import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vitest/config'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  resolve: { tsconfigPaths: true },
  build: {
    chunkSizeWarningLimit: 2000,
  },
  plugins: [tailwindcss(), viteReact()],
  test: {
    environment: 'jsdom',
    css: false,
    restoreMocks: true,
    passWithNoTests: true,
  },
})
