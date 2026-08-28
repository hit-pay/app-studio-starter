'use client'

import { useEffect, type ComponentProps, type ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Kbd } from '@/components/ui/kbd'

type FormPageAction = {
  label: string
  icon?: ReactNode
  onClick?: () => void
  disabled?: boolean
}

type FormPageActions = {
  cancel: FormPageAction
  save: FormPageAction & {
    form?: string
  }
}

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
  actions?: FormPageActions
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
      {onClose ? (
        <button
          type="button"
          className="inline-flex cursor-pointer items-center gap-1 text-sm text-oc-muted-foreground outline-none hover:text-oc-foreground"
          onClick={onClose}
        >
          Close
          <Kbd>Esc</Kbd>
        </button>
      ) : (
        <span />
      )}
      {actions ? (
        <div className="flex min-w-0 flex-wrap items-center justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            className="min-w-25"
            disabled={actions.cancel.disabled}
            onClick={actions.cancel.onClick}
          >
            {actions.cancel.icon}
            {actions.cancel.label}
          </Button>
          <Button
            type={actions.save.form ? 'submit' : 'button'}
            form={actions.save.form}
            className="min-w-25"
            disabled={actions.save.disabled}
            onClick={actions.save.onClick}
          >
            {actions.save.icon}
            {actions.save.label}
          </Button>
        </div>
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

export {
  FormPage,
  FormPageContent,
  FormPageHeader,
  type FormPageAction,
  type FormPageActions,
}
