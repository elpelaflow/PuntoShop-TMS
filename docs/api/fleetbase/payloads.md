---
title: "Payloads"
url: https://fleetbase.io/docs/api/fleetbase/payloads
module: api
---

# Payloads

Payloads describe what an order is carrying and where it moves from pickup to dropoff. Use payload endpoints to manage shipment contents, payment details, and the entities attached to an order.

* [The Payload object](#the-payload-object)
* [Create a Payload

  POST
  `/v1/payloads`](#create-a-payload)
* [Retrieve a Payload

  GET
  `/v1/payloads/:id`](#retrieve-a-payload)
* [Query Payloads

  GET
  `/v1/payloads`](#query-payloads)
* [Update a Payload

  PUT
  `/v1/payloads/:id`](#update-a-payload)
* [Delete a Payload

  DELETE
  `/v1/payloads/:id`](#delete-a-payload)

## The Payload object

A payload describes what an order moves and where it moves through. It links pickup, dropoff, return, waypoints, entities, cash-on-delivery settings, and metadata.

Attributes

`id`

string

optional

Public payload identifier.

`current_waypoint`

string

optional

Public ID of the current waypoint, when one is set.

`pickup`

object

optional

Pickup place for the payload.

`dropoff`

object

optional

Dropoff place for the payload.

`return`

object

optional

Return place for the payload.

`waypoints`

array of objects

optional

Ordered waypoint resources for the payload.

`entities`

array of objects

optional

Entity resources attached to the payload.

`cod_amount`

currency

optional

Cash-on-delivery amount.

`cod_currency`

currency

optional

Three-letter currency code for cash-on-delivery.

`cod_payment_method`

string

optional

Cash-on-delivery payment method.

`payment_method`

string

optional

Payment method associated with the payload.

`meta`

object

optional

Additional payload metadata.

`updated_at`

timestamp

optional

Timestamp when the payload was last updated.

`created_at`

timestamp

optional

Timestamp when the payload was created.

The
Payload
object

```
{
  "id": "payload_x9Z2Lm8QpA",
  "current_waypoint": "place_1A2b3C4d5E",
  "pickup": {
    "id": "place_1A2b3C4d5E",
    "name": "Warehouse 7"
  },
  "dropoff": {
    "id": "place_9Z8y7X6w5V",
    "name": "Customer Dock"
  },
  "return": null,
  "waypoints": [],
  "entities": [],
  "cod_amount": null,
  "cod_currency": null,
  "cod_payment_method": null,
  "payment_method": null,
  "meta": {},
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/payloads`

## [Create a Payload](#create-a-payload)

Creates a payload containing route endpoints and optional entities. Provide either pickup/dropoff endpoints or a waypoint list, then attach entities as needed.

Body parameters

`pickup`

object

optional

Pickup place data, address string, or place ID for the payload.

`dropoff`

object

optional

Dropoff place data, address string, or place ID for the payload.

`return`

object

optional

Optional return place data, address string, or place ID for the payload.

`waypoints`

array of objects

optional

Ordered route stops for the payload.

`entities`

array of objects

optional

Entities, packages, or items attached to the payload.

`type`

string

required

Payload type. Required when creating a payload.

`provider`

string

optional

Provider identifier associated with the payload.

`cod_amount`

currency

optional

Cash-on-delivery amount.

`cod_currency`

currency

optional

Three-letter currency code for
`cod_amount`
. Required when
`cod_amount`
is supplied.

`cod_payment_method`

enum

optional

Cash-on-delivery payment method. Required when
`cod_amount`
is supplied. One of
`card`
,
`check`
,
`cash`
,
`bank_transfer`
.

`meta`

object

optional

Additional payload metadata.

POST
`/v1/payloads`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/payloads \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "pickup": {
    "street1": "10 Bayfront Avenue",
    "city": "Singapore",
    "postal_code": "018956",
    "country": "SG"
  },
  "dropoff": {
    "street1": "80 Mandai Lake Rd",
    "city": "Singapore",
    "postal_code": "729826",
    "country": "SG"
  },
  "type": "food_delivery"
}'
```

Other ways to call this

* Create a Payload With Multiple Waypoints

201

OK

```
{
  "id": "payload_oz5R9Z6",
  "current_waypoint": null,
  "pickup": null,
  "dropoff": null,
  "return": null,
  "waypoints": [],
  "entities": [],
  "cod_amount": null,
  "cod_currency": null,
  "cod_payment_method": null,
  "meta": [],
  "updated_at": "2023-12-27T09:40:21.000000Z",
  "created_at": "2023-12-27T09:40:21.000000Z"
}
```

GET
`/v1/payloads/:id`

## [Retrieve a Payload](#retrieve-a-payload)

Retrieve a Payload.

GET
`/v1/payloads/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/payloads/:id \
  -H "Authorization: Bearer flb_live_…"
```

GET
`/v1/payloads`

## [Query Payloads](#query-payloads)

Returns payloads for the current company. Use pagination and sort parameters to page through payload records.

Query parameters

`limit`

integer

optional

Maximum number of payloads to return.

`offset`

integer

optional

Number of payloads to skip before returning results.

`sort`

string

optional

Sort expression for the payload query.

GET
`/v1/payloads`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/payloads?limit=25&offset=0&sort=created_at \
  -H "Authorization: Bearer flb_live_…"
```

PUT
`/v1/payloads/:id`

## [Update a Payload](#update-a-payload)

Updates a payload's route endpoints, waypoints, entities, cash-on-delivery settings, or metadata. The response returns the updated payload with route and entity data.

Body parameters

`pickup`

object

optional

Replacement pickup place data, address string, or place ID for the payload.

`dropoff`

object

optional

Replacement dropoff place data, address string, or place ID for the payload.

`return`

object

optional

Replacement return place data, address string, or place ID for the payload.

`waypoints`

array of objects

optional

Replacement waypoint list. Sending route endpoint fields without waypoints removes existing waypoints.

`entities`

array of objects

optional

Replacement entities, packages, or items attached to the payload.

`type`

string

optional

Payload type.

`provider`

string

optional

Provider identifier associated with the payload.

`cod_amount`

currency

optional

Cash-on-delivery amount.

`cod_currency`

currency

optional

Three-letter currency code for
`cod_amount`
.

`cod_payment_method`

enum

optional

Cash-on-delivery payment method. One of
`card`
,
`check`
,
`cash`
,
`bank_transfer`
.

`meta`

object

optional

Additional payload metadata.

PUT
`/v1/payloads/:id`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/payloads/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
    "pickup": {
        "street1": "10 Bayfront Avenue",
        "city": "Singapore",
        "postal_code": "018956",
        "country": "SG"
    },
    "dropoff": {
        "street1": "80 Mandai Lake Rd",
        "city": "Singapore",
        "postal_code": "729826",
        "country": "SG"
    },
    "entities": [
        {
            "name": "UltraHD 4K Smart TV",
            "description": "65-inch high-definition smart TV with vibrant colors and a sleek design.",
            "currency": "USD",
            "price": 1200.00
        },
        {
            "name": "Bluetooth Wireless Headphones",
            "description": "Noise-cancelling, over-ear headphones with long-lasting battery life.",
            "currency": "USD",
            "price": 250.00
        },
        {
            "name": "Smart Fitness Watch",
            "description": "Water-resistant fitness watch with heart rate monitor and GPS tracking.",
            "currency": "USD",
            "price": 199.99
        }
    ]
}'
```

DELETE
`/v1/payloads/:id`

## [Delete a Payload](#delete-a-payload)

Delete a Payload.

DELETE
`/v1/payloads/:id`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/payloads/:id \
  -H "Authorization: Bearer flb_live_…"
```
