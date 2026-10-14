---
title: "Tracking Statuses"
url: https://fleetbase.io/docs/api/fleetbase/tracking-statuses
module: api
---

# Tracking Statuses

Tracking statuses define the customer-facing milestones shown during shipment tracking. Use them to create and manage the status labels, codes, and descriptions surfaced in tracking flows.

* [The Tracking Status object](#the-tracking-status-object)
* [Create a Tracking Status

  POST
  `/v1/tracking-statuses`](#create-a-tracking-status)
* [Update a Tracking Status

  PUT
  `/v1/tracking-statuses/:id`](#update-a-tracking-status)
* [Retrieve a Tracking Status

  GET
  `/v1/tracking-statuses/:id`](#retrieve-a-tracking-status)
* [Query Tracking Statuses

  GET
  `/v1/tracking-statuses`](#query-tracking-statuses)
* [Delete a Tracking Status

  DELETE
  `/v1/tracking-statuses/:id`](#delete-a-tracking-status)

## The Tracking Status object

A tracking status is a timeline event for a tracking number. It stores status text, details, a code, location, and address context.

Attributes

`id`

string

optional

Public tracking status identifier.

`status`

string

optional

Human-readable status.

`details`

string

optional

Status details.

`code`

string

optional

Machine-readable status code.

`complete`

boolean

optional

Whether this status marks the tracked workflow complete.

`tracking_number`

object

optional

Tracking number associated with the status.

`city`

string

optional

City where the status occurred.

`province`

string

optional

Province or region where the status occurred.

`postal_code`

string

optional

Postal code where the status occurred.

`country`

string

optional

Country code where the status occurred.

`location`

object

optional

Location where the status occurred.

`updated_at`

timestamp

optional

Timestamp when the tracking status was last updated.

`created_at`

timestamp

optional

Timestamp when the tracking status was created.

The
Tracking Status
object

```
{
  "id": "tracking_status_6zV1KqN9pR",
  "status": "Created",
  "details": "Order was created.",
  "code": "created",
  "complete": false,
  "tracking_number": "tracking_3Nf8Qw2YxM",
  "city": "Singapore",
  "province": null,
  "postal_code": null,
  "country": "SG",
  "location": {
    "latitude": 1.3521,
    "longitude": 103.8198
  },
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/tracking-statuses`

## [Create a Tracking Status](#create-a-tracking-status)

Create a new Tracking Status.

Body parameters

`tracking_number`

string

optional

Tracking number ID to attach the status to. Required unless
`order`
is supplied.

`order`

string

optional

Order ID used to resolve the order's tracking number when
`tracking_number`
is not supplied.

`status`

string

required

Human-readable tracking status.

`code`

string

required

Machine-readable tracking status code.

`details`

string

required

Status details visible to tracking consumers.

`location`

object

optional

Resolvable point where the status occurred. Required unless latitude and longitude are supplied.

`latitude`

number

optional

Decimal latitude for the status location.

`longitude`

number

optional

Decimal longitude for the status location.

`city`

string

optional

City where the status occurred.

`province`

string

optional

Province or region where the status occurred.

`postal_code`

string

optional

Postal code where the status occurred.

`country`

string

optional

Two-letter country code where the status occurred.

`duplicate`

boolean

optional

When true, allows duplicate status text for the same order or tracking number.

POST
`/v1/tracking-statuses`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/tracking-statuses \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "status": "Delivery is en-route",
    "code": "delivery-en-route",
    "details": "Our driver has picked up your order and is on the way to your address!",
    "tracking_number": "{{tracking_number_id}}",
    "location": [1.3521, 103.8198],
    "city": "Singapore"
}'
```

200

OK

```
{
  "id": "<string>",
  "status": "<string>",
  "details": "<string>",
  "code": "<string>",
  "tracking_number": "<string>",
  "city": "<string>",
  "province": "<string>",
  "postal_code": "<string>",
  "country": "<string>",
  "location": "<string>",
  "updated_at": "<string>",
  "created_at": "<string>"
}
```

PUT
`/v1/tracking-statuses/:id`

## [Update a Tracking Status](#update-a-tracking-status)

Updates an existing tracking status. The response returns the tracking status with the new values applied.

Body parameters

`status`

string

optional

Human-readable tracking status.

`code`

string

optional

Machine-readable tracking status code.

`details`

string

optional

Status details visible to tracking consumers.

`location`

object

optional

Resolvable point where the status occurred.

`latitude`

number

optional

Decimal latitude for the status location.

`longitude`

number

optional

Decimal longitude for the status location.

`city`

string

optional

City where the status occurred.

`province`

string

optional

Province or region where the status occurred.

`postal_code`

string

optional

Postal code where the status occurred.

`country`

string

optional

Two-letter country code where the status occurred.

PUT
`/v1/tracking-statuses/:id`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/tracking-statuses/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "country": "SG"
}'
```

200

OK

```
{
  "id": "<string>",
  "status": "<string>",
  "details": "<string>",
  "code": "<string>",
  "tracking_number": "<string>",
  "city": "<string>",
  "province": "<string>",
  "postal_code": "<string>",
  "country": "<string>",
  "location": "<string>",
  "updated_at": "<string>",
  "created_at": "<string>"
}
```

GET
`/v1/tracking-statuses/:id`

## [Retrieve a Tracking Status](#retrieve-a-tracking-status)

Retrieve a Tracking Status.

GET
`/v1/tracking-statuses/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/tracking-statuses/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "id": "<string>",
  "status": "<string>",
  "details": "<string>",
  "code": "<string>",
  "tracking_number": "<string>",
  "city": "<string>",
  "province": "<string>",
  "postal_code": "<string>",
  "country": "<string>",
  "updated_at": "<string>",
  "created_at": "<string>"
}
```

GET
`/v1/tracking-statuses`

## [Query Tracking Statuses](#query-tracking-statuses)

List all Tracking Statuses

Query parameters

`limit`

integer

optional

Maximum number of tracking statuses to return.

`offset`

integer

optional

Number of tracking statuses to skip before returning results.

`sort`

string

optional

Sort expression for the tracking status query.

`tracking_number`

string

optional

Filters statuses by tracking number ID.

GET
`/v1/tracking-statuses`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/tracking-statuses?limit=25&tracking_number={{tracking_number_id}} \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "id": "<string>",
  "status": "<string>",
  "details": "<string>",
  "code": "<string>",
  "tracking_number": "<string>",
  "city": "<string>",
  "postal_code": "<string>",
  "country": "<string>",
  "location": "<string>",
  "updated_at": "<string>"
}
```

DELETE
`/v1/tracking-statuses/:id`

## [Delete a Tracking Status](#delete-a-tracking-status)

Delete a Tracking Status.

DELETE
`/v1/tracking-statuses/:id`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/tracking-statuses/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "id": "<string>",
  "status": "<string>",
  "details": "<string>",
  "code": "<string>",
  "tracking_number": "<string>",
  "city": "<string>",
  "province": "<string>",
  "postal_code": "<string>",
  "country": "<string>",
  "location": "<string>",
  "updated_at": "<string>",
  "created_at": "<string>"
}
```
