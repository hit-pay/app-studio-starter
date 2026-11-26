// Applies pending migrations to the app's database now (the backend also applies them before its first query).
import { ensureMigrations } from '../backend/src/lib/db.ts'

await ensureMigrations()
console.log('Migrations applied.')
