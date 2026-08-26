import { useEffect, useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { MoonIcon, SunIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { DOC_CRUMBS } from './doc-components'

const THEME_KEY = 'orchid-theme'

function readTheme(): 'light' | 'dark' {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function DocHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const crumb = DOC_CRUMBS[pathname] ?? 'Not found'
  const [theme, setTheme] = useState<'light' | 'dark'>(readTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    window.localStorage.setItem(THEME_KEY, theme)
  }, [theme])

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
      <button
        type="button"
        aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="inline-flex size-8 items-center justify-center rounded-lg text-white/70 outline-none hover:bg-white/10 hover:text-white"
      >
        {theme === 'dark' ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
      </button>
    </header>
  )
}

export { DocHeader }
