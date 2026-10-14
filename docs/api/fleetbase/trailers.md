---
title: "Trailers"
url: https://fleetbase.io/docs/api/fleetbase/trailers
module: api
---

# Trailers

First-class towed fleet assets with independent identity, lifecycle, maintenance, equipment, towing connections, and telematics.

* [The Trailer object](#the-trailer-object)
* [Create a Trailer

  POST
  `/v1/trailers`](#create-a-trailer)
* [Query Trailers

  GET
  `/v1/trailers`](#query-trailers)
* [Retrieve a Trailer

  GET
  `/v1/trailers/:id`](#retrieve-a-trailer)
* [Update a Trailer

  PUT
  `/v1/trailers/:id`](#update-a-trailer)
* [Attach Trailer to Vehicle

  POST
  `/v1/trailers/:id/attach`](#attach-trailer-to-vehicle)
* [List Trailer Connections

  GET
  `/v1/trailers/:id/connections`](#list-trailer-connections)
* [List Vehicle Trailers

  GET
  `/v1/vehicles/:id/trailers`](#list-vehicle-trailers)
* [Create Trailer Equipment

  POST
  `/v1/equipment`](#create-trailer-equipment)
* [Attach Equipment to Trailer

  POST
  `/v1/equipment/:id/attach`](#attach-equipment-to-trailer)
* [Verify Trailer Equipment

  GET
  `/v1/trailers/:id`](#verify-trailer-equipment)
* [Reattach Equipment to Vehicle

  POST
  `/v1/equipment/:id/attach`](#reattach-equipment-to-vehicle)
* [Create Trailer Device

  POST
  `/v1/devices`](#create-trailer-device)
* [Attach Device to Trailer

  POST
  `/v1/devices/:id/attach`](#attach-device-to-trailer)
* [Track Trailer

  PATCH
  `/v1/trailers/:id/track`](#track-trailer)
* [Detach Trailer Attachments

  POST
  `/v1/devices/:id/detach`](#detach-trailer-attachments)
* [Detach Trailer Equipment

  POST
  `/v1/equipment/:id/detach`](#detach-trailer-equipment)
* [Delete Trailer Device

  DELETE
  `/v1/devices/:id`](#delete-trailer-device)
* [Delete Trailer Equipment

  DELETE
  `/v1/equipment/:id`](#delete-trailer-equipment)
* [Detach Trailer from Vehicle

  POST
  `/v1/trailers/:id/detach`](#detach-trailer-from-vehicle)
* [Verify Detached Connection History

  GET
  `/v1/trailers/:id/connections`](#verify-detached-connection-history)
* [Delete a Trailer

  DELETE
  `/v1/trailers/:id`](#delete-a-trailer)

## The Trailer object

A first-class Trailer resource stored as an independently managed fleet asset.

Attributes

`id`

string

optional

Public Trailer identifier with the
`trailer_`
prefix.

`name`

string

optional

Trailer display name.

`code`

string

optional

Company-scoped fleet code.

`type`

string

optional

Stable Trailer type value.

`status`

string

optional

Lifecycle state independent of attachment and connectivity.

`attachment_state`

string

optional

Derived attached or detached state.

`connectivity_status`

string

optional

Derived telemetry connectivity state.

`category_id`

string

optional

Public ID of the assigned Category

`vendor_id`

string

optional

Public ID of the Vendor

`warranty_id`

string

optional

Public ID of the Warranty

`photo_id`

string

optional

Public ID of the photo File

`vehicle_id`

string

optional

Public ID of the current towing Vehicle

`current_vehicle`

object

optional

Current towing Vehicle public identity when attached.

`current_connection`

object

optional

Effective-dated current towing connection.

`location`

object

optional

Latest direct Trailer coordinates.

`telematics`

object

optional

Normalized latest telemetry snapshot and provenance

`equipment`

array

optional

Equipment currently attached to the Trailer.

`devices`

array

optional

Devices currently attached to the Trailer.

`connections`

array

optional

Effective-dated towing connection history

`devices_count`

integer

optional

Attached device count.

`equipment_count`

integer

optional

Attached equipment count.

`created_at`

timestamp

optional

Creation timestamp.

`updated_at`

timestamp

optional

Last update timestamp.

The
Trailer
object

```
{
  "id": "trailer_7YqM3KpL2n",
  "name": "Reefer 12",
  "code": "TRL-0012",
  "type": "reefer",
  "status": "available",
  "plate_number": "TR-1200",
  "attachment_state": "detached",
  "connectivity_status": "never_connected",
  "online": null,
  "devices_count": 0,
  "equipment_count": 0
}
```

POST
`/v1/trailers`

## [Create a Trailer](#create-a-trailer)

Create a first-class Trailer for the authenticated company.

Body parameters

`name`

string

required

Trailer display name.

`code`

string

optional

Company-scoped fleet code.

`type`

enum

optional

Stable Trailer type. One of
`dry_van`
,
`reefer`
,
`flatbed`
,
`step_deck`
,
`lowboy`
,
`tanker`
,
`bulk`
,
`dump`
,
`chassis`
,
`curtain_side`
,
`car_carrier`
,
`livestock`
,
`logging`
,
`dolly`
,
`specialty`
,
`other`
.

`status`

enum

optional

Lifecycle status. One of
`available`
,
`in_use`
,
`maintenance`
,
`out_of_service`
,
`retired`
.

`vin`

string

optional

Trailer VIN.

`plate_number`

string

optional

Registration plate.

`payload_capacity`

number

optional

Payload capacity in the selected measurement system.

`axle_count`

integer

optional

Axle count.

`refrigerated`

boolean

optional

Whether the Trailer is temperature controlled.

`measurement_system`

enum

optional

Measurement system for typed values. One of
`metric`
,
`imperial`
.

POST
`/v1/trailers`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/trailers \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"name":"Postman Reefer","code":"POSTMAN-TRL-001","type":"reefer","status":"available","plate_number":"PM-TR-001","payload_capacity":20000,"axle_count":2,"refrigerated":true,"measurement_system":"metric"}'
```

GET
`/v1/trailers`

## [Query Trailers](#query-trailers)

Query and filter company-scoped Trailers.

Query parameters

`query`

string

optional

Search Trailer identity fields.

`type`

string

optional

Filter by Trailer type.

`status`

string

optional

Filter by lifecycle status.

`attachment_state`

enum

optional

Filter by derived towing state. One of
`attached`
,
`detached`
.

`connectivity_status`

enum

optional

Filter by telemetry connectivity. One of
`online`
,
`recently_offline`
,
`offline`
,
`never_connected`
.

`vehicle`

string

optional

Filter by attached Vehicle public ID.

`vendor`

string

optional

Filter by Vendor public ID.

`category`

string

optional

Filter by Category public ID.

`refrigerated`

boolean

optional

Filter temperature-controlled Trailers.

`with`

string

optional

Comma-separated expansions: category, vendor, warranty, photo, positions.

`limit`

integer

optional

Page size.

`page`

integer

optional

Page number.

`sort`

string

optional

Sort expression.

GET
`/v1/trailers`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/trailers?query=Postman%20Reefer&limit=25&sort=-created_at \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

GET
`/v1/trailers/:id`

## [Retrieve a Trailer](#retrieve-a-trailer)

Retrieve one Trailer by public ID.

GET
`/v1/trailers/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/trailers/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

PUT
`/v1/trailers/:id`

## [Update a Trailer](#update-a-trailer)

Update a Trailer without allowing its asset discriminator to change.

Body parameters

`name`

string

optional

Updated display name.

`status`

enum

optional

Lifecycle status. One of
`available`
,
`in_use`
,
`maintenance`
,
`out_of_service`
,
`retired`
.

`type`

string

optional

Stable Trailer type.

`plate_number`

string

optional

Registration plate.

`payload_capacity`

number

optional

Payload capacity.

PUT
`/v1/trailers/:id`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/trailers/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"name":"Postman Reefer Updated","status":"in_use","payload_capacity":21000}'
```

POST
`/v1/trailers/:id/attach`

## [Attach Trailer to Vehicle](#attach-trailer-to-vehicle)

Attach a detached Trailer to a Vehicle. Repeating the same attachment is idempotent; another active Vehicle returns 409.

Body parameters

`vehicle`

string

required

Vehicle public or documented internal ID.

`connected_at`

timestamp

optional

Effective connection time.

`source`

string

optional

Connection source such as manual.

`position`

integer

optional

Position in a multi-Trailer combination.

POST
`/v1/trailers/:id/attach`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/trailers/:id/attach \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"vehicle":"{{vehicle_id}}","source":"manual","position":1}'
```

GET
`/v1/trailers/:id/connections`

## [List Trailer Connections](#list-trailer-connections)

List complete effective-dated towing history for a Trailer.

GET
`/v1/trailers/:id/connections`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/trailers/:id/connections \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

GET
`/v1/vehicles/:id/trailers`

## [List Vehicle Trailers](#list-vehicle-trailers)

List currently attached Trailers for a Vehicle.

GET
`/v1/vehicles/:id/trailers`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/vehicles/:id/trailers \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

POST
`/v1/equipment`

## [Create Trailer Equipment](#create-trailer-equipment)

Create lifecycle Equipment that will be attached to the Trailer and cleaned up by this folder.

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
  -H "Accept: application/json" \
  -d '{"name":"Postman Trailer Sensor Bracket","code":"POSTMAN-TRL-EQ","type":"tool","status":"available"}'
```

POST
`/v1/equipment/:id/attach`

## [Attach Equipment to Trailer](#attach-equipment-to-trailer)

Attach Equipment to a Trailer using the polymorphic public attachment contract.

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
  -d '{"attachable_type":"fleet-ops:trailer","attachable":"{{trailer_id}}"}'
```

GET
`/v1/trailers/:id`

## [Verify Trailer Equipment](#verify-trailer-equipment)

Verify the Trailer representation exposes attached Equipment.

GET
`/v1/trailers/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/trailers/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

POST
`/v1/equipment/:id/attach`

## [Reattach Equipment to Vehicle](#reattach-equipment-to-vehicle)

Atomically reassign the lifecycle Equipment from Trailer to Vehicle.

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
`/v1/devices`

## [Create Trailer Device](#create-trailer-device)

Create a lifecycle telematics Device that will be attached to the Trailer and cleaned up by this folder.

POST
`/v1/devices`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/devices \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"name":"Postman Trailer Tracker","device_id":"POSTMAN-TRL-TRACKER","type":"gps","provider":"manual"}'
```

POST
`/v1/devices/:id/attach`

## [Attach Device to Trailer](#attach-device-to-trailer)

Attach a Device to a Trailer while preserving the legacy Vehicle attachment alias.

POST
`/v1/devices/:id/attach`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/devices/:id/attach \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"attachable_type":"fleet-ops:trailer","attachable":"{{trailer_id}}"}'
```

PATCH
`/v1/trailers/:id/track`

## [Track Trailer](#track-trailer)

Record a Trailer observation and create a Position.

Body parameters

`latitude`

number

required

Observed latitude.

`longitude`

number

required

Observed longitude.

`observed_at`

timestamp

optional

Source observation time used for stale-event protection.

`speed`

number

optional

Observed speed.

`heading`

number

optional

Observed heading.

`altitude`

number

optional

Observed altitude.

`odometer`

number

optional

Hubometer or odometer reading.

PATCH
`/v1/trailers/:id/track`

curl

JavaScript

PHP

Python

```
curl -X PATCH https://api.fleetbase.io/v1/trailers/:id/track \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"latitude":40.7484,"longitude":-73.9857,"speed":35,"heading":90}'
```

POST
`/v1/devices/:id/detach`

## [Detach Trailer Attachments](#detach-trailer-attachments)

Detach the lifecycle Device. Equipment is detached in the following request.

POST
`/v1/devices/:id/detach`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/devices/:id/detach \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

POST
`/v1/equipment/:id/detach`

## [Detach Trailer Equipment](#detach-trailer-equipment)

Detach lifecycle Equipment from its current Vehicle before cleanup.

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

DELETE
`/v1/devices/:id`

## [Delete Trailer Device](#delete-trailer-device)

Delete the lifecycle Device after detaching it.

DELETE
`/v1/devices/:id`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/devices/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

DELETE
`/v1/equipment/:id`

## [Delete Trailer Equipment](#delete-trailer-equipment)

Delete the lifecycle Equipment after detaching it.

DELETE
`/v1/equipment/:id`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/equipment/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

POST
`/v1/trailers/:id/detach`

## [Detach Trailer from Vehicle](#detach-trailer-from-vehicle)

End the active towing connection while retaining history. Repeating detach is idempotent.

POST
`/v1/trailers/:id/detach`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/trailers/:id/detach \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"notes":"Postman lifecycle detach"}'
```

GET
`/v1/trailers/:id/connections`

## [Verify Detached Connection History](#verify-detached-connection-history)

Verify completed history remains after the current towing connection ends.

GET
`/v1/trailers/:id/connections`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/trailers/:id/connections \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

DELETE
`/v1/trailers/:id`

## [Delete a Trailer](#delete-a-trailer)

Soft-delete a detached Trailer.

DELETE
`/v1/trailers/:id`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/trailers/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```
