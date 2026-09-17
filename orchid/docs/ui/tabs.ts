// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const tabsRegistry = registry.items.find(
  (item: { name: string }) => item.name === "tabs",
);

const tabsDocs = {
  ...tabsRegistry,
  category: "ui",
  props: {
    orientation: ["horizontal", "vertical"],
    variant: ["default", "line"],
  },
  examples: [
    {
      description: "Line tabs",
      code: `<Tabs defaultValue="invoice">
  <TabsList variant="line">
    <TabsTrigger value="invoice">Invoice</TabsTrigger>
    <TabsTrigger value="link">Payment Link</TabsTrigger>
    <TabsTrigger value="recurring">Recurring</TabsTrigger>
  </TabsList>
  <TabsContent value="invoice">
    INV-2048 · Priya Nair · SGD 128.00
  </TabsContent>
  <TabsContent value="link">
    Weekend brunch link · SGD 48.00 · PayNow
  </TabsContent>
  <TabsContent value="recurring">
    8 active plans · Alex Turner · SGD 29.00 / month
  </TabsContent>
</Tabs>`,
    },
    {
      description: "Pill tabs with icons",
      code: `<Tabs defaultValue="pos">
  <TabsList>
    <TabsTrigger value="pos">
      <PosIcon data-icon="inline-start" />
      Point of Sale
    </TabsTrigger>
    <TabsTrigger value="store">
      <StoreIcon data-icon="inline-start" />
      Online Store
    </TabsTrigger>
  </TabsList>
  <TabsContent value="pos">
    Terminal HP-POS-04 · last sale SGD 24.50
  </TabsContent>
  <TabsContent value="store">
    Home page published · PayNow and Cards
  </TabsContent>
</Tabs>`,
    },
  ],
  related_components: ["page-layout", "app-layout", "button"],
};

export default tabsDocs;
