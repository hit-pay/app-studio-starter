import { createClient, type Client } from '@libsql/client/http'

import { getHitPayEnv } from '#/lib/hitpay-env'

const clients = new Map<string, Client>()

function tursoHttpUrl(url: string): string {
  return url.replace(/^libsql:/i, 'https:')
}

async function requireDb(): Promise<Client> {
  const env = await getHitPayEnv()
  const url = env.TURSO_DATABASE_URL
  const authToken = env.TURSO_AUTH_TOKEN

  if (!url || !authToken) {
    throw new Error('Turso is not configured for this app.')
  }

  const key = `${url}\0${authToken}`
  const existing = clients.get(key)

  if (existing) {
    return existing
  }

  // HTTP Hrana only. The default Node client uses native libsql / WebSocket
  // and fails with ConnectionRefused on the sprite allowlist.
  const client = createClient({ url: tursoHttpUrl(url), authToken })
  clients.set(key, client)

  return client
}

type Db = Pick<Client, 'execute' | 'batch' | 'executeMultiple'>

/** Lazy Turso client — credentials from X-HitPay-Env / proxy, not Sprite service env. */
export const db: Db = {
  execute(...args) {
    return requireDb().then((client) => client.execute(...args))
  },
  batch(...args) {
    return requireDb().then((client) => client.batch(...args))
  },
  executeMultiple(...args) {
    return requireDb().then((client) => client.executeMultiple(...args))
  },
}
