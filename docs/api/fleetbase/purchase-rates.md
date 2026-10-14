---
title: "Purchase Rates"
url: https://fleetbase.io/docs/api/fleetbase/purchase-rates
module: api
---

# Purchase Rates

Purchase rates record the cost paid to acquire capacity or services from carriers, vendors, and integrated providers. Use them to compare buy-side costs against customer-facing service rates.

* [The Purchase Rate object](#the-purchase-rate-object)
* [Create a Purchase Rate

  POST
  `/v1/purchase-rates`](#create-a-purchase-rate)
* [Retrieve a Purchase Rate

  GET
  `/v1/purchase-rates/:id`](#retrieve-a-purchase-rate)
* [Query Purchase Rates

  GET
  `/v1/purchase-rates`](#query-purchase-rates)

## The Purchase Rate object

A purchase rate records a purchased service quote and links it to an order, customer, transaction, amount, currency, and status.

Attributes

`id`

string

optional

Public purchase rate identifier.

`service_quote`

string

optional

Service quote associated with the purchase.

`order`

string

optional

Order associated with the purchase.

`customer`

string

optional

Customer associated with the purchase.

`transaction`

string

optional

Transaction associated with the purchase.

`amount`

currency

optional

Purchased amount.

`currency`

currency

optional

Three-letter currency code.

`status`

string

optional

Purchase rate status.

`updated_at`

timestamp

optional

Timestamp when the purchase rate was last updated.

`created_at`

timestamp

optional

Timestamp when the purchase rate was created.

The
Purchase Rate
object

```
{
  "id": "purchase_rate_7YqM3KpL2n",
  "service_quote": "service_quote_6zV1KqN9pR",
  "order": "order_7YqM3KpL2n",
  "customer": "contact_6zV1KqN9pR",
  "transaction": null,
  "amount": 2500,
  "currency": "USD",
  "status": "created",
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/purchase-rates`

## [Create a Purchase Rate](#create-a-purchase-rate)

Only ServiceQuote objects generated using a Payload object may be used to create PurchaseRate objects.

Body parameters

`service_quote`

string

required

Service quote ID to purchase.

`order`

string

optional

Existing order ID to attach the purchase rate to. When omitted, Fleetbase may create an order from the service quote.

`customer`

string

optional

Contact or vendor ID to assign as the purchase customer.

`meta`

object

optional

Additional purchase rate metadata.

POST
`/v1/purchase-rates`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/purchase-rates \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "service_quote": "{{service_quote_id}}"
}'
```

200

OK

```
{
  "id": "<string>",
  "customer": "<string>",
  "order": "<string>",
  "service_quote": "<string>",
  "status": "<string>",
  "updated_at": "<string>",
  "created_at": "<string>"
}
```

GET
`/v1/purchase-rates/:id`

## [Retrieve a Purchase Rate](#retrieve-a-purchase-rate)

This endpoint allows you to retrieve a purchase-rate object to view it's details.

GET
`/v1/purchase-rates/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/purchase-rates/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "id": "<string>",
  "customer": "<string>",
  "order": "<string>",
  "service_quote": "<string>",
  "status": "<string>",
  "updated_at": "<string>",
  "created_at": "<string>"
}
```

GET
`/v1/purchase-rates`

## [Query Purchase Rates](#query-purchase-rates)

This endpoint allows you to query purchase-rates you have created, it also provides paginated results on all the purchase-rates in your Fleetbase.

Query parameters

`limit`

integer

optional

Maximum number of purchase rates to return.

`offset`

integer

optional

Number of purchase rates to skip before returning results.

`sort`

string

optional

Sort expression for the purchase rate query.

`service_quote`

string

optional

Filters purchase rates by service quote ID.

`order`

string

optional

Filters purchase rates by order ID.

`customer`

string

optional

Filters purchase rates by customer ID.

GET
`/v1/purchase-rates`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/purchase-rates?limit=25&offset=0&sort=created_at \
  -H "Authorization: Bearer flb_live_…"
```
