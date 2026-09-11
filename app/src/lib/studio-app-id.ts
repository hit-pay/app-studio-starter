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

export function studioStorageKey(suffix: string): string {
  const part = suffix.replace(/^:+/, '')

  if (!part) {
    throw new Error('Storage key suffix is required.')
  }

  return `app-studio:${studioAppId()}:${part}`
}
