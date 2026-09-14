# Invoice API Query Parameters

Endpoint:

```http
GET /invoices
```

## Invoice Filters

| Parameter | Format | Description |
|---|---|---|
| `status` | string | Filter by invoice status |
| `customer_email` | email | Filter by customer email |
| `reference` | string | Filter by invoice reference |
| `keywords` | string | Search invoice number, reference, customer name, or customer email |
| `type` | string | Filter by invoice type |
| `parent_id` | string | Filter by parent invoice ID |

`status` supports the invoice and repeating-invoice status values exposed by
the API, including `all` and `overdue` where applicable.

## Standard List Parameters

| Parameter | Format | Description |
|---|---|---|
| `relations` | array | Include supported relations |
| `extra_attributes` | array | Include additional attributes |
| `count` | boolean | Include relationship counts |
| `sort_by` | string | Sort column |
| `sort_by_direction` | `asc` / `desc` | Sort direction |
| `per_page` | integer | Number of invoices per page |
| `cursor` | string | Cursor for cursor pagination |

## Examples

Filter by customer and status:

```http
GET /invoices?customer_email=customer@example.com&status=paid
```

Search by invoice number or reference:

```http
GET /invoices?keywords=INV-1001,ORDER-1001
```

Paginate and sort:

```http
GET /invoices?per_page=50&sort_by=created_at&sort_by_direction=desc
```
