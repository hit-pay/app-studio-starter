import { createFileRoute } from '@tanstack/react-router'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Toggle } from '@/components/ui/toggle'

export const Route = createFileRoute('/toggle')({
  component: ToggleExamplesPage,
})

function ToggleExamplesPage() {
  return (
    <DocExamplePage to="/toggle">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Default
          </p>
          <div className="flex items-center gap-4">
            <Toggle />
            <Toggle defaultChecked />
            <Toggle disabled />
            <Toggle defaultChecked disabled />
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Small
          </p>
          <div className="flex items-center gap-4">
            <Toggle size="Small" />
            <Toggle size="Small" defaultChecked />
            <Toggle size="Small" disabled />
            <Toggle size="Small" defaultChecked disabled />
          </div>
        </div>
      </div>
    </DocExamplePage>
  )
}
