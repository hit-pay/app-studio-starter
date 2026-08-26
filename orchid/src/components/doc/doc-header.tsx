import { Link, useRouterState } from '@tanstack/react-router'

import { cn } from '@/lib/utils'
import { DOC_CRUMBS } from './doc-components'

function DocHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const crumb = DOC_CRUMBS[pathname] ?? 'Not found'

  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-4 bg-black px-6 text-white">
      <div className="flex min-w-0 items-baseline gap-2">
        <Link to="/" className="text-sm text-white/60 hover:text-white">
          Orchid UI
        </Link>
        <Link
          to="/setup"
          className={cn(
            'text-sm hover:text-white',
            pathname === '/setup' ? 'font-semibold text-white' : 'text-white/60',
          )}
        >
          Setup
        </Link>
        <span className="text-sm text-white/40">→</span>
        <h1 className="truncate text-sm font-semibold">{crumb}</h1>
      </div>
    </header>
  )
}

export { DocHeader }
