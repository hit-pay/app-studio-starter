You are the App Studio builder. Ship a usable embedded Dashboard iframe app.

The host origin is shared across apps. This app is served under
`/{APP_STUDIO_APP_ID}/…`. `studioAppId()` is that path segment.

Cover the screens the request needs: persist, session/roles, and
loading/empty/error/validation. New pages in `src/routes/` are cheap — add
them when list vs detail vs settings (or similar) is clearer as separate
routes. Then run `bun run generate-routes`.

## Layout

- `src/routes/` — pages. `index.tsx` is the home/list entry. Add sibling
  route files for extra screens (`$id.tsx`, `new.tsx`, `settings.tsx`, …).
- `src/ui/` and `src/components/` — installed Orchid. Change those files only when
  the user asks. Learn props/examples from orchid-ui MCP, not by dumping the source.
- `src/lib/` — UI-imported helpers (`createServerFn` + browser hooks). Put new
  `createServerFn` here. List/CRUD persist goes through these fns + `requireRoles`
  + `db.execute` (`#/server/lib/db`).
  - `files.ts` — `uploadFile`, `getFile`, `listFiles`, `deleteFile`
  - `current-user.ts` — `useCurrentUser` (wraps `getSession`); roles/staff via `appJson`
  - `resource.ts` — `loadResourcePage`, `mapResourcePayload` for ResourcePicker and ResourceList
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
  `ensureMigrations()` first. Use `IF NOT EXISTS`. See `docs/turso/migrations.md`.
- `docs/current-user.md` — session cookie contract
- `docs/hitpay/` — API / Resource fields
- `docs/turso/` — Database query, batch, and migration patterns

`src/routeTree.gen.ts` is generated: after route changes run
`bun run generate-routes`. Keep tokens and secrets on the server.

## Orchid UI

Explore orchid-ui MCP **before** writing screens. Call `list_orchid_components`
(search), then `get_orchid_component` (`name` or `names[]`) for props and
examples. That catalog is local stdio (`bun run mcp`,
`mcp/orchid-ui-catalog.json`) — a small JSON payload, faster than reading
`src/ui` / `src/components` source.

On disk today: `app-layout`, `page-layout`, `confirmation-modal`, `copy-button`,
`button`, `dialog`, `drawer`, `input`, `skeleton`, `spinner`, `toast`, `tooltip`.

`__root.tsx` already mounts `AppLayout`, `Toaster`, and
`ConfirmationModalProvider`.

Install a missing slug from the local registry hosted at `public/r` (app
server on port 3000, path `/${APP_STUDIO_APP_ID}/r/{name}.json`):

`npx shadcn@latest add @orchid/<slug> -y --overwrite`

## API / Resource and Database

API / Resource fields and Database tool names come from **app-studio** MCP plus
`docs/hitpay/` and `docs/turso/`. App-owned SQL lives in `migrations/` from
those docs.

Use MCP when you need live API / Resource lists or Database runtime tools
(query, batch, apply migrations). Start with `tools/list`, then the matching
docs file.

ResourcePicker / ResourceList: `#/lib/resource`
(`loadResourcePage`, `mapResourcePayload`, `ResourcePage`, `ResourceItem`).

## Auth / current user

Dashboard iframe session (not a login page). Read `docs/current-user.md`.
Browser: `useCurrentUser` from `#/lib/current-user`. Server: `getSession` /
`requireRoles` from `#/server/lib/session`. Tokens: `getAppToken()` from
`#/server/lib/app-token`. Roles: `#/lib/roles`.

## Output

Build or fix the request. End every implement session with
`bun run build` (fix failures if it breaks), then a short summary of what
shipped, what is left, and any blockers. Questions: answer only, no file edits.
