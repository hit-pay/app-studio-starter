# HitPay Invoices

MCP tool: `hitpay_list_invoices`

Proxy endpoint:

```text
GET /api/apps/{app}/integrations/hitpay/invoices
```

Upstream:

```text
GET /v1/invoices
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
  "id": "invoice_123",
  "business_id": "business_123",
  "type": "invoice",
  "business_customer_id": "customer_123",
  "location_id": "location_123",
  "reference": "INV-1001",
  "invoice_number": "INV-1001",
  "email": "customer@example.com",
  "status": "paid",
  "currency": "SGD",
  "amount": 100,
  "balance_amount": 0,
  "amount_paid": 100,
  "amount_no_tax": 95,
  "subtotal": 95,
  "customer": {},
  "send_email": true,
  "webhook": true,
  "channel": "dashboard",
  "tax_setting": null,
  "products": [],
  "stackable_discounts": [],
  "invoice_type": "payment_by_product",
  "payment_by": "product",
  "memo": null,
  "attached_file": null,
  "created_at": "2026-01-01T00:00:00+00:00",
  "updated_at": "2026-01-01T00:00:00+00:00",
  "invoice_date": "2026-01-01",
  "due_date": "2026-01-31",
  "payment_requests": [],
  "charges": [],
  "allow_partial_payments": false,
  "invoice_link": "https://example.com/invoice/123",
  "footer": null,
  "custom_fields": {},
  "custom_fields_config": {},
  "payment_methods": [],
  "recipients": [],
  "location": null,
  "void_reason": null,
  "voided_by_user_id": null,
  "voided_at": null
}
```

## Query Parameters

MCP tool: `hitpay_list_invoices`

Supported filters include `status`, `customer_email`, `reference`, `keywords`,
`type`, `parent_id`, `relations`, `extra_attributes`, `count`, `sort_by`,
`sort_by_direction`, `per_page`, and `cursor`.
