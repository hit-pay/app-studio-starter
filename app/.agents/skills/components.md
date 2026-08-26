---
description: Orchid UI. Open when building screens.
---

# Screens

Orchid is the **global** kit. Browse it with the **shadcn MCP** ([docs](https://ui.shadcn.com/docs/mcp)) from any harness (Cursor, Claude Code, VS Code Copilot, Codex, Windsurf, OpenCode). Command: `bunx --bun shadcn mcp`. Config files: `.cursor/mcp.json`, `.mcp.json`, `.vscode/mcp.json`, `.codex/config.toml`. Registries: `components.json` (`@orchid`).

If MCP tools are missing, do not assume a single client. Use that harness’s MCP file, or fetch the catalog JSON below.

Search/list **`@orchid` only**. Do not add Button/Dialog/Card from the default shadcn registry.

Fallback catalog (one JSON, do not open every kit file): **https://orchid-ui-hitpay.vercel.app/registry.json** (`items` `registry:ui`, skip `utils`). Item JSON: `https://orchid-ui-hitpay.vercel.app/r/{name}.json`.

Then import `@/ui/<name>` (`src/orchid-ui/`). Open a `.tsx` only after you chose that `name`.

Base UI: `render={<Button />}`, never `asChild` or `@radix-ui/*`. No `src/components/ui`. Never add from `@shadcn` / ui.shadcn.com.

**Orchid first.** Custom → `src/components/<name>.tsx` only if no catalog item fits.

`components.json` has `@orchid`. Missing file:

```bash
bunx shadcn add @orchid/<name>
bunx shadcn add @orchid --all
```

```tsx
<Button type="Primary">Save</Button>
<Button type="Secondary" style="Border">Cancel</Button>
```

`type` is visual (Primary | Secondary | Destructive); submit uses `htmlType`. Triggers: `nativeButton` + `render={<Button … />}`. Modal always has `title`. Forms: `FieldGroup` + `Field` + `FieldLabel`. Invalid: `data-invalid` on Field, `aria-invalid` on the control. Prefix: `InputGroup` + `InputGroupInput`, never raw Input inside. `flex gap-*`, not `space-y-*`. `className` = layout only. Tokens, not `bg-blue-500`.
