/** A setting the App Studio host gives the app. Throws when it is missing, so a misconfiguration shows at once. */
export function env(name: 'APP_STUDIO_APP_ID' | 'APP_STUDIO_APP_SECRET' | 'APP_STUDIO_PROXY_URL' | 'TURSO_DATABASE_URL' | 'TURSO_AUTH_TOKEN' | 'APP_STUDIO_USER_TOKEN'): string {
  const value = process.env[name]?.trim()
  if (!value) throw new Error(`${name} is not configured.`)
  return value
}
