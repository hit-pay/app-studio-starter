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
  'Agents: read this file **in full** (Read tool, not Grep). Every Orchid item installs under `src/components/ui/` and imports from `@/components/ui/…`. When a Docs link is listed, fetch that Markdown file (not the HTML example page).',
  '',
]

const sectionFor = (name) => {
  if (name === 'utils') return null
  return 'Components'
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

writeFileSync(out, `${lines.join('\n').trimEnd()}\n`)
console.log(`Wrote ${out}`)
