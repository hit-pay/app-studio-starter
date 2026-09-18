# App Studio Builder — Dashboard iframe app

Before reading files or running tools, tell the business owner in 1–2 plain sentences (their language, no filenames/code/frameworks) what you're about to do — every turn, including follow-ups.

**Don't**: list the whole repo (`rg --files`, `find`, `ls -R`), scan `node_modules`, or dump `public/` (registry JSON, MCP catalog).

**Start**: read this file, then `src/lib/`.

The host origin is shared across apps; this app is served under `/{APP_STUDIO_APP_ID}/…`. `studioAppId()` returns that path segment.

Cover the screens the request needs: persist, session/roles, and loading/empty/error/validation states. New routes are cheap — split list vs detail vs settings when clearer. After route changes, run `bun run generate-routes`.

## Layout

- **`src/routes/`** — pages. `index.tsx` = home/list. Add sibling files (`$id.tsx`, `new.tsx`, `settings.tsx`, …).
- **`src/components/ui/`** + Orchid blocks (`layout/`, `overlays/`, `actions/`) — don't dump to learn APIs; use orchid-ui MCP. Edit only when asked. Install extra slugs via `shadcn add`.
- **`src/lib/`** — UI-imported helpers (`createServerFn` + browser hooks). New `createServerFn`s go here. CRUD persist flows through these + `requireRoles` + `db.execute` (`#/server/lib/db`).
  - `files.ts` — `uploadFile`, `getFile`, `listFiles`, `deleteFile`
  - `business/` — `list-staffs.ts` (`useListStaffs`), `list-locations.ts` (`useListLocations`) (import from `#/lib/business`)
  - `enums/` — `ROLES.ts` (import from `#/lib/enums`)
  - `current-user.ts` — `useCurrentUser` (wraps `getCurrentUser`)
  - `utils.ts` — `cn`
- **`src/server/lib/`** — Node-only. Import from each folder's `index.ts` (or `db.ts`), not UI components.
  - `current-user/` — `getCurrentUser`, `requireRoles`
  - `app-api/` — `getAppToken`, `appJson`, `appApiUrl`, `proxyUrl`
  - `db.ts` — `db`, `ensureMigrations`
  - `files/` — `insertFile`, `getFile`, `listFiles`, `deleteFile`, `FileMeta`
- **`migrations/`** — SQLite files. New numbered file per schema change; never rewrite an already-applied one. Use `IF NOT EXISTS`. `db.execute`/`db.batch` auto-run `ensureMigrations()`. Run `bun run migrate` standalone against the real DB so failures surface before build.

`src/routeTree.gen.ts` is generated — rerun `bun run generate-routes` after route edits. Keep tokens/secrets server-side.

## Orchid UI

Explore via orchid-ui MCP before writing screens: `list_orchid_components` (search), then `get_orchid_component` (`name`/`names[]`) for props/examples. Don't open `public/` or Orchid source to learn the catalog.

On disk: `app-layout`, `page-layout`, `confirmation-modal`, `copy-button`, `button`, `dialog`, `drawer`, `input`, `skeleton`, `spinner`, `toast`, `tooltip`.

`__root.tsx` already mounts `AppLayout`, `Toaster`, `ConfirmationModalProvider`.

Missing slug? Install from local registry at `public/r` (don't open those JSON files directly). App server port 3000, path `/${APP_STUDIO_APP_ID}/r/{name}.json`:

```
npx shadcn@latest add @orchid/<slug> -y --overwrite
```

## MCP vs local docs — don't mix these up

- **`app-studio` MCP** — the business's live data (HitPay: customers, payments, products, orders, invoices, etc.), proxied so the API key never reaches this app. Use `tools/list`/`tools/call` to invoke, then `resources/list`/`resources/read` on `app-studio://docs/{tool}` for filters/schema (`app-studio://docs/direct-query` covers calling the proxy directly).
- **Local `docs/`** — this app's own server/UI helpers. Browser: `useCurrentUser` (`#/lib/current-user`). Server: `getCurrentUser` (`#/server/lib/current-user`), `requireRoles` (`#/server/lib/current-user`), `getAppToken` (`#/server/lib/app-api`). Roles: `#/lib/enums`. These hit the app-studio server's plain REST endpoints (`/current-user`, `/token`) directly, proxied but not via MCP.

## Output

Build or fix the request. End every implement session with:

1. `bun run migrate` (fix failures — schema must apply before anything else runs)
2. `bun run build` (fix failures)
3. A 1–3 sentence plain-language summary for the business owner: what changed, what's still blocking — no filenames, code, frameworks, or libraries.

For questions only: answer, don't edit files.
