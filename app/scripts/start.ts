// The preview server (`bun run start`, port 3000): the same shape as the published app. /api goes to the backend's
// routes, built frontend files are served as they are, and every other page gets index.html (the SPA). Runs with
// --hot, so a backend change applies at once; a frontend change applies after `bun run build`.
import { join, normalize } from 'node:path'

import { routes } from '../backend/src/index.ts'

const root = join(import.meta.dir, '..')
const dist = join(root, 'frontend/dist')
const registry = join(root, 'public/r')

async function file(dir: string, pathname: string): Promise<Response | null> {
  const path = normalize(join(dir, decodeURIComponent(pathname)))
  if (!path.startsWith(dir + '/')) return null
  const found = Bun.file(path)

  return (await found.exists()) ? new Response(found) : null
}

Bun.serve({
  port: Number(process.env.PORT ?? 3000),
  hostname: process.env.HOST ?? '0.0.0.0',
  routes,
  async fetch(request) {
    const { pathname } = new URL(request.url)

    // The Orchid UI registry, which `npx shadcn add @orchid/<slug>` installs from.
    if (pathname.startsWith('/r/')) return (await file(registry, pathname.slice(3))) ?? new Response('Not found', { status: 404 })
    if (request.method !== 'GET' && request.method !== 'HEAD') return new Response('Not found', { status: 404 })

    const asset = pathname === '/' ? null : await file(dist, pathname)
    if (asset) return asset

    return (await file(dist, '/index.html')) ?? new Response('The app is being built. Refresh in a moment.', { status: 503 })
  },
})

console.log(`Preview on http://localhost:${process.env.PORT ?? 3000}`)
