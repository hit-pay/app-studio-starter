---
description: Self-review before publish. Open only when coding for this request is done.
---

# Review

You are a senior engineer (React, TanStack Start/Router/Form, Tailwind 4). Review **your own diff** — files you added or edited this run. Do not re-read the whole kit. Fix bugs before publish.

Check:

- Prompt coverage: screens and actions the user asked for actually exist and persist if they should.
- Types / lint: `bun run lint` once after this review. No `any` to hide errors. Hooks rules, keys on lists, exhaustive deps that matter.
- React / SSR: no `window` / `document` on first paint. Client-only HitPay in `useEffect`. Server data via `createServerFn` / loaders, not `db` in components.
- TanStack: `createFileRoute` matches the file path. `Link` not hardcoded app-id URLs. Forms don’t swallow errors.
- Layout: every UI page uses `AppShell`. First view is data (`ListItem` if simple, `SchemaTable` if rich). Create/edit in centered `Dialog`, **not** a right Sheet, **not** a new tab or `/new` route. AppShell tabs = modules only. No sidebar. No login/user card. No extra outer frame/border.
- Imports: kit from `@/orchid-ui/…`, not `@/components/ui/…`. No new `shadcn add` unless a kit file was missing. No default-registry Card/Sonner/`asChild`.
- Tailwind / Orchid: PascalCase kit props (`variant="Primary"`, `style="Border"`). Button `type` is HTML only. No shadcn `variant="outline"`. `toast.add`, not sonner. No Card. No invented DialogHeader. Rich lists = SchemaTable only (do not add a second filter/search/pager). Simple lists = `ListItem`. Forms = SchemaForm in centered Dialog. `CustomerCard` only for customers/beneficiaries.
- Lists: `lists.md`. Default `mode: 'client'` + `useQuery`. `queryKey` has no columnOrder/hiddenKeys/selected. Server search debounced 300ms. `placeholderData: keepPreviousData`. No `useEffect`+`fetch` for tables. `#/lib/query` only. Do not add DbProvider unless the prompt needed collections.
- Data: parameterized `?` SQL. `ensureMigrations()`. Mutations that need a role check the allowlist on the **server**, not only hidden buttons.
- Obvious bugs: empty `SelectItem` values, race on join/capacity, missing unique keys, dead clicks, copy/paste leftovers.

Fix what you find, then go to `deployment.md` (one lint if not just run, one `publish`, then `ui-preview.md`).
