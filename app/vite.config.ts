import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { nitro } from 'nitro/vite'
import { defineConfig, type PluginOption, type UserConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

function stripStartManifestFilePaths(): PluginOption {
  return {
    name: 'studio:strip-start-manifest-file-paths',
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

// STUDIO_BUILD_TARGET=edge builds the bundle Supabase Edge Runtime runs for published apps.
const edge = process.env.STUDIO_BUILD_TARGET === 'edge'

export default defineConfig((): UserConfig => {
  return {
    envPrefix: ['VITE_', 'APP_STUDIO_APP_ID'],
    resolve: {
      tsconfigPaths: true,
      alias: edge
        ? [
            // The Node client loads a native binary, which an isolate cannot run.
            { find: /^@libsql\/client$/, replacement: '@libsql/client/web' },
            { find: /^ws$/, replacement: fileURLToPath(new URL('./edge/ws.ts', import.meta.url)) },
          ]
        : [],
      dedupe: ['react', 'react-dom'],
    },
    optimizeDeps: {
      include: ['recharts', 'react', 'react-dom'],
    },
    build: {
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        // These are server-only dependencies imported by server functions.
        // Keep them external so the client build does not warn about Node built-ins.
        external: ['node:crypto', 'node:fs/promises', 'node:path'],
      },
    },
    plugins: [
      tailwindcss(),
      tanstackStart(),
      stripStartManifestFilePaths(),
      nitro({
        config: {
          preset: edge ? 'standard' : 'bun',
          rollupConfig: {
            checks: {
              preferBuiltinFeature: false,
            },
          } as Record<string, unknown>,
          hooks: {
            'rollup:before'(_nitro, config) {
              delete (config.output as { generatedCode?: unknown }).generatedCode
            },
          },
        },
      }) as unknown as PluginOption,
      viteReact(),
    ],
  }
})
