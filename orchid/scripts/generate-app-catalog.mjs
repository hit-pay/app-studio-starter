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
  'Read this file **in full** (Read tool, not Grep). Match the job to each **Components & Blocks** description, then open the listed source and Docs `.md`. Use **Base Components** only when no block covers the job. Categories: actions, displaying-data, feedback, form, layout, navigation, overlays, utils.',
  '',
]

const sectionFor = (item) => {
  if (item.name === 'utils') return 'Utils'
  const files = item.files ?? []
  const primary = files.find((file) => file.type === 'registry:ui') ?? files[0]
  if (primary?.target?.startsWith('@/components/') || primary?.target?.startsWith('@components/')) {
    return 'Components & Blocks'
  }
  if (primary?.target?.startsWith('@/base-ui/') || primary?.target?.startsWith('@base-ui/')) {
    return 'Base Components'
  }
  return 'Base Components'
}

const installedPath = (target) => {
  if (target.startsWith('@/')) return `src/${target.slice('@/'.length)}`
  if (target.startsWith('@base-ui/')) return `src/base-ui/${target.slice('@base-ui/'.length)}`
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
  'copy-button': 'Actions',
  'file-upload': 'Form',
  avatar: 'Displaying Data',
  badge: 'Displaying Data',
  chart: 'Displaying Data',
  empty: 'Displaying Data',
  list: 'Displaying Data',
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
  sidebar: 'Navigation',
  'sub-sidebar': 'Navigation',
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
