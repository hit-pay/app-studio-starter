import { useRef } from 'react'

import { fileUrl, useFiles } from '@/lib/files'
import { Button } from '@ui/button'
import { toast } from '@ui/toast'

/** The photos proving one item was done, and adding one (from the camera on a phone). */
export function ItemPhotos({ runId, itemId, editable }: { runId: string; itemId: string; editable: boolean }) {
  const input = useRef<HTMLInputElement>(null)
  // The backend counts these when the checklist is completed: entity `run-item`, id `<run>:<item>`.
  const { files, upload, remove } = useFiles({ entityType: 'run-item', entityId: `${runId}:${itemId}` })

  return (
    <div className="flex flex-wrap items-center gap-2">
      {files.data?.map((file) => (
        <div key={file.id} className="group relative">
          <a href={fileUrl(file.id)} target="_blank" rel="noreferrer">
            <img src={fileUrl(file.id)} alt={file.name} className="size-16 rounded-lg border border-oc-border object-cover" />
          </a>
          {editable ? (
            <button
              type="button"
              aria-label={`Remove ${file.name}`}
              className="absolute -top-1.5 -right-1.5 hidden size-5 items-center justify-center rounded-full bg-oc-foreground text-xs text-oc-background group-hover:flex"
              onClick={() => remove.mutate(file.id)}
            >
              ×
            </button>
          ) : null}
        </div>
      ))}
      {files.error ? <span className="text-xs text-oc-destructive">{files.error.message}</span> : null}
      {editable ? (
        <>
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
          <Button variant="outline" size="sm" disabled={upload.isPending} onClick={() => input.current?.click()}>
            {upload.isPending ? 'Uploading…' : 'Add photo'}
          </Button>
        </>
      ) : null}
    </div>
  )
}
