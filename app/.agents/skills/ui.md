---
description: Orchid UI — iframe and how to use the kit. Open when building any screen.
---

# UI

**First:** fetch [https://orchid-ui-hitpay.vercel.app/registry.json](https://orchid-ui-hitpay.vercel.app/registry.json). Use each item’s `name`, `title`, and `description` to pick components. For props, read `src/components/orchid-ui/<name>.tsx`.

Import `@/orchid-ui/<kebab-name>`. Customize those files when the product needs it. If the file already exists, do not `shadcn add` that name again (reinstall overwrites local edits). Add `@orchid/<name>` only when the file is **missing** (`https://orchid-ui-hitpay.vercel.app/r/{name}.json`). Config: `.mcp.json`, `components.json`.

Typical APIs: PascalCase visuals (`variant="Primary"`, `style="Border"`). `Button type` is HTML. `toast.add({ title, type: 'success' })`. Triggers often use `nativeButton` + `render={<Button />}`. App-only extras: `src/components/<name>.tsx`.

## Iframe

The app sits inside the HitPay dashboard (icon rail, Apps header, Draft/Build). Use `AppShell` to fill the pane. No extra frame, no host sidebar clone, no login/user card in the iframe.

Fetch lists with `#/lib/query`. Persist with `createServerFn` + `#/lib/db`.
