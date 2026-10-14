---
title: "Public Invoices"
url: https://fleetbase.io/docs/api/ledger/public-invoices
module: api
---

# Public Invoices

Public invoices let customers view and pay invoices without signing in to Fleetbase. Use these endpoints to retrieve invoice details, list available gateways, and start or record payment.

* [The Public Invoice object](#the-public-invoice-object)
* [Get Public Invoice

  GET
  `/public/invoices`](#get-public-invoice)
* [List Public Invoice Gateways

  GET
  `/public/invoices/gateways`](#list-public-invoice-gateways)
* [Pay Public Invoice

  POST
  `/public/invoices/pay`](#pay-public-invoice)

## The Public Invoice object

A public invoice is the customer-facing representation of a Ledger invoice. It includes invoice totals, dates, line items, customer data when available, and payment state.

Attributes

`id`

string

optional

Public identifier of the invoice.

`public_id`

string

optional

Public identifier of the invoice.

`customer`

object

optional

Customer associated with the invoice, when loaded.

`order`

object

optional

Related order, when loaded.

`transaction`

object

optional

Related transaction, when loaded.

`template`

object

optional

Invoice template, when loaded.

`number`

string

optional

Invoice number.

`status`

string

optional

Invoice status.

`date`

date

optional

Invoice issue date.

`due_date`

date

optional

Invoice due date.

`currency`

currency

optional

Invoice currency code.

`subtotal`

integer

optional

Subtotal in the smallest currency unit.

`tax`

integer

optional

Tax amount in the smallest currency unit.

`total_amount`

integer

optional

Total invoice amount in the smallest currency unit.

`amount_paid`

integer

optional

Amount paid in the smallest currency unit.

`balance`

integer

optional

Remaining balance in the smallest currency unit.

`notes`

string

optional

Invoice notes.

`terms`

string

optional

Invoice payment terms.

`items`

array of objects

optional

Invoice line items.

`meta`

object

optional

Arbitrary metadata stored with the invoice.

`sent_at`

timestamp

optional

Time the invoice was sent.

`viewed_at`

timestamp

optional

Time the invoice was first viewed publicly.

`paid_at`

timestamp

optional

Time the invoice was paid.

`created_at`

timestamp

optional

Time the invoice was created.

`updated_at`

timestamp

optional

Time the invoice was last updated.

The
Public Invoice
object

```
{
  "id": "invoice_7fJ3kQ9",
  "public_id": "invoice_7fJ3kQ9",
  "customer": null,
  "order": null,
  "transaction": null,
  "template": null,
  "number": "INV-1007",
  "status": "sent",
  "date": "2026-05-07",
  "due_date": "2026-05-21",
  "currency": "USD",
  "subtotal": 12500,
  "tax": 0,
  "total_amount": 12500,
  "amount_paid": 0,
  "balance": 12500,
  "notes": "Thank you for your business.",
  "terms": "Due on receipt.",
  "items": [],
  "meta": {},
  "sent_at": "2026-05-07T09:30:00Z",
  "viewed_at": null,
  "paid_at": null,
  "created_at": "2026-05-07T09:30:00Z",
  "updated_at": "2026-05-07T09:30:00Z"
}
```

GET
`/public/invoices`

## [Get Public Invoice](#get-public-invoice)

Retrieves the public view of an invoice by public ID or UUID. Draft invoices are not available through the public invoice URL.

GET
`/public/invoices`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/public/invoices \
  -H "Authorization: Bearer flb_live_…"
```

GET
`/public/invoices/gateways`

## [List Public Invoice Gateways](#list-public-invoice-gateways)

Lists active payment gateways available for a public invoice. Gateway credentials and sensitive configuration are never returned.

GET
`/public/invoices/gateways`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/public/invoices/gateways \
  -H "Authorization: Bearer flb_live_…"
```

POST
`/public/invoices/pay`

## [Pay Public Invoice](#pay-public-invoice)

Initiates or records payment for a public invoice. Stripe gateways return a checkout URL, while non-redirect gateways record the invoice payment immediately.

Body parameters

`gateway_id`

string

required

Public ID of the payment gateway to use for the invoice payment.

`reference`

string

optional

Customer-provided payment reference or note.

POST
`/public/invoices/pay`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/public/invoices/pay \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "gateway_id": "{{gateway_id}}",
  "reference": "{{payment_reference}}"
}'
```
