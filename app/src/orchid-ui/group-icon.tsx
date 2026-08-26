import type { ComponentProps, ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { EllipsisIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './dropdown-menu'

const groupIconVariants = cva('inline-flex items-center gap-0.5', {
  variants: {
    type: {
      Default: '',
      Border: 'rounded border border-solid border-dark-blue-border bg-background p-0.5',
    },
  },
  defaultVariants: {
    type: 'Default',
  },
})

const groupIconItemVariants = cva(
  'inline-flex size-6 shrink-0 items-center justify-center rounded p-1 text-foreground outline-none hover:bg-dark-blue-soft [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
)

function GroupIcon({
  className,
  type = 'Default',
  ...props
}: ComponentProps<'div'> & VariantProps<typeof groupIconVariants>) {
  return (
    <div
      data-slot="group-icon"
      data-type={type}
      className={cn(groupIconVariants({ type }), className)}
      {...props}
    />
  )
}

function GroupIconButton({ className, ...props }: ComponentProps<'button'>) {
  return (
    <button
      type="button"
      data-slot="group-icon-button"
      className={cn(groupIconItemVariants(), className)}
      {...props}
    />
  )
}

function GroupIconLink({ className, ...props }: ComponentProps<'a'>) {
  return (
    <a
      data-slot="group-icon-link"
      target="_blank"
      rel="noreferrer"
      className={cn(groupIconItemVariants(), className)}
      {...props}
    />
  )
}

function GroupIconDivider() {
  return (
    <span data-slot="group-icon-divider" className="h-4 w-px shrink-0 bg-dark-blue-border" />
  )
}

function GroupIconMenu({
  className,
  menu,
}: {
  className?: string
  menu?: ReactNode
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        nativeButton
        className={cn(groupIconItemVariants(), className)}
        render={
          <button type="button" aria-label="More">
            <EllipsisIcon />
          </button>
        }
      />
      {menu ? <DropdownMenuContent align="end">{menu}</DropdownMenuContent> : null}
    </DropdownMenu>
  )
}

export {
  GroupIcon,
  GroupIconButton,
  GroupIconLink,
  GroupIconDivider,
  GroupIconMenu,
  groupIconVariants,
  groupIconItemVariants,
}
