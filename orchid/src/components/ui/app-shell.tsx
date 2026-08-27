import type { ComponentProps, ReactNode } from 'react'

import { cn } from '@/lib/utils'

function AppShell({
  className,
  nav,
  tabs,
  header,
  children,
  ...props
}: ComponentProps<'div'> & {
  nav?: ReactNode
  tabs?: ReactNode
  header?: ReactNode
  children: ReactNode
}) {
  const tabBar = tabs ?? nav

  return (
    <div
      data-slot="app-shell"
      className={cn(
        'flex h-full min-h-full w-full flex-col overflow-hidden bg-oc-background',
        className,
      )}
      {...props}
    >
      {header ? (
        <div data-slot="app-shell-header" className="min-w-0 shrink-0">
          {header}
        </div>
      ) : null}
      {tabBar ? (
        <div data-slot="app-shell-tabs" className="min-w-0 shrink-0">
          {tabBar}
        </div>
      ) : null}
      <main
        data-slot="app-shell-main"
        className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6"
      >
        {children}
      </main>
    </div>
  )
}

function AppShellNav({ className, ...props }: ComponentProps<'nav'>) {
  return (
    <nav
      data-slot="app-shell-nav-list"
      className={cn(
        'relative flex min-w-0 items-stretch gap-0 overflow-x-auto border-b border-solid border-oc-border px-4 md:px-6',
        className,
      )}
      {...props}
    />
  )
}

function AppShellNavGroup({
  className,
  label: _label,
  children,
  ...props
}: ComponentProps<'div'> & { label?: string }) {
  return (
    <div
      data-slot="app-shell-nav-group"
      className={cn('flex min-w-0 shrink-0 items-stretch', className)}
      {...props}
    >
      {children}
    </div>
  )
}

function AppShellNavItem({
  className,
  active = false,
  ...props
}: ComponentProps<'button'> & { active?: boolean }) {
  return (
    <button
      type="button"
      data-slot="app-shell-nav-item"
      data-active={active || undefined}
      className={cn(
        'relative inline-flex shrink-0 cursor-pointer items-center justify-center px-3 py-2 text-sm leading-[1.5] font-medium whitespace-nowrap text-oc-muted-foreground outline-none select-none',
        'hover:text-oc-foreground',
        active &&
          'text-oc-foreground after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-oc-primary',
        className,
      )}
      {...props}
    />
  )
}

export { AppShell, AppShellNav, AppShellNavGroup, AppShellNavItem }
