import { createContext, useContext, useState, type ReactNode } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { MonitorIcon, SmartphoneIcon, TabletIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { DOC_CRUMBS } from './doc-components'

type Preview = 'Mobile' | 'Tablet' | 'Desktop'

const PREVIEW_MAX_WIDTH: Record<Preview, string> = {
  Mobile: '390px',
  Tablet: '768px',
  Desktop: '100%',
}

const PreviewContext = createContext<{
  preview: Preview
  setPreview: (preview: Preview) => void
}>({
  preview: 'Desktop',
  setPreview: () => {},
})

function PreviewProvider({ children }: { children: ReactNode }) {
  const [preview, setPreview] = useState<Preview>('Desktop')

  return (
    <PreviewContext.Provider value={{ preview, setPreview }}>{children}</PreviewContext.Provider>
  )
}

function PreviewCanvas({ children }: { children: ReactNode }) {
  const { preview } = useContext(PreviewContext)

  return (
    <div className="min-h-0 flex-1 overflow-auto bg-background">
      <div
        className="w-full bg-background transition-[max-width] duration-200"
        style={{ maxWidth: PREVIEW_MAX_WIDTH[preview] }}
      >
        {children}
      </div>
    </div>
  )
}

const PREVIEW_OPTIONS: { id: Preview; label: string; icon: typeof MonitorIcon }[] = [
  { id: 'Mobile', label: 'Mobile', icon: SmartphoneIcon },
  { id: 'Tablet', label: 'Tablet', icon: TabletIcon },
  { id: 'Desktop', label: 'Desktop', icon: MonitorIcon },
]

function DocHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const crumb = DOC_CRUMBS[pathname] ?? 'Not found'
  const { preview, setPreview } = useContext(PreviewContext)

  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-4 bg-black px-6 text-white">
      <div className="flex min-w-0 items-baseline gap-2">
        <Link to="/" className="text-sm text-white/60 hover:text-white">
          Orchid UI
        </Link>
        <span className="text-sm text-white/40">→</span>
        <h1 className="truncate text-sm font-semibold">{crumb}</h1>
      </div>

      <div className="hidden items-center gap-1 rounded-lg bg-white/10 p-0.5 sm:flex">
        {PREVIEW_OPTIONS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            aria-pressed={preview === id}
            onClick={() => setPreview(id)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium outline-none',
              preview === id ? 'bg-white text-black' : 'text-white/70 hover:text-white',
            )}
          >
            <Icon className="size-3.5" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>
    </header>
  )
}

export { DocHeader, PreviewCanvas, PreviewProvider }
export type { Preview }
