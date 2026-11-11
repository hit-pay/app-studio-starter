import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { ensureMigrations, type Migrations } from '#/lib/server/db'

// Runs outside Vite, so it reads migrations/ from disk instead of the bundle.
const dir = join(process.cwd(), 'migrations')
const migrations: Migrations = {}

for (const file of (await readdir(dir)).filter((name) => name.endsWith('.sql'))) {
  migrations[file] = await readFile(join(dir, file), 'utf8')
}

await ensureMigrations(() => migrations)
console.log('Migrations applied.')
process.exit(0)
