---
title: "Quickstart"
url: https://fleetbase.io/docs/ledger/getting-started/quickstart
module: ledger
---

# Quickstart

Get up and running with Ledger — review your default chart of accounts, set invoicing defaults, configure a payment gateway, and create your first invoice.

# Quickstart

This guide walks you through reviewing your seeded chart of accounts, setting invoicing defaults, configuring a payment gateway, and creating and recording payment on your first invoice.

## Step 1 — Review Your Chart of Accounts

When your Fleetbase company is created, Ledger automatically provisions a default chart of accounts covering the standard asset, liability, equity, revenue, and expense accounts a logistics business needs.

Navigate to
**Ledger → Accounting → Accounts**
.

Review the default accounts grouped by type — Cash, Bank Account, Accounts Receivable, Stripe Clearing, Wallet Liability Pool, Driver Earnings Payable, Delivery Revenue, Driver Payout Expense, etc. See
[Chart of Accounts](https://fleetbase.io/docs/ledger/accounting/chart-of-accounts)
for the full seeded list.

Optionally add custom accounts for your business (e.g. an extra revenue account per service line).

## Step 2 — Configure Invoice & Payment Defaults

Set your invoicing defaults before creating invoices — these power auto-numbering, due-date calculation, and PDF rendering.

Navigate to
**Ledger → Settings → Invoice**
.

Set the
**Invoice Prefix**
(default
`INV-`
),
**Default Currency**
, and
**Payment Terms (days)**
. Optionally set the
**Default Template**
so invoices can render to PDF without picking a template each time.

Save.

Open
**Ledger → Settings → Payment**
and (optionally) set a
**Default Gateway**
for invoice payments.

See
[Settings](https://fleetbase.io/docs/ledger/settings/overview)
for the full reference.

## Step 3 — Configure a Payment Gateway

Navigate to
**Ledger → Payments → Gateways**
.

Click
**New Gateway**
and select
**GNU Taler**
,
**Stripe**
,
**Cash**
, or
**QPay**
. Use Cash for offline or manual receipts.

Fill in the credentials shown by the form. GNU Taler requires a Merchant Backend URL, instance ID, API token, and supported currency; Stripe requires a publishable key, secret key, and webhook signing secret.

Set
**Environment**
to
`sandbox`
while testing.

Click
**Save**
.

![Payment gateway details — credentials, environment, and webhook URL](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fledger-payment-gateway-details.dcfed23e.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Step 4 — Create an Invoice

Navigate to
**Ledger → Billing → Invoices**
.

Click
**New Invoice**
.

Select a
**Customer**
. The customer field is polymorphic — pick a Fleetbase contact, vendor, driver, or user.

Set the
**Invoice Date**
. The
**Due Date**
auto-fills from your invoice settings if a non-zero
`due_date_offset_days`
is set.

Add one or more
**Line Items**
— each with a description, quantity, unit price, and optional tax rate (decimal, 0–100).

Click
**Save**
. The invoice is created in
`draft`
status and assigned a number like
`INV-004821`
(6-digit random integer). Subtotal, tax, and total are calculated automatically.

![Invoice detail — header with customer and dates, line items table, totals, and action buttons](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fledger-invoice-details.79c46be1.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Step 5 — Send the Invoice

Open the draft invoice.

Click
**Send**
— Ledger emails the invoice to the customer's email address and transitions the status to
`sent`
. The customer receives the public invoice URL in the email and can pay online without logging in.

Alternatively, click
**Mark as Sent**
to transition the status without sending an email — useful if you want to deliver the invoice through your own channel (SMS, your CRM, in person).

The public invoice URL format is
`/~/invoice?id={public_id}`
. The first time the customer opens it, the invoice transitions to
`viewed`
.

## Step 6 — Record Payment

When the customer pays:

Open the invoice.

Click
**Record Payment**
.

Enter the
**Amount**
received, the
**Payment Method**
(defaults to
`manual`
), and an optional
**Reference**
(e.g., a bank statement line).

Click
**Save**
. The invoice's
`amount_paid`
increases, the
`balance`
is recalculated, and the status moves to
`paid`
(balance = 0) or
`partial`
(balance > 0). A journal entry (DEBIT Cash → CREDIT Accounts Receivable) and a
`Transaction`
record are created automatically.

## Next Steps

* [Chart of Accounts](https://fleetbase.io/docs/ledger/accounting/chart-of-accounts)
  — review the seeded accounts and add custom ones
* [Payment Gateways](https://fleetbase.io/docs/ledger/payments/gateways/overview)
  — configure GNU Taler, Stripe, Cash, or QPay
* [Wallets](https://fleetbase.io/docs/ledger/payments/wallets)
  — manage driver, customer, company, and user wallets
* [Reports](https://fleetbase.io/docs/ledger/reports/overview)
  — generate balance sheets, income statements, AR aging, and the wallet summary
* [Settings](https://fleetbase.io/docs/ledger/settings/overview)
  — configure invoice prefixes, payment terms, default gateways, and fiscal year
