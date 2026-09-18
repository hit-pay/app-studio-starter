import { getRequest } from '@tanstack/react-start/server'

export function proxyUrl(path: string): URL {
  const origin = process.env.APP_STUDIO_PROXY_URL?.trim()

  if (!origin) {
    throw new Error('APP_STUDIO_PROXY_URL is not configured.')
  }

  return new URL(path, `${origin}/`)
}
