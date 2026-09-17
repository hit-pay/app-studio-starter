// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const metricCardRegistry = registry.items.find(
  (item: { name: string }) => item.name === "metric-card",
);

const metricCardDocs = {
  ...metricCardRegistry,
  category: "components",
  props: {
    iconColor: ["blue", "green", "red", "grey"],
    info: "boolean",
    transparent: "boolean",
    loading: "boolean",
  },
  examples: [
    {
      description: "KPI with percent change",
      code: `<MetricCard
  icon={<RevenueIcon />}
  iconColor="blue"
  title="Gross volume"
  content="SGD 11,170.00"
  info
  tooltip="PayNow, Cards, and Payment Link volume this period"
  percentValue={10}
  percentTooltip="Compared to last month"
/>`,
    },
    {
      description: "With footer",
      code: `<MetricCard
  icon={<CustomersIcon />}
  title="Customers"
  content="86"
  footer="Customer Data updated just now"
/>`,
    },
    {
      description: "Loading",
      code: `<MetricCard title="Gross volume" content="—" loading />`,
    },
  ],
  related_components: ["detail-card", "page-layout", "tooltip"],
};

export default metricCardDocs;
