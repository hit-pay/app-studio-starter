import { describe, expect, it } from "vitest";

import {
  compareRows,
  defaultSchemaTableQuery,
  moveColumn,
  orderedVisibleColumns,
  paginationItems,
  queryTable,
  syncColumnOrder,
  type SchemaTableRow,
  type SchemaTableSchema,
} from "./data-table-model";

const schema: SchemaTableSchema = {
  mode: "client",
  tabs: [
    { key: "all", title: "All" },
    { key: "paid", title: "Paid", value: "paid" },
  ],
  sort: { fields: [{ key: "amount", title: "Amount" }] },
  pagination: { pageSize: 2 },
  columns: [
    { key: "id", title: "ID", locked: true },
    { key: "customer", title: "Customer" },
    { key: "amount", title: "Amount", search: false },
    { key: "status", title: "Status", hidden: true },
  ],
};

const rows: SchemaTableRow[] = [
  { id: "1", customer: "Ana", amount: 30, status: "paid" },
  { id: "2", customer: "Budi", amount: 10, status: "pending" },
  { id: "3", customer: "Citra", amount: 20, status: "paid" },
];

describe("defaultSchemaTableQuery", () => {
  it("uses the first tab, first sort field and page size", () => {
    expect(defaultSchemaTableQuery(schema)).toEqual({
      search: "",
      tab: "all",
      filters: {},
      sortKey: "amount",
      sortDir: "asc",
      page: 1,
      pageSize: 2,
    });
  });
});

describe("queryTable (client mode)", () => {
  const query = defaultSchemaTableQuery(schema);

  it("sorts and paginates", () => {
    const result = queryTable({ schema, data: rows, query });
    expect(result.rows.map((row) => row.id)).toEqual(["2", "3"]);
    expect(result.pageCount).toBe(2);
  });

  it("filters by tab and search", () => {
    const paid = queryTable({ schema, data: rows, query: { ...query, tab: "paid" } });
    expect(paid.filteredCount).toBe(2);

    const searched = queryTable({ schema, data: rows, query: { ...query, search: "cit" } });
    expect(searched.rows.map((row) => row.id)).toEqual(["3"]);
  });

  it("does not search columns marked search: false", () => {
    const result = queryTable({ schema, data: rows, query: { ...query, search: "30" } });
    expect(result.filteredCount).toBe(0);
  });

  it("clamps out-of-range pages", () => {
    expect(queryTable({ schema, data: rows, query: { ...query, page: 99 } }).page).toBe(2);
    const first = queryTable({ schema, data: rows, query: { ...query, page: 0 } });
    expect(first.page).toBe(1);
    expect(first.rows.map((row) => row.id)).toEqual(["2", "3"]);
  });
});

describe("column helpers", () => {
  it("keeps locked columns first and drops hidden ones", () => {
    const visible = orderedVisibleColumns(schema, ["amount", "customer", "status"], ["status"]);
    expect(visible.map((column) => column.key)).toEqual(["id", "amount", "customer"]);
  });

  it("moves a column before the target", () => {
    expect(moveColumn(["a", "b", "c"], "c", "a")).toEqual(["c", "a", "b"]);
    expect(moveColumn(["a", "b"], "a", "missing")).toEqual(["b", "a"]);
  });

  it("syncs a saved order with the schema", () => {
    expect(syncColumnOrder(schema, ["status", "gone"])).toEqual(["status", "customer", "amount"]);
  });

  it("compares numbers numerically and text naturally", () => {
    expect(compareRows(rows[0]!, rows[1]!, "amount", "asc")).toBeGreaterThan(0);
    expect(compareRows({ id: "a", n: "item 2" }, { id: "b", n: "item 10" }, "n", "asc")).toBeLessThan(0);
  });
});

describe("paginationItems", () => {
  it("lists every page when there are few", () => {
    expect(paginationItems(1, 3)).toEqual([1, 2, 3]);
  });

  it("collapses the middle of long lists", () => {
    expect(paginationItems(5, 10)).toEqual([1, "ellipsis", 4, 5, 6, "ellipsis", 10]);
  });
});
