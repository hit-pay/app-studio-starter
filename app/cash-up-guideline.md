# Cash-up / till reconciliation

Use this recipe for an end-of-day till reconciliation app. It defines the
smallest complete workflow; do not expand it into a sales dashboard or
transaction browser.

## Decision

- UI: `AppLayout` once, then `PageLayout`.
- Summary: `MetricCard` for expected cash, counted cash, and variance.
- Input: `FormLayout` + `FormBuilder` for date, location, opening float, counted
  cash, cash movements, and notes.
- History: `DataTable` backed by Turso `cash_ups`.
- HitPay: `list-charges` only for aggregate totals; never render its `data[]`.
- No wake: scheduled wake is not a cash-up integration.

## Data ownership

HitPay supplies calculated payment totals for the selected date and location:
cash sales, cash refunds, and non-cash totals. The staff member supplies the
opening float, cash counted in the drawer, cash paid out/in, and notes. Turso
is the source of truth for completed cash-ups and audit history.

Use this formula:

```text
expected_cash = opening_float + cash_sales - cash_refunds + cash_in - cash_out
variance = counted_cash - expected_cash
```

Do not calculate expected cash from visible charge rows. Use the documented
`list-charges` filters (`date_from`, `date_to`, `location_ids[]`,
`payment_methods[]`, and the required status filter) and aggregate the
response on the server.

## Minimal Turso record

The `cash_ups` table needs:

- `id`
- `business_date`
- `location_id`
- `opening_float`
- `cash_sales`
- `cash_refunds`
- `cash_in`
- `cash_out`
- `expected_cash`
- `counted_cash`
- `variance`
- `notes`
- `status` (`draft` | `submitted` | `approved`)
- `created_by`, `created_at`
- `approved_by`, `approved_at` when approved

Add a unique constraint for one submitted/approved cash-up per
`business_date` + `location_id`, unless the product explicitly needs multiple
shifts per day.

## Roles and flow

- Staff roles can create a draft, enter the count, and submit it.
- Manager roles can review, approve, or send it back for correction.
- Derive the actor from `getHitPaySession()` on the server; never accept
  `userId` or staff identity from the browser.
- Authorize every read/write `createServerFn` before querying Turso or HitPay.

## Implementation order

1. Create the migration and server functions for totals, draft save, submit,
   and manager approval.
2. Build the page summary and cash-up form.
3. Add the Turso-backed history table with status and variance.
4. Handle loading, empty, error, validation, and success states.
5. Run targeted lint, then build once. Update `PLAN.md` and mark all steps
   complete.
