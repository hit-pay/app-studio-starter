import { createClient, type Client } from '@libsql/client/http'

import { getConnectors } from '#/lib/server/hitpay'

const clients = new Map<string, Client>()

function tursoHttpUrl(url: string): string {
  return url.replace(/^libsql:/i, 'https:')
}

function envEnding(env: Record<string, string>, suffix: string): string {
  const match = Object.entries(env).find(([key]) => key === suffix || key.endsWith(`_${suffix}`))

  return match?.[1] ?? ''
}

async function requireDb(): Promise<Client> {
  const connectors = await getConnectors()
  const databaseKeys = Object.keys(connectors).filter(
    (key) => key.endsWith('_DATABASE_URL') || key === 'DATABASE_URL',
  )
  const urlKey =
    ['TURSO_DATABASE_URL', 'DATABASE_URL'].find((key) => databaseKeys.includes(key)) ??
    (databaseKeys.length === 1 ? databaseKeys[0] : undefined)

  if (databaseKeys.length > 1 && urlKey === undefined) {
    throw new Error(
      'Multiple database connectors are configured. Set TURSO_DATABASE_URL or DATABASE_URL explicitly.',
    )
  }

  const prefix =
    urlKey === undefined || urlKey === 'DATABASE_URL'
      ? ''
      : urlKey.replace(/_DATABASE_URL$/, '')
  const url = urlKey === undefined ? '' : connectors[urlKey] ?? ''
  const authToken =
    prefix === '' ? envEnding(connectors, 'AUTH_TOKEN') : (connectors[`${prefix}_AUTH_TOKEN`] ?? '')

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

/** Lazy Turso client — credentials from X-App-Studio-Connectors, not Sprite service env. */
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
