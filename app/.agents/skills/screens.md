---
description: Screen recipes for Orchid. Open when building any page, list, form, detail, or layout.
---

# Screens

Read this first. Then **`components.md`** if you need to pick a control. Then `lists.md` if the page has SchemaTable (not for a simple `ListItem` list).

Orchid is the **only** kit. Files live in `src/components/orchid-ui/`. Import `@/orchid-ui/<name>`. Do not `shadcn add` unless that file is missing. No shadcn Card/Button/Dialog/Sonner. No `asChild`. Triggers: `nativeButton` + `render={<Button />}`. There is **no generic Card** — use FormSection, DetailList, StatCard.

## Wrong vs right

```tsx
// wrong
<Button variant="outline" type="Primary">Save</Button>
<Button variant="ghost">Cancel</Button>
toast('Saved')

// right
<Button variant="Primary" type="submit">Save</Button>
<Button variant="Secondary" style="Border">Cancel</Button>
toast.add({ title: 'Saved', type: 'success' })
```

`Button type` is HTML (`submit` | `button` | `reset`) only. Visuals are PascalCase (`Primary`, `Border`, `Small`).

## Layout

The app is **always** an iframe inside the HitPay dashboard (host already has icon rail, Apps header, Draft/Build, and a border around the pane).

`AppShell` fills that pane (`h-full min-h-full w-full` by default — do not add `min-h-0` on the shell). **No** outer border, radius, or shadow on the app. Do not wrap the page in another Card/frame. Do not rebuild the host sidebar (hamburger, Apps, Draft/Build). Those belong to HitPay, not this iframe.

```
AppShell header             — PageTitle / PageToolbar
  tabs                      — **modules** only (e.g. Count vs History); omit for one screen
  main                      — first view is the data list
```

Pass `tabs` when the user asks for **more than one module** (not for create/edit). Use `AppShellNav` / `AppShellNavItem` with `active`. Do **not** use a sidebar. One module → omit `tabs`. Tabs scroll horizontally on mobile. **Never** put a login/user card in AppShell. Do not rebuild the HitPay icon rail.

`CustomerCard` = HitPay customer/beneficiary only. Staff, vendor, member = `ListItem` + `Avatar`. Empty customer slot = `CustomerCard variant="Empty"`, not `Empty`.

## First view is data (not a form)

CRUD starts on a **list of records**. Add/Edit opens a **centered modal**. Do **not** add an AppShell tab named Create/Edit/New, and do **not** add routes like `/products/new` unless the user asked for a full-page form.

**Which list**

| Complexity | Use |
| --- | --- |
| Simple: few rows, title + subtitle/meta, no search/filter/sort/select | `ListItem` (people: + `Avatar`). Empty: `Empty` + Add |
| Rich list: many columns, search, filters, sort, pager, bulk select | `SchemaTable` (`lists.md`) |

`Table` alone is a tiny read-only grid (no chrome). SchemaTable already has search/filter/sort/pager — do not rebuild those.

```tsx
<PageTitle title="Products" actions={<Button variant="Primary" onClick={() => setOpen('create')}>Add</Button>} />
<SchemaTable table={table} emptyActions={…} onRowAction={(action, row) => { /* edit → dialog */ }} />
<Dialog open={open != null} onOpenChange={() => setOpen(null)}>
  <DialogContent title="Product" confirmLabel="Save" onConfirm={() => void form.submit()}>
    <SchemaForm form={form} />
  </DialogContent>
</Dialog>
```

Simple variant: map rows to `ListItem`; click or a trailing button opens the same Dialog.

## Create / edit (centered Dialog — not a page, not a right Sheet)

`SchemaForm` + `useSchemaForm({ fields })`. Do not hand-assemble Field+Input per column unless `renderField`.

HitPay dashboard create/edit is almost always a **centered modal**.

| Form | Overlay |
| --- | --- |
| Default create/edit | `Dialog` + `DialogContent` (`title` required; no DialogHeader) + SchemaForm |
| Very short confirm | `ConfirmDialog` |
| Rare: long complementary panel (filters, peek detail) | `Sheet` — **not** the default for create/edit |

Submit via `DialogContent` `onConfirm` → `form.submit()`, or a `Button type="submit"` inside the dialog. `PageToolbar` + full-page SchemaForm only if the **user asked** for a dedicated form screen.

AppShell **tabs** = different modules (e.g. Count vs History), never “List” vs “Create”.

## Detail

Read-only summary can stay on the list (row click) or a **Dialog** with `DetailList`. Use `Sheet` only if you need a persistent side peek. `PageTitle` `badge` = status. Delete = `ConfirmDialog type="Delete"`. Role checks on **server** too (`hitpay.md`).

## List chrome (SchemaTable only)

```tsx
const table = useSchemaTable({ schema, data: rows })
return (
  <>
    <PageTitle title="Products" actions={<Button variant="Primary">Add</Button>} />
    <SchemaTable table={table} selectionActions={…} emptyActions={…} />
  </>
)
```

Fetch: `lists.md`. Default `mode: 'client'` + `#/lib/query`. `mode: 'server'` only for large/paginated APIs.

## Field type → table column

| SchemaForm `type` | SchemaTable column `type` |
| --- | --- |
| input, phone, textarea, select, combobox | text |
| date, datetime | date |
| date-range | two date columns, or skip in the table |
| quantity, input-group amount | amount |
| switch / status-like select | status |
| file | do not show file bytes; show text name |
| image URL | image |

Form extras: `date`, `datetime`, `date-range`, `file` (one `File`; storage is not in the kit). Dates without time = `type: 'date'` on SchemaForm — do not drop in a raw `DatePicker`.

## Feedback + empty

In-page: `Alert` above `PageTitle` (`color="Default"` is green; `Grey` is neutral). Floating: `toast.add`. Load: `Spinner` on the action, `Skeleton` for layout — not a spinner over a table that already has rows. Zero rows: `Empty` (SchemaTable `emptyActions`, or above a `ListItem` list).

## Fetch

Do not `useEffect`+`fetch` for lists. Use `#/lib/query` (`QueryProvider` is on the root). Persist: `createServerFn` + `#/lib/db`. Collections: only if you wire them — `lists.md`.
