import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { nitro } from 'nitro/vite'
import { defineConfig, loadEnv } from 'vite'
import viteReact from '@vitejs/plugin-react'

function resolveBasePath(mode: string): string {
  const env = loadEnv(mode, process.cwd(), '')
  const appId = env.APP_STUDIO_APP_ID?.trim()

  if (appId) {
    return `/${appId}/`
  }

  return '/'
}

export default defineConfig(({ mode }) => {
  const base = resolveBasePath(mode)
  const basepath = base.replace(/\/$/, '') || '/'

  return {
    base,
    resolve: { tsconfigPaths: true },
    build: {
      chunkSizeWarningLimit: 2000,
    },
    plugins: [
      tailwindcss(),
      tanstackStart({
        router: {
          basepath,
        },
        server: {
          build: {
            inlineCss: true,
          },
        },
      }),
      nitro({
        config: {
          preset: 'bun',
          baseURL: base,
        },
      }),
      viteReact(),
    ],
  }
})
