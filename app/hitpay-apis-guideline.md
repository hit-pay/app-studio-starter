# HitPay API

Local merchant API notes for this app. Read `hitpay-llms/{name}.md` before calling HitPay. Do not fetch docs.hitpayapp.com or invent endpoints. Call only documented paths with `hitpayRequest` from `#/lib/server/hitpay-api`. Auth is the hopped `HITPAY_ACCESS_TOKEN` / `HITPAY_API_URL` — do not send `X-BUSINESS-API-KEY` from app code.

Document **OAuth public API only** (`oauth.any-scope` on `/v1/…`). Do not document API-key-only routes (webhooks, static QR, balances, transfers, beneficiaries, staffs).

**Never implement HTTP DELETE** (products, customers, orders, invoices, settings). Do not invent create / update / POST write paths — those docs are not in this folder.

All OAuth lists the merchant **adds as catalog rows** go through ResourcePicker (`charge`, `invoice`, `add-on`, plus product/customer/order). Generated screens must not `list-*` to build a picker **or to display a catalog/table/feed**. `list-*` docs are for the picker/select loader or totals-only computed sheets. Staff / role: `StaffSelect` / `RoleSelect`. Coupon / discount / tax / shipping / pickup / category / location: the matching `*Select` (or FormBuilder types).

# Needs

- pick products / add SKUs to the app → ResourcePicker `product` (never `list-products` on a screen)
- show product → `get-product-details`
- pick product categories → `ProductCategorySelect`
- pick / show orders → ResourcePicker `order` / `get-order-details`
- pick / show customers → ResourcePicker `customer` / `get-customer-details`
- pick locations → `LocationSelect`
- till / cash-up **totals** (do not render charge rows) → `list-charges` / `get-charge-details`. No wake / webhook.
- pick / show invoices → ResourcePicker `invoice` / `get-invoice-details`
- coupons / discounts / taxes → `CouponSelect` / `DiscountSelect` / `TaxSelect`
- shipping / pickups → `ShippingSelect` / `PickupSelect`
- add-ons → ResourcePicker `add-on` / `get-add-on`
- scheduled wake snapshots → `listWakeEvents` / `listLatestWakeRows` (`#/lib/hitpay-wake`, Turso — not a HitPay HTTP list)

# Endpoints

## Products

- `list-products` — `GET /v1/products` — `hitpay-llms/list-products.md`
- `get-product-details` — `GET /v1/products/{product_id}` — `hitpay-llms/get-product-details.md`
- `list-product-categories` — `GET /v1/product-category` — `hitpay-llms/list-product-categories.md`

## Orders

- `list-orders` — `GET /v1/orders` — `hitpay-llms/list-orders.md`
- `get-order-details` — `GET /v1/orders/{order_id}` — `hitpay-llms/get-order-details.md`

## Customers

- `list-customers` — `GET /v1/customers` — `hitpay-llms/list-customers.md`
- `get-customer-details` — `GET /v1/customers/{customer_id}` — `hitpay-llms/get-customer-details.md`

## Locations

- `list-locations` — `GET /v1/locations` — `hitpay-llms/list-locations.md`

## Charges and invoices

- `list-charges` — `GET /v1/charges` — `hitpay-llms/list-charges.md`
- `get-charge-details` — `GET /v1/charges/{charge_id}` — `hitpay-llms/get-charge-details.md`
- `list-invoices` — `GET /v1/invoices` — `hitpay-llms/list-invoices.md`
- `get-invoice-details` — `GET /v1/invoices/{invoice_id}` — `hitpay-llms/get-invoice-details.md`

## Commerce extras

- `list-coupons` — `/v1/coupons`
- `list-discounts` — `/v1/discounts`
- `list-taxes` — `/v1/taxes`
- `list-shipping` — `/v1/shipping`
- `list-pickups` — `/v1/pickups`
- `list-add-ons` / `get-add-on` — `/v1/add-ons`
