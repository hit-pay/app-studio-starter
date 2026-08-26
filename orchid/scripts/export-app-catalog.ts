import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const registry = JSON.parse(readFileSync(join(root, 'registry.json'), 'utf8')) as {
  name: string
  items: Array<{
    name: string
    type: string
    title: string
    description: string
  }>
}

const catalog = {
  name: registry.name,
  import: '@/ui/<name>',
  add: 'bunx shadcn add @orchid/<name> --yes',
  items: registry.items
    .filter((item) => item.type === 'registry:ui')
    .map((item) => ({
      name: item.name,
      title: item.title,
      description: item.description,
      import: `@/ui/${item.name}`,
    })),
}

const out = join(root, '../app/.agents/orchid-ui.json')
writeFileSync(out, `${JSON.stringify(catalog, null, 2)}\n`)
console.log(`Wrote ${catalog.items.length} items → ${out}`)
