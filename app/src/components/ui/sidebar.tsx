import type { ComponentProps, ReactNode } from 'react'
import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { ChevronRightIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function Sidebar({ className, ...props }: ComponentProps<'aside'>) {
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

function SidebarGroup({ className, ...props }: ComponentProps<'div'>) {
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

function SidebarItem({
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

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarItem,
  SidebarSubmenuIndicator,
}
