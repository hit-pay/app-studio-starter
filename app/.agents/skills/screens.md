---
description: Screen recipes for Orchid. Open when building any page, list, form, detail, or layout.
---

# Screens

Read this first. Then **`components.md`** if you need to pick a control. Then `lists.md` if the page has SchemaTable.

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

`AppShell` fills that pane (`h-full` of `html`/`body`). **No** outer border, radius, or shadow on the app. Do not wrap the page in another Card/frame. Do not rebuild the host sidebar.

```
AppShell header             — full width above nav (PageTitle / PageToolbar)
  nav | main                — several pages; omit nav for one screen
```

Pass `nav` when the user asks for **more than one page**, using `AppShellNav` / `AppShellNavGroup` / `AppShellNavItem` with `active` on the current route (pill like the HitPay dashboard). One screen → omit `nav`. **Never** put a login/user card in AppShell — the host already shows who is signed in. Do not rebuild the HitPay icon rail.

`CustomerCard` = HitPay customer/beneficiary only. Staff, vendor, member = `ListItem` + `Avatar`. Empty customer slot = `CustomerCard variant="Empty"`, not `Empty`.

## List (always SchemaTable)

CRUD / search / filter / sort / select / row actions = **`SchemaTable`**. Never `Table` + homemade toolbar. `Table` is a tiny read-only grid only.

```tsx
const table = useSchemaTable({ schema, data: rows })
return (
  <>
    <PageTitle title="Products" actions={<Button variant="Primary">Add</Button>} />
    <SchemaTable table={table} selectionActions={…} emptyActions={…} />
  </>
)
```

Fetch: `lists.md`. Default `mode: 'client'` + `#/lib/query` (`useQuery`, `staleTime` already on the root client). `mode: 'server'` only for large/paginated APIs.

## Form

`SchemaForm` + `useSchemaForm({ fields })`. Do not hand-assemble Field+Input per column unless `renderField`.

Create/edit page: `PageToolbar` + `PageTitle` + `SchemaForm` + submit `Button type="submit"`. Side edit: `Sheet` wrapping SchemaForm. Short confirm: `ConfirmDialog`. Custom modal: `Dialog` + `DialogContent` (`title` required; no DialogHeader).

## Detail

`PageToolbar` + `PageTitle` (`badge` = status Badge) + `DetailList`. Edit in `Sheet` or navigate to form. Delete = `ConfirmDialog type="Delete"`. Role checks on **server** too (`hitpay.md`).

## Field type → table column

| SchemaForm `type` | SchemaTable column `type` |
| --- | --- |
| input, phone, textarea, select, combobox | text |
| date, datetime | date |
| quantity, input-group amount | amount |
| switch / status-like select | status |
| file | do not show file bytes; show text name |
| image URL | image |

Form extras: `datetime`, `file` (one `File`; storage is not in the kit). Dates without time = `date`.

## Feedback + empty

In-page: `Alert` above `PageTitle` (`color="Default"` is green; `Grey` is neutral). Floating: `toast.add`. Load: `Spinner` on the action, `Skeleton` for layout — not a spinner over a table that already has rows. Zero rows: `Empty` inside SchemaTable.

## Fetch

Do not `useEffect`+`fetch` for lists. Use `#/lib/query` (`QueryProvider` is on the root). Persist: `createServerFn` + `#/lib/db`. Collections: only if you wire them — `lists.md`.
