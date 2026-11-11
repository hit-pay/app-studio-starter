import { createClient, type Client, type Row } from '@libsql/client'

type Statement = { sql: string; args?: unknown[] }
/** `rows[i]` supports both array index and column-name access (libsql `Row`). */
type Result = { columns: string[]; rows: Row[] }

function isTransactionControl(sql: string): boolean {
  return /^(BEGIN|COMMIT|ROLLBACK|END)(\s+|$)/i.test(sql.trim())
}

/** Split SQL on `;` outside quotes and comments. */
function splitSqlStatements(sql: string): string[] {
  const statements: string[] = []
  let buffer = ''
  let quote: "'" | '"' | '`' | null = null
  let i = 0

  while (i < sql.length) {
    const char = sql[i]
    const next = sql[i + 1]

    if (quote) {
      buffer += char
      if (char === quote) {
        if (quote === "'" && next === "'") {
          buffer += next
          i += 2
          continue
        }
        quote = null
      }
      i += 1
      continue
    }

    if (char === '-' && next === '-') {
      i += 2
      while (i < sql.length && sql[i] !== '\n') i += 1
      continue
    }

    if (char === '/' && next === '*') {
      i += 2
      while (i < sql.length && !(sql[i] === '*' && sql[i + 1] === '/')) i += 1
      i += 2
      continue
    }

    if (char === "'" || char === '"' || char === '`') {
      quote = char
      buffer += char
      i += 1
      continue
    }

    if (char === ';') {
      const statement = buffer.trim()
      if (statement) statements.push(statement)
      buffer = ''
      i += 1
      continue
    }

    buffer += char
    i += 1
  }

  const tail = buffer.trim()
  if (tail) statements.push(tail)
  return statements
}

let cachedClient: Client | undefined

/**
 * TURSO_DATABASE_URL / TURSO_AUTH_TOKEN are baked into the sprite's process env
 * at setup time (they never change for the app's lifetime), so this connects
 * directly instead of proxying every query through the Studio platform.
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

/** Runs SQL without applying migrations first (used while applying schema). */
const schemaDb: Db = {
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

/** Migration file name to its SQL. */
export type Migrations = Record<string, string>

/**
 * The files in migrations/, bundled at build time. The app cannot read its own files at runtime
 * on the shared runtime, so the SQL ships inside the server bundle.
 */
function bundledMigrations(): Migrations {
  const modules = import.meta.glob<string>('/migrations/*.sql', { query: '?raw', import: 'default', eager: true })

  return Object.fromEntries(
    Object.entries(modules).map(([path, sql]) => [path.slice(path.lastIndexOf('/') + 1), sql]),
  )
}

let migrationPromise: Promise<void> | undefined

/** Apply pending files in migrations/ once per process. Safe to call on every request. */
export async function ensureMigrations(migrations: () => Migrations = bundledMigrations): Promise<void> {
  const pending = (migrationPromise ??= applyPendingMigrations(migrations()))

  try {
    await pending
  } catch (error) {
    if (migrationPromise === pending) migrationPromise = undefined
    throw error
  }
}

async function applyPendingMigrations(migrations: Migrations): Promise<void> {
  await schemaDb.execute(`
    CREATE TABLE IF NOT EXISTS _migrations (
      name TEXT PRIMARY KEY,
      applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `)

  const applied = new Set(
    (await schemaDb.execute('SELECT name FROM _migrations')).rows.map((row) => String(row.name)),
  )

  for (const file of Object.keys(migrations).sort()) {
    if (applied.has(file)) continue
    const sql = migrations[file]!.trim()
    if (sql === '') continue

    const statements = splitSqlStatements(sql).filter((item) => !isTransactionControl(item))
    const migrationName = file.replaceAll("'", "''")
    await schemaDb.executeMultiple([
      ...statements,
      `INSERT INTO _migrations (name) VALUES ('${migrationName}')`,
    ])
  }
}

async function withMigrations<T>(run: () => Promise<T>): Promise<T> {
  await ensureMigrations()
  return run()
}

/** Turso client facade. Query/batch apply pending `migrations/` first. */
export const db: Db = {
  execute(statement) {
    return withMigrations(() => schemaDb.execute(statement))
  },
  batch(statements) {
    return withMigrations(() => schemaDb.batch(statements))
  },
  executeMultiple(sql) {
    return withMigrations(() => schemaDb.executeMultiple(sql))
  },
}
