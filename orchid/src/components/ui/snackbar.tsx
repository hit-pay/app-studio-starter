import * as React from 'react'
import { XIcon } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const snackbarVariants = cva(
  'group/snackbar relative flex rounded-lg border border-solid text-foreground',
  {
    variants: {
      color: {
        Default:
          'border-success-border bg-success-soft [&_[data-slot=snackbar-icon]]:text-success',
        Blue: 'border-info-border bg-info-soft [&_[data-slot=snackbar-icon]]:text-primary',
        Red: 'border-destructive-border bg-destructive-soft [&_[data-slot=snackbar-icon]]:text-destructive',
        Orange:
          'border-warning-border bg-warning-soft [&_[data-slot=snackbar-icon]]:text-warning',
        Grey: 'border-neutral-border bg-neutral-soft [&_[data-slot=snackbar-icon]]:text-muted-foreground',
      },
      size: {
        Small: 'w-fit items-center gap-1 py-2 pr-3 pl-2 text-xs leading-[1.5]',
        Default: 'w-fit flex-row items-center gap-3 py-3 pr-4 pl-3 text-sm leading-[1.5]',
        Big: 'w-full items-start gap-4 py-4 pr-8 pl-4 text-sm leading-[1.5]',
      },
      action: {
        Bottom: '',
        Right: '',
      },
      shadow: {
        true: '',
        false: 'shadow-none',
      },
    },
    compoundVariants: [
      {
        color: 'Grey',
        size: 'Big',
        class: 'border-border bg-neutral',
      },
      {
        size: 'Small',
        shadow: true,
        class: 'shadow-[0_8px_6px_rgba(42,50,82,0.04)]',
      },
      {
        size: 'Default',
        shadow: true,
        class: 'shadow-[0_8px_6px_rgba(42,50,82,0.04)]',
      },
      {
        size: 'Big',
        shadow: true,
        class: 'shadow-[0_3px_11px_rgba(38,42,50,0.03)]',
      },
    ],
    defaultVariants: {
      color: 'Default',
      size: 'Default',
      action: 'Bottom',
      shadow: true,
    },
  },
)

const COLOR_ALIAS: Record<string, 'Default' | 'Blue' | 'Red' | 'Orange' | 'Grey'> = {
  Default: 'Default',
  success: 'Default',
  Blue: 'Blue',
  info: 'Blue',
  Red: 'Red',
  error: 'Red',
  Orange: 'Orange',
  warning: 'Orange',
  Grey: 'Grey',
  neutral: 'Grey',
}

const SIZE_ALIAS: Record<string, 'Small' | 'Default' | 'Big'> = {
  Small: 'Small',
  sm: 'Small',
  Default: 'Default',
  default: 'Default',
  Big: 'Big',
  lg: 'Big',
}

function Snackbar({
  className,
  color = 'Default',
  variant,
  size = 'Default',
  action = 'Bottom',
  actionPlacement,
  shadow = true,
  onClose,
  children,
  ...props
}: Omit<React.ComponentProps<'div'>, 'color'> &
  VariantProps<typeof snackbarVariants> & {
    color?: 'Default' | 'Blue' | 'Red' | 'Orange' | 'Grey' | 'success' | 'info' | 'error' | 'warning' | 'neutral'
    variant?: 'success' | 'info' | 'error' | 'warning' | 'neutral'
    size?: 'Small' | 'Default' | 'Big' | 'sm' | 'lg' | 'default'
    action?: 'Bottom' | 'Right'
    actionPlacement?: 'bottom' | 'right'
    shadow?: boolean
    onClose?: () => void
  }) {
  const resolvedColor = COLOR_ALIAS[variant ?? color] ?? 'Default'
  const resolvedSize = SIZE_ALIAS[String(size)] ?? 'Default'
  const resolvedAction = actionPlacement === 'right' ? 'Right' : action ?? 'Bottom'

  return (
    <div
      data-slot="snackbar"
      data-color={resolvedColor}
      data-size={resolvedSize}
      data-action={resolvedAction}
      role="status"
      className={cn(
        snackbarVariants({
          color: resolvedColor,
          size: resolvedSize,
          action: resolvedAction,
          shadow,
        }),
        className,
      )}
      {...props}
    >
      {children}
      {onClose ? (
        <button
          type="button"
          data-slot="snackbar-close"
          aria-label="Close"
          onClick={onClose}
          className={cn(
            'inline-flex size-5 items-center justify-center outline-none',
            resolvedSize === 'Big'
              ? 'absolute top-[11px] right-[11px] opacity-25 hover:opacity-50'
              : 'absolute -top-1.5 -right-1.5 opacity-25 hover:opacity-50',
          )}
        >
          <span className="flex size-5 items-center justify-center rounded-full bg-foreground">
            <XIcon className="size-2.5 text-white" strokeWidth={3} />
          </span>
        </button>
      ) : null}
    </div>
  )
}

function SnackbarIcon({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="snackbar-icon"
      className={cn(
        'inline-flex shrink-0 items-center justify-center [&_svg]:size-full',
        'group-data-[size=Small]/snackbar:size-4',
        'group-data-[size=Default]/snackbar:size-6',
        'group-data-[size=Big]/snackbar:size-12 group-data-[size=Big]/snackbar:rounded-lg group-data-[size=Big]/snackbar:bg-background group-data-[size=Big]/snackbar:p-3 group-data-[size=Big]/snackbar:shadow-[0_3px_22px_rgba(38,42,50,0.09)]',
        className,
      )}
      {...props}
    />
  )
}

function SnackbarBody({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="snackbar-body"
      className={cn(
        'flex min-w-0 flex-1',
        'group-data-[size=Small]/snackbar:items-center',
        'group-data-[size=Default]/snackbar:w-full group-data-[size=Default]/snackbar:items-center group-data-[size=Default]/snackbar:gap-3',
        'group-data-[size=Big]/snackbar:flex-col group-data-[size=Big]/snackbar:gap-2',
        'group-data-[size=Big]/snackbar:group-data-[action=Right]/snackbar:flex-row group-data-[size=Big]/snackbar:group-data-[action=Right]/snackbar:items-center',
        className,
      )}
      {...props}
    />
  )
}

function SnackbarTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="snackbar-title"
      className={cn('w-full text-sm font-medium text-foreground', className)}
      {...props}
    />
  )
}

function SnackbarDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="snackbar-description"
      className={cn(
        'text-foreground [&_a]:text-primary [&_a]:underline-offset-2 hover:[&_a]:underline',
        'group-data-[size=Small]/snackbar:text-xs',
        'group-data-[size=Default]/snackbar:text-sm',
        'group-data-[size=Big]/snackbar:w-full group-data-[size=Big]/snackbar:text-xs',
        className,
      )}
      {...props}
    />
  )
}

function SnackbarAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="snackbar-action"
      className={cn(
        'flex shrink-0 items-start gap-2',
        'group-data-[size=Default]/snackbar:w-full group-data-[size=Default]/snackbar:justify-end',
        'group-data-[size=Big]/snackbar:group-data-[action=Bottom]/snackbar:w-full',
        'group-data-[size=Big]/snackbar:group-data-[action=Right]/snackbar:pr-3',
        className,
      )}
      {...props}
    />
  )
}

export {
  Snackbar,
  SnackbarIcon,
  SnackbarBody,
  SnackbarTitle,
  SnackbarDescription,
  SnackbarAction,
  snackbarVariants,
}
