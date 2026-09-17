import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function studioAppId(): string {
  if (typeof window !== 'undefined') {
    const fromPath = window.location.pathname.split('/').filter(Boolean)[0]

    if (fromPath && fromPath !== 'api') return fromPath
  }

  const fromEnv =
    (typeof process !== 'undefined' ? process.env.APP_STUDIO_APP_ID : undefined)?.trim() ||
    String(import.meta.env.APP_STUDIO_APP_ID ?? '').trim()

  return fromEnv || 'local'
}

/** Prefix localStorage keys per app. Hosts share origin; keys must not collide. */
export function storageKey(suffix: string): string {
  const part = suffix.replace(/^:+/, '')

  if (!part) {
    throw new Error('Storage key suffix is required.')
  }

  return `app-studio:${studioAppId()}:${part}`
}
