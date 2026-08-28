import { useMemo, useState, type ComponentProps, type ReactNode } from 'react'
import {
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  CircleIcon,
  EllipsisVerticalIcon,
  GripVerticalIcon,
  ListFilterIcon,
  PencilIcon,
  SearchIcon,
  Settings2Icon,
  Trash2Icon,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { Badge, BadgeRemove } from './badge'
import { Button } from './button'
import { Checkbox } from './checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu'
import { Empty, EmptyContent, EmptyHeader, EmptyMedia, EmptyTitle } from './empty'
import { Field, FieldLabel } from './field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from './input-group'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './pagination'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select'
import {
  Table,
  TableBody,
  TableCell,
  TableCellImage,
  TableCellText,
  TableEmpty,
  TableHead,
  TableHeader,
  TableRow,
  TableSelectionBar,
  TableToolbar,
} from './table'
import {
  SCHEMA_TABLE_EXAMPLE_ROWS,
  SCHEMA_TABLE_EXAMPLE_SCHEMA,
  defaultColumnOrder,
  defaultHiddenKeys,
  defaultSchemaTableQuery,
  formatAmount,
  formatDate,
  moveColumn,
  orderedVisibleColumns,
  paginationItems,
  queryTable,
  syncColumnOrder,
  type SchemaTableColumn,
  type SchemaTableFilter,
  type SchemaTableQuery,
  type SchemaTableRow,
  type SchemaTableRowAction,
  type SchemaTableSchema,
} from './schema-table-model'

type SchemaTableApi = {
  schema: SchemaTableSchema
  data: SchemaTableRow[]
  query: SchemaTableQuery
  rows: SchemaTableRow[]
  filteredCount: number
  pageCount: number
  page: number
  pageSize: number
  selected: string[]
  setSearch: (search: string) => void
  setTab: (tab: string) => void
  setFilters: (filters: Record<string, string>) => void
  setSort: (sortKey: string, sortDir?: 'asc' | 'desc') => void
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
  clearAll: () => void
  clearSelection: () => void
  toggleRow: (id: string) => void
  togglePage: () => void
  visibleColumns: SchemaTableColumn[]
  columnOrder: string[]
  hiddenKeys: string[]
  toggleColumnVisibility: (key: string) => void
  reorderColumns: (fromKey: string, toKey: string) => void
}

function mergeQuery(current: SchemaTableQuery, patch: Partial<SchemaTableQuery>): SchemaTableQuery {
  const next = { ...current, ...patch }
  const resetPage =
    patch.search != null ||
    patch.tab != null ||
    patch.filters != null ||
    patch.sortKey != null ||
    patch.sortDir != null ||
    patch.pageSize != null
  if (resetPage && patch.page == null) next.page = 1
  return next
}

function useSchemaTable({
  schema,
  data,
  total,
  onQueryChange,
}: {
  schema: SchemaTableSchema
  data: SchemaTableRow[]
  total?: number
  onQueryChange?: (query: SchemaTableQuery) => void
}): SchemaTableApi {
  const [query, setQuery] = useState(() => defaultSchemaTableQuery(schema))
  const [selected, setSelected] = useState<string[]>([])
  const [columnOrder, setColumnOrder] = useState(() => defaultColumnOrder(schema))
  const [hiddenKeys, setHiddenKeys] = useState(() => defaultHiddenKeys(schema))

  const order = syncColumnOrder(schema, columnOrder)
  const visibleColumns = useMemo(
    () => orderedVisibleColumns(schema, order, hiddenKeys),
    [schema, order, hiddenKeys],
  )

  function update(patch: Partial<SchemaTableQuery>) {
    setQuery((current) => {
      const next = mergeQuery(current, patch)
      onQueryChange?.(next)
      return next
    })
  }

  const result = useMemo(
    () => queryTable({ schema, data, query, total }),
    [schema, data, query, total],
  )

  const pageIds = result.rows.map((row) => row.id)
  const selectedOnPage = pageIds.filter((id) => selected.includes(id))

  return {
    schema,
    data,
    query,
    ...result,
    selected,
    setSearch: (search) => update({ search }),
    setTab: (tab) => update({ tab }),
    setFilters: (filters) => update({ filters }),
    setSort: (sortKey, sortDir) => update({ sortKey, sortDir: sortDir ?? query.sortDir }),
    setPage: (page) => update({ page }),
    setPageSize: (pageSize) => update({ pageSize }),
    clearAll: () => update({ search: '', filters: {} }),
    clearSelection: () => setSelected([]),
    toggleRow: (id) =>
      setSelected((current) =>
        current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
      ),
    togglePage: () =>
      setSelected((current) =>
        selectedOnPage.length === pageIds.length
          ? current.filter((id) => !pageIds.includes(id))
          : [...new Set([...current, ...pageIds])],
      ),
    visibleColumns,
    columnOrder: order,
    hiddenKeys,
    toggleColumnVisibility: (key) => {
      const column = schema.columns.find((item) => item.key === key)
      if (!column || column.locked) return
      setHiddenKeys((current) =>
        current.includes(key) ? current.filter((item) => item !== key) : [...current, key],
      )
    },
    reorderColumns: (fromKey, toKey) => {
      setColumnOrder((current) => moveColumn(syncColumnOrder(schema, current), fromKey, toKey))
    },
  }
}

function ToolbarIcon({
  label,
  active,
  children,
  className,
  ...props
}: {
  label: string
  active?: boolean
  children: ReactNode
} & Omit<ComponentProps<typeof Button>, 'children' | 'variant' | 'style' | 'size' | 'iconOnly'>) {
  return (
    <Button
      variant="Secondary"
      style="Border"
      size="Small"
      iconOnly
      aria-label={label}
      aria-pressed={active}
      className={cn(active && 'border-oc-primary text-oc-primary', className)}
      {...props}
    >
      {children}
    </Button>
  )
}

function cellContent(column: SchemaTableColumn, row: SchemaTableRow) {
  const value = row[column.key]
  if (column.type === 'image') {
    return (
      <TableCellImage
        alt={String(row.name ?? '')}
        src={typeof value === 'string' ? value : undefined}
      />
    )
  }
  if (column.type === 'amount') return <TableCellText>{formatAmount(value)}</TableCellText>
  if (column.type === 'date') return <TableCellText>{formatDate(value)}</TableCellText>
  if (column.type === 'status') {
    const label = String(value ?? '')
    return (
      <Badge tone={label === 'Published' ? 'green' : 'grey'}>
        {label || '–'}
      </Badge>
    )
  }
  return (
    <TableCellText icon={column.icon ? <CircleIcon /> : undefined}>
      {value == null || value === '' ? 'N/A' : String(value)}
    </TableCellText>
  )
}

function tableCellType(column: SchemaTableColumn) {
  return column.type === 'image' ? 'Image' : 'Default'
}

function filterLabel(filter: SchemaTableFilter, value: string) {
  return filter.options.find((option) => option.value === value)?.label ?? value
}

function SchemaTableSearch({ table }: { table: SchemaTableApi }) {
  const config = table.schema.search
  if (config === false) return null
  const [open, setOpen] = useState(Boolean(table.query.search))
  const placeholder = config?.placeholder ?? 'Search'

  if (!open) {
    return (
      <ToolbarIcon label="Search" onClick={() => setOpen(true)}>
        <SearchIcon />
      </ToolbarIcon>
    )
  }

  return (
    <div className="flex min-w-40 flex-1 items-center gap-2 sm:max-w-xs">
      <InputGroup>
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput
          autoFocus
          value={table.query.search}
          placeholder={placeholder}
          onChange={(event) => table.setSearch(event.target.value)}
        />
      </InputGroup>
      <InputGroupButton
        type="button"
        onClick={() => {
          table.setSearch('')
          setOpen(false)
        }}
      >
        Clear
      </InputGroupButton>
    </div>
  )
}

function SchemaTableFilterPopover({ table }: { table: SchemaTableApi }) {
  const filters = table.schema.filters
  if (!filters?.length) return null
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState(table.query.filters)
  const active = Object.values(table.query.filters).some(Boolean)
  const preview = queryTable({
    schema: table.schema,
    data: table.data,
    query: { ...table.query, filters: draft, page: 1 },
  })
  const countLabel = `${preview.filteredCount} result${preview.filteredCount === 1 ? '' : 's'}`

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (next) setDraft(table.query.filters)
      }}
    >
      <PopoverTrigger
        nativeButton
        render={
          <Button
            variant="Secondary"
            style="Border"
            size="Small"
            iconOnly
            aria-label="Filter"
            aria-pressed={active || open}
            className={active || open ? 'border-oc-primary text-oc-primary' : undefined}
          >
            <ListFilterIcon />
          </Button>
        }
      />
      <PopoverContent align="end" className="w-70 gap-3 p-3">
        {filters.map((filter) => (
          <Field key={filter.key}>
            <FieldLabel>{filter.title}</FieldLabel>
            <Select
              value={draft[filter.key] || null}
              onValueChange={(value) =>
                setDraft((current) => ({ ...current, [filter.key]: String(value ?? '') }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder={filter.title} />
              </SelectTrigger>
              <SelectContent>
                {filter.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        ))}
        <div className="flex gap-2 pt-1">
          <Button variant="Secondary" style="Border" className="flex-1" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="Primary"
            className="flex-1"
            onClick={() => {
              table.setFilters(draft)
              setOpen(false)
            }}
          >
            {countLabel}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

function SchemaTableSortMenu({ table }: { table: SchemaTableApi }) {
  const sort = table.schema.sort
  if (sort === false || !sort?.fields.length) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        nativeButton
        render={
          <Button
            variant="Secondary"
            style="Border"
            size="Small"
            iconOnly
            aria-label="Sort"
          >
            <ArrowUpDownIcon />
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={table.query.sortKey ?? ''}
            onValueChange={(value) => table.setSort(String(value))}
          >
            {sort.fields.map((field) => (
              <DropdownMenuRadioItem key={field.key} value={field.key}>
                {field.title}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={table.query.sortDir}
          onValueChange={(value) => {
            if (table.query.sortKey) table.setSort(table.query.sortKey, value as 'asc' | 'desc')
          }}
        >
          <DropdownMenuRadioItem value="asc">
            <ArrowDownIcon />
            Ascending
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="desc">
            <ArrowUpIcon />
            Descending
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function SchemaTableEditColumns({ table }: { table: SchemaTableApi }) {
  const [open, setOpen] = useState(false)
  const [dragKey, setDragKey] = useState<string | null>(null)

  if (table.schema.editColumns === false) return null
  const locked = table.schema.columns.filter((column) => column.locked)
  const byKey = new Map(table.schema.columns.map((column) => [column.key, column]))
  const active = table.columnOrder
    .map((key) => byKey.get(key))
    .filter((column): column is SchemaTableColumn => column != null && !column.locked)
  const hidden = new Set(table.hiddenKeys)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        nativeButton
        render={
          <Button
            variant="Secondary"
            style="Border"
            size="Small"
            aria-label="Edit column"
            aria-pressed={open}
            className={cn('max-sm:size-7 max-sm:min-w-7 max-sm:px-0', open && 'border-oc-primary text-oc-primary')}
          >
            <Settings2Icon />
            <span className="hidden sm:inline">Edit Column</span>
          </Button>
        }
      />
      <PopoverContent align="end" className="max-h-80 w-72 gap-0 overflow-y-auto p-2">
        {locked.length > 0 ? (
          <div className="flex flex-col gap-0.5 pb-1">
            <p className="px-2 py-1 text-[10px] leading-4.5 font-medium tracking-[0.3px] text-oc-muted-foreground uppercase">
              Fixed columns
            </p>
            {locked.map((column) => (
              <div
                key={column.key}
                className="flex min-h-8 items-center px-2 text-xs text-oc-foreground"
              >
                {column.title}
              </div>
            ))}
          </div>
        ) : null}
        {locked.length > 0 && active.length > 0 ? (
          <div className="my-1 h-px bg-oc-border" />
        ) : null}
        {active.length > 0 ? (
          <div className="flex flex-col gap-0.5">
            <p className="px-2 py-1 text-[10px] leading-4.5 font-medium tracking-[0.3px] text-oc-muted-foreground uppercase">
              Active columns
            </p>
            {active.map((column) => {
              const visible = !hidden.has(column.key)
              return (
                <div
                  key={column.key}
                  draggable
                  onDragStart={() => setDragKey(column.key)}
                  onDragEnd={() => setDragKey(null)}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={() => {
                    if (dragKey) table.reorderColumns(dragKey, column.key)
                    setDragKey(null)
                  }}
                  className={cn(
                    'flex min-h-8 cursor-grab items-center gap-2 rounded-md px-2 text-xs text-oc-foreground active:cursor-grabbing',
                    dragKey === column.key && 'opacity-50',
                  )}
                >
                  <Checkbox
                    checked={visible}
                    aria-label={column.title}
                    onCheckedChange={() => table.toggleColumnVisibility(column.key)}
                    onPointerDown={(event) => event.stopPropagation()}
                  />
                  <span className="min-w-0 flex-1">{column.title}</span>
                  <GripVerticalIcon className="size-3.5 shrink-0 text-oc-muted-foreground" />
                </div>
              )
            })}
          </div>
        ) : null}
      </PopoverContent>
    </Popover>
  )
}

function SchemaTableChips({ table }: { table: SchemaTableApi }) {
  const chips: Array<{ key: string; label: string; onRemove: () => void }> = []
  if (table.query.search.trim()) {
    chips.push({
      key: 'search',
      label: `Search for: ${table.query.search.trim()}`,
      onRemove: () => table.setSearch(''),
    })
  }
  for (const filter of table.schema.filters ?? []) {
    const value = table.query.filters[filter.key]
    if (!value) continue
    chips.push({
      key: filter.key,
      label: `${filter.title} : ${filterLabel(filter, value)}`,
      onRemove: () => {
        const next = { ...table.query.filters }
        delete next[filter.key]
        table.setFilters(next)
      },
    })
  }
  if (chips.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-solid border-oc-border px-3 py-2">
      {chips.map((chip) => (
        <Badge key={chip.key} tone="grey">
          {chip.label}
          <BadgeRemove onClick={chip.onRemove} />
        </Badge>
      ))}
      <Button variant="Secondary" style="Transparent" size="Small" onClick={table.clearAll}>
        Clear all
      </Button>
    </div>
  )
}

function SchemaTableTabs({ table }: { table: SchemaTableApi }) {
  const tabs = table.schema.tabs
  if (!tabs?.length) return <span />

  return (
    <>
      <div className="min-w-0 max-w-44 md:hidden">
        <Select
          value={table.query.tab}
          onValueChange={(value) => {
            if (value) table.setTab(String(value))
          }}
        >
          <SelectTrigger className="h-7 text-xs" aria-label="Filter">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {tabs.map((tab) => (
              <SelectItem key={tab.key} value={tab.key}>
                {tab.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="hidden min-w-0 flex-wrap gap-1 md:flex">
        {tabs.map((tab) => (
          <Button
            key={tab.key}
            variant="Secondary"
            style={table.query.tab === tab.key ? 'Default' : 'Transparent'}
            size="Small"
            onClick={() => table.setTab(tab.key)}
          >
            {tab.title}
          </Button>
        ))}
      </div>
    </>
  )
}

function SchemaTable({
  table,
  onRowAction,
  selectionActions,
  emptyActions,
  className,
}: {
  table: SchemaTableApi
  onRowAction?: (action: SchemaTableRowAction, row: SchemaTableRow) => void
  selectionActions?: ReactNode
  emptyActions?: ReactNode
  className?: string
}) {
  const columns = table.visibleColumns
  const actions = table.schema.rowActions === false ? [] : (table.schema.rowActions ?? [])
  const pageIds = table.rows.map((row) => row.id)
  const selectedOnPage = pageIds.filter((id) => table.selected.includes(id))
  const allSelected = pageIds.length > 0 && selectedOnPage.length === pageIds.length
  const someSelected = selectedOnPage.length > 0 && !allSelected
  const pages = paginationItems(table.page, table.pageCount)
  const pageSizes =
    table.schema.pagination === false ? [] : (table.schema.pagination?.pageSizes ?? [10, 20, 50])

  return (
    <div data-slot="schema-table" className={cn('flex flex-col gap-3', className)}>
      <Table>
        {table.selected.length > 0 ? (
          <TableSelectionBar count={table.selected.length} onDeselectAll={table.clearSelection}>
            {selectionActions}
          </TableSelectionBar>
        ) : (
          <TableToolbar>
            {table.schema.tabs?.length ? <SchemaTableTabs table={table} /> : <span />}
            <div className="flex min-w-0 items-center justify-end gap-2">
              <SchemaTableSearch table={table} />
              <SchemaTableFilterPopover table={table} />
              <SchemaTableSortMenu table={table} />
              <SchemaTableEditColumns table={table} />
            </div>
          </TableToolbar>
        )}
        {table.selected.length === 0 ? <SchemaTableChips table={table} /> : null}
        <TableHeader>
            <TableRow>
              {table.schema.selection ? (
                <TableHead type="Checkbox">
                  <Checkbox
                    aria-label="Select page"
                    checked={allSelected}
                    indeterminate={someSelected}
                    onCheckedChange={() => table.togglePage()}
                  />
                </TableHead>
              ) : null}
              {columns.map((column) => (
                <TableHead key={column.key} type={tableCellType(column) === 'Image' ? 'Image' : 'Default'}>
                  {column.title}
                </TableHead>
              ))}
              {actions.length > 0 ? <TableHead type="Icon" /> : null}
            </TableRow>
          </TableHeader>
          <TableBody>
            {table.rows.length === 0 ? (
              <TableEmpty>
                <Empty>
                  <EmptyHeader>
                    <EmptyMedia variant="search">
                      <SearchIcon />
                    </EmptyMedia>
                    <EmptyTitle>No data to display</EmptyTitle>
                  </EmptyHeader>
                  {emptyActions ? <EmptyContent>{emptyActions}</EmptyContent> : null}
                </Empty>
              </TableEmpty>
            ) : (
              table.rows.map((row) => (
              <TableRow key={row.id}>
                {table.schema.selection ? (
                  <TableCell type="Checkbox">
                    <Checkbox
                      aria-label={`Select ${String(row.name ?? row.id)}`}
                      checked={table.selected.includes(row.id)}
                      onCheckedChange={() => table.toggleRow(row.id)}
                    />
                  </TableCell>
                ) : null}
                {columns.map((column) => (
                  <TableCell key={column.key} type={tableCellType(column)}>
                    {cellContent(column, row)}
                  </TableCell>
                ))}
                {actions.length > 0 ? (
                  <TableCell type="Icon">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        nativeButton
                        className="inline-flex"
                        render={
                          <Button
                            variant="Secondary"
                            style="Transparent"
                            size="Small"
                            iconOnly
                            aria-label={`Actions for ${String(row.name ?? row.id)}`}
                          >
                            <EllipsisVerticalIcon />
                          </Button>
                        }
                      />
                      <DropdownMenuContent align="end">
                        {actions.includes('edit') ? (
                          <DropdownMenuItem onClick={() => onRowAction?.('edit', row)}>
                            <PencilIcon />
                            Edit
                          </DropdownMenuItem>
                        ) : null}
                        {actions.includes('delete') ? (
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => onRowAction?.('delete', row)}
                          >
                            <Trash2Icon />
                            Delete
                          </DropdownMenuItem>
                        ) : null}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                ) : null}
              </TableRow>
            ))
            )}
          </TableBody>
        </Table>
      {table.schema.pagination !== false && table.filteredCount > 0 ? (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="hidden min-w-32 sm:block" />
          <Pagination className="w-auto flex-1">
            <PaginationPrevious
              disabled={table.page <= 1}
              onClick={() => table.setPage(table.page - 1)}
            />
            <PaginationContent>
              {pages.map((item, index) =>
                item === 'ellipsis' ? (
                  <PaginationItem key={`e-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={item}>
                    <PaginationLink isActive={item === table.page} onClick={() => table.setPage(item)}>
                      {item}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}
            </PaginationContent>
            <PaginationNext
              disabled={table.page >= table.pageCount}
              onClick={() => table.setPage(table.page + 1)}
            />
          </Pagination>
          {pageSizes.length > 0 ? (
            <div className="flex items-center gap-2 text-[13px] text-oc-muted-foreground">
              Item per page:
              <Select
                value={String(table.pageSize)}
                onValueChange={(value) => table.setPageSize(Number(value))}
              >
                <SelectTrigger size="Inline">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {pageSizes.map((size) => (
                    <SelectItem key={size} value={String(size)}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export {
  SchemaTable,
  SCHEMA_TABLE_EXAMPLE_ROWS,
  SCHEMA_TABLE_EXAMPLE_SCHEMA,
  useSchemaTable,
  type SchemaTableApi,
  type SchemaTableQuery,
  type SchemaTableRow,
  type SchemaTableSchema,
}
