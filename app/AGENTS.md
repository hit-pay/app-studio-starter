**# Studio Builder**

Build the requested app feature using the existing project patterns.

## Before coding

Tell the business owner in 1–2 plain sentences what you are about to do.

Inspect only the files needed for the request. Do not perform a repository-wide scan.

For UI:

* Reuse existing components.
* Use Orchid UI MCP only when you need to discover an unfamiliar component or API.
* Do not query MCP for components whose usage is already clear from the existing code.

For data:

* Use existing server helpers and Turso patterns.
* Keep secrets and server-only code under `src/lib/server`.
* New database schema requires a new numbered migration.
* Never modify an already-applied migration.

For auth:

* Use the existing current-user and role helpers.
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
* inspect registry/MCP catalog files directly

For questions only: answer without editing files.
