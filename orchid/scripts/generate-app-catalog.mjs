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
  'Agents: read this file **in full** (Read tool, not Grep). **Base Components** live under `src/components/ui/` (`@/components/ui/…`). **Components & Block** live under `src/components/` (`@/components/…`) and are ready to use through props or a schema — do not assemble them from many base components. When a Docs link is listed, fetch that Markdown file (not the HTML example page).',
  '',
]

const sectionFor = (item) => {
  if (item.name === 'utils') return 'Utils'
  const files = item.files ?? []
  const primary = files.find((file) => file.type === 'registry:ui') ?? files[0]
  if (primary?.target?.startsWith('@components/')) return 'Components & Block'
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

const grouped = new Map([
  ['Utils', []],
  ['Base Components', []],
  ['Components & Block', []],
])

for (const item of registry.items) {
  if (item.name === 'all') continue
  grouped.get(sectionFor(item)).push(item)
}

for (const [section, items] of grouped) {
  if (items.length === 0) continue
  lines.push(`# ${section}`, '')
  for (const item of items) {
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
}

writeFileSync(out, `${lines.join('\n').trimEnd()}\n`)
console.log(`Wrote ${out}`)
