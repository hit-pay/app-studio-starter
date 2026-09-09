# Orchid catalog

Agents: read this file **in full** (Read tool, not Grep), **Components & Blocks first**. Prefer a block under `src/components/{category}/` (`@/components/{category}/…`) driven by props or a schema. Only then use **Base Components** under `src/base-ui/{category}/` (`@/base-ui/{category}/…`). Do not assemble a block from many base components. Categories: actions, displaying-data, feedback, form, layout, navigation, overlays, utils. When a Docs link is listed, fetch that Markdown file (not the HTML example page).

# Utils

## `utils` — Utils

cn() Tailwind class merge. Import from @/lib/utils.
Import `@/lib/utils`; read `src/lib/utils.ts`.

# Components & Blocks

## Actions

## `icon-group` — Icon Group

Props-based icon actions. style border inserts dividers automatically.
Import `@/components/actions/icon-group`; read `src/components/actions/icon-group.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/icon-group.md

## `copy-button` — Copy Button

Copy a string (id, phone, URL). prop: value.
Import `@/components/actions/copy-button`; read `src/components/actions/copy-button.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/copy-button.md

## Displaying Data

## `data-table` — Data Table

JSON-schema list with search, filters, sorting, pagination.
Import `@/components/displaying-data/data-table`; read `src/components/displaying-data/data-table.tsx`.
Related source: `src/components/displaying-data/data-table-model.ts`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/data-table.md

## `customer-card` — Customer Card

Customer/beneficiary summary. variant small|big|float|empty, hover, active.
Import `@/components/displaying-data/customer-card`; read `src/components/displaying-data/customer-card.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/customer-card.md

## `metric-card` — Metric Card

Dashboard KPI / metric card: icon, title, value, and optional percent change. Use for revenue, volume, counts.
Import `@/components/displaying-data/metric-card`; read `src/components/displaying-data/metric-card.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/metric-card.md

## `detail-list` — Detail List

Props-based read-only key/value card with React node values. style default|border.
Import `@/components/displaying-data/detail-list`; read `src/components/displaying-data/detail-list.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/detail-list.md

## Form

## `form-builder` — Form Builder

JSON schema fields. Wrap in FormLayout. types: input, password, textarea, select, combobox, radio, choice-card, checkbox, checkbox-group, accepted, switch, slider, input-group, date, datetime, date-range, file, quantity, object, section, section-item, hidden, phone.
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

## `date-picker` — Date Picker

Orchid helper wrappers following the shadcn Popover + Calendar recipe for date, range, and date-time selection.
Import `@/components/form/date-picker`; read `src/components/form/date-picker.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/date-picker.md

## Layout

## `form-layout` — Form Layout

Create/edit shell (page or modal). Put FormBuilder inside; one form uses formId = FormBuilder id. Several forms use actions.save.onClick.
Import `@/components/layout/form-layout`; read `src/components/layout/form-layout.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/form-layout.md

## `app-layout` — App Layout

Embedded application frame with optional app name, tabs, and sidebar.
Import `@/components/layout/app-layout`; read `src/components/layout/app-layout.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/app-layout.md

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

Simple flat child navigation for AppLayout sidebar mode with a blue active state.
Import `@/components/navigation/sub-sidebar`; read `src/components/navigation/sub-sidebar.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/sub-sidebar.md

## Overlays

## `confirmation-modal` — Confirmation Modal

Prebuilt Promise-based confirmation modal invoked with useConfirmationModal.
Import `@/components/overlays/confirmation-modal`; read `src/components/overlays/confirmation-modal.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/confirmation-modal.md

# Base Components

## Actions

## `button` — Button

shadcn-compatible Base UI button with standard variants and sizes in Orchid styling.
Import `@/base-ui/actions/button`; read `src/base-ui/actions/button.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/button.md

## `button-group` — Button Group

shadcn-compatible grouped controls with horizontal or vertical orientation and Orchid styling.
Import `@/base-ui/actions/button-group`; read `src/base-ui/actions/button-group.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/button-group.md

## Displaying Data

## `list-item` — List Item

List row (title, media, meta, actions). layout default|stack|media, selected.
Import `@/base-ui/displaying-data/list-item`; read `src/base-ui/displaying-data/list-item.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/list-item.md

## `empty` — Empty

shadcn-compatible compound empty state with Orchid media variants.
Import `@/base-ui/displaying-data/empty`; read `src/base-ui/displaying-data/empty.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/empty.md

## `badge` — Badge

shadcn-compatible badge with render support plus Orchid tones, appearances, removable badges, and user roles.
Import `@/base-ui/displaying-data/badge`; read `src/base-ui/displaying-data/badge.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/badge.md

## `avatar` — Avatar

shadcn-compatible compound avatar with image, fallback, badge, group, and Orchid business styling.
Import `@/base-ui/displaying-data/avatar`; read `src/base-ui/displaying-data/avatar.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/avatar.md

## `table` — Table

shadcn-compatible semantic HTML table with Orchid styling.
Import `@/base-ui/displaying-data/table`; read `src/base-ui/displaying-data/table.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/table.md

## `chart` — Chart

shadcn-compatible Recharts wrapper with Orchid tooltip, legend, and chart tokens for dashboard series.
Import `@/base-ui/displaying-data/chart`; read `src/base-ui/displaying-data/chart.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/chart.md

## `attachment` — Attachment

shadcn-compatible file and image attachment with upload state, media, actions, and a vertical group.
Import `@/base-ui/displaying-data/attachment`; read `src/base-ui/displaying-data/attachment.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/attachment.md

## Feedback

## `alert` — Alert

shadcn-compatible alert with semantic variants and top-right or bottom action placement in Orchid styling.
Import `@/base-ui/feedback/alert`; read `src/base-ui/feedback/alert.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/alert.md

## `toast` — Toast

shadcn-compatible Base UI toast with additive placement options and Orchid semantic styling.
Import `@/base-ui/feedback/toast`; read `src/base-ui/feedback/toast.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/toast.md

## `progress` — Progress

shadcn-compatible compound progress with label, value, track, and indicator primitives.
Import `@/base-ui/feedback/progress`; read `src/base-ui/feedback/progress.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/progress.md

## `skeleton` — Skeleton

shadcn-compatible animated loading placeholder with Orchid styling.
Import `@/base-ui/feedback/skeleton`; read `src/base-ui/feedback/skeleton.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/skeleton.md

## `spinner` — Spinner

shadcn-compatible indeterminate loading icon sized through className.
Import `@/base-ui/feedback/spinner`; read `src/base-ui/feedback/spinner.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/spinner.md

## Form

## `field` — Field

shadcn-compatible field composition with Orchid form styling.
Import `@/base-ui/form/field`; read `src/base-ui/form/field.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/field.md

## `label` — Label

shadcn-compatible accessible label with Orchid typography.
Import `@/base-ui/form/label`; read `src/base-ui/form/label.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/label.md

## `input` — Input

shadcn-compatible Base UI input with Orchid form styling.
Import `@/base-ui/form/input`; read `src/base-ui/form/input.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/input.md

## `input-group` — Input Group

shadcn-compatible input, textarea, addon, and button composition with Orchid styling.
Import `@/base-ui/form/input-group`; read `src/base-ui/form/input-group.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/input-group.md

## `textarea` — Textarea

shadcn-compatible auto-sizing textarea with Orchid form styling.
Import `@/base-ui/form/textarea`; read `src/base-ui/form/textarea.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/textarea.md

## `select` — Select

shadcn-compatible Base UI select with standard sizes and Orchid styling.
Import `@/base-ui/form/select`; read `src/base-ui/form/select.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/select.md

## `combobox` — Combobox

shadcn-compatible searchable single or multi-select with optional Orchid checkbox items and Select All.
Import `@/base-ui/form/combobox`; read `src/base-ui/form/combobox.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/combobox.md

## `checkbox` — Checkbox

shadcn-compatible Base UI checkbox with Orchid states and an optional CheckboxGroup helper.
Import `@/base-ui/form/checkbox`; read `src/base-ui/form/checkbox.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/checkbox.md

## `radio-group` — Radio Group

shadcn-compatible radio group and item primitives with Orchid styling.
Import `@/base-ui/form/radio-group`; read `src/base-ui/form/radio-group.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/radio-group.md

## `switch` — Switch

shadcn-compatible Base UI switch with default and small Orchid sizes.
Import `@/base-ui/form/switch`; read `src/base-ui/form/switch.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/switch.md

## `slider` — Slider

shadcn-compatible horizontal or vertical slider with Orchid styling.
Import `@/base-ui/form/slider`; read `src/base-ui/form/slider.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/slider.md

## `calendar` — Calendar

shadcn-compatible DayPicker calendar for single, range, or multiple selection in Orchid styling.
Import `@/base-ui/form/calendar`; read `src/base-ui/form/calendar.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/calendar.md

## `form-section` — Form Section

Form block heading. FormSectionGroup + FormSectionItem for settings rows.
Import `@/base-ui/form/form-section`; read `src/base-ui/form/form-section.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/form-section.md

## Layout

## `accordion` — Accordion

shadcn-compatible Base UI accordion with Orchid styling.
Import `@/base-ui/layout/accordion`; read `src/base-ui/layout/accordion.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/accordion.md

## `tabs` — Tabs

shadcn-compatible horizontal or vertical tabs with default and line variants.
Import `@/base-ui/layout/tabs`; read `src/base-ui/layout/tabs.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/tabs.md

## `collapsible` — Collapsible

shadcn-compatible Root, Trigger, and Content primitives with Orchid styling.
Import `@/base-ui/layout/collapsible`; read `src/base-ui/layout/collapsible.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/collapsible.md

## `scroll-area` — Scroll Area

shadcn-compatible scroll area and scrollbar primitives with Orchid styling.
Import `@/base-ui/layout/scroll-area`; read `src/base-ui/layout/scroll-area.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/scroll-area.md

## `card` — Card

shadcn-compatible content card with header, title, description, action, content, and footer in Orchid styling.
Import `@/base-ui/layout/card`; read `src/base-ui/layout/card.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/card.md

## `resizable` — Resizable

shadcn-compatible split panes with a drag handle in Orchid styling.
Import `@/base-ui/layout/resizable`; read `src/base-ui/layout/resizable.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/resizable.md

## `aspect-ratio` — Aspect Ratio

shadcn-compatible box that keeps a width/height ratio.
Import `@/base-ui/layout/aspect-ratio`; read `src/base-ui/layout/aspect-ratio.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/aspect-ratio.md

## Navigation

## `breadcrumb` — Breadcrumb

shadcn-compatible breadcrumb with composable router links, page, separator, and ellipsis.
Import `@/base-ui/navigation/breadcrumb`; read `src/base-ui/navigation/breadcrumb.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/breadcrumb.md

## `pagination` — Pagination

shadcn-compatible link pagination with Orchid buttons and an optional range label.
Import `@/base-ui/navigation/pagination`; read `src/base-ui/navigation/pagination.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/pagination.md

## Overlays

## `dropdown-menu` — Dropdown Menu

shadcn-compatible menu with items, checkbox and radio selection, submenus, and Orchid styling.
Import `@/base-ui/overlays/dropdown-menu`; read `src/base-ui/overlays/dropdown-menu.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/dropdown-menu.md

## `tooltip` — Tooltip

shadcn-compatible Base UI tooltip with Orchid styling.
Import `@/base-ui/overlays/tooltip`; read `src/base-ui/overlays/tooltip.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/tooltip.md

## `dialog` — Dialog

shadcn-compatible dialog primitives with Orchid sizes and persistent mode.
Import `@/base-ui/overlays/dialog`; read `src/base-ui/overlays/dialog.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/dialog.md

## `sheet` — Sheet

shadcn-compatible compound sheet with four sides and Orchid styling.
Import `@/base-ui/overlays/sheet`; read `src/base-ui/overlays/sheet.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/sheet.md

## `command` — Command

shadcn-compatible cmdk command palette with Orchid styling.
Import `@/base-ui/overlays/command`; read `src/base-ui/overlays/command.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/command.md

## `popover` — Popover

shadcn-compatible non-modal popover primitives with Orchid styling.
Import `@/base-ui/overlays/popover`; read `src/base-ui/overlays/popover.tsx`.

## Utils

## `kbd` — Kbd

shadcn-compatible keyboard key and key group with Orchid styling.
Import `@/base-ui/utils/kbd`; read `src/base-ui/utils/kbd.tsx`.
Docs: https://orchid-ui-hitpay.vercel.app/llms/kbd.md

## `separator` — Separator

shadcn-compatible horizontal or vertical separator with Orchid styling.
Import `@/base-ui/utils/separator`; read `src/base-ui/utils/separator.tsx`.
