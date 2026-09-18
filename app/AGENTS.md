You are the App Studio builder. Ship a usable embedded Dashboard iframe app.

Do not bootstrap by listing the whole repo (`rg --files`, `find`, `ls -R`).
Do not scan `node_modules`. Do not dump `public/` (registry JSON, docs, MCP
catalog). Read this file, then `src/routes/`.

The host origin is shared across apps. This app is served under
`/{APP_STUDIO_APP_ID}/…`. `studioAppId()` is that path segment.

Cover the screens the request needs: persist, session/roles, and
loading/empty/error/validation. New pages in `src/routes/` are cheap — add
them when list vs detail vs settings (or similar) is clearer as separate
routes. Then run `bun run generate-routes`.

## Layout

- `src/routes/` — pages. `index.tsx` is the home/list entry. Add sibling
  route files for extra screens (`$id.tsx`, `new.tsx`, `settings.tsx`, …).
- `src/components/ui/` and installed Orchid blocks (`layout/`, `overlays/`,
  `actions/`) — do not dump these to learn APIs. orchid-ui MCP first. Change
  those files only when the user asks. Install extra slugs with `shadcn add`.
- `src/lib/` — UI-imported helpers (`createServerFn` + browser hooks). Put new
  `createServerFn` here. List/CRUD persist goes through these fns + `requireRoles`
  + `db.execute` (`#/server/lib/db`).
  - `files.ts` — `uploadFile`, `getFile`, `listFiles`, `deleteFile`
  - `current-user.ts` — `useCurrentUser` (wraps `getSession`); roles/staff via `appJson`
  - `staff.ts` — `listStaffs`
  - `roles.ts` — `ROLE`, `ALL_ROLES`, `MANAGER_ROLES`
  - `utils.ts` — `cn`
- `src/server/lib/` — Node only. Database, proxy, tokens, `requireRoles`. Keep
  imports in server/lib helpers, not in UI components.
  - `session.ts` — `getSession`, `requireRoles`
  - `app-token.ts` — `getAppToken`, `proxyUrl`, `appApiUrl`, `appJson`
  - `proxy.ts` — `proxyRequest` for `/v1/*`
  - `db.ts`, `migrate.ts`, `file-store.ts` — Database (blobs in `file-store`)
- `migrations/` — SQLite files. Add a new numbered file for schema changes;
  never rewrite an already-applied file. `db.execute` / `db.batch` run
  `ensureMigrations()` first. Use `IF NOT EXISTS`. Run `bun run migrate` to
  apply pending files standalone (against the real Turso database) so a
  broken migration fails loudly before build, not on the first request.

`src/routeTree.gen.ts` is generated: after route changes run
`bun run generate-routes`. Keep tokens and secrets on the server.

## Orchid UI

Explore orchid-ui MCP **before** writing screens. Call `list_orchid_components`
(search), then `get_orchid_component` (`name` or `names[]`) for props and
examples. Do not open `public/` or Orchid under `src/components/` to learn the
catalog.

On disk today: `app-layout`, `page-layout`, `confirmation-modal`, `copy-button`,
`button`, `dialog`, `drawer`, `input`, `skeleton`, `spinner`, `toast`, `tooltip`.

`__root.tsx` already mounts `AppLayout`, `Toaster`, and
`ConfirmationModalProvider`.

Install a missing slug from the local registry at `public/r` (do not open
those JSON files). App server port 3000,
`/${APP_STUDIO_APP_ID}/r/{name}.json`:

`npx shadcn@latest add @orchid/<slug> -y --overwrite`

## API / Resource and Database

API / Resource fields come from **app-studio** MCP. Use it when you need live
API / Resource lists. Start with `tools/list`.

Database has no MCP tool and no proxy: `db.execute` / `db.batch`
(`#/server/lib/db`) connect directly to this app's Turso database (env is
already configured on the sprite). App-owned SQL lives in `migrations/` —
`db.execute` / `db.batch` apply pending files first via `ensureMigrations()`.

## Auth / current user

Dashboard iframe session (not a login page). Browser: `useCurrentUser` from
`#/lib/current-user`. Server: `getSession` / `requireRoles` from
`#/server/lib/session`. Tokens: `getAppToken()` from `#/server/lib/app-token`.
Roles: `#/lib/roles`.

## Output

Build or fix the request. End every implement session with `bun run migrate`
(fix failures if it breaks — a schema change must apply before anything else
runs) then `bun run build` (fix failures if it breaks), then a short summary
of what shipped, what is left, and any blockers. Questions: answer only, no
file edits.
