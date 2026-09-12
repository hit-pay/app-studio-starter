# HitPay API

Read `hitpay-llms/{name}.md` before calling HitPay. Do not fetch docs.hitpayapp.com or invent paths. Call documented paths with `hitpayRequest` from `#/lib/server/hitpay-api`. Auth is the hopped `HITPAY_ACCESS_TOKEN` / `HITPAY_API_URL` — do not send `X-BUSINESS-API-KEY`.

When opening an endpoint doc, read `Quick decision`, `Call`, and `App rules`
first. Read its detailed `Query` and `Response` sections only for fields the
current implementation needs.

OAuth public API only (`/v1/…`). No HTTP DELETE. No invented create/update POST.

## Quick decision

- Add products, customers, orders, charges, invoices, or add-ons → `ResourcePicker`, then persist its payload to Turso.
- Pick staff or roles → `StaffSelect` / `RoleSelect`.
- Pick coupons, discounts, taxes, shipping, pickups, categories, or locations → the matching `*Select`.
- Show one record whose id is already stored → `get-*-details`.
- Calculate totals without rendering API rows → the relevant `list-*` endpoint.
- Never use `list-*` to populate a visible table, list, or feed.

**`list-*`:** ResourcePicker / `*Select` loaders, or totals with **no rows rendered**. Never a visible catalog/table/feed.

**`get-*-details`:** show/refresh one record whose id is already in Turso (or just picked and upserted). Do not loop get-by-id to rebuild a list.

Staff / role → `StaffSelect` / `RoleSelect`. Coupon / discount / tax / shipping / pickup / category / location → matching `*Select`. Catalog add (product, customer, order, charge, invoice, add-on) → ResourcePicker.

# Needs

- add products / SKUs → ResourcePicker `product`
- show one product → `get-product-details` (id already stored)
- product categories → `ProductCategorySelect`
- add / show orders → ResourcePicker `order` / `get-order-details`
- add / show customers → ResourcePicker `customer` / `get-customer-details`
- locations → `LocationSelect`
- totals only (no charge rows on screen) → `list-charges` / `get-charge-details`
- add / show invoices → ResourcePicker `invoice` / `get-invoice-details`
- coupons / discounts / taxes → `CouponSelect` / `DiscountSelect` / `TaxSelect`
- shipping / pickups → `ShippingSelect` / `PickupSelect`
- add-ons → ResourcePicker `add-on` / `get-add-on`
- scheduled wake snapshots → `hitpay-wake-guideline.md` (Turso, not a HitPay list)

# Endpoints

`list-*` below are **not** for browse screens.

## Products

- `list-products` — `GET /v1/products` — picker loader — `hitpay-llms/list-products.md`
- `get-product-details` — `GET /v1/products/{product_id}` — `hitpay-llms/get-product-details.md`
- `list-product-categories` — `GET /v1/product-category` — `ProductCategorySelect` — `hitpay-llms/list-product-categories.md`

## Orders

- `list-orders` — `GET /v1/orders` — picker loader — `hitpay-llms/list-orders.md`
- `get-order-details` — `GET /v1/orders/{order_id}` — `hitpay-llms/get-order-details.md`

## Customers

- `list-customers` — `GET /v1/customers` — picker loader — `hitpay-llms/list-customers.md`
- `get-customer-details` — `GET /v1/customers/{customer_id}` — `hitpay-llms/get-customer-details.md`

## Locations

- `list-locations` — `GET /v1/locations` — `LocationSelect` — `hitpay-llms/list-locations.md`

## Charges and invoices

- `list-charges` — `GET /v1/charges` — totals or picker — `hitpay-llms/list-charges.md`
- `get-charge-details` — `GET /v1/charges/{charge_id}` — `hitpay-llms/get-charge-details.md`
- `list-invoices` — `GET /v1/invoices` — picker loader — `hitpay-llms/list-invoices.md`
- `get-invoice-details` — `GET /v1/invoices/{invoice_id}` — `hitpay-llms/get-invoice-details.md`

## Commerce extras

- `list-coupons` — `/v1/coupons` — `CouponSelect` — `hitpay-llms/list-coupons.md`
- `list-discounts` — `/v1/discounts` — `DiscountSelect` — `hitpay-llms/list-discounts.md`
- `list-taxes` — `/v1/taxes` — `TaxSelect` — `hitpay-llms/list-taxes.md`
- `list-shipping` — `/v1/shipping` — `ShippingSelect` — `hitpay-llms/list-shipping.md`
- `list-pickups` — `/v1/pickups` — `PickupSelect` — `hitpay-llms/list-pickups.md`
- `list-add-ons` / `get-add-on` — `/v1/add-ons` — ResourcePicker / show — `hitpay-llms/list-add-ons.md`
