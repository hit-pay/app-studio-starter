import { createFileRoute } from '@tanstack/react-router'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

export const Route = createFileRoute('/spinner')({
  component: SpinnerExamplesPage,
})

function SpinnerExamplesPage() {
  return (
    <DocExamplePage
      to="/spinner"
      usage={`import { Spinner } from '@/components/ui/spinner'
import { Button } from '@/components/ui/button'

<Spinner />
<Spinner size="Small" />
<Button variant="Primary" disabled>
  <Spinner size="Small" label="Saving" />
  Saving
</Button>`}
    >
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Size
        </p>
        <div className="flex items-center gap-6">
          <Spinner size="Small" />
          <Spinner />
          <Spinner size="Big" />
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          On a button
        </p>
        <Button variant="Primary" disabled>
          <Spinner size="Small" label="Saving" />
          Saving invoice
        </Button>
      </div>
    </DocExamplePage>
  )
}
