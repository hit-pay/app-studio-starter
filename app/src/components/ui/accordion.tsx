import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion'
import { ChevronDownIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn('flex w-full flex-col gap-2', className)}
      {...props}
    />
  )
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        'group/accordion-item overflow-clip rounded-lg border border-transparent bg-oc-dark-blue-soft hover:border-oc-border data-open:border-oc-border data-open:bg-oc-background',
        className,
      )}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="m-0 flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'group/accordion-trigger flex w-full cursor-pointer items-center gap-2 bg-oc-dark-blue-soft px-3 py-2 text-left text-[14px] leading-normal font-medium text-oc-foreground outline-none focus-visible:ring-3 focus-visible:ring-oc-primary/20 aria-disabled:pointer-events-none aria-disabled:opacity-50',
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon
          data-slot="accordion-trigger-icon"
          className="ml-auto size-4 shrink-0 text-oc-foreground transition-transform group-data-open/accordion-item:rotate-180"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="overflow-hidden text-sm data-closed:animate-accordion-up data-open:animate-accordion-down"
      {...props}
    >
      <div
        className={cn(
          'h-(--accordion-panel-height) border-t border-oc-border p-3 text-[14px] leading-normal text-oc-foreground data-ending-style:h-0 data-starting-style:h-0',
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
