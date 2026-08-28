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
    description: 'shadcn-compatible items, selection, submenus, and shortcuts with Orchid styling.',
  },
  {
    to: '/toast' as const,
    name: 'Toast',
    description: 'shadcn-compatible toast manager with semantic types, actions, close, and placement.',
  },
  {
    to: '/alert' as const,
    name: 'Alert',
    description: 'In-page notification with semantic variants and an optional action.',
  },
  {
    to: '/alert-dialog' as const,
    name: 'Alert Dialog',
    description: 'shadcn-compatible confirmation dialog primitives with Orchid styling.',
  },
  {
    to: '/empty' as const,
    name: 'Empty',
    description: 'shadcn-compatible compound empty state with Orchid media variants.',
  },
  {
    to: '/list-item' as const,
    name: 'List Item',
    description: 'Generic row: compose title, media, logo, meta, copy fields, tokens, and actions.',
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
    description: 'shadcn-compatible progress with composable label, value, track, and indicator.',
  },
  {
    to: '/avatar' as const,
    name: 'Avatar',
    description: 'Image, fallback, badge, and group primitives with Orchid styling.',
  },
  {
    to: '/tooltip' as const,
    name: 'Tooltip',
    description: 'shadcn-compatible hover and focus tooltip with Orchid styling.',
  },
  {
    to: '/tabs' as const,
    name: 'Tabs',
    description: 'shadcn-compatible horizontal or vertical tabs with default and line variants.',
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
    description: 'shadcn-compatible placeholder pulse with Orchid styling.',
  },
  {
    to: '/spinner' as const,
    name: 'Spinner',
    description: 'shadcn-compatible indeterminate loading icon sized through className.',
  },
  {
    to: '/dialog' as const,
    name: 'Dialog',
    description: 'shadcn-compatible dialog primitives with Orchid sizes and persistent mode.',
  },
  {
    to: '/sheet' as const,
    name: 'Sheet',
    description: 'shadcn-compatible compound edge panel with four sides and Orchid styling.',
  },
  {
    to: '/breadcrumb' as const,
    name: 'Breadcrumb',
    description: 'Hierarchy of links to the current page.',
  },
  {
    to: '/pagination' as const,
    name: 'Pagination',
    description: 'shadcn-compatible page links with previous, next, ellipsis, and an optional range label.',
  },
  {
    to: '/table' as const,
    name: 'Table',
    description: 'shadcn-compatible semantic HTML table with Orchid styling.',
  },
  {
    to: '/data-table' as const,
    name: 'Data Table',
    description: 'Orchid resizable data grid primitives used by SchemaTable.',
  },
  {
    to: '/command' as const,
    name: 'Command',
    description: 'shadcn-compatible cmdk palette with keyboard navigation and Orchid styling.',
  },
  {
    to: '/kbd' as const,
    name: 'Kbd',
    description: 'shadcn-compatible keyboard key and grouped shortcut display.',
  },
  {
    to: '/collapsible' as const,
    name: 'Collapsible',
    description: 'shadcn-compatible expand-and-collapse primitives with Orchid styling.',
  },
  {
    to: '/scroll-area' as const,
    name: 'Scroll Area',
    description: 'shadcn-compatible bounded scroll area with Orchid scrollbar styling.',
  },
] as const

export function docComponentsByName() {
  return [...DOC_COMPONENTS].sort((a, b) => a.name.localeCompare(b.name))
}

export const DOC_FORMS = [
  {
    to: '/field' as const,
    name: 'Field',
    description: 'shadcn-compatible label, description, error, and grouped field composition.',
  },
  {
    to: '/label' as const,
    name: 'Label',
    description: 'shadcn-compatible accessible label with Orchid typography.',
  },
  {
    to: '/input' as const,
    name: 'Input',
    description: 'shadcn-compatible text and file input with Orchid states.',
  },
  {
    to: '/input-group' as const,
    name: 'Input Group',
    description: 'shadcn-compatible input, textarea, addon, and button composition.',
  },
  {
    to: '/textarea' as const,
    name: 'Textarea',
    description: 'shadcn-compatible auto-sizing textarea with Orchid form styling.',
  },
  {
    to: '/select' as const,
    name: 'Select',
    description: 'shadcn-compatible Base UI select with groups, states, and Orchid styling.',
  },
  {
    to: '/combobox' as const,
    name: 'Combobox',
    description: 'shadcn-compatible searchable select with Orchid chips and bulk selection helpers.',
  },
  {
    to: '/quantity-input' as const,
    name: 'Quantity Input',
    description: 'Minus/plus stepper; click the value to type.',
  },
  {
    to: '/checkbox' as const,
    name: 'Checkbox',
    description: 'shadcn-compatible checkbox with Orchid states and an optional group helper.',
  },
  {
    to: '/radio-group' as const,
    name: 'Radio Group',
    description: 'shadcn-compatible radio group and item primitives with Orchid styling.',
  },
  {
    to: '/switch' as const,
    name: 'Switch',
    description: 'shadcn-compatible switch in default and small Orchid sizes.',
  },
  {
    to: '/slider' as const,
    name: 'Slider',
    description: 'shadcn-compatible single, range, or vertical slider with Orchid styling.',
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
    to: '/app-layout' as const,
    name: 'App Layout',
    description: 'Embedded application layout with page header, tabs, or sub-sidebar.',
  },
  {
    to: '/sub-sidebar' as const,
    name: 'Sub Sidebar',
    description: 'Grouped secondary navigation with a back header and active page state.',
  },
  {
    to: '/customer-card' as const,
    name: 'Customer Card',
    description: 'Small, Big, and Float customer or beneficiary cards.',
  },
  {
    to: '/form-page' as const,
    name: 'Form Page',
    description: 'Full-page form layout with a header and scrollable form content.',
  },
  {
    to: '/page' as const,
    name: 'Page',
    description: 'Standard route page with a header and scrollable content area.',
  },
  {
    to: '/confirm-dialog' as const,
    name: 'Confirm Dialog',
    description: 'Prebuilt Promise-based confirmation dialog invoked with useConfirmDialog.',
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
