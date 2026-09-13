<a id="choice-card"></a>
# Choice Card

Selectable cards with left or center icon, no radio dot.
Source file: `src/components/choice-card.tsx`.




<a id="customer-card"></a>
# Customer Card

Small, Big, and Float customer or beneficiary cards.
Source file: `src/components/customer-card.tsx`.




<a id="date-picker"></a>
# Date Picker

Date, range, and date-time selection with popover and calendar helpers.
Source file: `src/components/date-picker.tsx`.

Use `DatePicker`, `DatePickerRange`, or `DateTimePicker`. Do not import `@ui/form/calendar`.


<a id="select"></a>
# Select

Props picker for a closed list or a searchable / multi select.
Source file: `src/components/select.tsx`.

One props-driven picker. Do not import `@ui/form/combobox` children.

- Default is a closed list.
- `searchable` — type to filter.
- `multiple` — chips. Value is `string[]`.
- `size`: `default` | `sm` | `inline` (input-group addon).

In Form Builder, `type: "select"` is this block without search. `type: "combobox"` is the same block with `searchable`.


<a id="staff-select"></a>
# Staff Select

App-member dropdown. Docs use a fake staff-app-members API.
Source file: `src/components/staff-select.tsx`.

App-member dropdown. Fetches `GET /api/apps/{appId}/staff-app-members` (same as App Studio). Docs serve a fake response for that path.

Do not fetch staff on the screen. Do not call `/v1/staffs`. Persist `id` plus name snapshot. Optional: `multiple`, `roleTitles`, `locationId`.


<a id="role-select"></a>
# Role Select

Business role dropdown. Docs use a fake roles API.
Source file: `src/components/role-select.tsx`.

Business role dropdown. Fetches `GET /api/apps/{appId}/roles` (same as App Studio). Docs serve a fake response for that path.

Gate buttons with `useHitPayUser().user.role.title`. Use this select only to store a role id.


<a id="coupon-select"></a>
# Coupon Select

Coupon dropdown. Loads GET /v1/coupons.
Source file: `src/components/coupon-select.tsx`.

Coupon dropdown. Loads `GET /v1/coupons`. Do not call `list-coupons` on the screen.

Persist `id` plus name snapshot. Optional: `multiple`.


<a id="discount-select"></a>
# Discount Select

Discount dropdown. Loads GET /v1/discounts.
Source file: `src/components/discount-select.tsx`.

Discount dropdown. Loads `GET /v1/discounts`. Do not call `list-discounts` on the screen.

Persist `id` plus name snapshot. Optional: `multiple`.


<a id="tax-select"></a>
# Tax Select

Tax dropdown. Loads GET /v1/taxes.
Source file: `src/components/tax-select.tsx`.

Tax dropdown. Loads `GET /v1/taxes`. Do not call `list-taxes` on the screen.

Persist `id` plus name snapshot. Optional: `multiple`.


<a id="shipping-select"></a>
# Shipping Select

Shipping method dropdown. Loads GET /v1/shipping.
Source file: `src/components/shipping-select.tsx`.

Shipping method dropdown. Loads `GET /v1/shipping`. Do not call `list-shipping` on the screen.

Persist `id` plus name snapshot. Optional: `multiple`.


<a id="pickup-select"></a>
# Pickup Select

Pickup dropdown. Loads GET /v1/pickups.
Source file: `src/components/pickup-select.tsx`.

Pickup dropdown. Loads `GET /v1/pickups`. Do not call `list-pickups` on the screen.

Persist `id` plus name snapshot. Optional: `multiple`.


<a id="product-category-select"></a>
# Product Category Select

Category dropdown. Loads GET /v1/product-category.
Source file: `src/components/product-category-select.tsx`.

Product category dropdown. Loads `GET /v1/product-category`. Do not call `list-product-categories` on the screen.

Persist `id` plus name snapshot. Optional: `multiple`.


<a id="location-select"></a>
# Location Select

Location dropdown. Loads GET /v1/locations.
Source file: `src/components/location-select.tsx`.

Location dropdown. Loads `GET /v1/locations`. Do not call `list-locations` on the screen.

Persist `id` plus name snapshot. Optional: `multiple`.


<a id="detail-card"></a>
# Detail Card

Read-only key/value card for one record. Not a collection.
Source file: `src/components/detail-card.tsx`.

Use `DetailCard` for a read-only key/value view of **one** record (invoice, leave request,
customer). Use `DataList` or `DataTable` for collections. Do not assemble label/value stacks
from `Card`.


<a id="empty"></a>
# Empty

Props empty state with optional media and actions.
Source file: `src/components/empty.tsx`.

One props-driven empty state. Do not import `@ui/displaying-data/empty` children.

- `title` is required.
- `media`: `icon` | `search` | `upgrade`. Omit for text only.
- `icon` overrides the default media glyph.
- `actions` is `{ key, label, variant?, disabled?, icon? }[]`.


<a id="data-list"></a>
# Data List

Card/row collection when search, filters, sort, or pagination are not needed.
Source file: `src/components/data-list.tsx`.

Pass **`items` only**. Do not import row primitives. Do not
use `DataTable` unless the list needs search, filters, sort, or pagination.
Do not wrap `DataList`.


<a id="quantity-input"></a>
# Quantity Input

Minus/plus stepper; click the value to type.
Source file: `src/components/quantity-input.tsx`.




<a id="text-editor"></a>
# Text Editor

Lexical rich text: bold, italic, heading, lists. Persist editor JSON.
Source file: `src/components/text-editor.tsx`.

Rich text for notes and handover, built with [Lexical](https://lexical.dev/) (Meta). Toolbar: bold, italic, underline, heading, lists. Use `Textarea` for a single plain field.

`onValueChange` receives Lexical editor state. Store it as JSON text. Do not persist HTML.


<a id="metric-card"></a>
# Metric Card

Dashboard KPI tile. Use for summaries, not a record's fields.
Source file: `src/components/metric-card.tsx`.

Use `MetricCard` for dashboard KPIs (revenue, volume, counts). Use `DetailCard` for a
record's fields.


<a id="app-layout"></a>
# App Layout

HitPay App Studio embedded pane frame. Not generic app chrome.
Source file: `src/components/app-layout.tsx`.

`AppLayout` is the HitPay App Studio embedded pane frame. Use it around
every route inside the dashboard iframe — not as generic website chrome.
Put `PageLayout` or `FormLayout` inside for page chrome.

Pass `navigationItems` for in-app tabs. `variant` can stay `default` or
`tabs`.

`variant="sidebar"` plus `sidebarItems` adds a flat child nav. On small
screens the list opens in a drawer.


<a id="page-layout"></a>
# Page Layout

Standard route page with header, optional onBack, and scrollable content.
Source file: `src/components/page-layout.tsx`.

`PageLayout` renders its required header and wraps its children in a scrollable content area.
The `actions` prop accepts any React node so pages can provide the controls they need.
Pass `onBack` on nested screens (show/edit) to put a back control beside the title. Omit it on the root list.


<a id="form-layout"></a>
# Form Layout

Create and edit form shell with page and modal modes.
Source file: `src/components/form-layout.tsx`.

`FormLayout` is the shell for create and edit forms. It provides page or modal
presentation, headings, scrolling, close behavior, and actions. `FormBuilder`
renders the fields inside that shell.

Page mode is the default. Save submits the external form identified by
`formId`; the submit button does not need to live inside `FormBuilder`.

Modal mode preserves controlled dialog semantics through `open` and
`onOpenChange`. `size` and `persistent` are available only in modal mode.

Both actions are rendered by default. Cancel calls `onClose`; in modal mode it
then closes the controlled dialog. Save submits `formId`. Each action supports
custom `label`, `icon`, `onClick`, `disabled`, and `loading` values.


<a id="form-builder"></a>
# Form Builder

Schema-driven create/edit form. Use Detail Card for a read-only record.
Source file: `src/components/form-builder.tsx`.

Use `FormBuilder` for multi-field create/edit. Use `DetailCard` for a read-only record.
Unknown `type` values throw. Use only the listed FormBuilder types. Render inside `FormLayout`. Do not wrap in `Card`.

`SchemaForm` accepts `onChange?: (values: SchemaFormValues, change: SchemaFormChange) => void`.
It runs once for each user interaction, after constructing the latest nested values snapshot. It
does not run on the initial render or when props rerender.

`change.path` is the primary changed path, `change.paths` contains every path changed by that
interaction, and `change.value` / `change.previousValue` describe the primary value. The
`changedValues` and `previousValues` records contain path-keyed metadata for every changed value,
while `change.field` identifies the related flattened schema field.

Paired controls such as `amount+currency`, `from+to`, and range sliders emit one callback per
interaction. When both values change together, both paths are included in `change.paths`. Custom
`renderField` controls use the same behavior when their `onChange` writes a paired object.

Submission remains external. Configure submission through `useSchemaForm({ onSubmit })`, assign an
`id` to the form, and point an external button at that id:

`columns` creates a responsive grid: one column on small screens, then the configured number of columns at the appropriate breakpoints. Rules can target fields by name or control type.

Span priority is `props.colSpan`, `layout.fields`, `layout.types`, then one column. `section` and `section-item` fields always span the full row.

Use `type: "choice-card"` for a single card-style choice. Each option can include a `description`. The stored value is the selected `option.value`.

`props.alignment` is `Vertical` (default) or `Horizontal`. `props.cardAlignment` is `Left` (default) or `Center`.

Use `type: "staff"` and `type: "role"` for HitPay app members and business roles. Use `type: "coupon"` / `"discount"` / `"tax"` / `"shipping"` / `"pickup"` / `"product-category"` / `"location"` for those HitPay dropdowns. They render the matching Select. The stored value is `{ id, name }` (or an array when `props.multiple` is true).

Do not fetch staff or roles on the screen. Optional staff `props`: `multiple`, `roleTitles`, `locationId`.


<a id="data-table"></a>
# Data Table

Rows-and-columns table with search, filters, sort, and pagination.
Source file: `src/components/data-table.tsx`.

Use `DataTable` when the collection needs search, filters, sorting, pagination,
row selection, or row actions. The table already renders its search, filter,
sort, pagination, and column-visibility controls from the schema. Do not build
those controls separately.

Use `DataTable` when the list needs search, column filters, sorting, or pagination.
Use `DataList` for compact collections without those tools, and `DetailCard` for one record.
Put `DataTable` directly in `PageLayout`. Do not wrap it in `Card`.

`DataTable` already includes a filter button and filter popover. Do not build a
separate filter row or a custom `Select` outside the table. Define the available
filters in `schema.filters`; the table applies all active filters together.

Configure `selectionActions` and `emptyState.actions` in the schema. The config is JSON-friendly:
it contains keys, labels, supported icon keys, variants, disabled state, and dropdown items—but
never functions or React nodes. `onSelectionAction` receives the selected IDs snapshot and the
chosen button or dropdown leaf item. `onEmptyAction` receives the chosen empty-state action.

`editColumns` is the optional column-visibility popover (`true` to show it; default off). Set `rowActions` to `["edit"]`,
`["delete"]`, or both when the list needs the row ⋮ menu. Pass `onRowAction`.
That menu opens `FormLayout` for multi-field edits. Neither `editColumns` nor
`type: "status"` makes a cell editable.

`onRowClick(row)` opens the record (detail / show page) from a browse list. Clicks on
checkboxes, the row ⋮ menu, links, and `cells` controls do not fire it. Do not put
`DataTable` inside `FormLayout`.

One-field updates (status, assignee, stage) use `cells` on `DataTable`, not the schema.
Search, sort, and filters still use `row[column.key]`. Only listed keys override; other
columns keep the built-in `type` render (`status` is a read-only badge until overridden).

Each filter has a `key`, display `title`, and exact-match `options`. The option
`value` must match the row value for that key; `label` is only the text shown
in the popover and active-filter chip. Multiple configured filters are combined
with AND logic. Clearing a filter removes its key from `table.query.filters`.

In `mode: "client"` (the default), filtering is performed against the loaded
`data` rows. In `mode: "server"`, the table does not filter or sort rows
locally; handle `query.filters` in `onQueryChange` and fetch the filtered page
from your data source. The callback receives `change.key === "filters"` when
the user applies or clears filters.

`onQueryChange(query, change)` receives the final query after page-reset rules and a typed
discriminated change payload. The `change.key` is one of `search`, `tab`, `filters`, `sort`,
`page`, or `pageSize`, with the corresponding value fields.

In server mode, search callbacks are debounced by 300ms while `table.query.search` updates
immediately, keeping the input responsive. Configure the delay with
`search: { placeholder: "Search products", debounceMs: 500 }`. Client-mode search remains
instant. Clearing search cancels pending work and emits immediately.


<a id="confirmation-modal"></a>
# Confirmation Modal

Prebuilt Promise-based confirmation modal invoked with useConfirmationModal.
Source file: `src/components/confirmation-modal.tsx`.

Mount `ConfirmationModalProvider` once at the app root. Call `useConfirmationModal()` from `@/components/overlays/confirmation-modal` for delete/warning confirms. Do not assemble a confirm dialog from `Dialog`.


<a id="resource-picker"></a>
# Resource Picker

Search and select HitPay products, customers, orders, charges, invoices, or add-ons.
Source file: `src/components/resource-picker.tsx`.

Use `ResourcePicker` only when the user adds or selects HitPay catalog records:
`product`, `customer`, `order`, `charge`, `invoice`, or `add-on`. Use the
dedicated `*Select` components for categories, locations, coupons, discounts,
taxes, shipping, and pickups.

The picker is not a page table. Do not call `list-*` from a screen to render
rows. Confirmed results must be sent to a server function and persisted to
Turso; cancelled results are `undefined`.

`ResourcePicker` is a promise-based picker for HitPay catalog records. It is not a
general-purpose table and it is not a data source for rendering a page list.
Use it when a user must add or select products, customers, orders, charges,
invoices, or add-ons.

The docs demo is self-contained: it mounts `ResourcePickerProvider` with a fake
loader. In an application, mount the provider **once** at the app root and pass
an authorized server-backed `load` function. Do not mount another provider in a
route.

The promise resolves to selected records, or `undefined` when the user cancels.
Each result keeps the HitPay row in `resource`; persist that payload instead of
re-fetching the selected id.

Do not rebuild a search `Dialog` or call `list-*` from the screen. After confirm,
send `selected` into a `createServerFn` and upsert Turso from `id` plus the
needed fields in `resource`. The picker is the only UI allowed to browse these
HitPay list APIs.

`type` is one of `product`, `customer`, `order`, `charge`, `invoice`, or
`add-on`. Category, location, coupon, discount, tax, shipping, and pickup use
their dedicated Select components, not this picker.

`ResourcePickerProvider` requires a `load` callback. The callback receives the
current search state and must return normalized picker rows:

The loader owns the mapping from the HitPay API envelope to
`{ items, hasMore, cursor? }`. Each item needs an `id` and `title`; it may also
include `image`, `badge`, `resource`, and selectable `children`.

In App Studio, use the existing root provider and loader from
`#/lib/resource-picker`. Do not remount `ResourcePickerProvider` and do not copy
the docs-only `resource-picker-fake` module into the app.

The docs demo calls `fakeHitPayListPayload(input)` in `orchid/src/lib/resource-picker-fake.ts`. It applies the same `query` / `filter` / `extras` the starter sends to `/v1/…` (status, stock, channel, category, location, dates), then `mapResourcePickerPayload`. Do not paste that module into App Studio.

`shadcn add @orchid/resource-picker` installs the picker UI only. It does not
ship a HitPay API loader or `mapResourcePickerPayload`. In App Studio, the real
loader is `#/lib/resource-picker.ts`; map the API `data[]` with the existing
mapper before returning the normalized page.

Result after confirm: `{ id, resource?, children? }[]`. `resource` is the
original HitPay row. `children` is used for product variations or other nested
choices.

- `action`: `add` (default) or `select`
- `multiple`: omit/`false` = one, `true` = unlimited, number = cap
- `query`: initial search
- `selectionIds`: preselected `{ id, children?: { id }[] }`
- `filter.status`: initial status (product, order, invoice, charge)
- `filter.variants`: `false` hides product variations
- `filter.locationId`: initial outlet for product (`location_ids`) and order (`location_ids[]`) pickers
- `filter.categoryId`: initial category for product picker (`GET /v1/products` `categories`)
- `filter.channel`: initial channel for product (`pos` / `online_store` / `invoice` / `self_serve`) or order (`point_of_sale` / `quick_sale` / `store_checkout`)
- Dialog also shows type-specific extras: product **Stock** + **Channel** + **Category** + **Location**, order **Channel** + **Location**, charge **Method**
- `load` receives `{ type, query, filter, extras, page, cursor }`. `filter` is the selected status string; `extras` contains type-specific filters such as `inventory`, `channel`, `location_id`, `category_id`, `payment_method`, `date_from`, and `date_to`.
- `load` must return `{ items, hasMore?, cursor? }`; set `hasMore` when another page can be loaded
- When `hasMore` is true, the dialog shows **Load more** plus the resource name and appends the next page
- Cancel returns `undefined`


<a id="command"></a>
# Command

Searchable command palette. Drive it with open, onOpenChange, and groups.
Source file: `src/components/command.tsx`.

Use `Command` from `@/components/overlays/command` with `open`, `onOpenChange`, and `groups`. Do not assemble a palette from `Dialog` plus cmdk primitives.


<a id="copy-button"></a>
# Copy Button

Copy icon that writes a value and shows Copied!.
Source file: `src/components/copy-button.tsx`.

Icon that copies `value` and shows `Copied!`.


<a id="button"></a>
# Button

Standard variants, sizes, icon buttons, native props, and polymorphic rendering.
Source file: `src/ui/button.tsx`.




<a id="button-group"></a>
# Button Group

Attached controls, plus ghost and border icon toolbars. Compose overflow with DropdownMenu.
Source file: `src/ui/button-group.tsx`.

Use `variant="ghost"` for a loose icon toolbar (Default). Use `variant="border"`
for the same toolbar inside a framed group; dividers render between children
automatically. Compose overflow actions with `DropdownMenu` and links with a
polymorphic `Button`.


<a id="dropdown-menu"></a>
# Dropdown Menu

Items, selection, submenus, and shortcuts with Orchid styling.
Source file: `src/ui/dropdown-menu.tsx`.




<a id="toast"></a>
# Toast

Toast manager with semantic types, actions, close, and placement.
Source file: `src/ui/toast.tsx`.




<a id="banner"></a>
# Banner

In-page notification with semantic variants and an optional action.
Source file: `src/ui/banner.tsx`.




<a id="badge"></a>
# Badge

Standard variants with Orchid tones, appearances, removal, and user roles.
Source file: `src/ui/badge.tsx`.




<a id="avatar"></a>
# Avatar

Image, fallback, badge, and group primitives with Orchid styling.
Source file: `src/ui/avatar.tsx`.




<a id="tooltip"></a>
# Tooltip

Hover and focus tooltip with Orchid styling.
Source file: `src/ui/tooltip.tsx`.




<a id="tabs"></a>
# Tabs

Horizontal or vertical tabs with default and line variants.
Source file: `src/ui/tabs.tsx`.




<a id="skeleton"></a>
# Skeleton

Placeholder pulse with Orchid styling.
Source file: `src/ui/skeleton.tsx`.




<a id="spinner"></a>
# Spinner

Indeterminate loading icon sized through className.
Source file: `src/ui/spinner.tsx`.




<a id="dialog"></a>
# Dialog

Dialog primitives with Orchid sizes and persistent mode.
Source file: `src/ui/dialog.tsx`.




<a id="drawer"></a>
# Drawer

Swipeable edge panel. Set swipeDirection to up, right, down, or left.
Source file: `src/ui/drawer.tsx`.

Use `Drawer` from `@ui/overlays/drawer`. Set `swipeDirection` to `up`, `right`, `down`, or `left`. `DrawerContent` composes portal, overlay, viewport, and popup. Pass `showSwipeHandle` when the drawer should show a drag affordance. Do not use Sheet.


<a id="pagination"></a>
# Pagination

Page links with previous, next, ellipsis, and an optional range label.
Source file: `src/ui/pagination.tsx`.




<a id="kbd"></a>
# Kbd

Keyboard key and grouped shortcut display.
Source file: `src/ui/kbd.tsx`.




<a id="file-upload"></a>
# File Upload

File and image upload row with upload state, media, and a vertical group.
Source file: `src/ui/file-upload.tsx`.

Wire a real `<input type="file">` (single or `multiple`) and set `state="uploading"` while the file is in flight. Show `Spinner` in `FileUploadMedia` — do not add a title shimmer. After success, switch to `state="done"` and keep the file icon or image preview. `FileUploadGroup` stacks many files vertically. Label icon-only `FileUploadAction`s. Do not call `npx shadcn add file-upload`.


<a id="field"></a>
# Field

Label, description, error, and grouped field composition.
Source file: `src/ui/field.tsx`.




<a id="label"></a>
# Label

Accessible label with Orchid typography.
Source file: `src/ui/label.tsx`.




<a id="input"></a>
# Input

Text and file input with Orchid states.
Source file: `src/ui/input.tsx`.




<a id="input-group"></a>
# Input Group

Input, textarea, addon, and button composition.
Source file: `src/ui/input-group.tsx`.




<a id="textarea"></a>
# Textarea

Auto-sizing textarea with Orchid form styling.
Source file: `src/ui/textarea.tsx`.




<a id="checkbox"></a>
# Checkbox

Checkbox with Orchid states and an optional group helper.
Source file: `src/ui/checkbox.tsx`.




<a id="radio-group"></a>
# Radio Group

Radio group and item primitives with Orchid styling.
Source file: `src/ui/radio-group.tsx`.




<a id="switch"></a>
# Switch

Switch in default and small Orchid sizes.
Source file: `src/ui/switch.tsx`.




<a id="slider"></a>
# Slider

Single, range, or vertical slider with Orchid styling.
Source file: `src/ui/slider.tsx`.




<a id="form-section"></a>
# Form Section

Heading plus FormSectionGroup and FormSectionItem.
Source file: `src/ui/form-section.tsx`.


