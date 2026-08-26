import { createFileRoute } from '@tanstack/react-router'
import { ProgressBar } from '@/components/ui/progress-bar'
import { DocExamplePage } from '@/components/doc/doc-example-page'

export const Route = createFileRoute('/progress-bar')({
  component: ProgressBarExamplesPage,
})

function ProgressBarExamplesPage() {
  return (
    <DocExamplePage to="/progress-bar">
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Default
        </p>
        <p className="text-xs text-oc-muted-foreground">Invoice collection · INV-2048 · 70%</p>
        <ProgressBar size="Default" value={70} max={100} />
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Small
        </p>
        <p className="text-xs text-oc-muted-foreground">Payout batch processing</p>
        <ProgressBar size="Small" value={70} max={100} />
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Recurring setup
        </p>
        <p className="text-xs text-oc-muted-foreground">Alex Turner plan · 2 of 5 steps</p>
        <ProgressBar size="Default" value={2} max={5} />
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Product stock
        </p>
        <p className="text-xs text-oc-muted-foreground">SKU-TEA-12 · 8 of 24 units remaining</p>
        <ProgressBar size="Small" value={8} max={24} />
      </div>
    </DocExamplePage>
  )
}
