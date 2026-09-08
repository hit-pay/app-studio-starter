import { type ComponentProps, type ReactNode } from 'react'
import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { CopyButton } from '@/components/ui/copy-button'

type DetailListItem = {
  key: string
  label?: ReactNode
  value: ReactNode
  copyValue?: string
  alignment?: 'horizontal' | 'vertical'
  size?: 'small' | 'big'
  colSpan?: number
  className?: string
}

type DetailListProps = Omit<ComponentProps<'div'>, 'children' | 'style' | 'title'> & {
  items: DetailListItem[]
  title?: ReactNode
  columns?: number
  style?: 'default' | 'border'
}

const boxDetailVariants = cva(
  'flex w-auto min-w-0 max-w-full flex-col rounded-lg border border-solid border-oc-border bg-oc-background',
  {
    variants: {
      style: {
        default: 'gap-4 p-4',
        border: 'gap-px overflow-hidden bg-oc-border',
      },
    },
    defaultVariants: {
      style: 'default',
    },
  },
)

function DetailList({
  className,
  items,
  title,
  columns = 1,
  style = 'default',
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

function DetailListHeader({ title, style }: { title: ReactNode; style: 'default' | 'border' }) {
  return (
    <div
      data-slot="detail-list-header"
      className={cn(
        'flex w-full min-w-0 items-center justify-between gap-3',
        style === 'border' && 'bg-oc-background px-4 py-3',
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
  style: 'default' | 'border'
}) {
  return (
    <div
      data-slot="detail-list-grid"
      className={cn(
        'grid w-full min-w-0',
        style === 'border' ? 'gap-px bg-oc-border' : 'gap-x-6 gap-y-4',
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
      horizontal: 'flex-row items-start justify-between',
      vertical: 'flex-col items-stretch gap-1',
    },
  },
  defaultVariants: {
    alignment: 'horizontal',
  },
})

const boxDetailLabelVariants = cva('shrink-0 leading-[1.5] text-oc-muted-foreground', {
  variants: {
    size: {
      small: 'text-xs',
      big: 'text-sm',
    },
  },
  defaultVariants: {
    size: 'small',
  },
})

const boxDetailValueVariants = cva('min-w-0 leading-[1.5] text-oc-foreground', {
  variants: {
    size: {
      small: 'text-sm',
      big: 'text-base font-medium',
    },
    alignment: {
      horizontal: 'text-right',
      vertical: 'text-left',
    },
  },
  defaultVariants: {
    size: 'small',
    alignment: 'horizontal',
  },
})

function DetailListRow({ item, style }: { item: DetailListItem; style: 'default' | 'border' }) {
  const {
    className,
    label,
    value,
    copyValue,
    alignment = 'horizontal',
    size = 'small',
    colSpan,
  } = item

  return (
    <div
      data-slot="detail-list-row"
      data-alignment={alignment}
      data-size={size}
      className={cn(
        boxDetailRowVariants({ alignment }),
        style === 'border' && 'bg-oc-background p-4',
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
          alignment === 'horizontal' ? 'justify-end' : 'justify-start',
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
