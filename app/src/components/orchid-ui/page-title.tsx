import type { ComponentProps, ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { CopyButton } from './copy-button'

function PageTitle({
  className,
  title,
  description,
  badge,
  copyValue,
  actions,
  loading = false,
  ...props
}: ComponentProps<'div'> & {
  title: string
  description?: string
  badge?: ReactNode
  copyValue?: string
  actions?: ReactNode
  loading?: boolean
}) {
  return (
    <div
      data-slot="page-title"
      className={cn('flex w-full min-w-0 items-start justify-between gap-4', className)}
      {...props}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          {loading ? (
            <span className="h-6 min-w-0 flex-1 animate-pulse rounded bg-oc-neutral-soft" />
          ) : (
            <h1 className="min-w-0 text-[18px] font-medium leading-6 text-oc-foreground">{title}</h1>
          )}
          {badge && !loading ? badge : null}
        </div>
        {loading ? (
          <span className="h-5 min-w-0 flex-1 animate-pulse rounded bg-oc-neutral-soft" />
        ) : description ? (
          <div className="flex min-w-0 items-center gap-2">
            <p className="min-w-0 text-[14px] leading-5 text-oc-muted-foreground">{description}</p>
            {copyValue ? <CopyButton value={copyValue} /> : null}
          </div>
        ) : null}
      </div>
      {actions && !loading ? (
        <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">{actions}</div>
      ) : null}
    </div>
  )
}

export { PageTitle }
