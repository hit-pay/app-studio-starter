import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

process.env.HOST ??= '0.0.0.0'
process.env.NITRO_HOST ??= process.env.HOST

const appId = process.env.APP_STUDIO_APP_ID?.trim()
const assetPrefix = appId ? `/${appId}/assets/` : null
const ssrEntry = pathToFileURL(
  resolve('.nitro/vite/services/ssr/server.js'),
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
    fetch(request, server) {
      const handle = (req) => options.fetch(req, server)

      if (!assetPrefix || !new URL(request.url).pathname.startsWith(assetPrefix)) {
        return handle(request)
      }

      // Nitro 3 + baseURL serves /{appId}/assets/* as-is. Older output
      // expected /assets/* (prefix stripped). Try the request first.
      return Promise.resolve(handle(request)).then((response) => {
        if (response.status !== 404) {
          return response
        }

        const url = new URL(request.url)
        url.pathname = url.pathname.slice(`/${appId}`.length)

        return handle(new Request(url, request))
      })
    },
  })

await import('./.output/server/index.mjs')
