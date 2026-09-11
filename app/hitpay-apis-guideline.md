# HitPay API

Local merchant API notes for this app. Read `hitpay-llms/{name}.md` before calling HitPay. Do not fetch docs.hitpayapp.com or invent endpoints. Call only documented paths with `hitpayRequest` from `#/lib/server/hitpay-api`. Auth is the hopped `HITPAY_ACCESS_TOKEN` / `HITPAY_API_URL` — do not send `X-BUSINESS-API-KEY` from app code.

Document **OAuth public API only** (`oauth.any-scope` on `/v1/…`). Do not document API-key-only routes (webhooks, static QR, balances, transfers, beneficiaries, staffs).

**Never implement HTTP DELETE** (products, customers, orders, invoices, payment requests, recurring, settings). Pause / resume are POST where documented.

All OAuth lists the merchant **picks** go through ResourcePicker (`charge`, `invoice`, `payment-request`, `subscription-plan`, `recurring-billing`, `coupon`, `discount`, `tax`, `shipping`, `pickup`, `add-on`, `store-page`, plus product/customer/order/location/category). Generated screens must not `list-*` to build a picker **or to display a catalog/table/feed**. `list-*` docs are for the picker loader or totals-only computed sheets. Staff / role fields: `StaffSelect` / `RoleSelect` (or FormBuilder `staff` / `role`).

# Needs

- pick products / add SKUs to the app → ResourcePicker `product` (never `list-products` on a screen)
- create / show / update product → `create-product` / `get-product-details` / `update-product`
- pick / show product categories → ResourcePicker `product-category` / `get-product-category`
- pick / show / create / update orders → ResourcePicker `order` / `get-order-details` / `create-order` / `update-order`
- pick / show / create / update customers → ResourcePicker `customer` / `get-customer-details` / `create-customer` / `update-customer`
- pick / show locations → ResourcePicker `location` / `get-location`
- till / cash-up **totals** (do not render charge rows) → `list-charges` / `get-charge-details`
- pick / show / create / update invoices → ResourcePicker `invoice` / `get-invoice-details` / `create-invoice` / `update-invoice`
- invoice settings → `get-invoice-settings`
- payment requests → ResourcePicker `payment-request` / `create-payment-request` / `get-payment-request` / `update-payment-request`
- refunds → `create-refund` / `get-refund`
- subscription plans → ResourcePicker `subscription-plan` / `create-subscription-plan` / `get-subscription-plan` / `update-subscription-plan`
- recurring billing → ResourcePicker `recurring-billing` / `create-recurring-billing` / `get-recurring-billing` / `update-recurring-billing` / `pause-recurring-billing` / `resume-recurring-billing` / `charge-recurring-billing`
- recurring settings → `get-recurring-billing-settings` / `update-recurring-billing-settings`
- coupons / discounts / taxes → ResourcePicker `coupon` / `discount` / `tax` / `get-coupon` / `get-discount` / `get-tax`
- shipping / pickups / add-ons → ResourcePicker `shipping` / `pickup` / `add-on` / `get-shipping` / `get-pickup` / `get-add-on`
- store settings / links / pages → `get-store-settings` / `get-store-links` / `update-store-links` / ResourcePicker `store-page` / `get-store-page`

# Endpoints

## Products

- `list-products` — `GET /v1/products` — `hitpay-llms/list-products.md`
- `create-product` — `POST /v1/products` — `hitpay-llms/create-product.md`
- `get-product-details` — `GET /v1/products/{product_id}` — `hitpay-llms/get-product-details.md`
- `update-product` — `POST /v1/products/{product_id}` (`_method=PATCH`) — `hitpay-llms/update-product.md`
- `list-product-categories` — `GET /v1/product-category` — `hitpay-llms/list-product-categories.md`
- `get-product-category` — `GET /v1/product-category/{id}` — `hitpay-llms/get-product-category.md`

## Orders

- `list-orders` — `GET /v1/orders` — `hitpay-llms/list-orders.md`
- `get-order-details` — `GET /v1/orders/{order_id}` — `hitpay-llms/get-order-details.md`
- `create-order` — `POST /v1/orders` — `hitpay-llms/create-order.md`
- `update-order` — `PATCH /v1/orders/{order_id}` — `hitpay-llms/update-order.md`

## Customers

- `list-customers` — `GET /v1/customers` — `hitpay-llms/list-customers.md`
- `create-customer` — `POST /v1/customers` — `hitpay-llms/create-customer.md`
- `get-customer-details` — `GET /v1/customers/{customer_id}` — `hitpay-llms/get-customer-details.md`
- `update-customer` — `PATCH /v1/customers/{customer_id}` — `hitpay-llms/update-customer.md`

## Locations

- `list-locations` — `GET /v1/locations` — `hitpay-llms/list-locations.md`
- `get-location` — `GET /v1/locations/{location_id}` — `hitpay-llms/get-location.md`

## Charges and invoices

- `list-charges` — `GET /v1/charges` — `hitpay-llms/list-charges.md`
- `get-charge-details` — `GET /v1/charges/{charge_id}` — `hitpay-llms/get-charge-details.md`
- `list-invoices` — `GET /v1/invoices` — `hitpay-llms/list-invoices.md`
- `get-invoice-details` — `GET /v1/invoices/{invoice_id}` — `hitpay-llms/get-invoice-details.md`
- `create-invoice` — `POST /v1/invoices` — `hitpay-llms/create-invoice.md`
- `update-invoice` — `PUT /v1/invoices/{invoice_id}` — `hitpay-llms/update-invoice.md`
- `get-invoice-settings` — `GET /v1/invoice-settings` — `hitpay-llms/get-invoice-settings.md`

## Payment requests and refunds

- `list-payment-requests` — `GET /v1/payment-requests` — `hitpay-llms/list-payment-requests.md`
- `create-payment-request` — `POST /v1/payment-requests` — `hitpay-llms/create-payment-request.md`
- `get-payment-request` — `GET /v1/payment-requests/{id}` — `hitpay-llms/get-payment-request.md`
- `update-payment-request` — `PUT`/`PATCH /v1/payment-requests/{id}` — `hitpay-llms/update-payment-request.md`
- `create-refund` — `POST /v1/refunds` — `hitpay-llms/create-refund.md`
- `get-refund` — `GET /v1/refunds/{id}` — `hitpay-llms/get-refund.md`

## Recurring

- `list-subscription-plans` — `GET /v1/subscription-plan` — `hitpay-llms/list-subscription-plans.md`
- `create-subscription-plan` — `POST /v1/subscription-plan` — `hitpay-llms/create-subscription-plan.md`
- `get-subscription-plan` — `GET /v1/subscription-plan/{id}` — `hitpay-llms/get-subscription-plan.md`
- `update-subscription-plan` — `PUT`/`PATCH /v1/subscription-plan/{id}` — `hitpay-llms/update-subscription-plan.md`
- `list-recurring-billings` — `GET /v1/recurring-billing` — `hitpay-llms/list-recurring-billings.md`
- `create-recurring-billing` — `POST /v1/recurring-billing` — `hitpay-llms/create-recurring-billing.md`
- `get-recurring-billing` — `GET /v1/recurring-billing/{id}` — `hitpay-llms/get-recurring-billing.md`
- `update-recurring-billing` — `PUT`/`PATCH /v1/recurring-billing/{id}` — `hitpay-llms/update-recurring-billing.md`
- `pause-recurring-billing` — `POST …/pause` — `hitpay-llms/pause-recurring-billing.md`
- `resume-recurring-billing` — `POST …/resume` — `hitpay-llms/resume-recurring-billing.md`
- `charge-recurring-billing` — `POST /v1/charge/recurring-billing/{id}` — `hitpay-llms/charge-recurring-billing.md`
- `get-recurring-billing-settings` — `GET /v1/recurring-billing-settings` — `hitpay-llms/get-recurring-billing-settings.md`
- `update-recurring-billing-settings` — `PUT`/`POST /v1/recurring-billing-settings` — `hitpay-llms/update-recurring-billing-settings.md`

## Commerce extras

- `list-coupons` / `get-coupon` — `/v1/coupons`
- `list-discounts` / `get-discount` — `/v1/discounts`
- `list-taxes` / `get-tax` — `/v1/taxes`
- `list-shipping` / `get-shipping` — `/v1/shipping`
- `list-pickups` / `get-pickup` — `/v1/pickups`
- `list-add-ons` / `get-add-on` — `/v1/add-ons`
- `get-store-settings` — `GET /v1/store-settings`
- `get-store-links` / `update-store-links` — `/v1/store-links`
- `list-store-pages` / `get-store-page` — `/v1/store-pages`
