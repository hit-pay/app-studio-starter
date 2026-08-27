---
description: Orchid UI. Open when building screens.
---

# Screens

Orchid is the **global** kit. Browse with **shadcn MCP** ([docs](https://ui.shadcn.com/docs/mcp)): `bunx --bun shadcn mcp`. Config: `.cursor/mcp.json`, `.mcp.json`, `.vscode/mcp.json`, `.codex/config.toml`. Registry in `components.json`: `@orchid` only.

Search/list **`@orchid` only**. Never add Button/Dialog/Card/Sonner from the default shadcn registry. No `src/components/ui`. No `asChild` / `@radix-ui/*`. Triggers: `nativeButton` + `render={<Button />}`.

Fallback catalog (one JSON): **https://orchid-ui-hitpay.vercel.app/registry.json** (`items` `registry:ui`, skip `utils`). Item: `https://orchid-ui-hitpay.vercel.app/r/{name}.json`. Ignore names that are not in that `items` list.

Import `@/orchid-ui/<name>` (`src/components/orchid-ui/`). Open a kit `.tsx` only after you chose `name`.

**Orchid first.** Custom → `src/components/<name>.tsx` only if no catalog item fits. There is **no Card** in Orchid (`ChoiceCard` is a radio; `StatCard` / `CustomerCard` / `DetailList` are the surfaces).

```bash
bunx shadcn add @orchid/<name>
bunx shadcn add @orchid/all
```

Do not run `shadcn add --all` (official kit). `@orchid/all` is `registryDependencies`; `all.tsx` only re-exports `Toaster` + `toast` for the app root.

## Catalog (`@orchid/…`)

Primitives: `button`, `dropdown-menu`, `badge`, `accordion`, `progress`, `avatar`, `tooltip`, `tabs`, `choice-card`, `stat-card`, `detail-list`, `icon-group`, `copy-button`, `skeleton`, `dialog`, `toast`, `separator`, `popover`, `calendar`

Forms: `field`, `label`, `input`, `input-group`, `textarea`, `select`, `combobox`, `quantity-input`, `checkbox`, `radio-group`, `switch`, `slider`, `date-picker`, `form-section`

Blocks: `alert`, `list-item`, `empty`, `customer-card`, `page-toolbar`, `page-title`, `confirm-dialog`, `schema-form`

Old names are gone: not `modal`, `banner`, `chip`, `toggle`, `progress-bar`, `empty-state`.

## Props (do not mix with shadcn)

PascalCase visual values: `variant="Primary"`, `style="Border"`, `size="Small"`.

| Prop | Meaning |
| --- | --- |
| Button `variant` | Primary \| Secondary \| Destructive |
| Button `style` | Default \| Border \| Transparent |
| Button `type` | HTML submit \| button \| reset only |
| Badge `style` | Background \| Border \| Transparent (`color` is the hue) |
| UserBadge `role` | Owner \| Admin \| Manager \| Cashier |
| Empty / Avatar / Tabs `variant` | Empty: Default\|Search\|Upgrade. Avatar: Default\|Business\|Image. Tabs: Default\|Pills |
| Field `orientation` | Vertical \| Horizontal \| Responsive |
| ListItem `layout` | Default \| Stack \| Media |
| ConfirmDialog `type` | Delete \| Warning \| Success \| Question (Warning confirm = Continue) |
| ConfirmDialog `confirmType` | Button `variant` |
| Alert / toast color | Alert `color="Default"` is **green**. Neutral = `Grey`. Toast: `toast.add({ type: 'success' })` not `toast()` |

```tsx
<Button variant="Primary">Save</Button>
<Button variant="Secondary" style="Border">Cancel</Button>
<Button variant="Primary" type="submit">Submit</Button>
<DialogTrigger nativeButton render={<Button variant="Primary" />}>Open</DialogTrigger>
```

`DialogContent` is packed (`title` required). Do not invent DialogHeader/Footer/Title.

Forms: `FieldGroup` + `Field` + `FieldLabel`. Invalid: `data-invalid` on Field, `aria-invalid` on the control. Prefix: `InputGroup` + `InputGroupInput`. `flex gap-*`, not `space-y-*`. `className` = layout only. Tokens, not `bg-blue-500`.

Pick: `Select` (short list), `Combobox` (search/multi), `ChoiceCard` (visible cards), `DropdownMenu` (actions). In-page: `Alert` above `PageTitle`. Floating: `toast` + `Toaster`. Destructive: `ConfirmDialog`. Dates: `DatePicker`. Page chrome: `PageToolbar` then `PageTitle` (`badge` slot). Zero rows: `Empty`. No customer: `CustomerCard variant="Empty"`.

SchemaForm: `showIf` / `showIfValue`, `hidden: true` (value still submits), `maxLength`, pair keys `a+b`. Types include `date`, `quantity`, `switch`. Mount `Toaster` when using toasts or `@orchid/all`.
