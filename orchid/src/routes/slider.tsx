import { createFileRoute } from '@tanstack/react-router'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Slider } from '@/components/ui/slider'

export const Route = createFileRoute('/slider')({
  component: SliderExamplesPage,
})

function SliderExamplesPage() {
  return (
    <DocExamplePage to="/slider">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Default
          </p>
          <Slider defaultValue={78} showIndicator={false} />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Dragged
          </p>
          <Slider defaultValue={78} />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Range
          </p>
          <Slider defaultValue={[25, 75]} />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Multiple thumbs
          </p>
          <Slider defaultValue={[20, 40, 70]} showIndicator={false} />
        </div>
      </div>
    </DocExamplePage>
  )
}
