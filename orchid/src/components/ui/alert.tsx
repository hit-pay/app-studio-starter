import * as React from 'react'
import { XIcon } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const alertVariants = cva(
  'group/alert relative flex w-full items-start gap-4 rounded-lg border border-solid py-4 pr-8 pl-4 text-sm leading-[1.5] text-oc-foreground shadow-none',
  {
    variants: {
      color: {
        Default:
          'border-oc-success-border bg-oc-success-soft [&_[data-slot=alert-icon]]:text-oc-success',
        Blue: 'border-oc-info-border bg-oc-info-soft [&_[data-slot=alert-icon]]:text-oc-primary',
        Red: 'border-oc-destructive-border bg-oc-destructive-soft [&_[data-slot=alert-icon]]:text-oc-destructive',
        Orange:
          'border-oc-warning-border bg-oc-warning-soft [&_[data-slot=alert-icon]]:text-oc-warning',
        Grey: 'border-oc-border bg-oc-neutral [&_[data-slot=alert-icon]]:text-oc-muted-foreground',
      },
      action: {
        Bottom: '',
        Right: '',
      },
    },
    defaultVariants: {
      color: 'Default',
      action: 'Bottom',
    },
  },
)

function Alert({
  className,
  color = 'Default',
  action = 'Bottom',
  onClose,
  children,
  ...props
}: Omit<React.ComponentProps<'div'>, 'color'> &
  VariantProps<typeof alertVariants> & {
    onClose?: () => void
  }) {
  return (
    <div
      data-slot="alert"
      data-color={color}
      data-action={action}
      role="status"
      className={cn(alertVariants({ color, action }), className)}
      {...props}
    >
      {children}
      {onClose ? (
        <button
          type="button"
          data-slot="alert-close"
          aria-label="Close"
          onClick={onClose}
          className="absolute top-[11px] right-[11px] inline-flex size-5 items-center justify-center opacity-25 outline-none hover:opacity-50"
        >
          <span className="flex size-5 items-center justify-center rounded-full bg-oc-foreground">
            <XIcon className="size-2.5 text-white" strokeWidth={3} />
          </span>
        </button>
      ) : null}
    </div>
  )
}

function AlertIcon({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="alert-icon"
      className={cn(
        'inline-flex size-12 shrink-0 items-center justify-center rounded-lg bg-oc-background p-3 shadow-[0_3px_22px_rgba(38,42,50,0.09)] [&_svg]:size-full',
        className,
      )}
      {...props}
    />
  )
}

function AlertBody({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-body"
      className={cn(
        'flex min-w-0 flex-1 flex-col gap-2',
        'group-data-[action=Right]/alert:flex-row group-data-[action=Right]/alert:items-center',
        className,
      )}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-title"
      className={cn('w-full text-sm font-medium text-oc-foreground', className)}
      {...props}
    />
  )
}

function AlertDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        'w-full text-xs text-oc-foreground [&_a]:text-oc-primary [&_a]:underline-offset-2 hover:[&_a]:underline',
        className,
      )}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-action"
      className={cn(
        'flex shrink-0 items-start gap-2',
        'group-data-[action=Bottom]/alert:w-full',
        'group-data-[action=Right]/alert:pr-3',
        className,
      )}
      {...props}
    />
  )
}

export {
  Alert,
  AlertIcon,
  AlertBody,
  AlertTitle,
  AlertDescription,
  AlertAction,
  alertVariants,
}
