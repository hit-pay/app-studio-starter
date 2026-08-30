import type { ComponentProps, ComponentType, ReactNode } from 'react'
import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function SidebarRoot({ className, ...props }: ComponentProps<'aside'>) {
  return (
    <aside
      data-slot="sidebar"
      className={cn(
        'flex h-full w-64 shrink-0 flex-col overflow-hidden rounded-lg border border-solid border-oc-border bg-oc-background text-oc-foreground',
        className,
      )}
      {...props}
    />
  )
}

function SidebarHeader({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-header"
      className={cn(
        'flex h-12 shrink-0 items-center border-b border-solid border-oc-border px-4 text-sm font-medium',
        className,
      )}
      {...props}
    />
  )
}

function SidebarContent({ className, ...props }: ComponentProps<'nav'>) {
  return (
    <nav
      data-slot="sidebar-content"
      aria-label="Sidebar navigation"
      className={cn('min-h-0 flex-1 overflow-y-auto px-3 py-3', className)}
      {...props}
    />
  )
}

function SidebarNavGroup({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-group"
      className={cn('mb-5 flex min-w-0 flex-col gap-1 last:mb-0', className)}
      {...props}
    />
  )
}

function SidebarGroupLabel({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-group-label"
      className={cn(
        'px-1 py-1 text-[10px] leading-5 font-medium tracking-[0.16em] text-oc-muted-foreground uppercase',
        className,
      )}
      {...props}
    />
  )
}

function SidebarNavItem({
  className,
  render,
  active = false,
  icon,
  trailing,
  children,
  ...props
}: useRender.ComponentProps<'a'> & {
  active?: boolean
  icon?: ReactNode
  trailing?: ReactNode
}) {
  return useRender({
    defaultTagName: 'a',
    props: mergeProps<'a'>(
      {
        'aria-current': active ? 'page' : undefined,
        className: cn(
          'group/sidebar-item flex min-h-8 w-full min-w-0 cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-oc-foreground outline-none transition-colors',
          'hover:bg-oc-neutral-soft focus-visible:ring-2 focus-visible:ring-oc-ring',
          'aria-disabled:pointer-events-none aria-disabled:opacity-50',
          active &&
            'bg-oc-background font-medium shadow-[0_2px_10px_rgba(38,42,50,0.12)] ring-1 ring-oc-border/60',
          className,
        ),
        children: (
          <>
            {icon ? (
              <span className="inline-flex size-4 shrink-0 items-center justify-center text-oc-primary [&_svg]:size-4">
                {icon}
              </span>
            ) : null}
            <span className="min-w-0 flex-1 truncate">{children}</span>
            {trailing ? (
              <span className="inline-flex shrink-0 items-center text-oc-muted-foreground">
                {trailing}
              </span>
            ) : null}
          </>
        ),
      },
      props,
    ),
    render,
    state: {
      active,
      slot: 'sidebar-item',
    },
  })
}

function SidebarSubmenuIndicator() {
  return <ChevronRightIcon className="size-3.5" aria-hidden />
}

function SidebarFooter({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-footer"
      className={cn('shrink-0 border-t border-solid border-oc-border p-3', className)}
      {...props}
    />
  )
}

function SubSidebar({ className, ...props }: ComponentProps<'aside'>) {
  return (
    <aside
      data-slot="sub-sidebar"
      className={cn(
        'flex h-full w-64 shrink-0 flex-col border-r border-solid border-oc-border bg-oc-background',
        className,
      )}
      {...props}
    />
  )
}

function SubSidebarHeader({
  className,
  render,
  children,
  showBack = true,
  ...props
}: useRender.ComponentProps<'button'> & {
  showBack?: boolean
}) {
  return useRender({
    defaultTagName: 'button',
    props: mergeProps<'button'>(
      {
        type: 'button',
        className: cn(
          'flex h-12 w-full shrink-0 cursor-pointer items-center gap-2 border-b border-solid border-oc-border px-4 text-left text-sm font-medium text-oc-foreground outline-none transition-colors hover:bg-oc-neutral focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-oc-ring',
          className,
        ),
        children: (
          <>
            {showBack ? (
              <ChevronLeftIcon className="size-4 shrink-0 text-oc-muted-foreground" />
            ) : null}
            <span className="min-w-0 truncate">{children}</span>
          </>
        ),
      },
      props,
    ),
    render,
    state: {
      slot: 'sub-sidebar-header',
    },
  })
}

function SubSidebarContent({ className, ...props }: ComponentProps<'nav'>) {
  return (
    <nav
      data-slot="sub-sidebar-content"
      aria-label="Section navigation"
      className={cn('min-h-0 flex-1 overflow-y-auto px-3 py-4', className)}
      {...props}
    />
  )
}

function SubSidebarGroup({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="sub-sidebar-group"
      className={cn('mb-5 flex min-w-0 flex-col last:mb-0', className)}
      {...props}
    />
  )
}

function SubSidebarGroupLabel({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="sub-sidebar-group-label"
      className={cn(
        'mb-1 px-2 text-[10px] leading-5 font-medium tracking-[0.16em] text-oc-muted-foreground uppercase',
        className,
      )}
      {...props}
    />
  )
}

function SubSidebarItem({
  className,
  render,
  active = false,
  ...props
}: useRender.ComponentProps<'a'> & {
  active?: boolean
}) {
  return useRender({
    defaultTagName: 'a',
    props: mergeProps<'a'>(
      {
        'aria-current': active ? 'page' : undefined,
        className: cn(
          'flex min-h-8 w-full min-w-0 cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm text-oc-foreground outline-none transition-colors',
          'hover:bg-oc-neutral focus-visible:ring-2 focus-visible:ring-oc-ring',
          active && 'bg-oc-neutral font-medium text-oc-primary hover:bg-oc-neutral',
          className,
        ),
      },
      props,
    ),
    render,
    state: {
      active,
      slot: 'sub-sidebar-item',
    },
  })
}

type SidebarChildItem = {
  id: string
  label: string
  href?: string
  disabled?: boolean
}

type SidebarItemConfig = {
  id: string
  label: string
  href?: string
  icon?: string
  disabled?: boolean
  childrenMode?: 'inline' | 'sub-sidebar'
  items?: SidebarChildItem[]
}

type SidebarGroupConfig = {
  id: string
  label?: string
  items: SidebarItemConfig[]
}

type SidebarIcon = ComponentType<{ className?: string }>

function findItem(groups: SidebarGroupConfig[], id?: string) {
  if (!id) return undefined
  return groups.flatMap((group) => group.items).find((item) => item.id === id)
}

function Sidebar({
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
  groups: SidebarGroupConfig[]
  icons?: Record<string, SidebarIcon>
  activeItem?: string
  activeSubItem?: string
  sidebarClassName?: string
  subSidebarClassName?: string
  onItemChange?: (id: string, item: SidebarItemConfig) => void
  onSubItemChange?: (
    id: string,
    item: SidebarChildItem,
    parent: SidebarItemConfig,
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
      data-slot="sidebar"
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
        <SidebarRoot className={cn('w-full rounded-none', sidebarClassName)}>
          {header ? <SidebarHeader>{header}</SidebarHeader> : null}
          <SidebarContent>
            {groups.map((group) => (
              <SidebarNavGroup key={group.id}>
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
                      <SidebarNavItem
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
                      </SidebarNavItem>
                      {showInlineItems ? (
                        <div
                          data-slot="sidebar-inline-items"
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
              </SidebarNavGroup>
            ))}
          </SidebarContent>
          {footer ? <SidebarFooter>{footer}</SidebarFooter> : null}
        </SidebarRoot>
      )}
    </div>
  )
}

export { Sidebar }
export type {
  SidebarChildItem,
  SidebarGroupConfig,
  SidebarIcon,
  SidebarItemConfig,
}
