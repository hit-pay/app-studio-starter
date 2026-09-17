import { appApiUrl, getAppToken } from '#/server/lib/app-token'
import { isTransactionControl, splitSqlStatements } from '#/server/lib/sql-statements'

type Statement = { sql: string; args?: unknown[] }
type Result = { columns: string[]; rows: unknown[][] }

async function proxy(operation: 'query' | 'batch' | 'migrations', body: unknown): Promise<any> {
  const token = await getAppToken()

  const response = await fetch(
    appApiUrl(`/integrations/turso/${operation}`),
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
  if (!response.ok) {
    const detail = (await response.text()).trim().slice(0, 400)
    throw new Error(
      `Turso proxy returned HTTP ${response.status}${detail ? `: ${detail}` : '.'}`,
    )
  }
  return response.json()
}

type Db = {
  execute(statement: string | Statement): Promise<Result>
  batch(statements: Statement[]): Promise<unknown>
  executeMultiple(sql: string | string[]): Promise<unknown>
}

const rawDb: Db = {
  execute(statement) {
    const value = typeof statement === 'string' ? { sql: statement, args: [] } : statement
    return proxy('query', value).then((body) => body.results?.[0] ?? { columns: [], rows: [] })
  },
  batch(statements) {
    return proxy('batch', { operations: statements })
  },
  executeMultiple(sql) {
    const statements = (Array.isArray(sql) ? sql : splitSqlStatements(sql))
      .map((item) => item.trim())
      .filter((item) => item && !isTransactionControl(item))
    if (statements.length === 0) return Promise.resolve(undefined)
    return proxy('migrations', { name: 'runtime', statements })
  },
}

async function withMigrations<T>(run: () => Promise<T>): Promise<T> {
  const { ensureMigrations } = await import('#/server/lib/migrate')
  await ensureMigrations()
  return run()
}

/** Used by migrate.ts so applying schema does not recurse into ensureMigrations. */
export const schemaDb: Db = rawDb

/** Turso client facade. Query/batch apply pending `migrations/` first. */
export const db: Db = {
  execute(statement) {
    return withMigrations(() => rawDb.execute(statement))
  },
  batch(statements) {
    return withMigrations(() => rawDb.batch(statements))
  },
  executeMultiple(sql) {
    return withMigrations(() => rawDb.executeMultiple(sql))
  },
}
