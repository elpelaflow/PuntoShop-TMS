---
title: "Parts"
url: https://fleetbase.io/docs/api/fleetbase/parts
module: api
---

# Parts

Parts represent stocked replacement components such as tires, filters, belts, electronics, and other inventory used for fleet maintenance.

* [The Part object](#the-part-object)
* [Create a Part

  POST
  `/v1/parts`](#create-a-part)
* [Query Parts

  GET
  `/v1/parts`](#query-parts)
* [Retrieve a Part

  GET
  `/v1/parts`](#retrieve-a-part)
* [Update a Part

  PUT
  `/v1/parts`](#update-a-part)
* [Delete a Part

  DELETE
  `/v1/parts`](#delete-a-part)

## The Part object

A part stores stock quantity, cost, supplier, warranty, asset association, and inventory status data.

Attributes

`id`

string

optional

Public part identifier.

`sku`

string

optional

Part SKU.

`name`

string

optional

Part name.

`quantity_on_hand`

integer

optional

Current stock quantity.

`unit_cost`

currency

optional

Unit cost.

`msrp`

currency

optional

Suggested retail price.

`vendor`

string

optional

Vendor public ID, when loaded.

`asset`

string

optional

Associated asset public ID, when loaded.

`is_in_stock`

boolean

optional

Whether quantity is above zero.

`meta`

object

optional

Additional part metadata.

The
Part
object

```
{
  "id": "part_8KqM3KpL2n",
  "sku": "FLT-OIL-001",
  "name": "Oil Filter",
  "quantity_on_hand": 24,
  "unit_cost": 1200,
  "currency": "USD",
  "status": "in_stock",
  "is_in_stock": true,
  "meta": {},
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/parts`

## [Create a Part](#create-a-part)

Create a part.

Body parameters

`sku`

string

optional

Part SKU. Unique per organization.

`name`

string

optional

Part name.

`quantity_on_hand`

integer

optional

Current stock quantity.

`unit_cost`

currency

optional

Unit cost.

`vendor`

string

optional

Vendor public ID.

`asset_type`

string

optional

Polymorphic resource type such as
`fleet-ops:vehicle`
or
`fleet-ops:equipment`
.

`asset`

string

optional

Public ID of the associated asset.

`specs`

object

optional

Part specification data.

`meta`

object

optional

Additional metadata.

POST
`/v1/parts`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/parts \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "sku": "FLT-OIL-{{$timestamp}}",
  "name": "Oil Filter",
  "quantity_on_hand": 24,
  "unit_cost": 1200,
  "currency": "USD",
  "status": "in_stock"
}'
```

201

OK

```
{
  "id": "<string>",
  "object": "parts"
}
```

GET
`/v1/parts`

## [Query Parts](#query-parts)

Query parts.

Query parameters

`query`

string

optional

Search query for parts.

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

`status`

string

optional

Filter by part status.

`manufacturer`

string

optional

Filter by manufacturer.

`vendor`

string

optional

Filter by vendor public ID or internal ID.

GET
`/v1/parts`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/parts \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "id": "<string>",
  "object": "parts"
}
```

GET
`/v1/parts`

## [Retrieve a Part](#retrieve-a-part)

Retrieve a part.

GET
`/v1/parts`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/parts \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "id": "<string>",
  "object": "parts"
}
```

PUT
`/v1/parts`

## [Update a Part](#update-a-part)

Update a part.

Body parameters

`sku`

string

optional

Part SKU.

`name`

string

optional

Part name.

`quantity_on_hand`

integer

optional

Current stock quantity.

`unit_cost`

currency

optional

Unit cost.

`vendor`

string

optional

Vendor public ID.

`asset_type`

string

optional

Polymorphic resource type such as
`fleet-ops:vehicle`
or
`fleet-ops:equipment`
.

`asset`

string

optional

Public ID of the associated asset.

`specs`

object

optional

Part specification data.

`meta`

object

optional

Additional metadata.

PUT
`/v1/parts`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/parts \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "quantity_on_hand": 18
}'
```

200

OK

```
{
  "id": "<string>",
  "object": "parts"
}
```

DELETE
`/v1/parts`

## [Delete a Part](#delete-a-part)

Delete a part.

DELETE
`/v1/parts`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/parts \
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
