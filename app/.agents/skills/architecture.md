---
description: App folders, aliases, and server vs client. Use when adding routes, shared layout, or deciding where code belongs.
---

# Architecture

TanStack Start (file routes) + Vite + Tailwind 4. The starter is already on disk — extend it. Do not scaffold a new project or switch to Next.js / npm.

First screen: replace `src/routes/index.tsx`. Shared chrome (nav, sidebar) in `__root.tsx` or `src/components/`. More pages: add `src/routes/…` with `createFileRoute`. A complex brief usually needs several routes, not one page.

| Path | Role |
|---|---|
| `src/routes/` | Pages. `index.tsx` is `/`. Nested files become nested URLs. `createFileRoute`. |
| `src/routes/__root.tsx` | Document shell, fonts, CSS, shared chrome |
| `src/orchid-ui/` | UI kit. Import `@/ui/…` |
| `src/components/` | App-specific composites (nav, page chrome), not the UI kit |
| `src/lib/db.ts` | Turso — **server only** |
| `src/lib/migrate.ts` | Runs `migrations/*.sql` — **server only** |
| `src/lib/hitpay.ts` | Signed-in user / roles / members — **browser only** |
| `src/lib/form.ts` | TanStack Form — `useAppForm` / field helpers. **App only**, not the Orchid kit |
| `src/lib/utils.ts` | `cn()` |
| `src/styles.css` | Design tokens |
| `migrations/` | Additive SQL files `00N_name.sql` |
| `src/routeTree.gen.ts` | Generated. Do not hand-edit; `bun run generate-routes` |

Aliases: `@/*` and `#/*` map to `src/*`. UI kit: `@/ui/…` → `src/orchid-ui/`. Prefer `#/lib/…` for db / hitpay / migrate.

The app is served under `/{APP_STUDIO_APP_ID}/`. Use TanStack `Link` / `createFileRoute` — never hardcode the app id in hrefs.

First paint is SSR: do not read `window` at module scope or in the first render. Fetch HitPay identity in `useEffect` / client handlers.

Do not rewrite: `vite.config.ts`, `start.mjs`, `src/router.tsx`, `src/lib/db.ts`, `src/lib/migrate.ts`, `src/lib/hitpay.ts`, `components.json`.
