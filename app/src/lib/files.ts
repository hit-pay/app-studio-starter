import { createServerFn } from '@tanstack/react-start'

import { ROLES } from '#/lib/enums'
import {
  FILE_MAX_BYTES,
  deleteFile as deleteStoredFile,
  getFile as getStoredFile,
  insertFile,
  listFiles as listStoredFiles,
  type FileMeta,
} from '#/server/lib/files'
import { requireRoles } from '#/server/lib/current-user'

export type { FileMeta }
export { FILE_MAX_BYTES }

export const uploadFile = createServerFn({ method: 'POST' })
  .validator((data: {
    name: string
    mimeType: string
    dataBase64: string
    entityType?: string | null
    entityId?: string | null
  }) => data)
  .handler(async ({ data }): Promise<FileMeta> => {
    await requireRoles(ROLES)
    const buffer = Buffer.from(data.dataBase64, 'base64')
    if (buffer.byteLength === 0) throw new Error('File is empty.')
    if (buffer.byteLength > FILE_MAX_BYTES) throw new Error('File is larger than 10 MB.')
    return insertFile({
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
    await requireRoles(ROLES)
    const file = await getStoredFile(data.id)
    if (!file) return null
    const { data: bytes, ...meta } = file
    return { ...meta, dataBase64: Buffer.from(bytes).toString('base64') }
  })

export const listFiles = createServerFn({ method: 'GET' })
  .validator((data: { entityType: string; entityId: string }) => data)
  .handler(async ({ data }): Promise<FileMeta[]> => {
    await requireRoles(ROLES)
    return listStoredFiles(data)
  })

export const deleteFile = createServerFn({ method: 'POST' })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }): Promise<void> => {
    await requireRoles(ROLES)
    await deleteStoredFile(data.id)
  })
