import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { PageTitle } from '@/components/ui/page-title'
import { DOC_BLOCKS, DOC_COMPONENTS, DOC_FORMS } from './doc-components'
import { DocCodePanel } from './doc-code-panel'

type DocPath =
  | (typeof DOC_COMPONENTS)[number]['to']
  | (typeof DOC_FORMS)[number]['to']
  | (typeof DOC_BLOCKS)[number]['to']
  | '/'

function DocExamplePage({
  to,
  usage,
  extraUsage,
  className,
  bodyClassName,
  fill = false,
  children,
}: {
  to: DocPath
  usage?: string
  extraUsage?: Array<{ title: string; filename: string; code: string }>
  className?: string
  bodyClassName?: string
  fill?: boolean
  children: ReactNode
}) {
  const item =
    to === '/'
      ? { name: 'Examples', description: 'Browse Orchid UI components.' }
      : DOC_COMPONENTS.find((entry) => entry.to === to) ??
        DOC_FORMS.find((entry) => entry.to === to) ??
        DOC_BLOCKS.find((entry) => entry.to === to)

  if (fill) {
    return (
      <main className="flex h-full min-h-0 flex-col overflow-hidden bg-oc-background">
        {children}
      </main>
    )
  }

  return (
    <main className="flex h-full min-h-0 flex-col overflow-hidden bg-oc-background">
      <section
        className={cn('flex min-h-0 flex-1 flex-col gap-8 overflow-hidden px-8 py-8', className)}
      >
        {item ? (
          <div className="shrink-0">
            <PageTitle title={item.name} description={item.description} />
          </div>
        ) : null}
        <div
          className={cn(
            '-mx-1 flex min-h-0 flex-1 flex-col gap-8 overflow-y-auto px-1',
            bodyClassName,
          )}
        >
          {children}
          {usage ? (
            <div className="flex min-w-0 flex-col gap-3">
              <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
                Usage
              </p>
              <DocCodePanel filename="usage.tsx" code={usage} />
            </div>
          ) : null}
          {extraUsage?.map((item) => (
            <div key={item.filename} className="flex min-w-0 flex-col gap-3">
              <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
                {item.title}
              </p>
              <DocCodePanel filename={item.filename} code={item.code} />
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export { DocExamplePage }
