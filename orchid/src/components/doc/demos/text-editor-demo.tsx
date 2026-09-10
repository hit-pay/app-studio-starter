import { useState } from 'react'

import { TextEditor, type TextEditorDocument } from '@/components/form/text-editor'

const handoverNote = JSON.stringify({
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: 'Shift handover',
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'heading',
        version: 1,
        tag: 'h2',
      },
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: 'Note what the next team needs to know. Keep it short.',
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    type: 'root',
    version: 1,
  },
})

const lockedNote = JSON.stringify({
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: 'This note is locked. Staff can read it, not edit it.',
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    type: 'root',
    version: 1,
  },
})

function TextEditorDemo() {
  const [document, setDocument] = useState<TextEditorDocument | null>(null)

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Default
        </p>
        <p className="text-sm text-oc-muted-foreground">
          Bold, italic, heading, and lists. Persist Lexical JSON.
        </p>
        <TextEditor defaultValue={handoverNote} onValueChange={setDocument} />
      </div>
      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Read only
        </p>
        <TextEditor editable={false} defaultValue={lockedNote} />
      </div>
      {document ? (
        <p className="text-xs text-oc-muted-foreground">
          {document.root.children.length} top-level blocks
        </p>
      ) : null}
    </div>
  )
}

export { TextEditorDemo }
