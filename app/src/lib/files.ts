import { createServerFn } from '@tanstack/react-start'

import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import {
  deleteFile as removeStoredFile,
  FILE_MAX_BYTES,
  getFile as loadStoredFile,
  insertFile,
  listFiles as loadStoredFiles,
  type FileMeta,
} from '#/lib/server/files'

export type { FileMeta }
export { FILE_MAX_BYTES }

function decodeBase64(dataBase64: string): Uint8Array {
  const buffer = Buffer.from(dataBase64, 'base64')

  if (buffer.byteLength === 0) {
    throw new Error('File is empty.')
  }
  if (buffer.byteLength > FILE_MAX_BYTES) {
    throw new Error('File is larger than 10 MB.')
  }

  return new Uint8Array(buffer)
}

export const uploadFile = createServerFn({ method: 'POST' })
  .inputValidator((data: {
    name: string
    mimeType: string
    dataBase64: string
    entityType?: string | null
    entityId?: string | null
  }) => data)
  .handler(async ({ data }): Promise<FileMeta> => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    return insertFile({
      name: data.name,
      mimeType: data.mimeType,
      data: decodeBase64(data.dataBase64),
      entityType: data.entityType,
      entityId: data.entityId,
    })
  })

export const getFile = createServerFn({ method: 'GET' })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }): Promise<(FileMeta & { dataBase64: string }) | null> => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    const file = await loadStoredFile(data.id)

    if (!file) {
      return null
    }

    const { data: bytes, ...meta } = file
    return {
      ...meta,
      dataBase64: Buffer.from(bytes).toString('base64'),
    }
  })

export const listFiles = createServerFn({ method: 'GET' })
  .inputValidator((data: { entityType: string; entityId: string }) => data)
  .handler(async ({ data }): Promise<FileMeta[]> => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    return loadStoredFiles(data)
  })

export const deleteFile = createServerFn({ method: 'POST' })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }): Promise<void> => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    await removeStoredFile(data.id)
  })
