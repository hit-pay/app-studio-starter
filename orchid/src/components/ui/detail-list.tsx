import { createContext, useContext, type ComponentProps, type ReactNode } from 'react'
import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { CopyButton } from './copy-button'

const DetailListTypeContext = createContext<'Default' | 'Border'>('Default')

const boxDetailVariants = cva(
  'flex w-full flex-col rounded-lg border border-solid border-oc-border bg-oc-background',
  {
    variants: {
      type: {
        Default: 'gap-4 p-4',
        Border: 'gap-px overflow-hidden bg-oc-border',
      },
    },
    defaultVariants: {
      type: 'Default',
    },
  },
)

function DetailList({
  className,
  type = 'Default',
  ...props
}: ComponentProps<'div'> & {
  type?: 'Default' | 'Border'
}) {
  return (
    <DetailListTypeContext.Provider value={type}>
      <div
        data-slot="detail-list"
        data-type={type}
        className={cn(boxDetailVariants({ type }), className)}
        {...props}
      />
    </DetailListTypeContext.Provider>
  )
}

function DetailListHeader({ className, ...props }: ComponentProps<'div'>) {
  const type = useContext(DetailListTypeContext)

  return (
    <div
      data-slot="detail-list-header"
      className={cn(
        'flex w-full min-w-0 items-center justify-between gap-3',
        type === 'Border' && 'bg-oc-background px-4 py-3',
        className,
      )}
      {...props}
    />
  )
}

function DetailListGrid({
  className,
  columns = 2,
  style,
  ...props
}: ComponentProps<'div'> & {
  columns?: number
}) {
  const type = useContext(DetailListTypeContext)

  return (
    <div
      data-slot="detail-list-grid"
      className={cn(
        'grid w-full min-w-0',
        type === 'Border' ? 'gap-px bg-oc-border' : 'gap-x-6 gap-y-4',
        className,
      )}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        ...style,
      }}
      {...props}
    />
  )
}

function DetailListTitle({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p
      data-slot="detail-list-title"
      className={cn('min-w-0 text-sm font-medium leading-[1.5] text-oc-foreground', className)}
      {...props}
    />
  )
}

const boxDetailRowVariants = cva('flex w-full min-w-0 gap-3', {
  variants: {
    alignment: {
      Horizontal: 'flex-row items-start justify-between',
      Vertical: 'flex-col items-stretch gap-1',
    },
  },
  defaultVariants: {
    alignment: 'Horizontal',
  },
})

const boxDetailLabelVariants = cva('shrink-0 leading-[1.5] text-oc-muted-foreground', {
  variants: {
    size: {
      Small: 'text-xs',
      Big: 'text-sm',
    },
  },
  defaultVariants: {
    size: 'Small',
  },
})

const boxDetailValueVariants = cva('min-w-0 leading-[1.5] text-oc-foreground', {
  variants: {
    size: {
      Small: 'text-sm',
      Big: 'text-lg font-medium',
    },
    alignment: {
      Horizontal: 'text-right',
      Vertical: 'text-left',
    },
  },
  defaultVariants: {
    size: 'Small',
    alignment: 'Horizontal',
  },
})

function DetailListRow({
  className,
  label,
  children,
  copyValue,
  alignment = 'Horizontal',
  size = 'Small',
  colSpan,
  style,
  ...props
}: ComponentProps<'div'> & {
  label?: string
  copyValue?: string
  alignment?: 'Horizontal' | 'Vertical'
  size?: 'Small' | 'Big'
  colSpan?: number
}) {
  const type = useContext(DetailListTypeContext)

  return (
    <div
      data-slot="detail-list-row"
      data-alignment={alignment}
      data-size={size}
      className={cn(
        boxDetailRowVariants({ alignment }),
        type === 'Border' && 'bg-oc-background p-4',
        className,
      )}
      style={{
        ...(colSpan ? { gridColumn: `span ${colSpan}` } : {}),
        ...style,
      }}
      {...props}
    >
      {label ? <span className={boxDetailLabelVariants({ size })}>{label}</span> : null}
      <span
        className={cn(
          boxDetailValueVariants({ size, alignment }),
          'flex items-start gap-2',
          alignment === 'Horizontal' ? 'justify-end' : 'justify-start',
        )}
      >
        <span className="min-w-0 break-words">{children}</span>
        {copyValue ? <CopyButton value={copyValue} /> : null}
      </span>
    </div>
  )
}

function DetailListValue({
  className,
  children,
  ...props
}: ComponentProps<'span'> & { children?: ReactNode }) {
  return (
    <span data-slot="detail-list-value" className={cn('min-w-0', className)} {...props}>
      {children}
    </span>
  )
}

export {
  DetailList,
  DetailListHeader,
  DetailListGrid,
  DetailListTitle,
  DetailListRow,
  DetailListValue,
}
