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
- Layout: every UI page uses `AppShell`. Multi-page apps pass `nav` (`AppShellNavItem active`). No login/user card in the shell. No extra outer frame/border.
- Imports: kit from `@/orchid-ui/…`, not `@/components/ui/…`. No new `shadcn add` unless a kit file was missing. No default-registry Card/Sonner/`asChild`.
- Tailwind / Orchid: PascalCase kit props (`variant="Primary"`, `style="Border"`). Button `type` is HTML only. No shadcn `variant="outline"`. `toast.add`, not sonner. No Card. No invented DialogHeader. SchemaTable for lists, SchemaForm for forms. `CustomerCard` only for customers/beneficiaries. Other people = `ListItem` + `Avatar`.
- Lists: `lists.md`. Default `mode: 'client'` + `useQuery`. `queryKey` has no columnOrder/hiddenKeys/selected. Server search debounced 300ms. `placeholderData: keepPreviousData`. No `useEffect`+`fetch` for tables. `#/lib/query` only. Do not add DbProvider unless the prompt needed collections.
- Data: parameterized `?` SQL. `ensureMigrations()`. Mutations that need a role check the allowlist on the **server**, not only hidden buttons.
- Obvious bugs: empty `SelectItem` values, race on join/capacity, missing unique keys, dead clicks, copy/paste leftovers.

Fix what you find, then go to `deployment.md` (one lint if not just run, one `preview:refresh`).
