---
description: Pick an Orchid control. Open when choosing a kit component or checking its name/props.
---

# Catalog (pick from disk)

Recipes: **`screens.md`**. Lists/fetch: **`lists.md`**.

The kit **is already installed** at `src/components/orchid-ui/`. Import `@/orchid-ui/<kebab-name>`. `all.tsx` only re-exports `Toaster` + `toast` — do not import screens from `all`.

## How to find the right component

1. Match the user need in **Need → use** below (or the screen recipe).
2. Import from `@/orchid-ui/<file>`. File name = kebab catalog name.
3. If props are unclear, **read that file** (exports + types at the bottom). Do not guess shadcn/Radix APIs.
4. Custom UI → `src/components/<name>.tsx` only if nothing in the table fits. **No Card.**

Do **not** `bunx shadcn add` on first generate. Do **not** copy kit files into `src/components/ui`. Do **not** search the default shadcn registry (Button/Dialog/Card/Sonner).

MCP / remote registry is **last resort**, only if the file is missing from `orchid-ui/`: search **`@orchid` only**, then `bunx shadcn add @orchid/<name>`. Config: `.mcp.json`, `components.json`. Fallback URL: `https://orchid-ui-hitpay.vercel.app/r/{name}.json`. Never `shadcn add --all`. Never `@orchid/all` unless the user asked to reinstall the kit.

No `asChild` / `@radix-ui/*`. Triggers: `nativeButton` + `render={<Button />}`. Visual props are **PascalCase**. Button `type` is HTML only.

## Need → use

| User / spec says | Use | File |
| --- | --- | --- |
| App chrome, iframe layout, sidebar nav | `AppShell` (+ `AppShellNav*` if **more than one** page) | `app-shell` |
| Page heading / status badge in title | `PageTitle` | `page-title` |
| Back + title + actions row | `PageToolbar` | `page-toolbar` |
| List / data table (search, filter, tabs, sort, pager, select, row actions — **already in the kit**) | `SchemaTable` + `useSchemaTable` (`schema.filters`, `search`, `tabs`, …) | `schema-table` |
| Tiny read-only grid (no toolbar) | `Table` | `table` |
| Create / edit fields (most forms) | `SchemaForm` + `useSchemaForm` | `schema-form` |
| Record detail key/values | `DetailList` | `detail-list` |
| Group of fields / settings block | `FormSection` | `form-section` |
| KPI / metric tile | `StatCard` | `stat-card` |
| HitPay customer or beneficiary | `CustomerCard` | `customer-card` |
| Person who is **not** a HitPay customer (staff, vendor) | `ListItem` + `Avatar` | `list-item`, `avatar` |
| Empty customer slot | `CustomerCard variant="Empty"` | `customer-card` |
| Empty page / no rows (not customer slot) | `Empty` (SchemaTable has its own empty) | `empty` |
| Side panel / drawer-like edit | `Sheet` | `sheet` |
| Custom modal | `Dialog` + `DialogContent` (`title` required; no DialogHeader) | `dialog` |
| Delete / warn / yes-no | `ConfirmDialog` | `confirm-dialog` |
| In-page notice | `Alert` above `PageTitle` (`Default` = green, `Grey` = neutral) | `alert` |
| Floating notice | `toast.add` (root already has `Toaster`) | `toast` |
| Short list, one value | `Select` (or SchemaForm `select`) | `select` |
| Searchable / multi select | `Combobox` (or SchemaForm `combobox`) | `combobox` |
| Visible option cards | `ChoiceCard` + `ChoiceCardGroup` | `choice-card` |
| Compact radios / checkboxes | `RadioGroup` / `Checkbox` | `radio-group`, `checkbox` |
| On/off | `Switch` | `switch` |
| Qty stepper | `QuantityInput` | `quantity-input` |
| Prefix/suffix on an input (currency, unit) | `InputGroup` | `input-group` |
| Date in a form | SchemaForm `type: 'date'` | `schema-form` |
| Date + time in a form | SchemaForm `type: 'datetime'` | `schema-form` |
| Date range in a form | SchemaForm `type: 'date-range'` (`from+to` or `{ from, to }`) | `schema-form` |
| Date **outside** SchemaForm | `DatePicker` | `date-picker` |
| Date + time **outside** SchemaForm | `DateTimePicker` | `date-picker` |
| Date range **outside** SchemaForm | `DatePickerRange` | `date-picker` |
| Menu of **actions** (not a field value) | `DropdownMenu` | `dropdown-menu` |
| Tabbed panels | `Tabs` | `tabs` |
| Several expand sections | `Accordion` | `accordion` |
| One expand panel | `Collapsible` | `collapsible` |
| Status token | `Badge` | `badge` |
| Copy to clipboard | `CopyButton` | `copy-button` |
| Icon cluster | `IconGroup` | `icon-group` |
| Known-progress bar | `Progress` | `progress` |
| Indeterminate wait on a control | `Spinner` | `spinner` |
| Layout placeholder | `Skeleton` | `skeleton` |
| Hint on hover | `Tooltip` | `tooltip` |
| Page path | `Breadcrumb` | `breadcrumb` |
| Standalone pager (prefer SchemaTable chrome) | `Pagination` | `pagination` |
| Anchored extra UI | `Popover` | `popover` |
| In-form calendar (usually DatePicker) | `Calendar` | `calendar` |
| Command palette | `Command` | `command` |
| Shortcut glyph | `Kbd` | `kbd` |
| Bounded inner scroll | `ScrollArea` | `scroll-area` |
| Divider | `Separator` | `separator` |
| Range slider | `Slider` | `slider` |

Command / Kbd / Slider / Progress / Accordion / Calendar / Popover / ScrollArea are **optional**. Do not use them as the default form path — SchemaForm first.

ChoiceCard is **radio-like**, not a layout Card. Surfaces that look like cards: `StatCard`, `CustomerCard` (contacts only), `DetailList`, `FormSection`, `ListItem`.

## Old names (do not invent these files)

Not `modal`, `banner`, `chip`, `toggle`, `progress-bar`, `empty-state`, `drawer`, `sonner`, `card`.
