---
title: "Fuel Transactions"
url: https://fleetbase.io/docs/api/fleetbase/fuel-transactions
module: api
---

# Fuel Transactions

Fuel transactions represent imported or recorded fuel-card/provider transactions exposed to API users as fuel transactions.

* [The Fuel Transaction object](#the-fuel-transaction-object)
* [Create a Fuel Transaction

  POST
  `/v1/fuel-transactions`](#create-a-fuel-transaction)
* [Query Fuel Transactions

  GET
  `/v1/fuel-transactions`](#query-fuel-transactions)
* [Retrieve a Fuel Transaction

  GET
  `/v1/fuel-transactions`](#retrieve-a-fuel-transaction)
* [Update a Fuel Transaction

  PUT
  `/v1/fuel-transactions`](#update-a-fuel-transaction)
* [Delete a Fuel Transaction

  DELETE
  `/v1/fuel-transactions`](#delete-a-fuel-transaction)
* [Match Fuel Transaction Vehicle

  POST
  `/v1/fuel-transactions/match-vehicle`](#match-fuel-transaction-vehicle)
* [Match Fuel Transaction Order

  POST
  `/v1/fuel-transactions/match-order`](#match-fuel-transaction-order)
* [Reprocess Fuel Transaction

  POST
  `/v1/fuel-transactions/reprocess`](#reprocess-fuel-transaction)
* [Review Fuel Transaction

  POST
  `/v1/fuel-transactions/review`](#review-fuel-transaction)

## The Fuel Transaction object

A fuel transaction stores provider transaction identity, matched vehicle/order/fuel report links, station data, volume, amount, odometer, and sync status.

Attributes

`id`

string

optional

Public fuel transaction identifier.

`provider`

string

optional

Fuel provider key.

`provider_transaction_id`

string

optional

Provider transaction identifier.

`vehicle`

string

optional

Matched vehicle public ID, when loaded.

`driver`

string

optional

Matched driver public ID, when loaded.

`order`

string

optional

Matched order public ID, when loaded.

`fuel_report`

string

optional

Generated fuel report public ID, when loaded.

`station_name`

string

optional

Fuel station name.

`volume`

number

optional

Fuel volume.

`sync_status`

string

optional

Sync or review status.

The
Fuel Transaction
object

```
{
  "id": "fuel_provider_transaction_3KpL7Vz9Qx",
  "provider": "petroapp",
  "provider_transaction_id": "TX-10001",
  "vehicle": "vehicle_7YqM3KpL2n",
  "station_name": "North Depot Fuel",
  "volume": 42.5,
  "metric_unit": "liter",
  "amount": 6500,
  "currency": "USD",
  "sync_status": "matched",
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/fuel-transactions`

## [Create a Fuel Transaction](#create-a-fuel-transaction)

Create a fuel transaction.

Body parameters

`provider`

string

optional

Fuel provider key.

`provider_transaction_id`

string

optional

Provider transaction identifier. Unique per provider within an organization.

`connection`

string

optional

Fuel provider connection public ID.

`vehicle`

string

optional

Vehicle public ID.

`driver`

string

optional

Driver public ID.

`order`

string

optional

Order public ID.

`fuel_report`

string

optional

Fuel report public ID.

`transaction_at`

timestamp

optional

Transaction timestamp.

`volume`

number

optional

Fuel volume.

`amount`

currency

optional

Transaction amount.

POST
`/v1/fuel-transactions`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/fuel-transactions \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "provider": "petroapp",
  "provider_transaction_id": "TX-{{$timestamp}}",
  "vehicle": "{{vehicle_id}}",
  "station_name": "North Depot Fuel",
  "transaction_at": "2026-05-07T08:30:00Z",
  "volume": 42.5,
  "metric_unit": "liter",
  "amount": 6500,
  "currency": "USD"
}'
```

201

OK

```
{
  "id": "<string>",
  "object": "fuel_transactions"
}
```

GET
`/v1/fuel-transactions`

## [Query Fuel Transactions](#query-fuel-transactions)

Query fuel transactions.

Query parameters

`query`

string

optional

Search query for fuel transactions.

`limit`

integer

optional

Maximum number of records to return.

`page`

integer

optional

Page number for paginated results.

`sort`

string

optional

Sort expression, such as
`-created_at`
.

`provider`

string

optional

Filter by provider.

`sync_status`

string

optional

Filter by sync status.

`vehicle`

string

optional

Filter by vehicle public ID.

`connection`

string

optional

Filter by connection public ID.

`transaction_at`

timestamp

optional

Filter by transaction date or range.

GET
`/v1/fuel-transactions`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/fuel-transactions \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "id": "<string>",
  "object": "fuel_transactions"
}
```

GET
`/v1/fuel-transactions`

## [Retrieve a Fuel Transaction](#retrieve-a-fuel-transaction)

Retrieve a fuel transaction.

GET
`/v1/fuel-transactions`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/fuel-transactions \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "id": "<string>",
  "object": "fuel_transactions"
}
```

PUT
`/v1/fuel-transactions`

## [Update a Fuel Transaction](#update-a-fuel-transaction)

Update a fuel transaction.

Body parameters

`provider`

string

optional

Fuel provider key.

`provider_transaction_id`

string

optional

Provider transaction identifier.

`connection`

string

optional

Fuel provider connection public ID.

`vehicle`

string

optional

Vehicle public ID.

`driver`

string

optional

Driver public ID.

`order`

string

optional

Order public ID.

`fuel_report`

string

optional

Fuel report public ID.

`transaction_at`

timestamp

optional

Transaction timestamp.

`volume`

number

optional

Fuel volume.

`amount`

currency

optional

Transaction amount.

PUT
`/v1/fuel-transactions`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/fuel-transactions \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "sync_status": "reviewed"
}'
```

200

OK

```
{
  "id": "<string>",
  "object": "fuel_transactions"
}
```

DELETE
`/v1/fuel-transactions`

## [Delete a Fuel Transaction](#delete-a-fuel-transaction)

Delete a fuel transaction.

DELETE
`/v1/fuel-transactions`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/fuel-transactions \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "id": "<string>",
  "deleted": true
}
```

POST
`/v1/fuel-transactions/match-vehicle`

## [Match Fuel Transaction Vehicle](#match-fuel-transaction-vehicle)

Match this fuel transaction to a vehicle.

Body parameters

`vehicle`

string

optional

Vehicle public ID.

POST
`/v1/fuel-transactions/match-vehicle`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/fuel-transactions/match-vehicle \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "vehicle": "{{vehicle_id}}"
}'
```

200

OK

```
{
  "id": "<string>",
  "object": "fuel_transactions"
}
```

POST
`/v1/fuel-transactions/match-order`

## [Match Fuel Transaction Order](#match-fuel-transaction-order)

Match this fuel transaction to an order.

Body parameters

`order`

string

optional

Order public ID.

POST
`/v1/fuel-transactions/match-order`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/fuel-transactions/match-order \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "order": "{{order_id}}"
}'
```

200

OK

```
{
  "id": "<string>",
  "object": "fuel_transactions"
}
```

POST
`/v1/fuel-transactions/reprocess`

## [Reprocess Fuel Transaction](#reprocess-fuel-transaction)

Reprocess matching and fuel report generation for this fuel transaction.

POST
`/v1/fuel-transactions/reprocess`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/fuel-transactions/reprocess \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "id": "<string>",
  "object": "fuel_transactions"
}
```

POST
`/v1/fuel-transactions/review`

## [Review Fuel Transaction](#review-fuel-transaction)

Mark this fuel transaction as reviewed or ignored.

POST
`/v1/fuel-transactions/review`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/fuel-transactions/review \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "status": "reviewed"
}'
```

200

OK

```
{
  "id": "<string>",
  "object": "fuel_transactions"
}
```
