import { createFileRoute } from '@tanstack/react-router'
import { SmartphoneIcon, MonitorIcon } from 'lucide-react'
import { TabMenu, TabMenuList, TabMenuPanel, TabMenuTab } from '@/components/ui/tab-menu'
import { DocExamplePage } from '@/components/doc/doc-example-page'

export const Route = createFileRoute('/tab-menu')({
  component: TabMenuExamplesPage,
})

function TabMenuExamplesPage() {
  return (
    <DocExamplePage to="/tab-menu">
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Default
        </p>
        <TabMenu defaultValue="invoice" type="Default">
          <TabMenuList>
            <TabMenuTab value="invoice">Invoice</TabMenuTab>
            <TabMenuTab value="link">Payment Link</TabMenuTab>
            <TabMenuTab value="recurring" count={8}>
              Recurring
            </TabMenuTab>
          </TabMenuList>
          <TabMenuPanel value="invoice">INV-2048 · Priya Nair · SGD 128.00 · Cards</TabMenuPanel>
          <TabMenuPanel value="link">Weekend brunch link · SGD 48.00 · PayNow and GrabPay</TabMenuPanel>
          <TabMenuPanel value="recurring">8 active plans including Alex Turner · SGD 29.00 / month</TabMenuPanel>
        </TabMenu>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Pills
        </p>
        <TabMenu defaultValue="pos" type="Pills">
          <TabMenuList>
            <TabMenuTab value="pos" icon={<SmartphoneIcon />}>
              Point of Sale
            </TabMenuTab>
            <TabMenuTab value="store" icon={<MonitorIcon />}>
              Online Store
            </TabMenuTab>
          </TabMenuList>
          <TabMenuPanel value="pos">Terminal HP-POS-04 · last sale SGD 24.50 via GrabPay</TabMenuPanel>
          <TabMenuPanel value="store">Home page published · PayNow and Cards at checkout</TabMenuPanel>
        </TabMenu>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Big
        </p>
        <TabMenu defaultValue="commerce" type="Default" size="Big">
          <TabMenuList>
            <TabMenuTab value="commerce">Commerce</TabMenuTab>
            <TabMenuTab value="channels">Payment Channels</TabMenuTab>
            <TabMenuTab value="data">Customer Data</TabMenuTab>
          </TabMenuList>
          <TabMenuPanel value="commerce">Invoice, Payment Link, Recurring, POS, and Online Store</TabMenuPanel>
          <TabMenuPanel value="channels">PayNow, Cards, GrabPay, WeChat Pay · SGD</TabMenuPanel>
          <TabMenuPanel value="data">Priya Nair, Alex Turner, and product SKUs</TabMenuPanel>
        </TabMenu>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Product data
        </p>
        <TabMenu defaultValue="stock" type="Default">
          <TabMenuList>
            <TabMenuTab value="stock">Stock</TabMenuTab>
            <TabMenuTab value="sku">SKUs</TabMenuTab>
            <TabMenuTab value="sold" count={12}>
              Sold today
            </TabMenuTab>
          </TabMenuList>
          <TabMenuPanel value="stock">Matcha Latte · SKU-TEA-12 · 24 units remaining</TabMenuPanel>
          <TabMenuPanel value="sku">SKU-TEA-12, SKU-BKR-03, SKU-POS-01</TabMenuPanel>
          <TabMenuPanel value="sold">12 POS sales · SGD 286.00 · mixed PayNow and Cards</TabMenuPanel>
        </TabMenu>
      </div>
    </DocExamplePage>
  )
}
