import { createFileRoute } from '@tanstack/react-router'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DetailList,
  DetailListGrid,
  DetailListHeader,
  DetailListRow,
  DetailListTitle,
} from '@/components/ui/detail-list'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DocExamplePage } from '@/components/doc/doc-example-page'

export const Route = createFileRoute('/detail-list')({
  component: DetailListExamplesPage,
})

const PHOTO =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop'

function DetailListExamplesPage() {
  return (
    <DocExamplePage to="/detail-list">
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Default
        </p>
        <DetailList style="Default">
          <DetailListGrid columns={2}>
            <DetailListRow label="Invoice" alignment="Vertical">
              INV-2026-0842
            </DetailListRow>
            <DetailListRow label="Customer" alignment="Vertical">
              alex@arcticmonkey.io
            </DetailListRow>
            <DetailListRow label="Status" alignment="Vertical">
              <Badge color="Green">Paid</Badge>
            </DetailListRow>
            <DetailListRow label="Channel" alignment="Vertical">
              PayNow
            </DetailListRow>
          </DetailListGrid>
        </DetailList>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Border
        </p>
        <DetailList style="Border">
          <DetailListHeader>
            <DetailListTitle>Payment details</DetailListTitle>
          </DetailListHeader>
          <DetailListGrid columns={2}>
            <DetailListRow label="Email" alignment="Vertical">
              alex@arcticmonkey.io
            </DetailListRow>
            <DetailListRow label="Phone" alignment="Vertical">
              +65 8123 4567
            </DetailListRow>
            <DetailListRow label="Status" alignment="Vertical">
              <Badge color="Green">Paid</Badge>
            </DetailListRow>
            <DetailListRow label="Method" alignment="Vertical">
              Cards
            </DetailListRow>
          </DetailListGrid>
        </DetailList>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          3 columns, 2 rows
        </p>
        <DetailList style="Border">
          <DetailListGrid columns={3}>
            <DetailListRow label="Created" alignment="Vertical">
              25 Aug 2026
            </DetailListRow>
            <DetailListRow label="Channel" alignment="Vertical">
              Online Store
            </DetailListRow>
            <DetailListRow label="Currency" alignment="Vertical">
              SGD
            </DetailListRow>
            <DetailListRow label="Amount" alignment="Vertical" size="Big">
              128.00
            </DetailListRow>
            <DetailListRow label="Fee" alignment="Vertical">
              3.20
            </DetailListRow>
            <DetailListRow label="Net" alignment="Vertical">
              124.80
            </DetailListRow>
          </DetailListGrid>
        </DetailList>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Colspan
        </p>
        <DetailList style="Border">
          <DetailListHeader>
            <DetailListTitle>Customer Data</DetailListTitle>
            <Button variant="Secondary" style="Transparent" size="Small">
              Edit
            </Button>
          </DetailListHeader>
          <DetailListGrid columns={4}>
            <DetailListRow label="Customer" alignment="Vertical" colSpan={2}>
              <span className="inline-flex items-center gap-2">
                <Avatar size="sm">
                  <AvatarImage src={PHOTO} alt="" />
                  <AvatarFallback>AT</AvatarFallback>
                </Avatar>
                Alex Turner
              </span>
            </DetailListRow>
            <DetailListRow label="Email" alignment="Vertical">
              alex@arcticmonkey.io
            </DetailListRow>
            <DetailListRow label="Phone" alignment="Vertical">
              +65 8123 4567
            </DetailListRow>
            <DetailListRow label="Billing address" alignment="Vertical" colSpan={3}>
              1 Raffles Place, Singapore 048616
            </DetailListRow>
            <DetailListRow label="Country" alignment="Vertical">
              SG
            </DetailListRow>
            <DetailListRow label="Payment ID" alignment="Vertical" colSpan={4} copyValue="pay_8f2a91">
              pay_8f2a91
            </DetailListRow>
          </DetailListGrid>
        </DetailList>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Stacked rows
        </p>
        <DetailList style="Default">
          <DetailListRow label="Email">alex@arcticmonkey.io</DetailListRow>
          <DetailListRow label="Phone">+65 8123 4567</DetailListRow>
        </DetailList>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Stacked rows, Border
        </p>
        <DetailList style="Border">
          <DetailListRow label="Email">alex@arcticmonkey.io</DetailListRow>
          <DetailListRow label="Phone">+65 8123 4567</DetailListRow>
        </DetailList>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Product Data
        </p>
        <DetailList style="Border">
          <DetailListHeader>
            <DetailListTitle>SKU</DetailListTitle>
          </DetailListHeader>
          <DetailListGrid columns={2}>
            <DetailListRow label="SKU" alignment="Vertical">
              HP-MUG-001
            </DetailListRow>
            <DetailListRow label="Price" alignment="Vertical">
              SGD 28.00
            </DetailListRow>
            <DetailListRow label="Inventory" alignment="Vertical">
              42 in stock
            </DetailListRow>
            <DetailListRow label="Sold via" alignment="Vertical">
              Online Store
            </DetailListRow>
          </DetailListGrid>
        </DetailList>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Recurring plan
        </p>
        <DetailList style="Border">
          <DetailListGrid columns={2}>
            <DetailListRow label="Plan" alignment="Vertical">
              Monthly membership
            </DetailListRow>
            <DetailListRow label="Amount" alignment="Vertical">
              SGD 49.00
            </DetailListRow>
            <DetailListRow label="Next charge" alignment="Vertical">
              1 Sep 2026
            </DetailListRow>
            <DetailListRow label="Method" alignment="Vertical">
              Cards
            </DetailListRow>
          </DetailListGrid>
        </DetailList>
      </div>
    </DocExamplePage>
  )
}
