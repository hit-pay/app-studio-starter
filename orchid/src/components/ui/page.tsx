import type { ComponentProps, ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { CopyButton } from '@/components/ui/copy-button'

function Page({ className, ...props }: ComponentProps<'section'>) {
  return (
    <section
      data-slot="page"
      className={cn(
        'flex h-full min-h-0 w-full min-w-0 flex-1 flex-col overflow-hidden px-4 py-5 sm:px-6',
        className,
      )}
      {...props}
    />
  )
}

function PageHeader({
  className,
  title,
  description,
  badge,
  copyValue,
  actions,
  loading = false,
  ...props
}: ComponentProps<'header'> & {
  title: string
  description?: string
  badge?: ReactNode
  copyValue?: string
  actions?: ReactNode
  loading?: boolean
}) {
  return (
    <header
      data-slot="page-header"
      className={cn(
        'flex w-full min-w-0 shrink-0 flex-col items-stretch gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4',
        className,
      )}
      {...props}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          {loading ? (
            <span className="h-6 min-w-0 flex-1 animate-pulse rounded bg-oc-neutral-soft" />
          ) : (
            <h1 className="min-w-0 wrap-break-word text-lg leading-6 font-medium text-oc-foreground">
              {title}
            </h1>
          )}
          {badge && !loading ? badge : null}
        </div>
        {loading ? (
          <span className="h-5 min-w-0 flex-1 animate-pulse rounded bg-oc-neutral-soft" />
        ) : description ? (
          <div className="flex min-w-0 items-center gap-2">
            <p className="min-w-0 wrap-break-word text-sm leading-5 text-oc-muted-foreground">
              {description}
            </p>
            {copyValue ? <CopyButton value={copyValue} /> : null}
          </div>
        ) : null}
      </div>
      {actions && !loading ? (
        <div className="flex flex-wrap items-center justify-end gap-2 sm:shrink-0">{actions}</div>
      ) : null}
    </header>
  )
}

function PageContent({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="page-content"
      className={cn('mt-5 min-h-0 flex-1 overflow-y-auto', className)}
      {...props}
    />
  )
}

export { Page, PageContent, PageHeader }
