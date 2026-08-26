import type { ComponentProps, ReactNode } from 'react'
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { cva } from 'class-variance-authority'
import { XIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from './button'

const modalPopupVariants = cva(
  'flex w-full max-h-[80vh] flex-col overflow-hidden rounded-xl bg-background shadow-[0_1px_3px_rgba(0,0,0,0.1),0_3px_22px_rgba(38,42,50,0.09)] outline-none sm:max-h-[96vh]',
  {
    variants: {
      size: {
        Small: 'max-w-xs',
        Medium: 'max-w-md',
        Default: 'max-w-xl',
      },
    },
    defaultVariants: {
      size: 'Default',
    },
  },
)

function Modal({
  children,
  persistent = false,
  ...props
}: DialogPrimitive.Root.Props & {
  persistent?: boolean
}) {
  return (
    <DialogPrimitive.Root
      data-slot="modal"
      disablePointerDismissal={persistent}
      {...props}
    >
      {children}
    </DialogPrimitive.Root>
  )
}

function ModalTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="modal-trigger" {...props} />
}

function ModalPopup({
  className,
  size = 'Default',
  title,
  description,
  closeIcon = true,
  header = true,
  footer = true,
  borderless = false,
  cancelLabel = 'Cancel',
  confirmLabel = 'OK',
  confirmType = 'Primary',
  onCancel,
  onConfirm,
  footerContent,
  children,
  ...props
}: DialogPrimitive.Popup.Props & {
  size?: 'Small' | 'Medium' | 'Default'
  title?: string
  description?: string
  closeIcon?: boolean
  header?: boolean
  footer?: boolean
  borderless?: boolean
  cancelLabel?: string
  confirmLabel?: string
  confirmType?: 'Primary' | 'Destructive' | 'Secondary'
  onCancel?: () => void
  onConfirm?: () => void
  footerContent?: ReactNode
}) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Backdrop
        data-slot="modal-backdrop"
        className="fixed inset-0 z-50 bg-black/45"
      />
      <DialogPrimitive.Viewport className="fixed inset-0 z-50 flex items-center justify-center p-5">
        <DialogPrimitive.Popup
          data-slot="modal-popup"
          data-size={size}
          className={cn(modalPopupVariants({ size }), className)}
          {...props}
        >
          {header ? (
            <div
              className={cn(
                'flex items-start justify-between gap-9 bg-background p-5',
                !borderless && 'border-b border-solid border-border',
              )}
            >
              <div className="flex min-w-0 flex-1 flex-col gap-1 overflow-hidden">
                {title ? (
                  <DialogPrimitive.Title className="truncate text-lg font-medium leading-[1.4] text-foreground">
                    {title}
                  </DialogPrimitive.Title>
                ) : null}
                {description ? (
                  <DialogPrimitive.Description className="truncate text-sm leading-[1.5] text-muted-foreground">
                    {description}
                  </DialogPrimitive.Description>
                ) : null}
              </div>
              {closeIcon ? (
                <DialogPrimitive.Close
                  data-slot="modal-close"
                  aria-label="Close"
                  className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground outline-none hover:bg-dark-blue-soft hover:text-foreground"
                >
                  <XIcon className="size-5" />
                </DialogPrimitive.Close>
              ) : null}
            </div>
          ) : null}

          <div
            className={cn(
              'min-h-0 flex-1 overflow-y-auto',
              size === 'Small' ? 'p-5' : 'p-7',
              borderless && 'py-0',
            )}
          >
            {children}
          </div>

          {footer ? (
            <div
              className={cn(
                'flex items-center justify-end gap-4 px-5 py-6',
                !borderless && 'border-t border-solid border-border',
              )}
            >
              {footerContent ?? (
                <>
                  <DialogPrimitive.Close render={<Button type="Secondary" onClick={onCancel} />}>
                    {cancelLabel}
                  </DialogPrimitive.Close>
                  <Button type={confirmType} htmlType="button" onClick={onConfirm}>
                    {confirmLabel}
                  </Button>
                </>
              )}
            </div>
          ) : null}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Viewport>
    </DialogPrimitive.Portal>
  )
}

function ModalClose({ className, ...props }: ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="modal-close" className={className} {...props} />
}

export { Modal, ModalTrigger, ModalPopup, ModalClose }
