import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const registry = JSON.parse(readFileSync(join(root, 'registry.json'), 'utf8'))
const out = join(root, '..', 'app', 'orchid-catalog.md')

const lines = [
  '# Orchid catalog',
  '',
  'Agents: read this file **in full** (Read tool, not Grep). Import and inspect each item at the paths listed below; registry targets determine whether it lives in `src/components/` or `src/components/ui/`.',
  '',
]

const formItems = new Set([
  'schema-form',
  'form-layout',
  'field',
  'label',
  'input',
  'input-group',
  'textarea',
  'select',
  'combobox',
  'quantity-input',
  'checkbox',
  'radio-group',
  'switch',
  'slider',
  'calendar',
  'date-picker',
  'form-section',
])

const blockItems = new Set([
  'schema-table',
  'sidebar',
  'sub-sidebar',
  'customer-card',
  'page-layout',
  'confirmation-modal',
  'choice-card',
  'stat-card',
  'detail-list',
  'icon-group',
  'copy-button',
])

const sectionFor = (name) => {
  if (name === 'utils') return null
  if (formItems.has(name)) return 'Form'
  if (blockItems.has(name)) return 'Block'
  return 'Component'
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

let section = null
for (const item of registry.items) {
  if (item.name === 'all') continue
  const next = sectionFor(item.name)
  if (next && next !== section) {
    section = next
    lines.push(`# ${section}`, '')
  }
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
  lines.push(
    `## \`${item.name}\` — ${item.title}`,
    '',
    item.description ?? '',
    location,
    companionLine,
    '',
  )
}

writeFileSync(out, `${lines.join('\n').trimEnd()}\n`)
console.log(`Wrote ${out}`)
