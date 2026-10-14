---
title: "Drivers"
url: https://fleetbase.io/docs/api/fleetbase/drivers
module: api
---

# Drivers

Drivers are mobile workers who can be assigned to vehicles and orders. Use driver endpoints to manage driver profiles, authentication, devices, availability, tracking, and organization context.

* [The Driver object](#the-driver-object)
* [Create a Driver

  POST
  `/v1/drivers`](#create-a-driver)
* [Create an Operational Driver

  POST
  `/v1/drivers`](#create-an-operational-driver)
* [Query Drivers

  GET
  `/v1/drivers`](#query-drivers)
* [Retrieve a Driver

  GET
  `/v1/drivers/:id`](#retrieve-a-driver)
* [Update a Driver

  PUT
  `/v1/drivers/:id`](#update-a-driver)
* [Update a Driver Unchanged Contact

  PUT
  `/v1/drivers/:id`](#update-a-driver-unchanged-contact)
* [Change Driver Password

  POST
  `/v1/drivers/:id/change-password`](#change-driver-password)
* [Request Driver Password Reset

  POST
  `/v1/drivers/forgot-password`](#request-driver-password-reset)
* [Reset Driver Password

  POST
  `/v1/drivers/reset-password`](#reset-driver-password)
* [List Driver Manifests

  GET
  `/v1/drivers/:id/manifests`](#list-driver-manifests)
* [Delete an Operational Driver

  DELETE
  `/v1/drivers/:id`](#delete-an-operational-driver)
* [Delete a Driver

  DELETE
  `/v1/drivers/:id`](#delete-a-driver)
* [Track Driver

  PATCH
  `/v1/drivers/:id/track`](#track-driver)
* [Login Driver

  POST
  `/v1/drivers/login`](#login-driver)
* [Request Driver Login SMS

  POST
  `/v1/drivers/login-with-sms`](#request-driver-login-sms)
* [Verify Driver Login Code

  POST
  `/v1/drivers/verify-code`](#verify-driver-login-code)
* [Register Driver Device

  POST
  `/v1/drivers/:id/register-device`](#register-driver-device)
* [Register Device

  POST
  `/v1/drivers/register-device`](#register-device)
* [Switch Driver Organization

  POST
  `/v1/drivers/:id/switch-organization`](#switch-driver-organization)
* [Toggle Driver Online

  POST
  `/v1/drivers/:id/toggle-online`](#toggle-driver-online)
* [List Driver Organizations

  GET
  `/v1/drivers/:id/organizations`](#list-driver-organizations)
* [Get Driver Current Organization

  GET
  `/v1/drivers/:id/current-organization`](#get-driver-current-organization)
* [Simulate Driver Route

  POST
  `/v1/drivers/:id/simulate`](#simulate-driver-route)

## The Driver object

A driver represents a Fleet-Ops operator who can receive jobs, report location, register devices, and belong to fleets, vendors, vehicles, and organizations.
`email` and `phone` are optional: an operational driver record may have neither, in which case the driver cannot sign in to Navigator until credentials are supplied.
`user` and `company` are public-ID strings and have always been — Navigator interpolates `driver.user` straight into a socket channel name, so neither is ever expanded into an object. `vehicle`, `vendor` and `current\_job` are objects on create, update and retrieve, which load them. The `vehicle\_id`, `vendor\_id` and `job\_id` keys are additive identifiers beside those objects, not replacements for them. Internal uuid columns and the authentication token are never part of the public contract.

Attributes

`id`

string

optional

Public driver identifier.

`user`

string

optional

Public user ID linked to the driver. Always a string, never an object — Navigator uses it directly as a chat participant identifier and as a socket channel name.

`internal_id`

string

optional

Optional internal identifier.

`company`

string

optional

Public company ID for the driver's current company.

`company_name`

string

optional

Name of the driver's current company.

`name`

string

optional

Driver display name.

`email`

string

optional

Driver email address.

`phone`

string

optional

Driver phone number.

`drivers_license_number`

string

optional

Driver license number.

`photo_url`

string

optional

Driver photo URL.

`avatar_url`

string

optional

Driver avatar URL.

`vehicle`

object

optional

Assigned vehicle. Returned as an object by create, update and retrieve, which load it. Read
`vehicle_id`
for the identifier.

`current_job`

object

optional

Current order. Returned as an object by create, update and retrieve, which load it. Read
`job_id`
for the identifier.

`vendor`

object

optional

Assigned vendor. Returned as an object by create, update and retrieve, which load it. Read
`vendor_id`
for the identifier.

`fleets`

array of objects

optional

Fleets the driver belongs to, when loaded.

`location`

object

optional

Current driver coordinates.

`heading`

integer

optional

Current heading in degrees.

`altitude`

integer

optional

Current altitude.

`speed`

integer

optional

Current speed.

`country`

string

optional

Current country code.

`currency`

currency

optional

Currency inferred from the driver's country.

`city`

string

optional

Current city.

`online`

boolean

optional

Whether the driver is online.

`status`

string

optional

Driver lifecycle status.

`token`

string

optional

Authentication token returned by driver login endpoints.

`meta`

object

optional

Additional driver metadata.

`updated_at`

timestamp

optional

Timestamp when the driver was last updated.

`created_at`

timestamp

optional

Timestamp when the driver was created.

`timezone`

string

optional

Timezone on the driver's linked user account.

`license_expiry`

date

optional

Date the driver's licence expires.

`vehicle_id`

string

optional

Public ID of the assigned vehicle, or
`null`
.

`vendor_id`

string

optional

Public ID of the assigned vendor, or
`null`
.

`job_id`

string

optional

Public ID of the driver's current order, or
`null`
.

`bearing`

number

optional

Current bearing.

`current_status`

string

optional

Free-form operational status, distinct from the lifecycle
`status`
.

`skills`

array of strings

optional

Qualifications or certifications the driver holds, used for orchestrator assignment.

`max_travel_time`

integer

optional

Maximum driving time per route, in seconds.

`max_distance`

integer

optional

Maximum driving distance per route, in metres.

`time_window_start`

string

optional

Default shift start time.

`time_window_end`

string

optional

Default shift end time.

The
Driver
object

```
{
  "id": "driver_A1b2C3d4E5",
  "user": "user_1A2b3C4d5E",
  "internal_id": "DRV-1001",
  "company": "company_6zV1KqN9pR",
  "company_name": "Fleetbase",
  "name": "Alex Driver",
  "email": "alex.driver@example.com",
  "phone": "+15555550111",
  "timezone": "Asia/Singapore",
  "drivers_license_number": null,
  "license_expiry": null,
  "vehicle_id": null,
  "vendor_id": null,
  "job_id": null,
  "photo_url": null,
  "avatar_url": null,
  "vehicle_avatar": null,
  "location": {
    "latitude": 1.3521,
    "longitude": 103.8198
  },
  "heading": 0,
  "altitude": 0,
  "speed": 0,
  "country": "SG",
  "currency": "SGD",
  "city": "Singapore",
  "online": false,
  "current_status": null,
  "status": "active",
  "token": null,
  "skills": null,
  "max_travel_time": null,
  "max_distance": null,
  "time_window_start": null,
  "time_window_end": null,
  "meta": {},
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/drivers`

## [Create a Driver](#create-a-driver)

Creates a driver profile and its linked user account.

Only
`name`
is required.
`email`
and
`phone`
are optional — an operational fleet record may legitimately have neither — but each is validated and required to be unique across users when it is supplied. No placeholder address or number is ever generated, and no invitation is sent when there is no deliverable contact method. A driver created without credentials cannot sign in to Navigator until credentials are added; see
**Create an Operational Driver**
.

Beyond the account fields the endpoint accepts the driver's identity (
`internal_id`
,
`drivers_license_number`
,
`license_expiry`
,
`photo`
), operational fields (
`country`
,
`currency`
,
`city`
,
`online`
,
`current_status`
,
`status`
, location and telemetry), structured
`meta`
, orchestrator constraints, and the
`vehicle`
,
`vendor`
and
`job`
relationships given as public IDs and resolved inside the authenticated organization.

Body parameters

`name`

string

required

Driver display name.

`email`

string

optional

Driver email address. Optional. Validated as an email address and required to be unique across users when it is supplied.

`phone`

string

optional

Driver phone number. Optional. Required to be unique across users when it is supplied.

`password`

string

optional

Optional password for the driver user account. Accepted on create only; changing a password afterwards uses the dedicated password endpoints.

`timezone`

string

optional

Timezone for the driver's user account.

`internal_id`

string

optional

The identifier the operator's own system uses for this driver. Queryable through
`?internal_id=`
, which is how an importer decides whether a driver already exists.

`drivers_license_number`

string

optional

Driver licence number. Queryable through
`?drivers_license_number=`
.

`license_expiry`

date

optional

Date the driver's licence expires.

`photo`

string

optional

File ID, upload reference, or resolvable file input for the driver photo.

`country`

string

optional

Two-letter country code.

`currency`

string

optional

Three-letter currency code.

`city`

string

optional

Driver city.

`online`

boolean

optional

Default:
`false`

Whether the driver is online.

`current_status`

string

optional

Free-form operational status, distinct from the lifecycle
`status`
.

`status`

enum

optional

Driver lifecycle status.
`active`
is accepted and stored as
`available`
. One of
`active`
,
`available`
,
`inactive`
.

`location`

object

optional

Resolvable point used as the driver's current location.

`latitude`

number

optional

Decimal latitude. Required with
`longitude`
.

`longitude`

number

optional

Decimal longitude. Required with
`latitude`
.

`heading`

number

optional

Current heading in degrees.

`bearing`

number

optional

Current bearing.

`altitude`

number

optional

Current altitude.

`speed`

number

optional

Current speed.

`meta`

object

optional

Additional driver metadata.

`skills`

array of strings

optional

Qualifications or certifications the driver holds, used for orchestrator assignment.

`max_travel_time`

integer

optional

Maximum driving time per route, in seconds.

`max_distance`

integer

optional

Maximum driving distance per route, in metres.

`time_window_start`

string

optional

Default shift start time, as
`HH:MM`
.

`time_window_end`

string

optional

Default shift end time, as
`HH:MM`
.

`vehicle`

string

optional

Vehicle public ID (
`vehicle_...`
) to assign to the driver. Send
`null`
to clear. Must belong to the authenticated organization.

`vendor`

string

optional

Vendor public ID (
`vendor_...`
) to assign to the driver. Send
`null`
to clear.

`job`

string

optional

Current order public ID (
`order_...`
) to assign to the driver. Send
`null`
to clear.

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
  "name": "John Doe",
  "email": "{{$randomEmail}}",
  "phone": "{{$randomPhoneNumber}}",
  "password": "{{driver_seed_password}}",
  "timezone": "Asia/Singapore",
  "internal_id": "DRV-1001",
  "drivers_license_number": "S1234567A",
  "license_expiry": "2030-06-30",
  "country": "SG",
  "city": "Singapore",
  "current_status": "on_duty",
  "skills": ["hazmat"],
  "max_travel_time": 28800,
  "max_distance": 250000,
  "time_window_start": "08:00",
  "time_window_end": "18:00",
  "meta": { "badge": "A12" }
}'
```

Other ways to call this

* OK
* Unprocessable Entity

200

OK

```
{
  "id": "driver_A1b2C3d4E5",
  "user": "user_1A2b3C4d5E",
  "internal_id": "DRV-1001",
  "company": "company_6zV1KqN9pR",
  "company_name": "Fleetbase",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+15555550111",
  "timezone": "Asia/Singapore",
  "drivers_license_number": "S1234567A",
  "license_expiry": "2030-06-30",
  "photo_url": null,
  "avatar_url": "https://flb-assets.s3-ap-southeast-1.amazonaws.com/static/driver-icons/moto-driver.png",
  "vehicle_avatar": "https://flb-assets.s3-ap-southeast-1.amazonaws.com/static/vehicle-icons/mini_bus.svg",
  "vehicle_id": null,
  "vendor_id": null,
  "job_id": null,
  "vehicle": null,
  "vendor": null,
  "current_job": null,
  "location": {
    "type": "Point",
    "coordinates": [
      0,
      0
    ]
  },
  "heading": 0,
  "bearing": null,
  "altitude": 0,
  "speed": 0,
  "country": "SG",
  "currency": "SGD",
  "city": "Singapore",
  "online": false,
  "current_status": "on_duty",
  "status": "available",
  "token": null,
  "skills": [
    "hazmat"
  ],
  "max_travel_time": 28800,
  "max_distance": 250000,
  "time_window_start": "08:00:00",
  "time_window_end": "18:00:00",
  "meta": {
    "badge": "A12"
  },
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/drivers`

## [Create an Operational Driver](#create-an-operational-driver)

Creates a driver record for someone with no deliverable email address and no phone number — a subcontracted or yard-only driver, or a record imported from an operator's own system.

Only
`name`
is required. Nothing is invented to fill the gap: no placeholder address, no placeholder number, and no invitation or credential notification is sent, because there is nowhere to send one. The Driver-to-User relationship, the organization membership, the
`driver`
user type and the
`Driver`
role are all created exactly as they are for a credentialed driver.

**A driver created this way cannot sign in to Navigator until credentials are supplied.**
Add an email address or phone number with
`PUT /v1/drivers/{id}`
when one becomes available.

Body parameters

`name`

string

required

Driver display name. The only required field.

`internal_id`

string

optional

The identifier the operator's own system uses for this driver.

`email`

string

optional

Optional. Omit it when the driver has no mailbox.

`phone`

string

optional

Optional. Omit it when the driver has no handset.

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
  "name": "Yard Driver",
  "internal_id": "DRV-7788"
}'
```

200

OK

```
{
  "id": "driver_Z9y8X7w6V5",
  "user": "user_9K8j7H6g5F",
  "internal_id": "DRV-7788",
  "company": "company_6zV1KqN9pR",
  "company_name": "Fleetbase",
  "name": "Yard Driver",
  "email": null,
  "phone": null,
  "drivers_license_number": null,
  "license_expiry": null,
  "vehicle_id": null,
  "vendor_id": null,
  "job_id": null,
  "vehicle": null,
  "vendor": null,
  "current_job": null,
  "online": false,
  "status": "available",
  "meta": {},
  "updated_at": "2026-05-07T08:32:00.000000Z",
  "created_at": "2026-05-07T08:32:00.000000Z"
}
```

GET
`/v1/drivers`

## [Query Drivers](#query-drivers)

Returns drivers for the current company. Use filters such as
`vendor`
, search, pagination, or sort parameters to narrow the result set.

Query parameters

`query`

string

optional

Free-text search across the driver's name, email, phone and licence number.

`name`

string

optional

Filter by the driver's name.

`internal_id`

string

optional

Filter by the identifier the operator's own system uses.
**Exact match**
on the public API:
`DRV-10`
returns only
`DRV-10`
, never
`DRV-100`
. That is what lets an importer use it to decide between update and create. (The Fleet-Ops console does a partial search on the same field; that behaviour is internal to the console and not part of this contract.)

`public_id`

string

optional

Filter by driver public ID (
`driver_...`
). Exact match.

`drivers_license_number`

string

optional

Filter by driver licence number.

`phone`

string

optional

Filter by the phone number on the driver's linked user account.

`country`

string

optional

Filter by country code. Accepts a comma-separated list.

`status`

string

optional

Filter by driver status. Accepts a comma-separated list.

`vendor`

string

optional

Filter by vendor, given as its public ID (
`vendor_...`
).

`vehicle`

string

optional

Filter by assigned vehicle, given as its public ID (
`vehicle_...`
) or internal ID. Pass
`unassigned`
to return drivers with no vehicle.

`fleet`

string

optional

Filter to the drivers in a fleet, given as its public ID (
`fleet_...`
).

`nearby`

string

optional

Coordinates or an address string to search near. Pair with
`radius`
.

`radius`

integer

optional

Search radius in metres, used with
`nearby`
.

`limit`

integer

optional

Maximum number of drivers to return.

`offset`

integer

optional

Number of drivers to skip before returning results.

`sort`

string

optional

Sort expression for the driver query.

`with`

array of strings

optional

Relationships to expand. Accepted as
`?with=vendor`
,
`?with[]=vendor`
,
`?with[]=vendor&with[]=driver`
and
`?with=vendor,driver`
;
`expand`
is an alias for all four. A relationship named here is additionally returned as a nested object — it never replaces or retypes the
`<name>_id`
identifier, which is always present. A name outside the supported set is ignored rather than rejected.

GET
`/v1/drivers`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/drivers?id={{driver_id}} \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
[
  {
    "id": "driver_A1b2C3d4E5",
    "user": "user_1A2b3C4d5E",
    "internal_id": "DRV-1001",
    "company": "company_6zV1KqN9pR",
    "company_name": "Fleetbase",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+15555550111",
    "drivers_license_number": "S1234567A",
    "license_expiry": "2030-06-30",
    "vehicle_id": null,
    "vendor_id": null,
    "job_id": null,
    "country": "SG",
    "city": "Singapore",
    "online": false,
    "current_status": "on_duty",
    "status": "available",
    "meta": {
      "badge": "A12"
    },
    "updated_at": "2026-05-07T08:30:00.000000Z",
    "created_at": "2026-05-07T08:30:00.000000Z"
  }
]
```

GET
`/v1/drivers/:id`

## [Retrieve a Driver](#retrieve-a-driver)

This endpoint allows you to retrieve a driver object to view it's details.

GET
`/v1/drivers/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/drivers/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "id": "driver_A1b2C3d4E5",
  "user": "user_1A2b3C4d5E",
  "internal_id": "DRV-1002",
  "company": "company_6zV1KqN9pR",
  "company_name": "Fleetbase",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+15555550111",
  "timezone": "Asia/Singapore",
  "drivers_license_number": "S1234567A",
  "license_expiry": "2030-06-30",
  "photo_url": null,
  "avatar_url": "https://flb-assets.s3-ap-southeast-1.amazonaws.com/static/driver-icons/moto-driver.png",
  "vehicle_id": "vehicle_7YqM3KpL2n",
  "vendor_id": null,
  "job_id": null,
  "vehicle": {
    "id": "vehicle_7YqM3KpL2n",
    "plate_number": "ABC123",
    "make": "Toyota",
    "model": "Camry"
  },
  "vendor": null,
  "current_job": null,
  "location": {
    "type": "Point",
    "coordinates": [
      103.8198,
      1.3521
    ]
  },
  "heading": 0,
  "bearing": null,
  "altitude": 0,
  "speed": 0,
  "country": "SG",
  "currency": "SGD",
  "city": "Johor Bahru",
  "online": false,
  "current_status": "off_duty",
  "status": "available",
  "token": null,
  "skills": [
    "hazmat"
  ],
  "max_travel_time": 28800,
  "max_distance": 250000,
  "time_window_start": "08:00:00",
  "time_window_end": "18:00:00",
  "meta": {
    "badge": "B34"
  },
  "updated_at": "2026-05-07T09:12:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

PUT
`/v1/drivers/:id`

## [Update a Driver](#update-a-driver)

Updates a driver's account fields, identity, assignment, operational state, location, photo, orchestrator constraints, or metadata.

`password`
is deliberately not accepted here. Changing a password requires proving the old one and resetting it requires a code, neither of which a general
`PUT`
can express — use
**Change Driver Password**
,
**Request Driver Password Reset**
and
**Reset Driver Password**
instead.

Relationship inputs take public IDs and are resolved inside the authenticated organization. Sending
`null`
clears an assignment.

Body parameters

`name`

string

optional

Driver display name.

`email`

string

optional

Driver email address.

`phone`

string

optional

Driver phone number.

`timezone`

string

optional

Timezone for the driver's user account.

`internal_id`

string

optional

The identifier the operator's own system uses for this driver. Queryable through
`?internal_id=`
, which is how an importer decides whether a driver already exists.

`drivers_license_number`

string

optional

Driver licence number. Queryable through
`?drivers_license_number=`
.

`license_expiry`

date

optional

Date the driver's licence expires.

`photo`

string

optional

File ID, upload reference, or resolvable file input for the driver photo.

`country`

string

optional

Two-letter country code.

`currency`

string

optional

Three-letter currency code.

`city`

string

optional

Driver city.

`online`

boolean

optional

Default:
`false`

Whether the driver is online.

`current_status`

string

optional

Free-form operational status, distinct from the lifecycle
`status`
.

`status`

enum

optional

Driver lifecycle status.
`active`
is accepted and stored as
`available`
. One of
`active`
,
`available`
,
`inactive`
.

`location`

object

optional

Resolvable point used as the driver's current location.

`latitude`

number

optional

Decimal latitude. Required with
`longitude`
.

`longitude`

number

optional

Decimal longitude. Required with
`latitude`
.

`heading`

number

optional

Current heading in degrees.

`bearing`

number

optional

Current bearing.

`altitude`

number

optional

Current altitude.

`speed`

number

optional

Current speed.

`meta`

object

optional

Additional driver metadata.

`skills`

array of strings

optional

Qualifications or certifications the driver holds, used for orchestrator assignment.

`max_travel_time`

integer

optional

Maximum driving time per route, in seconds.

`max_distance`

integer

optional

Maximum driving distance per route, in metres.

`time_window_start`

string

optional

Default shift start time, as
`HH:MM`
.

`time_window_end`

string

optional

Default shift end time, as
`HH:MM`
.

`vehicle`

string

optional

Vehicle public ID (
`vehicle_...`
) to assign to the driver. Send
`null`
to clear. Must belong to the authenticated organization.

`vendor`

string

optional

Vendor public ID (
`vendor_...`
) to assign to the driver. Send
`null`
to clear.

`job`

string

optional

Current order public ID (
`order_...`
) to assign to the driver. Send
`null`
to clear.

PUT
`/v1/drivers/:id`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/drivers/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
  "name": "John Doe",
  "email": "{{$randomEmail}}",
  "phone": "{{$randomPhoneNumber}}",
  "internal_id": "DRV-1002",
  "timezone": "Europe/Amsterdam",
  "city": "Johor Bahru",
  "current_status": "off_duty",
  "meta": { "badge": "B34" }
}'
```

Other ways to call this

* OK

200

OK

```
{
  "id": "driver_A1b2C3d4E5",
  "user": "user_1A2b3C4d5E",
  "internal_id": "DRV-1002",
  "company": "company_6zV1KqN9pR",
  "company_name": "Fleetbase",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+15555550111",
  "timezone": "Asia/Singapore",
  "drivers_license_number": "S1234567A",
  "license_expiry": "2030-06-30",
  "photo_url": null,
  "avatar_url": "https://flb-assets.s3-ap-southeast-1.amazonaws.com/static/driver-icons/moto-driver.png",
  "vehicle_id": "vehicle_7YqM3KpL2n",
  "vendor_id": null,
  "job_id": null,
  "vehicle": {
    "id": "vehicle_7YqM3KpL2n",
    "plate_number": "ABC123",
    "make": "Toyota",
    "model": "Camry"
  },
  "vendor": null,
  "current_job": null,
  "location": {
    "type": "Point",
    "coordinates": [
      103.8198,
      1.3521
    ]
  },
  "heading": 0,
  "bearing": null,
  "altitude": 0,
  "speed": 0,
  "country": "SG",
  "currency": "SGD",
  "city": "Johor Bahru",
  "online": false,
  "current_status": "off_duty",
  "status": "available",
  "token": null,
  "skills": [
    "hazmat"
  ],
  "max_travel_time": 28800,
  "max_distance": 250000,
  "time_window_start": "08:00:00",
  "time_window_end": "18:00:00",
  "meta": {
    "badge": "B34"
  },
  "updated_at": "2026-05-07T09:12:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

PUT
`/v1/drivers/:id`

## [Update a Driver Unchanged Contact](#update-a-driver-unchanged-contact)

Resends the driver's current email address and phone number unchanged.

Uniqueness is enforced on update against every other live user account, with the driver's own linked user ignored by uuid. Without that clause this request would fail against the driver's own address — which is why it exists.

PUT
`/v1/drivers/:id`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/drivers/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
  "email": "{{created_driver_email}}",
  "phone": "{{created_driver_phone}}"
}'
```

POST
`/v1/drivers/:id/change-password`

## [Change Driver Password](#change-driver-password)

Changes the password of a driver who is signed in, proving the current one.

A password change is an authorisation decision rather than an attribute update, which is why it is not part of
`PUT /drivers/:id`
— that endpoint does not accept a password at all. Supplying the wrong
`current_password`
is refused and changes nothing.

Every other session is revoked when the password changes, and a fresh token is returned in the same response, so the caller keeps working while other devices are signed out.

Body parameters

`current_password`

string

required

The driver's existing password. The change is refused without it.

`password`

string

required

The new password. Must be at least 8 characters.

`password_confirmation`

string

optional

When present, must match
`password`
.

`device_name`

string

optional

Name for the replacement token issued to the caller. Defaults to
`navigator`
.

POST
`/v1/drivers/:id/change-password`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/drivers/:id/change-password \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "current_password": "{{created_driver_password}}",
  "password": "{{driver_new_password}}",
  "password_confirmation": "{{driver_new_password}}",
  "device_name": "navigator"
}'
```

POST
`/v1/drivers/forgot-password`

## [Request Driver Password Reset](#request-driver-password-reset)

Sends a password reset code to a driver who cannot sign in.

The code goes by email or SMS depending on whether
`identity`
looks like an email address or a phone number.

The response is the same whether or not the identity belongs to a driver. That is deliberate: an endpoint that answered differently for an unknown number would be a way to enumerate an organization's drivers.

`driver_reset_identity`
defaults to a reserved address that belongs to nobody, so running the collection documents the endpoint without sending mail to a stranger. Point it at a real driver to exercise delivery.

Body parameters

`identity`

string

required

The driver's email address or phone number.

POST
`/v1/drivers/forgot-password`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/drivers/forgot-password \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "identity": "{{driver_reset_identity}}"
}'
```

POST
`/v1/drivers/reset-password`

## [Reset Driver Password](#reset-driver-password)

Sets a new password using the code sent by
`POST /drivers/forgot-password`
.

A wrong code, an expired code and an unknown identity all return the same error, so the endpoint cannot be used to test which of the three happened.

Every session is revoked on success. A reset is a recovery from losing control of an account, so nothing that was signed in stays signed in.

`driver_password_reset_code`
is a code issued for this flow specifically — a login code will not do, because the endpoint matches on purpose as well as on value. The password is set back to the one already in force so the run stays repeatable and the driver login requests further down still authenticate.

Body parameters

`identity`

string

required

The driver's email address or phone number — the same one the code was sent to.

`code`

string

required

The verification code sent by
`POST /drivers/forgot-password`
.

`password`

string

required

The new password. Must be at least 8 characters.

POST
`/v1/drivers/reset-password`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/drivers/reset-password \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "identity": "{{driver_identity}}",
  "code": "{{driver_password_reset_code}}",
  "password": "{{driver_password}}"
}'
```

GET
`/v1/drivers/:id/manifests`

## [List Driver Manifests](#list-driver-manifests)

Lists the manifests assigned to a driver, newest first.

A manifest is a driver's route: an order-agnostic sequence of stops which may span several orders, or none the driver has seen as an order.

Defaults to a recent window rather than the driver's whole history. Use
`status`
and
`on`
to narrow it further.

Query parameters

`status`

string

optional

Comma separated statuses to include, such as
`pending,in_progress`
.

`on`

string

optional

Only manifests scheduled on this date, as
`YYYY-MM-DD`
.

`limit`

integer

optional

Maximum manifests to return. Defaults to 30.

GET
`/v1/drivers/:id/manifests`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/drivers/:id/manifests \
  -H "Authorization: Bearer flb_live_…"
```

DELETE
`/v1/drivers/:id`

## [Delete an Operational Driver](#delete-an-operational-driver)

Deletes the credential-less driver created by
**Create an Operational Driver**
.

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
`/v1/drivers/:id`

## [Delete a Driver](#delete-a-driver)

Use this endpoint to delete a driver.

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

200

OK

```
{
  "deleted": "<boolean>",
  "id": "<string>"
}
```

PATCH
`/v1/drivers/:id/track`

## [Track Driver](#track-driver)

Body parameters

`latitude`

number

optional

Driver latitude. When omitted with
`longitude`
, Fleetbase returns the current driver resource without updating location.

`longitude`

number

optional

Driver longitude. When omitted with
`latitude`
, Fleetbase returns the current driver resource without updating location.

`altitude`

number

optional

Current altitude.

`heading`

number

optional

Current heading in degrees.

`speed`

number

optional

Current speed.

PATCH
`/v1/drivers/:id/track`

curl

JavaScript

PHP

Python

```
curl -X PATCH https://api.fleetbase.io/v1/drivers/:id/track \
  -H "Authorization: Bearer flb_live_…"
```

POST
`/v1/drivers/login`

## [Login Driver](#login-driver)

Authenticates a driver with email/phone and password.

Body parameters

`identity`

string

required

Driver email address or phone number.

`password`

string

required

Driver account password.

POST
`/v1/drivers/login`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/drivers/login \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "identity": "{{driver_identity}}",
  "password": "{{driver_password}}"
}'
```

POST
`/v1/drivers/login-with-sms`

## [Request Driver Login SMS](#request-driver-login-sms)

Starts driver SMS verification login.

Body parameters

`phone`

string

required

Driver phone number to send the verification code to.

POST
`/v1/drivers/login-with-sms`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/drivers/login-with-sms \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "phone": "{{driver_phone}}"
}'
```

POST
`/v1/drivers/verify-code`

## [Verify Driver Login Code](#verify-driver-login-code)

Verifies driver login code and returns a driver token.

Body parameters

`identity`

string

required

Driver email address or phone number used for verification.

`code`

string

required

Verification code sent to the driver.

`for`

string

optional

Default:
`driver_login`

Verification purpose. Defaults to
`driver_login`
.

POST
`/v1/drivers/verify-code`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/drivers/verify-code \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "identity": "{{driver_identity}}",
  "code": "{{verification_code}}"
}'
```

POST
`/v1/drivers/:id/register-device`

## [Register Driver Device](#register-driver-device)

Registers a device token for a specific driver.

Body parameters

`token`

string

required

Device push token to register for the driver.

`platform`

string

required

Device platform. May also be supplied as
`os`
.

`os`

string

optional

Alias for
`platform`
.

POST
`/v1/drivers/:id/register-device`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/drivers/:id/register-device \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "token": "{{device_token}}",
  "platform": "ios"
}'
```

POST
`/v1/drivers/register-device`

## [Register Device](#register-device)

Registers a driver device token through the non-id route.

Body parameters

`token`

string

required

Device push token to register.

`platform`

string

required

Device platform. May also be supplied as
`os`
.

`os`

string

optional

Alias for
`platform`
.

POST
`/v1/drivers/register-device`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/drivers/register-device \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "token": "{{device_token}}",
  "platform": "ios"
}'
```

POST
`/v1/drivers/:id/switch-organization`

## [Switch Driver Organization](#switch-driver-organization)

Switches the driver session to another organization.

The driver must already belong to the target organization, and it must not be the one they are currently in — switching to the current organization is rejected. A driver created through
`POST /drivers`
belongs to a single organization, so this example uses one that belongs to more than one.

Body parameters

`next`

string

required

Organization ID to switch the driver session to.

POST
`/v1/drivers/:id/switch-organization`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/drivers/:id/switch-organization \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "next": "{{secondary_organization_id}}"
}'
```

POST
`/v1/drivers/:id/toggle-online`

## [Toggle Driver Online](#toggle-driver-online)

Toggles or sets driver online status.

Body parameters

`online`

boolean

optional

Online status to set. When omitted, Fleetbase toggles the driver's current online status.

POST
`/v1/drivers/:id/toggle-online`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/drivers/:id/toggle-online \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "online": true
}'
```

GET
`/v1/drivers/:id/organizations`

## [List Driver Organizations](#list-driver-organizations)

Lists organizations a driver belongs to.

GET
`/v1/drivers/:id/organizations`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/drivers/:id/organizations \
  -H "Authorization: Bearer flb_live_…"
```

GET
`/v1/drivers/:id/current-organization`

## [Get Driver Current Organization](#get-driver-current-organization)

Returns the driver current organization.

GET
`/v1/drivers/:id/current-organization`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/drivers/:id/current-organization \
  -H "Authorization: Bearer flb_live_…"
```

POST
`/v1/drivers/:id/simulate`

## [Simulate Driver Route](#simulate-driver-route)

Simulates driver movement between two resolvable points, or pass order to simulate an order route.

Body parameters

`start`

object

optional

Starting point for the simulated drive. Required when
`order`
is not supplied.

`end`

object

optional

Ending point for the simulated drive. Required when
`order`
is not supplied.

`order`

string

optional

Order ID to simulate. Required when the action is
`order`
.

`action`

string

optional

Default:
`drive`

Simulation action. Defaults to
`drive`
.

POST
`/v1/drivers/:id/simulate`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/drivers/:id/simulate \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "start": {
    "latitude": 1.3521,
    "longitude": 103.8198
  },
  "end": {
    "latitude": 1.2903,
    "longitude": 103.8519
  }
}'
```
