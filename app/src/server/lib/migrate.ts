import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { schemaDb } from '#/server/lib/db'
import { isTransactionControl, splitSqlStatements } from '#/server/lib/sql-statements'

let migrationPromise: Promise<void> | undefined

/** Apply pending files in migrations/ once per process. Safe to call on every request. */
export async function ensureMigrations(): Promise<void> {
  const pending = (migrationPromise ??= applyPendingMigrations())

  try {
    await pending
  } catch (error) {
    if (migrationPromise === pending) migrationPromise = undefined
    throw error
  }
}

async function applyPendingMigrations(): Promise<void> {
  await schemaDb.execute(`
    CREATE TABLE IF NOT EXISTS _migrations (
      name TEXT PRIMARY KEY,
      applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `)

  const migrationsDir = join(process.cwd(), 'migrations')
  let files: string[]
  try {
    files = (await readdir(migrationsDir)).filter((file) => file.endsWith('.sql')).sort()
  } catch (error) {
    throw new Error(`Could not read migrations directory at ${migrationsDir}.`, { cause: error })
  }

  const applied = new Set(
    (await schemaDb.execute('SELECT name FROM _migrations')).rows.map((row) => String(row.name)),
  )

  for (const file of files) {
    if (applied.has(file)) continue
    const sql = (await readFile(join(migrationsDir, file), 'utf8')).trim()
    if (sql === '') continue

    const statements = splitSqlStatements(sql).filter((item) => !isTransactionControl(item))
    const migrationName = file.replaceAll("'", "''")
    await schemaDb.executeMultiple([
      ...statements,
      `INSERT INTO _migrations (name) VALUES ('${migrationName}')`,
    ])
  }
}
