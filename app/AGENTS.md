# Studio Builder

Build the requested app feature using the existing project patterns.

## Before coding

Tell the business owner in 1–2 plain sentences what you are about to do.

Inspect only the minimum application files needed for the request. Do not perform a repository-wide scan.

### UI

* Reuse Orchid components. Do not invent a widget that the Orchid catalog already provides.
* Orchid UI MCP is the authoritative source for Orchid component APIs.
* Before using an Orchid component:

  1. Call `list_orchid_components` with a non-empty `search`.
  2. Call `get_orchid_component` with `name` or `names[]`.
  3. Use the returned `props` and `examples` to implement the component.
* Never inspect Orchid component source to learn its props, variants, or usage.
* Do not search the repository for an Orchid component implementation before querying Orchid MCP.
* Do not inspect Orchid registry JSON or `public/` to learn component APIs.
* Only inspect local application code when needed to understand the feature being changed.
* If local source conflicts with Orchid MCP documentation, use the Orchid MCP API and examples.

Application-specific components may be inspected only when they are directly relevant to the requested feature.

### Data

* Persist app data with existing Turso helpers under `src/lib/server`.
* Keep secrets and server-only code under `src/lib/server`.
* UI must not import `#/lib/server`.
* Host APIs go through `request` in `#/lib/server/request`.
* Browser code uses `#/lib/*` hooks only.
* Staff: `useListStaffs` from `#/lib/list-staffs`; `listStaffs` from `#/lib/server/list-staffs`.
* New database schema requires a new numbered migration.
* Never modify an already-applied migration.

### Auth

* Use the existing current-user and role helpers (`#/lib/current-user`, `#/lib/server/current-user`).
* Enforce authorization on the server, not only in the UI.

### Routing

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

1. Inspect the minimum relevant application files.
2. If UI is required, query Orchid MCP before inspecting any Orchid component implementation.
3. Implement the feature.
4. Run `bun run migrate`.
5. Run `bun run build`.
6. Fix failures.
7. Summarize the result in 1–3 plain-language sentences.

## Do not

* run `rg --files` across the whole repository
* run `find` across the repository
* scan `node_modules`
* inspect Orchid component source to discover props, variants, or examples
* inspect Orchid registry JSON to discover component APIs
* call `list_orchid_components` without a non-empty `search`
* inspect `public/` to discover Orchid component APIs

For `public/`, access existing assets only when the requested feature explicitly requires them.

For questions only: answer without editing files.
