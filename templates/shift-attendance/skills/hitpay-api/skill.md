---
name: hitpay-api
description: Read or change the business's HitPay data (products, orders, invoices, customers, charges, payment requests, …) from a backend route through the HitPay integration. Use whenever the app needs HitPay data beyond staff, roles and locations.
---

# HitPay API

The HitPay integration is an OAuth connection to the HitPay REST API (`/v1/...`). It has no Nango actions, so every call goes through `nangoRequest` with `integration: 'hitpay'`. Nango adds the OAuth token: never send `X-BUSINESS-API-KEY` or an `Authorization` header, and never ask the owner for an API key.

Staff, roles and locations of this app come from the host instead (`c.host.get(...)`, see `skills/api/skill.md`).

## Before writing the route

1. Make sure `hitpay` is granted and connected (`bun run integrations list`); otherwise request it as `AGENTS.md` describes.
2. Pick the endpoint from the table below.
3. Call it once with the `nango_proxy` MCP tool (`integration: "hitpay"`, `method`, `path`, `query_params`), with a small `per_page`, and read the real response. Build the types from that response.
4. For parameters, read the endpoint's page under https://docs.hitpayapp.com/apis (e.g. https://docs.hitpayapp.com/apis/product/get-all-products). It is the same API; ignore the page's API key header.

## Route

```ts
import { HttpError, json, route } from '../lib/app.ts'
import { IntegrationError, nangoRequest } from '../lib/integrations.ts'

type Product = { id: string; name: string; price: number; currency: string; status: 'draft' | 'published' }
type Page<T> = { data: T[]; meta: { current_page: number; last_page: number; total: number } }

/** /api/products */
export const products = {
  GET: route(async (c) => {
    const page = Number(c.query.get('page') ?? '1') || 1
    try {
      const response = await nangoRequest<Page<Product>>(c.host, {
        integration: 'hitpay',
        path: '/v1/products',
        query: { page, per_page: 25, 'statuses[]': ['published'] },
      })
      if (!response) return json({ status: 'waiting' as const })
      return json({ status: 'ready' as const, products: response.body.data, meta: response.body.meta })
    } catch (error) {
      if (error instanceof IntegrationError) throw new HttpError(502, error.message)
      throw error
    }
  }),
}
```

Rules:

* Lists are paginated: pass `page` and `per_page`, and show `meta` (`current_page`, `last_page`, `total`) in the page. Never loop over every page in one request.
* An array parameter goes in `query` under its `[]` name, e.g. `'statuses[]': ['draft', 'published']`.
* Money comes as `price` (a decimal) with `currency`; show it with `Intl.NumberFormat` and that currency.
* 401 or 403 means the connection lacks the scope in the table. Show the error; do not retry. The owner reconnects HitPay to grant it.
* Write with care: a POST, PUT, PATCH or DELETE changes the business's real data. Ask for confirmation in the page before a delete.

## Endpoints

Each needs the OAuth scope shown. A `*:read` scope covers GET only.

| Method | Path | Scope |
|---|---|---|
| GET | `/v1/account-status` | `business:read` |
| GET | `/v1/add-ons` | `commerce:read` |
| GET | `/v1/add-ons/{add_on}` | `commerce:read` |
| POST | `/v1/charge/recurring-billing/{recurring_billing}` | `payments:create` |
| GET | `/v1/charges` | `payments:read` |
| GET | `/v1/charges/{charge}` | `payments:read` |
| GET | `/v1/coupons` | `commerce:read` |
| POST | `/v1/coupons` | `commerce:create` |
| GET | `/v1/coupons/{coupon}` | `commerce:read` |
| PUT | `/v1/coupons/{coupon}` | `commerce:update` |
| PATCH | `/v1/coupons/{coupon}` | `commerce:update` |
| DELETE | `/v1/coupons/{coupon}` | `commerce:delete` |
| GET | `/v1/customers` | `customer:read` |
| POST | `/v1/customers` | `customer:create` |
| GET | `/v1/customers/{customer}` | `customer:read` |
| PATCH | `/v1/customers/{customer}` | `customer:update` |
| DELETE | `/v1/customers/{customer}` | `customer:delete` |
| GET | `/v1/discounts` | `commerce:read` |
| GET | `/v1/discounts/{discount}` | `commerce:read` |
| GET | `/v1/invoice-settings` | `commerce:read` |
| GET | `/v1/invoices` | `commerce:read` |
| POST | `/v1/invoices` | `commerce:create` |
| GET | `/v1/invoices/{invoice}` | `commerce:read` |
| PUT | `/v1/invoices/{invoice}` | `commerce:update` |
| DELETE | `/v1/invoices/{invoice}` | `commerce:delete` |
| GET | `/v1/locations` | `commerce:read` |
| GET | `/v1/locations/{location}` | `commerce:read` |
| GET | `/v1/orders` | `commerce:read` |
| POST | `/v1/orders` | `commerce:create` |
| GET | `/v1/orders/{order}` | `commerce:read` |
| PATCH | `/v1/orders/{order}` | `commerce:update` |
| DELETE | `/v1/orders/{order}` | `commerce:delete` |
| GET | `/v1/payment-requests` | `payments:read` |
| POST | `/v1/payment-requests` | `payments:create` |
| GET | `/v1/payment-requests/{payment_request}` | `payments:read` |
| PUT | `/v1/payment-requests/{payment_request}` | `payments:create` |
| PATCH | `/v1/payment-requests/{payment_request}` | `payments:create` |
| DELETE | `/v1/payment-requests/{payment_request}` | `payments:cancel` |
| GET | `/v1/pickups` | `commerce:read` |
| GET | `/v1/pickups/{pickup}` | `commerce:read` |
| GET | `/v1/product-category` | `commerce:read` |
| GET | `/v1/product-category/{product_category}` | `commerce:read` |
| GET | `/v1/products` | `commerce:read` |
| POST | `/v1/products` | `commerce:create` |
| GET | `/v1/products/{product}` | `commerce:read` |
| PATCH | `/v1/products/{product}` | `commerce:update` |
| DELETE | `/v1/products/{product}` | `commerce:delete` |
| GET | `/v1/recurring-billing` | `payments:read` |
| POST | `/v1/recurring-billing` | `payments:create` |
| GET | `/v1/recurring-billing/{recurring_billing}` | `payments:read` |
| PUT | `/v1/recurring-billing/{recurring_billing}` | `payments:create` |
| PATCH | `/v1/recurring-billing/{recurring_billing}` | `payments:create` |
| DELETE | `/v1/recurring-billing/{recurring_billing}` | `payments:cancel` |
| POST | `/v1/recurring-billing/{recurring_billing}/pause` | `payments:cancel` |
| POST | `/v1/recurring-billing/{recurring_billing}/resume` | `payments:create` |
| POST | `/v1/recurring-billing/{recurring_billing}/setup-intent` | `payments:create` |
| GET | `/v1/recurring-billing-settings` | `payments:read` |
| POST | `/v1/recurring-billing-settings` | `payments:create` |
| PUT | `/v1/recurring-billing-settings` | `payments:create` |
| DELETE | `/v1/recurring-billing-settings` | `payments:cancel` |
| POST | `/v1/refund` | `payments:refund` |
| GET | `/v1/refund/{b_refund}` | `payments:read` |
| POST | `/v1/refunds` | `payments:refund` |
| GET | `/v1/refunds/{b_refund}` | `payments:read` |
| GET | `/v1/shipping` | `commerce:read` |
| GET | `/v1/shipping/{shipping}` | `commerce:read` |
| GET | `/v1/store-links` | `commerce:read` |
| PUT | `/v1/store-links` | `commerce:update` |
| GET | `/v1/store-pages` | `commerce:read` |
| GET | `/v1/store-pages/{store_page}` | `commerce:read` |
| GET | `/v1/store-settings` | `commerce:read` |
| GET | `/v1/subscription-plan` | `payments:read` |
| POST | `/v1/subscription-plan` | `payments:create` |
| GET | `/v1/subscription-plan/{subscription_plan}` | `payments:read` |
| PUT | `/v1/subscription-plan/{subscription_plan}` | `payments:create` |
| PATCH | `/v1/subscription-plan/{subscription_plan}` | `payments:create` |
| DELETE | `/v1/subscription-plan/{subscription_plan}` | `payments:cancel` |
| GET | `/v1/taxes` | `commerce:read` |
| GET | `/v1/taxes/{taxsetting}` | `commerce:read` |
