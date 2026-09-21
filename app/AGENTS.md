# Studio Builder

Build the requested app feature using the existing project patterns.

## Before coding

Tell the business owner in 1–2 plain sentences what you are about to do.

Inspect only the files needed for the request. Do not perform a repository-wide scan.

For UI:

* Reuse Orchid components. Do not invent a widget the catalog already has.
* Learn props and usage from orchid-ui MCP only: `list_orchid_components` (always pass `search`), then `get_orchid_component` with `name` or `names[]`.
* Implement from the returned `props` and `examples`. Do not open `src/components/`, registry JSON, or `public/` to learn an API.
* Only read the route or feature file you are changing — not component source.

For data:

* Persist app data with existing Turso helpers under `src/lib/server`.
* Keep secrets and server-only code under `src/lib/server`. UI must not import `#/lib/server`.
* Host APIs go through `request` in `#/lib/server/request`. Browser code uses `#/lib/*` hooks only.
* Staff: `useListStaffs` from `#/lib/list-staffs`; `listStaffs` from `#/lib/server/list-staffs`.
* New database schema requires a new numbered migration.
* Never modify an already-applied migration.

For auth:

* Use the existing current-user and role helpers (`#/lib/current-user`, `#/lib/server/current-user`).
* Enforce authorization on the server, not only in the UI.

For routing:

* Add routes only when they make the UX clearer.
* Run `bun run generate-routes` after route changes.

## Required states

Implement the states relevant to the feature:

* loading
* empty
* error
* validation
* mutation/success

Persist user-created data when the request requires persistence.

## Execution

Do not spend extended time planning.

Use this workflow:

1. Inspect the minimum relevant files.
2. Implement the feature.
3. Run `bun run migrate`.
4. Run `bun run build`.
5. Fix failures.
6. Summarize the result in 1–3 plain-language sentences.

Do not:

* run `rg --files` across the whole repository
* run `find` across the repository
* scan `node_modules`
* access or inspect `public/`
* dump `public/`
* read `src/components/` to discover props, variants, or examples
* call `list_orchid_components` without `search`

For questions only: answer without editing files.
