import { Switch as SwitchPrimitive } from '@base-ui/react/switch'
import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const toggleVariants = cva(
  [
    'group/toggle relative inline-flex shrink-0 items-center rounded-full border border-solid border-transparent outline-none',
    'bg-neutral-border',
    'hover:shadow-[0_0_0_3px_var(--info-border)]',
    'data-checked:bg-primary data-checked:hover:shadow-none',
    'data-disabled:pointer-events-none data-disabled:opacity-50 data-disabled:shadow-none',
  ].join(' '),
  {
    variants: {
      size: {
        Default: 'h-6 w-[42px] p-0.5',
        Small: 'h-[15px] w-[26px] p-px',
      },
    },
    defaultVariants: {
      size: 'Default',
    },
  },
)

const toggleThumbVariants = cva(
  'block rounded-full bg-background shadow-[0_1px_2px_rgba(0,0,0,0.16)] transition-transform',
  {
    variants: {
      size: {
        Default: 'size-5 group-data-checked/toggle:translate-x-[18px]',
        Small: 'size-3 group-data-checked/toggle:translate-x-[11px]',
      },
    },
    defaultVariants: {
      size: 'Default',
    },
  },
)

function Toggle({
  className,
  size = 'Default',
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: 'Default' | 'Small'
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="toggle"
      data-size={size}
      className={cn(toggleVariants({ size }), className)}
      {...props}
    >
      <SwitchPrimitive.Thumb className={toggleThumbVariants({ size })} />
    </SwitchPrimitive.Root>
  )
}

export { Toggle }
