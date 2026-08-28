'use client'

import type { ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'

type FormModalAction = {
  label: string
  icon?: ReactNode
  onClick?: () => void
  disabled?: boolean
}

type FormModalActions = {
  cancel: FormModalAction
  save: FormModalAction & {
    form?: string
  }
}

type FormModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  actions: FormModalActions
  children: ReactNode
  size?: 'sm' | 'default' | 'lg'
  persistent?: boolean
}

function FormModal({
  open,
  onOpenChange,
  title,
  description,
  actions,
  children,
  size = 'default',
  persistent = false,
}: FormModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} persistent={persistent}>
      <DialogContent size={size} className="gap-0 overflow-hidden p-0">
        <div className="border-b border-oc-border px-5 py-4 pr-12">
          <DialogTitle>{title}</DialogTitle>
          {description ? (
            <DialogDescription className="mt-2">{description}</DialogDescription>
          ) : null}
        </div>

        <div className="min-h-0 overflow-y-auto px-5 py-5">{children}</div>

        <div className="flex flex-col-reverse gap-2 border-t border-oc-border bg-oc-muted/50 p-4 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            className="min-w-25"
            disabled={actions.cancel.disabled}
            onClick={() => {
              actions.cancel.onClick?.()
              onOpenChange(false)
            }}
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
      </DialogContent>
    </Dialog>
  )
}

export {
  FormModal,
  type FormModalAction,
  type FormModalActions,
  type FormModalProps,
}
