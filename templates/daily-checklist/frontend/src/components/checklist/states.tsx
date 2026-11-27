import type { ReactNode } from 'react'

import { Button } from '@ui/button'
import { Skeleton } from '@ui/skeleton'

/** Placeholder rows while a list loads. */
export function LoadingRows({ rows = 3 }: { rows?: number }) {
  return (
    <div className="flex flex-col gap-3" aria-busy="true">
      {Array.from({ length: rows }, (_, index) => (
        <Skeleton key={index} className="h-16 w-full rounded-xl" />
      ))}
    </div>
  )
}

/** A request that failed, with its message and a way to try again. */
export function ErrorState({ error, onRetry }: { error: Error; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-xl border border-oc-destructive-border p-4">
      <p className="text-sm text-oc-destructive">{error.message}</p>
      {onRetry ? (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </div>
  )
}

export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-2 rounded-xl border border-dashed border-oc-border p-6">
      <p className="text-sm font-medium text-oc-foreground">{title}</p>
      {children ? <div className="text-sm text-oc-muted-foreground">{children}</div> : null}
    </div>
  )
}

/** Shown in place of a feature whose integration the owner has not allowed yet. */
export function WaitingForAccess({ integration, purpose }: { integration: string; purpose: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-oc-border bg-oc-muted p-4">
      <p className="text-sm font-medium text-oc-foreground">Waiting for access to {integration}</p>
      <p className="text-sm text-oc-muted-foreground">
        {purpose} The business owner can allow {integration} for this app in App Studio.
      </p>
    </div>
  )
}
