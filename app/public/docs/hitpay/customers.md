# HitPay Customers

MCP tool: `hitpay_list_customers`

Proxy endpoint:

```text
GET /api/apps/{app}/integrations/hitpay/customers
```

Upstream:

```text
GET /v1/customers
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
  "id": "customer_123",
  "name": "Jane Doe",
  "birth_date": "1990-01-01",
  "gender": "female",
  "email": "jane@example.com",
  "phone_number": "+6512345678",
  "address": {
    "street": "Main Street",
    "building": "10",
    "street_2": null,
    "city": "Singapore",
    "state": null,
    "postal_code": "018956",
    "country": "SG"
  },
  "remark": null,
  "phone_number_country_code": "SG",
  "created_at": "2026-01-01T00:00:00+00:00",
  "updated_at": "2026-01-01T00:00:00+00:00",
  "address_line": "10 Main Street, Singapore 018956"
}
```
