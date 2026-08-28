export const DOC_COMPONENTS = [
  {
    to: '/button' as const,
    name: 'Button',
    description: 'Standard variants, sizes, icon buttons, native props, and polymorphic rendering.',
  },
  {
    to: '/button-group' as const,
    name: 'Button Group',
    description: 'Group related controls horizontally or vertically, including split dropdown buttons.',
  },
  {
    to: '/dropdown-menu' as const,
    name: 'Dropdown Menu',
    description: 'Item states and grouped or ungrouped menus.',
  },
  {
    to: '/toast' as const,
    name: 'Toast',
    description: 'Programmatic floating toast via toast.add. Types, action, and Toaster.',
  },
  {
    to: '/badge' as const,
    name: 'Badge',
    description: 'Standard variants with Orchid tones, appearances, removal, and user roles.',
  },
  {
    to: '/accordion' as const,
    name: 'Accordion',
    description: 'Composable expand-and-collapse sections with shadcn-compatible primitives.',
  },
  {
    to: '/progress' as const,
    name: 'Progress',
    description: 'Default and Small sizes with current/max label.',
  },
  {
    to: '/avatar' as const,
    name: 'Avatar',
    description: 'Image, fallback, badge, and group primitives with Orchid styling.',
  },
  {
    to: '/tooltip' as const,
    name: 'Tooltip',
    description: 'Hover tooltip with top, bottom, left, and right placement.',
  },
  {
    to: '/tabs' as const,
    name: 'Tabs',
    description: 'Default underline and Pills. TabsList + TabsTrigger + TabsContent.',
  },
  {
    to: '/choice-card' as const,
    name: 'Choice Card',
    description: 'Selectable cards with left or center icon, no radio dot.',
  },
  {
    to: '/stat-card' as const,
    name: 'Stat Card',
    description: 'Metric card with header divider, value, and percent badge.',
  },
  {
    to: '/detail-list' as const,
    name: 'Detail List',
    description: 'Detail card with grid columns, colspan, and stacked rows.',
  },
  {
    to: '/icon-group' as const,
    name: 'Icon Group',
    description: 'Icon cluster with Default and Border; dropdown, link, and copy.',
  },
  {
    to: '/copy-button' as const,
    name: 'Copy Button',
    description: 'Copy icon that writes a value and shows Copied!.',
  },
  {
    to: '/skeleton' as const,
    name: 'Skeleton',
    description: 'Placeholder pulse while content loads.',
  },
  {
    to: '/spinner' as const,
    name: 'Spinner',
    description: 'Indeterminate loading. Small, Default, and Big.',
  },
  {
    to: '/dialog' as const,
    name: 'Dialog',
    description: 'Dialog overlay with Small, Medium, Default, and Confirmation sizes.',
  },
  {
    to: '/sheet' as const,
    name: 'Sheet',
    description: 'Edge panel for edit/filters. side Right|Left|Top|Bottom. Not a swipe Drawer.',
  },
  {
    to: '/breadcrumb' as const,
    name: 'Breadcrumb',
    description: 'Hierarchy of links to the current page.',
  },
  {
    to: '/pagination' as const,
    name: 'Pagination',
    description: 'Page numbers, previous/next, and optional range label for lists.',
  },
  {
    to: '/table' as const,
    name: 'Table',
    description: 'Small read-only grid. No search, filter, or row actions — use SchemaTable for lists.',
  },
  {
    to: '/command' as const,
    name: 'Command',
    description: 'Searchable command palette. CommandDialog + Input + Item.',
  },
  {
    to: '/kbd' as const,
    name: 'Kbd',
    description: 'Keyboard shortcut keys. Kbd and KbdGroup.',
  },
  {
    to: '/collapsible' as const,
    name: 'Collapsible',
    description: 'One expand/collapse panel. Use Accordion for several sections.',
  },
  {
    to: '/scroll-area' as const,
    name: 'Scroll Area',
    description: 'Custom scrollbar inside a bounded panel.',
  },
] as const

export function docComponentsByName() {
  return [...DOC_COMPONENTS].sort((a, b) => a.name.localeCompare(b.name))
}

export const DOC_FORMS = [
  {
    to: '/field' as const,
    name: 'Field',
    description: 'Compose label, description, and error around a control.',
  },
  {
    to: '/label' as const,
    name: 'Label',
    description: 'Accessible label for form controls.',
  },
  {
    to: '/input' as const,
    name: 'Input',
    description: 'Text field with default, leading icon, error, and disabled.',
  },
  {
    to: '/input-group' as const,
    name: 'Input Group',
    description: 'Input combined with select or prefix, including currency.',
  },
  {
    to: '/textarea' as const,
    name: 'Textarea',
    description: 'Multiline field with hint and error.',
  },
  {
    to: '/select' as const,
    name: 'Select',
    description: 'Single choice from a list, with groups and error.',
  },
  {
    to: '/combobox' as const,
    name: 'Combobox',
    description: 'Searchable select; multiple chips, checkbox items, and select all.',
  },
  {
    to: '/quantity-input' as const,
    name: 'Quantity Input',
    description: 'Minus/plus stepper; click the value to type.',
  },
  {
    to: '/checkbox' as const,
    name: 'Checkbox',
    description: 'Checkbox and group with vertical or horizontal alignment.',
  },
  {
    to: '/radio-group' as const,
    name: 'Radio Group',
    description: 'Radio options with vertical or horizontal alignment.',
  },
  {
    to: '/switch' as const,
    name: 'Switch',
    description: 'Switch control in Default and Small sizes.',
  },
  {
    to: '/slider' as const,
    name: 'Slider',
    description: 'Single or range slider; pass an array for two or more thumbs.',
  },
  {
    to: '/calendar' as const,
    name: 'Calendar',
    description: 'Single, range, and multiple date selection used by Date Picker.',
  },
  {
    to: '/date-picker' as const,
    name: 'Date Picker',
    description: 'Shadcn-style Popover and Calendar composition with optional Orchid helpers.',
  },
  {
    to: '/form-section' as const,
    name: 'Form Section',
    description: 'Heading plus FormSectionGroup and FormSectionItem.',
  },
] as const

export function docFormsByName() {
  return [...DOC_FORMS].sort((a, b) => a.name.localeCompare(b.name))
}

export const DOC_BLOCKS = [
  {
    to: '/app-shell' as const,
    name: 'App Shell',
    description: 'Header full width above nav. Nav items with active pill. No user card.',
  },
  {
    to: '/alert' as const,
    name: 'Alert',
    description: 'In-page notification with semantic variants and an optional action.',
  },
  {
    to: '/list-item' as const,
    name: 'List Item',
    description: 'Generic row: compose title, media, logo, meta, copy fields, tokens, and actions.',
  },
  {
    to: '/empty' as const,
    name: 'Empty',
    description: 'Centered empty state with icon, title, description, and actions.',
  },
  {
    to: '/customer-card' as const,
    name: 'Customer Card',
    description: 'Small, Big, and Float customer or beneficiary cards.',
  },
  {
    to: '/page-toolbar' as const,
    name: 'Page Toolbar',
    description: 'Back or close on the left; actions on the right.',
  },
  {
    to: '/page-title' as const,
    name: 'Page Title',
    description: 'Heading with actions on the right and optional box below.',
  },
  {
    to: '/confirm-dialog' as const,
    name: 'Confirm Dialog',
    description: 'Prebuilt confirm dialog: Delete, Warning, Success, Question, and type-to-confirm.',
  },
  {
    to: '/schema-form' as const,
    name: 'Schema Form',
    description: 'TanStack Form plus Orchid fields. Types include date, datetime, file, quantity, switch.',
  },
  {
    to: '/schema-table' as const,
    name: 'Schema Table',
    description: 'JSON schema table like SchemaForm: search, tabs, filter, sort, Edit Column, pagination.',
  },
] as const

export function docBlocksByName() {
  return [...DOC_BLOCKS].sort((a, b) => a.name.localeCompare(b.name))
}

export const DOC_GUIDES = [
  { to: '/installation' as const, name: 'Installation' },
] as const

export const DOC_CRUMBS: Record<string, string> = {
  '/': 'Examples',
  ...Object.fromEntries(DOC_GUIDES.map((item) => [item.to, item.name])),
  ...Object.fromEntries(DOC_COMPONENTS.map((item) => [item.to, item.name])),
  ...Object.fromEntries(DOC_FORMS.map((item) => [item.to, item.name])),
  ...Object.fromEntries(DOC_BLOCKS.map((item) => [item.to, item.name])),
}
