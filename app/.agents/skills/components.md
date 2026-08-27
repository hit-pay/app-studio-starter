---
description: Orchid catalog names and install. Open when you need an @orchid item name.
---

# Catalog

Recipes: **`screens.md`**. Lists/fetch: **`lists.md`**.

Orchid is the **global** kit. shadcn MCP `@orchid` only ([docs](https://ui.shadcn.com/docs/mcp)). Config: `.cursor/mcp.json`, `.mcp.json`, `.vscode/mcp.json`, `.codex/config.toml`. `components.json` registries: `@orchid` only.

Search **`@orchid` only**. Never add Button/Dialog/Card/Sonner from the default registry. No `src/components/ui` for kit copies (app may already have `orchid-ui/`). No `asChild` / `@radix-ui/*`. Triggers: `nativeButton` + `render={<Button />}`.

Fallback: **https://orchid-ui-hitpay.vercel.app/registry.json**. Item: `https://orchid-ui-hitpay.vercel.app/r/{name}.json`.

```bash
bunx shadcn add @orchid/<name>
bunx shadcn add @orchid/all
```

Do not run `shadcn add --all`. `@orchid/all` is `registryDependencies`; `all.tsx` only re-exports `Toaster` + `toast`.

**Orchid first.** Custom → `src/components/<name>.tsx` only if no catalog item. **No Card.** ChoiceCard is radio. Surfaces: StatCard, CustomerCard (contacts only), DetailList.

## Catalog (`@orchid/…`)

Primitives: `button`, `dropdown-menu`, `badge`, `accordion`, `collapsible`, `progress`, `avatar`, `tooltip`, `tabs`, `choice-card`, `stat-card`, `detail-list`, `icon-group`, `copy-button`, `skeleton`, `spinner`, `dialog`, `sheet`, `breadcrumb`, `pagination`, `table`, `command`, `kbd`, `scroll-area`, `toast`, `separator`, `popover`, `calendar`

Forms: `field`, `label`, `input`, `input-group`, `textarea`, `select`, `combobox`, `quantity-input`, `checkbox`, `radio-group`, `switch`, `slider`, `date-picker`, `form-section`

Blocks: `app-shell`, `alert`, `list-item`, `empty`, `customer-card`, `page-toolbar`, `page-title`, `confirm-dialog`, `schema-form`, `schema-table`

Old names gone: not `modal`, `banner`, `chip`, `toggle`, `progress-bar`, `empty-state`.
