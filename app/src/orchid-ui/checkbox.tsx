import type { ReactNode } from 'react'
import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox'
import { CheckboxGroup as CheckboxGroupPrimitive } from '@base-ui/react/checkbox-group'
import { cva } from 'class-variance-authority'
import { CheckIcon, MinusIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

const checkboxGroupVariants = cva('flex', {
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

function CheckboxGroup({
  className,
  alignment = 'Vertical',
  label,
  ...props
}: CheckboxGroupPrimitive.Props & {
  alignment?: 'Vertical' | 'Horizontal'
  label?: ReactNode
}) {
  return (
    <div className="flex w-full flex-col items-start gap-2">
      {label ? (
        <p className="text-xs font-medium leading-[1.5] text-muted-foreground">{label}</p>
      ) : null}
      <CheckboxGroupPrimitive
        data-slot="checkbox-group"
        data-alignment={alignment}
        className={cn(checkboxGroupVariants({ alignment }), className)}
        {...props}
      />
    </div>
  )
}

const checkboxControlVariants = cva(
  [
    'inline-flex size-4 shrink-0 items-center justify-center rounded border border-solid outline-none',
    'shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1.5px_1.5px_rgba(0,0,0,0.09)]',
    'bg-background border-border text-primary-foreground',
    'hover:border-primary hover:shadow-[0_0_0_3px_var(--info-border)]',
    'data-checked:border-primary data-checked:bg-primary data-checked:hover:shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1.5px_1.5px_rgba(0,0,0,0.09)]',
    'data-indeterminate:border-primary data-indeterminate:bg-info-soft data-indeterminate:text-primary',
    'data-disabled:pointer-events-none data-disabled:border-border data-disabled:bg-dark-blue-soft data-disabled:text-primary-foreground data-disabled:shadow-none',
    'data-disabled:data-checked:border-dark-blue-border data-disabled:data-checked:bg-dark-blue-border',
    'data-[error=true]:border-destructive data-[error=true]:shadow-[0_0_0_3px_var(--destructive-border)]',
  ].join(' '),
)

function Checkbox({
  className,
  children,
  description,
  error = false,
  value,
  ...props
}: CheckboxPrimitive.Root.Props & {
  description?: ReactNode
  error?: boolean
  value?: string
}) {
  return (
    <label
      className={cn(
        'inline-flex items-start gap-2 text-xs leading-[1.5] text-foreground',
        'has-data-disabled:text-[#9295a5]',
        className,
      )}
    >
      <CheckboxPrimitive.Root
        data-slot="checkbox"
        data-error={error || undefined}
        name={value}
        className={checkboxControlVariants()}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center">
          {props.indeterminate ? (
            <MinusIcon className="size-2.5" />
          ) : (
            <CheckIcon className="size-2.5" />
          )}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {children || description ? (
        <span className="flex min-w-0 flex-col gap-0.5">
          {children ? <span>{children}</span> : null}
          {description ? (
            <span className="text-xs leading-[1.5] text-muted-foreground">{description}</span>
          ) : null}
        </span>
      ) : null}
    </label>
  )
}

export { Checkbox, CheckboxGroup }
