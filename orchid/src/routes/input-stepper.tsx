import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { InputStepper } from '@/components/ui/input-stepper'

export const Route = createFileRoute('/input-stepper')({
  component: InputStepperExamplesPage,
})

function InputStepperExamplesPage() {
  const [value, setValue] = useState(1)

  return (
    <DocExamplePage to="/input-stepper">
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Default
          </p>
          <InputStepper
            className="max-w-xs"
            value={value}
            min={0}
            max={99}
            onValueChange={setValue}
          />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Uncontrolled
          </p>
          <InputStepper className="max-w-xs" defaultValue={3} min={1} max={10} />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Disabled
          </p>
          <InputStepper className="max-w-xs" defaultValue={5} disabled />
        </div>
      </div>
    </DocExamplePage>
  )
}
