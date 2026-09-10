import { createClient, type Client } from '@libsql/client/http'

import { getHitPayEnv } from '#/lib/server/hitpay'

const clients = new Map<string, Client>()

function tursoHttpUrl(url: string): string {
  return url.replace(/^libsql:/i, 'https:')
}

function envEnding(env: Record<string, string>, suffix: string): string {
  const match = Object.entries(env).find(([key]) => key === suffix || key.endsWith(`_${suffix}`))

  return match?.[1] ?? ''
}

async function requireDb(): Promise<Client> {
  const env = await getHitPayEnv()
  const urlKey = Object.keys(env).find((key) => key.endsWith('_DATABASE_URL') || key === 'DATABASE_URL')
  const prefix = urlKey?.replace(/_DATABASE_URL$/, '') ?? ''
  const url = urlKey === undefined ? '' : env[urlKey] ?? ''
  const authToken = prefix === '' ? envEnding(env, 'AUTH_TOKEN') : (env[`${prefix}_AUTH_TOKEN`] ?? '')

  if (!url || !authToken) {
    throw new Error('Database is not configured for this app.')
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

/** Lazy Turso client — credentials from X-HitPay-Env, not Sprite service env. */
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
