'use client'

import { Switch as SwitchPrimitive } from '@base-ui/react/switch'

import { cn } from '@/lib/utils'

function Switch({
  className,
  size = 'default',
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: 'sm' | 'default'
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        'peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent bg-oc-neutral-border outline-none transition-all after:absolute after:-inset-x-3 after:-inset-y-2',
        'hover:shadow-[0_0_0_3px_var(--oc-info-border)] focus-visible:border-oc-primary focus-visible:ring-3 focus-visible:ring-oc-info-border/50',
        'data-checked:bg-oc-primary data-checked:hover:shadow-none data-disabled:cursor-not-allowed data-disabled:opacity-50 data-disabled:shadow-none',
        'aria-invalid:border-oc-destructive aria-invalid:ring-3 aria-invalid:ring-oc-destructive-border/50',
        size === 'sm' ? 'h-3.75 w-6.5 p-px' : 'h-6 w-10.5 p-0.5',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'pointer-events-none block rounded-full bg-oc-background shadow-[0_1px_2px_rgba(0,0,0,0.16)] transition-transform',
          size === 'sm'
            ? 'size-3 group-data-checked/switch:translate-x-2.75'
            : 'size-5 group-data-checked/switch:translate-x-4.5',
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
