// Builds the bundle Supabase Edge Runtime runs for a published app: dist-edge.tgz.
// The build runs in a copy of the app, so the preview's .output and .nitro stay untouched.
import { cp, mkdir, mkdtemp, readdir, readFile, rm, symlink } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const out = join(root, 'dist-edge')
const archive = join(root, 'dist-edge.tgz')
const skip = new Set(['node_modules', '.output', '.nitro', '.tanstack', 'dist-edge', 'dist-edge.tgz', '.git'])

const work = await mkdtemp(join(tmpdir(), 'studio-edge-'))

try {
  for (const entry of await readdir(root)) {
    if (!skip.has(entry)) {
      await cp(join(root, entry), join(work, entry), { recursive: true })
    }
  }

  await symlink(join(root, 'node_modules'), join(work, 'node_modules'), 'dir')

  await run(['bun', '--bun', 'vite', 'build'], work, { STUDIO_BUILD_TARGET: 'edge', NODE_ENV: 'production' })

  await rm(out, { recursive: true, force: true })
  await mkdir(join(out, '.nitro/vite/services'), { recursive: true })
  await cp(join(work, '.output'), join(out, '.output'), { recursive: true })
  await cp(join(work, '.nitro/vite/services/ssr'), join(out, '.nitro/vite/services/ssr'), { recursive: true })
  // The runtime's static-file glob skips dot-directories, so public files get a plain folder.
  await cp(join(work, '.output/public'), join(out, 'static'), { recursive: true })
  await cp(join(root, 'edge/index.ts'), join(out, 'index.ts'))
  await cp(join(root, 'edge/polyfill.ts'), join(out, 'polyfill.ts'))

  await assertNoBareImports(join(out, '.nitro/vite/services/ssr'))
  await assertNoBareImports(join(out, '.output/server'))

  await rm(archive, { force: true })
  await run(['tar', '-czf', archive, '-C', out, '.'], root)

  console.log(`Edge bundle: ${archive}`)
} finally {
  await rm(work, { recursive: true, force: true })
}

async function run(cmd: string[], cwd: string, env: Record<string, string> = {}): Promise<void> {
  const code = await new Promise<number | null>((done, fail) => {
    spawn(cmd[0]!, cmd.slice(1), { cwd, env: { ...process.env, ...env }, stdio: 'inherit' })
      .on('error', fail)
      .on('exit', done)
  })

  if (code !== 0) {
    throw new Error(`${cmd.join(' ')} failed with exit code ${code}`)
  }
}

// The runtime only resolves relative imports and node: built-ins inside the bundle.
async function assertNoBareImports(dir: string): Promise<void> {
  const bare: string[] = []

  for (const file of await walk(dir)) {
    if (!/\.(m?js)$/.test(file)) continue

    const code = await readFile(file, 'utf8')

    const statements = /^\s*(?:import|export)\b[^'"`;]*?\bfrom\s*["']([^"']+)["']|^\s*import\s*["']([^"']+)["']|\bimport\(\s*["']([^"']+)["']\s*\)/gm

    for (const match of code.matchAll(statements)) {
      const specifier = (match[1] ?? match[2] ?? match[3])!

      if (!specifier.startsWith('.') && !specifier.startsWith('/') && !specifier.startsWith('node:')) {
        bare.push(`${file.slice(dir.length + 1)}: ${specifier}`)
      }
    }
  }

  if (bare.length > 0) {
    throw new Error(`Edge bundle has imports the runtime cannot resolve:\n${bare.join('\n')}`)
  }
}

async function walk(dir: string): Promise<string[]> {
  const files: string[] = []

  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    files.push(...(entry.isDirectory() ? await walk(path) : [path]))
  }

  return files
}
