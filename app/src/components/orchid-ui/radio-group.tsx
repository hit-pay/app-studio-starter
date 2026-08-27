import type { ReactNode } from 'react'
import { Radio as RadioPrimitive } from '@base-ui/react/radio'
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group'
import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const radioGroupVariants = cva('flex', {
  variants: {
    alignment: {
      Vertical: 'flex-col gap-2',
      Horizontal: 'flex-row flex-wrap items-center gap-4',
    },
  },
  defaultVariants: {
    alignment: 'Vertical',
  },
})

function RadioGroup({
  className,
  alignment = 'Vertical',
  label,
  ...props
}: RadioGroupPrimitive.Props & {
  alignment?: 'Vertical' | 'Horizontal'
  label?: ReactNode
}) {
  return (
    <div className="flex w-full flex-col items-start gap-2">
      {label ? (
        <p className="text-xs font-medium leading-[1.5] text-oc-muted-foreground">{label}</p>
      ) : null}
      <RadioGroupPrimitive
        data-slot="radio-group"
        data-alignment={alignment}
        className={cn(radioGroupVariants({ alignment }), className)}
        {...props}
      />
    </div>
  )
}

const radioControlVariants = cva(
  [
    'inline-flex size-4 shrink-0 items-center justify-center rounded-full border border-solid outline-none',
    'shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1.5px_1.5px_rgba(0,0,0,0.09)]',
    'bg-oc-background border-oc-border',
    'hover:border-oc-primary hover:shadow-[0_0_0_3px_var(--oc-info-border)]',
    'data-checked:border-oc-primary data-checked:hover:shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1.5px_1.5px_rgba(0,0,0,0.09)]',
    'data-disabled:pointer-events-none data-disabled:border-oc-border data-disabled:bg-oc-dark-blue-soft data-disabled:shadow-none',
    'data-disabled:data-checked:border-oc-dark-blue-border',
    'data-[error=true]:border-oc-destructive data-[error=true]:shadow-[0_0_0_3px_var(--oc-destructive-border)]',
  ].join(' '),
)

function Radio({
  className,
  children,
  description,
  error = false,
  ...props
}: RadioPrimitive.Root.Props & {
  description?: ReactNode
  error?: boolean
}) {
  return (
    <label
      className={cn(
        'inline-flex items-start gap-2 text-xs leading-[1.5] text-oc-foreground',
        'has-data-disabled:text-oc-muted-foreground',
        className,
      )}
    >
      <RadioPrimitive.Root
        data-slot="radio"
        data-error={error || undefined}
        className={radioControlVariants()}
        {...props}
      >
        <RadioPrimitive.Indicator className="size-2 rounded-full bg-oc-primary data-disabled:bg-oc-dark-blue-border" />
      </RadioPrimitive.Root>
      {children || description ? (
        <span className="flex min-w-0 flex-col gap-0.5">
          {children ? <span>{children}</span> : null}
          {description ? (
            <span className="text-xs leading-[1.5] text-oc-muted-foreground">{description}</span>
          ) : null}
        </span>
      ) : null}
    </label>
  )
}

export { Radio, RadioGroup }
