import { useCallback, useEffect, useState } from 'react'

import {
  FILE_MAX_BYTES,
  deleteFile,
  getFile,
  listFiles,
  uploadFile,
  type FileMeta,
} from '#/lib/server/files'

export type { FileMeta }
export { FILE_MAX_BYTES }

export type FileWithData = FileMeta & { dataUrl: string }

function messageOf(caught: unknown, fallback: string): string {
  return caught instanceof Error ? caught.message : fallback
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = String(reader.result ?? '')
      const comma = result.indexOf(',')
      resolve(comma >= 0 ? result.slice(comma + 1) : result)
    }
    reader.onerror = () => reject(new Error('Failed to read file.'))
    reader.readAsDataURL(file)
  })
}

function fileDataUrl(dataBase64: string, mimeType: string): string {
  return `data:${mimeType || 'application/octet-stream'};base64,${dataBase64}`
}

/**
 * List + upload + delete + fetch bytes for one entity. Browser only.
 * Pass `null` until entityType/entityId exist. After upload/remove the list refreshes.
 */
export function useFiles(query: { entityType: string; entityId: string } | null): {
  files: FileMeta[] | null
  error: string | null
  loading: boolean
  retry: () => void
  uploading: boolean
  removingId: string | null
  upload: (file: File) => Promise<FileMeta>
  remove: (id: string) => Promise<void>
  get: (id: string) => Promise<FileWithData | null>
} {
  const entityType = query?.entityType ?? ''
  const entityId = query?.entityId ?? ''
  const [files, setFiles] = useState<FileMeta[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(Boolean(query))
  const [attempt, setAttempt] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [removingId, setRemovingId] = useState<string | null>(null)

  useEffect(() => {
    if (!entityType || !entityId) {
      setFiles(null)
      setError(null)
      setLoading(false)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    listFiles({ data: { entityType, entityId } })
      .then((next) => {
        if (!cancelled) setFiles(next)
      })
      .catch((caught) => {
        if (!cancelled) {
          setFiles(null)
          setError(messageOf(caught, 'Failed to load files.'))
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [entityType, entityId, attempt])

  const retry = useCallback(() => setAttempt((value) => value + 1), [])

  const upload = useCallback(
    async (file: File): Promise<FileMeta> => {
      if (!entityType || !entityId) {
        throw new Error('entityType and entityId are required to upload a file.')
      }
      if (file.size === 0) throw new Error('File is empty.')
      if (file.size > FILE_MAX_BYTES) throw new Error('File is larger than 10 MB.')

      setUploading(true)
      setError(null)
      try {
        const meta = await uploadFile({
          data: {
            name: file.name,
            mimeType: file.type || 'application/octet-stream',
            dataBase64: await fileToBase64(file),
            entityType,
            entityId,
          },
        })
        retry()
        return meta
      } catch (caught) {
        const message = messageOf(caught, 'Failed to upload file.')
        setError(message)
        throw caught instanceof Error ? caught : new Error(message)
      } finally {
        setUploading(false)
      }
    },
    [entityId, entityType, retry],
  )

  const remove = useCallback(
    async (id: string): Promise<void> => {
      setRemovingId(id)
      setError(null)
      try {
        await deleteFile({ data: { id } })
        retry()
      } catch (caught) {
        const message = messageOf(caught, 'Failed to delete file.')
        setError(message)
        throw caught instanceof Error ? caught : new Error(message)
      } finally {
        setRemovingId(null)
      }
    },
    [retry],
  )

  const get = useCallback(async (id: string): Promise<FileWithData | null> => {
    const next = await getFile({ data: { id } })
    if (!next) return null
    const { dataBase64, ...meta } = next
    return { ...meta, dataUrl: fileDataUrl(dataBase64, meta.mimeType) }
  }, [])

  return {
    files,
    error,
    loading,
    retry,
    uploading,
    removingId,
    upload,
    remove,
    get,
  }
}
