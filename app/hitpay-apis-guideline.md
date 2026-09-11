# HitPay API

Local merchant API notes for this app. Read `hitpay-llms/{name}.md` before calling HitPay. Do not fetch docs.hitpayapp.com or invent endpoints. Call only documented paths with `hitpayRequest` from `#/lib/server/hitpay-api`. Auth is the hopped `HITPAY_ACCESS_TOKEN` / `HITPAY_API_URL` — do not send `X-BUSINESS-API-KEY` from app code.

# Needs

- list products, catalog, SKU browse, product search, stock filter → `list-products`
- create product, add SKU, new catalog item → `create-product`
- product detail, show product, one SKU, variants and images → `get-product-details`
- update product, edit SKU, change price, edit variants → `update-product`
- list orders, order browse, filter by status or date → `list-orders`
- order detail, show order, line items and payments → `get-order-details`
- list product categories, category picker, parent/subcategory → `list-product-categories`
- list customers, customer picker, people directory → `list-customers`
- create customer, add contact, new customer → `create-customer`
- customer detail, show customer → `get-customer-details`
- update customer, edit email or phone → `update-customer`
- list locations, outlets, stores, location picker → `list-locations`

# Endpoints

## `list-products` — List Products

Need: list products, catalog, SKU browse, product search, stock filter
`GET /v1/products` — paginated product list with status, category, inventory, channel, and keyword filters.
Docs: `hitpay-llms/list-products.md`

## `create-product` — Create Product

Need: create product, add SKU, new catalog item
`POST /v1/products` — multipart create with required `name` and `price`; optional variants, channels, locations, and images.
Docs: `hitpay-llms/create-product.md`

## `get-product-details` — Get Product Details

Need: product detail, show product, one SKU, variants and images
`GET /v1/products/{product_id}` — one product including variants and images.
Docs: `hitpay-llms/get-product-details.md`

## `update-product` — Update Product

Need: update product, edit SKU, change price, edit variants
`POST /v1/products/{product_id}` — multipart update; send `_method=PATCH` with required `name` and `price`.
Docs: `hitpay-llms/update-product.md`

## `list-orders` — List Orders

Need: list orders, order browse, filter by status or date
`GET /v1/orders` — filter by `statuses[]`, `dateFrom` / `dateTo`, `keywords`, `version`, and optional `with=products,charges`.
Docs: `hitpay-llms/list-orders.md`

## `get-order-details` — Get Order Details

Need: order detail, show order, line items and payments
`GET /v1/orders/{order_id}` — one order including line items and payments.
Docs: `hitpay-llms/get-order-details.md`

## `list-product-categories` — List Product Categories

Need: list product categories, category picker, parent/subcategory
`GET /v1/product-category` — paginated categories; filter by `active`, `parent_id`, and `keywords`.
Docs: `hitpay-llms/list-product-categories.md`

## `list-customers` — List Customers

Need: list customers, customer picker, people directory
`GET /v1/customers` — paginated list (`page`, `per_page`).
Docs: `hitpay-llms/list-customers.md`

## `create-customer` — Create Customer

Need: create customer, add contact, new customer
`POST /v1/customers` — JSON; required `email` and `phone_number`.
Docs: `hitpay-llms/create-customer.md`

## `get-customer-details` — Get Customer Details

Need: customer detail, show customer
`GET /v1/customers/{customer_id}` — one customer.
Docs: `hitpay-llms/get-customer-details.md`

## `update-customer` — Update Customer

Need: update customer, edit email or phone
`PATCH /v1/customers/{customer_id}` — JSON partial update.
Docs: `hitpay-llms/update-customer.md`

## `list-locations` — List Locations

Need: list locations, outlets, stores, location picker
`GET /v1/locations` — paginated locations; filter by `keywords`. Cashiers/managers see assigned locations only.
Docs: `hitpay-llms/list-locations.md`
