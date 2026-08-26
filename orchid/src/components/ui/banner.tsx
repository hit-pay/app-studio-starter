import * as React from 'react'
import { XIcon } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const bannerVariants = cva(
  'group/banner relative flex w-full items-start gap-4 rounded-lg border border-solid py-4 pr-8 pl-4 text-sm leading-[1.5] text-oc-foreground shadow-none',
  {
    variants: {
      color: {
        Default:
          'border-oc-success-border bg-oc-success-soft [&_[data-slot=banner-icon]]:text-oc-success',
        Blue: 'border-oc-info-border bg-oc-info-soft [&_[data-slot=banner-icon]]:text-oc-primary',
        Red: 'border-oc-destructive-border bg-oc-destructive-soft [&_[data-slot=banner-icon]]:text-oc-destructive',
        Orange:
          'border-oc-warning-border bg-oc-warning-soft [&_[data-slot=banner-icon]]:text-oc-warning',
        Grey: 'border-oc-border bg-oc-neutral [&_[data-slot=banner-icon]]:text-oc-muted-foreground',
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

function Banner({
  className,
  color = 'Default',
  variant,
  action = 'Bottom',
  actionPlacement,
  onClose,
  children,
  ...props
}: Omit<React.ComponentProps<'div'>, 'color'> &
  VariantProps<typeof bannerVariants> & {
    color?: 'Default' | 'Blue' | 'Red' | 'Orange' | 'Grey' | 'success' | 'info' | 'error' | 'warning' | 'neutral'
    variant?: 'success' | 'info' | 'error' | 'warning' | 'neutral'
    action?: 'Bottom' | 'Right'
    actionPlacement?: 'bottom' | 'right'
    onClose?: () => void
  }) {
  const resolvedColor = COLOR_ALIAS[variant ?? color] ?? 'Default'
  const resolvedAction = actionPlacement === 'right' ? 'Right' : action ?? 'Bottom'

  return (
    <div
      data-slot="banner"
      data-color={resolvedColor}
      data-action={resolvedAction}
      role="status"
      className={cn(
        bannerVariants({
          color: resolvedColor,
          action: resolvedAction,
        }),
        className,
      )}
      {...props}
    >
      {children}
      {onClose ? (
        <button
          type="button"
          data-slot="banner-close"
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

function BannerIcon({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="banner-icon"
      className={cn(
        'inline-flex size-12 shrink-0 items-center justify-center rounded-lg bg-oc-background p-3 shadow-[0_3px_22px_rgba(38,42,50,0.09)] [&_svg]:size-full',
        className,
      )}
      {...props}
    />
  )
}

function BannerBody({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="banner-body"
      className={cn(
        'flex min-w-0 flex-1 flex-col gap-2',
        'group-data-[action=Right]/banner:flex-row group-data-[action=Right]/banner:items-center',
        className,
      )}
      {...props}
    />
  )
}

function BannerTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="banner-title"
      className={cn('w-full text-sm font-medium text-oc-foreground', className)}
      {...props}
    />
  )
}

function BannerDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="banner-description"
      className={cn(
        'w-full text-xs text-oc-foreground [&_a]:text-oc-primary [&_a]:underline-offset-2 hover:[&_a]:underline',
        className,
      )}
      {...props}
    />
  )
}

function BannerAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="banner-action"
      className={cn(
        'flex shrink-0 items-start gap-2',
        'group-data-[action=Bottom]/banner:w-full',
        'group-data-[action=Right]/banner:pr-3',
        className,
      )}
      {...props}
    />
  )
}

export {
  Banner,
  BannerIcon,
  BannerBody,
  BannerTitle,
  BannerDescription,
  BannerAction,
  bannerVariants,
}
