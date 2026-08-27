import type { ComponentProps, ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { EllipsisIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './dropdown-menu'

const iconGroupVariants = cva('inline-flex items-center gap-0.5', {
  variants: {
    type: {
      Default: '',
      Border: 'rounded border border-solid border-oc-dark-blue-border bg-oc-background p-0.5',
    },
  },
  defaultVariants: {
    type: 'Default',
  },
})

const iconGroupItemVariants = cva(
  'inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded p-1 text-oc-foreground outline-none hover:bg-oc-dark-blue-soft [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
)

function IconGroup({
  className,
  type = 'Default',
  ...props
}: ComponentProps<'div'> & VariantProps<typeof iconGroupVariants>) {
  return (
    <div
      data-slot="icon-group"
      data-type={type}
      className={cn(iconGroupVariants({ type }), className)}
      {...props}
    />
  )
}

function IconGroupButton({ className, ...props }: ComponentProps<'button'>) {
  return (
    <button
      type="button"
      data-slot="icon-group-button"
      className={cn(iconGroupItemVariants(), className)}
      {...props}
    />
  )
}

function IconGroupLink({ className, ...props }: ComponentProps<'a'>) {
  return (
    <a
      data-slot="icon-group-link"
      target="_blank"
      rel="noreferrer"
      className={cn(iconGroupItemVariants(), className)}
      {...props}
    />
  )
}

function IconGroupDivider() {
  return (
    <span data-slot="icon-group-divider" className="h-4 w-px shrink-0 bg-oc-dark-blue-border" />
  )
}

function IconGroupMenu({
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
        className={cn(iconGroupItemVariants(), className)}
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
  IconGroup,
  IconGroupButton,
  IconGroupLink,
  IconGroupDivider,
  IconGroupMenu,
  iconGroupVariants,
  iconGroupItemVariants,
}
