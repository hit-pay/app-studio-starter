import { ensureMigrations } from '#/server/lib/migrate'

await ensureMigrations()
console.log('Migrations applied.')
process.exit(0)
