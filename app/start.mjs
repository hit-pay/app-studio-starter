import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

process.env.HOST ??= '0.0.0.0'
process.env.NITRO_HOST ??= process.env.HOST

const appRoot = dirname(fileURLToPath(import.meta.url))
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

const serve = Bun.serve.bind(Bun)
Bun.serve = (options) =>
  serve({
    ...options,
    hostname: options.hostname || '0.0.0.0',
  })

await import(pathToFileURL(resolve(appRoot, '.output/server/index.mjs')).href)
