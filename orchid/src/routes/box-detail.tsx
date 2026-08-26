import { createFileRoute } from '@tanstack/react-router'
import { Avatar } from '@/components/ui/avatar'
import {
  BoxDetail,
  BoxDetailGrid,
  BoxDetailHeader,
  BoxDetailRow,
  BoxDetailTitle,
} from '@/components/ui/box-detail'
import { Button } from '@/components/ui/button'
import { Chip } from '@/components/ui/chip'
import { DocExamplePage } from '@/components/doc/doc-example-page'

export const Route = createFileRoute('/box-detail')({
  component: BoxDetailExamplesPage,
})

const PHOTO =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop'

function BoxDetailExamplesPage() {
  return (
    <DocExamplePage to="/box-detail">
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Default
        </p>
        <BoxDetail type="Default">
          <BoxDetailGrid columns={2}>
            <BoxDetailRow label="Invoice" alignment="Vertical">
              INV-2026-0842
            </BoxDetailRow>
            <BoxDetailRow label="Customer" alignment="Vertical">
              alex@arcticmonkey.io
            </BoxDetailRow>
            <BoxDetailRow label="Status" alignment="Vertical">
              <Chip color="Green">Paid</Chip>
            </BoxDetailRow>
            <BoxDetailRow label="Channel" alignment="Vertical">
              PayNow
            </BoxDetailRow>
          </BoxDetailGrid>
        </BoxDetail>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Border
        </p>
        <BoxDetail type="Border">
          <BoxDetailHeader>
            <BoxDetailTitle>Payment details</BoxDetailTitle>
          </BoxDetailHeader>
          <BoxDetailGrid columns={2}>
            <BoxDetailRow label="Email" alignment="Vertical">
              alex@arcticmonkey.io
            </BoxDetailRow>
            <BoxDetailRow label="Phone" alignment="Vertical">
              +65 8123 4567
            </BoxDetailRow>
            <BoxDetailRow label="Status" alignment="Vertical">
              <Chip color="Green">Paid</Chip>
            </BoxDetailRow>
            <BoxDetailRow label="Method" alignment="Vertical">
              Cards
            </BoxDetailRow>
          </BoxDetailGrid>
        </BoxDetail>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          3 columns, 2 rows
        </p>
        <BoxDetail type="Border">
          <BoxDetailGrid columns={3}>
            <BoxDetailRow label="Created" alignment="Vertical">
              25 Aug 2026
            </BoxDetailRow>
            <BoxDetailRow label="Channel" alignment="Vertical">
              Online Store
            </BoxDetailRow>
            <BoxDetailRow label="Currency" alignment="Vertical">
              SGD
            </BoxDetailRow>
            <BoxDetailRow label="Amount" alignment="Vertical" size="Big">
              128.00
            </BoxDetailRow>
            <BoxDetailRow label="Fee" alignment="Vertical">
              3.20
            </BoxDetailRow>
            <BoxDetailRow label="Net" alignment="Vertical">
              124.80
            </BoxDetailRow>
          </BoxDetailGrid>
        </BoxDetail>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Colspan
        </p>
        <BoxDetail type="Border">
          <BoxDetailHeader>
            <BoxDetailTitle>Customer Data</BoxDetailTitle>
            <Button type="Secondary" style="Transparent" size="Small">
              Edit
            </Button>
          </BoxDetailHeader>
          <BoxDetailGrid columns={4}>
            <BoxDetailRow label="Customer" alignment="Vertical" colSpan={2}>
              <span className="inline-flex items-center gap-2">
                <Avatar size={24} type="Image" src={PHOTO} alt="" />
                Alex Turner
              </span>
            </BoxDetailRow>
            <BoxDetailRow label="Email" alignment="Vertical">
              alex@arcticmonkey.io
            </BoxDetailRow>
            <BoxDetailRow label="Phone" alignment="Vertical">
              +65 8123 4567
            </BoxDetailRow>
            <BoxDetailRow label="Billing address" alignment="Vertical" colSpan={3}>
              1 Raffles Place, Singapore 048616
            </BoxDetailRow>
            <BoxDetailRow label="Country" alignment="Vertical">
              SG
            </BoxDetailRow>
            <BoxDetailRow label="Payment ID" alignment="Vertical" colSpan={4} copyValue="pay_8f2a91">
              pay_8f2a91
            </BoxDetailRow>
          </BoxDetailGrid>
        </BoxDetail>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Stacked rows
        </p>
        <BoxDetail type="Default">
          <BoxDetailRow label="Email">alex@arcticmonkey.io</BoxDetailRow>
          <BoxDetailRow label="Phone">+65 8123 4567</BoxDetailRow>
        </BoxDetail>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Stacked rows, Border
        </p>
        <BoxDetail type="Border">
          <BoxDetailRow label="Email">alex@arcticmonkey.io</BoxDetailRow>
          <BoxDetailRow label="Phone">+65 8123 4567</BoxDetailRow>
        </BoxDetail>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Product Data
        </p>
        <BoxDetail type="Border">
          <BoxDetailHeader>
            <BoxDetailTitle>SKU</BoxDetailTitle>
          </BoxDetailHeader>
          <BoxDetailGrid columns={2}>
            <BoxDetailRow label="SKU" alignment="Vertical">
              HP-MUG-001
            </BoxDetailRow>
            <BoxDetailRow label="Price" alignment="Vertical">
              SGD 28.00
            </BoxDetailRow>
            <BoxDetailRow label="Inventory" alignment="Vertical">
              42 in stock
            </BoxDetailRow>
            <BoxDetailRow label="Sold via" alignment="Vertical">
              Online Store
            </BoxDetailRow>
          </BoxDetailGrid>
        </BoxDetail>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Recurring plan
        </p>
        <BoxDetail type="Border">
          <BoxDetailGrid columns={2}>
            <BoxDetailRow label="Plan" alignment="Vertical">
              Monthly membership
            </BoxDetailRow>
            <BoxDetailRow label="Amount" alignment="Vertical">
              SGD 49.00
            </BoxDetailRow>
            <BoxDetailRow label="Next charge" alignment="Vertical">
              1 Sep 2026
            </BoxDetailRow>
            <BoxDetailRow label="Method" alignment="Vertical">
              Cards
            </BoxDetailRow>
          </BoxDetailGrid>
        </BoxDetail>
      </div>
    </DocExamplePage>
  )
}
