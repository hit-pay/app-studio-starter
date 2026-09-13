<a id="choice-card"></a>
# Choice Card

Selectable cards with left or center icon, no radio dot.
Source file: `src/components/choice-card.tsx`.

Use `ChoiceCard` for a single prominent card-style choice with optional explanatory text. Choose it when the choice benefits from more space than a radio; use `RadioGroup` for compact options.


<a id="customer-card"></a>
# Customer Card

Small, Big, and Float customer or beneficiary cards.
Source file: `src/components/customer-card.tsx`.

Use `CustomerCard` to show a compact summary of one customer. Choose it for a selected or referenced customer; use `DetailCard` for a fuller read-only record.


<a id="date-picker"></a>
# Date Picker

Date, range, and date-time selection with popover and calendar helpers.
Source file: `src/components/date-picker.tsx`.

Use `DatePicker` for one date, `DatePickerRange` for a date interval, or `DateTimePicker` for a date and time. Choose these components instead of importing the calendar primitive directly.


<a id="select"></a>
# Select

Props picker for a closed list or a searchable / multi select.
Source file: `src/components/select.tsx`.

Use `Select` for choosing one or more values from a finite option list. Choose it for ordinary options; use a dedicated HitPay `*Select` or `ResourcePicker` when the data source has specialized behavior.


<a id="staff-select"></a>
# Staff Select

App-member dropdown. Docs use a fake staff-app-members API.
Source file: `src/components/staff-select.tsx`.

Use `StaffSelect` when a form needs to choose HitPay app staff. Choose it instead of fetching staff directly in the screen.


<a id="role-select"></a>
# Role Select

Business role dropdown. Docs use a fake roles API.
Source file: `src/components/role-select.tsx`.

Use `RoleSelect` when a form needs to choose HitPay business roles. Choose it instead of fetching roles directly in the screen.


<a id="coupon-select"></a>
# Coupon Select

Coupon dropdown. Loads GET /v1/coupons.
Source file: `src/components/coupon-select.tsx`.

Use `CouponSelect` when a form needs a coupon from HitPay. Choose it instead of building a coupon dropdown or calling the list API from the screen.


<a id="discount-select"></a>
# Discount Select

Discount dropdown. Loads GET /v1/discounts.
Source file: `src/components/discount-select.tsx`.

Use `DiscountSelect` when a form needs a discount from HitPay. Choose it instead of building a discount dropdown or calling the list API from the screen.


<a id="tax-select"></a>
# Tax Select

Tax dropdown. Loads GET /v1/taxes.
Source file: `src/components/tax-select.tsx`.

Use `TaxSelect` when a form needs a HitPay tax. Choose it instead of building a tax dropdown or calling the list API from the screen.


<a id="shipping-select"></a>
# Shipping Select

Shipping method dropdown. Loads GET /v1/shipping.
Source file: `src/components/shipping-select.tsx`.

Use `ShippingSelect` when a form needs a HitPay shipping method. Choose it instead of building a shipping dropdown or calling the list API from the screen.


<a id="pickup-select"></a>
# Pickup Select

Pickup dropdown. Loads GET /v1/pickups.
Source file: `src/components/pickup-select.tsx`.

Use `PickupSelect` when a form needs a HitPay pickup option. Choose it instead of building a pickup dropdown or calling the list API from the screen.


<a id="product-category-select"></a>
# Product Category Select

Category dropdown. Loads GET /v1/product-category.
Source file: `src/components/product-category-select.tsx`.

Use `ProductCategorySelect` when a form needs a HitPay product category. Choose it instead of a generic select or calling the list API from the screen.


<a id="location-select"></a>
# Location Select

Location dropdown. Loads GET /v1/locations.
Source file: `src/components/location-select.tsx`.

Use `LocationSelect` when a form needs a HitPay business location. Choose it instead of building a location dropdown or calling the list API from the screen.


<a id="detail-card"></a>
# Detail Card

Read-only key/value card for one record. Not a collection.
Source file: `src/components/detail-card.tsx`.

Use `DetailCard` for a read-only key/value view of one record. Choose it for detail pages; use `DataList` or `DataTable` for collections and `FormBuilder` for editing.


<a id="empty"></a>
# Empty

Props empty state with optional media and actions.
Source file: `src/components/empty.tsx`.

Use `Empty` when a collection or section has no content to show. Choose it to explain the empty state and offer a relevant action; use `Spinner` while content is loading.


<a id="data-list"></a>
# Data List

Card/row collection when search, filters, sort, or pagination are not needed.
Source file: `src/components/data-list.tsx`.

Use `DataList` for a compact collection that does not need search, filters, sorting, pagination, or row actions. Choose it instead of `DataTable` for simple lists; use `DetailCard` for one record.


<a id="quantity-input"></a>
# Quantity Input

Minus/plus stepper; click the value to type.
Source file: `src/components/quantity-input.tsx`.

Use `QuantityInput` for bounded numeric quantities that users increment or decrement. Choose it for counts or inventory quantities, not arbitrary numeric text.


<a id="text-editor"></a>
# Text Editor

Lexical rich text: bold, italic, heading, lists. Persist editor JSON.
Source file: `src/components/text-editor.tsx`.

Use `TextEditor` for formatted, rich text content. Choose it when users need formatting; use `Textarea` for plain multi-line text. Rich text for notes and handover, built with [Lexical](https://lexical.dev/) (Meta). Toolbar: bold, italic, underline, heading, lists. Use `Textarea` for a single plain field.


<a id="metric-card"></a>
# Metric Card

Dashboard KPI tile. Use for summaries, not a record's fields.
Source file: `src/components/metric-card.tsx`.

Use `MetricCard` to highlight a key aggregate or KPI with its label and value. Choose it for dashboard summaries, not for detailed records or editable values.


<a id="app-layout"></a>
# App Layout

HitPay App Studio embedded pane frame. Not generic app chrome.
Source file: `src/components/app-layout.tsx`.

Use `AppLayout` as the embedded HitPay App Studio frame around every dashboard route. Choose it for app navigation and shell chrome; do not use it as generic website chrome.


<a id="page-layout"></a>
# Page Layout

Standard route page with header, optional onBack, and scrollable content.
Source file: `src/components/page-layout.tsx`.

Use `PageLayout` as the standard shell for a dashboard page, including title, actions, and content spacing. Choose it for non-form pages; use `FormLayout` for create or edit flows. `PageLayout` renders its required header and wraps its children in a scrollable content area. The `actions` prop accepts any React node so pages can provide the controls they need. Pass `onBack` on nested screens (show/edit) to put a back control beside the title. Omit it on the root list.


<a id="form-layout"></a>
# Form Layout

Create and edit form shell with page and modal modes.
Source file: `src/components/form-layout.tsx`.

Use `FormLayout` as the page or modal shell for create and edit forms. Choose it for headings, scrolling, close behavior, and actions around fields; use `PageLayout` for non-form pages and `FormBuilder` for the fields.


<a id="form-builder"></a>
# Form Builder

Schema-driven create/edit form. Use Detail Card for a read-only record.
Source file: `src/components/form-builder.tsx`.

Use `FormBuilder` for schema-driven multi-field create or edit forms. Choose it when fields, layout, and controls can be described by a schema; use `DetailCard` for read-only data.


<a id="data-table"></a>
# Data Table

Rows-and-columns table with search, filters, sort, and pagination.
Source file: `src/components/data-table.tsx`.

Use `DataTable` for collections that need search, filters, sorting, pagination, selection, or row actions. Choose it instead of `DataList` when those tools are needed; use `DetailCard` for one record.


<a id="confirmation-modal"></a>
# Confirmation Modal

Prebuilt Promise-based confirmation modal invoked with useConfirmationModal.
Source file: `src/components/confirmation-modal.tsx`.

Use `ConfirmationModal` to ask for confirmation before a consequential action. Choose it for a focused yes/no decision; use `Dialog` for general content or interaction.


<a id="resource-picker"></a>
# Resource Picker

Search and select HitPay products, customers, orders, charges, invoices, or add-ons.
Source file: `src/components/resource-picker.tsx`.

Use `ResourcePicker` when users must add or select HitPay catalog records such as products, customers, orders, charges, invoices, or add-ons. Choose it instead of a page table; use dedicated `*Select` components for categories, locations, coupons, discounts, taxes, shipping, and pickups.


<a id="command"></a>
# Command

Searchable command palette. Drive it with open, onOpenChange, and groups.
Source file: `src/components/command.tsx`.

Use `Command` for searchable command or option selection, especially keyboard-driven workflows. Choose it when users need to find an action quickly; use `Select` for a small, ordinary option list.


<a id="copy-button"></a>
# Copy Button

Copy icon that writes a value and shows Copied!.
Source file: `src/components/copy-button.tsx`.

Use `CopyButton` beside text that users may need to copy, such as IDs, links, or tokens. Choose it for a one-click copy affordance, not for editing the value.


<a id="button"></a>
# Button

Standard variants, sizes, icon buttons, native props, and polymorphic rendering.
Source file: `src/ui/button.tsx`.

Use `Button` for an explicit user action such as submit, save, or navigation. Choose it for actions, not for navigation lists or passive status.


<a id="button-group"></a>
# Button Group

Attached controls, plus ghost and border icon toolbars. Compose overflow with DropdownMenu.
Source file: `src/ui/button-group.tsx`.

Use `ButtonGroup` to visually group related actions or mutually related controls. Choose it when the actions share context; use `Tabs` for navigation between views.


<a id="dropdown-menu"></a>
# Dropdown Menu

Items, selection, submenus, and shortcuts with Orchid styling.
Source file: `src/ui/dropdown-menu.tsx`.

Use `DropdownMenu` for a compact menu of related actions opened from a trigger. Choose it for actions, not for selecting a persistent form value.


<a id="toast"></a>
# Toast

Toast manager with semantic types, actions, close, and placement.
Source file: `src/ui/toast.tsx`.

Use `Toast` for brief, transient feedback after an action, such as success or failure. Choose it for non-blocking notifications; use `Banner` for persistent page-level context.


<a id="banner"></a>
# Banner

In-page notification with semantic variants and an optional action.
Source file: `src/ui/banner.tsx`.

Use `Banner` for a prominent page-level notice, warning, success, or error. Choose it for persistent context or action-needed feedback, not for transient feedback (use `Toast`).


<a id="badge"></a>
# Badge

Standard variants with Orchid tones, appearances, removal, and user roles.
Source file: `src/ui/badge.tsx`.

Use `Badge` for a short, non-interactive status, category, or count label. Choose it when the value should be scanned inline; use `Banner` for a prominent message.


<a id="avatar"></a>
# Avatar

Image, fallback, badge, and group primitives with Orchid styling.
Source file: `src/ui/avatar.tsx`.

Use `Avatar` to represent a person, team, or entity with an image or initials. Choose it for compact identity cues, not for full profile details.


<a id="tooltip"></a>
# Tooltip

Hover and focus tooltip with Orchid styling.
Source file: `src/ui/tooltip.tsx`.

Use `Tooltip` to explain an unfamiliar control or truncated label on hover or focus. Choose it for supplemental help, not essential instructions or long content.


<a id="tabs"></a>
# Tabs

Horizontal or vertical tabs with default and line variants.
Source file: `src/ui/tabs.tsx`.

Use `Tabs` to switch between related views that share the same page context. Choose it for navigation among peer sections, not for submitting a form value.


<a id="skeleton"></a>
# Skeleton

Placeholder pulse with Orchid styling.
Source file: `src/ui/skeleton.tsx`.

Use `Skeleton` to reserve space and indicate loading before content is available. Choose it for predictable content placeholders; use `Spinner` for an indeterminate local operation.


<a id="spinner"></a>
# Spinner

Indeterminate loading icon sized through className.
Source file: `src/ui/spinner.tsx`.

Use `Spinner` to indicate an indeterminate operation in progress. Choose it for actions or small regions; use `Skeleton` when the content layout is known.


<a id="dialog"></a>
# Dialog

Dialog primitives with Orchid sizes and persistent mode.
Source file: `src/ui/dialog.tsx`.

Use `Dialog` for focused content or an interaction that temporarily overlays the current page. Choose it for general modal content; use `ConfirmationModal` for a simple consequential-action confirmation.


<a id="drawer"></a>
# Drawer

Swipeable edge panel. Set swipeDirection to up, right, down, or left.
Source file: `src/ui/drawer.tsx`.

Use `Drawer` for contextual content or controls that should slide in while preserving the page context. Choose it when a side panel is more suitable than a centered modal.


<a id="pagination"></a>
# Pagination

Page links with previous, next, ellipsis, and an optional range label.
Source file: `src/ui/pagination.tsx`.

Use `Pagination` to navigate between pages of an already paginated collection. Choose it when pagination is handled outside the component; use `DataTable` when table query controls are also needed.


<a id="kbd"></a>
# Kbd

Keyboard key and grouped shortcut display.
Source file: `src/ui/kbd.tsx`.

Use `Kbd` to display a keyboard key or shortcut in help text and command hints. Choose it for documentation or discoverability, not as an interactive control.


<a id="file-upload"></a>
# File Upload

File and image upload row with upload state, media, and a vertical group.
Source file: `src/ui/file-upload.tsx`.

Use `FileUpload` when users need to select or upload files. Choose it for file input workflows; use `Input` for text or URL values.


<a id="field"></a>
# Field

Label, description, error, and grouped field composition.
Source file: `src/ui/field.tsx`.

Use `Field` to provide a consistent label, description, validation message, and layout around a form control. Choose it when composing a custom field; use `FormBuilder` for schema-driven forms.


<a id="label"></a>
# Label

Accessible label with Orchid typography.
Source file: `src/ui/label.tsx`.

Use `Label` to identify a form control or section. Choose it when composing a custom form control; use `Field` when you also need help or validation text.


<a id="input"></a>
# Input

Text and file input with Orchid states.
Source file: `src/ui/input.tsx`.

Use `Input` for a single-line text, numeric, email, or similar value. Choose it for ordinary text entry; use `Textarea` for multi-line content.


<a id="input-group"></a>
# Input Group

Input, textarea, addon, and button composition.
Source file: `src/ui/input-group.tsx`.

Use `InputGroup` to combine an input with an adjacent prefix, suffix, or related control. Choose it when the parts form one value or action.


<a id="textarea"></a>
# Textarea

Auto-sizing textarea with Orchid form styling.
Source file: `src/ui/textarea.tsx`.

Use `Textarea` for plain multi-line text such as notes or descriptions. Choose it when formatting is unnecessary; use `TextEditor` for rich text.


<a id="checkbox"></a>
# Checkbox

Checkbox with Orchid states and an optional group helper.
Source file: `src/ui/checkbox.tsx`.

Use `Checkbox` for independent boolean choices, including multiple selections. Choose it when options can be selected together; use `RadioGroup` when exactly one option is allowed.


<a id="radio-group"></a>
# Radio Group

Radio group and item primitives with Orchid styling.
Source file: `src/ui/radio-group.tsx`.

Use `RadioGroup` for mutually exclusive choices where exactly one option is selected. Choose it for a small visible set; use `Select` for longer lists.


<a id="switch"></a>
# Switch

Switch in default and small Orchid sizes.
Source file: `src/ui/switch.tsx`.

Use `Switch` for an immediate on/off setting or preference. Choose it for a single boolean setting; use `Checkbox` when it is one option among several selections.


<a id="slider"></a>
# Slider

Single, range, or vertical slider with Orchid styling.
Source file: `src/ui/slider.tsx`.

Use `Slider` when users choose a numeric value or range along a bounded continuum. Choose it when direct manipulation is useful; use `Input` when exact text entry is primary.


<a id="form-section"></a>
# Form Section

Heading plus FormSectionGroup and FormSectionItem.
Source file: `src/ui/form-section.tsx`.

Use `FormSection` to group related fields within a form. Choose it to create clear sections in a custom form; use `FormBuilder` sections for schema-driven forms.
