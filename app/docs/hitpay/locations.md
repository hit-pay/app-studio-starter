# HitPay Locations

MCP tool: `hitpay_list_locations`

Use this resource for location selection and configuration references.
Persist only the required location snapshot in Turso; do not render a
per-request live HitPay list as application data.

Typical fields:

```json
{
  "id": "location_123",
  "name": "Main outlet",
  "address": {}
}
```
