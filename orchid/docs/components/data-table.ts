// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const dataTableRegistry = registry.items.find(
  (item: { name: string }) => item.name === "data-table",
);

const dataTableDocs = {
  ...dataTableRegistry,
  category: "components",
  props: {
    mode: ["client", "server"],
    selection: "boolean",
    editColumns: "boolean",
    rowActions: ["edit", "delete"],
  },
  examples: [
    {
      description: "Schema-driven table",
      code: `function DataTableExample() {
  const table = useDataTable({
    schema: SCHEMA_TABLE_EXAMPLE_SCHEMA,
    data: SCHEMA_TABLE_EXAMPLE_ROWS,
  });

  return (
    <DataTable
      table={table}
      onRowAction={() => undefined}
      onRowClick={() => undefined}
    />
  );
}

render(<DataTableExample />);`,
    },
    {
      description: "Invoices with row actions",
      code: `function InvoiceTableExample() {
  const table = useDataTable({
    schema: {
      key: "invoices",
      search: { placeholder: "Search invoices" },
      rowActions: ["edit", "delete"],
      pagination: { pageSize: 5 },
      columns: [
        { key: "name", title: "Customer", type: "text", locked: true },
        { key: "amount", title: "Amount", type: "amount", search: false },
        { key: "status", title: "Status", type: "status", search: false },
      ],
    },
    data: [
      { id: "inv-2048", name: "Priya Nair", amount: 128, status: "Paid" },
      { id: "inv-2049", name: "Alex Turner", amount: 48, status: "Pending" },
    ],
  });

  return (
    <DataTable
      table={table}
      onRowAction={() => undefined}
      onRowClick={() => undefined}
    />
  );
}

render(<InvoiceTableExample />);`,
    },
  ],
  related_components: ["data-list", "detail-card", "empty", "pagination"],
};

export default dataTableDocs;
