import type { ReactNode } from 'react'
import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion'
import { ChevronDownIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function Accordion({
  className,
  multiple = true,
  ...props
}: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn('flex w-full flex-col gap-2', className)}
      multiple={multiple}
      {...props}
    />
  )
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        'group/accordion-item overflow-clip rounded-lg border border-transparent bg-dark-blue-soft hover:border-border data-open:border-border data-open:bg-background',
        className,
      )}
      {...props}
    />
  )
}

function AccordionHeader({ className, ...props }: AccordionPrimitive.Header.Props) {
  return (
    <AccordionPrimitive.Header
      data-slot="accordion-header"
      className={cn('m-0', className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  title,
  description,
  leading,
  label,
  progress,
  trailing,
  chevron = true,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props & {
  title?: string
  description?: string
  leading?: ReactNode
  label?: ReactNode
  progress?: { label: string; value: number }
  trailing?: ReactNode
  chevron?: boolean
}) {
  return (
    <AccordionHeader>
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'group/accordion-trigger flex w-full cursor-pointer items-center gap-2 bg-dark-blue-soft px-3 py-2 text-left outline-none',
          className,
        )}
        {...props}
      >
        {children ?? (
          <>
            {leading ? (
              <span className="inline-flex size-5 shrink-0 items-center justify-center overflow-clip [&_svg]:size-5">
                {leading}
              </span>
            ) : null}
            <span className="flex min-w-0 flex-1 flex-col items-start gap-1">
              <span className="flex min-w-0 items-center gap-2">
                {title ? (
                  <span className="truncate text-[14px] font-medium leading-[1.5] text-foreground">
                    {title}
                  </span>
                ) : null}
                {label}
              </span>
              {description ? (
                <span className="w-full truncate text-[12px] leading-[1.5] text-muted-foreground">
                  {description}
                </span>
              ) : null}
            </span>
            {progress ? (
              <span className="flex min-w-0 flex-1 items-center gap-2">
                <span className="shrink-0 text-[12px] leading-[1.5] whitespace-nowrap text-muted-foreground">
                  {progress.label}
                </span>
                <span className="relative h-2 min-w-0 flex-1 overflow-clip rounded-full bg-background">
                  <span
                    className="absolute inset-y-0 left-0 rounded-full bg-primary"
                    style={{ width: `${Math.min(100, Math.max(0, progress.value * 100))}%` }}
                  />
                </span>
              </span>
            ) : null}
            {trailing ? (
              <span
                className="shrink-0"
                onClick={(event) => event.stopPropagation()}
                onKeyDown={(event) => event.stopPropagation()}
              >
                {trailing}
              </span>
            ) : null}
            {chevron ? (
              <ChevronDownIcon className="size-4 shrink-0 text-foreground transition-transform group-data-open/accordion-item:rotate-180" />
            ) : null}
          </>
        )}
      </AccordionPrimitive.Trigger>
    </AccordionHeader>
  )
}

function AccordionPanel({ className, ...props }: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-panel"
      className={cn(
        'border-t border-border p-3 text-[14px] leading-[1.5] text-foreground',
        className,
      )}
      {...props}
    />
  )
}

export { Accordion, AccordionItem, AccordionHeader, AccordionTrigger, AccordionPanel }
