import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'

import { useHitPayUser } from '#/lib/hitpay'
import { AppLayout } from '@/components/layout/app-layout'

export function Layout({ children }: { children: ReactNode }) {
  const { user, loading } = useHitPayUser()

  return (
    <AppLayout className="h-full min-h-0">
      <div className="flex h-12 items-center border-b border-oc-border px-4 sm:px-6">
        <Link to="/" className="text-sm font-medium hover:text-oc-primary">
          Your app
        </Link>
        <Link
          to="/current-user"
          className="ml-auto truncate text-sm text-oc-muted-foreground hover:text-oc-primary"
        >
          {loading ? 'Loading…' : user?.name || user?.email || 'Loading…'}
        </Link>
      </div>
      {children}
    </AppLayout>
  )
}
