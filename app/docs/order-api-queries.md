# Order API Query Parameters

Endpoint:

```http
GET /orders
```

## Query Parameters

| Parameter | Format | Description |
|---|---|---|
| `version` | `1.0` / `2.0` | Filter by order version |
| `statuses[]` | array | Filter by order status |
| `keywords` | string | Search by order ID, amount, date, remark, or customer name |
| `dateFrom` | date | Include orders created from this date |
| `dateTo` | date | Include orders created until this date |
| `online_store` | boolean | Filter online-store orders |
| `channels[]` | array | Filter by order channel |
| `with` | comma-separated string or array | Include supported relationships |
| `page` | integer | Page number |
| `per_page` | integer, 1–100 | Number of orders per page |

### Allowed Values

`statuses[]`:

```text
completed, pending, sent, draft, expired, canceled
```

`channels[]`:

```text
point_of_sale, quick_sale, store_checkout
```

`with` supports:

```text
customer, products, charges
```

## Examples

Filter by multiple statuses:

```http
GET /orders?statuses[]=completed&statuses[]=pending
```

Filter by channel and date range:

```http
GET /orders?channels[]=store_checkout&dateFrom=2026-01-01&dateTo=2026-01-31
```

Search and paginate:

```http
GET /orders?keywords=customer@example.com&per_page=50&page=1
```

Include customer and charges:

```http
GET /orders?with=customer,charges
```

The API sorts orders by `created_at` descending by default.
