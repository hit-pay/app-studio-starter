import type { ComponentProps, ReactNode } from 'react'

import { cn } from '@/lib/utils'

type AppNavigationItem = {
  id: string
  label: ReactNode
  disabled?: boolean
}

function AppLayout({
  className,
  variant = 'default',
  appName,
  header,
  navigationItems,
  activeNavigation,
  onNavigationChange,
  sidebarItems,
  activeSidebar,
  onSidebarChange,
  children,
  ...props
}: ComponentProps<'div'> & {
  variant?: 'default' | 'tabs' | 'sidebar'
  appName?: ReactNode
  header?: ReactNode
  navigationItems?: AppNavigationItem[]
  activeNavigation?: string
  onNavigationChange?: (id: string, item: AppNavigationItem) => void
  sidebarItems?: AppNavigationItem[]
  activeSidebar?: string
  onSidebarChange?: (id: string, item: AppNavigationItem) => void
}) {
  const page = (
    <div data-slot="app-layout-content" className="flex min-w-0 flex-1 flex-col">
      {header ? (
        <div data-slot="app-layout-header" className="min-w-0 shrink-0">
          {header}
        </div>
      ) : null}
      {navigationItems?.length ? (
        <div data-slot="app-layout-tabs" className="min-w-0 shrink-0">
          <AppNav>
            {navigationItems.map((item) => (
              <AppNavItem
                key={item.id}
                active={item.id === activeNavigation}
                disabled={item.disabled}
                onClick={() => onNavigationChange?.(item.id, item)}
              >
                {item.label}
              </AppNavItem>
            ))}
          </AppNav>
        </div>
      ) : null}
      <main data-slot="app-layout-main" className="min-h-0 min-w-0 flex-1">
        {children}
      </main>
    </div>
  )

  return (
    <div
      data-slot="app-layout"
      data-variant={variant}
      className={cn(
        'flex min-h-full w-full min-w-0 flex-col bg-oc-background text-oc-foreground',
        className,
      )}
      {...props}
    >
      {appName ? (
        <div
          data-slot="app-layout-app-name"
          className="flex h-12 shrink-0 items-center border-b border-solid border-oc-border px-4 text-sm font-medium text-oc-foreground sm:px-6"
        >
          <span className="min-w-0 truncate">{appName}</span>
        </div>
      ) : null}
      {variant === 'sidebar' ? (
        <div data-slot="app-layout-body" className="flex min-h-0 min-w-0 flex-1">
          {sidebarItems?.length ? (
            <AppSidebar>
              <AppSidebarContent>
                {sidebarItems.map((item) => (
                  <AppSidebarItem
                    key={item.id}
                    active={item.id === activeSidebar}
                    disabled={item.disabled}
                    onClick={() => onSidebarChange?.(item.id, item)}
                  >
                    {item.label}
                  </AppSidebarItem>
                ))}
              </AppSidebarContent>
            </AppSidebar>
          ) : null}
          {page}
        </div>
      ) : (
        page
      )}
    </div>
  )
}

function AppNav({ className, ...props }: ComponentProps<'nav'>) {
  return (
    <nav
      data-slot="app-nav"
      aria-label="Page navigation"
      className={cn(
        'mx-4 flex min-w-0 items-center overflow-x-auto border-b border-solid border-oc-border sm:mx-6',
        className,
      )}
      {...props}
    />
  )
}

function AppNavItem({
  className,
  active = false,
  ...props
}: ComponentProps<'button'> & {
  active?: boolean
}) {
  return (
    <button
      type="button"
      data-slot="app-nav-item"
      data-active={active || undefined}
      className={cn(
        'relative mr-8 inline-flex h-11 shrink-0 cursor-pointer items-center text-sm font-medium text-oc-muted-foreground outline-none transition-colors last:mr-0',
        'hover:text-oc-foreground focus-visible:ring-2 focus-visible:ring-oc-ring focus-visible:ring-offset-2',
        'data-active:text-oc-foreground data-active:after:absolute data-active:after:inset-x-0 data-active:after:bottom-0 data-active:after:h-0.5 data-active:after:bg-oc-primary',
        className,
      )}
      {...props}
    />
  )
}

function AppSidebar({ className, ...props }: ComponentProps<'aside'>) {
  return (
    <aside
      data-slot="app-sidebar"
      className={cn('flex h-full w-64 shrink-0 flex-col bg-oc-background', className)}
      {...props}
    />
  )
}

function AppSidebarContent({ className, ...props }: ComponentProps<'nav'>) {
  return (
    <nav
      data-slot="app-sidebar-content"
      aria-label="Application navigation"
      className={cn(
        'flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-3 py-4',
        className,
      )}
      {...props}
    />
  )
}

function AppSidebarItem({
  className,
  active = false,
  ...props
}: ComponentProps<'button'> & {
  active?: boolean
}) {
  return (
    <button
      type="button"
      data-slot="app-sidebar-item"
      aria-current={active ? 'page' : undefined}
      className={cn(
        'flex min-h-9 w-full min-w-0 cursor-pointer items-center rounded-xl px-3 py-2 text-left text-sm text-oc-muted-foreground outline-none transition-colors',
        'hover:bg-oc-neutral-soft hover:text-oc-child-sidebar-foreground focus-visible:ring-2 focus-visible:ring-oc-ring',
        'disabled:pointer-events-none disabled:opacity-50',
        active &&
          'bg-oc-neutral-soft font-medium text-oc-child-sidebar-foreground hover:bg-oc-neutral-soft',
        className,
      )}
      {...props}
    />
  )
}

export { AppLayout }
export type { AppNavigationItem }
