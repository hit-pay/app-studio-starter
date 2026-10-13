import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { nitro } from 'nitro/vite'
import { defineConfig, type PluginOption, type UserConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'

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

export default defineConfig((): UserConfig => {
  return {
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
          preset: 'bun',
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
