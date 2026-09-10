import { useState, type ComponentProps, type ReactNode } from 'react'
import { MenuRegular } from '@mingcute/react/core-regular'

import { cn } from '@/lib/utils'
import { Button } from '@/base-ui/actions/button'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/base-ui/overlays/drawer'

type AppStudioNavigationItem = {
  id: string
  label: ReactNode
  disabled?: boolean
}

function AppStudioLayout({
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
  navigationItems?: AppStudioNavigationItem[]
  activeNavigation?: string
  onNavigationChange?: (id: string, item: AppStudioNavigationItem) => void
  sidebarItems?: AppStudioNavigationItem[]
  activeSidebar?: string
  onSidebarChange?: (id: string, item: AppStudioNavigationItem) => void
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const hasSidebar = variant === 'sidebar' && Boolean(sidebarItems?.length)
  const showTopBar = Boolean(appName) || hasSidebar

  const sidebarNav = sidebarItems?.length ? (
    <AppSidebarContent>
      {sidebarItems.map((item) => (
        <AppSidebarItem
          key={item.id}
          active={item.id === activeSidebar}
          disabled={item.disabled}
          onClick={() => {
            onSidebarChange?.(item.id, item)
            setSidebarOpen(false)
          }}
        >
          {item.label}
        </AppSidebarItem>
      ))}
    </AppSidebarContent>
  ) : null

  const page = (
    <div data-slot="app-studio-layout-content" className="flex min-w-0 flex-1 flex-col">
      {header ? (
        <div data-slot="app-studio-layout-header" className="min-w-0 shrink-0">
          {header}
        </div>
      ) : null}
      {navigationItems?.length ? (
        <div data-slot="app-studio-layout-tabs" className="min-w-0 shrink-0">
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
      <main data-slot="app-studio-layout-main" className="min-h-0 min-w-0 flex-1">
        {children}
      </main>
    </div>
  )

  return (
    <div
      data-slot="app-studio-layout"
      data-variant={variant}
      className={cn(
        'flex min-h-full w-full min-w-0 flex-col bg-oc-background text-oc-foreground',
        className,
      )}
      {...props}
    >
      {showTopBar ? (
        <div
          data-slot="app-studio-layout-app-name"
          className="flex h-12 shrink-0 items-center gap-2 border-b border-solid border-oc-border px-4 text-sm font-medium text-oc-foreground sm:px-6"
        >
          {hasSidebar ? (
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
      {variant === 'sidebar' ? (
        <div data-slot="app-studio-layout-body" className="flex min-h-0 min-w-0 flex-1">
          {hasSidebar ? (
            <>
              <AppSidebar className="hidden md:flex">{sidebarNav}</AppSidebar>
              <Drawer open={sidebarOpen} onOpenChange={setSidebarOpen} swipeDirection="left">
                <DrawerContent className="w-72 data-[swipe-direction=left]:w-72 sm:w-72">
                  <DrawerHeader className="sr-only">
                    <DrawerTitle>Navigation</DrawerTitle>
                  </DrawerHeader>
                  {sidebarNav}
                </DrawerContent>
              </Drawer>
            </>
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

export { AppStudioLayout }
export type { AppStudioNavigationItem }
