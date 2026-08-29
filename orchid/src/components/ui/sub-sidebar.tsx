import type { ComponentProps, ReactNode } from 'react'

import { cn } from '@/lib/utils'

type SubSidebarItemConfig = {
  id: string
  label: ReactNode
  disabled?: boolean
}

function SubSidebar({
  className,
  items,
  activeItem,
  onItemChange,
  ...props
}: ComponentProps<'aside'> & {
  items: SubSidebarItemConfig[]
  activeItem?: string
  onItemChange?: (id: string, item: SubSidebarItemConfig) => void
}) {
  return (
    <aside
      data-slot="sub-sidebar"
      className={cn(
        'flex h-full w-64 shrink-0 flex-col bg-oc-background',
        className,
      )}
      {...props}
    >
      <nav
        data-slot="sub-sidebar-content"
        aria-label="Section navigation"
        className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-3 py-4"
      >
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            data-slot="sub-sidebar-item"
            aria-current={item.id === activeItem ? 'page' : undefined}
            disabled={item.disabled}
            className={cn(
              'flex min-h-9 w-full min-w-0 cursor-pointer items-center rounded-lg px-3 py-2 text-left text-sm text-oc-foreground outline-none transition-colors',
              'hover:bg-oc-neutral-soft focus-visible:ring-2 focus-visible:ring-oc-ring',
              'disabled:pointer-events-none disabled:opacity-50',
              item.id === activeItem &&
                'bg-oc-neutral-soft font-medium text-oc-primary hover:bg-oc-neutral-soft',
            )}
            onClick={() => onItemChange?.(item.id, item)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}

export { SubSidebar }
export type { SubSidebarItemConfig }
