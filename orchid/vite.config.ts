import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'
import { defineConfig } from 'vitest/config'
import viteReact from '@vitejs/plugin-react'
import type { Plugin } from 'vite'

const orchidStylesPath = fileURLToPath(new URL('./src/styles.css', import.meta.url))
const orchidTokensMarker = '@custom-variant dark'

function readOrchidTokens() {
  const styles = readFileSync(orchidStylesPath, 'utf8')
  const tokenStart = styles.indexOf(orchidTokensMarker)

  if (tokenStart === -1) {
    throw new Error(`Could not find "${orchidTokensMarker}" in src/styles.css`)
  }

  return styles.slice(tokenStart)
}

function publicOrchidTokens(): Plugin {
  return {
    name: 'public-orchid-tokens',
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        if (request.url?.split('?')[0] !== '/orchid-tokens.css') {
          next()
          return
        }

        response.statusCode = 200
        response.setHeader('Content-Type', 'text/css; charset=utf-8')
        response.setHeader('Access-Control-Allow-Origin', '*')
        response.end(readOrchidTokens())
      })
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'orchid-tokens.css',
        source: readOrchidTokens(),
      })
    },
  }
}

export default defineConfig({
  resolve: { tsconfigPaths: true },
  build: {
    chunkSizeWarningLimit: 2000,
  },
  plugins: [publicOrchidTokens(), mdx(), tailwindcss(), viteReact()],
  test: {
    environment: 'jsdom',
    css: false,
    restoreMocks: true,
    passWithNoTests: true,
  },
})
