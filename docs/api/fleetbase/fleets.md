---
title: "Fleets"
url: https://fleetbase.io/docs/api/fleetbase/fleets
module: api
---

# Fleets

Fleets group vehicles and drivers under an operating unit. Use fleets to organize capacity by team, region, or service area before assigning resources to orders.
Fleets can be nested: sending `parent\_fleet` on create or update makes a fleet a subfleet of another. A fleet may not be its own parent, and may not be moved beneath one of its own descendants.
Membership is managed with four endpoints that all share one response shape:
```
POST /v1/fleets/{fleet}/vehicles/{vehicle}
DELETE /v1/fleets/{fleet}/vehicles/{vehicle}
POST /v1/fleets/{fleet}/drivers/{driver}
DELETE /v1/fleets/{fleet}/drivers/{driver}
```
```json
{ "fleet": "fleet\_123", "vehicle": "vehicle\_123", "assigned": true }
```
Every parameter is a public ID. Assignment is idempotent, removal is a safe no-op, removing a membership never deletes the driver or vehicle, and neither operation changes a driver's current vehicle or its membership of any other fleet.

* [The Fleet object](#the-fleet-object)
* [Create a Fleet

  POST
  `/v1/fleets`](#create-a-fleet)
* [Create a Subfleet

  POST
  `/v1/fleets`](#create-a-subfleet)
* [Create a Fleet Vehicle

  POST
  `/v1/vehicles`](#create-a-fleet-vehicle)
* [Create a Fleet Driver

  POST
  `/v1/drivers`](#create-a-fleet-driver)
* [Query Fleets

  GET
  `/v1/fleets`](#query-fleets)
* [Retrieve a Fleet

  GET
  `/v1/fleets/:id`](#retrieve-a-fleet)
* [Assign a Vehicle to a Fleet

  POST
  `/v1/fleets/:id/vehicles/:vehicle`](#assign-a-vehicle-to-a-fleet)
* [Reassign a Vehicle to a Fleet

  POST
  `/v1/fleets/:id/vehicles/:vehicle`](#reassign-a-vehicle-to-a-fleet)
* [Assign a Driver to a Fleet

  POST
  `/v1/fleets/:id/drivers/:driver`](#assign-a-driver-to-a-fleet)
* [Reassign a Driver to a Fleet

  POST
  `/v1/fleets/:id/drivers/:driver`](#reassign-a-driver-to-a-fleet)
* [Update a Fleet

  PUT
  `/v1/fleets/:id`](#update-a-fleet)
* [Remove a Vehicle from a Fleet

  DELETE
  `/v1/fleets/:id/vehicles/:vehicle`](#remove-a-vehicle-from-a-fleet)
* [Remove a Vehicle from a Fleet Again

  DELETE
  `/v1/fleets/:id/vehicles/:vehicle`](#remove-a-vehicle-from-a-fleet-again)
* [Remove a Driver from a Fleet

  DELETE
  `/v1/fleets/:id/drivers/:driver`](#remove-a-driver-from-a-fleet)
* [Remove a Driver from a Fleet Again

  DELETE
  `/v1/fleets/:id/drivers/:driver`](#remove-a-driver-from-a-fleet-again)
* [Delete a Fleet Vehicle

  DELETE
  `/v1/vehicles/:id`](#delete-a-fleet-vehicle)
* [Delete a Fleet Driver

  DELETE
  `/v1/drivers/:id`](#delete-a-fleet-driver)
* [Delete a Subfleet

  DELETE
  `/v1/fleets/:id`](#delete-a-subfleet)
* [Delete a Fleet

  DELETE
  `/v1/fleets/:id`](#delete-a-fleet)

## The Fleet object

A fleet groups drivers and vehicles for operational assignment. Fleets can be linked to a service area, a zone, a vendor and a parent fleet, and can themselves hold subfleets, drivers and vehicles.
Each relationship appears twice, and the two are separate keys. `<name>\_id` is the related resource's public ID and is always present. `<name>` is the nested object and is returned only when the relationship was asked for through `?with=`; it is never a string. Internal uuid columns are never part of the public contract.

Attributes

`id`

string

optional

Public fleet identifier.

`name`

string

optional

Fleet display name.

`color`

string

optional

Display colour for the fleet.

`task`

string

optional

Task associated with the fleet.

`status`

string

optional

Fleet status.

`photo_url`

string

optional

URL of the fleet image, or the default fleet image when none is set.

`service_area_id`

string

optional

Public ID of the assigned service area, or
`null`
. Always present.

`zone_id`

string

optional

Public ID of the assigned zone, or
`null`
. Always present.

`vendor_id`

string

optional

Public ID of the assigned vendor, or
`null`
. Always present.

`parent_fleet_id`

string

optional

Public ID of the parent fleet, or
`null`
for a root fleet. Always present.

`photo_id`

string

optional

Public ID of the fleet image file, or
`null`
. Always present.

`service_area`

object

optional

The assigned service area, returned only when requested through
`with=service_area`
. Never a string — read
`service_area_id`
for the identifier.

`zone`

object

optional

The assigned zone, returned only when requested through
`with=zone`
.

`vendor`

object

optional

The assigned vendor, returned only when requested through
`with=vendor`
.

`parent_fleet`

object

optional

The parent fleet, returned only when requested through
`with=parent_fleet`
.

`photo`

object

optional

The fleet image file, returned only when requested through
`with=photo`
.

`subfleets`

array of objects

optional

Child fleets, when requested through
`with=subfleets`
.

`drivers`

array of objects

optional

Drivers assigned to the fleet, when requested through
`with=drivers`
.

`vehicles`

array of objects

optional

Vehicles assigned to the fleet, when requested through
`with=vehicles`
.

`updated_at`

timestamp

optional

Timestamp when the fleet was last updated.

`created_at`

timestamp

optional

Timestamp when the fleet was created.

The
Fleet
object

```
{
  "id": "fleet_4Mnp8Qx2Vz",
  "name": "Haulers",
  "color": "#2563EB",
  "task": "Long haul distribution",
  "status": "active",
  "photo_url": "https://s3.ap-northeast-2.amazonaws.com/fleetbase/public/default-fleet.png",
  "service_area_id": "service_area_9Kp2Vx4Qm1",
  "zone_id": null,
  "vendor_id": null,
  "parent_fleet_id": null,
  "photo_id": null,
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/fleets`

## [Create a Fleet](#create-a-fleet)

Creates a fleet for grouping drivers and vehicles.

Every safe fleet field is accepted: name, colour, task, status, and the service area, zone, vendor and parent fleet relationships. Relationships are given as public IDs (
`service_area_...`
,
`zone_...`
,
`vendor_...`
,
`fleet_...`
) and are resolved inside the authenticated organization — a public ID belonging to another organization is rejected exactly as a non-existent one is.

Omitting
`parent_fleet`
creates a root fleet. This request creates the parent used by
**Create a Subfleet**
.

Body parameters

`name`

string

required

Fleet display name.

`color`

string

optional

Display colour for the fleet, for example a hex value such as
`#2563EB`
.

`task`

string

optional

Free-text description of what the fleet is used for.

`status`

string

optional

Fleet status. The console offers
`active`
,
`disabled`
and
`decommissioned`
; the field is not a closed enum, so any short status string an integration already uses is accepted.

`service_area`

string

optional

Service area public ID (
`service_area_...`
) to assign to the fleet. Must belong to the authenticated organization.

`zone`

string

optional

Zone public ID (
`zone_...`
) to assign to the fleet. Must belong to the authenticated organization.

`vendor`

string

optional

Vendor public ID (
`vendor_...`
) to assign to the fleet. Must belong to the authenticated organization.

`parent_fleet`

string

optional

Parent fleet public ID (
`fleet_...`
), which makes the new fleet a subfleet. Omit it to create a root fleet. Must belong to the authenticated organization.

`photo`

string

optional

File public ID (
`file_...`
) to use as the fleet image.

POST
`/v1/fleets`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/fleets \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "Haulers",
    "color": "#2563EB",
    "task": "Long haul distribution",
    "status": "active",
    "service_area": "{{service_area_id}}"
}'
```

Other ways to call this

* OK

200

OK

```
{
  "id": "fleet_4Mnp8Qx2Vz",
  "name": "Haulers",
  "color": "#2563EB",
  "task": "Long haul distribution",
  "status": "active",
  "photo_url": "https://s3.ap-northeast-2.amazonaws.com/fleetbase/public/default-fleet.png",
  "service_area_id": "service_area_9Kp2Vx4Qm1",
  "zone_id": null,
  "vendor_id": null,
  "parent_fleet_id": null,
  "photo_id": null,
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/fleets`

## [Create a Subfleet](#create-a-subfleet)

Creates a fleet nested beneath another fleet by sending the parent's public ID in
`parent_fleet`
.

Hierarchies are validated on write: a fleet cannot be its own parent, and cannot be moved beneath one of its own subfleets. Both are answered with
`422`
. A parent belonging to another organization is answered with
`404`
, the same as a parent that does not exist.

Body parameters

`name`

string

required

Subfleet display name.

`parent_fleet`

string

required

Public ID (
`fleet_...`
) of the fleet this subfleet belongs to. A fleet may not name itself, and may not be placed beneath one of its own descendants.

`color`

string

optional

Display colour for the subfleet.

`task`

string

optional

Free-text description of what the subfleet is used for.

`status`

string

optional

Subfleet status.

POST
`/v1/fleets`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/fleets \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "Carpool",
    "color": "#059669",
    "task": "Employee transport",
    "status": "active",
    "parent_fleet": "{{parent_fleet_id}}"
}'
```

Other ways to call this

* OK
* Unprocessable Entity
* Not Found

200

OK

```
{
  "id": "fleet_1Bd7Rk9Tz3",
  "name": "Carpool",
  "color": "#059669",
  "task": "Employee transport",
  "status": "active",
  "photo_url": "https://s3.ap-northeast-2.amazonaws.com/fleetbase/public/default-fleet.png",
  "service_area_id": null,
  "zone_id": null,
  "vendor_id": null,
  "parent_fleet_id": "fleet_4Mnp8Qx2Vz",
  "updated_at": "2026-05-07T08:31:00.000000Z",
  "created_at": "2026-05-07T08:31:00.000000Z"
}
```

POST
`/v1/vehicles`

## [Create a Fleet Vehicle](#create-a-fleet-vehicle)

Creates a vehicle for the fleet membership requests to operate on.

The vehicle created in the
**Vehicles**
folder is deleted before this folder runs, so the membership assertions need a resource of their own. It is removed again by
**Delete a Fleet Vehicle**
at the end of this folder.

POST
`/v1/vehicles`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/vehicles \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "Fleet Membership Van",
    "make": "Toyota",
    "model": "HiAce",
    "year": 2024,
    "plate_number": "FLT-0001",
    "status": "available"
}'
```

POST
`/v1/drivers`

## [Create a Fleet Driver](#create-a-fleet-driver)

Creates a driver for the fleet membership requests to operate on.

The driver created in the
**Drivers**
folder is deleted before this folder runs, so the membership assertions need a resource of their own. It is removed again by
**Delete a Fleet Driver**
at the end of this folder.

POST
`/v1/drivers`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/drivers \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "Fleet Membership Driver",
    "internal_id": "DRV-FLT-0001"
}'
```

GET
`/v1/fleets`

## [Query Fleets](#query-fleets)

Returns a paginated list of fleets for the current organization. Use pagination and sorting parameters to control the result set.

Query parameters

`query`

string

optional

Free-text search across the fleet's name, task and public ID.

`name`

string

optional

Filter by fleet name.

`public_id`

string

optional

Filter by fleet public ID (
`fleet_...`
). Exact match.

`status`

string

optional

Filter by fleet status. Accepts a comma-separated list.

`task`

string

optional

Filter by the fleet's task.

`parent_fleet`

string

optional

Filter to the subfleets of a parent fleet, given as its public ID (
`fleet_...`
).

`parents_only`

boolean

optional

Return only root fleets — those with no parent fleet.

`vendor`

string

optional

Filter by vendor, given as its public ID (
`vendor_...`
).

`service_area`

string

optional

Filter by service area, given as its public ID (
`service_area_...`
).

`zone`

string

optional

Filter by zone, given as its public ID (
`zone_...`
).

`limit`

integer

optional

Maximum number of fleets to return.

`offset`

integer

optional

Number of fleets to skip before returning results.

`sort`

string

optional

Sort expression for the fleet query.

`with`

array of strings

optional

Relationships to expand:
`service_area`
,
`zone`
,
`vendor`
,
`parent_fleet`
,
`photo`
,
`subfleets`
,
`drivers`
,
`vehicles`
, and the nested
`subfleets.drivers`
/
`subfleets.vehicles`
. Accepted as
`?with=vendor`
,
`?with[]=vendor`
,
`?with[]=vendor&with[]=driver`
and
`?with=vendor,driver`
;
`expand`
is an alias for all four. Expanding adds the nested object — it never replaces or retypes the
`<name>_id`
identifier, which is always present. A name outside the supported set is ignored rather than rejected.

GET
`/v1/fleets`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/fleets?limit=25&offset=0&sort=created_at \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
[
  {
    "id": "fleet_4Mnp8Qx2Vz",
    "name": "Haulers",
    "color": "#2563EB",
    "task": "Long haul distribution",
    "status": "active",
    "photo_url": "https://s3.ap-northeast-2.amazonaws.com/fleetbase/public/default-fleet.png",
    "service_area_id": "service_area_9Kp2Vx4Qm1",
    "zone_id": null,
    "vendor_id": null,
    "parent_fleet_id": null,
    "photo_id": null,
    "updated_at": "2026-05-07T08:30:00.000000Z",
    "created_at": "2026-05-07T08:30:00.000000Z"
  }
]
```

GET
`/v1/fleets/:id`

## [Retrieve a Fleet](#retrieve-a-fleet)

Retrieves a fleet.

GET
`/v1/fleets/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/fleets/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "id": "fleet_4Mnp8Qx2Vz",
  "name": "Haulers",
  "color": "#2563EB",
  "task": "Long haul distribution",
  "status": "active",
  "photo_url": "https://s3.ap-northeast-2.amazonaws.com/fleetbase/public/default-fleet.png",
  "service_area_id": "service_area_9Kp2Vx4Qm1",
  "zone_id": null,
  "vendor_id": null,
  "parent_fleet_id": null,
  "photo_id": null,
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/fleets/:id/vehicles/:vehicle`

## [Assign a Vehicle to a Fleet](#assign-a-vehicle-to-a-fleet)

Adds a vehicle to a fleet. Both path parameters are public IDs; no internal uuid is accepted or returned.

Assignment is idempotent. Repeating it answers the same way and never creates a second membership; a membership that was previously removed is restored rather than duplicated. Assigning to one fleet does not remove the resource from any other fleet, and does not change a driver's current vehicle.

POST
`/v1/fleets/:id/vehicles/:vehicle`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/fleets/:id/vehicles/:vehicle \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "fleet": "fleet_4Mnp8Qx2Vz",
  "vehicle": "vehicle_7YqM3KpL2n",
  "assigned": true
}
```

POST
`/v1/fleets/:id/vehicles/:vehicle`

## [Reassign a Vehicle to a Fleet](#reassign-a-vehicle-to-a-fleet)

Adds a vehicle to a fleet. Both path parameters are public IDs; no internal uuid is accepted or returned.

This request repeats the assignment above deliberately: assignment is idempotent, so a second call answers exactly as the first did and produces one active membership, not two.

POST
`/v1/fleets/:id/vehicles/:vehicle`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/fleets/:id/vehicles/:vehicle \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "fleet": "fleet_4Mnp8Qx2Vz",
  "vehicle": "vehicle_7YqM3KpL2n",
  "assigned": true
}
```

POST
`/v1/fleets/:id/drivers/:driver`

## [Assign a Driver to a Fleet](#assign-a-driver-to-a-fleet)

Adds a driver to a fleet. Both path parameters are public IDs; no internal uuid is accepted or returned.

Assignment is idempotent. Repeating it answers the same way and never creates a second membership; a membership that was previously removed is restored rather than duplicated. Assigning to one fleet does not remove the resource from any other fleet, and does not change a driver's current vehicle.

POST
`/v1/fleets/:id/drivers/:driver`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/fleets/:id/drivers/:driver \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "fleet": "fleet_4Mnp8Qx2Vz",
  "driver": "driver_7YqM3KpL2n",
  "assigned": true
}
```

POST
`/v1/fleets/:id/drivers/:driver`

## [Reassign a Driver to a Fleet](#reassign-a-driver-to-a-fleet)

Adds a driver to a fleet. Both path parameters are public IDs; no internal uuid is accepted or returned.

This request repeats the assignment above deliberately: assignment is idempotent, so a second call answers exactly as the first did and produces one active membership, not two.

POST
`/v1/fleets/:id/drivers/:driver`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/fleets/:id/drivers/:driver \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "fleet": "fleet_4Mnp8Qx2Vz",
  "driver": "driver_7YqM3KpL2n",
  "assigned": true
}
```

PUT
`/v1/fleets/:id`

## [Update a Fleet](#update-a-fleet)

Updates any safe fleet field: name, colour, task, status, and the service area, zone, vendor and parent fleet relationships.

Relationship inputs take public IDs and are resolved inside the authenticated organization. Sending
`null`
for a relationship clears it —
`"parent_fleet": null`
promotes a subfleet back to a root fleet.

Body parameters

`name`

string

optional

Fleet display name.

`color`

string

optional

Display colour for the fleet.

`task`

string

optional

Free-text description of what the fleet is used for.

`status`

string

optional

Fleet status.

`service_area`

string

optional

Service area public ID (
`service_area_...`
). Send
`null`
to clear the assignment.

`zone`

string

optional

Zone public ID (
`zone_...`
). Send
`null`
to clear the assignment.

`vendor`

string

optional

Vendor public ID (
`vendor_...`
). Send
`null`
to clear the assignment.

`parent_fleet`

string

optional

Parent fleet public ID (
`fleet_...`
). Send
`null`
to promote the fleet back to a root fleet. A fleet may not be its own parent, and may not be moved beneath one of its own subfleets.

`photo`

string

optional

File public ID (
`file_...`
) to use as the fleet image.

PUT
`/v1/fleets/:id`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/fleets/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "Haulers North",
    "color": "#7C3AED",
    "task": "Regional distribution",
    "status": "active",
    "service_area": "{{service_area_id}}"
}'
```

Other ways to call this

* OK

200

OK

```
{
  "id": "fleet_4Mnp8Qx2Vz",
  "name": "Haulers North",
  "color": "#7C3AED",
  "task": "Regional distribution",
  "status": "active",
  "photo_url": "https://s3.ap-northeast-2.amazonaws.com/fleetbase/public/default-fleet.png",
  "service_area_id": "service_area_9Kp2Vx4Qm1",
  "zone_id": null,
  "vendor_id": null,
  "parent_fleet_id": null,
  "photo_id": null,
  "updated_at": "2026-05-07T09:12:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

DELETE
`/v1/fleets/:id/vehicles/:vehicle`

## [Remove a Vehicle from a Fleet](#remove-a-vehicle-from-a-fleet)

Removes a vehicle from a fleet. Both path parameters are public IDs.

Removing a membership never deletes the vehicle, never changes a driver's current vehicle, and never affects the resource's membership of any other fleet. Repeating the removal is a successful no-op.

DELETE
`/v1/fleets/:id/vehicles/:vehicle`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/fleets/:id/vehicles/:vehicle \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "fleet": "fleet_4Mnp8Qx2Vz",
  "vehicle": "vehicle_7YqM3KpL2n",
  "assigned": false
}
```

DELETE
`/v1/fleets/:id/vehicles/:vehicle`

## [Remove a Vehicle from a Fleet Again](#remove-a-vehicle-from-a-fleet-again)

Removes a vehicle from a fleet. Both path parameters are public IDs.

This request repeats the removal above deliberately: removing a membership that is not there is a documented, successful no-op.

DELETE
`/v1/fleets/:id/vehicles/:vehicle`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/fleets/:id/vehicles/:vehicle \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "fleet": "fleet_4Mnp8Qx2Vz",
  "vehicle": "vehicle_7YqM3KpL2n",
  "assigned": false
}
```

DELETE
`/v1/fleets/:id/drivers/:driver`

## [Remove a Driver from a Fleet](#remove-a-driver-from-a-fleet)

Removes a driver from a fleet. Both path parameters are public IDs.

Removing a membership never deletes the driver, never changes a driver's current vehicle, and never affects the resource's membership of any other fleet. Repeating the removal is a successful no-op.

DELETE
`/v1/fleets/:id/drivers/:driver`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/fleets/:id/drivers/:driver \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "fleet": "fleet_4Mnp8Qx2Vz",
  "driver": "driver_7YqM3KpL2n",
  "assigned": false
}
```

DELETE
`/v1/fleets/:id/drivers/:driver`

## [Remove a Driver from a Fleet Again](#remove-a-driver-from-a-fleet-again)

Removes a driver from a fleet. Both path parameters are public IDs.

This request repeats the removal above deliberately: removing a membership that is not there is a documented, successful no-op.

DELETE
`/v1/fleets/:id/drivers/:driver`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/fleets/:id/drivers/:driver \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "fleet": "fleet_4Mnp8Qx2Vz",
  "driver": "driver_7YqM3KpL2n",
  "assigned": false
}
```

DELETE
`/v1/vehicles/:id`

## [Delete a Fleet Vehicle](#delete-a-fleet-vehicle)

Deletes the vehicle created for the fleet membership requests. Runs after every membership has been removed.

DELETE
`/v1/vehicles/:id`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/vehicles/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

DELETE
`/v1/drivers/:id`

## [Delete a Fleet Driver](#delete-a-fleet-driver)

Deletes the driver created for the fleet membership requests. Runs after every membership has been removed.

DELETE
`/v1/drivers/:id`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/drivers/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

DELETE
`/v1/fleets/:id`

## [Delete a Subfleet](#delete-a-subfleet)

Deletes the subfleet created by
**Create a Subfleet**
.

It runs before
**Delete a Fleet**
so the child is removed before its parent.

DELETE
`/v1/fleets/:id`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/fleets/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

DELETE
`/v1/fleets/:id`

## [Delete a Fleet](#delete-a-fleet)

Deletes a fleet.

DELETE
`/v1/fleets/:id`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/fleets/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "id": "<string>",
  "object": "<string>",
  "deleted": "<boolean>"
}
```
