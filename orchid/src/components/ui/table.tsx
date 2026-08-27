/** Table chrome only. Schema Table / DataTable must compose these primitives. */
import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useRef,
  useState,
  type ComponentProps,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from 'react'
import { ImageIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

type TableCellType = 'Default' | 'Checkbox' | 'Image' | 'Icon' | 'Empty'

type DragSession = {
  key: string
  neighborKey: string | null
  startX: number
  startA: number
  startB: number
  minA: number
  minB: number
  fromStart: boolean
  frame: number
  latestX: number
}

type TableResizeContextValue = {
  enabled: boolean
  widths: Record<string, number>
  beginResize: (clientX: number, key: string, type: TableCellType, wrap: HTMLElement) => void
}

const TableResizeContext = createContext<TableResizeContextValue | null>(null)

const MIN_WIDTH: Record<TableCellType, number> = {
  Default: 120,
  Checkbox: 32,
  Image: 50,
  Icon: 40,
  Empty: 80,
}

const DEFAULT_WIDTH: Record<TableCellType, number> = {
  Default: 160,
  Checkbox: 32,
  Image: 50,
  Icon: 40,
  Empty: 96,
}

function minWidthFor(type: string | undefined) {
  if (type && type in MIN_WIDTH) return MIN_WIDTH[type as TableCellType]
  return MIN_WIDTH.Default
}

function Table({
  className,
  resizable = true,
  ...props
}: ComponentProps<'div'> & { resizable?: boolean }) {
  const [widths, setWidths] = useState<Record<string, number>>({})
  const dragRef = useRef<DragSession | null>(null)

  const beginResize = useCallback(
    (clientX: number, key: string, type: TableCellType, wrap: HTMLElement) => {
      if (!resizable || dragRef.current) return

      const heads = [...wrap.querySelectorAll<HTMLElement>('[data-slot=table-head]')]
      const snapshot: Record<string, number> = {}
      for (const head of heads) {
        const column = head.dataset.column
        if (column) snapshot[column] = head.getBoundingClientRect().width
      }

      const index = heads.findIndex((head) => head.dataset.column === key)
      const fromStart = type === 'Icon'
      const neighbor = fromStart ? heads[index - 1] : heads[index + 1]
      const neighborKey = neighbor?.dataset.column ?? null

      setWidths(snapshot)
      document.body.style.userSelect = 'none'
      document.body.style.cursor = 'col-resize'

      dragRef.current = {
        key,
        neighborKey,
        startX: clientX,
        startA: snapshot[key] ?? DEFAULT_WIDTH[type],
        startB: neighborKey ? snapshot[neighborKey] ?? 0 : 0,
        minA: MIN_WIDTH[type],
        minB: minWidthFor(neighbor?.dataset.type),
        fromStart,
        frame: 0,
        latestX: clientX,
      }

      function apply(nextX: number) {
        const drag = dragRef.current
        if (!drag) return
        const delta = drag.fromStart ? drag.startX - nextX : nextX - drag.startX
        let nextA = Math.round(drag.startA + delta)

        if (drag.neighborKey) {
          const maxA = drag.startA + drag.startB - drag.minB
          nextA = Math.min(Math.max(nextA, drag.minA), maxA)
          const nextB = drag.startA + drag.startB - nextA
          const neighborCol = drag.neighborKey
          setWidths((current) => ({ ...current, [drag.key]: nextA, [neighborCol]: nextB }))
          return
        }

        setWidths((current) => ({ ...current, [drag.key]: Math.max(nextA, drag.minA) }))
      }

      function onMove(move: PointerEvent | MouseEvent) {
        const drag = dragRef.current
        if (!drag) return
        drag.latestX = move.clientX
        if (drag.frame) return
        drag.frame = requestAnimationFrame(() => {
          const active = dragRef.current
          if (!active) return
          active.frame = 0
          apply(active.latestX)
        })
      }

      function onUp() {
        const drag = dragRef.current
        if (drag?.frame) cancelAnimationFrame(drag.frame)
        dragRef.current = null
        document.body.style.userSelect = ''
        document.body.style.cursor = ''
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('mousemove', onMove)
        window.removeEventListener('pointerup', onUp)
        window.removeEventListener('mouseup', onUp)
        window.removeEventListener('pointercancel', onUp)
      }

      window.addEventListener('pointermove', onMove)
      window.addEventListener('mousemove', onMove)
      window.addEventListener('pointerup', onUp)
      window.addEventListener('mouseup', onUp)
      window.addEventListener('pointercancel', onUp)
    },
    [resizable],
  )

  return (
    <TableResizeContext.Provider value={{ enabled: resizable, widths, beginResize }}>
      <div
        data-slot="table-wrap"
        role="table"
        className={cn('relative w-full overflow-x-auto rounded-lg border border-solid border-oc-border', className)}
        {...props}
      />
    </TableResizeContext.Provider>
  )
}

function TableHeader({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="table-header"
      role="rowgroup"
      className={cn('w-full min-w-full', className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="table-body"
      role="rowgroup"
      className={cn('w-full min-w-full', className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="table-footer"
      role="rowgroup"
      className={cn('w-full min-w-full bg-oc-neutral font-medium', className)}
      {...props}
    />
  )
}

function TableRow({ className, children, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="table-row"
      role="row"
      className={cn(
        'group/table-row flex w-full min-w-full hover:[&_[data-slot=table-cell]]:bg-oc-neutral',
        className,
      )}
      {...props}
    >
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child
        const element = child as ReactElement<{ columnKey?: string }>
        return cloneElement(element, {
          columnKey: element.props.columnKey ?? `col-${index}`,
        })
      })}
    </div>
  )
}

function columnEdgeClass(type: TableCellType) {
  return type === 'Icon'
    ? 'border-l border-solid border-oc-border'
    : 'border-r border-solid border-oc-border last:border-r-0'
}

function stickyColumnClass(type: TableCellType, surface: 'head' | 'cell') {
  if (type !== 'Checkbox' && type !== 'Icon') return ''
  return cn(
    'sticky z-20',
    type === 'Checkbox' && 'left-0 shadow-[4px_0_8px_rgba(15,23,42,0.06)]',
    type === 'Icon' && 'right-0 shadow-[-4px_0_8px_rgba(15,23,42,0.06)]',
    surface === 'head' && 'bg-oc-neutral',
    surface === 'cell' && 'bg-oc-background group-hover/table-row:bg-oc-neutral',
  )
}

function useColumnSize(key: string, type: TableCellType): CSSProperties {
  const ctx = useContext(TableResizeContext)
  const stored = ctx?.widths[key]
  const width = stored ?? DEFAULT_WIDTH[type]
  const minWidth = MIN_WIDTH[type]
  const flexible = (type === 'Default' || type === 'Empty') && stored == null
  return flexible
    ? { minWidth, flexGrow: 1, flexShrink: 1, flexBasis: 0 }
    : { width, minWidth: width, maxWidth: width, flexGrow: 0, flexShrink: 0, flexBasis: width }
}

function startColumnResize(
  event: { clientX: number; stopPropagation: () => void; currentTarget: EventTarget },
  key: string,
  type: TableCellType,
  beginResize: TableResizeContextValue['beginResize'] | undefined,
) {
  event.stopPropagation()
  const target = event.currentTarget as HTMLElement
  const wrap = target.closest('[data-slot=table-wrap]')
  if (!(wrap instanceof HTMLElement) || !beginResize) return
  beginResize(event.clientX, key, type, wrap)
}

function TableResizeHandle({
  fromStart,
  onResizeStart,
}: {
  fromStart: boolean
  onResizeStart: (event: { clientX: number; stopPropagation: () => void; currentTarget: EventTarget }) => void
}) {
  return (
    <span
      data-slot="table-resize"
      role="separator"
      aria-orientation="vertical"
      aria-label="Resize column"
      className={cn(
        'absolute inset-y-0 z-50 w-4 cursor-col-resize touch-none select-none hover:bg-oc-foreground/10',
        fromStart ? 'left-0 -translate-x-1/2' : 'right-0 translate-x-1/2',
      )}
      onPointerDown={onResizeStart}
      onMouseDown={onResizeStart}
    />
  )
}

function TableHead({
  className,
  type = 'Default',
  columnKey = 'col-0',
  resizable,
  style,
  children,
  ...props
}: ComponentProps<'div'> & {
  type?: TableCellType
  columnKey?: string
  resizable?: boolean
}) {
  const ctx = useContext(TableResizeContext)
  const sizeStyle = useColumnSize(columnKey, type)
  const canResize = (resizable ?? ctx?.enabled) !== false
  const fromStart = type === 'Icon'

  return (
    <div
      data-slot="table-head"
      data-type={type}
      data-column={columnKey}
      role="columnheader"
      className={cn(
        'relative flex h-[34px] items-center bg-oc-neutral font-medium text-[10px] leading-[18px] tracking-[0.3px] text-oc-foreground uppercase',
        'border-b border-solid border-oc-border',
        columnEdgeClass(type),
        type === 'Checkbox' || type === 'Image' || type === 'Icon' ? 'justify-center px-1' : 'justify-start px-3',
        type === 'Checkbox' || type === 'Image' || type === 'Icon' ? 'shrink-0' : 'min-w-0',
        stickyColumnClass(type, 'head'),
        className,
      )}
      {...props}
      style={{ ...style, ...sizeStyle }}
    >
      {type === 'Default' || type === 'Empty' ? (
        <span className="min-w-0 truncate">{children}</span>
      ) : (
        children
      )}
      {canResize ? (
        <TableResizeHandle
          fromStart={fromStart}
          onResizeStart={(event) => startColumnResize(event, columnKey, type, ctx?.beginResize)}
        />
      ) : null}
    </div>
  )
}

function TableCell({
  className,
  type = 'Default',
  columnKey = 'col-0',
  children,
  style,
  ...props
}: ComponentProps<'div'> & {
  type?: TableCellType
  columnKey?: string
}) {
  const sizeStyle = useColumnSize(columnKey, type)

  return (
    <div
      data-slot="table-cell"
      data-type={type}
      data-column={columnKey}
      role="cell"
      className={cn(
        'relative flex min-h-11 items-center bg-oc-background text-[13px] leading-[1.5] text-oc-foreground',
        'border-b border-solid border-oc-border',
        columnEdgeClass(type),
        type === 'Checkbox' || type === 'Image' || type === 'Icon' ? 'justify-center px-1' : 'justify-start px-3',
        type === 'Checkbox' || type === 'Image' || type === 'Icon' ? 'shrink-0' : 'min-w-0',
        type === 'Icon' &&
          '[&>*]:opacity-0 group-hover/table-row:[&>*]:opacity-100 group-focus-within/table-row:[&>*]:opacity-100 has-[[data-popup-open]]:[&>*]:opacity-100',
        stickyColumnClass(type, 'cell'),
        className,
      )}
      {...props}
      style={{ ...style, ...sizeStyle }}
    >
      {type === 'Empty' && children == null ? '–' : children}
    </div>
  )
}

function TableCaption({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="table-caption"
      className={cn('mt-4 text-sm text-oc-muted-foreground', className)}
      {...props}
    />
  )
}

function TableCellImage({
  className,
  src,
  alt = '',
  ...props
}: ComponentProps<'span'> & { src?: string; alt?: string }) {
  return (
    <span
      data-slot="table-cell-image"
      className={cn(
        'inline-flex size-9 shrink-0 items-center justify-center overflow-clip rounded bg-oc-muted',
        className,
      )}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt} className="size-full object-cover" />
      ) : (
        <ImageIcon className="size-4 text-oc-muted-foreground" />
      )}
    </span>
  )
}

function TableCellText({
  className,
  icon,
  children,
  ...props
}: ComponentProps<'span'> & { icon?: ReactNode }) {
  return (
    <span
      data-slot="table-cell-text"
      className={cn('flex min-w-0 items-center gap-1', className)}
      {...props}
    >
      {icon ? (
        <span className="inline-flex size-4 shrink-0 items-center justify-center [&_svg]:size-4">
          {icon}
        </span>
      ) : null}
      <span className="min-w-0 truncate">{children}</span>
    </span>
  )
}

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableCellImage,
  TableCellText,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
}
