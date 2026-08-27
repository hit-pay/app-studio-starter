# Orchid UI (kit)

One kebab-case file → `@orchid/<name>` → import `@/orchid-ui/<name>` (apps) or `@/components/ui/<name>` (this repo).

## Do not use

`asChild`, `@radix-ui/*`, shadcn `variant="outline"|"ghost"|"destructive"` (lowercase), `Card` from shadcn, Sonner `toast()`. No `DialogHeader` / `DialogFooter` / `DialogTitle` exports.

Triggers: `render={<Button />}` and `nativeButton` when the trigger is a button.

Visual props are **PascalCase** (`Primary`, `Small`, `Border`, `Pills`, `Horizontal`). Exceptions: HTML `type` on Button/Input; Separator and `ScrollBar` `orientation` (`horizontal` | `vertical`); Avatar `size` is 24 | 28 | 32 | 40 | 48 | 64.

`type` means HTML only on Button (`submit` | `button` | `reset`). ConfirmDialog `type` is intent (Delete | Warning | Success | Question). UserBadge uses `role`. Toast `toast.add({ type: 'success' })` maps to colors (Default/green, Blue, Orange, Red, Grey).

## Button

- `variant`: Primary | Secondary | Destructive
- `style`: Default | Border | Transparent
- `size`: Small | Default | Big
- `type`: native submit | button | reset

## Which control

| Need | Use |
| --- | --- |
| Short list, one value | `Select` |
| Search / multi | `Combobox` (`ComboboxChip` stays a Base UI chip) |
| Visible cards | `ChoiceCard` + `ChoiceCardGroup` |
| Actions, not a value | `DropdownMenu` |
| In-page notice | `Alert` (`color="Default"` = green; `Grey` = neutral). Place above `PageTitle`. |
| Floating notice | `toast.add({ title, description, type })` + root `Toaster` |
| Custom overlay | `Dialog` + `DialogContent` (`title` required; packed footer) |
| Side / edge panel | `Sheet` (`side` Right\|Left\|Top\|Bottom). Not a swipe Drawer. |
| Command palette | `CommandDialog` + `Command` + `CommandInput` + `CommandItem` |
| Shortcut keys | `Kbd` / `KbdGroup` |
| One expand panel | `Collapsible` (several sections: `Accordion`) |
| Bounded custom scroll | `ScrollArea` (page: native overflow) |
| Page path | `Breadcrumb` |
| List pages | `Pagination` (`PaginationInfo` for the range label) |
| Table chrome | `Table` (div layout, not HTML `<table>`). This is the surface Schema Table / DataTable will render into — do not add a second table primitive. Checkbox sticky left, Icon/actions sticky right and hover-only. Drag the vertical border to resize. |
| Indeterminate load | `Spinner` (Skeleton = placeholder; Progress = known total) |
| Delete / warn / yes-no | `ConfirmDialog` (Warning confirm = Continue) |
| Date | `DatePicker` (`Popover` + `Calendar` only if composing) |
| Empty page/list | `Empty` (`variant` Default \| Search \| Upgrade) |
| Empty customer slot | `CustomerCard variant="Empty"` — not `Empty` |
| On/off | `Switch` |
| Status token | `Badge` (`style` Background \| Border \| Transparent) + `color` |

## Forms

`FieldGroup` > `Field` (`orientation` Vertical \| Horizontal \| Responsive) > `FieldLabel` + control. Invalid: `data-invalid` on Field, `aria-invalid` on the control.

SchemaForm: `showIf` / `showIfValue`, `hidden: true` (or `type: "hidden"`) hides UI and still submits, `maxLength`, `minLength`, `validation` (`email\|max:255\|phone\|valid_url\|accepted` or `/regex/`). Pair keys `amount+currency`. See `SCHEMA_FORM_TYPES` and `SCHEMA_FORM_EXAMPLE_FIELDS`.

Schema Table / DataTable (later): JSON columns + rows, same idea as SchemaForm (`schema-form-model` + renderer). Renderer must compose `Table` / `TableHead` / `TableCell` (`type` Default|Checkbox|Image|Icon|Empty), not a native HTML table. TanStack Table may own sorting/paging/selection state; Orchid `Table` stays the chrome. List pager stays `Pagination`.

## Customer card

`phone` and optional `phoneCountryCode`. Slot is `badge`, not `chip`.
