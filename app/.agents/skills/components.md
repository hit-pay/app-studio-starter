---
description: Orchid UI. Open when building screens.
---

# Screens

Orchid kit only. Import `@/ui/…` → `src/orchid-ui/`. Tokens: `src/styles.css`. `cn()` from `@/lib/utils`. Icons: `lucide-react`. Base UI: `render={<Button />}`, never `asChild` or `@radix-ui/*`. No `src/components/ui`. Never `bunx shadcn add` from `@shadcn` or ui.shadcn.com.

**Orchid first.** Compose kit pieces. Custom → `src/components/<name>.tsx` only if no kit file can do it.

## CLI (kit file missing)

```bash
bunx shadcn add @orchid/<name> --yes
```

Then read `src/orchid-ui/<name>.tsx`. Catalog only if needed: `https://app-studio-starter.vercel.app/registry.json`.

## APIs

```tsx
<Button type="Primary">Save</Button>
<Button type="Secondary" style="Border">Cancel</Button>
```

Button: `type` Primary | Secondary | Destructive (visual; submit = `htmlType`). `style` Default | Transparent | Border. `size` Small | Default | Big. No `isLoading` — `disabled` + label.

Triggers: `DropdownMenuTrigger nativeButton render={<Button type="Secondary" style="Border" />}`.

`TabMenu` → `TabMenuList` → `TabMenuTab`. `Modal` always has `title`. `Avatar`: `size` 24–64, initials as children, `src` for photos. Status: `Chip` / `UserChip`. Empty: `EmptyPage`. Toast: `Snackbar`. Overlay: `Modal` (or `Popover` for small click content).

## Forms & layout

- `FieldGroup` + `Field` + `FieldLabel` + control. Invalid: `data-invalid` on `Field`, `aria-invalid` on the control.
- Prefix/icon in a field: `InputGroup` + `InputGroupInput` / `InputGroupTextarea` + `InputGroupAddon`. Never raw `Input` inside `InputGroup`.
- `flex … gap-*`, not `space-y-*`. Equal box: `size-*`. Long text: `truncate`. Classes: `cn()`.
- `className` on kit = layout only. Colors: tokens (`bg-primary`, `text-muted-foreground`, `text-destructive`), not `bg-blue-500` / `text-emerald-600`. No `dark:` color hacks. No extra `z-index` on Modal / Dropdown / Popover / Tooltip.
- Icons inside Button / menu items: no `size-4` / `mr-2`. Pass icon components (`icon={CheckIcon}`), not string maps.
- `Separator` not `<hr>`.

## Map

| Need | Use |
|---|---|
| Button | `Button` |
| Text / area / select | `Input` `Textarea` `Select` / `SelectMultiple` |
| Prefix, currency | `InputGroup` |
| Checkbox / radio / switch | `Checkbox` `RadioGroup` `Toggle` |
| Date | `DatePicker` `DatePickerRange` |
| Tabs | `TabMenu` |
| Modal | `Modal` |
| Menu / tooltip / popover | `DropdownMenu` `Tooltip` `Popover` |
| Status | `Chip` `UserChip` |
| Empty | `EmptyPage` |
| Toast | `Snackbar` |
| List / metric / customer | `ListItem` `OverviewItem` `CustomerCard` |
| Page chrome | `SubHeader` `PageTitle` `BoxDetail` `GroupIcon` |

Kit: `button` `dropdown-menu` `snackbar` `chip` `accordion` `progress-bar` `list-item` `input-stepper` `avatar` `tooltip` `copy-tooltip` `tab-menu` `clickable-option` `overview-item` `sub-header` `page-title` `box-detail` `group-icon` `customer-card` `checkbox` `radio-group` `toggle` `slider` `empty-page` `modal` `label` `separator` `field` `input` `textarea` `select` `input-group` `popover` `calendar` `date-picker`.
