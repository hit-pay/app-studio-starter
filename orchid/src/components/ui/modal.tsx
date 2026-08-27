import type { ComponentProps, ReactNode } from 'react'
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { cva } from 'class-variance-authority'
import { XIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from './button'

const modalPopupVariants = cva(
  'flex w-full flex-col overflow-hidden bg-oc-background outline-none',
  {
    variants: {
      size: {
        Small:
          'max-h-[80vh] max-w-[320px] rounded-2xl shadow-[0_3px_22px_rgba(38,42,50,0.09)] sm:max-h-[96vh]',
        Medium:
          'max-h-[80vh] max-w-[480px] rounded-2xl shadow-[0_3px_22px_rgba(38,42,50,0.09)] sm:max-h-[96vh]',
        Default:
          'max-h-[80vh] max-w-[640px] rounded-2xl shadow-[0_3px_22px_rgba(38,42,50,0.09)] sm:max-h-[96vh]',
        Confirmation:
          'max-h-[80vh] max-w-[320px] rounded-2xl shadow-[0_3px_22px_rgba(38,42,50,0.09)] sm:max-h-[96vh]',
        Fullscreen: 'h-dvh max-h-none w-full max-w-none rounded-none shadow-none',
      },
    },
    defaultVariants: {
      size: 'Default',
    },
  },
)

/**
 * Dialog surface. Prefer `Modal` for custom dialogs; use `ConfirmDialog` for
 * Delete / Warning / Success / Question. `ModalPopup` is the panel.
 */
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
  confirmLabel = 'Save',
  confirmType = 'Primary',
  onCancel,
  onConfirm,
  footerContent,
  showCancel = true,
  children,
  ...props
}: DialogPrimitive.Popup.Props & {
  size?: 'Small' | 'Medium' | 'Default' | 'Confirmation' | 'Fullscreen'
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
  showCancel?: boolean
}) {
  const confirmation = size === 'Confirmation'
  const fullscreen = size === 'Fullscreen'
  const hideDividers = borderless || confirmation

  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Backdrop
        data-slot="modal-backdrop"
        className="fixed inset-0 z-50 bg-black/45"
      />
      <DialogPrimitive.Viewport
        className={cn(
          'fixed inset-0 z-50 flex',
          fullscreen ? 'items-stretch justify-stretch p-0' : 'items-center justify-center p-5',
        )}
      >
        <DialogPrimitive.Popup
          data-slot="modal-popup"
          data-size={size}
          className={cn(modalPopupVariants({ size }), className)}
          {...props}
        >
          {fullscreen && title ? (
            <DialogPrimitive.Title className="sr-only">{title}</DialogPrimitive.Title>
          ) : null}

          {header && !fullscreen ? (
            <div
              className={cn(
                'flex items-start justify-between gap-4 bg-oc-background p-4',
                !hideDividers && 'border-b border-solid border-oc-border',
              )}
            >
              <div className="flex min-w-0 flex-1 flex-col gap-1 overflow-hidden pt-0.5">
                {title ? (
                  <DialogPrimitive.Title className="text-base font-medium leading-[1.4] text-oc-foreground">
                    {title}
                  </DialogPrimitive.Title>
                ) : null}
                {description ? (
                  <DialogPrimitive.Description className="text-sm font-normal leading-[1.5] text-oc-muted-foreground">
                    {description}
                  </DialogPrimitive.Description>
                ) : null}
              </div>
              {closeIcon ? (
                <DialogPrimitive.Close
                  data-slot="modal-close"
                  aria-label="Close"
                  className="inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded text-oc-muted-foreground outline-none hover:bg-oc-dark-blue-soft hover:text-oc-foreground"
                >
                  <XIcon className="size-5" />
                </DialogPrimitive.Close>
              ) : null}
            </div>
          ) : null}

          <div
            className={cn(
              'min-h-0 flex-1',
              fullscreen ? 'flex flex-col overflow-hidden p-0' : 'overflow-y-auto',
              !fullscreen && (confirmation ? 'p-4' : 'p-6'),
              borderless && !confirmation && !fullscreen && 'py-0',
            )}
          >
            {children}
          </div>

          {footer && !fullscreen ? (
            <div
              className={cn(
                'flex items-center gap-8 px-4 py-5',
                confirmation ? 'justify-center' : 'justify-end',
                !hideDividers && 'border-t border-solid border-oc-border',
              )}
            >
              {footerContent ?? (
                <div
                  className={cn(
                    'flex min-w-0 flex-1 items-center',
                    confirmation ? 'justify-center' : 'justify-end',
                  )}
                >
                  <div className="grid auto-cols-[minmax(7rem,1fr)] grid-flow-col gap-3">
                    {showCancel ? (
                      <DialogPrimitive.Close
                        render={<Button variant="Secondary" className="w-full" onClick={onCancel} />}
                      >
                        {cancelLabel}
                      </DialogPrimitive.Close>
                    ) : null}
                    <Button
                      variant={confirmType}
                      className="w-full"
                      onClick={onConfirm}
                    >
                      {confirmLabel}
                    </Button>
                  </div>
                </div>
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
