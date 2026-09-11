import type { ComponentProps } from 'react'
import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { Button } from '@ui/actions/button'

const fileUploadVariants = cva(
  'group/file-upload relative flex w-fit max-w-full min-w-0 shrink-0 flex-wrap rounded-xl border border-oc-border bg-oc-card text-oc-card-foreground transition-colors focus-within:ring-1 focus-within:ring-oc-info-border/50 has-[>a,>button]:hover:bg-oc-muted/50 data-[state=error]:border-oc-destructive/30 data-[state=idle]:border-dashed',
  {
    variants: {
      size: {
        default:
          'gap-2 text-sm has-data-[slot=file-upload-content]:px-2.5 has-data-[slot=file-upload-content]:py-2 has-data-[slot=file-upload-media]:p-2',
        sm: 'gap-2.5 text-xs has-data-[slot=file-upload-content]:px-2 has-data-[slot=file-upload-content]:py-1.5 has-data-[slot=file-upload-media]:p-1.5',
        xs: 'gap-1.5 rounded-lg text-xs has-data-[slot=file-upload-content]:px-1.5 has-data-[slot=file-upload-content]:py-1 has-data-[slot=file-upload-media]:p-1',
      },
      orientation: {
        horizontal: 'min-w-40 items-center',
        vertical: 'w-24 flex-col has-data-[slot=file-upload-content]:w-30',
      },
    },
    defaultVariants: {
      size: 'default',
      orientation: 'horizontal',
    },
  },
)

function FileUpload({
  className,
  state = 'done',
  size = 'default',
  orientation = 'horizontal',
  ...props
}: ComponentProps<'div'> &
  VariantProps<typeof fileUploadVariants> & {
    state?: 'idle' | 'uploading' | 'processing' | 'error' | 'done'
  }) {
  return (
    <div
      data-slot="file-upload"
      data-state={state}
      data-size={size}
      data-orientation={orientation}
      className={cn(fileUploadVariants({ size, orientation }), className)}
      {...props}
    />
  )
}

const fileUploadMediaVariants = cva(
  "relative flex aspect-square w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-oc-muted text-oc-foreground group-data-[orientation=vertical]/file-upload:w-full group-data-[size=sm]/file-upload:w-8 group-data-[size=xs]/file-upload:w-7 group-data-[size=xs]/file-upload:rounded-md group-data-[state=error]/file-upload:bg-oc-destructive/10 group-data-[state=error]/file-upload:text-oc-destructive group-data-[orientation=vertical]/file-upload:*:data-[slot=spinner]:size-6! [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 group-data-[orientation=vertical]/file-upload:[&_svg:not([class*='size-'])]:size-6 group-data-[size=xs]/file-upload:[&_svg:not([class*='size-'])]:size-3.5",
  {
    variants: {
      variant: {
        icon: '',
        image:
          'opacity-60 group-data-[state=done]/file-upload:opacity-100 group-data-[state=idle]/file-upload:opacity-100 *:[img]:aspect-square *:[img]:w-full *:[img]:object-cover',
      },
    },
    defaultVariants: {
      variant: 'icon',
    },
  },
)

function FileUploadMedia({
  className,
  variant = 'icon',
  ...props
}: ComponentProps<'div'> & VariantProps<typeof fileUploadMediaVariants>) {
  return (
    <div
      data-slot="file-upload-media"
      data-variant={variant}
      className={cn(fileUploadMediaVariants({ variant }), className)}
      {...props}
    />
  )
}

function FileUploadContent({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="file-upload-content"
      className={cn(
        'max-w-full min-w-0 flex-1 leading-tight group-data-[orientation=vertical]/file-upload:px-1',
        className,
      )}
      {...props}
    />
  )
}

function FileUploadTitle({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="file-upload-title"
      className={cn('block max-w-full min-w-0 truncate font-medium', className)}
      {...props}
    />
  )
}

function FileUploadDescription({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="file-upload-description"
      className={cn(
        'mt-0.5 block max-w-full min-w-0 truncate text-xs text-oc-muted-foreground group-data-[state=error]/file-upload:text-oc-destructive/80',
        className,
      )}
      {...props}
    />
  )
}

function FileUploadActions({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="file-upload-actions"
      className={cn(
        'relative z-20 flex shrink-0 items-center group-data-[orientation=vertical]/file-upload:absolute group-data-[orientation=vertical]/file-upload:top-3 group-data-[orientation=vertical]/file-upload:right-3 group-data-[orientation=vertical]/file-upload:gap-1',
        className,
      )}
      {...props}
    />
  )
}

function FileUploadAction({
  className,
  variant,
  size = 'icon-xs',
  ...props
}: ComponentProps<typeof Button>) {
  return (
    <Button
      data-slot="file-upload-action"
      variant={variant ?? 'ghost'}
      size={size}
      className={cn(className)}
      {...props}
    />
  )
}

function FileUploadTrigger({
  className,
  render,
  type,
  ...props
}: useRender.ComponentProps<'button'>) {
  return useRender({
    defaultTagName: 'button',
    props: mergeProps<'button'>(
      {
        type: render ? undefined : (type ?? 'button'),
        className: cn('absolute inset-0 z-10 outline-none', className),
      },
      props,
    ),
    render,
    state: {
      slot: 'file-upload-trigger',
    },
  })
}

function FileUploadGroup({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="file-upload-group"
      className={cn('flex w-full min-w-0 flex-col gap-3', className)}
      {...props}
    />
  )
}

export {
  FileUpload,
  FileUploadAction,
  FileUploadActions,
  FileUploadContent,
  FileUploadDescription,
  FileUploadGroup,
  FileUploadMedia,
  FileUploadTitle,
  FileUploadTrigger,
}
