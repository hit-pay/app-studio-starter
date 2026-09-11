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

const FAKE_ROLES = [
  { id: 'role-owner', title: 'Owner' },
  { id: 'role-admin', title: 'Admin' },
  { id: 'role-manager', title: 'Manager' },
  { id: 'role-cashier', title: 'Cashier' },
]

const FAKE_MEMBERS = [
  {
    id: 'user-1',
    name: 'Aisha Tan',
    email: 'aisha@example.test',
    role_id: 'role-owner',
    role: FAKE_ROLES[0],
    locations: [
      { id: 'loc-orchard', name: 'Orchard' },
      { id: 'loc-tampines', name: 'Tampines' },
    ],
  },
  {
    id: 'user-2',
    name: 'Ben Lim',
    email: 'ben@example.test',
    role_id: 'role-manager',
    role: FAKE_ROLES[2],
    locations: [{ id: 'loc-orchard', name: 'Orchard' }],
  },
  {
    id: 'user-3',
    name: 'Chloe Ong',
    email: 'chloe@example.test',
    role_id: 'role-cashier',
    role: FAKE_ROLES[3],
    locations: [{ id: 'loc-tampines', name: 'Tampines' }],
  },
  {
    id: 'user-4',
    name: 'Danish Rahman',
    email: 'danish@example.test',
    role_id: 'role-admin',
    role: FAKE_ROLES[1],
    locations: [
      { id: 'loc-orchard', name: 'Orchard' },
      { id: 'loc-tampines', name: 'Tampines' },
    ],
  },
]

const FAKE_USER = {
  id: 'user-1',
  email: 'aisha@example.test',
  name: 'Aisha Tan',
  role: FAKE_ROLES[0],
}

const STUDIO_IDENTITY = /^\/api\/apps\/[^/]+\/(user\/info|roles|staff-app-members)\/?$/

function fakeStudioIdentityBody(pathname: string) {
  const match = pathname.match(STUDIO_IDENTITY)

  if (!match) {
    return null
  }

  if (match[1] === 'roles') {
    return { roles: FAKE_ROLES }
  }

  if (match[1] === 'staff-app-members') {
    return { members: FAKE_MEMBERS }
  }

  return FAKE_USER
}

function fakeStudioIdentityApi(): Plugin {
  const handle = (
    request: { url?: string },
    response: {
      statusCode: number
      setHeader: (name: string, value: string) => void
      end: (body: string) => void
    },
    next: () => void,
  ) => {
    const pathname = request.url?.split('?')[0] ?? ''
    const body = fakeStudioIdentityBody(pathname)

    if (body === null) {
      next()
      return
    }

    response.statusCode = 200
    response.setHeader('Content-Type', 'application/json; charset=utf-8')
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.end(JSON.stringify(body))
  }

  return {
    name: 'fake-studio-identity-api',
    configureServer(server) {
      server.middlewares.use(handle)
    },
    configurePreviewServer(server) {
      server.middlewares.use(handle)
    },
  }
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
  resolve: {
    tsconfigPaths: true,
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    include: [
      'recharts',
      'react',
      'react-dom',
      'lexical',
      '@lexical/list',
      '@lexical/rich-text',
      '@lexical/selection',
    ],
  },
  build: {
    chunkSizeWarningLimit: 2000,
  },
  plugins: [
    fakeStudioIdentityApi(),
    publicOrchidTokens(),
    mdx({ providerImportSource: '@mdx-js/react' }),
    tailwindcss(),
    viteReact(),
  ],
  test: {
    environment: 'jsdom',
    css: false,
    restoreMocks: true,
    passWithNoTests: true,
  },
})
