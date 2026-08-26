import { createFileRoute } from '@tanstack/react-router'
import { SmartphoneIcon, MonitorIcon } from 'lucide-react'
import { Tabs, TabsList, TabsPanel, TabsTab } from '@/components/ui/tabs'
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
        <Tabs defaultValue="invoice" type="Default">
          <TabsList>
            <TabsTab value="invoice">Invoice</TabsTab>
            <TabsTab value="link">Payment Link</TabsTab>
            <TabsTab value="recurring" count={8}>
              Recurring
            </TabsTab>
          </TabsList>
          <TabsPanel value="invoice">INV-2048 · Priya Nair · SGD 128.00 · Cards</TabsPanel>
          <TabsPanel value="link">Weekend brunch link · SGD 48.00 · PayNow and GrabPay</TabsPanel>
          <TabsPanel value="recurring">8 active plans including Alex Turner · SGD 29.00 / month</TabsPanel>
        </Tabs>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Pills
        </p>
        <Tabs defaultValue="pos" type="Pills">
          <TabsList>
            <TabsTab value="pos" icon={<SmartphoneIcon />}>
              Point of Sale
            </TabsTab>
            <TabsTab value="store" icon={<MonitorIcon />}>
              Online Store
            </TabsTab>
          </TabsList>
          <TabsPanel value="pos">Terminal HP-POS-04 · last sale SGD 24.50 via GrabPay</TabsPanel>
          <TabsPanel value="store">Home page published · PayNow and Cards at checkout</TabsPanel>
        </Tabs>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Big
        </p>
        <Tabs defaultValue="commerce" type="Default" size="Big">
          <TabsList>
            <TabsTab value="commerce">Commerce</TabsTab>
            <TabsTab value="channels">Payment Channels</TabsTab>
            <TabsTab value="data">Customer Data</TabsTab>
          </TabsList>
          <TabsPanel value="commerce">Invoice, Payment Link, Recurring, POS, and Online Store</TabsPanel>
          <TabsPanel value="channels">PayNow, Cards, GrabPay, WeChat Pay · SGD</TabsPanel>
          <TabsPanel value="data">Priya Nair, Alex Turner, and product SKUs</TabsPanel>
        </Tabs>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Product data
        </p>
        <Tabs defaultValue="stock" type="Default">
          <TabsList>
            <TabsTab value="stock">Stock</TabsTab>
            <TabsTab value="sku">SKUs</TabsTab>
            <TabsTab value="sold" count={12}>
              Sold today
            </TabsTab>
          </TabsList>
          <TabsPanel value="stock">Matcha Latte · SKU-TEA-12 · 24 units remaining</TabsPanel>
          <TabsPanel value="sku">SKU-TEA-12, SKU-BKR-03, SKU-POS-01</TabsPanel>
          <TabsPanel value="sold">12 POS sales · SGD 286.00 · mixed PayNow and Cards</TabsPanel>
        </Tabs>
      </div>
    </DocExamplePage>
  )
}
