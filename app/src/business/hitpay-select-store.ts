import { Store } from '@tanstack/store'
import { useEffect } from 'react'
import { useStore } from '@tanstack/react-store'

type SelectStoreEntry = {
  items: { id: string; [key: string]: unknown }[]
  loading: boolean
  hasMore: boolean
  page: number
  error: string | null
}

const selectStore = new Store<Record<string, SelectStoreEntry>>({})

function selectEntry(key: string): SelectStoreEntry {
  return (
    selectStore.state[key] ?? {
      items: [],
      loading: false,
      hasMore: false,
      page: 1,
      error: null,
    }
  )
}

function useSelectOptions<T extends { id: string }>(
  key: string,
  load: (page: number) => Promise<{ items: T[]; hasMore?: boolean }>,
) {
  const entry = useStore(selectStore, (state) => state[key] ?? selectEntry(key))
  useEffect(() => {
    if (entry.items.length > 0 || entry.loading || entry.page > 1) return
    selectStore.setState((state) => ({
      ...state,
      [key]: { ...selectEntry(key), loading: true },
    }))
    load(1)
      .then((result) => {
        selectStore.setState((state) => ({
          ...state,
          [key]: { ...selectEntry(key), items: result.items, hasMore: Boolean(result.hasMore), loading: false },
        }))
      })
      .catch(() => {
        selectStore.setState((state) => ({
          ...state,
          [key]: { ...selectEntry(key), loading: false, error: 'Could not load options.' },
        }))
      })
  }, [entry.items.length, entry.loading, entry.page, key, load])
  return entry
}

export { selectEntry, selectStore, useSelectOptions }
export type { SelectStoreEntry }
