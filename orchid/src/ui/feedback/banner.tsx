import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const bannerVariants = cva(
  'group/banner relative grid w-auto min-w-0 max-w-full gap-y-1 rounded-lg border border-solid px-4 py-4 text-left text-sm leading-normal text-oc-foreground shadow-none has-data-[banner-action=top-right]:pr-32 has-[>svg]:grid-cols-[3rem_1fr] has-[>svg]:gap-x-4 [&>svg]:row-span-2 [&>svg]:size-12 [&>svg]:rounded-lg [&>svg]:bg-oc-background [&>svg]:p-3 [&>svg]:shadow-[0_3px_22px_rgba(38,42,50,0.09)]',
  {
    variants: {
      variant: {
        default:
          'border-oc-info-border bg-oc-info-soft [&>svg]:text-oc-primary [&_[data-slot=banner-description]]:text-oc-foreground',
        destructive:
          'border-oc-destructive-border bg-oc-destructive-soft text-oc-destructive [&>svg]:text-oc-destructive [&_[data-slot=banner-description]]:text-oc-destructive',
        success:
          'border-oc-success-border bg-oc-success-soft [&>svg]:text-oc-success [&_[data-slot=banner-description]]:text-oc-foreground',
        warning:
          'border-oc-warning-border bg-oc-warning-soft [&>svg]:text-oc-warning [&_[data-slot=banner-description]]:text-oc-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

const bannerActionVariants = cva('flex items-center gap-2', {
  variants: {
    placement: {
      'top-right': 'absolute top-4 right-4',
      bottom:
        'mt-2 w-full flex-wrap group-has-[>svg]/banner:col-start-2',
    },
  },
  defaultVariants: {
    placement: 'top-right',
  },
})

function Banner({
  className,
  variant,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof bannerVariants>) {
  return (
    <div
      data-slot="banner"
      role="status"
      className={cn(bannerVariants({ variant }), className)}
      {...props}
    />
  )
}

function BannerTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="banner-title"
      className={cn(
        'w-full text-sm leading-5 font-medium text-oc-foreground group-has-[>svg]/banner:col-start-2 [&_a]:text-oc-primary [&_a]:underline-offset-2 [&_a]:hover:underline',
        className,
      )}
      {...props}
    />
  )
}

function BannerDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="banner-description"
      className={cn(
        'w-full text-sm text-oc-muted-foreground group-has-[>svg]/banner:col-start-2 [&_a]:text-oc-primary [&_a]:underline-offset-2 [&_a]:hover:underline [&_p:not(:last-child)]:mb-4',
        className,
      )}
      {...props}
    />
  )
}

function BannerAction({
  className,
  placement = 'top-right',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof bannerActionVariants>) {
  return (
    <div
      data-slot="banner-action"
      data-banner-action={placement}
      className={cn(bannerActionVariants({ placement }), className)}
      {...props}
    />
  )
}

export { Banner, BannerTitle, BannerDescription, BannerAction }
