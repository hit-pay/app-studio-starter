import { createFileRoute } from '@tanstack/react-router'
import {
  BoxDetail,
  BoxDetailGrid,
  BoxDetailRow,
} from '@/components/ui/box-detail'
import { Button } from '@/components/ui/button'
import { Chip } from '@/components/ui/chip'
import { PageTitle } from '@/components/ui/page-title'
import { DocExamplePage } from '@/components/doc/doc-example-page'

export const Route = createFileRoute('/page-title')({
  component: PageTitleExamplesPage,
})

function PageTitleExamplesPage() {
  return (
    <DocExamplePage to="/page-title">
        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Default
          </p>
          <PageTitle title="Payments" description="Track incoming and outgoing payments." />
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Actions
          </p>
          <PageTitle
            title="Payment details"
            description="Review this transaction before you continue."
            chip={<Chip color="Green">Paid</Chip>}
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
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            With box
          </p>
          <div className="space-y-4">
            <PageTitle
              title="INV-2048"
              description="https://pay.hitpayapp.com/inv-2048"
              chip={<Chip color="Green">Paid</Chip>}
              copyValue="https://pay.hitpayapp.com/inv-2048"
              actions={
                <Button type="Secondary" style="Border" size="Default">
                  Edit
                </Button>
              }
            />
            <BoxDetail type="Default">
              <BoxDetailGrid columns={2}>
                <BoxDetailRow label="Customer" alignment="Vertical">
                  Alex Turner
                </BoxDetailRow>
                <BoxDetailRow label="Email" alignment="Vertical">
                  alex@example.com
                </BoxDetailRow>
                <BoxDetailRow label="Amount" alignment="Vertical">
                  SGD 128.00
                </BoxDetailRow>
                <BoxDetailRow label="Method" alignment="Vertical">
                  Card
                </BoxDetailRow>
              </BoxDetailGrid>
            </BoxDetail>
          </div>
        </div>
      </DocExamplePage>
  )
}
