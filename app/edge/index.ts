// Entry point of the bundle that Supabase Edge Runtime runs for a published app.
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

const contentTypes: Record<string, string> = {
  css: 'text/css; charset=utf-8',
  ico: 'image/x-icon',
  js: 'text/javascript; charset=utf-8',
  json: 'application/json',
  png: 'image/png',
  svg: 'image/svg+xml',
  txt: 'text/plain; charset=utf-8',
  webp: 'image/webp',
  woff2: 'font/woff2',
}
const staticRoot = new URL('./static/', import.meta.url)

async function serveStatic(pathname: string): Promise<Response | null> {
  if (pathname === '/' || pathname.includes('..') || pathname.endsWith('/')) {
    return null
  }

  try {
    const body = await Deno.readFile(new URL(`.${pathname}`, staticRoot))
    const extension = pathname.split('.').pop() ?? ''
    const immutable = pathname.startsWith('/assets/')

    return new Response(body, {
      headers: {
        'cache-control': immutable ? 'public, max-age=31536000, immutable' : 'public, max-age=300',
        'content-type': contentTypes[extension] ?? 'application/octet-stream',
      },
    })
  } catch {
    return null
  }
}

Deno.serve(async (request) => {
  const { pathname } = new URL(request.url)

  return (await serveStatic(pathname)) ?? app.fetch(request)
})
