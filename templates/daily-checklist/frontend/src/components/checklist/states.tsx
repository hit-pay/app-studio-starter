import { InformationRegular, WarningRegular } from '@mingcute/react/core-regular'

import { Banner, BannerAction, BannerDescription, BannerTitle } from '@ui/banner'
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
export function ErrorBanner({ error, onRetry }: { error: Error; onRetry?: () => void }) {
  return (
    <Banner variant="destructive">
      <WarningRegular />
      <BannerTitle>Something went wrong</BannerTitle>
      <BannerDescription>{error.message}</BannerDescription>
      {onRetry ? (
        <BannerAction>
          <Button variant="outline" size="sm" onClick={onRetry}>
            Try again
          </Button>
        </BannerAction>
      ) : null}
    </Banner>
  )
}

/** Shown in place of a feature whose integration the owner has not allowed yet. */
export function WaitingForAccess({ integration, purpose }: { integration: string; purpose: string }) {
  return (
    <Banner>
      <InformationRegular />
      <BannerTitle>Waiting for access to {integration}</BannerTitle>
      <BannerDescription>
        {purpose} The business owner can allow {integration} for this app in App Studio.
      </BannerDescription>
    </Banner>
  )
}
