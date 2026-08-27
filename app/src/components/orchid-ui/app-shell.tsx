import { useState, type ComponentProps, type ReactNode } from 'react'
import { MenuIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from './button'

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
  const [navOpen, setNavOpen] = useState(false)

  return (
    <div
      data-slot="app-shell"
      className={cn(
        'flex h-full min-h-full w-full flex-col overflow-hidden bg-oc-background',
        className,
      )}
      {...props}
    >
      {header || nav ? (
        <div data-slot="app-shell-header" className="flex min-w-0 shrink-0 items-start">
          {nav ? (
            <div className="flex shrink-0 items-center py-3 pl-3 md:hidden">
              <Button
                type="button"
                variant="Secondary"
                style="Border"
                size="Small"
                iconOnly
                aria-label="Open menu"
                aria-expanded={navOpen}
                onClick={() => setNavOpen(true)}
              >
                <MenuIcon />
              </Button>
            </div>
          ) : null}
          {header ? <div className="min-w-0 flex-1">{header}</div> : null}
        </div>
      ) : null}
      <div className="relative flex min-h-0 min-w-0 flex-1">
        {nav ? (
          <>
            {navOpen ? (
              <button
                type="button"
                aria-label="Close menu"
                className="absolute inset-0 z-40 bg-oc-foreground/20 md:hidden"
                onClick={() => setNavOpen(false)}
              />
            ) : null}
            <aside
              data-slot="app-shell-nav"
              className={cn(
                'z-50 w-60 shrink-0 flex-col bg-oc-background',
                'max-md:absolute max-md:inset-y-0 max-md:left-0 max-md:shadow-oc-popup',
                navOpen ? 'flex' : 'hidden',
                'md:relative md:flex',
              )}
              onClick={(event) => {
                if (!(event.target instanceof Element)) return
                if (!event.target.closest('[data-slot=app-shell-nav-item]')) return
                setNavOpen(false)
              }}
            >
              {nav}
            </aside>
          </>
        ) : null}
        <main
          data-slot="app-shell-main"
          className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6"
        >
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
      className={cn('flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 py-3 md:px-6', className)}
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
        <p className="px-3 pt-0.5 pb-1 text-[10px] font-medium leading-[18px] tracking-[0.18em] text-oc-muted-foreground uppercase">
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
        'flex w-full cursor-pointer items-center rounded-md px-3 py-1.5 text-left text-sm font-normal leading-5 text-oc-foreground outline-none',
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
