# Orchid catalog

Find the block that matches the job. Use its summary and import first. Open the source or Docs URL only when the props remain unclear. Use **Base Components** only when no block covers the job.

# Needs

- rows and columns, spreadsheet, searchable table, column filter, sort, pagination → `data-table`
- compact row list, card list, people list, products list, activity feed, checklist → `data-list`
- one record, detail page fields, invoice detail, leave detail, key-value summary → `detail-card`
- kpi, dashboard, stat, revenue, volume, count, percent → `metric-card`
- customer, beneficiary, contact, payee → `customer-card`
- multi-field form, create form, edit form, schema fields, validation → `form-builder`
- create/edit page shell, form modal shell, save and cancel → `form-layout`
- browse page shell, detail page shell, page title, back button, page actions → `page-layout`
- iframe app shell, app name, app-level tabs, app sidebar → `app-studio-layout`
- choose one, option cards, plan, method → `choice-card`
- stepper, quantity, plus minus, stock count → `quantity-input`
- rich text, notes, wysiwyg, lexical → `text-editor`
- date picker, date range picker, datetime picker, calendar popover → `date-picker`
- confirm, delete, destructive, are you sure → `confirmation-modal`
- command palette, search commands, cmdk → `command`
- toast, snackbar, notify, success message → `toast`
- alert, banner, inline notice → `alert`
- empty state, no records, first-use state → `empty`
- loading placeholder, skeleton rows → `skeleton`
- loading spinner, indeterminate loading → `spinner`
- chart, graph, time series, dashboard visualization → `chart`
- dialog, modal content, overlay form → `dialog`
- drawer, side panel, bottom sheet → `drawer`
- overflow menu, action menu, context actions → `dropdown-menu`
- in-page tabs, tab panel → `tabs`
- status badge, label, role badge → `badge`
- html table markup → `table`
- listitem primitives → `list`

# Utils

## `utils` — Utils

Cn() Tailwind class merge. Import from @/lib/utils.
Import `@/lib/utils` — `src/lib/utils.ts`.

# Components & Blocks

## Displaying Data

## `data-table` — Data Table

Need: rows and columns, spreadsheet, searchable table, column filter, sort, pagination
Rows-and-columns table with search, column filters, sort, and pagination. Pass columns + data. rowActions defaults to Edit + Delete. Edit one field in a cell; editColumns only toggles which columns are visible.
Import `@/components/displaying-data/data-table` — `src/components/displaying-data/data-table.tsx`.
Reference: `src/components/displaying-data/data-table.tsx`; https://orchid-ui-hitpay.vercel.app/llms/data-table.md
Related: `src/components/displaying-data/data-table-model.ts`.

## `customer-card` — Customer Card

Need: customer, beneficiary, contact, payee
Customer/beneficiary summary. variant small|big|float|empty, hover, active.
Import `@/components/displaying-data/customer-card` — `src/components/displaying-data/customer-card.tsx`.
Reference: `src/components/displaying-data/customer-card.tsx`; https://orchid-ui-hitpay.vercel.app/llms/customer-card.md

## `metric-card` — Metric Card

Need: kpi, dashboard, stat, revenue, volume, count, percent
KPI tile for a dashboard number: icon, title, value, optional percent change (revenue, volume, counts).
Import `@/components/displaying-data/metric-card` — `src/components/displaying-data/metric-card.tsx`.
Reference: `src/components/displaying-data/metric-card.tsx`; https://orchid-ui-hitpay.vercel.app/llms/metric-card.md

## `data-list` — Data List

Need: compact row list, card list, people list, products list, activity feed, checklist
Stacked card or row list from items[]. Each item: key, title, optional description, details, media, actions.menu / actions.hover. For people, products, or activity without table search, filters, sort, or pagination.
Import `@/components/displaying-data/data-list` — `src/components/displaying-data/data-list.tsx`.
Reference: `src/components/displaying-data/data-list.tsx`; https://orchid-ui-hitpay.vercel.app/llms/data-list.md

## `detail-card` — Detail Card

Need: one record, detail page fields, invoice detail, leave detail, key-value summary
Read-only key/value card for one record on a show page (invoice, leave request, customer). items, optional title, columns, style default|border. Values can be React nodes.
Import `@/components/displaying-data/detail-card` — `src/components/displaying-data/detail-card.tsx`.
Reference: `src/components/displaying-data/detail-card.tsx`; https://orchid-ui-hitpay.vercel.app/llms/detail-card.md

## Form

## `form-builder` — Form Builder

Need: multi-field form, create form, edit form, schema fields, validation
JSON-schema form for create/edit. Wrap in FormLayout and submit through formId. Field types: input, password, textarea, select, combobox, radio, choice-card, checkbox, checkbox-group, accepted, switch, slider, input-group, date, datetime, date-range, file, quantity, object, section, section-item, hidden, phone.
Import `@/components/form/form-builder` — `src/components/form/form-builder.tsx`.
Reference: `src/components/form/form-builder.tsx`; https://orchid-ui-hitpay.vercel.app/llms/form-builder.md
Related: `src/components/form/form-builder-model.ts`.

## `choice-card` — Choice Card

Need: choose one, option cards, plan, method
Pick one as a card (no radio dot). ChoiceCardGroup alignment vertical|horizontal.
Import `@/components/form/choice-card` — `src/components/form/choice-card.tsx`.
Reference: `src/components/form/choice-card.tsx`; https://orchid-ui-hitpay.vercel.app/llms/choice-card.md

## `quantity-input` — Quantity Input

Need: stepper, quantity, plus minus, stock count
Integer stepper. min/max/step.
Import `@/components/form/quantity-input` — `src/components/form/quantity-input.tsx`.
Reference: `src/components/form/quantity-input.tsx`; https://orchid-ui-hitpay.vercel.app/llms/quantity-input.md

## `text-editor` — Text Editor

Need: rich text, notes, wysiwyg, lexical
Lexical rich text for notes. Bold, italic, heading, lists. Persist editor JSON.
Import `@/components/form/text-editor` — `src/components/form/text-editor.tsx`.
Reference: `src/components/form/text-editor.tsx`; https://orchid-ui-hitpay.vercel.app/llms/text-editor.md

## `date-picker` — Date Picker

Need: date picker, date range picker, datetime picker, calendar popover
Date, range, and date-time selection with popover and calendar helpers.
Import `@/components/form/date-picker` — `src/components/form/date-picker.tsx`.
Reference: `src/components/form/date-picker.tsx`; https://orchid-ui-hitpay.vercel.app/llms/date-picker.md

## Layout

## `form-layout` — Form Layout

Need: create/edit page shell, form modal shell, save and cancel
Page or modal shell for create/edit. One FormBuilder: formId matches the builder id. Several forms: actions.save.onClick. Browse and show pages use PageLayout.
Import `@/components/layout/form-layout` — `src/components/layout/form-layout.tsx`.
Reference: `src/components/layout/form-layout.tsx`; https://orchid-ui-hitpay.vercel.app/llms/form-layout.md

## `app-studio-layout` — App Studio Layout

Need: iframe app shell, app name, app-level tabs, app sidebar
HitPay App Studio embedded pane frame (not generic app chrome). Optional app name, tabs, and sidebar.
Import `@/components/layout/app-studio-layout` — `src/components/layout/app-studio-layout.tsx`.
Reference: `src/components/layout/app-studio-layout.tsx`; https://orchid-ui-hitpay.vercel.app/llms/app-studio-layout.md

## `page-layout` — Page Layout

Need: browse page shell, detail page shell, page title, back button, page actions
Standard route page with built-in responsive padding, header, and scrollable content. Pass onBack on nested screens for a header back control.
Import `@/components/layout/page-layout` — `src/components/layout/page-layout.tsx`.
Reference: `src/components/layout/page-layout.tsx`; https://orchid-ui-hitpay.vercel.app/llms/page-layout.md

## Overlays

## `confirmation-modal` — Confirmation Modal

Need: confirm, delete, destructive, are you sure
Prebuilt Promise-based confirmation modal invoked with useConfirmationModal.
Import `@/components/overlays/confirmation-modal` — `src/components/overlays/confirmation-modal.tsx`.
Reference: `src/components/overlays/confirmation-modal.tsx`; https://orchid-ui-hitpay.vercel.app/llms/confirmation-modal.md

## `command` — Command

Need: command palette, search commands, cmdk
Searchable command palette driven by open, onOpenChange, and groups.
Import `@/components/overlays/command` — `src/components/overlays/command.tsx`.
Reference: `src/components/overlays/command.tsx`; https://orchid-ui-hitpay.vercel.app/llms/command.md

# Base Components

## Actions

## `button` — Button

Base UI button with standard variants and sizes in Orchid styling.
Import `@/base-ui/actions/button` — `src/base-ui/actions/button.tsx`.
Reference: `src/base-ui/actions/button.tsx`; https://orchid-ui-hitpay.vercel.app/llms/button.md

## `button-group` — Button Group

Attached controls plus ghost and border icon toolbars. Overflow actions compose with DropdownMenu.
Import `@/base-ui/actions/button-group` — `src/base-ui/actions/button-group.tsx`.
Reference: `src/base-ui/actions/button-group.tsx`; https://orchid-ui-hitpay.vercel.app/llms/button-group.md

## `copy-button` — Copy Button

Copy a string (id, phone, URL). prop: value.
Import `@/base-ui/actions/copy-button` — `src/base-ui/actions/copy-button.tsx`.
Reference: `src/base-ui/actions/copy-button.tsx`; https://orchid-ui-hitpay.vercel.app/llms/copy-button.md

## Displaying Data

## `list` — List

Need: listitem primitives
Low-level ListItem parts (title, media, meta, actions). layout default|stack|media. App lists use Data List.
Import `@/base-ui/displaying-data/list` — `src/base-ui/displaying-data/list.tsx`.
Reference: `src/base-ui/displaying-data/list.tsx`; https://orchid-ui-hitpay.vercel.app/llms/list.md

## `empty` — Empty

Need: empty state, no records, first-use state
Compound empty state with Orchid media variants.
Import `@/base-ui/displaying-data/empty` — `src/base-ui/displaying-data/empty.tsx`.
Reference: `src/base-ui/displaying-data/empty.tsx`; https://orchid-ui-hitpay.vercel.app/llms/empty.md

## `badge` — Badge

Need: status badge, label, role badge
Badge with render support plus Orchid tones, appearances, removable badges, and user roles.
Import `@/base-ui/displaying-data/badge` — `src/base-ui/displaying-data/badge.tsx`.
Reference: `src/base-ui/displaying-data/badge.tsx`; https://orchid-ui-hitpay.vercel.app/llms/badge.md

## `avatar` — Avatar

Compound avatar with image, fallback, badge, group, and Orchid business styling.
Import `@/base-ui/displaying-data/avatar` — `src/base-ui/displaying-data/avatar.tsx`.
Reference: `src/base-ui/displaying-data/avatar.tsx`; https://orchid-ui-hitpay.vercel.app/llms/avatar.md

## `table` — Table

Need: html table markup
Low-level HTML table markup. App collections with search or pagination use Data Table.
Import `@/base-ui/displaying-data/table` — `src/base-ui/displaying-data/table.tsx`.
Reference: `src/base-ui/displaying-data/table.tsx`; https://orchid-ui-hitpay.vercel.app/llms/table.md

## `chart` — Chart

Need: chart, graph, time series, dashboard visualization
Recharts wrapper with Orchid tooltip, legend, and chart tokens for dashboard series.
Import `@/base-ui/displaying-data/chart` — `src/base-ui/displaying-data/chart.tsx`.
Reference: `src/base-ui/displaying-data/chart.tsx`; https://orchid-ui-hitpay.vercel.app/llms/chart.md

## Feedback

## `alert` — Alert

Need: alert, banner, inline notice
Alert with semantic variants and top-right or bottom action placement in Orchid styling.
Import `@/base-ui/feedback/alert` — `src/base-ui/feedback/alert.tsx`.
Reference: `src/base-ui/feedback/alert.tsx`; https://orchid-ui-hitpay.vercel.app/llms/alert.md

## `toast` — Toast

Need: toast, snackbar, notify, success message
Base UI toast with additive placement options and Orchid semantic styling.
Import `@/base-ui/feedback/toast` — `src/base-ui/feedback/toast.tsx`.
Reference: `src/base-ui/feedback/toast.tsx`; https://orchid-ui-hitpay.vercel.app/llms/toast.md

## `progress` — Progress

Compound progress with label, value, track, and indicator primitives.
Import `@/base-ui/feedback/progress` — `src/base-ui/feedback/progress.tsx`.
Reference: `src/base-ui/feedback/progress.tsx`; https://orchid-ui-hitpay.vercel.app/llms/progress.md

## `skeleton` — Skeleton

Need: loading placeholder, skeleton rows
Animated loading placeholder with Orchid styling.
Import `@/base-ui/feedback/skeleton` — `src/base-ui/feedback/skeleton.tsx`.
Reference: `src/base-ui/feedback/skeleton.tsx`; https://orchid-ui-hitpay.vercel.app/llms/skeleton.md

## `spinner` — Spinner

Need: loading spinner, indeterminate loading
Indeterminate loading icon sized through className.
Import `@/base-ui/feedback/spinner` — `src/base-ui/feedback/spinner.tsx`.
Reference: `src/base-ui/feedback/spinner.tsx`; https://orchid-ui-hitpay.vercel.app/llms/spinner.md

## Form

## `field` — Field

Field composition with Orchid form styling.
Import `@/base-ui/form/field` — `src/base-ui/form/field.tsx`.
Reference: `src/base-ui/form/field.tsx`; https://orchid-ui-hitpay.vercel.app/llms/field.md

## `label` — Label

Accessible label with Orchid typography.
Import `@/base-ui/form/label` — `src/base-ui/form/label.tsx`.
Reference: `src/base-ui/form/label.tsx`; https://orchid-ui-hitpay.vercel.app/llms/label.md

## `input` — Input

Base UI input with Orchid form styling.
Import `@/base-ui/form/input` — `src/base-ui/form/input.tsx`.
Reference: `src/base-ui/form/input.tsx`; https://orchid-ui-hitpay.vercel.app/llms/input.md

## `input-group` — Input Group

Input, textarea, addon, and button composition with Orchid styling.
Import `@/base-ui/form/input-group` — `src/base-ui/form/input-group.tsx`.
Reference: `src/base-ui/form/input-group.tsx`; https://orchid-ui-hitpay.vercel.app/llms/input-group.md

## `textarea` — Textarea

Auto-sizing textarea with Orchid form styling.
Import `@/base-ui/form/textarea` — `src/base-ui/form/textarea.tsx`.
Reference: `src/base-ui/form/textarea.tsx`; https://orchid-ui-hitpay.vercel.app/llms/textarea.md

## `select` — Select

Base UI select with standard sizes and Orchid styling.
Import `@/base-ui/form/select` — `src/base-ui/form/select.tsx`.
Reference: `src/base-ui/form/select.tsx`; https://orchid-ui-hitpay.vercel.app/llms/select.md

## `combobox` — Combobox

Searchable single or multi-select with optional Orchid checkbox items and Select All.
Import `@/base-ui/form/combobox` — `src/base-ui/form/combobox.tsx`.
Reference: `src/base-ui/form/combobox.tsx`; https://orchid-ui-hitpay.vercel.app/llms/combobox.md

## `checkbox` — Checkbox

Base UI checkbox with Orchid states and an optional CheckboxGroup helper.
Import `@/base-ui/form/checkbox` — `src/base-ui/form/checkbox.tsx`.
Reference: `src/base-ui/form/checkbox.tsx`; https://orchid-ui-hitpay.vercel.app/llms/checkbox.md

## `radio-group` — Radio Group

Radio group and item primitives with Orchid styling.
Import `@/base-ui/form/radio-group` — `src/base-ui/form/radio-group.tsx`.
Reference: `src/base-ui/form/radio-group.tsx`; https://orchid-ui-hitpay.vercel.app/llms/radio-group.md

## `switch` — Switch

Base UI switch with default and small Orchid sizes.
Import `@/base-ui/form/switch` — `src/base-ui/form/switch.tsx`.
Reference: `src/base-ui/form/switch.tsx`; https://orchid-ui-hitpay.vercel.app/llms/switch.md

## `slider` — Slider

Horizontal or vertical slider with Orchid styling.
Import `@/base-ui/form/slider` — `src/base-ui/form/slider.tsx`.
Reference: `src/base-ui/form/slider.tsx`; https://orchid-ui-hitpay.vercel.app/llms/slider.md

## `calendar` — Calendar

DayPicker calendar for single, range, or multiple selection in Orchid styling.
Import `@/base-ui/form/calendar` — `src/base-ui/form/calendar.tsx`.
Reference: `src/base-ui/form/calendar.tsx`; https://orchid-ui-hitpay.vercel.app/llms/calendar.md

## `file-upload` — File Upload

File and image upload row with upload state, media, actions, and a vertical group.
Import `@/base-ui/form/file-upload` — `src/base-ui/form/file-upload.tsx`.
Reference: `src/base-ui/form/file-upload.tsx`; https://orchid-ui-hitpay.vercel.app/llms/file-upload.md

## `form-section` — Form Section

Form block heading. FormSectionGroup + FormSectionItem for settings rows.
Import `@/base-ui/form/form-section` — `src/base-ui/form/form-section.tsx`.
Reference: `src/base-ui/form/form-section.tsx`; https://orchid-ui-hitpay.vercel.app/llms/form-section.md

## Layout

## `accordion` — Accordion

Base UI accordion with Orchid styling.
Import `@/base-ui/layout/accordion` — `src/base-ui/layout/accordion.tsx`.
Reference: `src/base-ui/layout/accordion.tsx`; https://orchid-ui-hitpay.vercel.app/llms/accordion.md

## `tabs` — Tabs

Need: in-page tabs, tab panel
Horizontal or vertical tabs with default and line variants.
Import `@/base-ui/layout/tabs` — `src/base-ui/layout/tabs.tsx`.
Reference: `src/base-ui/layout/tabs.tsx`; https://orchid-ui-hitpay.vercel.app/llms/tabs.md

## `collapsible` — Collapsible

Root, Trigger, and Content primitives with Orchid styling.
Import `@/base-ui/layout/collapsible` — `src/base-ui/layout/collapsible.tsx`.
Reference: `src/base-ui/layout/collapsible.tsx`; https://orchid-ui-hitpay.vercel.app/llms/collapsible.md

## `scroll-area` — Scroll Area

Scroll area and scrollbar primitives with Orchid styling.
Import `@/base-ui/layout/scroll-area` — `src/base-ui/layout/scroll-area.tsx`.
Reference: `src/base-ui/layout/scroll-area.tsx`; https://orchid-ui-hitpay.vercel.app/llms/scroll-area.md

## `card` — Card

Content card with header, title, description, action, content, and footer in Orchid styling.
Import `@/base-ui/layout/card` — `src/base-ui/layout/card.tsx`.
Reference: `src/base-ui/layout/card.tsx`; https://orchid-ui-hitpay.vercel.app/llms/card.md

## `resizable` — Resizable

Split panes with a drag handle in Orchid styling.
Import `@/base-ui/layout/resizable` — `src/base-ui/layout/resizable.tsx`.
Reference: `src/base-ui/layout/resizable.tsx`; https://orchid-ui-hitpay.vercel.app/llms/resizable.md

## `aspect-ratio` — Aspect Ratio

Box that keeps a width/height ratio.
Import `@/base-ui/layout/aspect-ratio` — `src/base-ui/layout/aspect-ratio.tsx`.
Reference: `src/base-ui/layout/aspect-ratio.tsx`; https://orchid-ui-hitpay.vercel.app/llms/aspect-ratio.md

## Navigation

## `breadcrumb` — Breadcrumb

Breadcrumb with composable router links, page, separator, and ellipsis.
Import `@/base-ui/navigation/breadcrumb` — `src/base-ui/navigation/breadcrumb.tsx`.
Reference: `src/base-ui/navigation/breadcrumb.tsx`; https://orchid-ui-hitpay.vercel.app/llms/breadcrumb.md

## `pagination` — Pagination

Link pagination with Orchid buttons and an optional range label.
Import `@/base-ui/navigation/pagination` — `src/base-ui/navigation/pagination.tsx`.
Reference: `src/base-ui/navigation/pagination.tsx`; https://orchid-ui-hitpay.vercel.app/llms/pagination.md

## Overlays

## `dropdown-menu` — Dropdown Menu

Need: overflow menu, action menu, context actions
Menu with items, checkbox and radio selection, submenus, and Orchid styling.
Import `@/base-ui/overlays/dropdown-menu` — `src/base-ui/overlays/dropdown-menu.tsx`.
Reference: `src/base-ui/overlays/dropdown-menu.tsx`; https://orchid-ui-hitpay.vercel.app/llms/dropdown-menu.md

## `tooltip` — Tooltip

Base UI tooltip with Orchid styling.
Import `@/base-ui/overlays/tooltip` — `src/base-ui/overlays/tooltip.tsx`.
Reference: `src/base-ui/overlays/tooltip.tsx`; https://orchid-ui-hitpay.vercel.app/llms/tooltip.md

## `dialog` — Dialog

Need: dialog, modal content, overlay form
Dialog primitives with Orchid sizes and persistent mode.
Import `@/base-ui/overlays/dialog` — `src/base-ui/overlays/dialog.tsx`.
Reference: `src/base-ui/overlays/dialog.tsx`; https://orchid-ui-hitpay.vercel.app/llms/dialog.md

## `drawer` — Drawer

Need: drawer, side panel, bottom sheet
Swipeable edge panel. Set swipeDirection to up, right, down, or left.
Import `@/base-ui/overlays/drawer` — `src/base-ui/overlays/drawer.tsx`.
Reference: `src/base-ui/overlays/drawer.tsx`; https://orchid-ui-hitpay.vercel.app/llms/drawer.md

## `popover` — Popover

Non-modal popover primitives with Orchid styling.
Import `@/base-ui/overlays/popover` — `src/base-ui/overlays/popover.tsx`.

## Utils

## `kbd` — Kbd

Keyboard key and key group with Orchid styling.
Import `@/base-ui/utils/kbd` — `src/base-ui/utils/kbd.tsx`.
Reference: `src/base-ui/utils/kbd.tsx`; https://orchid-ui-hitpay.vercel.app/llms/kbd.md

## `separator` — Separator

Horizontal or vertical separator with Orchid styling.
Import `@/base-ui/utils/separator` — `src/base-ui/utils/separator.tsx`.
