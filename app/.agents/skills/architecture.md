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
| `src/lib/` | `db` / `migrate` / `form` / `utils` / `hitpay` |
| `migrations/` | SQL files |
| `src/styles.css` | Tokens |

`@/*` and `#/*` → `src/*`. App is under `/{APP_STUDIO_APP_ID}/` — use TanStack `Link` / `createFileRoute`, never hardcode the app id. No `window` on first SSR paint.

Data: [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview) for fetch/cache; [TanStack DB](https://tanstack.com/db/latest/docs/quick-start) for collections, live queries, optimistic mutations. Turso stays server-only (`createServerFn` + `#/lib/db`). SchemaTable only renders `data` — do not fetch inside the kit. List fetch rules: `.agents/skills/lists.md`.

Do not rewrite: `vite.config.ts`, `start.mjs`, `src/router.tsx`, `src/lib/db.ts`, `src/lib/migrate.ts`, `src/lib/hitpay.ts`, `components.json`.
