// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const pageLayoutRegistry = registry.items.find(
  (item: { name: string }) => item.name === "page-layout",
);

const pageLayoutDocs = {
  ...pageLayoutRegistry,
  category: "components",
  props: {
    title: "ReactNode",
    description: "ReactNode",
    badge: "ReactNode",
    copyValue: "string",
    actions: "ReactNode",
    onBack: "function",
    loading: "boolean",
    headerClassName: "string",
    contentClassName: "string",
  },
  examples: [
    {
      description: "List page",
      code: `<div className="h-96 overflow-hidden rounded-xl border border-oc-border">
  <PageLayout
    title="Invoices"
    description="Create, send, and track invoices across payment channels."
    actions={<Button>Create invoice</Button>}
  >
    <div className="rounded-xl border border-oc-border p-6 text-sm text-oc-muted-foreground">
      Invoice table or empty state goes here.
    </div>
  </PageLayout>
</div>`,
    },
    {
      description: "Nested detail with back",
      code: `<div className="h-[28rem] overflow-hidden rounded-xl border border-oc-border">
  <PageLayout
    title="INV-2048"
    description="https://pay.hitpayapp.com/inv-2048"
    copyValue="https://pay.hitpayapp.com/inv-2048"
    badge={<Badge tone="green">Paid</Badge>}
    actions={<Button variant="outline">Edit</Button>}
    onBack={() => undefined}
  >
    <DetailCard
      columns={2}
      items={[
        { key: "customer", label: "Customer", value: "Alex Turner", alignment: "vertical" },
        { key: "email", label: "Email", value: "alex@studio.co", alignment: "vertical" },
        { key: "amount", label: "Amount", value: "SGD 128.00", alignment: "vertical" },
        { key: "channel", label: "Channel", value: "PayNow", alignment: "vertical" },
      ]}
    />
  </PageLayout>
</div>`,
    },
  ],
  related_components: [
    "app-layout",
    "form-layout",
    "detail-card",
    "copy-button",
    "button",
  ],
};

export default pageLayoutDocs;
