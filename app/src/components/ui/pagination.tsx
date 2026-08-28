import type { ComponentProps } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function Pagination({ className, ...props }: ComponentProps<'nav'>) {
  return (
    <nav
      data-slot="pagination"
      aria-label="Pagination"
      className={cn('flex w-full items-center justify-center gap-5', className)}
      {...props}
    />
  )
}

function PaginationContent({ className, ...props }: ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn('flex h-9 flex-wrap items-center gap-2', className)}
      {...props}
    />
  )
}

function PaginationItem({ className, ...props }: ComponentProps<'li'>) {
  return <li data-slot="pagination-item" className={cn('list-none', className)} {...props} />
}

const paginationLinkClass =
  'inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded px-0.5 py-2 text-[13px] leading-[1.5] font-normal text-oc-muted-foreground outline-none select-none hover:bg-oc-neutral hover:text-oc-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'

function PaginationLink({
  className,
  isActive,
  ...props
}: ComponentProps<'button'> & {
  isActive?: boolean
}) {
  return (
    <button
      type="button"
      data-slot="pagination-link"
      data-active={isActive || undefined}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        paginationLinkClass,
        isActive && 'bg-oc-neutral-soft font-medium text-oc-foreground hover:bg-oc-neutral-soft',
        className,
      )}
      {...props}
    />
  )
}

function PaginationPrevious({
  className,
  children = 'Prev',
  ...props
}: ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      className={cn('h-9 w-auto gap-0.5 px-0.5', className)}
      {...props}
    >
      <ChevronLeftIcon className="size-3.5" />
      {children}
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  children = 'Next',
  ...props
}: ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      className={cn('h-9 w-auto gap-0.5 px-0.5', className)}
      {...props}
    >
      {children}
      <ChevronRightIcon className="size-3.5" />
    </PaginationLink>
  )
}

function PaginationEllipsis({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="pagination-ellipsis"
      role="presentation"
      aria-hidden
      className={cn(
        'inline-flex size-9 items-center justify-center rounded text-[13px] leading-[1.5] font-normal text-oc-muted-foreground',
        className,
      )}
      {...props}
    >
      ...
      <span className="sr-only">More pages</span>
    </span>
  )
}

function PaginationInfo({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p
      data-slot="pagination-info"
      className={cn('text-sm leading-[1.5] text-oc-muted-foreground', className)}
      {...props}
    />
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationInfo,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
