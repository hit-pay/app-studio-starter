import type { ComponentProps, ReactNode } from 'react'
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { cva } from 'class-variance-authority'
import { XIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from './button'

type SheetSide = 'Right' | 'Left' | 'Top' | 'Bottom'
type SheetSize = 'Small' | 'Medium' | 'Default'

const sheetContentVariants = cva(
  'flex flex-col overflow-hidden bg-oc-background outline-none shadow-[0_3px_22px_rgba(38,42,50,0.09)]',
  {
    variants: {
      side: {
        Right: 'h-full max-h-none rounded-l-2xl',
        Left: 'h-full max-h-none rounded-r-2xl',
        Top: 'w-full max-w-none rounded-b-2xl',
        Bottom: 'w-full max-w-none rounded-t-2xl',
      },
      size: {
        Small: '',
        Medium: '',
        Default: '',
      },
    },
    compoundVariants: [
      { side: 'Right', size: 'Small', class: 'w-full max-w-[320px]' },
      { side: 'Right', size: 'Medium', class: 'w-full max-w-[480px]' },
      { side: 'Right', size: 'Default', class: 'w-full max-w-[640px]' },
      { side: 'Left', size: 'Small', class: 'w-full max-w-[320px]' },
      { side: 'Left', size: 'Medium', class: 'w-full max-w-[480px]' },
      { side: 'Left', size: 'Default', class: 'w-full max-w-[640px]' },
      { side: 'Top', size: 'Small', class: 'max-h-[40vh]' },
      { side: 'Top', size: 'Medium', class: 'max-h-[56vh]' },
      { side: 'Top', size: 'Default', class: 'max-h-[72vh]' },
      { side: 'Bottom', size: 'Small', class: 'max-h-[40vh]' },
      { side: 'Bottom', size: 'Medium', class: 'max-h-[56vh]' },
      { side: 'Bottom', size: 'Default', class: 'max-h-[72vh]' },
    ],
    defaultVariants: {
      side: 'Right',
      size: 'Default',
    },
  },
)

/**
 * Side (or edge) panel. Complementary to the page: edit a row, filters, details.
 * Not a centered Dialog. Not a swipe Drawer (app `drawer` — mobile snap/swipe).
 */
function Sheet({
  children,
  persistent = false,
  ...props
}: DialogPrimitive.Root.Props & {
  persistent?: boolean
}) {
  return (
    <DialogPrimitive.Root
      data-slot="sheet"
      disablePointerDismissal={persistent}
      {...props}
    >
      {children}
    </DialogPrimitive.Root>
  )
}

function SheetTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetContent({
  className,
  side = 'Right',
  size = 'Default',
  title,
  description,
  closeIcon = true,
  header = true,
  footer = true,
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
  side?: SheetSide
  size?: SheetSize
  title?: string
  description?: string
  closeIcon?: boolean
  header?: boolean
  footer?: boolean
  cancelLabel?: string
  confirmLabel?: string
  confirmType?: 'Primary' | 'Destructive' | 'Secondary'
  onCancel?: () => void
  onConfirm?: () => void
  footerContent?: ReactNode
  showCancel?: boolean
}) {
  const vertical = side === 'Top' || side === 'Bottom'

  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Backdrop
        data-slot="sheet-backdrop"
        className="fixed inset-0 z-50 bg-black/45"
      />
      <DialogPrimitive.Viewport
        className={cn(
          'fixed inset-0 z-50 flex',
          side === 'Right' && 'items-stretch justify-end',
          side === 'Left' && 'items-stretch justify-start',
          side === 'Top' && 'items-start justify-center',
          side === 'Bottom' && 'items-end justify-center',
        )}
      >
        <DialogPrimitive.Popup
          data-slot="sheet-content"
          data-side={side}
          data-size={size}
          className={cn(sheetContentVariants({ side, size }), className)}
          {...props}
        >
          {header ? (
            <div className="flex items-start justify-between gap-4 border-b border-solid border-oc-border bg-oc-background p-4">
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
                  data-slot="sheet-close"
                  aria-label="Close"
                  className="inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded text-oc-muted-foreground outline-none hover:bg-oc-dark-blue-soft hover:text-oc-foreground"
                >
                  <XIcon className="size-5" />
                </DialogPrimitive.Close>
              ) : null}
            </div>
          ) : title ? (
            <DialogPrimitive.Title className="sr-only">{title}</DialogPrimitive.Title>
          ) : null}

          <div className={cn('min-h-0 flex-1 overflow-y-auto p-6', vertical && 'max-h-[inherit]')}>
            {children}
          </div>

          {footer ? (
            <div className="flex items-center justify-end gap-8 border-t border-solid border-oc-border px-4 py-5">
              {footerContent ?? (
                <div className="grid auto-cols-[minmax(7rem,1fr)] grid-flow-col gap-3">
                  {showCancel ? (
                    <DialogPrimitive.Close
                      render={<Button variant="Secondary" className="w-full" onClick={onCancel} />}
                    >
                      {cancelLabel}
                    </DialogPrimitive.Close>
                  ) : null}
                  <Button variant={confirmType} className="w-full" onClick={onConfirm}>
                    {confirmLabel}
                  </Button>
                </div>
              )}
            </div>
          ) : null}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Viewport>
    </DialogPrimitive.Portal>
  )
}

function SheetClose({ className, ...props }: ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="sheet-close" className={className} {...props} />
}

export { Sheet, SheetTrigger, SheetContent, SheetClose }
export type { SheetSide, SheetSize }
