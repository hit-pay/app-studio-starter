import type { ComponentProps, ReactNode } from 'react'
import { ChevronRightIcon, EllipsisIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function Breadcrumb({ className, ...props }: ComponentProps<'nav'>) {
  return (
    <nav
      data-slot="breadcrumb"
      aria-label="Breadcrumb"
      className={cn('min-w-0', className)}
      {...props}
    />
  )
}

function BreadcrumbList({ className, ...props }: ComponentProps<'ol'>) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn('flex min-w-0 flex-wrap items-center gap-1 text-sm leading-[1.5]', className)}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: ComponentProps<'li'>) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn('inline-flex min-w-0 items-center gap-1', className)}
      {...props}
    />
  )
}

function BreadcrumbLink({ className, ...props }: ComponentProps<'a'>) {
  return (
    <a
      data-slot="breadcrumb-link"
      className={cn(
        'min-w-0 truncate font-medium text-oc-muted-foreground outline-none hover:text-oc-foreground',
        className,
      )}
      {...props}
    />
  )
}

function BreadcrumbPage({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="breadcrumb-page"
      aria-current="page"
      className={cn('min-w-0 truncate font-medium text-oc-foreground', className)}
      {...props}
    />
  )
}

function BreadcrumbSeparator({
  className,
  children,
  ...props
}: ComponentProps<'li'> & { children?: ReactNode }) {
  return (
    <li
      data-slot="breadcrumb-separator"
      aria-hidden
      className={cn('inline-flex shrink-0 items-center text-oc-muted-foreground', className)}
      {...props}
    >
      {children ?? <ChevronRightIcon className="size-4" />}
    </li>
  )
}

function BreadcrumbEllipsis({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden
      className={cn('inline-flex size-6 items-center justify-center text-oc-muted-foreground', className)}
      {...props}
    >
      <EllipsisIcon className="size-4" />
      <span className="sr-only">More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
