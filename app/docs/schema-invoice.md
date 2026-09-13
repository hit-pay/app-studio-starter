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
<!--
| `id` | UUID | |
| `business_id` | UUID | |
| `type` / `invoice_type` | string | `invoice` or `repeating_invoice` |
| `invoice_number` / `reference` | string | |
| `status` | string | `draft`, `sent`, `pending`, `overdue`, `paid`, … |
| `currency` | string | |
| `amount` / `subtotal` / `amount_paid` / `balance_amount` / `amount_no_tax` | number | |
| `email` | string | |
| `business_customer_id` / `customer` | UUID / object \| null | |
| `location_id` / `location` | UUID / object \| null | |
| `invoice_date` / `due_date` | `YYYY-MM-DD` | |
| `products` | array | Line SKUs |
| `stackable_discounts` | array | |
| `tax_settings_id` / `tax_setting` | UUID / object \| null | |
| `payment_methods` | string[] | |
| `payment_requests` / `charges` | array | |
| `allow_partial_payments` / `partial_payments` | boolean / array | |
| `invoice_link` | string | |
| `memo` / `footer` / `description` | string | |
| `custom_fields` / `custom_fields_config` | array / object | |
| `recipients` | array | |
| `send_email` / `webhook` / `channel` | | |
| `created_at` / `updated_at` | datetime | |
| void / late-fee / repeating cycle fields | | When applicable |
-->