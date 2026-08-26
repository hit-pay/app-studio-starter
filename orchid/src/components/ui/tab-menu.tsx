import { createContext, useContext, type ReactNode } from 'react'
import { Tabs as TabsPrimitive } from '@base-ui/react/tabs'
import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

type TabMenuType = 'Default' | 'Pills'
type TabMenuSize = 'Default' | 'Big'

const TabMenuContext = createContext<{ type: TabMenuType; size: TabMenuSize }>({
  type: 'Default',
  size: 'Default',
})

const tabMenuListVariants = cva('relative flex min-w-0 items-stretch', {
  variants: {
    type: {
      Default: 'w-full gap-0 border-b border-solid border-border',
      Pills: 'w-fit gap-1 rounded-lg bg-dark-blue-soft p-1',
    },
  },
  defaultVariants: {
    type: 'Default',
  },
})

const tabMenuTabVariants = cva(
  'inline-flex min-w-0 shrink-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap outline-none select-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      type: {
        Default:
          'rounded-none text-muted-foreground hover:text-foreground data-active:text-foreground',
        Pills:
          'rounded-md text-muted-foreground hover:text-foreground data-active:bg-background data-active:text-foreground data-active:shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1.5px_1.5px_rgba(0,0,0,0.09)]',
      },
      size: {
        Default: 'px-3 py-2 text-sm leading-[1.5] font-medium',
        Big: 'px-4 py-2.5 text-base leading-[1.4] font-medium',
      },
    },
    defaultVariants: {
      type: 'Default',
      size: 'Default',
    },
  },
)

function TabMenu({
  className,
  type = 'Default',
  size = 'Default',
  ...props
}: TabsPrimitive.Root.Props & {
  type?: TabMenuType
  size?: TabMenuSize
}) {
  return (
    <TabMenuContext.Provider value={{ type, size }}>
      <TabsPrimitive.Root
        data-slot="tab-menu"
        data-type={type}
        data-size={size}
        className={cn('flex w-full flex-col gap-4', className)}
        {...props}
      />
    </TabMenuContext.Provider>
  )
}

function TabMenuList({ className, children, ...props }: TabsPrimitive.List.Props) {
  const { type } = useContext(TabMenuContext)

  return (
    <TabsPrimitive.List
      data-slot="tab-menu-list"
      className={cn(tabMenuListVariants({ type }), className)}
      {...props}
    >
      {children}
      {type === 'Default' ? (
        <TabsPrimitive.Indicator
          data-slot="tab-menu-indicator"
          className="pointer-events-none absolute bottom-0 left-0 z-10 h-0.5 bg-primary transition-[translate,width] duration-200"
          style={{
            width: 'var(--active-tab-width)',
            translate: 'var(--active-tab-left) 0',
          }}
        />
      ) : null}
    </TabsPrimitive.List>
  )
}

function TabMenuTab({
  className,
  count,
  icon,
  children,
  ...props
}: TabsPrimitive.Tab.Props & {
  count?: number
  icon?: ReactNode
}) {
  const { type, size } = useContext(TabMenuContext)

  return (
    <TabsPrimitive.Tab
      data-slot="tab-menu-tab"
      className={cn(tabMenuTabVariants({ type, size }), className)}
      {...props}
    >
      {icon ? (
        <span className="inline-flex size-4 shrink-0 [&_svg]:size-4">{icon}</span>
      ) : null}
      {children}
      {count != null ? (
        <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-neutral-soft px-1.5 text-xs font-medium leading-[1.5] text-muted-foreground">
          {count}
        </span>
      ) : null}
    </TabsPrimitive.Tab>
  )
}

function TabMenuPanel({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tab-menu-panel"
      className={cn('w-full text-sm leading-[1.5] text-foreground outline-none', className)}
      {...props}
    />
  )
}

export { TabMenu, TabMenuList, TabMenuTab, TabMenuPanel }
