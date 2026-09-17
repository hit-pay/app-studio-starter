# HitPay Orders

MCP tool: `hitpay_list_orders`

Proxy endpoint:

```text
GET /api/apps/{app}/integrations/hitpay/orders
```

Upstream:

```text
GET /v1/orders
```

Authentication:

```http
Authorization: Bearer {appToken}
```

The business API key remains inside the App Studio proxy. Use the advertised
MCP schema for runtime arguments and persist approved snapshots in Turso
before rendering application rows.

Response item schema:

```json
{
  "id": "order_123",
  "order_display_number": 10023,
  "business_id": "business_123",
  "channel": "online_store",
  "version": 1,
  "customer_id": "customer_123",
  "business_customer_id": "customer_123",
  "customer": {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone_number": "+6512345678",
    "address": {
      "street": "Main Street",
      "building": "10",
      "city": "Singapore",
      "state": null,
      "postal_code": "018956",
      "country": "SG"
    },
    "address_line": "10 Main Street, Singapore 018956"
  },
  "customer_pickup": false,
  "currency": "SGD",
  "checkout_currency": "SGD",
  "checkout_currency_decimal_places": 2,
  "checkout_currency_amount": 100,
  "checkout_exchange_rate": null,
  "checkout_exchange_rate_adjustment": null,
  "checkout_exchange_rate_display": null,
  "checkout_use_live_exchange_rate": false,
  "order_discount_name": null,
  "status": "completed",
  "remark": null,
  "created_at": "2026-01-01T00:00:00+00:00",
  "updated_at": "2026-01-01T00:00:00+00:00",
  "closed_at": "2026-01-01T01:00:00+00:00",
  "location_id": "location_123",
  "location": {
    "id": "location_123",
    "name": "Main Store",
    "address": "10 Main Street, Singapore"
  },
  "business_user_id": null,
  "slot_date": null,
  "slot_time": null,
  "messages": [],
  "products": [
    {
      "id": "ordered_product_123",
      "name": "Example Product",
      "description": "Example product description",
      "quantity": 1,
      "stock_keeping_unit": "SKU-123",
      "unit_price": 100,
      "total_price": 100,
      "variation": {
        "id": "product_variation_123",
        "name": "Default",
        "product_id": "product_123"
      }
    }
  ],
  "is_digital_products": false,
  "charges": [],
  "line_items": [
    {
      "id": "line_item_123",
      "name": "Example Product",
      "item_type": "product",
      "quantity": 1,
      "related_id": "product_variation_123",
      "unit_price": 100,
      "line_item_amount": 100,
      "params": {},
      "children": []
    }
  ],
  "order_form": null,
  "order_form_response": null,
  "coupon": null,
  "pickup": null,
  "payment_status": "paid",
  "fulfilment_status": "fulfilled",
  "fulfilment_type": "delivery",
  "line_items_total": 100,
  "order_discount_amount": 0,
  "line_item_discount_amount": 0,
  "line_item_tax_amount": 0,
  "additional_discount_amount": 0,
  "total_discount_amount": 0,
  "line_item_price": 100,
  "shipping_amount": 0,
  "total_coupon_amount": 0,
  "amount": 100,
  "subtotal": 100,
  "request": {
    "ip_address": "127.0.0.1",
    "method": "POST",
    "url": "https://example.com/checkout",
    "device": {
      "type": "desktop",
      "name": null
    },
    "platform": {
      "name": "macOS",
      "version": "1"
    },
    "browser": {
      "name": "Chrome",
      "version": "1"
    }
  }
}
```

## Query Parameters

MCP tool: `hitpay_list_orders`

Supported filters include `version`, `statuses[]`, `keywords`, `dateFrom`,
`dateTo`, `online_store`, `channels[]`, `with`, `page`, and `per_page`.
Supported statuses are `completed`, `pending`, `sent`, `draft`, `expired`,
and `canceled`.
