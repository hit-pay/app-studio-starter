import { createFileRoute } from '@tanstack/react-router'
import { SmartphoneIcon, MonitorIcon } from 'lucide-react'
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs'
import { DocExamplePage } from '@/components/doc/doc-example-page'

export const Route = createFileRoute('/tabs')({
  component: TabsExamplesPage,
})

function TabsExamplesPage() {
  return (
    <DocExamplePage to="/tabs">
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Default
        </p>
        <Tabs defaultValue="invoice" variant="Default">
          <TabsList>
            <TabsTrigger value="invoice">Invoice</TabsTrigger>
            <TabsTrigger value="link">Payment Link</TabsTrigger>
            <TabsTrigger value="recurring" count={8}>
              Recurring
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
        <Tabs defaultValue="pos" variant="Pills">
          <TabsList>
            <TabsTrigger value="pos" icon={<SmartphoneIcon />}>
              Point of Sale
            </TabsTrigger>
            <TabsTrigger value="store" icon={<MonitorIcon />}>
              Online Store
            </TabsTrigger>
          </TabsList>
          <TabsContent value="pos">Terminal HP-POS-04 · last sale SGD 24.50 via GrabPay</TabsContent>
          <TabsContent value="store">Home page published · PayNow and Cards at checkout</TabsContent>
        </Tabs>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Big
        </p>
        <Tabs defaultValue="commerce" variant="Default" size="Big">
          <TabsList>
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
        <Tabs defaultValue="stock" variant="Default">
          <TabsList>
            <TabsTrigger value="stock">Stock</TabsTrigger>
            <TabsTrigger value="sku">SKUs</TabsTrigger>
            <TabsTrigger value="sold" count={12}>
              Sold today
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
