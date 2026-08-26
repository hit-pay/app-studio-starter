import { createFileRoute } from '@tanstack/react-router'
import { CopyTooltip } from '@/components/ui/copy-tooltip'
import { DocExamplePage } from '@/components/doc/doc-example-page'

export const Route = createFileRoute('/copy-tooltip')({
  component: CopyTooltipExamplesPage,
})

function CopyTooltipExamplesPage() {
  return (
    <DocExamplePage to="/copy-tooltip">
        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Default
          </p>
          <div className="flex items-center gap-2 text-sm leading-[1.5] text-foreground">
            <span>+65 8373 3739 18</span>
            <CopyTooltip value="+65 8373 3739 18" />
          </div>
        </div>
      </DocExamplePage>
  )
}
