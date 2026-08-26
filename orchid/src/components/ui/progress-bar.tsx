import type { ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const progressBarTrackVariants = cva('relative min-w-0 flex-1 overflow-clip rounded-full bg-neutral-soft', {
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

const progressBarLabelVariants = cva('shrink-0 whitespace-nowrap leading-[1.5]', {
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

function ProgressBar({
  className,
  size = 'Default',
  value = 0,
  max = 100,
  showLabel = true,
  ...props
}: Omit<ComponentProps<'div'>, 'role'> &
  VariantProps<typeof progressBarTrackVariants> & {
    value?: number
    max?: number
    showLabel?: boolean
  }) {
  const safeMax = max <= 0 ? 1 : max
  const clamped = Math.min(safeMax, Math.max(0, value))
  const percent = (clamped / safeMax) * 100

  return (
    <div
      data-slot="progress-bar"
      data-size={size}
      className={cn('flex w-full items-center gap-1', className)}
      {...props}
    >
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuenow={clamped}
        className={progressBarTrackVariants({ size })}
      >
        <div
          data-slot="progress-bar-current"
          className="absolute inset-y-0 left-0 rounded-full bg-primary"
          style={{ width: `${percent}%` }}
        />
      </div>
      {showLabel ? (
        <p className={progressBarLabelVariants({ size })}>
          <span className="font-medium text-foreground">{clamped}</span>
          <span className="text-muted-foreground">/{safeMax}</span>
        </p>
      ) : null}
    </div>
  )
}

export { ProgressBar, progressBarTrackVariants }
