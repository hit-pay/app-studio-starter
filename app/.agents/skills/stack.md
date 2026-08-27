---
description: Folders, Turso, HitPay user/roles, and publish. Open for data, routes, auth, or shipping.
---

# Stack

TanStack Start + Vite + Tailwind 4. Extend this app. Do not scaffold Next.js / npm.

| Path | Use |
|---|---|
| `src/routes/` | Pages (`index.tsx` = `/`). Shared chrome: `__root.tsx` |
| `src/components/orchid-ui/` | Orchid kit → `@/orchid-ui/…`. Already in the repo; do not copy it to `src/components/ui`. |
| `src/components/` | App-only UI → `@/components/…` |
| `src/lib/` | `db` / `migrate` / `form` / `utils` / `hitpay` / `query` (`query.tsx`) |
| `migrations/` | SQL files |
| `src/styles.css` | Tokens |

`@/*` and `#/*` → `src/*`. `@/orchid-ui/*` → `src/components/orchid-ui/*`. App is under `/{APP_STUDIO_APP_ID}/` — TanStack `Link` / `createFileRoute`, never hardcode the app id. No `window` on first SSR paint.

Toaster: `@/orchid-ui/toast` (`__root` already has `Toaster` + `QueryProvider`). SchemaTable only renders `data` (UI: `ui.md`).

Do not rewrite: `vite.config.ts`, `start.mjs`, `src/router.tsx`, `src/lib/db.ts`, `src/lib/migrate.ts`, `src/lib/hitpay.ts`, `components.json`.

## Database

Server only: `#/lib/db`, `#/lib/migrate`. No Turso `db` in client components. No extra ORM.

Lists: `#/lib/query` (`useQuery`, `useDebouncedValue`) caches only. Persist with `createServerFn` + Turso. Do not add TanStack DB / `DbProvider` unless the prompt needs collections.

Turso is already **HTTP** (`db.execute` / `db.batch`). Do not add `@tursodatabase/database`, sync, WASM, MCP, vector, FTS, or encryption unless the user asked.

New schema → new `migrations/00N_name.sql` (do not edit old ones). `await ensureMigrations()` before the first query.

SQLite types (`TEXT`, `INTEGER`, `REAL`). Parameterized `?` only. `INTEGER PRIMARY KEY` (no `WITHOUT ROWID`). One statement per `db.execute()`; several writes → `db.batch`. Do not put `TURSO_*` in source or chat. “Unable to connect” = fix the server handler.

```ts
import { createServerFn } from '@tanstack/react-start'
import { db } from '#/lib/db'
import { ensureMigrations } from '#/lib/migrate'

export const listItems = createServerFn({ method: 'GET' }).handler(async () => {
  await ensureMigrations()
  const result = await db.execute({ sql: 'SELECT id, title FROM items ORDER BY created_at DESC' })
  return result.rows
})
```

## HitPay user / roles

Browser only (`useEffect` / clicks). Never import from `createServerFn` / loaders.

```ts
import { fetchUserInfo, fetchAppRoles, fetchAppMembers, useHitPayUser } from '#/lib/hitpay'
```

`fetchUserInfo()` → `{ id, email, name, role: { id, title } }`. Gate UI with `role.title`. If the prompt has roles, also check `role.title` in mutating server handlers (pass it from the client).

Live iframe: real `/api/apps/{appId}/user/info`, `/roles`, `/members` via the HitPay **proxy**. Preview/screenshot: mock Owner + Preview User (`scripts/hitpay-preview-mock.mjs`). No login screen. No user card in AppShell. App data stays in Turso.

## Publish

`bun run publish` builds and restarts the live iframe. Not a screenshot and not a second server. Do not start `bun run dev` / extra `vite` / extra `start` / extra `preview` on Sprite. Do not edit `.output/` or `.nitro/`. Do not lint or publish after every save.

When **all** source changes are done: `bun run generate-routes` if you added or renamed `src/routes/`, then **one** `bun run lint` and **one** `bun run publish`. Screenshot only if the user asked to check the UI (`review.md`).
