---
title: "Payment Settings"
url: https://fleetbase.io/docs/fleet-ops/settings/payments
module: fleet-ops
---

# Payment Settings

Connect a Stripe Connect account so Fleet-Ops can charge customers for service quotes and surface settled transactions in the console.

# Payment Settings

**Payment Settings**
in Fleet-Ops manages a single thing: connecting your organisation to Stripe via
**Stripe Connect**
. Once connected, Fleet-Ops can charge customers for service quotes, surface every settled transaction in the payments table, and aggregate totals by currency. There are no separate Stripe API key fields, currency selectors, or capture-mode toggles — the Stripe account itself owns those settings.

Navigate to
**Fleet-Ops → Settings → Payments**
.

![Payments settings panel — Stripe Connect onboarding info block when no account is connected, transactions table when connected](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-payment-settings.9c4e9585.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Two States

The page renders one of two views depending on whether your organisation has connected to Stripe yet.

### Not Connected — Stripe Connect Onboarding

If no Stripe account is linked, you'll see an info block prompting you to start onboarding. This is shown only when the platform has Stripe enabled (a publishable key is configured at the platform level). Click
**Start payments onboard**
to launch the embedded Stripe Connect flow.

Click
**Start payments onboard**
— Fleet-Ops navigates to the embedded onboarding screen.

Click
**Start**
to begin. Stripe's hosted onboarding component is mounted directly into the page.

Complete the onboarding inside the embedded form — business details, banking, identity verification. Stripe handles all of it.

When Stripe reports the onboarding as complete, the success state appears with a
**Continue**
button. Clicking it returns you to the Payments settings page, now showing the transactions view.

If the platform doesn't have Stripe enabled (no publishable key in the platform config), a warning info block tells you the system Stripe credentials aren't set up. In that case the platform admin has to configure Stripe at the platform level before payments onboarding becomes available.

### Connected — Transactions View

Once a Stripe Connect account is linked, the page becomes a transactions table. Each row is a
`PurchaseRate`
— Fleet-Ops's record of a paid service quote.

The header shows
**per-currency totals**
for the visible result set, e.g.
*Total USD: $4,532.10 · Total SGD: $1,205.00*
.

The table has these columns:

| Column | Source |
| --- | --- |
| **Purchase Rate ID** | The transaction's `public_id` (click to copy) |
| **Service Quote** | The linked service quote's `public_id` (click to copy) |
| **Order** | The linked order's `public_id` (click to copy) |
| **Customer** | The customer contact name |
| **Amount** | Charged amount with currency |
| **Date** | Created timestamp |

Pagination, sorting, and filters work the same way they do across other Fleet-Ops list views.

## Where Live vs Test Is Decided

There is no live/test toggle on this settings page. Whether transactions go through live Stripe or Stripe's test mode is determined entirely by
**which Stripe credentials the platform is configured with**
:

* Live publishable + secret keys → live charges
* Test keys → test charges

If you want to develop against test Stripe, configure the platform with test keys and run onboarding against Stripe's test environment.

## Payment Flow

Once connected, an order's
[Service Quote](https://fleetbase.io/docs/fleet-ops/operations/service-quotes/overview)
is delivered to the customer through one of three paths — your operation picks whichever fits its model:

### Path A — Ledger Invoice (email)

The Ledger extension turns the service quote into an invoice and emails it to the customer with a hosted
**invoice payment link**
. The customer clicks the link, lands on the invoice payment page, and pays through Stripe checkout.

1. Order is created → a Service Quote is generated.
2. Ledger creates an invoice from the quote and sends it to the customer's email.
3. Customer follows the link, opens the invoice payment page, and pays.
4. Stripe notifies Fleet-Ops via webhook; the payment is recorded as a
   `PurchaseRate`
   linked to the order.
5. The order becomes eligible for dispatch.

### Path B — External Portals and API Integrations

If you are running a custom customer portal or external business application integrated with the Fleet-Ops API, the quote payment flow can be initiated via API. Fleet-Ops receives the webhook event and records the
`PurchaseRate`
against the order in the exact same way.

## Permissions

The Payments page requires the
`fleet-ops onboard payments`
permission on the user's role for the onboarding action to be available. Without it the onboarding button is disabled.
