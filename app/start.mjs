import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

process.env.HOST ??= '0.0.0.0'
process.env.NITRO_HOST ??= process.env.HOST

const appRoot = dirname(fileURLToPath(import.meta.url))
const appId = process.env.APP_STUDIO_APP_ID?.trim() ?? ''
const registryPrefixes = appId ? [`/${appId}/r/`, '/r/'] : ['/r/']
const registryRoots = [
  resolve(appRoot, 'public/r'),
  resolve(appRoot, '.output/public/r'),
]
const ssrEntry = pathToFileURL(
  resolve(appRoot, '.nitro/vite/services/ssr/server.js'),
).href

let ssr

const originalFetch = globalThis.fetch
globalThis.fetch = function nitroViteFetch(input, init) {
  const viteEnv = init?.viteEnv ?? input?.viteEnv

  if (viteEnv !== 'ssr') {
    return originalFetch(input, init)
  }

  const request = input instanceof Request ? input : new Request(input, init)

  ssr ??= import(ssrEntry).then((mod) => mod.default ?? mod)

  return ssr.then((entry) => entry.fetch(request))
}

async function serveOrchidRegistry(request) {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return null
  }

  const pathname = new URL(request.url).pathname
  const prefix = registryPrefixes.find((item) => pathname.startsWith(item))
  if (!prefix) {
    return null
  }

  const name = pathname.slice(prefix.length)
  if (!name || name.includes('..') || name.includes('/') || !name.endsWith('.json')) {
    return null
  }

  for (const root of registryRoots) {
    const file = Bun.file(resolve(root, name))
    if (await file.exists()) {
      return new Response(file, {
        headers: { 'content-type': 'application/json; charset=utf-8' },
      })
    }
  }

  return null
}

const serve = Bun.serve.bind(Bun)
Bun.serve = (options) =>
  serve({
    ...options,
    hostname: options.hostname || '0.0.0.0',
    fetch: async (request, server) => {
      const registry = await serveOrchidRegistry(request)
      if (registry) {
        return registry
      }

      return options.fetch(request, server)
    },
  })

await import(pathToFileURL(resolve(appRoot, '.output/server/index.mjs')).href)
