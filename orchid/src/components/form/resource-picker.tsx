'use client'

import * as React from 'react'
import { AddRegular, CloseRegular, MinimizeRegular, SearchRegular } from '@mingcute/react/core-regular'

import { Button } from '@ui/button'
import { Badge } from '@ui/badge'
import { Spinner } from '@ui/spinner'
import { Checkbox } from '@ui/checkbox'
import {
  buildResourcePickerFilterFields,
  ResourcePickerFilterMenu,
} from '@/components/form/resource-picker-filter-form'
import {
  RESOURCE_CATALOG_LABELS,
  RESOURCE_EXTRA_FILTERS,
  RESOURCE_STATUS_FILTERS,
  resourceCatalogFiltersActive,
} from '@/lib/resource-catalog'
import { Input } from '@ui/input'
import { RadioGroup, RadioGroupItem } from '@ui/radio-group'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@ui/dialog'

const RESOURCE_PICKER_TYPES = [
  'product',
  'order',
  'charge',
  'invoice',
] as const

type ResourcePickerType = (typeof RESOURCE_PICKER_TYPES)[number]

type ResourcePickerRecord = {
  [key: string]: string | number | boolean | null | ResourcePickerRecord | ResourcePickerRecord[]
}

type ResourcePickerChild = {
  id: string
  title: string
  meta?: string
  trailing?: string
  resource?: ResourcePickerRecord
}

type ResourcePickerItem = {
  id: string
  title: string
  /** Secondary line under the title (e.g. product SKU). */
  subtitle?: string
  image?: string | null
  badge?: string
  children?: ResourcePickerChild[]
  resource?: ResourcePickerRecord
}

type ResourcePickerPage = {
  items: ResourcePickerItem[]
  hasMore?: boolean
  cursor?: string
  /** Upstream total when meta exposes it (lists / pagination). */
  total?: number
}

type ResourcePickerLoadInput = {
  type: ResourcePickerType
  query: string
  filter: string
  extras?: Record<string, string>
  page: number
  cursor?: string
}

type ResourcePickerLoad = (input: ResourcePickerLoadInput) => Promise<ResourcePickerPage>

type ResourcePickerSelectionId = {
  id: string
  children?: { id: string }[]
}

type ResourcePickerOptions = {
  type: ResourcePickerType
  action?: 'add' | 'select'
  multiple?: boolean | number
  query?: string
  selectionIds?: ResourcePickerSelectionId[]
  filter?: {
    query?: string
    variants?: boolean
    status?: string
    locationId?: string
    /** @deprecated use categoryIds */
    categoryId?: string
    categoryIds?: string[]
    channel?: string
  }
}

type ResourcePickerResult = {
  id: string
  resource?: ResourcePickerRecord
  children?: { id: string; resource?: ResourcePickerRecord }[]
}

type ResourcePickerFn = (options: ResourcePickerOptions) => Promise<ResourcePickerResult[] | undefined>

type ResourcePickerRequest = ResourcePickerOptions & {
  resolve: (value: ResourcePickerResult[] | undefined) => void
}

const ALL_FILTER = [{ value: 'all', label: 'All' }] as const

const ResourcePickerContext = React.createContext<ResourcePickerFn | null>(null)
const ResourcePickerLoadContext = React.createContext<ResourcePickerLoad | null>(null)

function maxCount(multiple: boolean | number | undefined) {
  if (multiple === true) return Number.POSITIVE_INFINITY
  if (typeof multiple === 'number') return Math.max(1, multiple)
  return 1
}

function pickerLabels(type: ResourcePickerType) {
  return (
    RESOURCE_CATALOG_LABELS[type] ?? {
      singular: type.replaceAll('-', ' '),
      plural: `${type.replaceAll('-', ' ')}s`,
    }
  )
}

function titleCase(action: 'add' | 'select', type: ResourcePickerType) {
  const noun = pickerLabels(type).plural
  return `${action === 'select' ? 'Select' : 'Add'} ${noun}`
}

function ResourcePickerProvider({
  children,
  load,
}: {
  children: React.ReactNode
  load: ResourcePickerLoad
}) {
  const [request, setRequest] = React.useState<ResourcePickerRequest | null>(null)
  const [open, setOpen] = React.useState(false)
  const requestRef = React.useRef<ResourcePickerRequest | null>(null)
  const closeTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const finish = React.useCallback((value: ResourcePickerResult[] | undefined) => {
    const current = requestRef.current
    if (!current) return
    requestRef.current = null
    setOpen(false)
    current.resolve(value)
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    closeTimerRef.current = setTimeout(() => {
      setRequest((next) => (next === current ? null : next))
      closeTimerRef.current = null
    }, 100)
  }, [])

  const pick = React.useCallback<ResourcePickerFn>((options) => {
    requestRef.current?.resolve(undefined)
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    return new Promise((resolve) => {
      const next = { ...options, resolve }
      requestRef.current = next
      setRequest(next)
      setOpen(true)
    })
  }, [])

  React.useEffect(
    () => () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
      requestRef.current?.resolve(undefined)
    },
    [],
  )

  return (
    <ResourcePickerLoadContext.Provider value={load}>
      <ResourcePickerContext.Provider value={pick}>
        {children}
        <ResourcePickerDialog
          open={open}
          request={request}
          onCancel={() => finish(undefined)}
          onConfirm={(value) => finish(value)}
        />
      </ResourcePickerContext.Provider>
    </ResourcePickerLoadContext.Provider>
  )
}

function ResourcePickerDialog({
  open,
  request,
  onCancel,
  onConfirm,
}: {
  open: boolean
  request: ResourcePickerRequest | null
  onCancel: () => void
  onConfirm: (value: ResourcePickerResult[]) => void
}) {
  const load = React.useContext(ResourcePickerLoadContext)
  const type = request?.type ?? 'product'
  const action = request?.action ?? 'add'
  const labels = pickerLabels(type)
  const filters = RESOURCE_STATUS_FILTERS[type] ?? ALL_FILTER
  const extraFilters = RESOURCE_EXTRA_FILTERS[type] ?? []
  const showVariants = request?.filter?.variants !== false && type === 'product'
  const limit = maxCount(request?.multiple)
  const hiddenQuery = request?.filter?.query ?? ''

  const [search, setSearch] = React.useState('')
  const [filter, setFilter] = React.useState('all')
  const [extras, setExtras] = React.useState<Record<string, string>>({})
  const [items, setItems] = React.useState<ResourcePickerItem[]>([])
  const [hasMore, setHasMore] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const paginationRef = React.useRef<{ page: number; cursor?: string }>({ page: 0 })
  const [error, setError] = React.useState<string | null>(null)
  const [expanded, setExpanded] = React.useState<Set<string>>(new Set())
  const [selected, setSelected] = React.useState<Map<string, Set<string>>>(new Map())
  const [cache, setCache] = React.useState<Map<string, ResourcePickerItem>>(new Map())
  const [filtersOpen, setFiltersOpen] = React.useState(false)

  const filterFields = React.useMemo(
    () => buildResourcePickerFilterFields(type, filters, extraFilters),
    [type, filters, extraFilters],
  )

  React.useEffect(() => {
    if (!open || !request) return
    setSearch(request.query ?? '')
    setFilter(request.filter?.status ?? 'all')
    setExtras(() => {
      const next: Record<string, string> = {}
      if (request.filter?.locationId) next.location_id = request.filter.locationId
      if (request.filter?.categoryIds?.length) {
        next.category_ids = request.filter.categoryIds.join(',')
      } else if (request.filter?.categoryId) {
        next.category_ids = request.filter.categoryId
      }
      if (request.filter?.channel) next.channel = request.filter.channel
      return next
    })
    setItems([])
    setCache(new Map())
    paginationRef.current = { page: 0 }
    setHasMore(false)
    setError(null)
    const next = new Map<string, Set<string>>()
    const openParents = new Set<string>()
    for (const entry of request.selectionIds ?? []) {
      next.set(entry.id, new Set(entry.children?.map((child) => child.id) ?? []))
      if (entry.children?.length) openParents.add(entry.id)
    }
    setSelected(next)
    setExpanded(openParents)
  }, [open, request])

  const listQuery = [search.trim(), hiddenQuery].filter(Boolean).join(' ')

  const fetchList = React.useCallback(
    async (append: boolean) => {
      if (!load || !request) return
      const nextPage = append ? paginationRef.current.page + 1 : 1
      const nextCursor = append ? paginationRef.current.cursor : undefined
      setLoading(true)
      setError(null)
      try {
        const result = await load({
          type,
          query: listQuery,
          filter,
          extras,
          page: nextPage,
          cursor: nextCursor,
        })
        setItems((current) => (append ? [...current, ...result.items] : result.items))
        setCache((current) => {
          const next = new Map(current)
          for (const item of result.items) next.set(item.id, item)
          return next
        })
        paginationRef.current = { page: nextPage, cursor: result.cursor }
        setHasMore(Boolean(result.hasMore))
      } catch (cause) {
        setError(cause instanceof Error ? cause.message : 'Could not load records.')
      } finally {
        setLoading(false)
      }
    },
    [extras, filter, listQuery, load, request, type],
  )

  React.useEffect(() => {
    if (!open || !request || !load) return
    paginationRef.current = { page: 0 }
    let cancelled = false
    const handle = window.setTimeout(() => {
      if (cancelled) return
      void fetchList(false)
    }, 250)
    return () => {
      cancelled = true
      window.clearTimeout(handle)
    }
  }, [extras, filter, fetchList, load, open, request, search, type])

  const loadMore = React.useCallback(() => {
    if (loading || !hasMore) return
    void fetchList(true)
  }, [fetchList, hasMore, loading])

  function selectedCount() {
    return selected.size
  }

  function atLimit() {
    return selectedCount() >= limit
  }

  function parentState(item: ResourcePickerItem) {
    const kids = showVariants ? (item.children ?? []) : []
    const picked = selected.get(item.id)
    if (!picked) return { checked: false, indeterminate: false }
    if (!kids.length) return { checked: true, indeterminate: false }
    const count = kids.filter((child) => picked.has(child.id)).length
    return {
      checked: count === kids.length && count > 0,
      indeterminate: count > 0 && count < kids.length,
    }
  }

  function toggleParent(item: ResourcePickerItem) {
    setSelected((current) => {
      const next = new Map(current)
      if (next.has(item.id)) {
        next.delete(item.id)
        return next
      }
      if (limit === 1) next.clear()
      else if (next.size >= limit) return current
      const kids = showVariants ? (item.children ?? []) : []
      next.set(item.id, new Set(kids.map((child) => child.id)))
      return next
    })
    if (item.children?.length) {
      setExpanded((current) => new Set(current).add(item.id))
    }
  }

  function toggleChild(item: ResourcePickerItem, childId: string, exclusive: boolean) {
    setSelected((current) => {
      const next = new Map(current)
      if (!next.has(item.id)) {
        if (limit === 1) next.clear()
        else if (next.size >= limit) return current
      }
      const kids = exclusive ? new Set([childId]) : new Set(next.get(item.id) ?? [])
      if (!exclusive) {
        if (kids.has(childId)) kids.delete(childId)
        else kids.add(childId)
      }
      if (kids.size === 0) next.delete(item.id)
      else next.set(item.id, kids)
      return next
    })
  }

  function confirm() {
    const value: ResourcePickerResult[] = []
    for (const [id, childIds] of selected) {
      const item = cache.get(id)
      const children = item?.children?.filter((child) => childIds.has(child.id)) ?? []
      value.push({
        id,
        resource: item?.resource,
        children: children.length
          ? children.map((child) => ({ id: child.id, resource: child.resource }))
          : childIds.size
            ? [...childIds].map((childId) => ({ id: childId }))
            : undefined,
      })
    }
    onConfirm(value)
  }

  const confirmLabel = action === 'select' ? 'Select' : 'Add'
  const exclusiveChildren = limit === 1
  const hasFilterMenu = filterFields.length > 0
  const filtersActive = resourceCatalogFiltersActive(filter, extras, type)
  const resultCountLabel = `${items.length}${hasMore ? '+' : ''} result${items.length === 1 ? '' : 's'}`

  return (
    <Dialog persistent open={open} onOpenChange={(next) => { if (!next) onCancel() }}>
      <DialogContent size="lg" showCloseButton={false} className="gap-0 p-0 sm:max-w-2xl">
        <DialogHeader className="flex-row items-center justify-between px-5 pt-5 pb-3">
          <DialogTitle>{titleCase(action, type)}</DialogTitle>
          <DialogClose
            render={
              <Button variant="ghost" size="icon-sm" className="text-oc-muted-foreground" />
            }
          >
            <CloseRegular />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Search and select {labels.plural}.
        </DialogDescription>
        <div className="flex items-center gap-2 px-5 pb-3">
          <div className="relative min-w-0 flex-1">
            <SearchRegular className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-oc-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => {
                paginationRef.current = { page: 0 }
                setSearch(event.currentTarget.value)
              }}
              placeholder={`Search ${labels.plural}`}
              className="w-full pl-8"
            />
          </div>
          {hasFilterMenu ? (
            <ResourcePickerFilterMenu
              key={type}
              type={type}
              statusOptions={filters}
              extraFilters={extraFilters}
              open={filtersOpen}
              onOpenChange={setFiltersOpen}
              appliedStatus={filter}
              appliedExtras={extras}
              filtersActive={filtersActive}
              applyLabel={resultCountLabel}
              loading={loading}
              onApply={(status, nextExtras) => {
                paginationRef.current = { page: 0 }
                setFilter(status)
                setExtras(nextExtras)
                setFiltersOpen(false)
              }}
            />
          ) : null}
        </div>
        <div className="max-h-[min(28rem,50vh)] min-h-48 overflow-y-auto border-y border-oc-border">
          {loading && items.length === 0 ? (
            <div className="flex min-h-48 items-center justify-center">
              <Spinner className="size-5 text-oc-primary" />
            </div>
          ) : error ? (
            <p className="px-5 py-10 text-center text-sm text-oc-destructive">{error}</p>
          ) : items.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-oc-muted-foreground">
              No {labels.plural} found.
            </p>
          ) : (
            <ul className="divide-y divide-oc-border">
              {items.map((item) => {
                const kids = showVariants ? (item.children ?? []) : []
                const state = parentState(item)
                const isOpen = expanded.has(item.id)
                return (
                  <li key={item.id}>
                    <div className="flex items-center gap-3 px-5 py-3">
                      {kids.length > 0 ? (
                        <button
                          type="button"
                          aria-label={isOpen ? 'Collapse' : 'Expand'}
                          className="inline-flex size-7 items-center justify-center rounded-full text-oc-muted-foreground"
                          onClick={() => {
                            setExpanded((current) => {
                              const next = new Set(current)
                              if (next.has(item.id)) next.delete(item.id)
                              else next.add(item.id)
                              return next
                            })
                          }}
                        >
                          {isOpen ? (
                            <MinimizeRegular className="size-4" />
                          ) : (
                            <AddRegular className="size-4" />
                          )}
                        </button>
                      ) : (
                        <Checkbox
                          checked={state.checked}
                          disabled={!selected.has(item.id) && atLimit() && limit !== 1}
                          onCheckedChange={() => toggleParent(item)}
                        />
                      )}
                      {item.image ? (
                        <img
                          src={item.image}
                          alt=""
                          className="size-8 rounded-md border border-oc-border object-cover"
                        />
                      ) : kids.length > 0 ? (
                        <span className="size-8 rounded-md border border-oc-border bg-oc-muted" />
                      ) : null}
                      <button
                        type="button"
                        className="flex min-w-0 flex-1 flex-col gap-0.5 text-left"
                        onClick={() => toggleParent(item)}
                      >
                        <span className="flex min-w-0 items-center gap-2">
                          <span className="truncate text-sm font-medium text-oc-foreground">
                            {item.title}
                          </span>
                          {item.badge ? <Badge tone="blue">{item.badge}</Badge> : null}
                        </span>
                        {item.subtitle ? (
                          <span className="truncate font-mono text-xs text-oc-muted-foreground">
                            {item.subtitle}
                          </span>
                        ) : null}
                      </button>
                    </div>
                    {kids.length > 0 && isOpen ? (
                      exclusiveChildren ? (
                        <RadioGroup
                          value={[...selected.get(item.id) ?? []][0] ?? ''}
                          onValueChange={(value) => {
                            if (value) toggleChild(item, String(value), true)
                          }}
                          className="pb-2"
                        >
                          {kids.map((child) => (
                            <label
                              key={child.id}
                              className="flex cursor-pointer items-center gap-3 py-2 pr-5 pl-16"
                            >
                              <RadioGroupItem value={child.id} />
                              <span className="min-w-0 flex-1 text-sm text-oc-foreground">
                                {child.title}
                              </span>
                              {child.meta ? (
                                <span className="text-sm text-oc-muted-foreground">{child.meta}</span>
                              ) : null}
                              {child.trailing ? (
                                <span className="w-24 text-right text-sm text-oc-foreground">
                                  {child.trailing}
                                </span>
                              ) : null}
                            </label>
                          ))}
                        </RadioGroup>
                      ) : (
                        <div className="pb-2">
                          {kids.map((child) => (
                            <label
                              key={child.id}
                              className="flex cursor-pointer items-center gap-3 py-2 pr-5 pl-16"
                            >
                              <Checkbox
                                checked={selected.get(item.id)?.has(child.id) ?? false}
                                onCheckedChange={() => toggleChild(item, child.id, false)}
                              />
                              <span className="min-w-0 flex-1 text-sm text-oc-foreground">
                                {child.title}
                              </span>
                              {child.meta ? (
                                <span className="text-sm text-oc-muted-foreground">{child.meta}</span>
                              ) : null}
                              {child.trailing ? (
                                <span className="w-24 text-right text-sm text-oc-foreground">
                                  {child.trailing}
                                </span>
                              ) : null}
                            </label>
                          ))}
                        </div>
                      )
                    ) : null}
                  </li>
                )
              })}
            </ul>
          )}
          {hasMore ? (
            <div className="flex justify-center border-t border-oc-border py-3">
              <Button
                variant="outline"
                size="sm"
                disabled={loading}
                onClick={loadMore}
              >
                {loading ? 'Loading…' : `Load more ${labels.plural}`}
              </Button>
            </div>
          ) : null}
        </div>
        <DialogFooter className="m-0 rounded-b-2xl sm:items-center sm:justify-between">
          <p className="text-sm text-oc-muted-foreground">
            {selectedCount()}
            {Number.isFinite(limit) ? `/${limit}` : ''} {selectedCount() === 1 ? labels.singular : labels.plural} selected
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button disabled={selectedCount() === 0} onClick={confirm}>
              {confirmLabel}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function useResourcePicker() {
  const pick = React.useContext(ResourcePickerContext)
  if (!pick) {
    throw new Error('useResourcePicker must be used within ResourcePickerProvider.')
  }
  return pick
}

export { RESOURCE_PICKER_TYPES, ResourcePickerProvider, useResourcePicker }
export type {
  ResourcePickerRecord,
  ResourcePickerChild,
  ResourcePickerFn,
  ResourcePickerItem,
  ResourcePickerLoad,
  ResourcePickerLoadInput,
  ResourcePickerOptions,
  ResourcePickerPage,
  ResourcePickerResult,
  ResourcePickerSelectionId,
  ResourcePickerType,
}
