import { getRequest } from '@tanstack/react-start/server'

type Statement = { sql: string; args?: unknown[] }
type Result = { columns: string[]; rows: unknown[][] }
const tokenByRequest = new WeakMap<Request, Promise<string>>()

async function appToken(): Promise<string> {
  const request = getRequest()
  const cached = tokenByRequest.get(request)
  if (cached) return cached

  const pending = (async () => {
    const appId = process.env.APP_STUDIO_APP_ID?.trim()
    if (!appId) throw new Error('APP_STUDIO_APP_ID is not configured.')
    const response = await fetch(
      new URL(`/api/apps/${encodeURIComponent(appId)}/current-user`, request.url),
      { headers: { accept: 'application/json' } },
    )
    const body = await response.json() as { appToken?: unknown }
    if (!response.ok || typeof body.appToken !== 'string') {
      throw new Error('Unable to authorize the App Studio proxy request.')
    }
    return body.appToken
  })()
  tokenByRequest.set(request, pending)
  return pending
}

async function proxy(operation: 'query' | 'batch' | 'migrations', body: unknown): Promise<any> {
  const request = getRequest()
  const appId = process.env.APP_STUDIO_APP_ID?.trim()
  if (!appId) throw new Error('APP_STUDIO_APP_ID is not configured.')
  const token = await appToken()

  const response = await fetch(
    new URL(`/api/apps/${encodeURIComponent(appId)}/integrations/turso/${operation}`, request.url),
    {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    },
  )
  if (!response.ok) throw new Error(`Turso proxy returned HTTP ${response.status}.`)
  return response.json()
}

type Db = {
  execute(statement: string | Statement): Promise<Result>
  batch(statements: Statement[]): Promise<unknown>
  executeMultiple(sql: string): Promise<unknown>
}

/** Turso client facade backed by the latest App Studio proxy. */
export const db: Db = {
  execute(statement) {
    const value = typeof statement === 'string' ? { sql: statement, args: [] } : statement
    return proxy('query', value).then((body) => body.results?.[0] ?? { columns: [], rows: [] })
  },
  batch(statements) {
    return proxy('batch', { operations: statements })
  },
  executeMultiple(sql) {
    return proxy('migrations', { name: 'runtime', statements: sql.split(';').map((item) => item.trim()).filter(Boolean) })
  },
}
