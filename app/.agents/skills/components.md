---
description: Orchid UI. Open when building screens.
---

# Screens

Orchid is the **global** kit. Browse it with the **shadcn MCP** ([docs](https://ui.shadcn.com/docs/mcp)) from any harness (Cursor, Claude Code, VS Code Copilot, Codex, Windsurf, OpenCode). Command: `bunx --bun shadcn mcp`. Config files: `.cursor/mcp.json`, `.mcp.json`, `.vscode/mcp.json`, `.codex/config.toml`. Registries: `components.json` (`@orchid`).

If MCP tools are missing, do not assume a single client. Use that harness’s MCP file, or fetch the catalog JSON below.

Search/list **`@orchid` only**. Do not add Button/Dialog/Card from the default shadcn registry.

Fallback catalog (one JSON, do not open every kit file): **https://orchid-ui-hitpay.vercel.app/registry.json** (`items` `registry:ui`, skip `utils`). Item JSON: `https://orchid-ui-hitpay.vercel.app/r/{name}.json`.

Then import `@/orchid-ui/<name>` (`src/components/orchid-ui/`). Open a `.tsx` only after you chose that `name`.

Base UI: `render={<Button />}`, never `asChild` or `@radix-ui/*`. No `src/components/ui`. Never add from `@shadcn` / ui.shadcn.com.

**Orchid first.** Custom → `src/components/<name>.tsx` only if no catalog item fits.

`components.json` has `@orchid`. Missing file:

```bash
bunx shadcn add @orchid/<name>
bunx shadcn add @orchid/all
```

Do not run `shadcn add --all`. That flag only installs the official shadcn kit. Use `@orchid/all`.

```tsx
<Button variant="Primary">Save</Button>
<Button variant="Secondary" style="Border">Cancel</Button>
<Button variant="Primary" type="submit">Submit</Button>
```

`variant` is visual (Primary | Secondary | Destructive). Native HTML type is `type="submit"` (default `button`). Triggers: `nativeButton` + `render={<Button … />}`. Modal always has `title`. Forms: `FieldGroup` + `Field` + `FieldLabel`. Invalid: `data-invalid` on Field, `aria-invalid` on the control. Prefix: `InputGroup` + `InputGroupInput`, never raw Input inside. `flex gap-*`, not `space-y-*`. `className` = layout only. Tokens, not `bg-blue-500`.

Pick: `Select` (short list), `Combobox` (search/multi), `ChoiceCard` (visible cards), `DropdownMenu` (actions). Banner vs `toast` + `Toaster`. Confirm destructive flows with `ConfirmDialog`, not a raw Modal. Dates: `DatePicker`. Mount `Toaster` when using `@orchid/all`. Tabs: `TabsTrigger`. Form blocks: `FormSectionItem`.
