import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { PageTitle } from '@/components/ui/page-title'
import { DOC_COMPONENTS } from './doc-components'

type DocPath = (typeof DOC_COMPONENTS)[number]['to'] | '/'

function DocExamplePage({
  to,
  className,
  children,
}: {
  to: DocPath
  className?: string
  children: ReactNode
}) {
  const item =
    to === '/'
      ? { name: 'Examples', description: 'Browse Orchid UI components.' }
      : DOC_COMPONENTS.find((entry) => entry.to === to)

  return (
    <main className="bg-background">
      <section className={cn('space-y-12 px-8 py-12', className)}>
        {item ? <PageTitle title={item.name} description={item.description} /> : null}
        {children}
      </section>
    </main>
  )
}

export { DocExamplePage }
