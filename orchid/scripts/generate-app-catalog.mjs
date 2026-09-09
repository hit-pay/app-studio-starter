import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const registry = JSON.parse(readFileSync(join(root, 'registry.json'), 'utf8'))
const out = join(root, '..', 'app', 'orchid-catalog.md')
const homepage = registry.homepage?.replace(/\/$/, '') ?? ''
const docsDir = join(root, 'public', 'llms')

const lines = [
  '# Orchid catalog',
  '',
  'Agents: read this file **in full** (Read tool, not Grep), **Components & Blocks first**. Prefer a block under `src/components/` (`@/components/…`) driven by props or a schema. Only then use **Base Components** under `src/components/ui/` (`@/components/ui/…`). Do not assemble a block from many base components. Both catalogs use the same AlignUI groups (Actions, Displaying Data, Feedback, Form, Layout, Navigation, Overlays, Utils). When a Docs link is listed, fetch that Markdown file (not the HTML example page).',
  '',
]

const sectionFor = (item) => {
  if (item.name === 'utils') return 'Utils'
  const files = item.files ?? []
  const primary = files.find((file) => file.type === 'registry:ui') ?? files[0]
  if (primary?.target?.startsWith('@components/')) return 'Components & Blocks'
  if (primary?.target?.startsWith('@ui/')) return 'Base Components'
  return 'Base Components'
}

const installedPath = (target) => {
  if (target.startsWith('@ui/')) return `src/components/ui/${target.slice('@ui/'.length)}`
  if (target.startsWith('@components/')) {
    return `src/components/${target.slice('@components/'.length)}`
  }
  if (target.startsWith('lib/')) return `src/${target}`
  return target
}

const importPath = (target) => {
  const path = installedPath(target).replace(/\.(tsx?|jsx?)$/, '')
  return path.startsWith('src/') ? `@/${path.slice('src/'.length)}` : `@/${path}`
}

const BASE_SUBGROUP = {
  button: 'Actions',
  'button-group': 'Actions',
  attachment: 'Displaying Data',
  avatar: 'Displaying Data',
  badge: 'Displaying Data',
  chart: 'Displaying Data',
  empty: 'Displaying Data',
  'list-item': 'Displaying Data',
  table: 'Displaying Data',
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
  card: 'Layout',
  collapsible: 'Layout',
  resizable: 'Layout',
  'scroll-area': 'Layout',
  tabs: 'Layout',
  breadcrumb: 'Navigation',
  pagination: 'Navigation',
  command: 'Overlays',
  dialog: 'Overlays',
  'dropdown-menu': 'Overlays',
  popover: 'Overlays',
  sheet: 'Overlays',
  tooltip: 'Overlays',
  kbd: 'Utils',
  separator: 'Utils',
}

const BLOCK_SUBGROUP = {
  'copy-button': 'Actions',
  'icon-group': 'Actions',
  'customer-card': 'Displaying Data',
  'data-table': 'Displaying Data',
  'detail-list': 'Displaying Data',
  'metric-card': 'Displaying Data',
  'choice-card': 'Form',
  'date-picker': 'Form',
  'form-builder': 'Form',
  'quantity-input': 'Form',
  'form-layout': 'Layout',
  'page-layout': 'Layout',
  sidebar: 'Navigation',
  'sub-sidebar': 'Navigation',
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
  if (item.name === 'all') continue
  grouped.get(sectionFor(item)).push(item)
}

function writeItem(item) {
  const files = item.files ?? []
  const primary = files.find((file) => file.type === 'registry:ui') ?? files[0]
  const location = primary
    ? `Import \`${importPath(primary.target)}\`; read \`${installedPath(primary.target)}\`.`
    : ''
  const companions = files
    .filter((file) => file !== primary)
    .map((file) => `\`${installedPath(file.target)}\``)
  const companionLine = companions.length
    ? `Related source: ${companions.join(', ')}.`
    : ''
  const docsFile = join(docsDir, `${item.name}.md`)
  const docsLine =
    homepage && existsSync(docsFile)
      ? `Docs: ${homepage}/llms/${item.name}.md`
      : ''
  lines.push(
    `## \`${item.name}\` — ${item.title}`,
    '',
    ...[item.description ?? '', location, companionLine, docsLine].filter(Boolean),
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
