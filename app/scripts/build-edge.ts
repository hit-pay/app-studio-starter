// Builds dist-edge.tgz, what App Studio publishes: `index.ts`, the backend whose default export has `fetch`, and
// `static/`, the built frontend, which the runtime serves itself. A page request outside /api gets index.html,
// inlined here because the published backend cannot read files.
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const root = join(import.meta.dir, '..')
const out = join(root, 'dist-edge')
const archive = join(root, 'dist-edge.tgz')

await run(['bun', 'run', 'scripts/migrations.ts'])
await run(['bun', 'run', '--cwd', 'frontend', 'build'])

await rm(out, { recursive: true, force: true })
await mkdir(out, { recursive: true })
await cp(join(root, 'frontend/dist'), join(out, 'static'), { recursive: true })

const html = await readFile(join(root, 'frontend/dist/index.html'), 'utf8')
const entry = join(root, 'backend/.edge-entry.ts')
await writeFile(
  entry,
  `import app from './src/index.ts'
const html = ${JSON.stringify(html)}
export default {
  fetch(request: Request) {
    const { pathname } = new URL(request.url)
    if (pathname === '/api' || pathname.startsWith('/api/')) return app.fetch(request)
    if (request.method !== 'GET' && request.method !== 'HEAD') return new Response('Not found', { status: 404 })
    return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-cache' } })
  },
}
`,
)

try {
  const result = await Bun.build({ entrypoints: [entry], target: 'browser', format: 'esm', minify: true })
  if (!result.success) {
    for (const log of result.logs) console.error(log)
    throw new Error('The backend bundle failed.')
  }
  const code = await result.outputs[0]!.text()
  // The runtime runs Web APIs only: a bare or node: import would fail there, so it fails the build instead.
  const imports = [...code.matchAll(/\bimport\s*(?:[^'"]*from\s*)?["']([^"']+)["']|\bimport\(\s*["']([^"']+)["']/g)].map((m) => m[1] ?? m[2])
  if (imports.length > 0) throw new Error(`The backend imports what the runtime cannot load: ${imports.join(', ')}`)
  await writeFile(join(out, 'index.ts'), code)
} finally {
  await rm(entry, { force: true })
}

await rm(archive, { force: true })
await run(['tar', '-czf', archive, '-C', out, '.'])
console.log(`Edge bundle: ${archive}`)

async function run(cmd: string[]): Promise<void> {
  const code = await Bun.spawn(cmd, { cwd: root, stdout: 'inherit', stderr: 'inherit' }).exited
  if (code !== 0) throw new Error(`${cmd.join(' ')} failed with exit code ${code}`)
}
