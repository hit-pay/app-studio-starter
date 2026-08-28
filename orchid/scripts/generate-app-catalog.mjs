import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const registry = JSON.parse(readFileSync(join(root, 'registry.json'), 'utf8'))
const out = join(root, '..', 'app', 'orchid-catalog.md')

const lines = [
  '# Orchid catalog',
  '',
  'Agents: read this file **in full** (Read tool, not Grep). Import `@/components/ui/<name>`. For props, read `src/components/ui/<name>.tsx`.',
  '',
]

const sectionFor = (name) => {
  if (name === 'utils') return null
  if (
    [
      'schema-form',
      'schema-table',
      'alert',
      'list-item',
      'empty',
      'customer-card',
      'page-toolbar',
      'page-title',
      'confirm-dialog',
    ].includes(name)
  )
    return 'Block'
  if (
    [
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
    ].includes(name)
  )
    return 'Form'
  return 'Component'
}

let section = null
for (const item of registry.items) {
  if (item.name === 'all') continue
  const next = sectionFor(item.name)
  if (next && next !== section) {
    section = next
    lines.push(`# ${section}`, '')
  }
  lines.push(`## \`${item.name}\` — ${item.title}`, '', item.description ?? '', '')
}

writeFileSync(out, `${lines.join('\n')}\n`)
console.log(`Wrote ${out}`)
