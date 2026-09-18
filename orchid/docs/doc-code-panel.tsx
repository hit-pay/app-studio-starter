import { useState } from 'react'
import {
  CheckRegular,
  CopyRegular,
} from '@mingcute/react/core-regular'
import { LiveError, LivePreview, LiveProvider } from 'react-live'

import { Button } from '@ui/button'
import { AddRegular } from '@mingcute/react/core-regular'

function DocCodePanel({
  filename,
  code,
}: {
  filename: string
  code: string
}) {
  const [copied, setCopied] = useState(false)

  return (
    <div className="w-full min-w-0 max-w-full shrink-0 overflow-hidden rounded-xl border border-solid border-oc-border bg-oc-muted">
      <div className="flex items-center justify-between gap-3 border-b border-solid border-oc-border px-3 py-2">
        <span className="truncate font-mono text-xs text-oc-muted-foreground">{filename}</span>
        <Button
          variant="outline"
          size="sm"
          onClick={async () => {
            await navigator.clipboard.writeText(code)
            setCopied(true)
            window.setTimeout(() => setCopied(false), 1600)
          }}
        >
          {copied ? <CheckRegular /> : <CopyRegular />}
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>
      <pre className="max-h-[70vh] overflow-auto overscroll-x-contain p-4 text-[13px] leading-5 whitespace-pre text-oc-foreground">
        <code className="block w-max min-w-full">{code}</code>
      </pre>
    </div>
  )
}

function previewCode(code: string, noInline: boolean) {
  if (noInline) return code
  const trimmed = code.trim()
  if (/^(function |const |let |class |<>)/.test(trimmed)) return trimmed
  return `<>${trimmed}</>`
}

function DocExamples({
  examples,
  scope = {},
  noInline = false,
}: {
  examples: Array<{ description: string; code: string }>
  scope?: Record<string, unknown>
  noInline?: boolean
}) {
  return (
    <div className="grid gap-6">
      {examples.map((example) => (
        <div key={example.description} className="grid gap-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            {example.description}
          </p>
          <LiveProvider
            code={previewCode(example.code, noInline)}
            noInline={noInline}
            scope={{
              AddIcon: AddRegular,
              Button,
              save: () => undefined,
              ...scope,
            }}
          >
            <div className="min-h-16 w-full min-w-0 rounded-xl border border-solid border-oc-border p-4 *:w-full">
              <LivePreview />
            </div>
            <LiveError className="text-sm text-oc-destructive" />
          </LiveProvider>
          <DocCodePanel filename="usage.tsx" code={example.code} />
        </div>
      ))}
    </div>
  )
}

function DocRegistryDescription({ description }: { description?: string | null }) {
  if (!description?.trim()) return null
  return (
    <p className="text-sm leading-6 text-oc-muted-foreground">{description}</p>
  )
}

function DocPropsTable({ props }: { props: Record<string, unknown> }) {
  return (
    <div className="overflow-hidden rounded-xl border border-solid border-oc-border">
      <table className="w-full text-left text-sm">
        <thead className="bg-oc-muted text-xs uppercase">
          <tr>
            <th className="px-3 py-2">Prop</th>
            <th className="px-3 py-2">Values</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(props).map(([name, value]) => (
            <tr key={name} className="border-t border-solid border-oc-border">
              <td className="px-3 py-2 font-mono text-oc-foreground">{name}</td>
              <td className="px-3 py-2 font-mono text-oc-muted-foreground">
                {Array.isArray(value) ? value.join(" | ") : String(value)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function DocPropsSection({
  title = 'Props',
  props,
}: {
  title?: string
  props?: Record<string, unknown> | null
}) {
  if (!props || Object.keys(props).length === 0) return null
  return (
    <div className="grid gap-3">
      <h2 className="text-lg font-semibold text-oc-foreground">{title}</h2>
      <DocPropsTable props={props} />
    </div>
  )
}

export {
  DocCodePanel,
  DocExamples,
  DocPropsSection,
  DocPropsTable,
  DocRegistryDescription,
}
