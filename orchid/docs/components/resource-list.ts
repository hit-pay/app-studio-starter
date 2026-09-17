// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const resourceListRegistry = registry.items.find(
  (item: { name: string }) => item.name === "resource-list",
);

const RESOURCE_LIST_TYPES = ["product", "order", "charge", "invoice"] as const;

function liveResourceListExample(type: (typeof RESOURCE_LIST_TYPES)[number], label: string) {
  const component = `${type.charAt(0).toUpperCase()}${type.slice(1)}ResourceListExample`;
  return {
    description: label,
    code: `function ${component}() {
  return (
    <ResourceListProvider load={demoLoad}>
      <ResourceList
        type="${type}"
        className="min-w-0"
        onRowAction={(action, row) => console.log(action, row.id)}
        onSelectionAction={(action, ids) => console.log(action.key, ids)}
        onEmptyAction={(action) => console.log(action.key)}
      />
    </ResourceListProvider>
  );
}

render(<${component} />);`,
  };
}

const resourceListDocs = {
  ...resourceListRegistry,
  category: "components",
  usage: [
    "Mount ResourceListProvider once near the app root and pass the same load as ResourcePicker (ResourcePickerLoad → ResourcePickerPage).",
    "App Studio: loadResourcePickerPage (server) + mapResourcePickerPayload from #/lib/resource-picker-map. Query shapes follow app/docs/hitpay/*.md.",
    "Render ResourceList with type product | order | charge | invoice. Server-mode SchemaTable with the same chrome as DataTable: status tabs, toolbar filters, search, sort menu, Edit column, row selection + header actions, row ⋮ menu, pagination.",
    "Advanced HitPay filters (category, location/source, date range) stay in the filter popover; status + catalog extras align with tabs and toolbar filters.",
    "Table query maps to load input: query (keywords), filter (tab/status), extras (toolbar filters + popover), page, cursor (invoices). Wire onRowAction, onSelectionAction, onEmptyAction for header/row/empty actions.",
    "Rows expose row.resource as the HitPay record snapshot.",
  ].join(" "),
  props: {
    "ResourceListProvider.load": "ResourcePickerLoad (required)",
    "ResourceListProvider.children": "ReactNode",
    "ResourceList.type": RESOURCE_LIST_TYPES.join(" | "),
    "ResourceList.className": "string",
    "ResourceList.onRowClick": "(row) => void",
    "ResourceList.onRowAction": "(action, row) => void",
    "ResourceList.onSelectionAction": "(action, selectedIds) => void",
    "ResourceList.onEmptyAction": "(action) => void",
    "ResourceList.cells": "optional SchemaTableCells overrides",
    "schema.tabs": "status tabs → load filter",
    "schema.filters": "toolbar filters → load extras",
    "schema.selection": "true — bulk header actions",
    "schema.selectionActions": "export + dropdown (wire onSelectionAction)",
    "schema.rowActions": "edit | delete (wire onRowAction)",
    "schema.editColumns": "true",
    "schema.sort": "toolbar sort (server lists: UI only until API sort)",
    "load(input).type": RESOURCE_LIST_TYPES.join(" | "),
    "load(input).query": "string → keywords upstream",
    "load(input).filter": "string (status; maps to statuses[] or invoice status)",
    "load(input).page": "number — products, orders, charges",
    "load(input).cursor": "string — invoices",
    "load(input).extras.category_ids": "comma-separated ids → product categories[] (multi)",
    "load(input).extras.location_id": "product/charge location_ids[]",
    "load(input).extras.channel": "product/order channels[]",
    "load(input).extras.date_from / date_to": "orders dateFrom/dateTo; charges date_from/date_to",
    "load(input).extras.payment_method": "charges payment_methods[]",
    "load(input).extras.inventory": "product inventory in_stock | out_of_stock",
    "ResourcePickerPage.items": "ResourcePickerItem[]",
    "ResourcePickerPage.hasMore": "boolean",
    "ResourcePickerPage.total": "optional meta total",
    "ResourcePickerPage.cursor": "invoices",
  },
  examples: [
    liveResourceListExample("product", "Products"),
    liveResourceListExample("order", "Orders"),
    liveResourceListExample("charge", "Charges"),
    liveResourceListExample("invoice", "Invoices"),
    {
      description: "App Studio load (HitPay docs)",
      code: `// See app/docs/hitpay/products.md, orders.md, charges.md, invoices.md
import { loadResourcePickerPage } from "#/lib/resource-picker";
import { ResourceListProvider } from "@/components/displaying-data/resource-list";

<ResourceListProvider load={(input) => loadResourcePickerPage({ data: input })}>
  {children}
</ResourceListProvider>`,
    },
    {
      description: "Product catalog route",
      code: `import { ResourceList } from "@/components/displaying-data/resource-list";

export function ProductsPage() {
  return (
    <ResourceList
      type="product"
      onRowClick={(row) => {
        console.log(row.id, row.resource);
      }}
    />
  );
}`,
    },
  ],
  related_components: ["data-table", "resource-picker", "form-builder", "empty", "pagination"],
};

export default resourceListDocs;
export { RESOURCE_LIST_TYPES };
