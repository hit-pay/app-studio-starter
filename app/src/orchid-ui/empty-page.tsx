import type { ComponentProps, ReactNode } from 'react'
import { cva } from 'class-variance-authority'
import { FileTextIcon, SearchIcon, TriangleAlertIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

const emptyPageIconVariants = cva(
  'relative inline-flex items-center justify-center rounded-full border border-solid p-4',
  {
    variants: {
      type: {
        Default: 'border-neutral-soft bg-neutral',
        Search: 'border-neutral-soft bg-neutral',
        Upgrade: 'border-warning-chip-border bg-warning-soft',
      },
    },
    defaultVariants: {
      type: 'Default',
    },
  },
)

const DEFAULT_ICON: Record<'Default' | 'Search' | 'Upgrade', ReactNode> = {
  Default: <FileTextIcon className="size-8 text-muted-foreground" />,
  Search: <SearchIcon className="size-8 text-muted-foreground" />,
  Upgrade: <TriangleAlertIcon className="size-8 text-warning" />,
}

function EmptyPage({
  className,
  type = 'Default',
  title,
  description,
  icon,
  badge,
  actions,
  ...props
}: ComponentProps<'div'> & {
  type?: 'Default' | 'Search' | 'Upgrade'
  title?: ReactNode
  description?: ReactNode
  icon?: ReactNode
  badge?: boolean
  actions?: ReactNode
}) {
  const showBadge = badge ?? type !== 'Upgrade'

  return (
    <div
      data-slot="empty-page"
      data-type={type}
      className={cn('flex w-full flex-col items-center justify-center gap-6', className)}
      {...props}
    >
      <div className={emptyPageIconVariants({ type })}>
        {icon ?? DEFAULT_ICON[type]}
        {showBadge ? (
          <span className="absolute -top-px -right-px inline-flex size-5 items-center justify-center rounded-full border border-solid border-neutral-soft bg-[#9295a5] text-[11px] font-medium leading-none text-white">
            !
          </span>
        ) : null}
      </div>

      {title || description ? (
        <div className="flex w-full flex-col items-center gap-2 text-center">
          {title ? (
            <p className="text-base font-medium leading-[1.4] text-foreground">{title}</p>
          ) : null}
          {description ? (
            <p className="text-sm leading-[1.5] text-muted-foreground">{description}</p>
          ) : null}
        </div>
      ) : null}

      {actions ? (
        <div className="flex flex-wrap items-center justify-center gap-2">{actions}</div>
      ) : null}
    </div>
  )
}

export { EmptyPage }
