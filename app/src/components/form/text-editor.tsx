'use client'

import { useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  type SerializedEditorState,
} from 'lexical'
import { $isHeadingNode, $createHeadingNode, HeadingNode } from '@lexical/rich-text'
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListItemNode,
  ListNode,
} from '@lexical/list'
import { $setBlocksType } from '@lexical/selection'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import {
  BoldRegular,
  Heading2Regular,
  ItalicRegular,
  ListCheckRegular,
  ListOrderedRegular,
  UnderlineRegular,
} from '@mingcute/react/core-regular'

import { Button } from '@/base-ui/actions/button'
import { cn } from '@/lib/utils'

export type TextEditorDocument = SerializedEditorState

const theme = {
  paragraph: 'my-1.5 first:mt-0',
  heading: {
    h2: 'mt-0 mb-2 text-lg font-semibold',
  },
  list: {
    ul: 'my-2 list-disc pl-5',
    ol: 'my-2 list-decimal pl-5',
    listitem: 'my-0.5',
  },
  text: {
    bold: 'font-bold',
    italic: 'italic',
    underline: 'underline',
  },
}

function onError(error: Error) {
  console.error(error)
}

function initialEditorState(defaultValue?: TextEditorDocument | string) {
  if (defaultValue == null || defaultValue === '') {
    return undefined
  }

  return typeof defaultValue === 'string' ? defaultValue : JSON.stringify(defaultValue)
}

function ToolbarButton({
  active,
  label,
  onClick,
  children,
}: {
  active?: boolean
  label: string
  onClick: () => void
  children: ReactNode
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-label={label}
      aria-pressed={active}
      className={active ? 'bg-oc-muted text-oc-foreground' : undefined}
      onMouseDown={(event) => {
        event.preventDefault()
        onClick()
      }}
    >
      {children}
    </Button>
  )
}

function Toolbar() {
  const [editor] = useLexicalComposerContext()
  const [bold, setBold] = useState(false)
  const [italic, setItalic] = useState(false)
  const [underline, setUnderline] = useState(false)
  const [heading, setHeading] = useState(false)

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection()

        if (!$isRangeSelection(selection)) {
          return
        }

        const block = selection.anchor.getNode().getTopLevelElementOrThrow()

        setBold(selection.hasFormat('bold'))
        setItalic(selection.hasFormat('italic'))
        setUnderline(selection.hasFormat('underline'))
        setHeading($isHeadingNode(block) && block.getTag() === 'h2')
      })
    })
  }, [editor])

  return (
    <div className="flex flex-wrap gap-0.5 border-b border-solid border-oc-border px-1.5 py-1">
      <ToolbarButton
        label="Bold"
        active={bold}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
        }}
      >
        <BoldRegular />
      </ToolbarButton>
      <ToolbarButton
        label="Italic"
        active={italic}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
        }}
      >
        <ItalicRegular />
      </ToolbarButton>
      <ToolbarButton
        label="Underline"
        active={underline}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')
        }}
      >
        <UnderlineRegular />
      </ToolbarButton>
      <ToolbarButton
        label="Heading"
        active={heading}
        onClick={() => {
          editor.update(() => {
            const selection = $getSelection()

            if (!$isRangeSelection(selection)) {
              return
            }

            const block = selection.anchor.getNode().getTopLevelElementOrThrow()
            const isHeading = $isHeadingNode(block) && block.getTag() === 'h2'

            $setBlocksType(selection, () =>
              isHeading ? $createParagraphNode() : $createHeadingNode('h2'),
            )
          })
        }}
      >
        <Heading2Regular />
      </ToolbarButton>
      <ToolbarButton
        label="Bullet list"
        onClick={() => {
          editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
        }}
      >
        <ListCheckRegular />
      </ToolbarButton>
      <ToolbarButton
        label="Numbered list"
        onClick={() => {
          editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
        }}
      >
        <ListOrderedRegular />
      </ToolbarButton>
    </div>
  )
}

function TextEditor({
  className,
  defaultValue,
  editable = true,
  onValueChange,
}: {
  className?: string
  defaultValue?: TextEditorDocument | string
  editable?: boolean
  onValueChange?: (document: TextEditorDocument) => void
}) {
  const initialConfig = useMemo(
    () => ({
      namespace: 'orchid-text-editor',
      theme,
      editable,
      onError,
      nodes: [HeadingNode, ListNode, ListItemNode],
      editorState: initialEditorState(defaultValue),
    }),
    [],
  )

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div
        data-slot="text-editor"
        className={cn(
          'w-full overflow-hidden rounded-lg border border-solid border-oc-border bg-oc-background text-oc-foreground shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1.5px_1.5px_rgba(0,0,0,0.09)]',
          className,
        )}
      >
        {editable ? <Toolbar /> : null}
        <div className="relative min-h-48">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                aria-placeholder="Write a note…"
                placeholder={
                  <div className="pointer-events-none absolute top-2 left-2.5 text-sm text-oc-muted-foreground">
                    Write a note…
                  </div>
                }
                className={cn(
                  'min-h-48 px-2.5 py-2 text-sm leading-relaxed outline-none',
                  !editable && 'cursor-default bg-oc-muted/40',
                )}
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <HistoryPlugin />
        <ListPlugin />
        {onValueChange ? (
          <OnChangePlugin
            ignoreSelectionChange
            onChange={(editorState) => {
              onValueChange(editorState.toJSON())
            }}
          />
        ) : null}
      </div>
    </LexicalComposer>
  )
}

export { TextEditor }
