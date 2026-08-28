import type { ComponentProps } from 'react'
import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { ChevronLeftIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

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

export {
  SubSidebar,
  SubSidebarContent,
  SubSidebarGroup,
  SubSidebarGroupLabel,
  SubSidebarHeader,
  SubSidebarItem,
}
