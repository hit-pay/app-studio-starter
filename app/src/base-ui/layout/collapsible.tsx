'use client'

import { Collapsible as CollapsiblePrimitive } from '@base-ui/react/collapsible'

import { cn } from '@/lib/utils'

/**
 * One open/close panel. For several sections use Accordion.
 */
function Collapsible({ className, ...props }: CollapsiblePrimitive.Root.Props) {
  return (
    <CollapsiblePrimitive.Root
      data-slot="collapsible"
      className={cn('group/collapsible flex w-full min-w-0 flex-col', className)}
      {...props}
    />
  )
}

function CollapsibleTrigger({
  className,
  ...props
}: CollapsiblePrimitive.Trigger.Props) {
  return (
    <CollapsiblePrimitive.Trigger
      data-slot="collapsible-trigger"
      className={cn(
        'flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg bg-oc-dark-blue-soft px-3 py-2 text-left text-sm leading-normal font-medium text-oc-foreground outline-none hover:bg-oc-dark-blue-soft/80',
        className,
      )}
      {...props}
    />
  )
}

function CollapsibleContent({ className, ...props }: CollapsiblePrimitive.Panel.Props) {
  return (
    <CollapsiblePrimitive.Panel
      data-slot="collapsible-content"
      className={cn(
        'overflow-hidden pt-3 text-sm leading-normal text-oc-foreground',
        'data-open:overflow-visible data-starting-style:overflow-hidden data-ending-style:overflow-hidden',
        className,
      )}
      {...props}
    />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
