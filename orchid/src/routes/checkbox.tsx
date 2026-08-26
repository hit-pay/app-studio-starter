import { createFileRoute } from '@tanstack/react-router'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Checkbox, CheckboxGroup } from '@/components/ui/checkbox'

export const Route = createFileRoute('/checkbox')({
  component: CheckboxExamplesPage,
})

function CheckboxExamplesPage() {
  return (
    <DocExamplePage to="/checkbox">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Vertical
          </p>
          <CheckboxGroup label="Label" alignment="Vertical" defaultValue={['a']}>
            <Checkbox value="a">Text</Checkbox>
            <Checkbox value="b">Text</Checkbox>
            <Checkbox value="c">Text</Checkbox>
            <Checkbox value="d">Text</Checkbox>
          </CheckboxGroup>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Horizontal
          </p>
          <CheckboxGroup label="Label" alignment="Horizontal" defaultValue={['a']}>
            <Checkbox value="a">Text</Checkbox>
            <Checkbox value="b">Text</Checkbox>
            <Checkbox value="c">Text</Checkbox>
          </CheckboxGroup>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            States
          </p>
          <div className="flex flex-col gap-2">
            <Checkbox>Default</Checkbox>
            <Checkbox defaultChecked>Active</Checkbox>
            <Checkbox indeterminate>Partial</Checkbox>
            <Checkbox error>Error</Checkbox>
            <Checkbox disabled>Disabled</Checkbox>
            <Checkbox defaultChecked disabled>
              Active disabled
            </Checkbox>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Description
          </p>
          <Checkbox description="Some description here...">Text</Checkbox>
        </div>
      </div>
    </DocExamplePage>
  )
}
