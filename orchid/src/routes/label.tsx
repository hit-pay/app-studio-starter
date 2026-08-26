import { createFileRoute } from '@tanstack/react-router'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export const Route = createFileRoute('/label')({
  component: LabelExamplesPage,
})

function LabelExamplesPage() {
  return (
    <DocExamplePage to="/label">
      <div className="flex items-center gap-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
    </DocExamplePage>
  )
}
