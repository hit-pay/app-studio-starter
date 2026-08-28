'use client'

import { useEffect, type ComponentProps, type ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { Kbd } from '@/components/ui/kbd'

function FormPage({ className, ...props }: ComponentProps<'section'>) {
  return (
    <section
      data-slot="form-page"
      className={cn(
        'flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden bg-oc-background',
        className,
      )}
      {...props}
    />
  )
}

function FormPageHeader({
  className,
  onClose,
  actions,
  ...props
}: ComponentProps<'header'> & {
  onClose?: () => void
  actions?: ReactNode
}) {
  useEffect(() => {
    if (!onClose) return
    const close = onClose

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      const target = event.target
      if (
        target instanceof HTMLElement &&
        (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable)
      ) {
        return
      }
      close()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <header
      data-slot="form-page-header"
      className={cn(
        'relative z-10 flex h-12 shrink-0 items-center justify-between gap-3 border-b border-oc-border bg-oc-background px-4 md:px-6',
        className,
      )}
      {...props}
    >
      <button
        type="button"
        className="inline-flex cursor-pointer items-center gap-1 text-sm text-oc-muted-foreground outline-none hover:text-oc-foreground"
        onClick={onClose}
      >
        Close
        <Kbd>Esc</Kbd>
      </button>
      {actions ? (
        <div className="flex min-w-0 flex-wrap items-center justify-end gap-2">{actions}</div>
      ) : null}
    </header>
  )
}

function FormPageContent({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="form-page-content"
      className={cn('min-h-0 flex-1 overflow-y-auto', className)}
      {...props}
    />
  )
}

export { FormPage, FormPageContent, FormPageHeader }
