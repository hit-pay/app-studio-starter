# Orchid catalog

Agents: read this file **in full** (Read tool, not Grep). Import `@/components/ui/<name>`. For props, read `src/components/ui/<name>.tsx`.

## `utils` — Utils

cn() Tailwind class merge. Import from @/lib/utils.

# Block

## `schema-form` — Schema Form

JSON schema form. types: input, password, textarea, select, combobox, radio, checkbox, checkbox-group, accepted, switch, slider, input-group, date, datetime, file, quantity, object, section, section-item, hidden, phone.

## `schema-table` — Schema Table

JSON-schema list with search, filters, sorting, pagination, and Orchid DataTable primitives.

## `app-shell` — App Shell

Embedded app layout with page-title, tabs, and sub-sidebar variants.

## `sub-sidebar` — Sub Sidebar

Grouped secondary navigation with back header and active item styling.

## `alert` — Alert

shadcn-compatible alert with semantic variants and top-right or bottom action placement in Orchid styling.

## `list-item` — List Item

List row (title, media, meta, actions). layout Default|Stack|Media, selected.

## `empty` — Empty

shadcn-compatible compound empty state with Orchid media variants.

## `customer-card` — Customer Card

Customer/beneficiary summary. variant Small|Big|Float|Empty, hover, active.

# Component

## `form-page` — Form Page

Full-page form layout used instead of a dialog, with header, scrollable content, and footer actions.

# Block

## `page-title` — Page Title

Page heading: title, chip, description, copy id, actions.

# Component

## `alert-dialog` — Alert Dialog

shadcn-compatible confirmation dialog primitives with Orchid styling.

# Block

## `confirm-dialog` — Confirm Dialog

Prebuilt Promise-based confirmation dialog invoked with useConfirmDialog.

# Component

## `button` — Button

shadcn-compatible Base UI button with standard variants and sizes in Orchid styling.

## `button-group` — Button Group

shadcn-compatible grouped controls with horizontal or vertical orientation and Orchid styling.

## `dropdown-menu` — Dropdown Menu

shadcn-compatible menu with items, checkbox and radio selection, submenus, and Orchid styling.

## `toast` — Toast

shadcn-compatible Base UI toast with additive placement options and Orchid semantic styling.

## `badge` — Badge

shadcn-compatible badge with render support plus Orchid tones, appearances, removable badges, and user roles.

## `accordion` — Accordion

shadcn-compatible Base UI accordion with Orchid styling.

## `progress` — Progress

shadcn-compatible compound progress with label, value, track, and indicator primitives.

## `avatar` — Avatar

shadcn-compatible compound avatar with image, fallback, badge, group, and Orchid business styling.

## `tooltip` — Tooltip

shadcn-compatible Base UI tooltip with Orchid styling.

## `tabs` — Tabs

shadcn-compatible horizontal or vertical tabs with default and line variants.

## `choice-card` — Choice Card

Pick one as a card (no radio dot). ChoiceCardGroup alignment Vertical|Horizontal.

## `stat-card` — Stat Card

KPI card (icon, title, value, %). iconColor Blue|Green|Red|Grey.

## `detail-list` — Detail List

Read-only key/value card. style Default|Border.

## `icon-group` — Icon Group

Tight icon actions. style Default|Border.

## `copy-button` — Copy Button

Copy a string (id, phone, URL). prop: value.

## `skeleton` — Skeleton

shadcn-compatible animated loading placeholder with Orchid styling.

## `spinner` — Spinner

shadcn-compatible indeterminate loading icon sized through className.

## `dialog` — Dialog

shadcn-compatible dialog primitives with Orchid sizes and persistent mode.

## `sheet` — Sheet

shadcn-compatible compound sheet with four sides and Orchid styling.

## `breadcrumb` — Breadcrumb

shadcn-compatible breadcrumb with composable router links, page, separator, and ellipsis.

## `pagination` — Pagination

shadcn-compatible link pagination with Orchid buttons and an optional range label.

## `table` — Table

shadcn-compatible semantic HTML table with Orchid styling.

## `data-table` — Data Table

Orchid resizable data grid primitives with selection, toolbar, image, and typed cells.

## `command` — Command

shadcn-compatible cmdk command palette with Orchid styling.

## `kbd` — Kbd

shadcn-compatible keyboard key and key group with Orchid styling.

## `collapsible` — Collapsible

shadcn-compatible Root, Trigger, and Content primitives with Orchid styling.

## `scroll-area` — Scroll Area

shadcn-compatible scroll area and scrollbar primitives with Orchid styling.

## `popover` — Popover

shadcn-compatible non-modal popover primitives with Orchid styling.

## `separator` — Separator

shadcn-compatible horizontal or vertical separator with Orchid styling.

# Form

## `field` — Field

shadcn-compatible field composition with Orchid form styling.

## `label` — Label

shadcn-compatible accessible label with Orchid typography.

## `input` — Input

shadcn-compatible Base UI input with Orchid form styling.

## `input-group` — Input Group

shadcn-compatible input, textarea, addon, and button composition with Orchid styling.

## `textarea` — Textarea

shadcn-compatible auto-sizing textarea with Orchid form styling.

## `select` — Select

shadcn-compatible Base UI select with standard sizes and Orchid styling.

## `combobox` — Combobox

shadcn-compatible searchable single or multi-select with optional Orchid checkbox items and Select All.

## `quantity-input` — Quantity Input

Integer stepper. min/max/step.

## `checkbox` — Checkbox

shadcn-compatible Base UI checkbox with Orchid states and an optional CheckboxGroup helper.

## `radio-group` — Radio Group

shadcn-compatible radio group and item primitives with Orchid styling.

## `switch` — Switch

shadcn-compatible Base UI switch with default and small Orchid sizes.

## `slider` — Slider

shadcn-compatible horizontal or vertical slider with Orchid styling.

## `calendar` — Calendar

shadcn-compatible DayPicker calendar for single, range, or multiple selection in Orchid styling.

## `date-picker` — Date Picker

Orchid helper wrappers following the shadcn Popover + Calendar recipe for date, range, and date-time selection.

## `form-section` — Form Section

Form block heading. FormSectionGroup + FormSectionItem for settings rows.

