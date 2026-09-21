---
name: orchid-ui
description: Reuse Orchid UI via orchid-ui MCP for props and examples. Use when building or changing UI, installing a missing slug, or looking up how to implement a component.
---

# Orchid UI

Reuse catalog components. Do not invent a widget Orchid already covers.

MCP is the only way to learn props and usage. Do not open `src/components/`, registry JSON, or `public/` for that.

## Workflow

1. `list_orchid_components` with `search` (never list the full catalog).
2. `get_orchid_component` with `name` or `names[]`.
3. Implement from `props` and `examples[{description,code}]`. Copy the example pattern; do not read the component source.

Missing slug, app server on port 3000:

```
npx shadcn@latest add @orchid/<slug> -y --overwrite
```

Do not open the registry JSON to install.

## Already mounted

`__root.tsx` already mounts `AppLayout`, `Toaster`, and `ConfirmationModalProvider`.
