import type { ComponentProps, ReactNode } from 'react'
import { cva } from 'class-variance-authority'
import { FileTextIcon, SearchIcon, TriangleAlertIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

const emptyIconVariants = cva(
  'relative inline-flex items-center justify-center rounded-full border border-solid p-4',
  {
    variants: {
      variant: {
        Default: 'border-oc-neutral-soft bg-oc-neutral',
        Search: 'border-oc-neutral-soft bg-oc-neutral',
        Upgrade: 'border-oc-warning-chip-border bg-oc-warning-soft',
      },
    },
    defaultVariants: {
      variant: 'Default',
    },
  },
)

const DEFAULT_ICON: Record<'Default' | 'Search' | 'Upgrade', ReactNode> = {
  Default: <FileTextIcon className="size-8 text-oc-muted-foreground" />,
  Search: <SearchIcon className="size-8 text-oc-muted-foreground" />,
  Upgrade: <TriangleAlertIcon className="size-8 text-oc-warning" />,
}

function Empty({
  className,
  variant = 'Default',
  title,
  description,
  icon,
  badge,
  actions,
  ...props
}: ComponentProps<'div'> & {
  variant?: 'Default' | 'Search' | 'Upgrade'
  title?: ReactNode
  description?: ReactNode
  icon?: ReactNode
  badge?: boolean
  actions?: ReactNode
}) {
  const showBadge = badge ?? variant !== 'Upgrade'

  return (
    <div
      data-slot="empty"
      data-variant={variant}
      className={cn('flex w-full flex-col items-center justify-center gap-6', className)}
      {...props}
    >
      <div className={emptyIconVariants({ variant })}>
        {icon ?? DEFAULT_ICON[variant]}
        {showBadge ? (
          <span className="absolute -top-px -right-px inline-flex size-5 items-center justify-center rounded-full border border-solid border-oc-neutral-soft bg-oc-muted-foreground text-[11px] font-medium leading-none text-white">
            !
          </span>
        ) : null}
      </div>

      {title || description ? (
        <div className="flex w-full flex-col items-center gap-2 text-center">
          {title ? (
            <p className="text-base font-medium leading-[1.4] text-oc-foreground">{title}</p>
          ) : null}
          {description ? (
            <p className="text-sm leading-[1.5] text-oc-muted-foreground">{description}</p>
          ) : null}
        </div>
      ) : null}

      {actions ? (
        <div className="flex flex-wrap items-center justify-center gap-2">{actions}</div>
      ) : null}
    </div>
  )
}

export { Empty }
