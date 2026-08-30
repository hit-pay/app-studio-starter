# Orchid catalog

Agents: read this file **in full** (Read tool, not Grep). Import and inspect each item at the paths listed below; registry targets determine whether it lives in `src/components/` or `src/components/ui/`.

## `utils` — Utils

cn() Tailwind class merge. Import from @/lib/utils.
Import `@/lib/utils`; read `src/lib/utils.ts`.


# Form

## `schema-form` — Schema Form

JSON schema form. types: input, password, textarea, select, combobox, radio, checkbox, checkbox-group, accepted, switch, slider, input-group, date, datetime, file, quantity, object, section, section-item, hidden, phone.
Import `@/components/schema-form`; read `src/components/schema-form.tsx`.
Related source: `src/components/schema-form-model.ts`.

# Block

## `schema-table` — Schema Table

JSON-schema list with search, filters, sorting, pagination, and integrated table rendering.
Import `@/components/schema-table`; read `src/components/schema-table.tsx`.
Related source: `src/components/schema-table-model.ts`.

## `sidebar` — Sidebar

JSON-configured navigation with inline accordion children or a back-enabled Sub Sidebar per item.
Import `@/components/sidebar`; read `src/components/sidebar.tsx`.


## `sub-sidebar` — Sub Sidebar

Simple flat child navigation for AppLayout sidebar mode with a blue active state.
Import `@/components/sub-sidebar`; read `src/components/sub-sidebar.tsx`.


# Component

## `alert` — Alert

shadcn-compatible alert with semantic variants and top-right or bottom action placement in Orchid styling.
Import `@/components/ui/alert`; read `src/components/ui/alert.tsx`.


## `list-item` — List Item

List row (title, media, meta, actions). layout Default|Stack|Media, selected.
Import `@/components/ui/list-item`; read `src/components/ui/list-item.tsx`.


## `empty` — Empty

shadcn-compatible compound empty state with Orchid media variants.
Import `@/components/ui/empty`; read `src/components/ui/empty.tsx`.


# Block

## `customer-card` — Customer Card

Customer/beneficiary summary. variant Small|Big|Float|Empty, hover, active.
Import `@/components/customer-card`; read `src/components/customer-card.tsx`.


# Form

## `form-layout` — Form Layout

Create and edit form shell with page and modal modes, default Cancel/Save actions, external form submission, and controlled dialog support.
Import `@/components/form-layout`; read `src/components/form-layout.tsx`.


# Block

## `page-layout` — Page Layout

Standard route page with built-in responsive padding, header, and scrollable content.
Import `@/components/page-layout`; read `src/components/page-layout.tsx`.


# Component

## `alert-dialog` — Alert Dialog

shadcn-compatible confirmation dialog primitives with Orchid styling.
Import `@/components/ui/alert-dialog`; read `src/components/ui/alert-dialog.tsx`.


# Block

## `confirmation-modal` — Confirmation Modal

Prebuilt Promise-based confirmation modal invoked with useConfirmationModal.
Import `@/components/confirmation-modal`; read `src/components/confirmation-modal.tsx`.


# Component

## `button` — Button

shadcn-compatible Base UI button with standard variants and sizes in Orchid styling.
Import `@/components/ui/button`; read `src/components/ui/button.tsx`.


## `button-group` — Button Group

shadcn-compatible grouped controls with horizontal or vertical orientation and Orchid styling.
Import `@/components/ui/button-group`; read `src/components/ui/button-group.tsx`.


## `dropdown-menu` — Dropdown Menu

shadcn-compatible menu with items, checkbox and radio selection, submenus, and Orchid styling.
Import `@/components/ui/dropdown-menu`; read `src/components/ui/dropdown-menu.tsx`.


## `toast` — Toast

shadcn-compatible Base UI toast with additive placement options and Orchid semantic styling.
Import `@/components/ui/toast`; read `src/components/ui/toast.tsx`.


## `badge` — Badge

shadcn-compatible badge with render support plus Orchid tones, appearances, removable badges, and user roles.
Import `@/components/ui/badge`; read `src/components/ui/badge.tsx`.


## `accordion` — Accordion

shadcn-compatible Base UI accordion with Orchid styling.
Import `@/components/ui/accordion`; read `src/components/ui/accordion.tsx`.


## `progress` — Progress

shadcn-compatible compound progress with label, value, track, and indicator primitives.
Import `@/components/ui/progress`; read `src/components/ui/progress.tsx`.


## `avatar` — Avatar

shadcn-compatible compound avatar with image, fallback, badge, group, and Orchid business styling.
Import `@/components/ui/avatar`; read `src/components/ui/avatar.tsx`.


## `tooltip` — Tooltip

shadcn-compatible Base UI tooltip with Orchid styling.
Import `@/components/ui/tooltip`; read `src/components/ui/tooltip.tsx`.


## `tabs` — Tabs

shadcn-compatible horizontal or vertical tabs with default and line variants.
Import `@/components/ui/tabs`; read `src/components/ui/tabs.tsx`.


# Block

## `choice-card` — Choice Card

Pick one as a card (no radio dot). ChoiceCardGroup alignment Vertical|Horizontal.
Import `@/components/choice-card`; read `src/components/choice-card.tsx`.


## `stat-card` — Stat Card

KPI card (icon, title, value, %). iconColor Blue|Green|Red|Grey.
Import `@/components/stat-card`; read `src/components/stat-card.tsx`.


## `detail-list` — Detail List

Props-based read-only key/value card with React node values. style Default|Border.
Import `@/components/detail-list`; read `src/components/detail-list.tsx`.


## `icon-group` — Icon Group

Props-based icon actions. Border style inserts dividers automatically.
Import `@/components/icon-group`; read `src/components/icon-group.tsx`.


## `copy-button` — Copy Button

Copy a string (id, phone, URL). prop: value.
Import `@/components/copy-button`; read `src/components/copy-button.tsx`.


# Component

## `skeleton` — Skeleton

shadcn-compatible animated loading placeholder with Orchid styling.
Import `@/components/ui/skeleton`; read `src/components/ui/skeleton.tsx`.


## `spinner` — Spinner

shadcn-compatible indeterminate loading icon sized through className.
Import `@/components/ui/spinner`; read `src/components/ui/spinner.tsx`.


## `dialog` — Dialog

shadcn-compatible dialog primitives with Orchid sizes and persistent mode.
Import `@/components/ui/dialog`; read `src/components/ui/dialog.tsx`.


## `sheet` — Sheet

shadcn-compatible compound sheet with four sides and Orchid styling.
Import `@/components/ui/sheet`; read `src/components/ui/sheet.tsx`.


## `breadcrumb` — Breadcrumb

shadcn-compatible breadcrumb with composable router links, page, separator, and ellipsis.
Import `@/components/ui/breadcrumb`; read `src/components/ui/breadcrumb.tsx`.


## `pagination` — Pagination

shadcn-compatible link pagination with Orchid buttons and an optional range label.
Import `@/components/ui/pagination`; read `src/components/ui/pagination.tsx`.


## `table` — Table

shadcn-compatible semantic HTML table with Orchid styling.
Import `@/components/ui/table`; read `src/components/ui/table.tsx`.


## `command` — Command

shadcn-compatible cmdk command palette with Orchid styling.
Import `@/components/ui/command`; read `src/components/ui/command.tsx`.


## `kbd` — Kbd

shadcn-compatible keyboard key and key group with Orchid styling.
Import `@/components/ui/kbd`; read `src/components/ui/kbd.tsx`.


## `collapsible` — Collapsible

shadcn-compatible Root, Trigger, and Content primitives with Orchid styling.
Import `@/components/ui/collapsible`; read `src/components/ui/collapsible.tsx`.


## `scroll-area` — Scroll Area

shadcn-compatible scroll area and scrollbar primitives with Orchid styling.
Import `@/components/ui/scroll-area`; read `src/components/ui/scroll-area.tsx`.


## `popover` — Popover

shadcn-compatible non-modal popover primitives with Orchid styling.
Import `@/components/ui/popover`; read `src/components/ui/popover.tsx`.


## `separator` — Separator

shadcn-compatible horizontal or vertical separator with Orchid styling.
Import `@/components/ui/separator`; read `src/components/ui/separator.tsx`.


# Form

## `field` — Field

shadcn-compatible field composition with Orchid form styling.
Import `@/components/ui/field`; read `src/components/ui/field.tsx`.


## `label` — Label

shadcn-compatible accessible label with Orchid typography.
Import `@/components/ui/label`; read `src/components/ui/label.tsx`.


## `input` — Input

shadcn-compatible Base UI input with Orchid form styling.
Import `@/components/ui/input`; read `src/components/ui/input.tsx`.


## `input-group` — Input Group

shadcn-compatible input, textarea, addon, and button composition with Orchid styling.
Import `@/components/ui/input-group`; read `src/components/ui/input-group.tsx`.


## `textarea` — Textarea

shadcn-compatible auto-sizing textarea with Orchid form styling.
Import `@/components/ui/textarea`; read `src/components/ui/textarea.tsx`.


## `select` — Select

shadcn-compatible Base UI select with standard sizes and Orchid styling.
Import `@/components/ui/select`; read `src/components/ui/select.tsx`.


## `combobox` — Combobox

shadcn-compatible searchable single or multi-select with optional Orchid checkbox items and Select All.
Import `@/components/ui/combobox`; read `src/components/ui/combobox.tsx`.


## `quantity-input` — Quantity Input

Integer stepper. min/max/step.
Import `@/components/quantity-input`; read `src/components/quantity-input.tsx`.


## `checkbox` — Checkbox

shadcn-compatible Base UI checkbox with Orchid states and an optional CheckboxGroup helper.
Import `@/components/ui/checkbox`; read `src/components/ui/checkbox.tsx`.


## `radio-group` — Radio Group

shadcn-compatible radio group and item primitives with Orchid styling.
Import `@/components/ui/radio-group`; read `src/components/ui/radio-group.tsx`.


## `switch` — Switch

shadcn-compatible Base UI switch with default and small Orchid sizes.
Import `@/components/ui/switch`; read `src/components/ui/switch.tsx`.


## `slider` — Slider

shadcn-compatible horizontal or vertical slider with Orchid styling.
Import `@/components/ui/slider`; read `src/components/ui/slider.tsx`.


## `calendar` — Calendar

shadcn-compatible DayPicker calendar for single, range, or multiple selection in Orchid styling.
Import `@/components/ui/calendar`; read `src/components/ui/calendar.tsx`.


## `date-picker` — Date Picker

Orchid helper wrappers following the shadcn Popover + Calendar recipe for date, range, and date-time selection.
Import `@/components/date-picker`; read `src/components/date-picker.tsx`.


## `form-section` — Form Section

Form block heading. FormSectionGroup + FormSectionItem for settings rows.
Import `@/components/ui/form-section`; read `src/components/ui/form-section.tsx`.
