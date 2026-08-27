import { useState } from 'react'
import { CheckIcon, CopyIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

function DocCodePanel({
  filename,
  code,
}: {
  filename: string
  code: string
}) {
  const [copied, setCopied] = useState(false)

  return (
    <div className="flex max-h-[70vh] min-w-0 flex-col overflow-hidden rounded-xl border border-solid border-oc-border bg-oc-muted">
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-solid border-oc-border px-3 py-2">
        <span className="truncate font-mono text-xs text-oc-muted-foreground">{filename}</span>
        <Button
          variant="Secondary"
          style="Border"
          size="Small"
          onClick={async () => {
            await navigator.clipboard.writeText(code)
            setCopied(true)
            window.setTimeout(() => setCopied(false), 1600)
          }}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>
      <pre className="min-h-0 flex-1 overflow-auto p-4 text-[13px] leading-5 break-all whitespace-pre-wrap text-oc-foreground">
        <code>{code}</code>
      </pre>
    </div>
  )
}

export { DocCodePanel }
