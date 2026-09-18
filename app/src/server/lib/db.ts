import { createClient, type Client, type Row } from '@libsql/client'
import { isTransactionControl, splitSqlStatements } from '#/server/lib/sql-statements'

type Statement = { sql: string; args?: unknown[] }
/** `rows[i]` supports both array index and column-name access (libsql `Row`). */
type Result = { columns: string[]; rows: Row[] }

let cachedClient: Client | undefined

/**
 * TURSO_DATABASE_URL / TURSO_AUTH_TOKEN are baked into the sprite's process env
 * at setup time (they never change for the app's lifetime), so this connects
 * directly instead of proxying every query through the App Studio platform.
 */
function turso(): Client {
  if (cachedClient) return cachedClient

  const url = process.env.TURSO_DATABASE_URL?.trim()
  const authToken = process.env.TURSO_AUTH_TOKEN?.trim()

  if (!url || !authToken) {
    throw new Error('TURSO_DATABASE_URL / TURSO_AUTH_TOKEN are not configured.')
  }

  cachedClient = createClient({ url, authToken })
  return cachedClient
}

type Db = {
  execute(statement: string | Statement): Promise<Result>
  batch(statements: Statement[]): Promise<unknown>
  executeMultiple(sql: string | string[]): Promise<unknown>
}

const rawDb: Db = {
  async execute(statement) {
    const { sql, args = [] } = typeof statement === 'string' ? { sql: statement, args: [] } : statement
    const result = await turso().execute({ sql, args: args as any })
    return { columns: result.columns, rows: result.rows }
  },
  batch(statements) {
    return turso().batch(statements.map(({ sql, args = [] }) => ({ sql, args: args as any })), 'write')
  },
  executeMultiple(sql) {
    const statements = (Array.isArray(sql) ? sql : splitSqlStatements(sql))
      .map((item) => item.trim())
      .filter((item) => item && !isTransactionControl(item))
    if (statements.length === 0) return Promise.resolve(undefined)
    return turso().migrate(statements.map((item) => ({ sql: item, args: [] })))
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
