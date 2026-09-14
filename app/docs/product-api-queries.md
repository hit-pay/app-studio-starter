# Product API Query Parameters

Endpoint:

```http
GET /products
```

## Query Parameters

| Parameter | Format | Description |
|---|---|---|
| `ids[]` | UUID array | Filter by multiple product IDs |
| `barcode` | string | Filter by a product variation barcode |
| `perPage` / `per_page` | integer, 1–100 | Number of products per page |
| `page` | integer | Page number |
| `stock_keeping_unit` | string | Filter by SKU |
| `statuses[]` | array | Filter by product statuses |
| `categories[]` | array | Filter by category IDs |
| `sources[]` | array | Filter by product sources |
| `inventory` | `in_stock` / `out_of_stock` | Filter by inventory status |
| `location_ids[]` | UUID array | Filter by location IDs |
| `channels[]` | array | Filter by sales channels |
| `keywords` | string | Search product name, emoji, or SKU |
| `price_from` | numeric | Minimum price |
| `price_to` | numeric | Maximum price |
| `show_sold_out` | boolean | Include sold-out products |
| `currency` | 3-character string | Currency used for price filtering |
| `order_by[field]` | `asc` / `desc` | Sort results |

## Examples

Filter by multiple product IDs:

```http
GET /products?ids[]=product_uuid_1&ids[]=product_uuid_2
```

Filter and paginate:

```http
GET /products?ids[]=product_uuid_1&ids[]=product_uuid_2&perPage=100&page=1
```

Sort by newest products:

```http
GET /products?order_by[created_at]=desc
```

Use `ids[]` for product ID filtering. The parameter is not `product_ids[]`.
