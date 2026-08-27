import type { ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const progressTrackVariants = cva('relative min-w-0 flex-1 overflow-clip rounded-full bg-oc-neutral-soft', {
  variants: {
    size: {
      Default: 'h-2',
      Small: 'h-[5px]',
    },
  },
  defaultVariants: {
    size: 'Default',
  },
})

const progressLabelVariants = cva('shrink-0 whitespace-nowrap leading-[1.5]', {
  variants: {
    size: {
      Default: 'text-sm',
      Small: 'text-xs',
    },
  },
  defaultVariants: {
    size: 'Default',
  },
})

function Progress({
  className,
  size = 'Default',
  value = 0,
  max = 100,
  showLabel = true,
  ...props
}: Omit<ComponentProps<'div'>, 'role'> &
  VariantProps<typeof progressTrackVariants> & {
    value?: number
    max?: number
    showLabel?: boolean
  }) {
  const safeMax = max <= 0 ? 1 : max
  const clamped = Math.min(safeMax, Math.max(0, value))
  const percent = (clamped / safeMax) * 100

  return (
    <div
      data-slot="progress"
      data-size={size}
      className={cn('flex w-full items-center gap-1', className)}
      {...props}
    >
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuenow={clamped}
        className={progressTrackVariants({ size })}
      >
        <div
          data-slot="progress-current"
          className="absolute inset-y-0 left-0 rounded-full bg-oc-primary"
          style={{ width: `${percent}%` }}
        />
      </div>
      {showLabel ? (
        <p className={progressLabelVariants({ size })}>
          <span className="font-medium text-oc-foreground">{clamped}</span>
          <span className="text-oc-muted-foreground">/{safeMax}</span>
        </p>
      ) : null}
    </div>
  )
}

export { Progress, progressTrackVariants }
