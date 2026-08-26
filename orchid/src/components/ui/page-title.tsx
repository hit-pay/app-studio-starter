import type { ComponentProps, ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { CopyTooltip } from './copy-tooltip'

function PageTitle({
  className,
  title,
  description,
  chip,
  copyValue,
  actions,
  loading = false,
  ...props
}: ComponentProps<'div'> & {
  title: string
  description?: string
  chip?: ReactNode
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
            <span className="h-6 min-w-0 flex-1 animate-pulse rounded bg-neutral-soft" />
          ) : (
            <h1 className="min-w-0 text-[18px] font-medium leading-6 text-foreground">{title}</h1>
          )}
          {chip && !loading ? chip : null}
        </div>
        {loading ? (
          <span className="h-5 min-w-0 flex-1 animate-pulse rounded bg-neutral-soft" />
        ) : description ? (
          <div className="flex min-w-0 items-center gap-2">
            <p className="min-w-0 text-[14px] leading-5 text-muted-foreground">{description}</p>
            {copyValue ? <CopyTooltip value={copyValue} /> : null}
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
