import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { db } from '#/lib/server/db'

let migrationPromise: Promise<void> | undefined

async function ensureMigrationsTable(): Promise<void> {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS _migrations (
      name TEXT PRIMARY KEY,
      applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `)
}

async function appliedMigrations(): Promise<Set<string>> {
  const result = await db.execute('SELECT name FROM _migrations')
  return new Set(result.rows.map((row) => String(row.name)))
}

async function runMigrations(): Promise<void> {
  await ensureMigrationsTable()

  const migrationsDir = join(process.cwd(), 'migrations')
  let files: string[]

  try {
    files = (await readdir(migrationsDir))
      .filter((file) => file.endsWith('.sql'))
      .sort()
  } catch (error) {
    throw new Error(
      `Could not read migrations directory at ${migrationsDir}.`,
      { cause: error },
    )
  }

  const applied = await appliedMigrations()

  for (const file of files) {
    if (applied.has(file)) {
      continue
    }

    const sql = (await readFile(join(migrationsDir, file), 'utf8')).trim()

    if (sql === '') {
      continue
    }

    // Keep the migration marker with the migration statements so a partially
    // recorded migration cannot be retried as if it had never run.
    const migrationName = file.replaceAll("'", "''")
    await db.executeMultiple(
      `BEGIN IMMEDIATE;\n${sql}\nINSERT INTO _migrations (name) VALUES ('${migrationName}');\nCOMMIT;`,
    )
  }
}

/** Apply pending files in migrations/ once per process. Safe to call on every request. */
export async function ensureMigrations(): Promise<void> {
  const pending = (migrationPromise ??= runMigrations())

  try {
    await pending
  } catch (error) {
    if (migrationPromise === pending) {
      migrationPromise = undefined
    }
    throw error
  }
}
