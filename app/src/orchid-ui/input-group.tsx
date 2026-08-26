import type { ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { Button } from './button'
import { Input } from './input'
import { Textarea } from './textarea'

const inputGroupVariants = cva(
  'group/input-group relative flex h-9 w-full min-w-0 items-center outline-none has-disabled:opacity-50 has-[>textarea]:h-auto',
  {
    variants: {
      variant: {
        Default:
          'rounded-lg border border-border bg-background shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1.5px_1.5px_rgba(0,0,0,0.09)] has-disabled:bg-muted has-[[data-slot=input-group-control]:focus-visible]:border-primary has-[[data-slot=input-group-control]:focus-visible]:shadow-[0_0_0_3px_var(--info-border)] has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:shadow-[0_0_0_3px_var(--destructive-border)]',
        Underline:
          'rounded-none border-0 border-b border-border bg-transparent shadow-none has-[[data-slot=input-group-control]:focus-visible]:border-primary has-[[data-slot][aria-invalid=true]]:border-destructive',
      },
    },
    defaultVariants: {
      variant: 'Default',
    },
  },
)

function InputGroup({
  className,
  variant = 'Default',
  ...props
}: ComponentProps<'div'> & VariantProps<typeof inputGroupVariants>) {
  return (
    <div
      data-slot="input-group"
      data-variant={variant}
      role="group"
      className={cn(inputGroupVariants({ variant }), className)}
      {...props}
    />
  )
}

const inputGroupAddonVariants = cva(
  'flex h-auto cursor-text items-center justify-center gap-2 text-sm text-muted-foreground select-none [&_svg:not([class*=\'size-\'])]:size-4',
  {
    variants: {
      align: {
        'inline-start': 'order-first px-2',
        'inline-end': 'order-last px-2',
        'block-start': 'order-first w-full justify-start px-2 pt-2',
        'block-end': 'order-last w-full justify-start px-2 pb-2',
      },
    },
    defaultVariants: {
      align: 'inline-start',
    },
  },
)

function InputGroupAddon({
  className,
  align = 'inline-start',
  ...props
}: ComponentProps<'div'> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(event) => {
        if ((event.target as HTMLElement).closest('button, [data-slot=select-trigger]')) {
          return
        }
        event.currentTarget.parentElement?.querySelector('input')?.focus()
      }}
      {...props}
    />
  )
}

function InputGroupButton({
  className,
  htmlType = 'button',
  type = 'Secondary',
  style = 'Transparent',
  size = 'Small',
  ...props
}: ComponentProps<typeof Button>) {
  return (
    <Button
      htmlType={htmlType}
      type={type}
      style={style}
      size={size}
      className={cn('shadow-none', className)}
      {...props}
    />
  )
}

function InputGroupSeparator({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="input-group-separator"
      className={cn('w-px self-stretch bg-border', className)}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        'flex items-center gap-2 text-sm text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*=\'size-\'])]:size-4',
        className,
      )}
      {...props}
    />
  )
}

function InputGroupInput({ className, ...props }: ComponentProps<'input'>) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        'flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:border-transparent focus-visible:shadow-none disabled:bg-transparent aria-invalid:shadow-none',
        className,
      )}
      {...props}
    />
  )
}

function InputGroupTextarea({ className, ...props }: ComponentProps<'textarea'>) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        'flex-1 resize-none rounded-none border-0 bg-transparent shadow-none focus-visible:border-transparent focus-visible:shadow-none disabled:bg-transparent aria-invalid:shadow-none',
        className,
      )}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupSeparator,
  InputGroupText,
  InputGroupTextarea,
}
