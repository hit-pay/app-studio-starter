import { type ComponentProps, type ReactNode } from 'react'
import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { CopyButton } from '@/components/copy-button'

type DetailListItem = {
  key: string
  label?: ReactNode
  value: ReactNode
  copyValue?: string
  alignment?: 'Horizontal' | 'Vertical'
  size?: 'Small' | 'Big'
  colSpan?: number
  className?: string
}

type DetailListProps = Omit<ComponentProps<'div'>, 'children' | 'style' | 'title'> & {
  items: DetailListItem[]
  title?: ReactNode
  columns?: number
  style?: 'Default' | 'Border'
}

const boxDetailVariants = cva(
  'flex w-auto min-w-0 max-w-full flex-col rounded-lg border border-solid border-oc-border bg-oc-background',
  {
    variants: {
      style: {
        Default: 'gap-4 p-4',
        Border: 'gap-px overflow-hidden bg-oc-border',
      },
    },
    defaultVariants: {
      style: 'Default',
    },
  },
)

function DetailList({
  className,
  items,
  title,
  columns = 1,
  style = 'Default',
  ...props
}: DetailListProps) {
  return (
    <div
      data-slot="detail-list"
      data-style={style}
      className={cn(boxDetailVariants({ style }), className)}
      {...props}
    >
      {title !== undefined && title !== null ? (
        <DetailListHeader title={title} style={style} />
      ) : null}
      <DetailListGrid items={items} columns={columns} style={style} />
    </div>
  )
}

function DetailListHeader({ title, style }: { title: ReactNode; style: 'Default' | 'Border' }) {
  return (
    <div
      data-slot="detail-list-header"
      className={cn(
        'flex w-full min-w-0 items-center justify-between gap-3',
        style === 'Border' && 'bg-oc-background px-4 py-3',
      )}
    >
      <p
        data-slot="detail-list-title"
        className="min-w-0 text-sm font-medium leading-[1.5] text-oc-foreground"
      >
        {title}
      </p>
    </div>
  )
}

function DetailListGrid({
  items,
  columns,
  style,
}: {
  items: DetailListItem[]
  columns: number
  style: 'Default' | 'Border'
}) {
  return (
    <div
      data-slot="detail-list-grid"
      className={cn(
        'grid w-full min-w-0',
        style === 'Border' ? 'gap-px bg-oc-border' : 'gap-x-6 gap-y-4',
      )}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {items.map((item) => (
        <DetailListRow key={item.key} item={item} style={style} />
      ))}
    </div>
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

function DetailListRow({ item, style }: { item: DetailListItem; style: 'Default' | 'Border' }) {
  const {
    className,
    label,
    value,
    copyValue,
    alignment = 'Horizontal',
    size = 'Small',
    colSpan,
  } = item

  return (
    <div
      data-slot="detail-list-row"
      data-alignment={alignment}
      data-size={size}
      className={cn(
        boxDetailRowVariants({ alignment }),
        style === 'Border' && 'bg-oc-background p-4',
        className,
      )}
      style={colSpan ? { gridColumn: `span ${colSpan}` } : undefined}
    >
      {label !== undefined && label !== null ? (
        <span className={boxDetailLabelVariants({ size })}>{label}</span>
      ) : null}
      <span
        className={cn(
          boxDetailValueVariants({ size, alignment }),
          'flex items-start gap-2',
          alignment === 'Horizontal' ? 'justify-end' : 'justify-start',
        )}
      >
        <span className="min-w-0 break-words">{value}</span>
        {copyValue !== undefined ? <CopyButton value={copyValue} /> : null}
      </span>
    </div>
  )
}

export { DetailList }
export type { DetailListItem, DetailListProps }
