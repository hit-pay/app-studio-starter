/** In-memory cache for ResourceAsyncSelect option lists. */
import { Store } from '@tanstack/store'
import { useEffect } from 'react'
import { useStore } from '@tanstack/react-store'

type ResourceAsyncSelectCacheEntry = {
  items: { id: string; [key: string]: unknown }[]
  loading: boolean
  hasMore: boolean
  page: number
  error: string | null
}

const resourceAsyncSelectStore = new Store<Record<string, ResourceAsyncSelectCacheEntry>>({})

function resourceAsyncSelectEntry(key: string): ResourceAsyncSelectCacheEntry {
  return (
    resourceAsyncSelectStore.state[key] ?? {
      items: [],
      loading: false,
      hasMore: false,
      page: 1,
      error: null,
    }
  )
}

function useResourceAsyncSelectOptions<T extends { id: string }>(
  key: string,
  load: (page: number) => Promise<{ items: T[]; hasMore?: boolean }>,
) {
  const entry = useStore(resourceAsyncSelectStore, (state) => state[key] ?? resourceAsyncSelectEntry(key))
  useEffect(() => {
    if (entry.items.length > 0 || entry.loading || entry.page > 1) return
    resourceAsyncSelectStore.setState((state) => ({
      ...state,
      [key]: { ...resourceAsyncSelectEntry(key), loading: true },
    }))
    load(1)
      .then((result) => {
        resourceAsyncSelectStore.setState((state) => ({
          ...state,
          [key]: { ...resourceAsyncSelectEntry(key), items: result.items, hasMore: Boolean(result.hasMore), loading: false },
        }))
      })
      .catch(() => {
        resourceAsyncSelectStore.setState((state) => ({
          ...state,
          [key]: { ...resourceAsyncSelectEntry(key), loading: false, error: 'Could not load options.' },
        }))
      })
  }, [entry.items.length, entry.loading, entry.page, key, load])
  return entry
}

export { resourceAsyncSelectEntry, resourceAsyncSelectStore, useResourceAsyncSelectOptions }
export type { ResourceAsyncSelectCacheEntry }
