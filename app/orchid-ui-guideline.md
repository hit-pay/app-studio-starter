# Orchid catalog

Hard rule: use **Components & Blocks** (`@/components/…`) first. Pass props or a schema. Do not start a screen from `@ui`. Do not rebuild a block from primitives — that writes too much code. Open `orchid-llms/{name}.md` only when the props remain unclear. Do not fetch orchid-ui-hitpay.vercel.app. Use **Base Components** (`@ui/…`) only after no block covers the job (a single Button, Badge, or Spinner).

# Needs

- rows and columns, spreadsheet, searchable table, column filter, sort, pagination → `data-table`
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
- confirm, delete, destructive, are you sure → `confirmation-modal`
- copy to clipboard, copy id, copy phone, copy url → `copy-button`
- pick product, pick customer, pick order, pick location, pick category, resource picker, catalog picker → `resource-picker`
- command palette, search commands, cmdk → `command`
- toast, snackbar, notify, success message → `toast`
- banner, alert, inline notice → `banner`
- empty state, no records, first-use state → `empty`
- loading placeholder, skeleton rows → `skeleton`
- loading spinner, indeterminate loading → `spinner`
- chart, graph, time series, dashboard visualization → `chart`
- dialog, modal content, overlay form → `dialog`
- drawer, side panel, bottom sheet → `drawer`
- overflow menu, action menu, context actions → `dropdown-menu`
- in-page tabs, tab panel → `tabs`
- status badge, label, role badge → `badge`

# Utils

## `utils` — Utils

Cn() Tailwind class merge. Import from @/lib/utils.
Import `@/lib/utils` — `src/lib/utils.ts`.

# Components & Blocks

## Actions

## `copy-button` — Copy Button

Need: copy to clipboard, copy id, copy phone, copy url
Copy a string (id, phone, URL). prop: value.
Import `@/components/actions/copy-button` — `src/components/actions/copy-button.tsx`.
Docs: `orchid-llms/copy-button.md`

## Displaying Data

## `data-table` — Data Table

Need: rows and columns, spreadsheet, searchable table, column filter, sort, pagination
Rows-and-columns table with search, column filters, sort, and pagination. Pass columns + data. rowActions defaults to Edit + Delete. Edit one field in a cell; editColumns only toggles which columns are visible.
Import `@/components/displaying-data/data-table` — `src/components/displaying-data/data-table.tsx`.
Docs: `orchid-llms/data-table.md`
Related: `src/components/displaying-data/data-table-model.ts`.

## `empty` — Empty

Need: empty state, no records, first-use state
Props empty state. title, optional media and actions.
Import `@/components/displaying-data/empty` — `src/components/displaying-data/empty.tsx`.
Docs: `orchid-llms/empty.md`

## `customer-card` — Customer Card

Need: customer, beneficiary, contact, payee
Customer/beneficiary summary. variant small|big|float|empty, hover, active.
Import `@/components/displaying-data/customer-card` — `src/components/displaying-data/customer-card.tsx`.
Docs: `orchid-llms/customer-card.md`

## `metric-card` — Metric Card

Need: kpi, dashboard, stat, revenue, volume, count, percent
KPI tile for a dashboard number: icon, title, value, optional percent change (revenue, volume, counts).
Import `@/components/displaying-data/metric-card` — `src/components/displaying-data/metric-card.tsx`.
Docs: `orchid-llms/metric-card.md`

## `data-list` — Data List

Need: compact row list, card list, people list, products list, activity feed, checklist
Stacked card or row list from items[]. Each item: key, title, optional description, details, media, actions.menu / actions.hover. For people, products, or activity without table search, filters, sort, or pagination.
Import `@/components/displaying-data/data-list` — `src/components/displaying-data/data-list.tsx`.
Docs: `orchid-llms/data-list.md`

## `detail-card` — Detail Card

Need: one record, detail page fields, invoice detail, leave detail, key-value summary
Read-only key/value card for one record on a show page (invoice, leave request, customer). items, optional title, columns, style default|border. Values can be React nodes.
Import `@/components/displaying-data/detail-card` — `src/components/displaying-data/detail-card.tsx`.
Docs: `orchid-llms/detail-card.md`

## Form

## `form-builder` — Form Builder

Need: multi-field form, create form, edit form, schema fields, validation
JSON-schema form for create/edit. Wrap in FormLayout and submit through formId. Field types: input, password, textarea, select, combobox, radio, choice-card, checkbox, checkbox-group, accepted, switch, slider, input-group, date, datetime, date-range, file, quantity, object, section, section-item, hidden, phone.
Import `@/components/form/form-builder` — `src/components/form/form-builder.tsx`.
Docs: `orchid-llms/form-builder.md`
Related: `src/components/form/form-builder-model.ts`.

## `resource-picker` — Resource Picker

Need: pick product, pick customer, pick order, pick location, pick category, resource picker, catalog picker
Promise picker for HitPay list records (products, categories, customers, orders, locations). const pick = useResourcePicker(); await pick({ type }).
Import `@/components/form/resource-picker` — `src/components/form/resource-picker.tsx`.
Docs: `orchid-llms/resource-picker.md`

## `choice-card` — Choice Card

Need: choose one, option cards, plan, method
Pick one as a card (no radio dot). ChoiceCardGroup alignment vertical|horizontal.
Import `@/components/form/choice-card` — `src/components/form/choice-card.tsx`.
Docs: `orchid-llms/choice-card.md`

## `select` — Select

Need: dropdown, select, searchable select, multi select, pick one option
Props picker for a closed list or a searchable / multi select.
Import `@/components/form/select` — `src/components/form/select.tsx`.
Docs: `orchid-llms/select.md`
Related: `src/ui/form/combobox.tsx`.

## `staff-select` — Staff Select

Need: assignee, reviewer, pick staff, staff dropdown
App-member dropdown. Loads staff-app-members. Do not fetch on the screen.
Import `@/components/form/staff-select` — `src/components/form/staff-select.tsx`.
Docs: `orchid-llms/staff-select.md`

## `role-select` — Role Select

Need: pick role, notify role, role dropdown
Business role dropdown. Loads /roles. Do not fetch on the screen.
Import `@/components/form/role-select` — `src/components/form/role-select.tsx`.
Docs: `orchid-llms/role-select.md`

## `quantity-input` — Quantity Input

Need: stepper, quantity, plus minus, stock count
Integer stepper. min/max/step.
Import `@/components/form/quantity-input` — `src/components/form/quantity-input.tsx`.
Docs: `orchid-llms/quantity-input.md`

## `text-editor` — Text Editor

Need: rich text, notes, wysiwyg, lexical
Lexical rich text for notes. Bold, italic, heading, lists. Persist editor JSON.
Import `@/components/form/text-editor` — `src/components/form/text-editor.tsx`.
Docs: `orchid-llms/text-editor.md`

## `date-picker` — Date Picker

Need: date picker, date range picker, datetime picker, calendar popover
Date, range, and date-time picker. Do not import Calendar.
Import `@/components/form/date-picker` — `src/components/form/date-picker.tsx`.
Docs: `orchid-llms/date-picker.md`
Related: `src/ui/form/calendar.tsx`.

## Layout

## `form-layout` — Form Layout

Need: create/edit page shell, form modal shell, save and cancel
Page or modal shell for create/edit. One FormBuilder: formId matches the builder id. Several forms: actions.save.onClick. Browse and show pages use PageLayout.
Import `@/components/layout/form-layout` — `src/components/layout/form-layout.tsx`.
Docs: `orchid-llms/form-layout.md`

## `app-layout` — App Layout

Need: iframe app shell, app name, app-level tabs, app sidebar
HitPay App Studio embedded pane frame (not generic app chrome). Optional app name, tabs, and sidebar.
Import `@/components/layout/app-layout` — `src/components/layout/app-layout.tsx`.
Docs: `orchid-llms/app-layout.md`

## `page-layout` — Page Layout

Need: browse page shell, detail page shell, page title, back button, page actions
Standard route page with built-in responsive padding, header, and scrollable content. Pass onBack on nested screens for a header back control.
Import `@/components/layout/page-layout` — `src/components/layout/page-layout.tsx`.
Docs: `orchid-llms/page-layout.md`

## Overlays

## `confirmation-modal` — Confirmation Modal

Need: confirm, delete, destructive, are you sure
Prebuilt Promise-based confirmation modal invoked with useConfirmationModal.
Import `@/components/overlays/confirmation-modal` — `src/components/overlays/confirmation-modal.tsx`.
Docs: `orchid-llms/confirmation-modal.md`

## `command` — Command

Need: command palette, search commands, cmdk
Searchable command palette driven by open, onOpenChange, and groups.
Import `@/components/overlays/command` — `src/components/overlays/command.tsx`.
Docs: `orchid-llms/command.md`

# Base Components

## Actions

## `button` — Button

Base UI button with standard variants and sizes in Orchid styling.
Import `@ui/actions/button` — `src/ui/actions/button.tsx`.
Docs: `orchid-llms/button.md`

## `button-group` — Button Group

Attached controls plus ghost and border icon toolbars. Overflow actions compose with DropdownMenu.
Import `@ui/actions/button-group` — `src/ui/actions/button-group.tsx`.
Docs: `orchid-llms/button-group.md`

## Displaying Data

## `badge` — Badge

Need: status badge, label, role badge
Badge with render support plus Orchid tones, appearances, removable badges, and user roles.
Import `@ui/displaying-data/badge` — `src/ui/displaying-data/badge.tsx`.
Docs: `orchid-llms/badge.md`

## `avatar` — Avatar

Compound avatar with image, fallback, badge, group, and Orchid business styling.
Import `@ui/displaying-data/avatar` — `src/ui/displaying-data/avatar.tsx`.
Docs: `orchid-llms/avatar.md`

## `chart` — Chart

Need: chart, graph, time series, dashboard visualization
Recharts wrapper with Orchid tooltip, legend, and chart tokens for dashboard series.
Import `@ui/displaying-data/chart` — `src/ui/displaying-data/chart.tsx`.
Docs: `orchid-llms/chart.md`

## Feedback

## `banner` — Banner

Need: banner, alert, inline notice
Banner with semantic variants and top-right or bottom action placement in Orchid styling.
Import `@ui/feedback/banner` — `src/ui/feedback/banner.tsx`.
Docs: `orchid-llms/banner.md`

## `toast` — Toast

Need: toast, snackbar, notify, success message
Base UI toast with additive placement options and Orchid semantic styling.
Import `@ui/feedback/toast` — `src/ui/feedback/toast.tsx`.
Docs: `orchid-llms/toast.md`

## `progress` — Progress

Compound progress with label, value, track, and indicator primitives.
Import `@ui/feedback/progress` — `src/ui/feedback/progress.tsx`.
Docs: `orchid-llms/progress.md`

## `skeleton` — Skeleton

Need: loading placeholder, skeleton rows
Animated loading placeholder with Orchid styling.
Import `@ui/feedback/skeleton` — `src/ui/feedback/skeleton.tsx`.
Docs: `orchid-llms/skeleton.md`

## `spinner` — Spinner

Need: loading spinner, indeterminate loading
Indeterminate loading icon sized through className.
Import `@ui/feedback/spinner` — `src/ui/feedback/spinner.tsx`.
Docs: `orchid-llms/spinner.md`

## Form

## `field` — Field

Field composition with Orchid form styling.
Import `@ui/form/field` — `src/ui/form/field.tsx`.
Docs: `orchid-llms/field.md`

## `label` — Label

Accessible label with Orchid typography.
Import `@ui/form/label` — `src/ui/form/label.tsx`.
Docs: `orchid-llms/label.md`

## `input` — Input

Base UI input with Orchid form styling.
Import `@ui/form/input` — `src/ui/form/input.tsx`.
Docs: `orchid-llms/input.md`

## `input-group` — Input Group

Input, textarea, addon, and button composition with Orchid styling.
Import `@ui/form/input-group` — `src/ui/form/input-group.tsx`.
Docs: `orchid-llms/input-group.md`

## `textarea` — Textarea

Auto-sizing textarea with Orchid form styling.
Import `@ui/form/textarea` — `src/ui/form/textarea.tsx`.
Docs: `orchid-llms/textarea.md`

## `checkbox` — Checkbox

Base UI checkbox with Orchid states and an optional CheckboxGroup helper.
Import `@ui/form/checkbox` — `src/ui/form/checkbox.tsx`.
Docs: `orchid-llms/checkbox.md`

## `radio-group` — Radio Group

Radio group and item primitives with Orchid styling.
Import `@ui/form/radio-group` — `src/ui/form/radio-group.tsx`.
Docs: `orchid-llms/radio-group.md`

## `switch` — Switch

Base UI switch with default and small Orchid sizes.
Import `@ui/form/switch` — `src/ui/form/switch.tsx`.
Docs: `orchid-llms/switch.md`

## `slider` — Slider

Horizontal or vertical slider with Orchid styling.
Import `@ui/form/slider` — `src/ui/form/slider.tsx`.
Docs: `orchid-llms/slider.md`

## `file-upload` — File Upload

File and image upload row with upload state, media, actions, and a vertical group.
Import `@ui/form/file-upload` — `src/ui/form/file-upload.tsx`.
Docs: `orchid-llms/file-upload.md`

## `form-section` — Form Section

Form block heading. FormSectionGroup + FormSectionItem for settings rows.
Import `@ui/form/form-section` — `src/ui/form/form-section.tsx`.
Docs: `orchid-llms/form-section.md`

## Layout

## `accordion` — Accordion

Base UI accordion with Orchid styling.
Import `@ui/layout/accordion` — `src/ui/layout/accordion.tsx`.
Docs: `orchid-llms/accordion.md`

## `tabs` — Tabs

Need: in-page tabs, tab panel
Horizontal or vertical tabs with default and line variants.
Import `@ui/layout/tabs` — `src/ui/layout/tabs.tsx`.
Docs: `orchid-llms/tabs.md`

## `collapsible` — Collapsible

Root, Trigger, and Content primitives with Orchid styling.
Import `@ui/layout/collapsible` — `src/ui/layout/collapsible.tsx`.
Docs: `orchid-llms/collapsible.md`

## `aspect-ratio` — Aspect Ratio

Box that keeps a width/height ratio.
Import `@ui/layout/aspect-ratio` — `src/ui/layout/aspect-ratio.tsx`.
Docs: `orchid-llms/aspect-ratio.md`

## Navigation

## `pagination` — Pagination

Link pagination with Orchid buttons and an optional range label.
Import `@ui/navigation/pagination` — `src/ui/navigation/pagination.tsx`.
Docs: `orchid-llms/pagination.md`

## Overlays

## `dropdown-menu` — Dropdown Menu

Need: overflow menu, action menu, context actions
Menu with items, checkbox and radio selection, submenus, and Orchid styling.
Import `@ui/overlays/dropdown-menu` — `src/ui/overlays/dropdown-menu.tsx`.
Docs: `orchid-llms/dropdown-menu.md`

## `tooltip` — Tooltip

Base UI tooltip with Orchid styling.
Import `@ui/overlays/tooltip` — `src/ui/overlays/tooltip.tsx`.
Docs: `orchid-llms/tooltip.md`

## `dialog` — Dialog

Need: dialog, modal content, overlay form
Dialog primitives with Orchid sizes and persistent mode.
Import `@ui/overlays/dialog` — `src/ui/overlays/dialog.tsx`.
Docs: `orchid-llms/dialog.md`

## `drawer` — Drawer

Need: drawer, side panel, bottom sheet
Swipeable edge panel. Set swipeDirection to up, right, down, or left.
Import `@ui/overlays/drawer` — `src/ui/overlays/drawer.tsx`.
Docs: `orchid-llms/drawer.md`

## `popover` — Popover

Non-modal popover primitives with Orchid styling.
Import `@ui/overlays/popover` — `src/ui/overlays/popover.tsx`.

## Utils

## `kbd` — Kbd

Keyboard key and key group with Orchid styling.
Import `@ui/utils/kbd` — `src/ui/utils/kbd.tsx`.
Docs: `orchid-llms/kbd.md`

## `separator` — Separator

Horizontal or vertical separator with Orchid styling.
Import `@ui/utils/separator` — `src/ui/utils/separator.tsx`.
