import { Radio as RadioPrimitive } from '@base-ui/react/radio'
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group'

import { cn } from '@/lib/utils'

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn('grid w-auto min-w-0 max-w-full gap-2', className)}
      {...props}
    />
  )
}

function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(
        'group/radio-group-item peer relative flex aspect-square size-4 shrink-0 rounded-full border border-oc-border bg-oc-background outline-none after:absolute after:-inset-x-3 after:-inset-y-2',
        'shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1.5px_1.5px_rgba(0,0,0,0.09)]',
        'hover:border-oc-primary hover:shadow-[0_0_0_3px_var(--oc-info-border)] focus-visible:border-oc-primary focus-visible:ring-3 focus-visible:ring-oc-info-border/50',
        'data-checked:border-oc-primary data-checked:bg-oc-primary data-checked:text-oc-primary-foreground data-checked:hover:shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1.5px_1.5px_rgba(0,0,0,0.09)]',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-oc-border disabled:bg-oc-dark-blue-soft disabled:opacity-50 disabled:shadow-none',
        'aria-invalid:border-oc-destructive aria-invalid:ring-3 aria-invalid:ring-oc-destructive-border/50',
        className,
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex size-4 items-center justify-center"
      >
        <span className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-oc-primary-foreground" />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  )
}

export { RadioGroup, RadioGroupItem }
