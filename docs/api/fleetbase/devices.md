---
title: "Devices"
url: https://fleetbase.io/docs/api/fleetbase/devices
module: api
---

# Devices

Devices represent physical telematics or tracking hardware that can be attached to vehicles or other fleet resources.

* [The Device object](#the-device-object)
* [Create a Device

  POST
  `/v1/devices`](#create-a-device)
* [Query Devices

  GET
  `/v1/devices`](#query-devices)
* [Retrieve a Device

  GET
  `/v1/devices`](#retrieve-a-device)
* [Update a Device

  PUT
  `/v1/devices`](#update-a-device)
* [Delete a Device

  DELETE
  `/v1/devices`](#delete-a-device)
* [Attach Device

  POST
  `/v1/devices/attach`](#attach-device)
* [Detach Device

  POST
  `/v1/devices/detach`](#detach-device)

## The Device object

A device stores hardware identity, provider data, attachment state, telemetry status, and latest connectivity information.

Attributes

`id`

string

optional

Public device identifier.

`name`

string

optional

Device name.

`type`

string

optional

Device type.

`device_id`

string

optional

Provider or hardware device identifier.

`serial_number`

string

optional

Device serial number.

`telematic`

string

optional

Telematic public ID, when loaded.

`attachable`

string

optional

Attached resource public ID, when loaded.

`status`

string

optional

Device status.

`connection_status`

string

optional

Derived connection status.

`meta`

object

optional

Additional device metadata.

The
Device
object

```
{
  "id": "device_7YqM3KpL2n",
  "name": "OBD Tracker 12",
  "type": "obd",
  "device_id": "OBD-12",
  "serial_number": "SN-10001",
  "status": "active",
  "connection_status": "online",
  "attached_to_name": "ABC123",
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/devices`

## [Create a Device](#create-a-device)

Create a device.

Body parameters

`name`

string

optional

Device name.

`type`

string

optional

Device type.

`device_id`

string

optional

Provider or hardware device identifier.

`telematic`

string

optional

Telematic public ID.

`attachable_type`

string

optional

Attachable resource type, usually
`fleet-ops:vehicle`
.

`attachable`

string

optional

Attachable resource public ID.

`latitude`

number

optional

Last known latitude. Required with
`longitude`
.

`longitude`

number

optional

Last known longitude. Required with
`latitude`
.

`meta`

object

optional

Additional metadata.

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
  -d '{
  "name": "OBD Tracker 12",
  "type": "obd",
  "device_id": "OBD-12",
  "serial_number": "SN-10001",
  "status": "active"
}'
```

201

OK

```
{
  "id": "<string>",
  "object": "devices"
}
```

GET
`/v1/devices`

## [Query Devices](#query-devices)

Query devices.

Query parameters

`query`

string

optional

Search query for devices.

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

Filter by status.

`attachment_state`

string

optional

Filter by
`attached`
or
`unattached`
.

`vehicle`

string

optional

Filter by attached vehicle public ID.

`connection_status`

string

optional

Filter by connection status.

GET
`/v1/devices`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/devices \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "id": "<string>",
  "object": "devices"
}
```

GET
`/v1/devices`

## [Retrieve a Device](#retrieve-a-device)

Retrieve a device.

GET
`/v1/devices`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/devices \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "id": "<string>",
  "object": "devices"
}
```

PUT
`/v1/devices`

## [Update a Device](#update-a-device)

Update a device.

Body parameters

`name`

string

optional

Device name.

`type`

string

optional

Device type.

`device_id`

string

optional

Provider or hardware device identifier.

`telematic`

string

optional

Telematic public ID.

`attachable_type`

string

optional

Attachable resource type, usually
`fleet-ops:vehicle`
.

`attachable`

string

optional

Attachable resource public ID.

`latitude`

number

optional

Last known latitude. Required with
`longitude`
.

`longitude`

number

optional

Last known longitude. Required with
`latitude`
.

`meta`

object

optional

Additional metadata.

PUT
`/v1/devices`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/devices \
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
  "object": "devices"
}
```

DELETE
`/v1/devices`

## [Delete a Device](#delete-a-device)

Delete a device.

DELETE
`/v1/devices`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/devices \
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
`/v1/devices/attach`

## [Attach Device](#attach-device)

Attach this Device to a Vehicle or Trailer. The legacy
`vehicle`
field remains supported.

Body parameters

`vehicle`

string

optional

Legacy Vehicle public ID alias. Use
`attachable_type`
and
`attachable`
for new integrations.

`attachable_type`

enum

optional

Allowed resource type for the Device installation. One of
`fleet-ops:vehicle`
,
`fleet-ops:trailer`
.

`attachable`

string

optional

Vehicle or Trailer public ID.

POST
`/v1/devices/attach`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/devices/attach \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "attachable_type": "fleet-ops:vehicle",
  "attachable": "{{vehicle_id}}"
}'
```

200

OK

```
{
  "id": "<string>",
  "object": "devices"
}
```

POST
`/v1/devices/detach`

## [Detach Device](#detach-device)

Detach this device from its current resource.

POST
`/v1/devices/detach`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/devices/detach \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "id": "<string>",
  "object": "devices"
}
```
