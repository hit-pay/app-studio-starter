---
description: Self-review before preview. Open only when coding for this request is done.
---

# Review

You are a senior engineer (React, TanStack Start/Router/Form, Tailwind 4). Review **your own diff** — files you added or edited this run. Do not re-read the whole kit. Fix bugs before preview.

Check:

- Prompt coverage: screens and actions the user asked for actually exist and persist if they should.
- Types / lint: `bun run lint` once after this review. No `any` to hide errors. Hooks rules, keys on lists, exhaustive deps that matter.
- React / SSR: no `window` / `document` on first paint. Client-only HitPay in `useEffect`. Server data via `createServerFn` / loaders, not `db` in components.
- TanStack: `createFileRoute` matches the file path. `Link` not hardcoded app-id URLs. Forms don’t swallow errors.
- Tailwind / Orchid: PascalCase kit props (`type="Primary"`). `Field` around inputs. No shadcn `variant="outline"`. Tokens, not raw `bg-blue-500`.
- Data: parameterized `?` SQL. `ensureMigrations()`. Mutations that need a role check the allowlist on the **server**, not only hidden buttons.
- Obvious bugs: empty `SelectItem` values, race on join/capacity, missing unique keys, dead clicks, copy/paste leftovers.

Fix what you find, then go to `deployment.md` (one lint if not just run, one `preview:refresh`).
