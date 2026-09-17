import { createServerFn } from '@tanstack/react-start'

import { ALL_ROLES } from '#/lib/roles'
import { requireRoles } from '#/server/lib/session'
import * as fileStore from '#/server/lib/file-store'
import type { FileMeta } from '#/server/lib/file-store'

export type { FileMeta }
export { FILE_MAX_BYTES } from '#/server/lib/file-store'

export const uploadFile = createServerFn({ method: 'POST' })
  .validator((data: {
    name: string
    mimeType: string
    dataBase64: string
    entityType?: string | null
    entityId?: string | null
  }) => data)
  .handler(async ({ data }): Promise<FileMeta> => {
    await requireRoles(ALL_ROLES)
    const buffer = Buffer.from(data.dataBase64, 'base64')
    if (buffer.byteLength === 0) throw new Error('File is empty.')
    if (buffer.byteLength > fileStore.FILE_MAX_BYTES) throw new Error('File is larger than 10 MB.')
    return fileStore.insertFile({
      name: data.name,
      mimeType: data.mimeType,
      data: new Uint8Array(buffer),
      entityType: data.entityType,
      entityId: data.entityId,
    })
  })

export const getFile = createServerFn({ method: 'GET' })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }): Promise<(FileMeta & { dataBase64: string }) | null> => {
    await requireRoles(ALL_ROLES)
    const file = await fileStore.getFile(data.id)
    if (!file) return null
    const { data: bytes, ...meta } = file
    return { ...meta, dataBase64: Buffer.from(bytes).toString('base64') }
  })

export const listFiles = createServerFn({ method: 'GET' })
  .validator((data: { entityType: string; entityId: string }) => data)
  .handler(async ({ data }): Promise<FileMeta[]> => {
    await requireRoles(ALL_ROLES)
    return fileStore.listFiles(data)
  })

export const deleteFile = createServerFn({ method: 'POST' })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }): Promise<void> => {
    await requireRoles(ALL_ROLES)
    await fileStore.deleteFile(data.id)
  })
