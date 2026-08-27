import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { hitpayPreviewPayload } from './scripts/hitpay-preview-mock.mjs'

// Local / agent screenshots only. Not the HitPay iframe.
// Production stays on start.mjs (/{appId}/ behind the proxy).
process.env.HOST = '127.0.0.1'
process.env.NITRO_HOST = '127.0.0.1'
process.env.PORT ??= '3010'

const appId = process.env.APP_STUDIO_APP_ID?.trim()
const prefix = appId ? `/${appId}` : ''
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

function withAppPrefix(pathname) {
  if (!prefix) return pathname
  if (pathname.startsWith('/api/')) return pathname
  if (pathname === prefix || pathname.startsWith(`${prefix}/`)) return pathname
  if (pathname === '/') return `${prefix}/`
  return `${prefix}${pathname}`
}

const serve = Bun.serve.bind(Bun)
Bun.serve = (options) =>
  serve({
    ...options,
    hostname: '127.0.0.1',
    fetch(request, server) {
      const url = new URL(request.url)
      const mock = hitpayPreviewPayload(url.pathname)

      if (mock) {
        return Response.json(mock)
      }

      url.pathname = withAppPrefix(url.pathname)

      return options.fetch(new Request(url, request), server)
    },
  })

await import('./.output/server/index.mjs')
