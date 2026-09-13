# Orchid catalog

Use **Components & Blocks** (`@/components/…`) first. Pass props or a schema. Do not start a screen from `@ui`. Read `orchid-llms/llms.txt` when props are unclear. Do not fetch orchid-ui-hitpay.vercel.app. `@ui` only after the block is in the file.

# Needs

- rows and columns, spreadsheet, searchable table, column filter, sort, pagination, row click, row edit/delete → `data-table`
- compact row list, card list, people list, products list, activity feed, checklist → `data-list`
- one record, detail page fields, invoice detail, leave detail, key-value summary → `detail-card`
- kpi, dashboard, stat, revenue, volume, count, percent → `metric-card`
- customer, beneficiary, contact, payee → `customer-card`
- multi-field form, create form, edit form, schema fields, validation → `form-builder`
- create/edit page shell, form modal shell, save and cancel → `form-layout`
- browse page shell, detail page shell, page title, back button, page actions → `page-layout`
- iframe app shell, app name, app-level tabs, app sidebar → `app-layout`
- choose one, option cards, plan, method → `choice-card`
- stepper, quantity, plus minus, stock count → `quantity-input`
- rich text, notes, wysiwyg, lexical → `text-editor`
- date picker, date range picker, datetime picker, calendar popover → `date-picker`
- dropdown, select, searchable select, multi select, pick one option → `select`
- assignee, reviewer, pick staff, staff dropdown → `staff-select`
- pick role, notify role, role dropdown → `role-select`
- pick coupon, coupon dropdown → `coupon-select`
- pick discount, discount dropdown → `discount-select`
- pick tax, tax dropdown → `tax-select`
- pick shipping method → `shipping-select`
- pick pickup → `pickup-select`
- pick category, product category dropdown → `product-category-select`
- pick location, location dropdown → `location-select`
- confirm, delete, destructive, are you sure → `confirmation-modal`
- copy to clipboard, copy id, copy phone, copy url → `copy-button`
- pick product, pick customer, pick order, resource picker, catalog picker → `resource-picker`
- command palette, search commands, cmdk → `command`
- toast, snackbar, notify, success message → `toast` (`@ui`, after a block)
- banner, alert, inline notice → `banner` (`@ui`)
- empty state, no records, first-use state → `empty`
- loading placeholder, skeleton rows → `skeleton` (`@ui`)
- loading spinner → `spinner` (`@ui`)
- extra dialog (not FormLayout modal, not confirmation) → `dialog` (`@ui`)
- extra drawer (not FormLayout modal, not confirmation) → `drawer` (`@ui`)
- in-page tabs (not AppLayout tabs) → `tabs` (`@ui`)
- status badge, label → `badge` (`@ui`)

# Components & Blocks

## Actions

## `copy-button` — Copy Button

Need: copy to clipboard, copy id, copy phone, copy url
Copy a string (id, phone, URL). prop: value.
Import `@/components/actions/copy-button` — `src/components/actions/copy-button.tsx`.
Docs: `orchid-llms/llms.txt#copy-button`

## Displaying Data

## `data-table` — Data Table

Need: rows and columns, spreadsheet, searchable table, column filter, sort, pagination, row click, row edit/delete
Usage: `schema.filters` and `schema.rowActions` (for example `["edit", "delete"]`) go inside schema. `onRowClick` and `onRowAction` are DataTable props. Do not create a separate filter row.
Rows-and-columns table with search, column filters, sort, and pagination. Pass columns + data. onRowClick opens a record. Row ⋮ edit/delete uses rowActions + onRowAction (not a custom DropdownMenu). editColumns (default off) only toggles which columns are visible.
Import `@/components/displaying-data/data-table` — `src/components/displaying-data/data-table.tsx`.
Docs: `orchid-llms/llms.txt#data-table`
Related: `src/components/displaying-data/data-table-model.ts`.

## `empty` — Empty

Need: empty state, no records, first-use state
Props empty state. title, optional media and actions.
Import `@/components/displaying-data/empty` — `src/components/displaying-data/empty.tsx`.
Docs: `orchid-llms/llms.txt#empty`

## `customer-card` — Customer Card

Need: customer, beneficiary, contact, payee
Customer/beneficiary summary. variant small|big|float|empty, hover, active.
Import `@/components/displaying-data/customer-card` — `src/components/displaying-data/customer-card.tsx`.
Docs: `orchid-llms/llms.txt#customer-card`

## `metric-card` — Metric Card

Need: kpi, dashboard, stat, revenue, volume, count, percent
KPI tile for a dashboard number: icon, title, value, optional percent change (revenue, volume, counts).
Import `@/components/displaying-data/metric-card` — `src/components/displaying-data/metric-card.tsx`.
Docs: `orchid-llms/llms.txt#metric-card`

## `data-list` — Data List

Need: compact row list, card list, people list, products list, activity feed, checklist
Usage: Use for compact collections without table tools. Put row controls such as QuantityInput in item `trailing`.
Stacked card or row list from items[]. Each item: key, title, optional description, details, media, actions.menu / actions.hover. For people, products, or activity without table search, filters, sort, or pagination.
Import `@/components/displaying-data/data-list` — `src/components/displaying-data/data-list.tsx`.
Docs: `orchid-llms/llms.txt#data-list`

## `detail-card` — Detail Card

Need: one record, detail page fields, invoice detail, leave detail, key-value summary
Read-only key/value card for one record on a show page (invoice, leave request, customer). items, optional title, columns, style default|border. Values can be React nodes.
Import `@/components/displaying-data/detail-card` — `src/components/displaying-data/detail-card.tsx`.
Docs: `orchid-llms/llms.txt#detail-card`

## Form

## `form-builder` — Form Builder

Need: multi-field form, create form, edit form, schema fields, validation
Usage: Use `useSchemaForm({ fields, onSubmit })` and render FormBuilder inside FormLayout.
JSON-schema form for create/edit. Wrap in FormLayout and submit through formId. Field types: input, password, textarea, select, staff, role, coupon, discount, tax, shipping, pickup, product-category, location, combobox, radio, choice-card, checkbox, checkbox-group, accepted, switch, slider, input-group, date, datetime, date-range, file, quantity, object, section, section-item, hidden, phone.
Import `@/components/form/form-builder` — `src/components/form/form-builder.tsx`.
Docs: `orchid-llms/llms.txt#form-builder`
Related: `src/components/form/form-builder-model.ts`.

## `resource-picker` — Resource Picker

Need: pick product, pick customer, pick order, resource picker, catalog picker
Usage: Use `useResourcePicker` for catalog records, then persist the selected resource to Turso.
Promise picker for HitPay list records (products, customers, orders, charges, invoices, add-ons). const pick = useResourcePicker(); await pick({ type }).
Import `@/components/form/resource-picker` — `src/components/form/resource-picker.tsx`.
Docs: `orchid-llms/llms.txt#resource-picker`

## `choice-card` — Choice Card

Need: choose one, option cards, plan, method
Pick one as a card (no radio dot). ChoiceCardGroup alignment vertical|horizontal.
Import `@/components/form/choice-card` — `src/components/form/choice-card.tsx`.
Docs: `orchid-llms/llms.txt#choice-card`

## `select` — Select

Need: dropdown, select, searchable select, multi select, pick one option
Props picker for a closed list or a searchable / multi select.
Import `@/components/form/select` — `src/components/form/select.tsx`.
Docs: `orchid-llms/llms.txt#select`
Related: `src/ui/form/combobox.tsx`.

## `staff-select` — Staff Select

Need: assignee, reviewer, pick staff, staff dropdown
App-member dropdown. GET /api/apps/{appId}/staff-app-members. Do not fetch on the screen.
Import `@/components/form/staff-select` — `src/components/form/staff-select.tsx`.
Docs: `orchid-llms/llms.txt#staff-select`
Related: `src/lib/hitpay.ts`, `src/lib/hitpay-roles.ts`, `src/lib/studio-app-id.ts`.

## `role-select` — Role Select

Need: pick role, notify role, role dropdown
Business role dropdown. GET /api/apps/{appId}/roles. Do not fetch on the screen.
Import `@/components/form/role-select` — `src/components/form/role-select.tsx`.
Docs: `orchid-llms/llms.txt#role-select`
Related: `src/lib/hitpay.ts`, `src/lib/hitpay-roles.ts`, `src/lib/studio-app-id.ts`.

## `coupon-select` — Coupon Select

Need: pick coupon, coupon dropdown
Coupon dropdown. GET /v1/coupons. Do not fetch on the screen.
Import `@/components/form/coupon-select` — `src/components/form/coupon-select.tsx`.
Docs: `orchid-llms/llms.txt#coupon-select`
Related: `src/components/form/hitpay-named-select.tsx`.

## `discount-select` — Discount Select

Need: pick discount, discount dropdown
Discount dropdown. GET /v1/discounts. Do not fetch on the screen.
Import `@/components/form/discount-select` — `src/components/form/discount-select.tsx`.
Docs: `orchid-llms/llms.txt#discount-select`
Related: `src/components/form/hitpay-named-select.tsx`.

## `tax-select` — Tax Select

Need: pick tax, tax dropdown
Tax dropdown. GET /v1/taxes. Do not fetch on the screen.
Import `@/components/form/tax-select` — `src/components/form/tax-select.tsx`.
Docs: `orchid-llms/llms.txt#tax-select`
Related: `src/components/form/hitpay-named-select.tsx`.

## `shipping-select` — Shipping Select

Need: pick shipping method
Shipping dropdown. GET /v1/shipping. Do not fetch on the screen.
Import `@/components/form/shipping-select` — `src/components/form/shipping-select.tsx`.
Docs: `orchid-llms/llms.txt#shipping-select`
Related: `src/components/form/hitpay-named-select.tsx`.

## `pickup-select` — Pickup Select

Need: pick pickup
Pickup dropdown. GET /v1/pickups. Do not fetch on the screen.
Import `@/components/form/pickup-select` — `src/components/form/pickup-select.tsx`.
Docs: `orchid-llms/llms.txt#pickup-select`
Related: `src/components/form/hitpay-named-select.tsx`.

## `product-category-select` — Product Category Select

Need: pick category, product category dropdown
Category dropdown. GET /v1/product-category. Do not fetch on the screen.
Import `@/components/form/product-category-select` — `src/components/form/product-category-select.tsx`.
Docs: `orchid-llms/llms.txt#product-category-select`
Related: `src/components/form/hitpay-named-select.tsx`.

## `location-select` — Location Select

Need: pick location, location dropdown
Location dropdown. GET /v1/locations. Do not fetch on the screen.
Import `@/components/form/location-select` — `src/components/form/location-select.tsx`.
Docs: `orchid-llms/llms.txt#location-select`
Related: `src/components/form/hitpay-named-select.tsx`.

## `quantity-input` — Quantity Input

Need: stepper, quantity, plus minus, stock count
Integer stepper. min/max/step.
Import `@/components/form/quantity-input` — `src/components/form/quantity-input.tsx`.
Docs: `orchid-llms/llms.txt#quantity-input`

## `text-editor` — Text Editor

Need: rich text, notes, wysiwyg, lexical
Lexical rich text for notes. Bold, italic, heading, lists. Persist editor JSON.
Import `@/components/form/text-editor` — `src/components/form/text-editor.tsx`.
Docs: `orchid-llms/llms.txt#text-editor`

## `date-picker` — Date Picker

Need: date picker, date range picker, datetime picker, calendar popover
Date, range, and date-time picker. Do not import Calendar.
Import `@/components/form/date-picker` — `src/components/form/date-picker.tsx`.
Docs: `orchid-llms/llms.txt#date-picker`
Related: `src/ui/form/calendar.tsx`.

## Layout

## `form-layout` — Form Layout

Need: create/edit page shell, form modal shell, save and cancel
Usage: `formId` must match the FormBuilder id; use `mode="modal"` for a focused create form.
Page or modal shell for create/edit. One FormBuilder: formId matches the builder id. Several forms: actions.save.onClick. Browse and show pages use PageLayout.
Import `@/components/layout/form-layout` — `src/components/layout/form-layout.tsx`.
Docs: `orchid-llms/llms.txt#form-layout`

## `app-layout` — App Layout

Need: iframe app shell, app name, app-level tabs, app sidebar
HitPay App Studio embedded pane frame (not generic app chrome). Optional app name, tabs, and sidebar.
Import `@/components/layout/app-layout` — `src/components/layout/app-layout.tsx`.
Docs: `orchid-llms/llms.txt#app-layout`

## `page-layout` — Page Layout

Need: browse page shell, detail page shell, page title, back button, page actions
Usage: Use `actions` for Create/Add and `onBack` only on nested screens.
Standard route page with built-in responsive padding, header, and scrollable content. Pass onBack on nested screens for a header back control.
Import `@/components/layout/page-layout` — `src/components/layout/page-layout.tsx`.
Docs: `orchid-llms/llms.txt#page-layout`

## Overlays

## `confirmation-modal` — Confirmation Modal

Need: confirm, delete, destructive, are you sure
Prebuilt Promise-based confirmation modal invoked with useConfirmationModal.
Import `@/components/overlays/confirmation-modal` — `src/components/overlays/confirmation-modal.tsx`.
Docs: `orchid-llms/llms.txt#confirmation-modal`

## `command` — Command

Need: command palette, search commands, cmdk
Searchable command palette driven by open, onOpenChange, and groups.
Import `@/components/overlays/command` — `src/components/overlays/command.tsx`.
Docs: `orchid-llms/llms.txt#command`

# Base Components

## Actions

## `button` — Button

Base UI button with standard variants and sizes in Orchid styling.
Import `@ui/actions/button` — `src/ui/actions/button.tsx`.
Docs: `orchid-llms/llms.txt#button`

## `button-group` — Button Group

Attached controls plus ghost and border icon toolbars. Overflow actions compose with DropdownMenu.
Import `@ui/actions/button-group` — `src/ui/actions/button-group.tsx`.
Docs: `orchid-llms/llms.txt#button-group`

## Displaying Data

## `badge` — Badge

Need: status badge, label
Badge with render support plus Orchid tones, appearances, removable badges, and user roles.
Import `@ui/displaying-data/badge` — `src/ui/displaying-data/badge.tsx`.
Docs: `orchid-llms/llms.txt#badge`

## `avatar` — Avatar

Compound avatar with image, fallback, badge, group, and Orchid business styling.
Import `@ui/displaying-data/avatar` — `src/ui/displaying-data/avatar.tsx`.
Docs: `orchid-llms/llms.txt#avatar`

## Feedback

## `banner` — Banner

Need: banner, alert, inline notice
Banner with semantic variants and top-right or bottom action placement in Orchid styling.
Import `@ui/feedback/banner` — `src/ui/feedback/banner.tsx`.
Docs: `orchid-llms/llms.txt#banner`

## `toast` — Toast

Need: toast, snackbar, notify, success message
Base UI toast with additive placement options and Orchid semantic styling.
Import `@ui/feedback/toast` — `src/ui/feedback/toast.tsx`.
Docs: `orchid-llms/llms.txt#toast`

## `skeleton` — Skeleton

Need: loading placeholder, skeleton rows
Animated loading placeholder with Orchid styling.
Import `@ui/feedback/skeleton` — `src/ui/feedback/skeleton.tsx`.
Docs: `orchid-llms/llms.txt#skeleton`

## `spinner` — Spinner

Need: loading spinner
Indeterminate loading icon sized through className.
Import `@ui/feedback/spinner` — `src/ui/feedback/spinner.tsx`.
Docs: `orchid-llms/llms.txt#spinner`

## Form

## `field` — Field

Field composition with Orchid form styling.
Import `@ui/form/field` — `src/ui/form/field.tsx`.
Docs: `orchid-llms/llms.txt#field`

## `label` — Label

Accessible label with Orchid typography.
Import `@ui/form/label` — `src/ui/form/label.tsx`.
Docs: `orchid-llms/llms.txt#label`

## `input` — Input

Base UI input with Orchid form styling.
Import `@ui/form/input` — `src/ui/form/input.tsx`.
Docs: `orchid-llms/llms.txt#input`

## `input-group` — Input Group

Input, textarea, addon, and button composition with Orchid styling.
Import `@ui/form/input-group` — `src/ui/form/input-group.tsx`.
Docs: `orchid-llms/llms.txt#input-group`

## `textarea` — Textarea

Auto-sizing textarea with Orchid form styling.
Import `@ui/form/textarea` — `src/ui/form/textarea.tsx`.
Docs: `orchid-llms/llms.txt#textarea`

## `checkbox` — Checkbox

Base UI checkbox with Orchid states and an optional CheckboxGroup helper.
Import `@ui/form/checkbox` — `src/ui/form/checkbox.tsx`.
Docs: `orchid-llms/llms.txt#checkbox`

## `radio-group` — Radio Group

Radio group and item primitives with Orchid styling.
Import `@ui/form/radio-group` — `src/ui/form/radio-group.tsx`.
Docs: `orchid-llms/llms.txt#radio-group`

## `switch` — Switch

Base UI switch with default and small Orchid sizes.
Import `@ui/form/switch` — `src/ui/form/switch.tsx`.
Docs: `orchid-llms/llms.txt#switch`

## `slider` — Slider

Horizontal or vertical slider with Orchid styling.
Import `@ui/form/slider` — `src/ui/form/slider.tsx`.
Docs: `orchid-llms/llms.txt#slider`

## `file-upload` — File Upload

File and image upload row with upload state, media, actions, and a vertical group.
Import `@ui/form/file-upload` — `src/ui/form/file-upload.tsx`.
Docs: `orchid-llms/llms.txt#file-upload`

## `form-section` — Form Section

Form block heading. FormSectionGroup + FormSectionItem for settings rows.
Import `@ui/form/form-section` — `src/ui/form/form-section.tsx`.
Docs: `orchid-llms/llms.txt#form-section`

## Layout

## `tabs` — Tabs

Need: in-page tabs (not AppLayout tabs)
Horizontal or vertical tabs with default and line variants.
Import `@ui/layout/tabs` — `src/ui/layout/tabs.tsx`.
Docs: `orchid-llms/llms.txt#tabs`

## Navigation

## `pagination` — Pagination

Link pagination with Orchid buttons and an optional range label.
Import `@ui/navigation/pagination` — `src/ui/navigation/pagination.tsx`.
Docs: `orchid-llms/llms.txt#pagination`

## Overlays

## `dropdown-menu` — Dropdown Menu

Menu with items, checkbox and radio selection, submenus, and Orchid styling.
Import `@ui/overlays/dropdown-menu` — `src/ui/overlays/dropdown-menu.tsx`.
Docs: `orchid-llms/llms.txt#dropdown-menu`

## `tooltip` — Tooltip

Base UI tooltip with Orchid styling.
Import `@ui/overlays/tooltip` — `src/ui/overlays/tooltip.tsx`.
Docs: `orchid-llms/llms.txt#tooltip`

## `dialog` — Dialog

Need: extra dialog (not FormLayout modal, not confirmation)
Dialog primitives with Orchid sizes and persistent mode.
Import `@ui/overlays/dialog` — `src/ui/overlays/dialog.tsx`.
Docs: `orchid-llms/llms.txt#dialog`

## `drawer` — Drawer

Need: extra drawer (not FormLayout modal, not confirmation)
Swipeable edge panel. Set swipeDirection to up, right, down, or left.
Import `@ui/overlays/drawer` — `src/ui/overlays/drawer.tsx`.
Docs: `orchid-llms/llms.txt#drawer`

## `popover` — Popover

Non-modal popover primitives with Orchid styling.
Import `@ui/overlays/popover` — `src/ui/overlays/popover.tsx`.
Docs: `orchid-llms/llms.txt#popover`

## Utils

## `kbd` — Kbd

Keyboard key and key group with Orchid styling.
Import `@ui/utils/kbd` — `src/ui/utils/kbd.tsx`.
Docs: `orchid-llms/llms.txt#kbd`

## `separator` — Separator

Horizontal or vertical separator with Orchid styling.
Import `@ui/utils/separator` — `src/ui/utils/separator.tsx`.
Docs: `orchid-llms/llms.txt#separator`
