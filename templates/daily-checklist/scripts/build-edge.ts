// Builds dist-edge.tgz, what App Studio publishes: `app.js`, the whole app as one Bun program that serves the
// backend's routes and the built frontend with Bun.serve, and `static/`, the built frontend. The runtime compiles
// app.js ahead of time (`bun build --compile --aot`), runs it in a sandbox, and tells it where to listen
// (APP_SOCKET, a Unix socket) and where the frontend is (APP_STATIC_DIR).
import { cp, mkdir, rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const root = join(import.meta.dir, '..')
const out = join(root, 'dist-edge')
const archive = join(root, 'dist-edge.tgz')

await run(['bun', 'run', 'scripts/migrations.ts'])
await run(['bun', 'run', '--cwd', 'frontend', 'build'])

await rm(out, { recursive: true, force: true })
await mkdir(out, { recursive: true })
await cp(join(root, 'frontend/dist'), join(out, 'static'), { recursive: true })

const entry = join(root, 'backend/.edge-entry.ts')
await writeFile(
  entry,
  `import { join, normalize } from 'node:path'

import { routes } from './src/index.ts'

const dir = process.env.APP_STATIC_DIR ?? join(import.meta.dir, 'static')
const index = Bun.file(join(dir, 'index.html'))

async function asset(pathname: string) {
  const path = normalize(join(dir, decodeURIComponent(pathname)))
  if (!path.startsWith(dir + '/')) return null
  const found = Bun.file(path)
  return (await found.exists()) ? found : null
}

Bun.serve({
  ...(process.env.APP_SOCKET ? { unix: process.env.APP_SOCKET } : { port: Number(process.env.PORT ?? 3000) }),
  routes,
  async fetch(request) {
    const { pathname } = new URL(request.url)
    if (request.method !== 'GET' && request.method !== 'HEAD') return new Response('Not found', { status: 404 })
    const found = pathname === '/' ? null : await asset(pathname)
    if (found) {
      // Built assets have a content hash in their name, so they never change.
      const immutable = pathname.startsWith('/assets/') ? { 'cache-control': 'public, max-age=31536000, immutable' } : undefined
      return new Response(found, { headers: immutable })
    }
    return new Response(index, { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-cache' } })
  },
})
`,
)

try {
  const result = await Bun.build({
    entrypoints: [entry],
    target: 'bun',
    format: 'esm',
    minify: true,
    define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  })
  if (!result.success) {
    for (const log of result.logs) console.error(log)
    throw new Error('The app bundle failed.')
  }
  await writeFile(join(out, 'app.js'), await result.outputs[0]!.text())
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
