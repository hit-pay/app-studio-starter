// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const detailCardRegistry = registry.items.find(
  (item: { name: string }) => item.name === "detail-card",
);

const detailCardDocs = {
  ...detailCardRegistry,
  category: "components",
  props: {
    style: ["default", "border"],
    columns: "number",
    alignment: ["horizontal", "vertical"],
    size: ["small", "big"],
  },
  examples: [
    {
      description: "Two-column grid",
      code: `<DetailCard
  columns={2}
  items={[
    {
      key: "invoice",
      label: "Invoice",
      value: "INV-2048",
      alignment: "vertical",
    },
    {
      key: "customer",
      label: "Customer",
      value: "alex@studio.co",
      alignment: "vertical",
    },
    {
      key: "status",
      label: "Status",
      value: <Badge tone="green">Paid</Badge>,
      alignment: "vertical",
    },
    {
      key: "channel",
      label: "Channel",
      value: "PayNow",
      alignment: "vertical",
    },
  ]}
/>`,
    },
    {
      description: "Border style with copy",
      code: `<DetailCard
  title="Payment details"
  columns={2}
  style="border"
  items={[
    {
      key: "email",
      label: "Email",
      value: "alex@studio.co",
      copyValue: "alex@studio.co",
      alignment: "vertical",
    },
    {
      key: "phone",
      label: "Phone",
      value: "+65 8123 4567",
      alignment: "vertical",
    },
    {
      key: "status",
      label: "Status",
      value: <Badge tone="green">Paid</Badge>,
      alignment: "vertical",
    },
    {
      key: "method",
      label: "Method",
      value: "Cards",
      alignment: "vertical",
    },
  ]}
/>`,
    },
    {
      description: "Stacked rows",
      code: `<DetailCard
  items={[
    { key: "email", label: "Email", value: "alex@studio.co" },
    { key: "phone", label: "Phone", value: "+65 8123 4567" },
  ]}
/>`,
    },
  ],
  related_components: ["data-list", "data-table", "copy-button", "customer-card"],
};

export default detailCardDocs;
