import { useEffect, type ComponentProps, type ReactNode } from 'react'
import { ChevronLeftIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Kbd } from './kbd'

function PageToolbar({
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
  useEffect(() => {
    if (left !== 'Close' || !onBack) return
    const close = onBack
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      const target = event.target
      if (target instanceof HTMLElement) {
        const tag = target.tagName
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable) {
          return
        }
      }
      close()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [left, onBack])

  return (
    <div
      data-slot="page-toolbar"
      data-left={left}
      className={cn(
        'flex w-full min-w-0 items-center justify-between gap-3 border-b border-solid border-oc-border bg-oc-background px-4 py-3 md:gap-4 md:px-6',
        className,
      )}
      {...props}
    >
      <button
        type="button"
        className="inline-flex cursor-pointer items-center gap-1 text-sm leading-[1.5] text-oc-muted-foreground outline-none hover:text-oc-foreground"
        onClick={onBack}
      >
        {left === 'Close' ? (
          <>
            Close
            <Kbd>Esc</Kbd>
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

export { PageToolbar }
