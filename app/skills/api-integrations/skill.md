---
name: api-integrations
description: Business-owner commerce data via the api-integrations MCP and local business helpers. Use when listing or calling payments, customers, products, orders, invoices, locations, or staff from the host.
---

# api-integrations

Use the `api-integrations` MCP for live commerce data. The key is proxied and never reaches this app. Do not inspect registry/MCP catalog files directly.

## MCP

1. `tools/list` then `tools/call` on the `api-integrations` MCP.
2. `resources/list` / `resources/read` on `app-studio://docs/{tool}` for filters and schema.
3. `app-studio://docs/direct-query` covers calling the proxy directly.

This is separate from local helpers (`#/lib/*`, `#/lib/server/*`) and from host REST (`/current-user`, `/token`, integrations), which are not called via MCP.

## Local business helpers

For locations/staff already wrapped in this app:

- Browser: `useListLocations`, `useListStaffs` from `#/lib/business`.
- Server: `listLocations`, `listStaffs` from `#/lib/business/server` — import only from those hooks.

New merchant list APIs go in `#/lib/business/server`, then wrap with a root hook (loading / error / retry). Types in `#/types`.
