---
description: Folders and aliases. Open when adding routes or deciding where a file goes.
---

# Architecture

TanStack Start + Vite + Tailwind 4. Extend this app. Do not scaffold Next.js / npm.

| Path | Use |
|---|---|
| `src/routes/` | Pages (`index.tsx` = `/`). Shared chrome: `__root.tsx` |
| `src/components/orchid-ui/` | Orchid kit → `@/orchid-ui/…` (no Card in kit) |
| `src/components/` | App-only UI → `@/components/…` |
| `src/lib/` | `db` / `migrate` / `form` / `utils` / `hitpay` / `query` (`query.tsx`) |
| `migrations/` | SQL files |
| `src/styles.css` | Tokens |

`@/*` and `#/*` → `src/*`. App is under `/{APP_STUDIO_APP_ID}/` — use TanStack `Link` / `createFileRoute`, never hardcode the app id. No `window` on first SSR paint.

Data: Query lives in `#/lib/query` (`QueryProvider` on `__root`). Collections: [TanStack DB](https://tanstack.com/db/latest/docs/quick-start) when the list is a live collection. Turso stays server-only (`createServerFn` + `#/lib/db`). SchemaTable only renders `data`. Rules: `lists.md`. Recipes: `screens.md`.

Do not rewrite: `vite.config.ts`, `start.mjs`, `src/router.tsx`, `src/lib/db.ts`, `src/lib/migrate.ts`, `src/lib/hitpay.ts`, `components.json`.
