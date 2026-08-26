import { createFileRoute } from '@tanstack/react-router'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Radio, RadioGroup } from '@/components/ui/radio-group'

export const Route = createFileRoute('/radio-group')({
  component: RadioGroupExamplesPage,
})

function RadioGroupExamplesPage() {
  return (
    <DocExamplePage to="/radio-group">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Vertical
          </p>
          <RadioGroup label="Label" alignment="Vertical" defaultValue="a">
            <Radio value="a">Text</Radio>
            <Radio value="b">Text</Radio>
            <Radio value="c">Text</Radio>
            <Radio value="d">Text</Radio>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Horizontal
          </p>
          <RadioGroup label="Label" alignment="Horizontal" defaultValue="a">
            <Radio value="a">Text</Radio>
            <Radio value="b">Text</Radio>
            <Radio value="c">Text</Radio>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            States
          </p>
          <RadioGroup defaultValue="active">
            <Radio value="default">Default</Radio>
            <Radio value="active">Active</Radio>
            <Radio value="error" error>
              Error
            </Radio>
            <Radio value="disabled" disabled>
              Disabled
            </Radio>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Description
          </p>
          <RadioGroup defaultValue="a">
            <Radio value="a" description="Some description here...">
              Text
            </Radio>
          </RadioGroup>
        </div>
      </div>
    </DocExamplePage>
  )
}
