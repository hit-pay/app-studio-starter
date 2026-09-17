'use client'

import * as React from 'react'

import {
  SchemaTable,
  useSchemaTable,
  type SchemaTableCells,
  type SchemaTableQuery,
  type SchemaTableRow,
  type SchemaTableActionItem,
} from '@/components/displaying-data/data-table'
import type { SchemaTableRowAction } from '@/components/displaying-data/data-table-model'
import {
  buildResourcePickerFilterFields,
  ResourcePickerFilterMenu,
} from '@/components/form/resource-picker-filter-form'
import type { ResourcePickerLoad, ResourcePickerType } from '@/components/form/resource-picker'
import {
  resourceCatalogFiltersActive,
  RESOURCE_EXTRA_FILTERS,
  RESOURCE_STATUS_FILTERS,
} from '@/lib/resource-catalog'
import { estimateListTotal, resourcePickerItemsToRows } from '@/lib/resource-list-map'
import { resourceListSchema } from '@/lib/resource-list-schema'
import { Spinner } from '@ui/spinner'
import { cn } from '@/lib/utils'

const ResourceListLoadContext = React.createContext<ResourcePickerLoad | null>(null)

function resourceListLoadInput(
  type: ResourcePickerType,
  query: SchemaTableQuery,
  status: string,
  extras: Record<string, string>,
  cursor?: string,
): Parameters<ResourcePickerLoad>[0] {
  return {
    type,
    query: query.search.trim(),
    filter: status,
    extras,
    page: query.page,
    cursor,
  }
}

function listQuerySignature(
  type: ResourcePickerType,
  query: SchemaTableQuery,
  status: string,
  extras: Record<string, string>,
) {
  return JSON.stringify({
    type,
    search: query.search,
    page: query.page,
    pageSize: query.pageSize,
    status,
    extras,
  })
}

function ResourceListProvider({
  children,
  load,
}: {
  children: React.ReactNode
  load: ResourcePickerLoad
}) {
  return (
    <ResourceListLoadContext.Provider value={load}>{children}</ResourceListLoadContext.Provider>
  )
}

function useResourceListLoad() {
  const load = React.useContext(ResourceListLoadContext)
  if (!load) {
    throw new Error('useResourceListLoad must be used within ResourceListProvider.')
  }
  return load
}

type ResourceListProps = {
  type: ResourcePickerType
  className?: string
  cells?: SchemaTableCells
  onRowAction?: (action: SchemaTableRowAction, row: SchemaTableRow) => void
  onRowClick?: (row: SchemaTableRow) => void
  onSelectionAction?: (action: SchemaTableActionItem, selectedIds: string[]) => void
  onEmptyAction?: (action: SchemaTableActionItem) => void
}

function ResourceListBody({
  type,
  className,
  cells,
  onRowAction,
  onRowClick,
  onSelectionAction,
  onEmptyAction,
}: ResourceListProps) {
  const load = useResourceListLoad()
  const schema = React.useMemo(() => resourceListSchema(type), [type])
  const statusOptions = RESOURCE_STATUS_FILTERS[type]
  const extraFilters = RESOURCE_EXTRA_FILTERS[type] ?? []
  const filterFields = React.useMemo(
    () => buildResourcePickerFilterFields(type, statusOptions, extraFilters),
    [type, statusOptions, extraFilters],
  )
  const hasFilterMenu = filterFields.length > 0

  const [rows, setRows] = React.useState<SchemaTableRow[]>([])
  const [total, setTotal] = React.useState<number | undefined>()
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [status, setStatus] = React.useState('all')
  const [extras, setExtras] = React.useState<Record<string, string>>({})
  const [filtersOpen, setFiltersOpen] = React.useState(false)

  const statusRef = React.useRef(status)
  const extrasRef = React.useRef(extras)
  statusRef.current = status
  extrasRef.current = extras

  const cursorRef = React.useRef<{ signature: string; byPage: Record<number, string> }>({
    signature: '',
    byPage: {},
  })

  const fetchPage = React.useCallback(
    async (
      query: SchemaTableQuery,
      nextStatus: string,
      nextExtras: Record<string, string>,
    ) => {
      setLoading(true)
      setError(null)
      const signature = listQuerySignature(type, query, nextStatus, nextExtras)
      if (cursorRef.current.signature !== signature) {
        cursorRef.current = { signature, byPage: {} }
      }
      const cursor =
        type === 'invoice' && query.page > 1
          ? cursorRef.current.byPage[query.page - 1]
          : undefined

      try {
        const result = await load(
          resourceListLoadInput(type, query, nextStatus, nextExtras, cursor),
        )
        if (type === 'invoice' && result.cursor) {
          cursorRef.current.byPage[query.page] = result.cursor
        }
        const nextRows = resourcePickerItemsToRows(type, result.items)
        setRows(nextRows)
        setTotal(
          estimateListTotal(
            query.page,
            query.pageSize,
            nextRows.length,
            Boolean(result.hasMore),
            result.total,
          ),
        )
      } catch (cause) {
        setError(cause instanceof Error ? cause.message : 'Could not load records.')
        setRows([])
        setTotal(0)
      } finally {
        setLoading(false)
      }
    },
    [load, type],
  )

  const table = useSchemaTable({
    schema,
    data: rows,
    total,
    onQueryChange: (query) => {
      void fetchPage(query, statusRef.current, extrasRef.current)
    },
  })

  React.useEffect(() => {
    void fetchPage(table.query, statusRef.current, extrasRef.current)
    // Initial load only; search/page/filters refetch via onQueryChange (incl. setPage after Apply).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchPage])

  const filtersActive = resourceCatalogFiltersActive(status, extras, type)
  const resultCountLabel = `${total ?? rows.length} result${(total ?? rows.length) === 1 ? '' : 's'}`

  const filterToolbar = hasFilterMenu ? (
    <ResourcePickerFilterMenu
      type={type}
      statusOptions={statusOptions}
      extraFilters={extraFilters}
      open={filtersOpen}
      onOpenChange={setFiltersOpen}
      appliedStatus={status}
      appliedExtras={extras}
      filtersActive={filtersActive}
      applyLabel={resultCountLabel}
      loading={loading}
      onApply={(nextStatus, nextExtras) => {
        setStatus(nextStatus)
        setExtras(nextExtras)
        statusRef.current = nextStatus
        extrasRef.current = nextExtras
        setFiltersOpen(false)
        table.setPage(1)
      }}
    />
  ) : null

  return (
    <div className={cn('relative flex flex-col gap-3', className)}>
      {loading && rows.length > 0 ? (
        <div className="pointer-events-none absolute right-0 top-0 z-10 flex items-center gap-2 text-xs text-oc-muted-foreground">
          <Spinner className="size-3.5" />
          Updating…
        </div>
      ) : null}
      {error ? (
        <p className="text-sm text-oc-destructive" role="alert">
          {error}
        </p>
      ) : null}
      {loading && rows.length === 0 ? (
        <div className="flex min-h-48 items-center justify-center rounded-lg border border-oc-border">
          <Spinner className="size-5 text-oc-primary" />
        </div>
      ) : (
        <SchemaTable
          table={table}
          cells={cells}
          toolbarExtra={filterToolbar}
          onRowAction={onRowAction}
          onRowClick={onRowClick}
          onSelectionAction={onSelectionAction}
          onEmptyAction={onEmptyAction}
        />
      )}
    </div>
  )
}

function ResourceList(props: ResourceListProps) {
  return <ResourceListBody key={props.type} {...props} />
}

export { ResourceList, ResourceListProvider, useResourceListLoad }
