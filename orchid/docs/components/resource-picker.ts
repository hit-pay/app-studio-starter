// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const resourcePickerRegistry = registry.items.find(
  (item: { name: string }) => item.name === "resource-picker",
);

const RESOURCE_PICKER_TYPES = [
  "product",
  "order",
  "charge",
  "invoice",
] as const;

const resourcePickerDocs = {
  ...resourcePickerRegistry,
  category: "components",
  usage: [
    "Mount ResourcePickerProvider once near the app root and pass load — an async function that calls HitPay list APIs and returns ResourcePickerPage (items, hasMore, cursor).",
    "App Studio: implement load with loadResourcePickerPage (server) + mapResourcePickerPayload from #/lib/resource-picker-map. Query shapes follow app/docs/hitpay/*.md (GET /v1/products, /v1/orders, /v1/charges, /v1/invoices).",
    "Pagination: products & orders use page + per_page; charges use page + per_page; invoices use per_page + cursor on load-more.",
    "Call useResourcePicker(); pick({ type }) resolves to ResourcePickerResult[] or undefined when cancelled.",
    "Products: variants, categories[], location_ids[], channels[], inventory, statuses[]. Orders: statuses[], channels[], dateFrom/dateTo. Charges: statuses[], location_ids[], payment_methods[], date_from/date_to. Invoices: status, keywords, cursor.",
  ].join(" "),
  props: {
    "ResourcePickerProvider.load": "ResourcePickerLoad (required)",
    "pick().type": RESOURCE_PICKER_TYPES.join(" | "),
    "pick().action": ["add", "select"],
    "pick().multiple": "boolean | number (max selections)",
    "pick().query": "string (initial search → keywords upstream)",
    "pick().selectionIds": "ResourcePickerSelectionId[] (pre-selected ids + optional child ids)",
    "pick().filter.status": "string (maps to statuses[] or invoice status)",
    "pick().filter.locationId": "string (product/charge location_ids[] via extras)",
    "pick().filter.categoryId": "string (product categories[])",
    "load(input).page": "number — products, orders, charges",
    "load(input).cursor": "string — invoices (and meta.next_cursor when present)",
    "load(input).extras.category_id": "product categories[]",
    "load(input).extras.location_id": "product/charge location_ids[]",
    "load(input).extras.channel": "product/ order channels[]",
    "load(input).extras.date_from / date_to": "orders dateFrom/dateTo; charges date_from/date_to",
    "load(input).extras.payment_method": "charges payment_methods[]",
    "load(input).extras.inventory": "product inventory in_stock | out_of_stock",
    "result[].id": "string",
    "result[].resource": "ResourcePickerRecord (optional snapshot)",
    "result[].children": "product variation rows",
  },
  examples: [
    {
      description: "Pick products",
      code: `function PickProductsExample() {
  const pick = useResourcePicker();

  return (
    <Button
      variant="outline"
      onClick={async () => {
        const items = await pick({ type: "product", multiple: 3 });
        if (items) {
          console.log(items);
        }
      }}
    >
      Add up to 3 products
    </Button>
  );
}

render(
  <ResourcePickerProvider load={demoLoad}>
    <PickProductsExample />
  </ResourcePickerProvider>,
);`,
    },
    {
      description: "App Studio load (HitPay docs)",
      code: `// See app/docs/hitpay/products.md, orders.md, charges.md, invoices.md
import { loadResourcePickerPage } from "#/lib/resource-picker";

<ResourcePickerProvider load={loadResourcePickerPage}>
  {children}
</ResourcePickerProvider>`,
    },
    {
      description: "Pre-selected variants",
      code: `const items = await pick({
  type: "product",
  multiple: true,
  selectionIds: [
    { id: "prod_1", children: [{ id: "var_a" }] },
    { id: "prod_2" },
  ],
});`,
    },
  ],
  related_components: ["dialog", "select", "form-builder", "data-table"],
};

export default resourcePickerDocs;
export { RESOURCE_PICKER_TYPES };
