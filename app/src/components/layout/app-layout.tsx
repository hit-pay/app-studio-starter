'use client'

import { useState, type ComponentProps, type ReactNode } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { MenuRegular } from '@mingcute/react/core-regular'

import { cn } from '@/lib/utils'
import { Button } from '@ui/button'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@ui/drawer'

type AppLayoutNavigationItem = {
  id: string
  label: ReactNode
  /** TanStack Router path — navigation uses `Link`; active state follows the URL. */
  to: string
  disabled?: boolean
}

function isPathActive(pathname: string, to: string) {
  if (to === '/') {
    return pathname === '/'
  }
  return pathname === to || pathname.startsWith(`${to}/`)
}

function activeIdFromPath(pathname: string, items?: AppLayoutNavigationItem[]) {
  if (!items?.length) {
    return ''
  }

  const match = [...items]
    .sort((left, right) => right.to.length - left.to.length)
    .find((item) => isPathActive(pathname, item.to))

  return match?.id ?? items[0]?.id ?? ''
}

function AppLayout({
  className,
  variant = 'default',
  appName,
  appBarActions,
  header,
  navigationItems,
  children,
  ...props
}: ComponentProps<'div'> & {
  variant?: 'default' | 'tabs' | 'sidebar'
  appName?: ReactNode
  /** Renders at the end of the top app bar (right of `appName`). */
  appBarActions?: ReactNode
  header?: ReactNode
  navigationItems?: AppLayoutNavigationItem[]
}) {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const resolvedActive = activeIdFromPath(pathname, navigationItems)

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const hasNavigation = Boolean(navigationItems?.length)
  const showTabs = variant === 'tabs' && hasNavigation
  const showSidebar = variant === 'sidebar' && hasNavigation
  const showTopBar = Boolean(appName) || showSidebar

  const sidebarNav = showSidebar ? (
    <AppSidebarContent>
      {navigationItems!.map((item) => (
        <AppSidebarItem
          key={item.id}
          to={item.to}
          active={item.id === resolvedActive}
          disabled={item.disabled}
          onNavigate={() => setSidebarOpen(false)}
        >
          {item.label}
        </AppSidebarItem>
      ))}
    </AppSidebarContent>
  ) : null

  const page = (
    <div data-slot="app-layout-content" className="flex min-w-0 flex-1 flex-col">
      {header ? (
        <div data-slot="app-layout-header" className="min-w-0 shrink-0">
          {header}
        </div>
      ) : null}
      {showTabs ? (
        <div data-slot="app-layout-tabs" className="min-w-0 shrink-0">
          <AppNav>
            {navigationItems!.map((item) => (
              <AppNavItem
                key={item.id}
                to={item.to}
                active={item.id === resolvedActive}
                disabled={item.disabled}
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
      {showTopBar ? (
        <div
          data-slot="app-layout-app-name"
          className="flex h-12 shrink-0 items-center gap-2 border-b border-solid border-oc-border px-4 text-sm font-medium text-oc-foreground sm:px-6"
        >
          {showSidebar ? (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="md:hidden"
              aria-label="Open navigation"
              onClick={() => setSidebarOpen(true)}
            >
              <MenuRegular />
            </Button>
          ) : null}
          {appName ? <span className="min-w-0 truncate">{appName}</span> : null}
        </div>
      ) : null}
      {showSidebar ? (
        <div data-slot="app-layout-body" className="flex min-h-0 min-w-0 flex-1">
          <AppSidebar className="hidden md:flex">{sidebarNav}</AppSidebar>
          <Drawer open={sidebarOpen} onOpenChange={setSidebarOpen} swipeDirection="left">
            <DrawerContent className="w-72 data-[swipe-direction=left]:w-72 sm:w-72">
              <DrawerHeader className="sr-only">
                <DrawerTitle>Navigation</DrawerTitle>
              </DrawerHeader>
              {sidebarNav}
            </DrawerContent>
          </Drawer>
          {page}
        </div>
      ) : (
        page
      )}
    </div>
  )
}

const appNavItemClassName =
  'relative mr-8 inline-flex h-11 shrink-0 cursor-pointer items-center text-sm font-medium text-oc-muted-foreground outline-none transition-colors last:mr-0 hover:text-oc-foreground focus-visible:ring-2 focus-visible:ring-oc-ring focus-visible:ring-offset-2 data-[active=true]:text-oc-foreground data-[active=true]:after:absolute data-[active=true]:after:inset-x-0 data-[active=true]:after:bottom-0 data-[active=true]:after:h-0.5 data-[active=true]:after:bg-oc-primary disabled:pointer-events-none disabled:opacity-50'

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
  to,
  disabled,
  children,
}: {
  active?: boolean
  to: string
  disabled?: boolean
  children: ReactNode
  className?: string
}) {
  return (
    <Link
      to={to}
      data-slot="app-nav-item"
      data-active={active ? true : undefined}
      aria-disabled={disabled || undefined}
      className={cn(appNavItemClassName, className)}
      onClick={(event) => {
        if (disabled) {
          event.preventDefault()
        }
      }}
    >
      {children}
    </Link>
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

const appSidebarItemClassName =
  'flex min-h-9 w-full min-w-0 cursor-pointer items-center rounded-xl px-3 py-2 text-left text-sm text-oc-muted-foreground outline-none transition-colors hover:bg-oc-neutral-soft hover:text-oc-child-sidebar-foreground focus-visible:ring-2 focus-visible:ring-oc-ring disabled:pointer-events-none disabled:opacity-50 data-[active=true]:bg-oc-neutral-soft data-[active=true]:font-medium data-[active=true]:text-oc-child-sidebar-foreground data-[active=true]:hover:bg-oc-neutral-soft'

function AppSidebarItem({
  className,
  active = false,
  to,
  disabled,
  onNavigate,
  children,
}: {
  active?: boolean
  to: string
  disabled?: boolean
  onNavigate?: () => void
  children: ReactNode
  className?: string
}) {
  return (
    <Link
      to={to}
      data-slot="app-sidebar-item"
      data-active={active ? true : undefined}
      aria-current={active ? 'page' : undefined}
      aria-disabled={disabled || undefined}
      className={cn(appSidebarItemClassName, className)}
      onClick={(event) => {
        if (disabled) {
          event.preventDefault()
          return
        }
        onNavigate?.()
      }}
    >
      {children}
    </Link>
  )
}

export { AppLayout, activeIdFromPath, isPathActive }
export type { AppLayoutNavigationItem }
