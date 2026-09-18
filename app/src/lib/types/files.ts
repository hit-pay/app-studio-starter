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

export type FileWithData = FileMeta & {
  dataUrl: string
}
