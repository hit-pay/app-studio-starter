// Entry point of the bundle the App Studio runtime (Bun + QuickJS) runs for a published app.
// The runtime serves static/ itself, so this module only exports the app's fetch handler.
import './polyfill.ts'
import ssrModule from './.nitro/vite/services/ssr/server.js'
import handler from './.output/server/index.mjs'

type FetchHandler = { fetch: (request: Request) => Response | Promise<Response> }

const ssr = ((ssrModule as { default?: FetchHandler }).default ?? ssrModule) as FetchHandler
const app = handler as unknown as FetchHandler
const originalFetch = globalThis.fetch

// Same hand-off as start.mjs: Nitro reaches the SSR bundle through a fetch tagged viteEnv: 'ssr'.
globalThis.fetch = ((input: RequestInfo | URL, init?: RequestInit & { viteEnv?: string }) => {
  const viteEnv = init?.viteEnv ?? (input as { viteEnv?: string } | undefined)?.viteEnv

  if (viteEnv !== 'ssr') {
    return originalFetch(input, init)
  }

  const request = input instanceof Request ? input : new Request(input, init)

  return Promise.resolve(ssr.fetch(request))
}) as typeof fetch

export default {
  fetch: (request: Request) => app.fetch(request),
}
