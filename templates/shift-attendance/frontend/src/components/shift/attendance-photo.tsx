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

/** The photo taken at clock-in, stored with entity type `attendance` and the clock-in's id. */
export function AttendancePhoto({ attendanceId, editable }: { attendanceId: string; editable: boolean }) {
  const input = useRef<HTMLInputElement>(null)
  const { files, upload, remove } = useFiles({ entityType: 'attendance', entityId: attendanceId })
  const photo = files.data?.[0]

  if (photo) {
    return (
      <FileUploadGroup className="max-w-md">
        <FileUpload state="done" size="sm">
          <FileUploadMedia variant="image">
            <img src={fileUrl(photo.id)} alt="Clock-in photo" className="size-full object-cover" />
          </FileUploadMedia>
          <FileUploadContent>
            <FileUploadTitle>Clock-in photo</FileUploadTitle>
            <FileUploadDescription>{photo.name}</FileUploadDescription>
          </FileUploadContent>
          {editable ? (
            <FileUploadActions>
              <FileUploadAction aria-label="Remove the photo" disabled={remove.isPending} onClick={() => remove.mutate(photo.id)}>
                <CloseRegular />
              </FileUploadAction>
            </FileUploadActions>
          ) : null}
        </FileUpload>
      </FileUploadGroup>
    )
  }
  if (!editable) return null

  return (
    <FileUploadGroup className="max-w-md">
      <FileUpload state={upload.isPending ? 'uploading' : 'idle'} size="sm">
        <FileUploadMedia>{upload.isPending ? <Spinner /> : <CameraRegular />}</FileUploadMedia>
        <FileUploadContent>
          <FileUploadTitle>{upload.isPending ? 'Uploading…' : 'Add a selfie'}</FileUploadTitle>
          <FileUploadDescription>Shows you were at the location when you clocked in.</FileUploadDescription>
        </FileUploadContent>
        {upload.isPending ? null : <FileUploadTrigger aria-label="Add a selfie" onClick={() => input.current?.click()} />}
        <input
          ref={input}
          type="file"
          accept="image/*"
          capture="user"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0]
            event.target.value = ''
            if (!file) return
            upload.mutate(file, { onError: (error) => toast.add({ title: 'Could not upload the photo', description: error.message, type: 'error' }) })
          }}
        />
      </FileUpload>
    </FileUploadGroup>
  )
}
