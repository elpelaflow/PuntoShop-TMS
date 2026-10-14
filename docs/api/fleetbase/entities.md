---
title: "Entities"
url: https://fleetbase.io/docs/api/fleetbase/entities
module: api
---

# Entities

Entities describe the individual goods, parcels, or items carried inside a payload. Use entities to capture dimensions, weight, declared value, tracking metadata, and customer ownership for shipment contents.

* [The Entity object](#the-entity-object)
* [Create an Entity

  POST
  `/v1/entities`](#create-an-entity)
* [Query Entities

  GET
  `/v1/entities`](#query-entities)
* [Retrieve an Entity

  GET
  `/v1/entities/:id`](#retrieve-an-entity)
* [Update a Entity

  PUT
  `/v1/entities/:id`](#update-a-entity)
* [Delete a Entity

  DELETE
  `/v1/entities/:id`](#delete-a-entity)

## The Entity object

An entity represents an item, parcel, package, or other physical unit attached to a payload. It can include dimensions, weight, pricing, destination, customer, tracking, and metadata.

Attributes

`id`

string

optional

Public entity identifier.

`internal_id`

string

optional

Optional internal identifier for the entity.

`name`

string

optional

Display name for the entity.

`type`

string

optional

Entity type.

`payload`

string

optional

Public ID of the payload attached to the entity.

`destination`

string

optional

Public ID of the destination place.

`customer`

object

optional

Customer contact or vendor associated with the entity.

`supplier`

object

optional

Supplier associated with the entity, when loaded.

`tracking_number`

object

optional

Tracking number resource generated for the entity.

`description`

string

optional

Human-readable entity description.

`photo_url`

string

optional

Photo URL associated with the entity.

`length`

number

optional

Entity length.

`width`

number

optional

Entity width.

`height`

number

optional

Entity height.

`dimensions_unit`

string

optional

Unit for length, width, and height.

`weight`

number

optional

Entity weight.

`weight_unit`

string

optional

Unit for weight.

`declared_value`

currency

optional

Declared value of the entity.

`price`

currency

optional

Price of the entity.

`sale_price`

currency

optional

Sale price of the entity.

`sku`

string

optional

Stock keeping unit for the entity.

`currency`

currency

optional

Three-letter currency code for monetary fields.

`meta`

object

optional

Additional entity metadata.

`updated_at`

timestamp

optional

Timestamp when the entity was last updated.

`created_at`

timestamp

optional

Timestamp when the entity was created.

The
Entity
object

```
{
  "id": "entity_4Mnp8Qx2Vz",
  "internal_id": "ENTITY001",
  "name": "Sample Entity",
  "type": "parcel",
  "payload": "payload_x9Z2Lm8QpA",
  "destination": "place_9Z8y7X6w5V",
  "customer": null,
  "tracking_number": {
    "id": "tracking_3Nf8Qw2YxM",
    "tracking_number": "FB-ENTITY-1001"
  },
  "description": "Sample description",
  "photo_url": null,
  "length": 10,
  "width": 5,
  "height": 8,
  "dimensions_unit": "mm",
  "weight": 2.5,
  "weight_unit": "kg",
  "declared_value": 1500,
  "price": 1200,
  "sale_price": 900,
  "sku": "SKU123",
  "currency": "USD",
  "meta": {},
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/entities`

## [Create an Entity](#create-an-entity)

Creates an entity such as a parcel, package, or item. Attach it to a payload and optionally set a destination or waypoint within that payload route.

Body parameters

`name`

string

required

Display name for the entity.

`type`

string

required

Entity type, such as
`parcel`
,
`package`
, or another application-defined type.

`internal_id`

string

optional

Optional internal identifier for the entity.

`description`

string

optional

Human-readable entity description.

`payload`

string

optional

Payload ID to attach the entity to. Required when
`destination`
or
`waypoint`
is supplied.

`destination`

string

optional

Place ID within the payload route to use as the entity destination.

`waypoint`

string

optional

Alias for
`destination`
; resolves a place within the payload route.

`customer`

string

optional

Contact or vendor ID to assign as the entity customer.

`driver`

string

optional

Driver ID to associate with the entity.

`email`

string

optional

Contact email associated with the entity.

`weight`

number

optional

Entity weight.

`weight_unit`

enum

optional

Unit for
`weight`
. Required when
`weight`
is supplied. One of
`g`
,
`oz`
,
`lb`
,
`kg`
.

`length`

number

optional

Entity length.

`width`

number

optional

Entity width.

`height`

number

optional

Entity height.

`dimensions_unit`

enum

optional

Unit for length, width, and height. Required when dimensions are supplied. One of
`cm`
,
`in`
,
`ft`
,
`mm`
,
`m`
,
`yd`
.

`declared_value`

currency

optional

Declared value of the entity.

`price`

currency

optional

Price of the entity.

`sale_price`

currency

optional

Sale price of the entity.

`sku`

string

optional

Stock keeping unit for the entity.

`currency`

currency

optional

Three-letter currency code for monetary fields.

`meta`

object

optional

Additional entity metadata.

POST
`/v1/entities`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/entities \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "SampleEntity",
    "type": "parcel",
    "payload": "{{payload_id}}",
    "customer": "ACustomer",
    "internal_id": "ENTITY001",
    "description": "Sample description",
    "meta": {
        "warehouse_bin": "1",
        "warehouse_rack": "3",
        "warehouse_section": "4"
    },
    "weight": 2.5,
    "weight_unit": "kg",
    "length": 10,
    "width": 5,
    "height": 8,
    "dimensions_unit": "mm",
    "declared_value": 1500,
    "price": 1200,
    "sale_price": 900,
    "sku": "SKU123",
    "currency": "USD"
}'
```

200

OK

```
{}
```

GET
`/v1/entities`

## [Query Entities](#query-entities)

Returns entities for the current company. Use filters such as
`type`
,
`payload`
, or
`destination`
to narrow the result set.

Query parameters

`limit`

integer

optional

Maximum number of entities to return.

`offset`

integer

optional

Number of entities to skip before returning results.

`sort`

string

optional

Sort expression for the entity query.

`type`

string

optional

Filters entities by entity type.

`payload`

string

optional

Filters entities by payload ID.

`destination`

string

optional

Filters entities by destination place ID.

GET
`/v1/entities`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/entities?limit=25&offset=0&sort=created_at&type=parcel \
  -H "Authorization: Bearer flb_live_…"
```

GET
`/v1/entities/:id`

## [Retrieve an Entity](#retrieve-an-entity)

Retrieve an Entity.

GET
`/v1/entities/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/entities/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "id": "<string>",
  "payload": "<string>",
  "tracking_number": "<string>",
  "customer": "<string>",
  "internal_id": "<string>",
  "name": "<string>",
  "type": "<string>",
  "description": "<string>",
  "currency": "<string>",
  "weight": "<number>",
  "weight_unit": "<string>",
  "length": "<number>",
  "width": "<number>",
  "height": "<number>",
  "dimensions_unit": "<string>",
  "declared_value": "<number>",
  "sku": "<string>",
  "price": "<number>",
  "sale_price": "<number>",
  "meta": [],
  "updated_at": "<string>",
  "created_at": "<string>"
}
```

PUT
`/v1/entities/:id`

## [Update a Entity](#update-a-entity)

Updates an entity's descriptive fields, payload assignment, destination, dimensions, weight, pricing, or metadata.

Body parameters

`name`

string

optional

Display name for the entity.

`type`

string

optional

Entity type.

`internal_id`

string

optional

Optional internal identifier for the entity.

`description`

string

optional

Human-readable entity description.

`payload`

string

optional

Payload ID to attach the entity to.

`destination`

string

optional

Place ID within the payload route to use as the entity destination.

`waypoint`

string

optional

Alias for
`destination`
; resolves a place within the payload route.

`customer`

string

optional

Contact or vendor ID to assign as the entity customer.

`driver`

string

optional

Driver ID to associate with the entity.

`weight`

number

optional

Entity weight.

`weight_unit`

enum

optional

Unit for
`weight`
. One of
`g`
,
`oz`
,
`lb`
,
`kg`
.

`length`

number

optional

Entity length.

`width`

number

optional

Entity width.

`height`

number

optional

Entity height.

`dimensions_unit`

enum

optional

Unit for length, width, and height. One of
`cm`
,
`in`
,
`ft`
,
`mm`
,
`m`
,
`yd`
.

`declared_value`

currency

optional

Declared value of the entity.

`price`

currency

optional

Price of the entity.

`sale_price`

currency

optional

Sale price of the entity.

`sku`

string

optional

Stock keeping unit for the entity.

`currency`

currency

optional

Three-letter currency code for monetary fields.

`meta`

object

optional

Additional entity metadata.

PUT
`/v1/entities/:id`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/entities/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "internal_id": "ENTITY001-1",
    "description": "New entity description",
    "destination": "",
    "sku": "SKUABC123",
    "currency": "SGD"
}'
```

200

OK

```
{}
```

DELETE
`/v1/entities/:id`

## [Delete a Entity](#delete-a-entity)

Delete an Entity.

DELETE
`/v1/entities/:id`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/entities/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "deleted": "<boolean>",
  "id": "<string>"
}
```
