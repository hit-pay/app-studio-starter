import type { ComponentProps, ReactNode } from 'react'
import { EllipsisIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { CopyTooltip } from './copy-tooltip'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './dropdown-menu'

function ListItem({
  className,
  selected = false,
  ...props
}: ComponentProps<'div'> & { selected?: boolean }) {
  return (
    <div
      data-slot="list-item"
      data-selected={selected || undefined}
      className={cn(
        'group/list-item relative flex w-full items-start gap-3 rounded-lg border border-solid bg-background px-4 py-3',
        selected
          ? 'border-2 border-primary'
          : 'border-border hover:shadow-[0_3px_11px_rgba(38,42,50,0.09)]',
        className,
      )}
      {...props}
    />
  )
}

function ListItemMedia({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="list-item-media"
      className={cn(
        'size-16 shrink-0 overflow-clip rounded-lg border border-border bg-background',
        className,
      )}
      {...props}
    />
  )
}

function ListItemLogo({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="list-item-logo"
      className={cn(
        'flex size-10 shrink-0 items-center justify-center rounded bg-dark-blue-soft p-1 [&_svg]:size-8',
        className,
      )}
      {...props}
    />
  )
}

function ListItemBody({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="list-item-body"
      className={cn('flex min-w-0 flex-1 flex-col gap-3', className)}
      {...props}
    />
  )
}

function ListItemTitle({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p
      data-slot="list-item-title"
      className={cn('text-sm font-medium leading-[1.5] text-foreground', className)}
      {...props}
    />
  )
}

function ListItemDescription({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p
      data-slot="list-item-description"
      className={cn('text-xs leading-[1.5] text-foreground', className)}
      {...props}
    />
  )
}

function ListItemMeta({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="list-item-meta"
      className={cn('flex flex-wrap items-center gap-4', className)}
      {...props}
    />
  )
}

function ListItemDetail({
  className,
  icon,
  children,
  ...props
}: ComponentProps<'span'> & { icon?: ReactNode }) {
  return (
    <span
      data-slot="list-item-detail"
      className={cn('inline-flex items-center gap-1 text-xs leading-[1.5] text-foreground', className)}
      {...props}
    >
      {icon ? <span className="inline-flex size-4 shrink-0 [&_svg]:size-4">{icon}</span> : null}
      {children}
    </span>
  )
}

function ListItemTrailing({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="list-item-trailing"
      className={cn('flex shrink-0 items-center gap-2', className)}
      {...props}
    />
  )
}

function ListItemHoverActions({ className, children, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="list-item-hover-actions"
      className={cn(
        'absolute top-3 right-4 z-10 hidden items-center gap-0.5 rounded border border-dark-blue-border bg-background p-0.5 group-hover/list-item:flex',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function ListItemAction({
  className,
  destructive,
  ...props
}: ComponentProps<'button'> & { destructive?: boolean }) {
  return (
    <button
      type="button"
      data-slot="list-item-action"
      className={cn(
        'inline-flex size-6 items-center justify-center rounded p-1 outline-none',
        destructive ? 'text-destructive' : 'text-foreground',
        className,
      )}
      {...props}
    />
  )
}

function ListItemActionDivider() {
  return <span className="h-4 w-px bg-dark-blue-border" data-slot="list-item-action-divider" />
}

function ListItemMore({ className, menu }: { className?: string; menu?: ReactNode }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        nativeButton
        className={cn(
          'inline-flex size-7 items-center justify-center rounded-lg p-0.5 opacity-0 outline-none group-hover/list-item:opacity-100',
          className,
        )}
        render={
          <button type="button" aria-label="More">
            <EllipsisIcon className="size-[22px] text-foreground" />
          </button>
        }
      />
      {menu ? <DropdownMenuContent align="end">{menu}</DropdownMenuContent> : null}
    </DropdownMenu>
  )
}

function ListItemCopyRow({
  className,
  label,
  value,
}: {
  className?: string
  label: string
  value: string
}) {
  return (
    <div data-slot="list-item-copy-row" className={cn('flex min-w-0 items-start gap-2 text-xs', className)}>
      <span className="shrink-0 font-medium leading-[1.5] text-muted-foreground">{label}</span>
      <span className="group/copy flex min-w-0 items-center gap-2">
        <span className="min-w-0 break-all leading-[1.5] text-foreground">{value}</span>
        <CopyTooltip
          value={value}
          className="text-foreground opacity-0 group-hover/copy:opacity-100"
        />
      </span>
    </div>
  )
}

function ListItemMethod({ className, children, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="list-item-method"
      className={cn(
        'inline-flex h-6 min-w-[35px] items-center justify-center overflow-clip rounded border border-border bg-background px-1 text-[10px] font-medium text-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export {
  ListItem,
  ListItemMedia,
  ListItemLogo,
  ListItemBody,
  ListItemTitle,
  ListItemDescription,
  ListItemMeta,
  ListItemDetail,
  ListItemTrailing,
  ListItemHoverActions,
  ListItemAction,
  ListItemActionDivider,
  ListItemMore,
  ListItemCopyRow,
  ListItemMethod,
}
