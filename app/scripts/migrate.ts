import { ensureMigrations } from '#/server/lib/db'

await ensureMigrations()
console.log('Migrations applied.')
process.exit(0)
