# Studio Builder — Dashboard iframe app

Before reading files or running tools, tell the business owner in 1–2 plain sentences (their language, no filenames/code/frameworks) what you're about to do — every turn, including follow-ups.

**Don't**: list the whole repo (`rg --files`, `find`, `ls -R`), scan `node_modules`, or dump `public/` (registry JSON, MCP catalog, Orchid source). For a component's API, check orchid-ui MCP first — it has props, examples, and the full catalog of components available to install (see Orchid UI below) — and only open the file under `src/components/` if the MCP answer isn't enough.

The host origin is shared across apps; this app is served under `/{APP_STUDIO_APP_ID}/…`. `studioAppId()` (`#/lib/utils`) returns that path segment.

Cover the screens the request needs: persist, session/roles, and loading/empty/error/validation states. New routes are cheap — split list vs detail vs settings when clearer. After route changes, run `bun run generate-routes`.

## Runtime env

The host injects env onto the **running process** (`bun run start`, `createServerFn`, `bun run migrate` / `build`). There is **no `.env` file** in this workspace — do not create one, do not look for one, do not tell the owner to set dotenv.

Read `process.env` only in `#/lib/server` (never in UI). Always present: `APP_STUDIO_APP_ID` (app id / iframe path segment), `APP_STUDIO_APP_SECRET` (server-only Bearer for `/token`), `APP_STUDIO_PROXY_URL` (origin for host REST), `TURSO_DATABASE_URL` / `TURSO_AUTH_TOKEN` (direct Turso).

## Layout

- **`src/routes/`** — pages. `index.tsx` = home. Add sibling files (`$id.tsx`, `new.tsx`, `settings.tsx`, …). `src/routeTree.gen.ts` is generated — rerun `bun run generate-routes` after route edits.
- **`src/components/`** — UI. `ui/` plus Orchid blocks (`layout/`, `overlays/`, `actions/`, `form/`, `displaying-data/`). Query orchid-ui MCP first for props/usage; open the file itself only if that's not enough. Edit only when asked; install extra slugs via `shadcn add`. See Orchid UI below.
- **`src/types/`** (`#/types`) — `User`, `UserRole`, `FileMeta`, `FileWithData`, `Location`, `Staff`, plus re-exports of `Provider` / `RoleTitle`.
- **`src/enums/`** (`#/enums`) — `ROLES`, `PROVIDER`.
- **`src/lib/`** — browser hooks. UI imports from here, never from `lib/server` or `business/server`.
  - `current-user.ts` — `useCurrentUser`
  - `files.ts` — `useFiles`
  - `business/` — `useListStaffs`, `useListLocations` (see `business/README.md`)
  - `utils/` — `cn`, `studioAppId`
- **`src/lib/server/`** — Node helpers; UI components must not import these.
  - `current-user.ts` — `getCurrentUser` (`createServerFn`), `requireRoles`
  - `request.ts` — `request.get`/`.post`/`.patch`/`.put`/`.delete` (`endpoint`, optional `provider: 'hitpay'`); always sends cookie + app token
  - `db.ts` — `db`, `ensureMigrations`
  - `files.ts` — `uploadFile`, `getFile`, `listFiles`, `deleteFile` (`createServerFn`)
- **`src/lib/business/server/`** — server calls for the business owner's own commerce data (locations, staff, payments, products, orders, customers, etc.): `listLocations`, `listStaffs`; import only from inside `lib/business` hooks. New list APIs for the merchant's data go here, then wrap with a root hook.
- **`migrations/`** — SQLite files. New numbered file per schema change; never rewrite an applied one; use `IF NOT EXISTS`.

New `createServerFn`s go next to their domain: files/user/token/DB in `#/lib/server`; the business owner's data lists in `#/lib/business/server`. Shared types in `#/types`. Keep tokens/secrets server-side.

## Auth / current user

Host: `GET /api/apps/{app}/current-user` (`{app}` = `APP_STUDIO_APP_ID`), authenticated by the `app_studio_user_token` HttpOnly cookie:

```json
{ "id": "user_123", "email": "owner@example.com", "name": "Example Owner", "role": { "id": "role_123", "title": "Owner" } }
```

`id`/`email`/`name` are the user , `role` is the effective app role — `title` is what `requireRoles` / `#/enums` check. `200` JSON on success; missing/expired session is an auth error.

## Database (Turso)

connect via `#/lib/server/db` (`db`, `ensureMigrations`).

```ts
const result = await db.execute({ sql: 'SELECT id, name FROM items WHERE status = ?', args: ['active'] })
result.rows[0].name // or result.rows[0][1]

await db.batch([
  { sql: 'UPDATE items SET status = ? WHERE id = ?', args: ['archived', id] },
  { sql: 'INSERT INTO item_events (item_id, type) VALUES (?, ?)', args: [id, 'archived'] },
])
```

`db.execute`/`db.batch` run `ensureMigrations()` first (pending `migrations/*.sql` as one batch, filename recorded in `_migrations`). Also run `bun run migrate` standalone before `bun run build`, so failures surface early.

Rules: SQLite / libSQL only. New schema = new numbered file (`002_….sql`); never rewrite an applied file. Prefer `IF NOT EXISTS`. Do not wrap files in `BEGIN`/`COMMIT`.

## Orchid UI

Start with orchid-ui MCP to learn a component's API: `list_orchid_components` (search the full catalog — far more components are installable than what's on disk today), then `get_orchid_component` (`name`/`names[]`) for props/examples. Never dump `public/` to learn the catalog; if the MCP answer still leaves something unclear, it's fine to open the actual file under `src/components/`.

On disk today (among others): `app-layout`, `page-layout`, `form-layout`, `confirmation-modal`, `copy-button`, `button`, `dialog`, `drawer`, `input`, `file-upload`, `skeleton`, `spinner`, `toast`, `tooltip`.

`__root.tsx` already mounts `AppLayout`, `Toaster`, `ConfirmationModalProvider`. Signed-in chip opens a profile dropdown.

Missing slug? Install from the local registry (don't open its JSON directly), app server port 3000:

```
npx shadcn@latest add @orchid/<slug> -y --overwrite
```

## app-studio MCP

The business owner's live commerce data — payments, customers, products, orders, invoices, locations, staff, etc. — proxied so the API key never reaches this app. Use `tools/list`/`tools/call` to invoke, then `resources/list`/`resources/read` on `app-studio://docs/{tool}` for filters/schema (`app-studio://docs/direct-query` covers calling the proxy directly). This is separate from the local helpers above (`#/lib/*`, `#/lib/server/*`) and from host REST (`/current-user`, `/token`, integrations), which are not called via MCP.

## Output

Build or fix the request. End every implement session with:

1. `bun run migrate` (fix failures — schema must apply before anything else runs)
2. `bun run build` (fix failures)
3. A 1–3 sentence plain-language summary for the business owner: what changed, what's still blocking — no filenames, code, frameworks, or libraries.

For questions only: answer, don't edit files.
