---
name: orchid-ui
description: Reuse Orchid UI components and query orchid-ui MCP only for unfamiliar APIs. Use when building or changing UI, installing components, or looking up props/examples.
---

# Orchid UI

Reuse existing components. Do not invent a new widget when an Orchid component already covers the need.

## When to use MCP

Use orchid-ui MCP only when the component or API is unfamiliar.

1. `list_orchid_components` — search the catalog (more slugs are installable than what is on disk).
2. `get_orchid_component` with `name` or `names[]` — props and examples.

Do not query MCP for components whose usage is already clear from existing code.

Do not inspect registry/MCP catalog files, dump `public/`, or scan Orchid source to learn the catalog.

If MCP is still not enough, open the matching file under `src/components/`.

## Install

Missing slug, app server on port 3000:

```
npx shadcn@latest add @orchid/<slug> -y --overwrite
```

Do not open the registry JSON to install.

## Already mounted

`__root.tsx` already mounts `AppLayout`, `Toaster`, and `ConfirmationModalProvider`.
