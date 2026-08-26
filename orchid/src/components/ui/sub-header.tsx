import type { ComponentProps, ReactNode } from 'react'
import { ChevronLeftIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function KeyboardHint({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center justify-center rounded border border-solid border-border bg-background px-2 py-0.5 text-xs font-medium leading-[1.5] text-[#9295a5]">
      {children}
    </span>
  )
}

function SubHeader({
  className,
  left = 'Back',
  onBack,
  actions,
  ...props
}: ComponentProps<'div'> & {
  left?: 'Back' | 'Close'
  onBack?: () => void
  actions?: ReactNode
}) {
  return (
    <div
      data-slot="sub-header"
      data-left={left}
      className={cn(
        'flex w-full items-center justify-between gap-4 border-b border-solid border-border bg-background px-6 py-3',
        className,
      )}
      {...props}
    >
      <button
        type="button"
        className="inline-flex items-center gap-1 text-sm leading-[1.5] text-muted-foreground outline-none hover:text-foreground"
        onClick={onBack}
      >
        {left === 'Close' ? (
          <>
            Close
            <KeyboardHint>esc</KeyboardHint>
          </>
        ) : (
          <>
            <ChevronLeftIcon className="size-4" />
            Back
          </>
        )}
      </button>
      {actions ? (
        <div className="flex min-w-0 flex-1 flex-wrap items-center justify-end gap-2">{actions}</div>
      ) : (
        <span className="min-w-0 flex-1" />
      )}
    </div>
  )
}

export { SubHeader }
