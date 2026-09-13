import { useEffect, useId, useRef, useState } from 'react'
import {
  FileCodeRegular,
  FileRegular,
  TableRegular,
  PicRegular,
  UploadRegular,
  CloseRegular,
} from '@mingcute/react/core-regular'

import {
  FileUpload,
  FileUploadAction,
  FileUploadActions,
  FileUploadContent,
  FileUploadDescription,
  FileUploadGroup,
  FileUploadMedia,
  FileUploadTitle,
} from '@ui/form/file-upload'
import { Button } from '@ui/actions/button'
import { Spinner } from '@ui/feedback/spinner'

type UploadItem = {
  id: string
  file: File
  preview?: string
  progress: number
  state: 'uploading' | 'done'
}

function formatSize(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function fileKind(file: File) {
  if (file.type.startsWith('image/')) {
    return 'image'
  }
  if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
    return 'pdf'
  }
  if (file.type.includes('sheet') || /\.(csv|xlsx|xls)$/i.test(file.name)) {
    return 'sheet'
  }
  if (/\.(tsx|ts|jsx|js|json)$/i.test(file.name)) {
    return 'code'
  }
  return 'file'
}

function FileGlyph({ file }: { file: File }) {
  switch (fileKind(file)) {
    case 'image':
      return <PicRegular />
    case 'pdf':
      return <FileRegular />
    case 'sheet':
      return <TableRegular />
    case 'code':
      return <FileCodeRegular />
    default:
      return <FileRegular />
  }
}

function useUploadList() {
  const [items, setItems] = useState<UploadItem[]>([])
  const itemsRef = useRef(items)
  itemsRef.current = items

  useEffect(() => {
    return () => {
      for (const item of itemsRef.current) {
        if (item.preview) {
          URL.revokeObjectURL(item.preview)
        }
      }
    }
  }, [])

  const addFiles = (files: FileList | File[], mode: 'append' | 'replace' = 'append') => {
    const next = Array.from(files).map((file) => ({
      id: `${file.name}-${file.size}-${file.lastModified}-${crypto.randomUUID()}`,
      file,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
      progress: 0,
      state: 'uploading' as const,
    }))

    setItems((current) => {
      if (mode === 'replace') {
        for (const item of current) {
          if (item.preview) {
            URL.revokeObjectURL(item.preview)
          }
        }
        return next
      }
      return [...current, ...next]
    })

    for (const item of next) {
      const started = Date.now()
      const tick = () => {
        const progress = Math.min(100, Math.round(((Date.now() - started) / 1200) * 100))
        setItems((current) =>
          current.map((entry) =>
            entry.id === item.id
              ? { ...entry, progress, state: progress >= 100 ? 'done' : 'uploading' }
              : entry,
          ),
        )
        if (progress < 100) {
          window.setTimeout(tick, 80)
        }
      }
      window.setTimeout(tick, 80)
    }
  }

  const remove = (id: string) => {
    setItems((current) => {
      const found = current.find((item) => item.id === id)
      if (found?.preview) {
        URL.revokeObjectURL(found.preview)
      }
      return current.filter((item) => item.id !== id)
    })
  }

  return { items, addFiles, remove }
}

function UploadItemCard({
  item,
  onRemove,
}: {
  item: UploadItem
  onRemove: () => void
}) {
  const kind = fileKind(item.file)
  const typeLabel = item.file.type || 'File'

  return (
    <FileUpload state={item.state} className="w-full max-w-md">
      <FileUploadMedia variant={kind === 'image' && item.preview ? 'image' : 'icon'}>
        {item.state === 'uploading' ? (
          <Spinner />
        ) : kind === 'image' && item.preview ? (
          <img src={item.preview} alt="" />
        ) : (
          <FileGlyph file={item.file} />
        )}
      </FileUploadMedia>
      <FileUploadContent>
        <FileUploadTitle>{item.file.name}</FileUploadTitle>
        <FileUploadDescription>
          {item.state === 'uploading'
            ? `Uploading · ${item.progress}%`
            : `${typeLabel} · ${formatSize(item.file.size)}`}
        </FileUploadDescription>
      </FileUploadContent>
      <FileUploadActions>
        <FileUploadAction aria-label={`Remove ${item.file.name}`} onClick={onRemove}>
          <CloseRegular />
        </FileUploadAction>
      </FileUploadActions>
    </FileUpload>
  )
}

function FilePicker({
  multiple,
  onPick,
}: {
  multiple?: boolean
  onPick: (files: FileList) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const inputId = useId()

  return (
    <>
      <input
        id={inputId}
        ref={inputRef}
        type="file"
        multiple={multiple}
        className="sr-only"
        onChange={(event) => {
          if (event.target.files?.length) {
            onPick(event.target.files)
          }
          event.target.value = ''
        }}
      />
      <Button type="button" variant="outline" size="sm" onClick={() => inputRef.current?.click()}>
        <UploadRegular />
        {multiple ? 'Choose files' : 'Choose file'}
      </Button>
    </>
  )
}

function SingleUploadDemo() {
  const { items, addFiles, remove } = useUploadList()
  const current = items[0]

  return (
    <div className="space-y-3">
      <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
        Upload one
      </p>
      <FilePicker
        onPick={(files) => {
          const first = files[0]
          if (first) {
            addFiles([first], 'replace')
          }
        }}
      />
      {current ? <UploadItemCard item={current} onRemove={() => remove(current.id)} /> : null}
    </div>
  )
}

function ManyUploadDemo() {
  const { items, addFiles, remove } = useUploadList()

  return (
    <div className="space-y-3">
      <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
        Upload many
      </p>
      <FilePicker multiple onPick={addFiles} />
      {items.length ? (
        <FileUploadGroup>
          {items.map((item) => (
            <UploadItemCard key={item.id} item={item} onRemove={() => remove(item.id)} />
          ))}
        </FileUploadGroup>
      ) : null}
    </div>
  )
}

function FileUploadDemo() {
  return (
    <div className="grid gap-8">
      <SingleUploadDemo />
      <ManyUploadDemo />
    </div>
  )
}

export { FileUploadDemo }
