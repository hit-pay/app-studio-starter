import type { ComponentProps, ReactNode } from 'react'
import { cva } from 'class-variance-authority'
import { CircleHelpIcon, TriangleIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip'

const overviewItemIconVariants = cva('inline-flex shrink-0 items-center justify-center [&_svg]:size-5', {
  variants: {
    color: {
      Blue: 'text-primary',
      Green: 'text-success-strong',
      Red: 'text-destructive-strong',
      Grey: 'text-muted-foreground',
    },
  },
  defaultVariants: {
    color: 'Grey',
  },
})

function OverviewItem({
  className,
  icon,
  iconColor = 'Grey',
  title,
  tooltip,
  content,
  info = false,
  percentValue,
  percentTooltip,
  footer,
  transparent = false,
  loading = false,
  ...props
}: ComponentProps<'div'> & {
  icon?: ReactNode
  iconColor?: 'Blue' | 'Green' | 'Red' | 'Grey'
  title?: string
  tooltip?: string
  content?: ReactNode
  info?: boolean
  percentValue?: number
  percentTooltip?: string
  footer?: ReactNode
  transparent?: boolean
  loading?: boolean
}) {
  return (
    <div
      data-slot="overview-item"
      className={cn(
        'flex w-full min-w-0 flex-col overflow-hidden rounded-lg bg-background',
        transparent ? 'border border-transparent' : 'border border-solid border-border',
        className,
      )}
      {...props}
    >
      {loading ? (
        <div className="flex flex-col gap-3 py-4">
          <div className="px-5">
            <span className="block h-5 min-w-0 animate-pulse rounded-sm bg-neutral-soft" />
          </div>
          <div className="px-5">
            <span className="block h-5 min-w-0 animate-pulse rounded-sm bg-neutral-soft" />
          </div>
        </div>
      ) : (
        <>
          <div
            className={cn(
              'flex items-center gap-3',
              transparent
                ? 'border-b border-transparent px-3 pt-3 pb-0'
                : 'border-b border-solid border-border px-4 py-3 pr-5',
            )}
          >
            {icon ? (
              <span className={overviewItemIconVariants({ color: iconColor })}>{icon}</span>
            ) : null}
            {title ? (
              <p className="min-w-0 flex-1 truncate text-sm leading-[1.5] text-foreground">{title}</p>
            ) : null}
            {info && tooltip ? (
              <Tooltip>
                <TooltipTrigger
                  className="inline-flex size-4 shrink-0 items-center justify-center text-muted-foreground outline-none"
                  aria-label="Info"
                >
                  <CircleHelpIcon className="size-4" />
                </TooltipTrigger>
                <TooltipContent>{tooltip}</TooltipContent>
              </Tooltip>
            ) : null}
          </div>

          <div
            className={cn(
              'flex min-w-0 items-center gap-2 overflow-hidden text-xl font-medium leading-[1.4] text-foreground',
              transparent ? 'px-3 pt-0 pb-3' : 'px-5 py-4',
            )}
          >
            <div className="min-w-0 flex-1 truncate">{content}</div>
            {percentValue != null ? (
              <PercentBadge value={percentValue} tooltip={percentTooltip} />
            ) : null}
          </div>
        </>
      )}

      {footer && !loading ? (
        <div className="border-t border-solid border-border px-5 py-3 text-xs leading-[1.5] text-muted-foreground">
          {footer}
        </div>
      ) : null}
    </div>
  )
}

function PercentBadge({ value, tooltip }: { value: number; tooltip?: string }) {
  const up = value > 0
  const down = value < 0
  const badge = (
    <span className="inline-flex shrink-0 items-center gap-1 rounded-sm border border-solid border-border px-3 py-2">
      {up || down ? (
        <TriangleIcon
          className={cn(
            'size-2.5 fill-current',
            up && 'text-success-strong',
            down && 'rotate-180 text-destructive-strong',
          )}
        />
      ) : null}
      <span className="text-sm font-medium leading-[1.4] text-muted-foreground">
        {value === 0 ? '-' : `${Math.abs(value)}%`}
      </span>
    </span>
  )

  if (!tooltip) return badge

  return (
    <Tooltip>
      <TooltipTrigger className="inline-flex outline-none" aria-label="Percent change">
        {badge}
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  )
}

export { OverviewItem, overviewItemIconVariants }
