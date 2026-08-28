import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

function Kbd({ className, ...props }: ComponentProps<'kbd'>) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        'inline-flex min-h-5 min-w-5 items-center justify-center rounded border border-solid border-oc-border bg-oc-background px-1.5 py-0.5 font-sans text-xs font-medium leading-[1.5] text-oc-muted-foreground',
        className,
      )}
      {...props}
    />
  )
}

function KbdGroup({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="kbd-group"
      className={cn('inline-flex items-center gap-1', className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup }
