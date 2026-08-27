# Orchid catalog

Local component docs. Import `@/orchid-ui/<name>`. For props, read `src/components/orchid-ui/<name>.tsx`.

## `utils` — Utils

Class-name helper (cn). Merge Tailwind classes. Import from @/lib/utils, not as a UI widget.

## `button` — Button

Primary actions: save, cancel, delete, icon-only, split menus. variant Primary|Secondary|Destructive. Native HTML type is type=submit|button|reset (default button). style Default|Border|Transparent, size Small|Default|Big. Not tabs or links in a nav.

## `dropdown-menu` — Dropdown Menu

Overflow or grouped actions on a trigger (Edit, Delete, filters). Use DropdownMenu + Trigger (render Button) + Content + Item. Not for choosing one value from a long list — use select.

## `alert` — Alert

In-page notification above the page header: title, description, actions, close. color Default|Blue|Red|Orange|Grey. Not a floating toast.

## `toast` — Toast

Programmatic floating toast. toast.add({ title, description, type: 'success'|'info'|'warning'|'error' }). Not sonner toast(). Mount Toaster at the app root. Not an in-page alert.

## `badge` — Badge

Status, tags, filters, removable tokens. Badge colors + style Background|Border|Transparent. UserBadge role Owner|Admin|Manager|Cashier. Not a button.

## `accordion` — Accordion

Expand/collapse sections (FAQ, extra details, progress per item). AccordionTrigger title/description/label/progress. Not tabs — use tabs for switching views.

## `progress` — Progress

Show completion of a known total (70/100, upload, wizard). size Default|Small, value/max. Not a loading spinner for the whole page.

## `list-item` — List Item

Generic list row. Compose title, media, logo, meta, copy fields, tokens, hover actions. layout default|stack|media. selected highlights the card. Not a data table.

## `quantity-input` — Quantity Input

Integer quantity (capacity, count). Minus/plus; click the number to type. min/max/step. Not a slider and not a plain text input for money.

## `avatar` — Avatar

Person or business face. size 24–64, variant Default|Business|Image. Initials as children; src for a photo. Pair with names, not as a logo block.

## `tooltip` — Tooltip

Hover/focus hint on an icon or truncated label. TooltipProvider + Content side. Not a popover with buttons — use popover or dropdown-menu.

## `tabs` — Tabs

Switch views on one page (Week | My shifts | Review). variant Default underline or Pills. TabsList + TabsTrigger + TabsContent. Not a dropdown of actions.

## `choice-card` — Choice Card

Pick one option as a card (plan, shift slot, payment method) without a radio dot. ChoiceCardGroup. Not a checkbox list and not select.

## `stat-card` — Stat Card

Dashboard KPI: icon, title, value, percent badge. iconColor Blue|Green|Red|Grey. Grid several on a home/overview page. Not a list row — use list-item.

## `page-toolbar` — Page Toolbar

Top bar on a nested screen: Back or Close + right-side buttons. Put page-title below, not inside. Not the app sidebar.

## `page-title` — Page Title

Page heading: title, optional chip/status, description, copy id, action buttons. Sit under page-toolbar; detail-list below. Not a card title inside a list.

## `app-shell` — App Shell

Fills the HitPay dashboard iframe. Header then tab bar for several pages (AppShellNavItem active underline). No sidebar. No user/login card. No outer border.

## `form-section` — Form Section

Form section heading: 16px title, 12px description, optional chip, hint, count, and actions. Pair with Field/Input via FormSectionGroup; settings rows use FormSectionItem. Not a page heading — use page-title.

## `detail-list` — Detail List

Read-only key/value details (shift time, customer fields) in one card. style Default or Border table. Grid + colspan. Not an editable form — use field + input.

## `icon-group` — Icon Group

Tight cluster of icon actions (copy, open link, more menu). style Default|Border. Not a full toolbar of labeled Buttons.

## `copy-button` — Copy Button

Copy a string (id, phone, URL) with a Copied! tooltip. Pass value. Use on ids and contact fields, not as the only way to duplicate a whole record.

## `breadcrumb` — Breadcrumb

Path to the current page. BreadcrumbList + Item + Link + Page + Separator. Use Link href or app router Link as the anchor. Not PageToolbar back.

## `pagination` — Pagination

Page through invoice and customer lists. PaginationContent + Item + Link + Previous + Next. Ellipsis for gaps. PaginationInfo for Showing 1–10 of N. Not a table.

## `table` — Table

Table chrome for lists and SchemaTable. Div layout (not HTML table). Sticky checkbox left, actions right. Drag borders to resize. TableSelectionBar for bulk actions. Cell type Default|Checkbox|Image|Icon|Empty.

## `schema-table` — Schema Table

JSON schema list like SchemaForm. Search, tabs, filter, sort, pagination. Renders Table chrome. See SCHEMA_TABLE_EXAMPLE_SCHEMA.

## `customer-card` — Customer Card

Customer or beneficiary summary: name, email, phone, address, avatar. variant Small|Big|Float|Empty. Empty + onAdd when none selected. Not a generic user list row — use list-item for long lists.

## `checkbox` — Checkbox

Multi-select yes/no options (permissions, extras). CheckboxGroup Vertical|Horizontal. For one on/off setting use switch. For one-of-many use radio-group or select.

## `radio-group` — Radio Group

Exactly one choice from a short list (alignment, role). Radio inside RadioGroup. For many options use select; for cards use choice-card.

## `switch` — Switch

On/off setting (notifications, publish). size Default|Small. Not a checkbox in a form list of many items.

## `slider` — Slider

Pick a number or range on a track (0–100, price band). Array value = two thumbs. Not for counts with exact integers — use quantity-input.

## `empty` — Empty

No data / no search hits / upgrade CTA. variant Default|Search|Upgrade + actions Buttons. Use when a list or page has zero rows — not for inline field errors. Not CustomerCard Empty.

## `label` — Label

Accessible label next to a control (htmlFor). Prefer FieldLabel inside Field for forms.

## `separator` — Separator

Visual divider between blocks. orientation horizontal|vertical. Use instead of hr or border-t divs.

## `skeleton` — Skeleton

Loading placeholder bars. Pulse on oc-neutral-soft. Shape via className (size-8 rounded-full, h-4 w-full). Not a spinner.

## `spinner` — Spinner

Indeterminate loading (save, refresh). size Small|Default|Big. Not Skeleton (layout placeholder) and not Progress (known percent).

## `field` — Field

Form row: label, control, hint, error. FieldGroup + Field + FieldLabel. data-invalid on Field, aria-invalid on the input. Wrap every form control.

## `input` — Input

Single-line text (name, email, amount as text). Use with Field. Prefix/icon → input-group, not a positioned Button.

## `textarea` — Textarea

Multi-line notes (issues, leftover work, description). Use with Field. Not for chat transcripts.

## `select` — Select

Choose one from a list (status, staff, currency). Select + Trigger + Value + Item. Inline size for currency inside input-group. For many values with search, use combobox. Not radio cards — use choice-card.

## `combobox` — Combobox

Searchable list (tags, staff, countries). Combobox + Input + Item. Multiple: ComboboxChips + ComboboxChip. Checkbox variant and ComboboxSelectAll for bulk pick. Grouped: Group + Label + Collection. Not a closed single pick without search — use select.

## `command` — Command

Searchable command palette. CommandDialog + Command + CommandInput + CommandList + CommandItem. onSelect(value). Not Combobox in a form.

## `kbd` — Kbd

Keyboard shortcut keys. Kbd and KbdGroup. Use next to Close, command palettes, and shortcut hints.

## `collapsible` — Collapsible

One expand/collapse panel (filters, extra fields). Collapsible + Trigger + Content. Several independent sections: Accordion.

## `scroll-area` — Scroll Area

Custom scrollbar in a bounded panel (Sheet body, long lists). Native overflow is fine for the page. ScrollBar orientation vertical | horizontal.

## `input-group` — Input Group

Input plus prefix, suffix, or inline select (currency, URL, search icon). InputGroupInput/Textarea inside — never raw Input. Addon align start/end.

## `popover` — Popover

Small panel on click (date, extra filters) that is not a full modal. Trigger render Button. For hover hints use tooltip; for page dialogs use modal.

## `calendar` — Calendar

Month grid only. Prefer date-picker for forms. Use calendar when you embed a month in a custom layout. mode single|range|multiple.

## `date-picker` — Date Picker

Pick a day, a range, or a date+time. DatePicker, DatePickerRange, DateTimePicker.

## `dialog` — Dialog

Focused task overlay. Dialog + DialogTrigger + DialogContent (packed: title, optional footer). No DialogHeader/Footer/Title exports. size Small|Medium|Default|Confirmation|Fullscreen. persistent = no backdrop close. Not a side sheet.

## `sheet` — Sheet

Edge panel complementary to the page (edit row, filters). Sheet + Trigger + Content. side Right|Left|Top|Bottom, size Small|Medium|Default. Packed title/footer like Dialog. Not a centered Dialog. Not a swipe Drawer (keep app drawer for mobile snap/swipe).

## `confirm-dialog` — Confirm Dialog

Prebuilt confirm overlay on Dialog. type Delete|Warning|Success|Question. Warning confirm is Continue (not Delete). size Small|Medium. Optional confirmPhrase to type before delete. Use ConfirmDialogContent as the inner block.

## `schema-form` — Schema Form

JSON schema form on TanStack Form. Field keys: showIf, maxLength, hidden. Types: input, password, textarea, select, combobox, radio, checkbox, checkbox-group, accepted, switch, slider, input-group, date, datetime, file, quantity, object, section, section-item, hidden, phone.

