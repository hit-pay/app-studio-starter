# Charge API Query Parameters

Endpoint:

```http
GET /charges
```

## Query Parameters

| Parameter | Format | Description |
|---|---|---|
| `keywords` | string | Search charge data |
| `remark` | string | Search by remark |
| `status` | `refunded` / `failed` / `succeeded` | Filter by status shortcut |
| `statuses[]` | array | Filter by charge statuses |
| `refunded` | boolean | Filter refunded or non-refunded charges |
| `location_ids[]` | array | Filter by business locations |
| `user_ids[]` | array | Filter by business users |
| `date_from` | `YYYY-MM-DD` | Filter charges from this date |
| `date_to` | `YYYY-MM-DD` | Filter charges until this date |
| `payment_methods[]` | array | Filter by payment methods |
| `payment_request_id` | UUID | Filter by payment request |
| `channel` | string | Filter by plugin channel |
| `relatable` | `type:id` | Filter by related entity |
| `amount_from` | numeric | Minimum amount |
| `amount_to` | numeric | Maximum amount |
| `per_page` | integer, 1–100 | Number of charges per page |

When `keywords` contains a UUID, the API searches by charge ID,
business target ID, or plugin provider reference.

## Examples

Filter successful charges:

```http
GET /charges?status=succeeded
```

Filter by date and amount:

```http
GET /charges?date_from=2026-01-01&date_to=2026-01-31&amount_from=10&amount_to=100
```

Search by charge ID:

```http
GET /charges?keywords=charge_uuid
```
