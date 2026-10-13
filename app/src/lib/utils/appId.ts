/** `APP_STUDIO_APP_ID`, baked in at build time and set on the server process. */
export function studioAppId(): string {
  const fromEnv =
    (typeof process !== 'undefined' ? process.env.APP_STUDIO_APP_ID : undefined)?.trim() ||
    String(import.meta.env.APP_STUDIO_APP_ID ?? '').trim()

  return fromEnv || 'local'
}
