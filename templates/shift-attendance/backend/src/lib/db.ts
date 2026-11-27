import { createClient, type Client, type InArgs, type Row } from '@libsql/client/web'

import { migrations } from '../migrations.gen.ts'
import { env } from './env.ts'

export type Statement = { sql: string; args?: InArgs }
/** `rows[i]` supports both index and column-name access. */
export type Result = { columns: string[]; rows: Row[] }

let client: Client | undefined

// The app's own Turso database. The credentials never change for the app's lifetime.
function turso(): Client {
  client ??= createClient({ url: env('TURSO_DATABASE_URL'), authToken: env('TURSO_AUTH_TOKEN') })
  return client
}

let migrated: Promise<void> | undefined

/** Applies the files in backend/migrations/ that have not run yet. Runs once per process. */
export async function ensureMigrations(): Promise<void> {
  const pending = (migrated ??= applyPending())

  try {
    await pending
  } catch (error) {
    if (migrated === pending) migrated = undefined
    throw error
  }
}

async function applyPending(): Promise<void> {
  await turso().execute(`CREATE TABLE IF NOT EXISTS _migrations (
    name TEXT PRIMARY KEY,
    applied_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`)
  const applied = new Set((await turso().execute('SELECT name FROM _migrations')).rows.map((row) => String(row.name)))

  for (const [name, sql] of Object.entries(migrations).sort(([a], [b]) => a.localeCompare(b))) {
    if (applied.has(name)) continue
    const statements = splitStatements(sql).filter((statement) => !/^(BEGIN|COMMIT|ROLLBACK|END)\b/i.test(statement))
    await turso().migrate([
      ...statements.map((statement) => ({ sql: statement, args: [] })),
      { sql: 'INSERT INTO _migrations (name) VALUES (?)', args: [name] },
    ])
  }
}

/** The app's database. Every call applies pending migrations first. */
export const db = {
  async execute(statement: string | Statement): Promise<Result> {
    await ensureMigrations()
    const { columns, rows } = await turso().execute(typeof statement === 'string' ? { sql: statement, args: [] } : { sql: statement.sql, args: statement.args ?? [] })
    return { columns, rows }
  },

  /** Several statements in one transaction: all apply, or none. */
  async batch(statements: Statement[]): Promise<Result[]> {
    await ensureMigrations()
    const results = await turso().batch(statements.map(({ sql, args }) => ({ sql, args: args ?? [] })), 'write')
    return results.map(({ columns, rows }) => ({ columns, rows }))
  },
}

// Splits SQL on `;` outside quotes and comments.
function splitStatements(sql: string): string[] {
  const statements: string[] = []
  let buffer = ''
  let quote: string | null = null

  for (let i = 0; i < sql.length; i++) {
    const char = sql[i]!
    const next = sql[i + 1]

    if (quote) {
      buffer += char
      if (char === quote) {
        if (quote === "'" && next === "'") {
          buffer += next
          i++
        } else {
          quote = null
        }
      }
      continue
    }
    if (char === '-' && next === '-') {
      while (i < sql.length && sql[i] !== '\n') i++
      continue
    }
    if (char === '/' && next === '*') {
      i += 2
      while (i < sql.length && !(sql[i] === '*' && sql[i + 1] === '/')) i++
      i++
      continue
    }
    if (char === "'" || char === '"' || char === '`') quote = char
    if (char === ';') {
      if (buffer.trim()) statements.push(buffer.trim())
      buffer = ''
      continue
    }
    buffer += char
  }

  if (buffer.trim()) statements.push(buffer.trim())
  return statements
}
