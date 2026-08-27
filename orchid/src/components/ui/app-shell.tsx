import type { ComponentProps, ReactNode } from 'react'

import { cn } from '@/lib/utils'

function AppShell({
  className,
  nav,
  header,
  children,
  ...props
}: ComponentProps<'div'> & {
  nav?: ReactNode
  header?: ReactNode
  children: ReactNode
}) {
  return (
    <div
      data-slot="app-shell"
      className={cn('flex h-full min-h-0 min-w-0 flex-col overflow-hidden bg-oc-background', className)}
      {...props}
    >
      {header ? (
        <div data-slot="app-shell-header" className="shrink-0">
          {header}
        </div>
      ) : null}
      <div className="flex min-h-0 min-w-0 flex-1">
        {nav ? (
          <aside data-slot="app-shell-nav" className="hidden w-56 shrink-0 flex-col md:flex">
            {nav}
          </aside>
        ) : null}
        <main data-slot="app-shell-main" className="min-h-0 min-w-0 flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

function AppShellNav({ className, ...props }: ComponentProps<'nav'>) {
  return (
    <nav
      data-slot="app-shell-nav-list"
      className={cn('flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-3', className)}
      {...props}
    />
  )
}

function AppShellNavGroup({
  className,
  label,
  children,
  ...props
}: ComponentProps<'div'> & { label?: string }) {
  return (
    <div data-slot="app-shell-nav-group" className={cn('flex flex-col gap-0.5', className)} {...props}>
      {label ? (
        <p className="px-3 pb-1 text-[10px] font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          {label}
        </p>
      ) : null}
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
        'flex w-full cursor-pointer items-center rounded-lg px-3 py-2 text-left text-sm font-normal text-oc-muted-foreground outline-none',
        'hover:bg-oc-dark-blue-soft hover:text-oc-dark-blue',
        active &&
          'bg-oc-dark-blue-soft font-medium text-oc-dark-blue hover:bg-[color-mix(in_srgb,var(--oc-dark-blue)_10%,var(--oc-background))] hover:text-oc-dark-blue',
        className,
      )}
      {...props}
    />
  )
}

export { AppShell, AppShellNav, AppShellNavGroup, AppShellNavItem }
