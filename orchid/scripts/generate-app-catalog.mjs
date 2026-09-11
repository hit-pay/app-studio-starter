import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const registry = JSON.parse(readFileSync(join(root, 'registry.json'), 'utf8'))
const out = join(root, '..', 'app', 'orchid-ui-guideline.md')
const docsDir = join(root, 'public', 'llms')

const NEED = {
  'data-table':
    'rows and columns, spreadsheet, searchable table, column filter, sort, pagination',
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
  'confirmation-modal': 'confirm, delete, destructive, are you sure',
  command: 'command palette, search commands, cmdk',
  toast: 'toast, snackbar, notify, success message',
  alert: 'alert, banner, inline notice',
  empty: 'empty state, no records, first-use state',
  skeleton: 'loading placeholder, skeleton rows',
  spinner: 'loading spinner, indeterminate loading',
  chart: 'chart, graph, time series, dashboard visualization',
  dialog: 'dialog, modal content, overlay form',
  drawer: 'drawer, side panel, bottom sheet',
  'dropdown-menu': 'overflow menu, action menu, context actions',
  tabs: 'in-page tabs, tab panel',
  badge: 'status badge, label, role badge',
  list: 'listitem primitives',
}

const lines = [
  '# Orchid catalog',
  '',
  'Hard rule: use **Components & Blocks** (`@/components/…`) first. Pass props or a schema. Do not start a screen from `@ui`. Do not rebuild a block from primitives — that writes too much code. Open `orchid-llms/{name}.md` only when the props remain unclear. Do not fetch orchid-ui-hitpay.vercel.app. Use **Base Components** (`@ui/…`) only after no block covers the job (a single Button, Badge, Spinner, or Empty).',
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
  'copy-button': 'Actions',
  'file-upload': 'Form',
  avatar: 'Displaying Data',
  badge: 'Displaying Data',
  chart: 'Displaying Data',
  empty: 'Displaying Data',
  list: 'Displaying Data',
  alert: 'Feedback',
  progress: 'Feedback',
  skeleton: 'Feedback',
  spinner: 'Feedback',
  toast: 'Feedback',
  calendar: 'Form',
  checkbox: 'Form',
  combobox: 'Form',
  field: 'Form',
  'form-section': 'Form',
  input: 'Form',
  'input-group': 'Form',
  label: 'Form',
  'radio-group': 'Form',
  select: 'Form',
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
  'customer-card': 'Displaying Data',
  'data-table': 'Displaying Data',
  'detail-card': 'Displaying Data',
  'data-list': 'Displaying Data',
  'metric-card': 'Displaying Data',
  'choice-card': 'Form',
  'date-picker': 'Form',
  'form-builder': 'Form',
  'quantity-input': 'Form',
  'text-editor': 'Form',
  'app-layout': 'Layout',
  'form-layout': 'Layout',
  'page-layout': 'Layout',
  command: 'Overlays',
  'confirmation-modal': 'Overlays',
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
  if (['all', 'sidebar'].includes(item.name)) continue
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
  lines.push(`- ${words} → \`${name}\``)
}
lines.push('')

for (const [section, items] of grouped) {
  if (items.length === 0) continue
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
