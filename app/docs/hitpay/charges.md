# HitPay Charges

MCP tool: `hitpay_list_charges`

Proxy endpoint:

```text
GET /api/apps/{app}/integrations/hitpay/charges
```

Upstream:

```text
GET /v1/charges
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
  "id": "charge_123",
  "business_id": "business_123",
  "channel": "online_store",
  "customer_id": "customer_123",
  "status": "succeeded",
  "customer": {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone_number": "+6512345678",
    "address": {
      "street": "Main Street",
      "city": "Singapore",
      "state": null,
      "postal_code": "018956",
      "country": "SG"
    }
  },
  "currency": "SGD",
  "amount": 100,
  "refunded_amount": 0,
  "refunds": [],
  "refunded_at": null,
  "fixed_fee": 2,
  "discount_fee": 0,
  "discount_fee_rate": 0,
  "failed_reason": null,
  "failed_reason_message": null,
  "order": null,
  "order_id": null,
  "remark": "Payment",
  "payment_intents": [],
  "payment_request_id": null,
  "payment_request": null,
  "all_inclusive_fee": false,
  "home_currency": "SGD",
  "payment_provider": {
    "code": "stripe",
    "account_id": "account_123",
    "charge": {
      "type": "card",
      "id": "provider_charge_123",
      "method": "card",
      "transfer_type": null,
      "details": null,
      "logo": "Card"
    }
  },
  "created_at": "2026-01-01T00:00:00+00:00",
  "updated_at": "2026-01-01T00:00:00+00:00",
  "closed_at": "2026-01-01T00:01:00+00:00",
  "location_id": "location_123",
  "location": {
    "id": "location_123",
    "name": "Main Store",
    "address": "10 Main Street, Singapore"
  },
  "business_user_id": null,
  "business_user_display": null,
  "terminal_id": null,
  "relatable": null,
  "admin_fee": false,
  "admin_fee_amount": 0,
  "metadata": {},
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
    },
    "country": "SG",
    "location": null,
    "coordinate": {
      "latitude": null,
      "longitude": null
    }
  },
  "type": "charge"
}
```

## Query Parameters

MCP tool: `hitpay_list_charges`

Supported filters include `keywords`, `remark`, `status`, `statuses[]`,
`refunded`, `location_ids[]`, `user_ids[]`, `date_from`, `date_to`,
`payment_methods[]`, `payment_request_id`, `channel`, `relatable`,
`amount_from`, `amount_to`, and `per_page`.