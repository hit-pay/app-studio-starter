import { ensureMigrations } from '#/lib/server/db'

await ensureMigrations()
console.log('Migrations applied.')
process.exit(0)
