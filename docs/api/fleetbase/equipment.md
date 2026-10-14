---
title: "Equipment"
url: https://fleetbase.io/docs/api/fleetbase/equipment
module: api
---

# Equipment

Equipment represents auxiliary fleet gear such as PPE, refrigeration units, tools, liftgates, ramps, containers, and other assignable operational equipment.

* [The Equipment object](#the-equipment-object)
* [Create Equipment

  POST
  `/v1/equipment`](#create-equipment)
* [Query Equipment

  GET
  `/v1/equipment`](#query-equipment)
* [Retrieve Equipment

  GET
  `/v1/equipment`](#retrieve-equipment)
* [Update Equipment

  PUT
  `/v1/equipment`](#update-equipment)
* [Delete Equipment

  DELETE
  `/v1/equipment`](#delete-equipment)
* [Attach Equipment

  POST
  `/v1/equipment/:id/attach`](#attach-equipment)
* [Detach Equipment

  POST
  `/v1/equipment/:id/detach`](#detach-equipment)

## The Equipment object

An equipment record stores identity, assignment, warranty, purchase, and status details for reusable fleet equipment.

Attributes

`id`

string

optional

Public equipment identifier.

`name`

string

optional

Equipment name.

`code`

string

optional

Internal equipment code.

`type`

string

optional

Equipment type.

`status`

string

optional

Equipment availability status.

`serial_number`

string

optional

Equipment serial number.

`manufacturer`

string

optional

Equipment manufacturer.

`model`

string

optional

Equipment model.

`equipable`

string

optional

Public ID of the assigned resource, when loaded.

`equipable_type`

string

optional

Public attachment type such as
`fleet-ops:vehicle`
or
`fleet-ops:trailer`
.

`equipable_id`

string

optional

Public ID of the attached Vehicle or Trailer.

`equipable_name`

string

optional

Display name of the attached Vehicle or Trailer.

`meta`

object

optional

Additional equipment metadata.

The
Equipment
object

```
{
  "id": "equipment_4Mnp8Qx2Vz",
  "name": "Liftgate LG-12",
  "code": "LG-12",
  "type": "liftgate",
  "status": "available",
  "serial_number": "LG120045",
  "manufacturer": "Maxon",
  "model": "BMR",
  "currency": "USD",
  "is_equipped": false,
  "meta": {},
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/equipment`

## [Create Equipment](#create-equipment)

Create equipment.

Body parameters

`name`

string

optional

Equipment name.

`code`

string

optional

Internal equipment code.

`type`

string

optional

Equipment type.

`status`

string

optional

Equipment status.

`warranty`

string

optional

Warranty public ID.

`photo`

string

optional

File public ID for the equipment photo.

`equipable_type`

string

optional

Polymorphic resource type such as
`fleet-ops:vehicle`
,
`fleet-ops:trailer`
, or the existing
`fleet-ops:driver`
compatibility type.

`equipable`

string

optional

Public ID of the resource to assign equipment to.

`meta`

object

optional

Additional metadata.

POST
`/v1/equipment`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/equipment \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Liftgate LG-12",
  "code": "LG-12",
  "type": "liftgate",
  "status": "available",
  "serial_number": "LG120045",
  "manufacturer": "Maxon",
  "model": "BMR",
  "currency": "USD"
}'
```

201

OK

```
{
  "id": "<string>",
  "object": "equipment"
}
```

GET
`/v1/equipment`

## [Query Equipment](#query-equipment)

Query equipment.

Query parameters

`query`

string

optional

Search query for equipment.

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

`type`

string

optional

Filter by equipment type.

`status`

string

optional

Filter by equipment status.

`manufacturer`

string

optional

Filter by manufacturer.

GET
`/v1/equipment`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/equipment \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "id": "<string>",
  "object": "equipment"
}
```

GET
`/v1/equipment`

## [Retrieve Equipment](#retrieve-equipment)

Retrieve equipment.

GET
`/v1/equipment`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/equipment \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "id": "<string>",
  "object": "equipment"
}
```

PUT
`/v1/equipment`

## [Update Equipment](#update-equipment)

Update equipment.

Body parameters

`name`

string

optional

Equipment name.

`code`

string

optional

Internal equipment code.

`type`

string

optional

Equipment type.

`status`

string

optional

Equipment status.

`warranty`

string

optional

Warranty public ID.

`photo`

string

optional

File public ID for the equipment photo.

`equipable_type`

string

optional

Polymorphic resource type such as
`fleet-ops:vehicle`
,
`fleet-ops:trailer`
, or the existing
`fleet-ops:driver`
compatibility type.

`equipable`

string

optional

Public ID of the resource to assign equipment to.

`meta`

object

optional

Additional metadata.

PUT
`/v1/equipment`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/equipment \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "status": "maintenance"
}'
```

200

OK

```
{
  "id": "<string>",
  "object": "equipment"
}
```

DELETE
`/v1/equipment`

## [Delete Equipment](#delete-equipment)

Delete equipment.

DELETE
`/v1/equipment`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/equipment \
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
`/v1/equipment/:id/attach`

## [Attach Equipment](#attach-equipment)

Attach or atomically reassign Equipment to a Vehicle or Trailer.

Body parameters

`attachable_type`

enum

optional

Allowed target resource type. One of
`fleet-ops:vehicle`
,
`fleet-ops:trailer`
.

`attachable`

string

optional

Vehicle or Trailer public ID.

POST
`/v1/equipment/:id/attach`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/equipment/:id/attach \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"attachable_type":"fleet-ops:vehicle","attachable":"{{vehicle_id}}"}'
```

POST
`/v1/equipment/:id/detach`

## [Detach Equipment](#detach-equipment)

Detach Equipment from its current Vehicle or Trailer.

POST
`/v1/equipment/:id/detach`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/equipment/:id/detach \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```
