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
import { Button } from './button'

type DataTableCellType = 'Default' | 'Checkbox' | 'Image' | 'Icon' | 'Empty'

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

type DataTableResizeContextValue = {
  enabled: boolean
  widths: Record<string, number>
  beginResize: (clientX: number, key: string, type: DataTableCellType, wrap: HTMLElement) => void
}

const DataTableResizeContext = createContext<DataTableResizeContextValue | null>(null)

const MIN_WIDTH: Record<DataTableCellType, number> = {
  Default: 120,
  Checkbox: 32,
  Image: 50,
  Icon: 40,
  Empty: 80,
}

const DEFAULT_WIDTH: Record<DataTableCellType, number> = {
  Default: 160,
  Checkbox: 32,
  Image: 50,
  Icon: 40,
  Empty: 96,
}

function minWidthFor(type: string | undefined) {
  if (type && type in MIN_WIDTH) return MIN_WIDTH[type as DataTableCellType]
  return MIN_WIDTH.Default
}

function DataTable({
  className,
  resizable = true,
  ...props
}: ComponentProps<'div'> & { resizable?: boolean }) {
  const [widths, setWidths] = useState<Record<string, number>>({})
  const dragRef = useRef<DragSession | null>(null)

  const beginResize = useCallback(
    (clientX: number, key: string, type: DataTableCellType, wrap: HTMLElement) => {
      if (!resizable || dragRef.current) return

      const heads = [...wrap.querySelectorAll<HTMLElement>('[data-slot=data-table-head]')]
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
    <DataTableResizeContext.Provider value={{ enabled: resizable, widths, beginResize }}>
      <div
        data-slot="data-table-wrap"
        role="table"
        className={cn('relative w-full overflow-x-auto rounded-lg border border-solid border-oc-border', className)}
        {...props}
      />
    </DataTableResizeContext.Provider>
  )
}

function DataTableSelectionBar({
  className,
  count,
  onDeselectAll,
  children,
  ...props
}: ComponentProps<'div'> & {
  count: number
  onDeselectAll?: () => void
}) {
  const label = count === 1 ? '1 item selected' : `${count} items selected`

  return (
    <div
      data-slot="data-table-selection-bar"
      className={cn(
        'sticky left-0 z-30 flex min-h-11 w-full items-center justify-between gap-3 border-b border-solid border-oc-border bg-oc-background px-3',
        className,
      )}
      {...props}
    >
      <div className="flex min-w-0 items-center gap-2 text-[13px] leading-normal">
        <span className="font-medium text-oc-foreground">{label}</span>
        {onDeselectAll ? (
          <Button variant="Secondary" style="Transparent" size="Small" onClick={onDeselectAll}>
            Deselect All
          </Button>
        ) : null}
      </div>
      {children ? <div className="flex shrink-0 items-center gap-1">{children}</div> : null}
    </div>
  )
}

function DataTableToolbar({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="data-table-toolbar"
      className={cn(
        'sticky left-0 z-30 flex min-h-11 w-full items-center justify-between gap-3 border-b border-solid border-oc-border bg-oc-background px-3',
        className,
      )}
      {...props}
    />
  )
}

function DataTableHeader({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="data-table-header"
      role="rowgroup"
      className={cn('w-full min-w-full', className)}
      {...props}
    />
  )
}

function DataTableBody({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="data-table-body"
      role="rowgroup"
      className={cn('w-full min-w-full', className)}
      {...props}
    />
  )
}

function DataTableEmpty({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="data-table-empty"
      className={cn(
        'flex min-h-64 w-full flex-col items-center justify-center border-t-0 px-4 py-16',
        className,
      )}
      {...props}
    />
  )
}

function DataTableFooter({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="data-table-footer"
      role="rowgroup"
      className={cn('w-full min-w-full bg-oc-neutral font-medium', className)}
      {...props}
    />
  )
}

function DataTableRow({ className, children, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="data-table-row"
      role="row"
      className={cn(
        'group/data-table-row flex w-full min-w-full hover:**:data-[slot=data-table-cell]:bg-oc-neutral',
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

function columnEdgeClass(type: DataTableCellType) {
  return type === 'Icon'
    ? 'border-l border-solid border-oc-border'
    : 'border-r border-solid border-oc-border last:border-r-0'
}

function stickyColumnClass(type: DataTableCellType, surface: 'head' | 'cell') {
  if (type !== 'Checkbox' && type !== 'Icon') return ''
  return cn(
    'sticky z-20',
    type === 'Checkbox' && 'left-0 shadow-[4px_0_8px_rgba(15,23,42,0.06)]',
    type === 'Icon' && 'right-0 shadow-[-4px_0_8px_rgba(15,23,42,0.06)]',
    surface === 'head' && 'bg-oc-neutral',
    surface === 'cell' && 'bg-oc-background group-hover/data-table-row:bg-oc-neutral',
  )
}

function useColumnSize(key: string, type: DataTableCellType): CSSProperties {
  const ctx = useContext(DataTableResizeContext)
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
  type: DataTableCellType,
  beginResize: DataTableResizeContextValue['beginResize'] | undefined,
) {
  event.stopPropagation()
  const target = event.currentTarget as HTMLElement
  const wrap = target.closest('[data-slot=data-table-wrap]')
  if (!(wrap instanceof HTMLElement) || !beginResize) return
  beginResize(event.clientX, key, type, wrap)
}

function DataTableResizeHandle({
  fromStart,
  onResizeStart,
}: {
  fromStart: boolean
  onResizeStart: (event: { clientX: number; stopPropagation: () => void; currentTarget: EventTarget }) => void
}) {
  return (
    <span
      data-slot="data-table-resize"
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

function DataTableHead({
  className,
  type = 'Default',
  columnKey = 'col-0',
  resizable,
  style,
  children,
  ...props
}: ComponentProps<'div'> & {
  type?: DataTableCellType
  columnKey?: string
  resizable?: boolean
}) {
  const ctx = useContext(DataTableResizeContext)
  const sizeStyle = useColumnSize(columnKey, type)
  const canResize = (resizable ?? ctx?.enabled) !== false
  const fromStart = type === 'Icon'

  return (
    <div
      data-slot="data-table-head"
      data-type={type}
      data-column={columnKey}
      role="columnheader"
      className={cn(
        'relative flex h-8.5 items-center bg-oc-neutral text-[10px] leading-4.5 font-medium tracking-[0.3px] text-oc-foreground uppercase',
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
        <DataTableResizeHandle
          fromStart={fromStart}
          onResizeStart={(event) => startColumnResize(event, columnKey, type, ctx?.beginResize)}
        />
      ) : null}
    </div>
  )
}

function DataTableCell({
  className,
  type = 'Default',
  columnKey = 'col-0',
  children,
  style,
  ...props
}: ComponentProps<'div'> & {
  type?: DataTableCellType
  columnKey?: string
}) {
  const sizeStyle = useColumnSize(columnKey, type)

  return (
    <div
      data-slot="data-table-cell"
      data-type={type}
      data-column={columnKey}
      role="cell"
      className={cn(
        'relative flex min-h-11 items-center bg-oc-background text-[13px] leading-normal text-oc-foreground',
        'border-b border-solid border-oc-border',
        columnEdgeClass(type),
        type === 'Checkbox' || type === 'Image' || type === 'Icon' ? 'justify-center px-1' : 'justify-start px-3',
        type === 'Checkbox' || type === 'Image' || type === 'Icon' ? 'shrink-0' : 'min-w-0',
        type === 'Icon' &&
          '*:opacity-0 group-hover/data-table-row:*:opacity-100 group-focus-within/data-table-row:*:opacity-100 has-data-popup-open:*:opacity-100',
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

function DataTableCaption({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="data-table-caption"
      className={cn('mt-4 text-sm text-oc-muted-foreground', className)}
      {...props}
    />
  )
}

function DataTableCellImage({
  className,
  src,
  alt = '',
  ...props
}: ComponentProps<'span'> & { src?: string; alt?: string }) {
  return (
    <span
      data-slot="data-table-cell-image"
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

function DataTableCellText({
  className,
  icon,
  children,
  ...props
}: ComponentProps<'span'> & { icon?: ReactNode }) {
  return (
    <span
      data-slot="data-table-cell-text"
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
  DataTable,
  DataTableBody,
  DataTableCaption,
  DataTableCell,
  DataTableCellImage,
  DataTableCellText,
  DataTableEmpty,
  DataTableFooter,
  DataTableHead,
  DataTableHeader,
  DataTableRow,
  DataTableSelectionBar,
  DataTableToolbar,
}
