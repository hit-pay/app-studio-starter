import type { ComponentProps, ReactNode } from 'react'

import { cn } from '@/lib/utils'

function AppShell({
  className,
  variant = 'default',
  appName,
  header,
  navigation,
  sidebar,
  children,
  ...props
}: ComponentProps<'div'> & {
  variant?: 'default' | 'tabs' | 'sidebar'
  appName?: ReactNode
  header?: ReactNode
  navigation?: ReactNode
  sidebar?: ReactNode
}) {
  const page = (
    <div data-slot="app-shell-content" className="flex min-w-0 flex-1 flex-col">
      {header ? (
        <div data-slot="app-shell-header" className="min-w-0 shrink-0">
          {header}
        </div>
      ) : null}
      {navigation ? (
        <div data-slot="app-shell-tabs" className="min-w-0 shrink-0">
          {navigation}
        </div>
      ) : null}
      <main data-slot="app-shell-main" className="min-w-0 flex-1 px-4 py-5 sm:px-6">
        {children}
      </main>
    </div>
  )

  return (
    <div
      data-slot="app-shell"
      data-variant={variant}
      className={cn(
        'flex min-h-full w-full min-w-0 flex-col bg-oc-background text-oc-foreground',
        className,
      )}
      {...props}
    >
      {appName ? (
        <div
          data-slot="app-shell-app-name"
          className="flex h-12 shrink-0 items-center border-b border-solid border-oc-border px-4 text-sm font-medium text-oc-foreground sm:px-6"
        >
          <span className="min-w-0 truncate">{appName}</span>
        </div>
      ) : null}
      {variant === 'sidebar' ? (
        <div data-slot="app-shell-layout" className="flex min-h-0 min-w-0 flex-1">
          {sidebar}
          {page}
        </div>
      ) : (
        page
      )}
    </div>
  )
}

function AppShellNav({ className, ...props }: ComponentProps<'nav'>) {
  return (
    <nav
      data-slot="app-shell-nav-list"
      aria-label="Page navigation"
      className={cn(
        'flex min-w-0 items-center gap-6 overflow-x-auto border-b border-solid border-oc-border px-4 sm:px-6',
        className,
      )}
      {...props}
    />
  )
}

function AppShellNavGroup({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="app-shell-nav-group"
      className={cn('flex shrink-0 items-center gap-1', className)}
      {...props}
    />
  )
}

function AppShellNavItem({
  className,
  active = false,
  ...props
}: ComponentProps<'button'> & {
  active?: boolean
}) {
  return (
    <button
      type="button"
      data-slot="app-shell-nav-item"
      data-active={active || undefined}
      className={cn(
        'relative inline-flex h-11 shrink-0 cursor-pointer items-center px-2 text-sm font-medium text-oc-muted-foreground outline-none transition-colors',
        'hover:text-oc-foreground focus-visible:ring-2 focus-visible:ring-oc-ring focus-visible:ring-offset-2',
        'data-active:text-oc-foreground data-active:after:absolute data-active:after:inset-x-2 data-active:after:bottom-0 data-active:after:h-0.5 data-active:after:bg-oc-primary',
        className,
      )}
      {...props}
    />
  )
}

export { AppShell, AppShellNav, AppShellNavGroup, AppShellNavItem }
