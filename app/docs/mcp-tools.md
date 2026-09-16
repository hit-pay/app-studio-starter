# App Studio MCP Tools

MCP server: `hitpay-app-studio`

Connect through `/mcp`. Discover the current contract with `tools/list`.
The MCP connection uses the short-lived App Studio `appToken`; never put a
provider API key or Turso credential in the Agent configuration.

## Turso

- `turso_query`
- `turso_batch`
- `turso_apply_migrations`

## HitPay

- `hitpay_list_products`
- `hitpay_list_locations`
- `hitpay_list_product_categories`
- `hitpay_list_customers`
- `hitpay_list_charges`
- `hitpay_list_invoices`
- `hitpay_list_orders`

Use the advertised input schema. Do not invent direct provider endpoints or
send provider secrets from the app.

The corresponding proxy endpoints are:

```text
GET /api/apps/{app}/integrations/hitpay/products
GET /api/apps/{app}/integrations/hitpay/locations
GET /api/apps/{app}/integrations/hitpay/product-categories
GET /api/apps/{app}/integrations/hitpay/customers
GET /api/apps/{app}/integrations/hitpay/charges
GET /api/apps/{app}/integrations/hitpay/invoices
GET /api/apps/{app}/integrations/hitpay/orders
```

The proxy calls the matching HitPay API under `/v1/*` with the business API
key kept server-side.
