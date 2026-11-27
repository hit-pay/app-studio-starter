import { CameraRegular, CloseRegular } from '@mingcute/react/core-regular'
import { useRef } from 'react'

import { fileUrl, useFiles } from '@/lib/files'
import {
  FileUpload,
  FileUploadAction,
  FileUploadActions,
  FileUploadContent,
  FileUploadDescription,
  FileUploadGroup,
  FileUploadMedia,
  FileUploadTitle,
  FileUploadTrigger,
} from '@ui/file-upload'
import { Spinner } from '@ui/spinner'
import { toast } from '@ui/toast'

function size(bytes: number): string {
  return bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

/** The photos proving one item was done, and adding one (from the camera on a phone). */
export function ItemPhotos({ runId, itemId, editable }: { runId: string; itemId: string; editable: boolean }) {
  const input = useRef<HTMLInputElement>(null)
  // The backend counts these when the checklist is completed: entity `run-item`, id `<run>:<item>`.
  const { files, upload, remove } = useFiles({ entityType: 'run-item', entityId: `${runId}:${itemId}` })

  return (
    <FileUploadGroup className="max-w-md">
      {files.data?.map((file) => (
        <FileUpload key={file.id} state="done" size="sm">
          <FileUploadMedia variant="image">
            <img src={fileUrl(file.id)} alt={file.name} className="size-full object-cover" />
          </FileUploadMedia>
          <FileUploadContent>
            <FileUploadTitle>
              <a href={fileUrl(file.id)} target="_blank" rel="noreferrer" className="hover:underline">
                {file.name}
              </a>
            </FileUploadTitle>
            <FileUploadDescription>{size(file.size)}</FileUploadDescription>
          </FileUploadContent>
          {editable ? (
            <FileUploadActions>
              <FileUploadAction aria-label={`Remove ${file.name}`} disabled={remove.isPending} onClick={() => remove.mutate(file.id)}>
                <CloseRegular />
              </FileUploadAction>
            </FileUploadActions>
          ) : null}
        </FileUpload>
      ))}
      {files.error ? <p className="text-xs text-oc-destructive">{files.error.message}</p> : null}
      {editable && upload.isPending ? (
        <FileUpload state="uploading" size="sm">
          <FileUploadMedia>
            <Spinner />
          </FileUploadMedia>
          <FileUploadContent>
            <FileUploadTitle>Uploading photo…</FileUploadTitle>
          </FileUploadContent>
        </FileUpload>
      ) : null}
      {editable && !upload.isPending ? (
        <FileUpload state="idle" size="sm">
          <FileUploadMedia>
            <CameraRegular />
          </FileUploadMedia>
          <FileUploadContent>
            <FileUploadTitle>Add a photo</FileUploadTitle>
            <FileUploadDescription>Take one or pick an image, up to 10 MB</FileUploadDescription>
          </FileUploadContent>
          <FileUploadTrigger aria-label="Add a photo" onClick={() => input.current?.click()} />
          <input
            ref={input}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0]
              event.target.value = ''
              if (!file) return
              upload.mutate(file, {
                onError: (error) => toast.add({ title: 'Could not upload the photo', description: error.message, type: 'error' }),
              })
            }}
          />
        </FileUpload>
      ) : null}
    </FileUploadGroup>
  )
}
