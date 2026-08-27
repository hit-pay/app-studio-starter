import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const registry = JSON.parse(readFileSync(join(root, 'registry.json'), 'utf8'))
const out = join(root, '..', 'app', 'orchid-catalog.md')

const lines = [
  '# Orchid catalog',
  '',
  'Local component docs. Import `@/orchid-ui/<name>`. For props, read `src/components/orchid-ui/<name>.tsx`.',
  '',
]

for (const item of registry.items) {
  if (item.name === 'all') continue
  lines.push(`## \`${item.name}\` — ${item.title}`, '', item.description ?? '', '')
}

writeFileSync(out, `${lines.join('\n')}\n`)
console.log(`Wrote ${out}`)
