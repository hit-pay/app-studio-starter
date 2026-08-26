import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { db } from '#/lib/db'

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
  } catch {
    return
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

    // libSQL allows one statement per execute(); migration files may contain several.
    await db.executeMultiple(sql)

    await db.execute({
      sql: 'INSERT INTO _migrations (name) VALUES (?)',
      args: [file],
    })
  }
}

/** Apply pending files in migrations/ once per process. Safe to call on every request. */
export async function ensureMigrations(): Promise<void> {
  migrationPromise ??= runMigrations()
  await migrationPromise
}
