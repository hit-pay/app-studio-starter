import type { ReactNode } from 'react'
import { Radio as RadioPrimitive } from '@base-ui/react/radio'
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group'
import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const choiceCardGroupVariants = cva('flex w-auto min-w-0 max-w-full', {
  variants: {
    alignment: {
      vertical: 'flex-col gap-3',
      horizontal: 'flex-row flex-wrap items-stretch gap-3',
    },
  },
  defaultVariants: {
    alignment: 'vertical',
  },
})

function ChoiceCardGroup({
  className,
  alignment = 'vertical',
  ...props
}: RadioGroupPrimitive.Props & {
  alignment?: 'vertical' | 'horizontal'
}) {
  return (
    <RadioGroupPrimitive
      data-slot="choice-card-group"
      data-alignment={alignment}
      className={cn(choiceCardGroupVariants({ alignment }), className)}
      {...props}
    />
  )
}

const choiceCardVariants = cva(
  [
    'group/choice-card flex min-w-0 cursor-pointer gap-3 rounded-lg border border-solid border-oc-border bg-oc-background px-5 py-3 outline-none',
    'hover:shadow-[0_3px_11px_rgba(38,42,50,0.09)]',
    'data-checked:border-oc-primary',
    'data-disabled:pointer-events-none data-disabled:opacity-50',
  ],
  {
    variants: {
      alignment: {
        left: 'items-center text-left',
        center: 'items-center text-center',
      },
      iconAlign: {
        left: 'flex-row',
        center: 'flex-col',
      },
    },
    defaultVariants: {
      alignment: 'left',
      iconAlign: 'left',
    },
  },
)

function ChoiceCard({
  className,
  title,
  description,
  icon,
  alignment = 'left',
  iconAlign = 'left',
  children,
  ...props
}: RadioPrimitive.Root.Props & {
  title?: string
  description?: string
  icon?: ReactNode
  alignment?: 'left' | 'center'
  iconAlign?: 'left' | 'center'
}) {
  return (
    <RadioPrimitive.Root
      data-slot="choice-card"
      data-alignment={alignment}
      data-icon-align={iconAlign}
      className={cn(choiceCardVariants({ alignment, iconAlign }), className)}
      {...props}
    >
      <RadioPrimitive.Indicator className="sr-only" />
      {icon ? (
        <span className="inline-flex size-5 shrink-0 items-center justify-center text-oc-foreground [&_svg]:size-5">
          {icon}
        </span>
      ) : null}
      {children ?? (
        <span
          className={cn(
            'flex min-w-0 flex-col gap-0.5',
            alignment === 'center' ? 'items-center' : 'items-start',
            iconAlign === 'left' && 'flex-1',
          )}
        >
          {title ? (
            <span className="text-sm font-medium leading-[1.5] text-oc-foreground">{title}</span>
          ) : null}
          {description ? (
            <span className="text-xs leading-[1.5] text-oc-muted-foreground">{description}</span>
          ) : null}
        </span>
      )}
    </RadioPrimitive.Root>
  )
}

export { ChoiceCard, ChoiceCardGroup }
