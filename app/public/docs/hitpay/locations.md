# HitPay Locations

MCP tool: `hitpay_list_locations`

Proxy endpoint:

```text
GET /api/apps/{app}/integrations/hitpay/locations
```

The proxy calls HitPay:

```text
GET /v1/locations
```

Optional query parameters:

```text
?keywords=Main%20outlet
?per_page=50
```

`keywords` searches by location name or an exact location UUID.
`per_page` controls pagination; the API defaults to `500` when it is omitted.
The API also accepts the legacy spelling `perPage`.

The response is a Laravel paginated resource:

```json
{
  "data": [
    {
      "id": "location_123",
      "name": "Main outlet",
      "street": "1 Example Street",
      "postal_code": "123456",
      "city": "Singapore",
      "state": null,
      "country": "SG",
      "created_at": "2026-01-01T00:00:00.000000Z",
      "updated_at": "2026-01-01T00:00:00.000000Z",
      "active": true,
      "business_id": "business_123",
      "inventory": null,
      "pickups": []
    }
  ],
  "links": {
    "first": "https://api.example.com/v1/locations?page=1",
    "last": "https://api.example.com/v1/locations?page=1",
    "prev": null,
    "next": null
  },
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 1,
    "per_page": 500,
    "to": 1,
    "total": 1
  }
}
```

`inventory` is only populated when the location is loaded through a product
location relationship. Do not assume it is always an object.

Use locations for selection and configuration references. Persist only the
required location snapshot in Turso; do not render a per-request live HitPay
list as application data.

The request requires the short-lived App Studio `appToken`. Never request,
store, or forward the HitPay business API key from the starter app.
