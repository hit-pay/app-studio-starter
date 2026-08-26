import { useState, type ComponentProps } from 'react'
import { CopyIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip'

function CopyTooltip({
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
              data-slot="copy-tooltip"
              className={cn(
                'inline-flex size-4 shrink-0 items-center justify-center text-muted-foreground outline-none hover:text-foreground [&_svg]:size-full',
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
        <TooltipContent side="top" className="text-muted-foreground">
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export { CopyTooltip }
