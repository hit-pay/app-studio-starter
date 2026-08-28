import { createFileRoute } from '@tanstack/react-router'
import { SmartphoneIcon, MonitorIcon } from 'lucide-react'
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs'
import { DocExamplePage } from '@/components/doc/doc-example-page'

export const Route = createFileRoute('/tabs')({
  component: TabsExamplesPage,
})

function TabsExamplesPage() {
  return (
    <DocExamplePage
      to="/tabs"
      usage={`import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account settings</TabsContent>
  <TabsContent value="password">Password settings</TabsContent>
</Tabs>`}
    >
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Default
        </p>
        <Tabs defaultValue="invoice">
          <TabsList variant="line">
            <TabsTrigger value="invoice">Invoice</TabsTrigger>
            <TabsTrigger value="link">Payment Link</TabsTrigger>
            <TabsTrigger value="recurring">
              Recurring
              <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-oc-neutral-soft px-1.5 text-xs">
                8
              </span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="invoice">INV-2048 · Priya Nair · SGD 128.00 · Cards</TabsContent>
          <TabsContent value="link">Weekend brunch link · SGD 48.00 · PayNow and GrabPay</TabsContent>
          <TabsContent value="recurring">8 active plans including Alex Turner · SGD 29.00 / month</TabsContent>
        </Tabs>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Pills
        </p>
        <Tabs defaultValue="pos">
          <TabsList>
            <TabsTrigger value="pos">
              <SmartphoneIcon data-icon="inline-start" />
              Point of Sale
            </TabsTrigger>
            <TabsTrigger value="store">
              <MonitorIcon data-icon="inline-start" />
              Online Store
            </TabsTrigger>
          </TabsList>
          <TabsContent value="pos">Terminal HP-POS-04 · last sale SGD 24.50 via GrabPay</TabsContent>
          <TabsContent value="store">Home page published · PayNow and Cards at checkout</TabsContent>
        </Tabs>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Custom size
        </p>
        <Tabs defaultValue="commerce">
          <TabsList variant="line" className="**:data-[slot=tabs-trigger]:px-4 **:data-[slot=tabs-trigger]:py-2.5 **:data-[slot=tabs-trigger]:text-base">
            <TabsTrigger value="commerce">Commerce</TabsTrigger>
            <TabsTrigger value="channels">Payment Channels</TabsTrigger>
            <TabsTrigger value="data">Customer Data</TabsTrigger>
          </TabsList>
          <TabsContent value="commerce">Invoice, Payment Link, Recurring, POS, and Online Store</TabsContent>
          <TabsContent value="channels">PayNow, Cards, GrabPay, WeChat Pay · SGD</TabsContent>
          <TabsContent value="data">Priya Nair, Alex Turner, and product SKUs</TabsContent>
        </Tabs>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Product data
        </p>
        <Tabs defaultValue="stock">
          <TabsList variant="line">
            <TabsTrigger value="stock">Stock</TabsTrigger>
            <TabsTrigger value="sku">SKUs</TabsTrigger>
            <TabsTrigger value="sold">
              Sold today
              <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-oc-neutral-soft px-1.5 text-xs">
                12
              </span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="stock">Matcha Latte · SKU-TEA-12 · 24 units remaining</TabsContent>
          <TabsContent value="sku">SKU-TEA-12, SKU-BKR-03, SKU-POS-01</TabsContent>
          <TabsContent value="sold">12 POS sales · SGD 286.00 · mixed PayNow and Cards</TabsContent>
        </Tabs>
      </div>
    </DocExamplePage>
  )
}
