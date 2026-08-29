import type { ComponentProps, ComponentType, ReactNode } from 'react'

import { cn } from '@/lib/utils'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarItem,
  SidebarSubmenuIndicator,
} from '@/components/ui/sidebar'
import {
  SubSidebar,
  SubSidebarContent,
  SubSidebarGroup,
  SubSidebarGroupLabel,
  SubSidebarHeader,
  SubSidebarItem,
} from '@/components/ui/sub-sidebar'

type AppSidebarChildItem = {
  id: string
  label: string
  href?: string
  disabled?: boolean
}

type AppSidebarItem = {
  id: string
  label: string
  href?: string
  icon?: string
  disabled?: boolean
  childrenMode?: 'inline' | 'sub-sidebar'
  items?: AppSidebarChildItem[]
}

type AppSidebarGroup = {
  id: string
  label?: string
  items: AppSidebarItem[]
}

type AppSidebarIcon = ComponentType<{ className?: string }>

function findItem(groups: AppSidebarGroup[], id?: string) {
  if (!id) return undefined
  return groups.flatMap((group) => group.items).find((item) => item.id === id)
}

function AppSidebar({
  className,
  sidebarClassName,
  subSidebarClassName,
  header,
  footer,
  groups,
  icons = {},
  activeItem,
  activeSubItem,
  onItemChange,
  onSubItemChange,
  onSubSidebarClose,
  ...props
}: Omit<ComponentProps<'div'>, 'onChange'> & {
  header?: ReactNode
  footer?: ReactNode
  groups: AppSidebarGroup[]
  icons?: Record<string, AppSidebarIcon>
  activeItem?: string
  activeSubItem?: string
  sidebarClassName?: string
  subSidebarClassName?: string
  onItemChange?: (id: string, item: AppSidebarItem) => void
  onSubItemChange?: (
    id: string,
    item: AppSidebarChildItem,
    parent: AppSidebarItem,
  ) => void
  onSubSidebarClose?: () => void
}) {
  const selected = findItem(groups, activeItem)
  const subItems = selected?.items ?? []
  const showSubSidebar =
    Boolean(selected && subItems.length > 0) &&
    selected?.childrenMode !== 'inline'

  return (
    <div
      data-slot="app-sidebar"
      className={cn('flex h-full min-h-0 w-64 max-w-full', className)}
      {...props}
    >
      {showSubSidebar && selected ? (
        <SubSidebar className={cn('w-full rounded-none', subSidebarClassName)}>
          <SubSidebarHeader onClick={onSubSidebarClose}>
            {selected.label}
          </SubSidebarHeader>
          <SubSidebarContent>
            <SubSidebarGroup>
              <SubSidebarGroupLabel>{selected.label}</SubSidebarGroupLabel>
              {subItems.map((item) => (
                <SubSidebarItem
                  key={item.id}
                  href={item.href ?? `#${item.id}`}
                  active={item.id === activeSubItem}
                  aria-disabled={item.disabled || undefined}
                  onClick={(event) => {
                    if (item.disabled) {
                      event.preventDefault()
                      return
                    }
                    onSubItemChange?.(item.id, item, selected)
                  }}
                >
                  {item.label}
                </SubSidebarItem>
              ))}
            </SubSidebarGroup>
          </SubSidebarContent>
        </SubSidebar>
      ) : (
        <Sidebar className={cn('w-full rounded-none', sidebarClassName)}>
          {header ? <SidebarHeader>{header}</SidebarHeader> : null}
          <SidebarContent>
            {groups.map((group) => (
              <SidebarGroup key={group.id}>
                {group.label ? <SidebarGroupLabel>{group.label}</SidebarGroupLabel> : null}
                {group.items.map((item) => {
                  const Icon = item.icon ? icons[item.icon] : undefined
                  const hasSubmenu = Boolean(item.items?.length)
                  const isActive = item.id === activeItem
                  const showInlineItems =
                    hasSubmenu &&
                    item.childrenMode === 'inline' &&
                    isActive

                  return (
                    <div key={item.id} className="flex min-w-0 flex-col">
                      <SidebarItem
                        href={item.href ?? `#${item.id}`}
                        active={isActive}
                        aria-disabled={item.disabled || undefined}
                        icon={Icon ? <Icon /> : undefined}
                        trailing={
                          hasSubmenu ? (
                            <span
                              className={cn(
                                'transition-transform',
                                showInlineItems && 'rotate-90',
                              )}
                            >
                              <SidebarSubmenuIndicator />
                            </span>
                          ) : undefined
                        }
                        onClick={(event) => {
                          if (item.disabled) {
                            event.preventDefault()
                            return
                          }
                          onItemChange?.(item.id, item)
                        }}
                      >
                        {item.label}
                      </SidebarItem>
                      {showInlineItems ? (
                        <div
                          data-slot="app-sidebar-inline-items"
                          className="flex min-w-0 flex-col py-1"
                        >
                          {item.items?.map((child) => (
                            <a
                              key={child.id}
                              href={child.href ?? `#${child.id}`}
                              aria-current={child.id === activeSubItem ? 'page' : undefined}
                              aria-disabled={child.disabled || undefined}
                              className={cn(
                                'relative flex min-h-8 min-w-0 items-center rounded-lg py-1.5 pr-3 pl-8 text-sm text-oc-muted-foreground outline-none transition-colors',
                                'hover:bg-oc-neutral-soft hover:text-oc-foreground focus-visible:ring-2 focus-visible:ring-oc-ring',
                                'aria-disabled:pointer-events-none aria-disabled:opacity-50',
                                child.id === activeSubItem &&
                                  'font-medium text-oc-foreground before:absolute before:left-3.5 before:size-1.5 before:rounded-full before:bg-oc-primary',
                              )}
                              onClick={(event) => {
                                if (child.disabled) {
                                  event.preventDefault()
                                  return
                                }
                                onSubItemChange?.(child.id, child, item)
                              }}
                            >
                              <span className="min-w-0 truncate">{child.label}</span>
                            </a>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  )
                })}
              </SidebarGroup>
            ))}
          </SidebarContent>
          {footer ? <SidebarFooter>{footer}</SidebarFooter> : null}
        </Sidebar>
      )}
    </div>
  )
}

export { AppSidebar }
export type {
  AppSidebarChildItem,
  AppSidebarGroup,
  AppSidebarIcon,
  AppSidebarItem,
}
