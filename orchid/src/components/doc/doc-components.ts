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
    to: '/skeleton' as const,
    name: 'Skeleton',
    description: 'Placeholder pulse while content loads.',
  },
  {
    to: '/empty-page' as const,
    name: 'Empty Page',
    description: 'Centered empty state with icon, title, description, and actions.',
  },
  {
    to: '/modal' as const,
    name: 'Modal',
    description: 'Dialog overlay with Small, Medium, Default, and Confirmation sizes.',
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
    to: '/input-stepper' as const,
    name: 'Input Stepper',
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
    to: '/section-title' as const,
    name: 'Section Title',
    description: 'Form section heading with optional chip, hint, count, and actions.',
  },
] as const

export function docFormsByName() {
  return [...DOC_FORMS].sort((a, b) => a.name.localeCompare(b.name))
}

export const DOC_BLOCKS = [
  {
    to: '/customer-card' as const,
    name: 'Customer Card',
    description: 'Small, Big, and Float customer or beneficiary cards.',
  },
  {
    to: '/sub-header' as const,
    name: 'Sub Header',
    description: 'Back or close on the left; actions on the right.',
  },
  {
    to: '/page-title' as const,
    name: 'Page Title',
    description: 'Heading with actions on the right and optional box below.',
  },
  {
    to: '/confirmation-modal' as const,
    name: 'Confirmation Modal',
    description: 'Prebuilt confirm dialog: Delete, Warning, Success, Question, and type-to-confirm.',
  },
  {
    to: '/form-builder' as const,
    name: 'Form Builder',
    description: 'TanStack Form plus Orchid fields from a field schema.',
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
  ...Object.fromEntries(DOC_FORMS.map((item) => [item.to, item.name])),
  ...Object.fromEntries(DOC_BLOCKS.map((item) => [item.to, item.name])),
}
