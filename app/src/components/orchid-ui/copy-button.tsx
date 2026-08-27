import { useState, type ComponentProps } from 'react'
import { CopyIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip'

function CopyButton({
  className,
  value,
  label = 'Copied!',
  ...props
}: Omit<ComponentProps<'button'>, 'children' | 'onClick' | 'type'> & {
  value: string
  label?: string
}) {
  const [copied, setCopied] = useState(false)

  return (
    <TooltipProvider>
      <Tooltip open={copied} onOpenChange={(open) => !open && setCopied(false)}>
        <TooltipTrigger
          delay={0}
          render={
            <button
              type="button"
              aria-label="Copy"
              data-slot="copy-button"
              className={cn(
                'inline-flex size-4 shrink-0 cursor-pointer items-center justify-center text-oc-muted-foreground outline-none hover:text-oc-foreground [&_svg]:size-full',
                className,
              )}
              onClick={async (event) => {
                event.preventDefault()
                event.stopPropagation()
                await navigator.clipboard.writeText(value)
                setCopied(true)
                window.setTimeout(() => setCopied(false), 1200)
              }}
              {...props}
            >
              <CopyIcon />
            </button>
          }
        />
        <TooltipContent side="top" className="text-oc-muted-foreground">
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export { CopyButton }
