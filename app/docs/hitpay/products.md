# HitPay Products

MCP tool: `hitpay_list_products`

Proxy endpoint:

```text
GET /api/apps/{app}/integrations/hitpay/products
```

Upstream:

```text
GET /v1/products
```

Authentication:

```http
Authorization: Bearer {appToken}
```

The business API key remains inside the App Studio proxy. Use the advertised
MCP schema for runtime arguments. Do not render live provider data directly;
persist approved snapshots in Turso when the workflow needs visible rows.

Response item schema:

```json
{
  "id": "product_123",
  "business_id": "business_123",
  "category_id": [],
  "name": "Coffee",
  "headline": "Fresh coffee",
  "description": "Product description",
  "stock_keeping_unit": "COFFEE-001",
  "barcode": "123456789",
  "business_currency_price": {
    "currency": "SGD",
    "price": 4.5,
    "price_display": "SGD 4.50",
    "price_stored": 450
  },
  "supported_currency_prices": [],
  "currency": "SGD",
  "price": 4.5,
  "price_before_discount": null,
  "price_display": "SGD 4.50",
  "price_stored": 450,
  "is_unavailable_for_selected_currency": false,
  "is_manageable": 1,
  "is_pinned": false,
  "status": "published",
  "product_weight": null,
  "delivery_method_required": false,
  "has_variations": false,
  "is_shopify": false,
  "is_woocommerce": false,
  "order": 0,
  "quantity": 10,
  "quantity_alert_level": 0,
  "min_order_quantity": null,
  "max_order_quantity": null,
  "emoji": null,
  "open_amount": false,
  "locations": [
    {
      "id": "location_123",
      "name": "Main Store",
      "address": {},
      "inventory": {
        "manage_inventory": true,
        "quantity": 10,
        "quantity_alert_level": 2
      }
    }
  ],
  "channels": ["online_store"],
  "is_inventory_tracked": true,
  "is_online_store_inventory_tracked": true,
  "allow_back_order": false,
  "available": true,
  "type": "physical",
  "auto_tag_new_locations": false,
  "product_add_ons": [],
  "digital_content": null,
  "product_unit": null,
  "product_unit_abbreviation": null,
  "product_unit_value": null,
  "handle": "coffee",
  "pos_color": null,
  "product_url": "https://example.com/product/product_123",
  "variations_count": 0,
  "variations": [
    {
      "id": "variation_123",
      "stock_keeping_unit": "COFFEE-L",
      "barcode": "123456789001",
      "description": "Large coffee",
      "values": [
        {
          "key": "Size",
          "value": "Large"
        }
      ],
      "business_currency_price": {
        "currency": "SGD",
        "price": 5,
        "price_display": "SGD 5.00",
        "price_stored": 500
      },
      "price": 5,
      "price_display": "SGD 5.00",
      "price_stored": 500,
      "is_unavailable_for_selected_currency": false,
      "quantity": 10,
      "quantity_alert_level": 2,
      "image": [],
      "product_variation_weight": null,
      "open_amount": false,
      "order": 1,
      "locations": [
        {
          "id": "location_123",
          "name": "Main Store",
          "active": true,
          "business_id": "business_123",
          "inventory": {
            "manage_inventory": true,
            "quantity": 10,
            "quantity_alert_level": 2
          },
          "pickups": []
        }
      ],
      "supported_currency_prices": []
    }
  ],
  "is_published": true,
  "published_at": "2026-01-01T00:00:00+00:00",
  "created_at": "2026-01-01T00:00:00+00:00",
  "updated_at": "2026-01-01T00:00:00+00:00"
}
```

## Query Parameters

MCP tool: `hitpay_list_products`

Supported filters include `ids[]`, `barcode`, `perPage`/`per_page`, `page`,
`stock_keeping_unit`, `statuses[]`, `categories[]`, `inventory`,
`location_ids[]`, `channels[]`, `keywords`, `price_from`, `price_to`,
`show_sold_out`, `currency`, and `order_by[field]`.

Use `ids[]` for product ID filtering, not `product_ids[]`.