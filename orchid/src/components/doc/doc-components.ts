export const DOC_COMPONENTS = [
  {
    to: '/button' as const,
    name: 'Button',
    description: 'Type, Style, Size, Default/Disabled, icon-only, and additional action.',
  },
  {
    to: '/dropdown' as const,
    name: 'Dropdown',
    description: 'Item states and grouped or ungrouped menus.',
  },
  {
    to: '/snackbar' as const,
    name: 'Snack Bar',
    description: 'Small/Default as floating toasts; Big with close and actions.',
  },
  {
    to: '/toast' as const,
    name: 'Toast',
    description: 'Programmatic snackbar via toast.add. Types, action, and Toaster.',
  },
  {
    to: '/chip' as const,
    name: 'Chip',
    description: 'Global colors, Background/Border/Transparent, and user-type chips.',
  },
  {
    to: '/accordion' as const,
    name: 'Accordion',
    description: 'Expandable sections with title, optional description, label, and progress.',
  },
  {
    to: '/progress-bar' as const,
    name: 'Progress Bar',
    description: 'Default and Small sizes with current/max label.',
  },
  {
    to: '/list-item' as const,
    name: 'List Item',
    description: 'General, webhook, and integration list cards.',
  },
  {
    to: '/input-stepper' as const,
    name: 'Input Stepper',
    description: 'Minus/plus stepper; click the value to type.',
  },
  {
    to: '/avatar' as const,
    name: 'Avatar',
    description: 'Sizes 24–64, Default, Business, and Image.',
  },
  {
    to: '/tooltip' as const,
    name: 'Tooltip',
    description: 'Hover tooltip with top, bottom, left, and right placement.',
  },
  {
    to: '/tab-menu' as const,
    name: 'Tab Menu',
    description: 'Default underline and Pills tab bars.',
  },
  {
    to: '/clickable-option' as const,
    name: 'Clickable Option',
    description: 'Selectable cards with left or center icon, no radio dot.',
  },
  {
    to: '/overview-item' as const,
    name: 'Overview Item',
    description: 'Metric card with header divider, value, and percent badge.',
  },
  {
    to: '/box-detail' as const,
    name: 'Box Detail',
    description: 'Detail card with grid columns, colspan, and stacked rows.',
  },
  {
    to: '/button-group' as const,
    name: 'Button Group',
    description: 'Icon cluster with Default and Border; dropdown, link, and copy.',
  },
  {
    to: '/copy-tooltip' as const,
    name: 'Copy Tooltip',
    description: 'Copy icon that writes a value and shows Copied!.',
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
    to: '/toggle' as const,
    name: 'Toggle',
    description: 'Switch control in Default and Small sizes.',
  },
  {
    to: '/slider' as const,
    name: 'Slider',
    description: 'Single or range slider; pass an array for two or more thumbs.',
  },
  {
    to: '/date-picker' as const,
    name: 'Date Picker',
    description: 'Popover + Calendar, same composition as shadcn Date Picker.',
  },
  {
    to: '/label' as const,
    name: 'Label',
    description: 'Accessible label for form controls.',
  },
  {
    to: '/skeleton' as const,
    name: 'Skeleton',
    description: 'Placeholder pulse while dashboard content loads.',
  },
  {
    to: '/field' as const,
    name: 'Field',
    description: 'Compose label, description, and error around a control.',
  },
  {
    to: '/input' as const,
    name: 'Input',
    description: 'Invoice numbers, customer email, SKUs, store handles, and POS IDs.',
  },
  {
    to: '/input-group' as const,
    name: 'Input Group',
    description: 'Invoice and Recurring amounts, store URL prefix, and channel fees.',
  },
  {
    to: '/textarea' as const,
    name: 'Textarea',
    description: 'Invoice notes, payment link copy, product descriptions, and customer notes.',
  },
  {
    to: '/select' as const,
    name: 'Select',
    description: 'Inventory, sales channel, Recurring interval, POS terminal, and tax class.',
  },
  {
    to: '/combobox' as const,
    name: 'Combobox',
    description: 'Search payment channels, products, customers, and POS locations.',
  },
  {
    to: '/section-title' as const,
    name: 'Section Title',
    description: 'Headings for Online Store, Payment Channels, Invoices, Recurring, and POS.',
  },
  {
    to: '/empty-page' as const,
    name: 'Empty Page',
    description: 'Empty invoices, products, customers, payment links, and POS upgrade.',
  },
  {
    to: '/modal' as const,
    name: 'Modal',
    description: 'Review invoices, create payment links, pair POS, and confirm Recurring.',
  },
] as const

export function docComponentsByName() {
  return [...DOC_COMPONENTS].sort((a, b) => a.name.localeCompare(b.name))
}

export const DOC_BLOCKS = [
  {
    to: '/customer-card' as const,
    name: 'Customer Card',
    description: 'Customer Data cards for invoices, Recurring, and POS walk-ins.',
  },
  {
    to: '/sub-header' as const,
    name: 'Sub Header',
    description: 'Fullscreen create product or invoice; back or close with save actions.',
  },
  {
    to: '/page-title' as const,
    name: 'Page Title',
    description: 'Invoices, Payment Links, Recurring, POS, Online Store, Customers, Products.',
  },
  {
    to: '/confirmation-modal' as const,
    name: 'Confirmation Modal',
    description: 'Delete invoices and products, warn on POS, confirm Recurring cancel.',
  },
] as const

export function docBlocksByName() {
  return [...DOC_BLOCKS].sort((a, b) => a.name.localeCompare(b.name))
}

export const DOC_GUIDES = [
  { to: '/setup' as const, name: 'Setup' },
] as const

export const DOC_CRUMBS: Record<string, string> = {
  '/': 'Examples',
  ...Object.fromEntries(DOC_GUIDES.map((item) => [item.to, item.name])),
  ...Object.fromEntries(DOC_COMPONENTS.map((item) => [item.to, item.name])),
  ...Object.fromEntries(DOC_BLOCKS.map((item) => [item.to, item.name])),
}
