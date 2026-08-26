import type { ComponentProps, ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { EllipsisIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './dropdown-menu'

const buttonGroupVariants = cva('inline-flex items-center gap-0.5', {
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

const buttonGroupItemVariants = cva(
  'inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded p-1 text-oc-foreground outline-none hover:bg-oc-dark-blue-soft [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
)

function ButtonGroup({
  className,
  type = 'Default',
  ...props
}: ComponentProps<'div'> & VariantProps<typeof buttonGroupVariants>) {
  return (
    <div
      data-slot="button-group"
      data-type={type}
      className={cn(buttonGroupVariants({ type }), className)}
      {...props}
    />
  )
}

function ButtonGroupButton({ className, ...props }: ComponentProps<'button'>) {
  return (
    <button
      type="button"
      data-slot="button-group-button"
      className={cn(buttonGroupItemVariants(), className)}
      {...props}
    />
  )
}

function ButtonGroupLink({ className, ...props }: ComponentProps<'a'>) {
  return (
    <a
      data-slot="button-group-link"
      target="_blank"
      rel="noreferrer"
      className={cn(buttonGroupItemVariants(), className)}
      {...props}
    />
  )
}

function ButtonGroupDivider() {
  return (
    <span data-slot="button-group-divider" className="h-4 w-px shrink-0 bg-oc-dark-blue-border" />
  )
}

function ButtonGroupMenu({
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
        className={cn(buttonGroupItemVariants(), className)}
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
  ButtonGroup,
  ButtonGroupButton,
  ButtonGroupLink,
  ButtonGroupDivider,
  ButtonGroupMenu,
  buttonGroupVariants,
  buttonGroupItemVariants,
}
