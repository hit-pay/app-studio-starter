import { createFileRoute } from '@tanstack/react-router'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Button } from '@/components/ui/button'
import { Chip } from '@/components/ui/chip'
import { PageTitle } from '@/components/ui/page-title'
import { SubHeader } from '@/components/ui/sub-header'

export const Route = createFileRoute('/sub-header')({
  component: SubHeaderExamplesPage,
})

function SubHeaderExamplesPage() {
  return (
    <DocExamplePage to="/sub-header">
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
          Back
        </p>
        <div>
          <SubHeader
            left="Back"
            actions={
              <>
                <Button type="Secondary" style="Border" size="Default">
                  Cancel
                </Button>
                <Button type="Primary" size="Default">
                  Save
                </Button>
              </>
            }
          />
          <div className="px-6 py-4">
            <PageTitle
              title="Payment details"
              description="Review this transaction before you continue."
              chip={<Chip color="Green">Paid</Chip>}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
          Close
        </p>
        <SubHeader
          left="Close"
          actions={
            <>
              <Button type="Secondary" size="Default">
                Cancel
              </Button>
              <Button type="Primary" size="Default">
                Save
              </Button>
            </>
          }
        />
      </div>
    </DocExamplePage>
  )
}
