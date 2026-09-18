export const FILE_MAX_BYTES = 10 * 1024 * 1024

export type FileMeta = {
  id: string
  entityType: string | null
  entityId: string | null
  name: string
  mimeType: string
  size: number
  storageProvider: string
  storageKey: string
  createdAt: string
  updatedAt: string
}

export type StoredFile = FileMeta & {
  data: Uint8Array
}

export const FILE_META_COLUMNS =
  'id, entity_type, entity_id, name, mime_type, size, storage_provider, storage_key, created_at, updated_at'

export function fileMetaFromRow(row: Record<string, unknown>): FileMeta {
  return {
    id: String(row.id),
    entityType: row.entity_type == null ? null : String(row.entity_type),
    entityId: row.entity_id == null ? null : String(row.entity_id),
    name: String(row.name),
    mimeType: String(row.mime_type),
    size: Number(row.size),
    storageProvider: String(row.storage_provider),
    storageKey: String(row.storage_key),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  }
}
