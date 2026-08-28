import { createFileRoute } from '@tanstack/react-router'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Kbd, KbdGroup } from '@/components/ui/kbd'

export const Route = createFileRoute('/kbd')({
  component: KbdExamplesPage,
})

function KbdExamplesPage() {
  return (
    <DocExamplePage
      to="/kbd"
      usage={`import { Kbd, KbdGroup } from '@/components/ui/kbd'

Close
<Kbd>Esc</Kbd>

<KbdGroup>
  <Kbd>⌘</Kbd>
  <Kbd>K</Kbd>
</KbdGroup>`}
    >
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Default
        </p>
        <p className="flex flex-wrap items-center gap-2 text-sm leading-[1.5] text-oc-foreground">
          Close
          <Kbd>Esc</Kbd>
        </p>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Group
        </p>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </div>
    </DocExamplePage>
  )
}
