import { createClient, type Client } from '@libsql/client/http'

let client: Client | undefined

function tursoHttpUrl(url: string): string {
  return url.replace(/^libsql:/i, 'https:')
}

function requireDb(): Client {
  if (!client) {
    const url = process.env.TURSO_DATABASE_URL
    const authToken = process.env.TURSO_AUTH_TOKEN

    if (!url || !authToken) {
      throw new Error('Turso is not configured for this app.')
    }

    // HTTP Hrana only. The default Node client uses native libsql / WebSocket
    // and fails with ConnectionRefused on the sprite allowlist.
    client = createClient({ url: tursoHttpUrl(url), authToken })
  }

  return client
}

type Db = Pick<Client, 'execute' | 'batch' | 'executeMultiple'>

/** Lazy Turso client — throws on query, not on import. */
export const db: Db = {
  execute(...args) {
    return requireDb().execute(...args)
  },
  batch(...args) {
    return requireDb().batch(...args)
  },
  executeMultiple(...args) {
    return requireDb().executeMultiple(...args)
  },
}
