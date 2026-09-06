'use client'

import * as React from 'react'
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { cva, type VariantProps } from 'class-variance-authority'
import { XIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from './button'

function Dialog({
  children,
  persistent = false,
  ...props
}: DialogPrimitive.Root.Props & {
  persistent?: boolean
}) {
  return (
    <DialogPrimitive.Root
      data-slot="dialog"
      disablePointerDismissal={persistent}
      {...props}
    >
      {children}
    </DialogPrimitive.Root>
  )
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        'fixed inset-0 isolate z-50 bg-black/45 duration-100 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0',
        className,
      )}
      {...props}
    />
  )
}

const dialogContentVariants = cva(
  'fixed z-50 grid w-full gap-4 overflow-y-auto bg-oc-background p-4 text-sm text-oc-foreground shadow-[0_3px_22px_rgba(38,42,50,0.09)] outline-none duration-100 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
  {
    variants: {
      size: {
        sm: 'top-1/2 left-1/2 max-h-[80vh] max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl sm:max-w-xs',
        default:
          'top-1/2 left-1/2 max-h-[80vh] max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl sm:max-w-sm',
        lg: 'top-1/2 left-1/2 max-h-[80vh] max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl sm:max-w-xl',
        fullscreen:
          'inset-0 flex h-dvh max-h-none max-w-none flex-col overflow-hidden rounded-none p-0 shadow-none',
        Small:
          'top-1/2 left-1/2 max-h-[80vh] max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl sm:max-w-xs',
        Medium:
          'top-1/2 left-1/2 max-h-[80vh] max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl sm:max-w-md',
        Default:
          'top-1/2 left-1/2 max-h-[80vh] max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl sm:max-w-xl',
        Confirmation:
          'top-1/2 left-1/2 max-h-[80vh] max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl sm:max-w-xs',
        Fullscreen:
          'inset-0 flex h-dvh max-h-none max-w-none flex-col overflow-hidden rounded-none p-0 shadow-none',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
)

function DialogContent({
  className,
  children,
  showCloseButton = true,
  size = 'default',
  ...props
}: DialogPrimitive.Popup.Props &
  VariantProps<typeof dialogContentVariants> & {
    showCloseButton?: boolean
  }) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        data-size={size}
        className={cn(dialogContentVariants({ size }), className)}
        {...props}
      >
        {children}
        {showCloseButton ? (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                className="absolute top-2 right-2"
              />
            }
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        ) : null}
      </DialogPrimitive.Popup>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-header"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  showCloseButton?: boolean
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        '-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-2xl border-t border-oc-border bg-oc-muted/50 p-4 sm:flex-row sm:justify-end',
        className,
      )}
      {...props}
    >
      {children}
      {showCloseButton ? (
        <DialogPrimitive.Close render={<Button variant="outline" />}>
          Close
        </DialogPrimitive.Close>
      ) : null}
    </div>
  )
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn('text-base leading-none font-medium text-oc-foreground', className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        'text-sm text-oc-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-oc-foreground',
        className,
      )}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
