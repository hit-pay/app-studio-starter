import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { nitro } from 'nitro/vite'
import { defineConfig, loadEnv, type PluginOption, type UserConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'

function prefixNitroPublicAssetMap(appId: string | undefined) {
  if (!appId) return

  const file = resolve(process.cwd(), '.output/server/index.mjs')
  if (!existsSync(file)) return

  const prefix = `/${appId}`
  const source = readFileSync(file, 'utf8')
  const next = source
    .replaceAll('"/assets/', `"${prefix}/assets/`)
    .replaceAll("'/assets/", `'${prefix}/assets/`)
    .replaceAll('route: "/assets/**"', `route: "${prefix}/assets/**"`)
    .replaceAll("route: '/assets/**'", `route: '${prefix}/assets/**'`)

  if (next !== source) writeFileSync(file, next)
}

function prefixNitroPublicAssets(appId: string | undefined): PluginOption {
  return {
    name: 'app-studio:prefix-nitro-public-assets',
    apply: 'build',
    enforce: 'post',
    closeBundle: () => prefixNitroPublicAssetMap(appId),
  }
}

function stripStartManifestFilePaths(): PluginOption {
  return {
    name: 'app-studio:strip-start-manifest-file-paths',
    apply: 'build',
    generateBundle(_options, bundle) {
      for (const output of Object.values(bundle)) {
        if (output.type !== 'chunk') continue
        if (!output.fileName.includes('_tanstack-start-manifest')) continue

        output.code = output.code.replace(
          /\s*filePath:\s*(?:"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'),?/g,
          '',
        )
      }
    },
  }
}

function resolveBasePath(mode: string): string {
  const env = loadEnv(mode, process.cwd(), '')
  const appId = env.APP_STUDIO_APP_ID?.trim()

  if (appId) {
    return `/${appId}/`
  }

  return '/'
}

export default defineConfig(({ mode }): UserConfig => {
  const base = resolveBasePath(mode)
  const basepath = base.replace(/\/$/, '') || '/'

  return {
    base,
    envPrefix: ['VITE_', 'APP_STUDIO_APP_ID'],
    resolve: {
      tsconfigPaths: true,
      dedupe: ['react', 'react-dom'],
    },
    optimizeDeps: {
      include: ['recharts', 'react', 'react-dom'],
    },
    build: {
      chunkSizeWarningLimit: 2000,
    },
    plugins: [
      tailwindcss(),
      tanstackStart({
        router: {
          basepath,
        },
      }),
      stripStartManifestFilePaths(),
      nitro({
        config: {
          preset: 'bun',
          baseURL: base,
          hooks: {
            compiled() {
              prefixNitroPublicAssetMap(
                loadEnv(mode, process.cwd(), '').APP_STUDIO_APP_ID?.trim(),
              )
            },
          },
        },
      }) as unknown as PluginOption,
      prefixNitroPublicAssets(basepath === '/' ? undefined : basepath.slice(1)),
      viteReact(),
    ],
  }
})
