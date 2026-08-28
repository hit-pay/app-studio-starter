# Orchid catalog

Agents: read this file **in full** (Read tool, not Grep). Import `@/components/ui/<name>`. For props, read `src/components/ui/<name>.tsx`.

## `utils` — Utils

cn() Tailwind class merge. Import from @/lib/utils.

# Block

## `schema-form` — Schema Form

JSON schema form. types: input, password, textarea, select, combobox, radio, checkbox, checkbox-group, accepted, switch, slider, input-group, date, datetime, file, quantity, object, section, section-item, hidden, phone.

## `schema-table` — Schema Table

JSON-schema list: search, tabs, filter, sort, pagination. Uses Table.

## `app-shell` — App Shell

Iframe chrome: header + AppShellNavItem tabs. No sidebar, no login card.

## `alert` — Alert

In-page banner (not toast). color Default|Blue|Red|Orange|Grey, action Bottom|Right.

## `list-item` — List Item

List row (title, media, meta, actions). layout Default|Stack|Media, selected.

## `empty` — Empty

Zero-data / no results / upgrade CTA. variant Default|Search|Upgrade.

## `customer-card` — Customer Card

Customer/beneficiary summary. variant Small|Big|Float|Empty, hover, active.

## `page-toolbar` — Page Toolbar

Nested screen bar: Back or Close + right actions. Page title sits below.

## `page-title` — Page Title

Page heading: title, chip, description, copy id, actions.

## `confirm-dialog` — Confirm Dialog

Confirm overlay. type Delete|Warning|Success|Question, size Small|Medium, confirmPhrase.

# Component

## `button` — Button

Actions. variant Primary|Secondary|Destructive, style Default|Border|Transparent, size Small|Default|Big, shape Default|Circle, iconOnly.

## `dropdown-menu` — Dropdown Menu

Overflow/grouped actions on a trigger. Item variant default|destructive.

## `toast` — Toast

Floating toast. toast.add({ title, type: success|info|warning|error }). Mount Toaster in root.

## `badge` — Badge

Status/tags. color Blue|Purple|Orange|Red|LightRed|White|DarkBlue|Grey|Tosca|Green, style Background|Border|Transparent. UserBadge role Owner|Admin|Manager|Cashier.

## `accordion` — Accordion

Expand/collapse sections. AccordionTrigger: title, description, label, progress.

## `progress` — Progress

Known completion (value/max). size Default|Small.

## `avatar` — Avatar

Face/initials. variant Default|Business|Image, size 24|28|32|40|48|64.

## `tooltip` — Tooltip

Hover/focus hint. TooltipProvider + Content side.

## `tabs` — Tabs

In-page view switch. variant Default|Pills, size Default|Big.

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

Loading placeholder bars. Shape via className.

## `spinner` — Spinner

Indeterminate load. size Small|Default|Big.

## `dialog` — Dialog

Centered overlay. size Small|Medium|Default|Confirmation|Fullscreen, persistent.

## `sheet` — Sheet

Edge panel. side Right|Left|Top|Bottom, size Small|Medium|Default.

## `breadcrumb` — Breadcrumb

Path trail. List + Item + Link + Page + Separator.

## `pagination` — Pagination

Paged lists. Previous/Next, Ellipsis, PaginationInfo.

## `table` — Table

List chrome (div, not HTML table). Cell type Default|Checkbox|Image|Icon|Empty. TableSelectionBar.

## `command` — Command

Command palette. CommandDialog + Input + List + Item.

## `kbd` — Kbd

Keyboard shortcut keys. Kbd + KbdGroup.

## `collapsible` — Collapsible

One expand/collapse panel. Trigger + Content.

## `scroll-area` — Scroll Area

Custom scrollbar in a bounded panel. ScrollBar vertical|horizontal.

## `popover` — Popover

Small click panel (not a modal). Trigger render Button.

## `separator` — Separator

Divider. orientation horizontal|vertical.

# Form

## `field` — Field

Form row: label, control, hint, error. FieldGroup + Field + FieldLabel.

## `label` — Label

Accessible label (htmlFor). Prefer FieldLabel in forms.

## `input` — Input

Single-line text. Use with Field; prefix/suffix → input-group.

## `input-group` — Input Group

Input + prefix/suffix/inline select. Addon align start|end. Use InputGroupInput, not raw Input.

## `textarea` — Textarea

Multi-line text. Use with Field.

## `select` — Select

Closed one-of-many list. Select + Trigger + Value + Item.

## `combobox` — Combobox

Searchable pick (single/multi). Checkbox + SelectAll; chips for multi.

## `quantity-input` — Quantity Input

Integer stepper. min/max/step.

## `checkbox` — Checkbox

Multi-select. CheckboxGroup alignment Vertical|Horizontal.

## `radio-group` — Radio Group

Pick one from a short list. RadioGroup alignment Vertical|Horizontal.

## `switch` — Switch

On/off setting. size Default|Small.

## `slider` — Slider

Number or range on a track. Array value = two thumbs.

## `calendar` — Calendar

Month grid. mode single|range|multiple. Prefer date-picker in forms.

## `date-picker` — Date Picker

Day, range, or date+time. DatePicker | DatePickerRange | DateTimePicker.

## `form-section` — Form Section

Form block heading. FormSectionGroup + FormSectionItem for settings rows.

