# Orchid catalog

Read this file **in full** (Read tool, not Grep). Match the job to each **Components & Blocks** description, then open the listed source and Docs `.md`. Use **Base Components** only when no block covers the job. Categories: actions, displaying-data, feedback, form, layout, navigation, overlays, utils.

# Utils

## `utils` — Utils

Cn() Tailwind class merge. Import from @/lib/utils.
Import `@/lib/utils`; read `src/lib/utils.ts`.

# Components & Blocks

## Displaying Data

## `data-table` — Data Table

Schema-driven collection when the user needs search, column filters, sorting, or pagination. Do not default every list here — use Data List for compact collections and Detail Card for one record. rowActions defaults to true (Edit + Delete). One-field edits use cells. editColumns only toggles column visibility.
Import `@/components/displaying-data/data-table`; read `src/components/displaying-data/data-table.tsx`.
Related source: `src/components/displaying-data/data-table-model.ts`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/data-table.md

## `customer-card` — Customer Card

Customer/beneficiary summary. variant small|big|float|empty, hover, active.
Import `@/components/displaying-data/customer-card`; read `src/components/displaying-data/customer-card.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/customer-card.md

## `metric-card` — Metric Card

Dashboard KPI tile: icon, title, value, optional percent change. Use for revenue, volume, counts — not for a record's fields (use Detail Card).
Import `@/components/displaying-data/metric-card`; read `src/components/displaying-data/metric-card.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/metric-card.md

## `data-list` — Data List

Pass items[] only: key, title, optional description, details, media, actions.menu / actions.hover. Use when the list does not need search, filters, sort, or pagination. Do not assemble ListItem parts. Not for one record — use Detail Card.
Import `@/components/displaying-data/data-list`; read `src/components/displaying-data/data-list.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/data-list.md

## `detail-card` — Detail Card

Read-only key/value card for one record (invoice, leave request, customer). Use on show/detail pages. Not a collection — use Data List or Data Table for many items. items plus optional title, columns, style default|border. Values can be React nodes.
Import `@/components/displaying-data/detail-card`; read `src/components/displaying-data/detail-card.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/detail-card.md

## Form

## `form-builder` — Form Builder

Multi-field create/edit from a JSON schema. Wrap in FormLayout; submit through formId. Use when the screen is a form, not a detail view. types: input, password, textarea, select, combobox, radio, choice-card, checkbox, checkbox-group, accepted, switch, slider, input-group, date, datetime, date-range, file, quantity, object, section, section-item, hidden, phone. Unknown types throw.
Import `@/components/form/form-builder`; read `src/components/form/form-builder.tsx`.
Related source: `src/components/form/form-builder-model.ts`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/form-builder.md

## `choice-card` — Choice Card

Pick one as a card (no radio dot). ChoiceCardGroup alignment vertical|horizontal.
Import `@/components/form/choice-card`; read `src/components/form/choice-card.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/choice-card.md

## `quantity-input` — Quantity Input

Integer stepper. min/max/step.
Import `@/components/form/quantity-input`; read `src/components/form/quantity-input.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/quantity-input.md

## `text-editor` — Text Editor

Lexical rich text for notes. Bold, italic, heading, lists. Persist editor JSON.
Import `@/components/form/text-editor`; read `src/components/form/text-editor.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/text-editor.md

## `date-picker` — Date Picker

Date, range, and date-time selection with popover and calendar helpers.
Import `@/components/form/date-picker`; read `src/components/form/date-picker.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/date-picker.md

## Layout

## `form-layout` — Form Layout

Create/edit scroll shell (page or modal). When the form is FormBuilder, one form uses formId = FormBuilder id. Several forms use actions.save.onClick. Use PageLayout for browse/show.
Import `@/components/layout/form-layout`; read `src/components/layout/form-layout.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/form-layout.md

## `app-studio-layout` — App Studio Layout

HitPay App Studio embedded pane frame (not generic app chrome). Optional app name, tabs, and sidebar.
Import `@/components/layout/app-studio-layout`; read `src/components/layout/app-studio-layout.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/app-studio-layout.md

## `page-layout` — Page Layout

Standard route page with built-in responsive padding, header, and scrollable content.
Import `@/components/layout/page-layout`; read `src/components/layout/page-layout.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/page-layout.md

## Navigation

## `sidebar` — Sidebar

JSON-configured navigation with inline accordion children or a back-enabled Sub Sidebar per item.
Import `@/components/navigation/sidebar`; read `src/components/navigation/sidebar.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/sidebar.md

## `sub-sidebar` — Sub Sidebar

Standalone flat child navigation with a blue active state. Not used by AppStudioLayout sidebar mode.
Import `@/components/navigation/sub-sidebar`; read `src/components/navigation/sub-sidebar.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/sub-sidebar.md

## Overlays

## `confirmation-modal` — Confirmation Modal

Prebuilt Promise-based confirmation modal invoked with useConfirmationModal.
Import `@/components/overlays/confirmation-modal`; read `src/components/overlays/confirmation-modal.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/confirmation-modal.md

## `command` — Command

Searchable command palette driven by open, onOpenChange, and groups.
Import `@/components/overlays/command`; read `src/components/overlays/command.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/command.md

# Base Components

## Actions

## `button` — Button

Base UI button with standard variants and sizes in Orchid styling.
Import `@/base-ui/actions/button`; read `src/base-ui/actions/button.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/button.md

## `button-group` — Button Group

Attached controls plus ghost and border icon toolbars. Overflow actions compose with DropdownMenu.
Import `@/base-ui/actions/button-group`; read `src/base-ui/actions/button-group.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/button-group.md

## `copy-button` — Copy Button

Copy a string (id, phone, URL). prop: value.
Import `@/base-ui/actions/copy-button`; read `src/base-ui/actions/copy-button.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/copy-button.md

## Displaying Data

## `list` — List

Row primitives (ListItem, title, media, meta, actions). layout default|stack|media, selected.
Import `@/base-ui/displaying-data/list`; read `src/base-ui/displaying-data/list.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/list.md

## `empty` — Empty

Compound empty state with Orchid media variants.
Import `@/base-ui/displaying-data/empty`; read `src/base-ui/displaying-data/empty.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/empty.md

## `badge` — Badge

Badge with render support plus Orchid tones, appearances, removable badges, and user roles.
Import `@/base-ui/displaying-data/badge`; read `src/base-ui/displaying-data/badge.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/badge.md

## `avatar` — Avatar

Compound avatar with image, fallback, badge, group, and Orchid business styling.
Import `@/base-ui/displaying-data/avatar`; read `src/base-ui/displaying-data/avatar.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/avatar.md

## `table` — Table

Semantic HTML table with Orchid styling.
Import `@/base-ui/displaying-data/table`; read `src/base-ui/displaying-data/table.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/table.md

## `chart` — Chart

Recharts wrapper with Orchid tooltip, legend, and chart tokens for dashboard series.
Import `@/base-ui/displaying-data/chart`; read `src/base-ui/displaying-data/chart.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/chart.md

## Feedback

## `alert` — Alert

Alert with semantic variants and top-right or bottom action placement in Orchid styling.
Import `@/base-ui/feedback/alert`; read `src/base-ui/feedback/alert.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/alert.md

## `toast` — Toast

Base UI toast with additive placement options and Orchid semantic styling.
Import `@/base-ui/feedback/toast`; read `src/base-ui/feedback/toast.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/toast.md

## `progress` — Progress

Compound progress with label, value, track, and indicator primitives.
Import `@/base-ui/feedback/progress`; read `src/base-ui/feedback/progress.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/progress.md

## `skeleton` — Skeleton

Animated loading placeholder with Orchid styling.
Import `@/base-ui/feedback/skeleton`; read `src/base-ui/feedback/skeleton.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/skeleton.md

## `spinner` — Spinner

Indeterminate loading icon sized through className.
Import `@/base-ui/feedback/spinner`; read `src/base-ui/feedback/spinner.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/spinner.md

## Form

## `field` — Field

Field composition with Orchid form styling.
Import `@/base-ui/form/field`; read `src/base-ui/form/field.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/field.md

## `label` — Label

Accessible label with Orchid typography.
Import `@/base-ui/form/label`; read `src/base-ui/form/label.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/label.md

## `input` — Input

Base UI input with Orchid form styling.
Import `@/base-ui/form/input`; read `src/base-ui/form/input.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/input.md

## `input-group` — Input Group

Input, textarea, addon, and button composition with Orchid styling.
Import `@/base-ui/form/input-group`; read `src/base-ui/form/input-group.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/input-group.md

## `textarea` — Textarea

Auto-sizing textarea with Orchid form styling.
Import `@/base-ui/form/textarea`; read `src/base-ui/form/textarea.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/textarea.md

## `select` — Select

Base UI select with standard sizes and Orchid styling.
Import `@/base-ui/form/select`; read `src/base-ui/form/select.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/select.md

## `combobox` — Combobox

Searchable single or multi-select with optional Orchid checkbox items and Select All.
Import `@/base-ui/form/combobox`; read `src/base-ui/form/combobox.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/combobox.md

## `checkbox` — Checkbox

Base UI checkbox with Orchid states and an optional CheckboxGroup helper.
Import `@/base-ui/form/checkbox`; read `src/base-ui/form/checkbox.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/checkbox.md

## `radio-group` — Radio Group

Radio group and item primitives with Orchid styling.
Import `@/base-ui/form/radio-group`; read `src/base-ui/form/radio-group.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/radio-group.md

## `switch` — Switch

Base UI switch with default and small Orchid sizes.
Import `@/base-ui/form/switch`; read `src/base-ui/form/switch.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/switch.md

## `slider` — Slider

Horizontal or vertical slider with Orchid styling.
Import `@/base-ui/form/slider`; read `src/base-ui/form/slider.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/slider.md

## `calendar` — Calendar

DayPicker calendar for single, range, or multiple selection in Orchid styling.
Import `@/base-ui/form/calendar`; read `src/base-ui/form/calendar.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/calendar.md

## `file-upload` — File Upload

File and image upload row with upload state, media, actions, and a vertical group.
Import `@/base-ui/form/file-upload`; read `src/base-ui/form/file-upload.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/file-upload.md

## `form-section` — Form Section

Form block heading. FormSectionGroup + FormSectionItem for settings rows.
Import `@/base-ui/form/form-section`; read `src/base-ui/form/form-section.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/form-section.md

## Layout

## `accordion` — Accordion

Base UI accordion with Orchid styling.
Import `@/base-ui/layout/accordion`; read `src/base-ui/layout/accordion.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/accordion.md

## `tabs` — Tabs

Horizontal or vertical tabs with default and line variants.
Import `@/base-ui/layout/tabs`; read `src/base-ui/layout/tabs.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/tabs.md

## `collapsible` — Collapsible

Root, Trigger, and Content primitives with Orchid styling.
Import `@/base-ui/layout/collapsible`; read `src/base-ui/layout/collapsible.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/collapsible.md

## `scroll-area` — Scroll Area

Scroll area and scrollbar primitives with Orchid styling.
Import `@/base-ui/layout/scroll-area`; read `src/base-ui/layout/scroll-area.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/scroll-area.md

## `card` — Card

Content card with header, title, description, action, content, and footer in Orchid styling.
Import `@/base-ui/layout/card`; read `src/base-ui/layout/card.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/card.md

## `resizable` — Resizable

Split panes with a drag handle in Orchid styling.
Import `@/base-ui/layout/resizable`; read `src/base-ui/layout/resizable.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/resizable.md

## `aspect-ratio` — Aspect Ratio

Box that keeps a width/height ratio.
Import `@/base-ui/layout/aspect-ratio`; read `src/base-ui/layout/aspect-ratio.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/aspect-ratio.md

## Navigation

## `breadcrumb` — Breadcrumb

Breadcrumb with composable router links, page, separator, and ellipsis.
Import `@/base-ui/navigation/breadcrumb`; read `src/base-ui/navigation/breadcrumb.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/breadcrumb.md

## `pagination` — Pagination

Link pagination with Orchid buttons and an optional range label.
Import `@/base-ui/navigation/pagination`; read `src/base-ui/navigation/pagination.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/pagination.md

## Overlays

## `dropdown-menu` — Dropdown Menu

Menu with items, checkbox and radio selection, submenus, and Orchid styling.
Import `@/base-ui/overlays/dropdown-menu`; read `src/base-ui/overlays/dropdown-menu.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/dropdown-menu.md

## `tooltip` — Tooltip

Base UI tooltip with Orchid styling.
Import `@/base-ui/overlays/tooltip`; read `src/base-ui/overlays/tooltip.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/tooltip.md

## `dialog` — Dialog

Dialog primitives with Orchid sizes and persistent mode.
Import `@/base-ui/overlays/dialog`; read `src/base-ui/overlays/dialog.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/dialog.md

## `drawer` — Drawer

Swipeable edge panel. Set swipeDirection to up, right, down, or left.
Import `@/base-ui/overlays/drawer`; read `src/base-ui/overlays/drawer.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/drawer.md

## `popover` — Popover

Non-modal popover primitives with Orchid styling.
Import `@/base-ui/overlays/popover`; read `src/base-ui/overlays/popover.tsx`.

## Utils

## `kbd` — Kbd

Keyboard key and key group with Orchid styling.
Import `@/base-ui/utils/kbd`; read `src/base-ui/utils/kbd.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/kbd.md

## `separator` — Separator

Horizontal or vertical separator with Orchid styling.
Import `@/base-ui/utils/separator`; read `src/base-ui/utils/separator.tsx`.
