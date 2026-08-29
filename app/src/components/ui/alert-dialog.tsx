import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
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
} from '@/components/ui/dialog'

function AlertDialog({
  persistent = true,
  ...props
}: React.ComponentProps<typeof Dialog>) {
  return <Dialog persistent={persistent} {...props} />
}

function AlertDialogTrigger(props: React.ComponentProps<typeof DialogTrigger>) {
  return <DialogTrigger data-slot="alert-dialog-trigger" {...props} />
}

function AlertDialogPortal(props: React.ComponentProps<typeof DialogPortal>) {
  return <DialogPortal data-slot="alert-dialog-portal" {...props} />
}

function AlertDialogOverlay(props: React.ComponentProps<typeof DialogOverlay>) {
  return <DialogOverlay data-slot="alert-dialog-overlay" {...props} />
}

function AlertDialogContent({
  size = 'Confirmation',
  ...props
}: React.ComponentProps<typeof DialogContent>) {
  return (
    <DialogContent
      data-slot="alert-dialog-content"
      size={size}
      showCloseButton={false}
      {...props}
    />
  )
}

function AlertDialogHeader(props: React.ComponentProps<typeof DialogHeader>) {
  return <DialogHeader data-slot="alert-dialog-header" {...props} />
}

function AlertDialogFooter(props: React.ComponentProps<typeof DialogFooter>) {
  return <DialogFooter data-slot="alert-dialog-footer" {...props} />
}

function AlertDialogTitle(props: React.ComponentProps<typeof DialogTitle>) {
  return <DialogTitle data-slot="alert-dialog-title" {...props} />
}

function AlertDialogDescription(props: React.ComponentProps<typeof DialogDescription>) {
  return <DialogDescription data-slot="alert-dialog-description" {...props} />
}

function AlertDialogAction({
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <DialogClose render={<Button data-slot="alert-dialog-action" {...props} />}>
      {children}
    </DialogClose>
  )
}

function AlertDialogCancel({
  children,
  variant = 'outline',
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <DialogClose
      render={<Button data-slot="alert-dialog-cancel" variant={variant} {...props} />}
    >
      {children}
    </DialogClose>
  )
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
}
