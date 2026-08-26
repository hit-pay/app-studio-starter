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
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Default
          </p>
          <ProgressBar size="Default" value={70} max={100} />
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Small
          </p>
          <ProgressBar size="Small" value={70} max={100} />
        </div>
      </DocExamplePage>
  )
}
