import { createContext, useContext, type ReactNode } from 'react'
import { Tabs as TabsPrimitive } from '@base-ui/react/tabs'
import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

type TabsVariant = 'Default' | 'Pills'
type TabsSize = 'Default' | 'Big'

const TabsContext = createContext<{ variant: TabsVariant; size: TabsSize }>({
  variant: 'Default',
  size: 'Default',
})

const tabsListVariants = cva('relative flex min-w-0 items-stretch', {
  variants: {
    variant: {
      Default: 'w-full gap-0 border-b border-solid border-oc-border',
      Pills: 'w-fit gap-1 rounded-lg bg-oc-dark-blue-soft p-1',
    },
  },
  defaultVariants: {
    variant: 'Default',
  },
})

const tabsTabVariants = cva(
  'inline-flex min-w-0 shrink-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap outline-none select-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        Default:
          'rounded-none text-oc-muted-foreground hover:text-oc-foreground data-active:text-oc-foreground',
        Pills:
          'rounded-md text-oc-muted-foreground hover:text-oc-foreground data-active:bg-oc-background data-active:text-oc-foreground data-active:shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1.5px_1.5px_rgba(0,0,0,0.09)]',
      },
      size: {
        Default: 'px-3 py-2 text-sm leading-[1.5] font-medium',
        Big: 'px-4 py-2.5 text-base leading-[1.4] font-medium',
      },
    },
    defaultVariants: {
      variant: 'Default',
      size: 'Default',
    },
  },
)

function Tabs({
  className,
  variant = 'Default',
  size = 'Default',
  ...props
}: TabsPrimitive.Root.Props & {
  variant?: TabsVariant
  size?: TabsSize
}) {
  return (
    <TabsContext.Provider value={{ variant, size }}>
      <TabsPrimitive.Root
        data-slot="tabs"
        data-variant={variant}
        data-size={size}
        className={cn('flex w-full flex-col gap-4', className)}
        {...props}
      />
    </TabsContext.Provider>
  )
}

function TabsList({ className, children, ...props }: TabsPrimitive.List.Props) {
  const { variant } = useContext(TabsContext)

  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    >
      {children}
      {variant === 'Default' ? (
        <TabsPrimitive.Indicator
          data-slot="tabs-indicator"
          className="pointer-events-none absolute bottom-0 left-0 z-10 h-0.5 bg-oc-primary transition-[translate,width] duration-200"
          style={{
            width: 'var(--active-tab-width)',
            translate: 'var(--active-tab-left) 0',
          }}
        />
      ) : null}
    </TabsPrimitive.List>
  )
}

function TabsTrigger({
  className,
  count,
  icon,
  children,
  ...props
}: TabsPrimitive.Tab.Props & {
  count?: number
  icon?: ReactNode
}) {
  const { variant, size } = useContext(TabsContext)

  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(tabsTabVariants({ variant, size }), className)}
      {...props}
    >
      {icon ? (
        <span className="inline-flex size-4 shrink-0 [&_svg]:size-4">{icon}</span>
      ) : null}
      {children}
      {count != null ? (
        <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-oc-neutral-soft px-1.5 text-xs font-medium leading-[1.5] text-oc-muted-foreground">
          {count}
        </span>
      ) : null}
    </TabsPrimitive.Tab>
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn('w-full text-sm leading-[1.5] text-oc-foreground outline-none', className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
