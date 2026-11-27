import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { call, errorOf } from '@/lib/api'
import type { FileMeta } from '@/lib/types'

export const MAX_FILE_BYTES = 10 * 1024 * 1024

type Owner = { entityType: string; entityId: string }

/**
 * The files attached to one record (e.g. a photo on a shift), and uploading or removing them. Files go up and down
 * as raw bytes; show a download with `<a href={fileUrl(file.id)} download>`.
 */
export function useFiles(owner: Owner | null) {
  const queryClient = useQueryClient()
  const queryKey = ['files', owner?.entityType ?? null, owner?.entityId ?? null]

  const files = useQuery({
    queryKey,
    enabled: owner !== null,
    // Only runs once there is an owner (enabled above).
    queryFn: () => call('GET', '/api/files', { query: owner! }),
  })

  const upload = useMutation({
    mutationFn: async (file: File): Promise<FileMeta> => {
      if (file.size > MAX_FILE_BYTES) throw new Error('Files must be 10 MB or smaller.')
      const query = new URLSearchParams({ name: file.name, ...(owner ?? {}) })
      const response = await fetch(`/api/files?${query}`, {
        method: 'POST',
        body: file,
        headers: { 'content-type': file.type || 'application/octet-stream' },
      })
      if (!response.ok) throw await errorOf(response)
      return (await response.json()) as FileMeta
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  })

  const remove = useMutation({
    mutationFn: (id: string) => call('DELETE', '/api/files/:id', { params: { id } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  })

  return { files, upload, remove }
}

/** Where a file downloads from. */
export function fileUrl(id: string): string {
  return `/api/files/${encodeURIComponent(id)}`
}
