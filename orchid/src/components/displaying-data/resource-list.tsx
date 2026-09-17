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
import type { ResourceLoad, ResourceType } from '@/components/form/resource-picker'
import {
  resourceCatalogFiltersActive,
  RESOURCE_EXTRA_FILTERS,
  RESOURCE_STATUS_FILTERS,
} from '@/lib/resource-catalog'
import { estimateListTotal, resourcePickerItemsToRows } from '@/lib/resource-list-map'
import {
  resourceListSchema,
  resourceListToolbarFilterKeys,
} from '@/lib/resource-list-schema'
import { Spinner } from '@ui/spinner'
import { cn } from '@/lib/utils'

const ResourceListLoadContext = React.createContext<ResourceLoad | null>(null)

function resourceListLoadInput(
  type: ResourceType,
  query: SchemaTableQuery,
  status: string,
  extras: Record<string, string>,
  cursor?: string,
): Parameters<ResourceLoad>[0] {
  return {
    type,
    query: query.search.trim(),
    filter: status,
    extras,
    page: query.page,
    cursor,
  }
}

function mergeLoadExtras(
  type: ResourceType,
  query: SchemaTableQuery,
  popoverExtras: Record<string, string>,
): { status: string; extras: Record<string, string> } {
  const status = query.tab || 'all'
  const extras: Record<string, string> = { ...popoverExtras }

  for (const [key, value] of Object.entries(query.filters)) {
    if (value) extras[key] = value
    else delete extras[key]
  }

  for (const group of RESOURCE_EXTRA_FILTERS[type] ?? []) {
    if (!extras[group.key]) extras[group.key] = 'all'
  }

  return { status, extras }
}

function listQuerySignature(
  type: ResourceType,
  query: SchemaTableQuery,
  popoverExtras: Record<string, string>,
) {
  const { status, extras } = mergeLoadExtras(type, query, popoverExtras)
  return JSON.stringify({
    type,
    search: query.search,
    tab: query.tab,
    filters: query.filters,
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
  load: ResourceLoad
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
  type: ResourceType
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
  const toolbarFilterKeys = React.useMemo(
    () => resourceListToolbarFilterKeys(type),
    [type],
  )
  const filterFields = React.useMemo(
    () =>
      buildResourcePickerFilterFields(type, statusOptions, extraFilters, {
        omitStatus: true,
        omitExtraFilterKeys: toolbarFilterKeys,
      }),
    [type, statusOptions, extraFilters, toolbarFilterKeys],
  )
  const hasFilterMenu = filterFields.length > 0

  const [rows, setRows] = React.useState<SchemaTableRow[]>([])
  const [total, setTotal] = React.useState<number | undefined>()
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [popoverExtras, setPopoverExtras] = React.useState<Record<string, string>>({})
  const [filtersOpen, setFiltersOpen] = React.useState(false)

  const popoverExtrasRef = React.useRef(popoverExtras)
  popoverExtrasRef.current = popoverExtras

  const cursorRef = React.useRef<{ signature: string; byPage: Record<number, string> }>({
    signature: '',
    byPage: {},
  })

  const fetchPage = React.useCallback(
    async (query: SchemaTableQuery) => {
      setLoading(true)
      setError(null)
      const { status, extras } = mergeLoadExtras(type, query, popoverExtrasRef.current)
      const signature = listQuerySignature(type, query, popoverExtrasRef.current)
      if (cursorRef.current.signature !== signature) {
        cursorRef.current = { signature, byPage: {} }
      }
      const cursor =
        type === 'invoice' && query.page > 1
          ? cursorRef.current.byPage[query.page - 1]
          : undefined

      try {
        const result = await load(
          resourceListLoadInput(type, query, status, extras, cursor),
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
      void fetchPage(query)
    },
  })

  React.useEffect(() => {
    void fetchPage(table.query)
    // Initial load only; search/tabs/filters/page refetch via onQueryChange.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchPage])

  const { status: appliedStatus, extras: appliedLoadExtras } = mergeLoadExtras(
    type,
    table.query,
    popoverExtras,
  )
  const filtersActive = resourceCatalogFiltersActive(appliedStatus, appliedLoadExtras, type)
  const resultCountLabel = `${total ?? rows.length} result${(total ?? rows.length) === 1 ? '' : 's'}`

  const filterToolbar = hasFilterMenu ? (
    <ResourcePickerFilterMenu
      type={type}
      statusOptions={statusOptions}
      extraFilters={extraFilters}
      open={filtersOpen}
      onOpenChange={setFiltersOpen}
      appliedStatus={appliedStatus}
      appliedExtras={popoverExtras}
      filtersActive={filtersActive}
      applyLabel={resultCountLabel}
      loading={loading}
      onApply={(_status, nextExtras) => {
        popoverExtrasRef.current = nextExtras
        setPopoverExtras(nextExtras)
        setFiltersOpen(false)
        void fetchPage(table.query)
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
