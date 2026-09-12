import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const registry = JSON.parse(readFileSync(join(root, 'registry.json'), 'utf8'))
const out = join(root, '..', 'app', 'orchid-ui-guideline.md')
const docsDir = join(root, 'public', 'llms')

const NEED = {
  'data-table':
    'rows and columns, spreadsheet, searchable table, column filter, sort, pagination, row click, row edit/delete',
  'data-list':
    'compact row list, card list, people list, products list, activity feed, checklist',
  'detail-card':
    'one record, detail page fields, invoice detail, leave detail, key-value summary',
  'metric-card': 'kpi, dashboard, stat, revenue, volume, count, percent',
  'customer-card': 'customer, beneficiary, contact, payee',
  'form-builder':
    'multi-field form, create form, edit form, schema fields, validation',
  'form-layout': 'create/edit page shell, form modal shell, save and cancel',
  'page-layout': 'browse page shell, detail page shell, page title, back button, page actions',
  'app-layout': 'iframe app shell, app name, app-level tabs, app sidebar',
  'choice-card': 'choose one, option cards, plan, method',
  'quantity-input': 'stepper, quantity, plus minus, stock count',
  'text-editor': 'rich text, notes, wysiwyg, lexical',
  'date-picker': 'date picker, date range picker, datetime picker, calendar popover',
  select: 'dropdown, select, searchable select, multi select, pick one option',
  'staff-select': 'assignee, reviewer, pick staff, staff dropdown',
  'role-select': 'pick role, notify role, role dropdown',
  'coupon-select': 'pick coupon, coupon dropdown',
  'discount-select': 'pick discount, discount dropdown',
  'tax-select': 'pick tax, tax dropdown',
  'shipping-select': 'pick shipping method',
  'pickup-select': 'pick pickup',
  'product-category-select': 'pick category, product category dropdown',
  'location-select': 'pick location, location dropdown',
  'confirmation-modal': 'confirm, delete, destructive, are you sure',
  'copy-button': 'copy to clipboard, copy id, copy phone, copy url',
  'resource-picker':
    'pick product, pick customer, pick order, resource picker, catalog picker',
  command: 'command palette, search commands, cmdk',
  toast: 'toast, snackbar, notify, success message',
  banner: 'banner, alert, inline notice',
  empty: 'empty state, no records, first-use state',
  skeleton: 'loading placeholder, skeleton rows',
  spinner: 'loading spinner',
  chart: 'chart, graph, time series',
  dialog: 'extra dialog (not FormLayout modal, not confirmation)',
  drawer: 'extra drawer (not FormLayout modal, not confirmation)',
  tabs: 'in-page tabs (not AppLayout tabs)',
  badge: 'status badge, label',
}

const BASE_NEED_NOTE = {
  toast: '`@ui`, after a block',
  banner: '`@ui`',
  skeleton: '`@ui`',
  spinner: '`@ui`',
  chart: '`@ui`',
  dialog: '`@ui`',
  drawer: '`@ui`',
  tabs: '`@ui`',
  badge: '`@ui`',
}

const SKIP_NEED_INDEX = new Set(['dropdown-menu'])

const lines = [
  '# Orchid catalog',
  '',
  'Use **Components & Blocks** (`@/components/…`) first. Pass props or a schema. Do not start a screen from `@ui`. Open `orchid-llms/{name}.md` when props are unclear. Do not fetch orchid-ui-hitpay.vercel.app. `@ui` only after the block is in the file.',
  '',
  '# Needs',
  '',
]

const sectionFor = (item) => {
  if (item.name === 'utils') return 'Utils'
  const files = item.files ?? []
  const primary = files.find((file) => file.type === 'registry:ui') ?? files[0]
  if (primary?.target?.startsWith('@/components/') || primary?.target?.startsWith('@components/')) {
    return 'Components & Blocks'
  }
  if (primary?.target?.startsWith('@ui/') || primary?.target?.startsWith('@/ui/')) {
    return 'Base Components'
  }
  return 'Base Components'
}

const installedPath = (target) => {
  if (target.startsWith('@/')) return `src/${target.slice('@/'.length)}`
  if (target.startsWith('@ui/')) return `src/ui/${target.slice('@ui/'.length)}`
  if (target.startsWith('@components/')) {
    return `src/components/${target.slice('@components/'.length)}`
  }
  if (target.startsWith('lib/')) return `src/${target}`
  return target
}

const importPath = (target) => {
  const path = installedPath(target).replace(/\.(tsx?|jsx?)$/, '')
  if (path.startsWith('src/ui/')) return `@ui/${path.slice('src/ui/'.length)}`
  return path.startsWith('src/') ? `@/${path.slice('src/'.length)}` : `@/${path}`
}

const BASE_SUBGROUP = {
  button: 'Actions',
  'button-group': 'Actions',
  'file-upload': 'Form',
  avatar: 'Displaying Data',
  badge: 'Displaying Data',
  chart: 'Displaying Data',
  banner: 'Feedback',
  progress: 'Feedback',
  skeleton: 'Feedback',
  spinner: 'Feedback',
  toast: 'Feedback',
  checkbox: 'Form',
  field: 'Form',
  'form-section': 'Form',
  input: 'Form',
  'input-group': 'Form',
  label: 'Form',
  'radio-group': 'Form',
  slider: 'Form',
  switch: 'Form',
  textarea: 'Form',
  accordion: 'Layout',
  'aspect-ratio': 'Layout',
  collapsible: 'Layout',
  tabs: 'Layout',
  pagination: 'Navigation',
  dialog: 'Overlays',
  drawer: 'Overlays',
  'dropdown-menu': 'Overlays',
  popover: 'Overlays',
  tooltip: 'Overlays',
  kbd: 'Utils',
  separator: 'Utils',
}

const BLOCK_SUBGROUP = {
  'copy-button': 'Actions',
  'customer-card': 'Displaying Data',
  'data-table': 'Displaying Data',
  'detail-card': 'Displaying Data',
  'data-list': 'Displaying Data',
  empty: 'Displaying Data',
  'metric-card': 'Displaying Data',
  'choice-card': 'Form',
  select: 'Form',
  'staff-select': 'Form',
  'role-select': 'Form',
  'coupon-select': 'Form',
  'discount-select': 'Form',
  'tax-select': 'Form',
  'shipping-select': 'Form',
  'pickup-select': 'Form',
  'product-category-select': 'Form',
  'location-select': 'Form',
  'date-picker': 'Form',
  'form-builder': 'Form',
  'quantity-input': 'Form',
  'text-editor': 'Form',
  'app-layout': 'Layout',
  'form-layout': 'Layout',
  'page-layout': 'Layout',
  command: 'Overlays',
  'confirmation-modal': 'Overlays',
  'resource-picker': 'Form',
}

const ALIGNUI_ORDER = [
  'Actions',
  'Displaying Data',
  'Feedback',
  'Form',
  'Layout',
  'Navigation',
  'Overlays',
  'Utils',
]

const grouped = new Map([
  ['Utils', []],
  ['Components & Blocks', []],
  ['Base Components', []],
])

for (const item of registry.items) {
  if (item.name === 'all') continue
  grouped.get(sectionFor(item)).push(item)
}

function writeItem(item) {
  const files = item.files ?? []
  const primary = files.find((file) => file.type === 'registry:ui') ?? files[0]
  const location = primary
    ? `Import \`${importPath(primary.target)}\` — \`${installedPath(primary.target)}\`.`
    : ''
  const companions = files
    .filter((file) => file !== primary)
    .map((file) => `\`${installedPath(file.target)}\``)
  const companionLine = companions.length
    ? `Related: ${companions.join(', ')}.`
    : ''
  const docsFile = join(docsDir, `${item.name}.md`)
  const docsLine = existsSync(docsFile)
    ? `Docs: \`orchid-llms/${item.name}.md\``
    : ''
  const need = NEED[item.name]
  const needLine = need ? `Need: ${need}` : ''
  lines.push(
    `## \`${item.name}\` — ${item.title}`,
    '',
    ...[needLine, item.description ?? '', location, docsLine, companionLine].filter(Boolean),
    '',
  )
}

function writeAlignedGroups(items, subgroupMap) {
  const bySub = new Map(ALIGNUI_ORDER.map((label) => [label, []]))
  const other = []
  for (const item of items) {
    const label = subgroupMap[item.name]
    if (label && bySub.has(label)) bySub.get(label).push(item)
    else other.push(item)
  }
  for (const label of ALIGNUI_ORDER) {
    const subset = bySub.get(label)
    if (!subset.length) continue
    lines.push(`## ${label}`, '')
    for (const item of subset) writeItem(item)
  }
  for (const item of other) writeItem(item)
}

for (const [name, words] of Object.entries(NEED)) {
  if (SKIP_NEED_INDEX.has(name)) continue
  const note = BASE_NEED_NOTE[name]
  lines.push(note ? `- ${words} → \`${name}\` (${note})` : `- ${words} → \`${name}\``)
}
lines.push('')

for (const [section, items] of grouped) {
  if (items.length === 0) continue
  if (section === 'Utils') continue
  lines.push(`# ${section}`, '')
  if (section === 'Base Components') {
    writeAlignedGroups(items, BASE_SUBGROUP)
    continue
  }
  if (section === 'Components & Blocks') {
    writeAlignedGroups(items, BLOCK_SUBGROUP)
    continue
  }
  for (const item of items) writeItem(item)
}

writeFileSync(out, `${lines.join('\n').trimEnd()}\n`)
console.log(`Wrote ${out}`)
