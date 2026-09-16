# HitPay Product Categories

MCP tool: `hitpay_list_product_categories`

Proxy endpoint:

```text
GET /api/apps/{app}/integrations/hitpay/product-categories
```

The proxy calls HitPay:

```text
GET /v1/product-category
```

Optional query parameters:

```text
?active=true
?get_children=true
?include_products=true
?channels[]=online_store
?format=minimal
?sort=name
?order=asc
```

The endpoint returns a non-paginated JSON resource collection. Each category
has this shape:

```json
{
  "id": "category_123",
  "name": "Beverages",
  "handle": "beverages",
  "description": "Drinks and refreshments",
  "is_active": true,
  "order": 1,
  "children": [],
  "total_products": 12,
  "products": {
    "total": 0,
    "data": []
  },
  "is_parent": true,
  "image": null,
  "channels": ["online_store"],
  "emoji": "☕",
  "pos_color": "#2465de"
}
```

The `products` field is included when products are requested with
`include_products=true`. Child categories use the same nested shape and may
contain their own `children`, `channels`, `image`, `emoji`, and `pos_color`.

Use `format=minimal` when the workflow only needs category metadata. It omits
the expanded product and image relationships.

The request requires the short-lived App Studio `appToken`:

```http
Authorization: Bearer {appToken}
```

The HitPay business API key remains inside the App Studio proxy. Never request,
store, or forward it from the starter app or Agent.

This endpoint returns the product categories for the currently authenticated
HitPay business. Do not use it to access another business.

The MCP tool currently has no tool arguments. Use the schema advertised by the
MCP server as the runtime source of truth. Query parameters are available on
the HTTP proxy endpoint.
