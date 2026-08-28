import { createFileRoute } from '@tanstack/react-router'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { ScrollArea } from '@/components/ui/scroll-area'

export const Route = createFileRoute('/scroll-area')({
  component: ScrollAreaExamplesPage,
})

const INVOICES = [
  'INV-2048 · Priya Nair · SGD 128.00',
  'INV-2047 · Alex Turner · SGD 86.50',
  'INV-2046 · Chloe Tan · SGD 240.00',
  'INV-2045 · Daniel Kim · SGD 54.00',
  'INV-2044 · Elena Santos · SGD 312.00',
  'INV-2043 · Priya Nair · SGD 19.90',
  'INV-2042 · Alex Turner · SGD 75.00',
  'INV-2041 · Chloe Tan · SGD 148.00',
  'INV-2040 · Daniel Kim · SGD 99.00',
  'INV-2039 · Elena Santos · SGD 410.00',
]

function ScrollAreaExamplesPage() {
  return (
    <DocExamplePage
      to="/scroll-area"
      usage={`import { ScrollArea } from '@/components/ui/scroll-area'

<ScrollArea className="h-64 rounded-lg border border-oc-border">
  {/* long list */}
</ScrollArea>`}
    >
      <div className="max-w-sm space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Invoice list
        </p>
        <ScrollArea className="h-64 rounded-lg border border-solid border-oc-border">
          <ul className="flex flex-col gap-1 p-3 text-sm leading-[1.5] text-oc-foreground">
            {INVOICES.map((row) => (
              <li key={row} className="rounded-md px-2 py-1.5 hover:bg-oc-dark-blue-soft">
                {row}
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>
    </DocExamplePage>
  )
}
