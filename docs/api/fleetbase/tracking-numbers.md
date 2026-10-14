---
title: "Tracking Numbers"
url: https://fleetbase.io/docs/api/fleetbase/tracking-numbers
module: api
---

# Tracking Numbers

Tracking numbers identify shipments, payloads, and scannable workflow artifacts. Use tracking number endpoints to create identifiers, decode QR data, and attach trackable references to operations.

* [The Tracking Number object](#the-tracking-number-object)
* [Create a Tracking Number

  POST
  `/v1/tracking-numbers`](#create-a-tracking-number)
* [Decode Tracking Number QR

  POST
  `/v1/tracking-numbers/from-qr`](#decode-tracking-number-qr)
* [Retrieve a Tracking Number

  GET
  `/v1/tracking-numbers/:id`](#retrieve-a-tracking-number)
* [Query Tracking Numbers

  GET
  `/v1/tracking-numbers`](#query-tracking-numbers)
* [Delete a Tracking Number

  DELETE
  `/v1/tracking-numbers/:id`](#delete-a-tracking-number)

## The Tracking Number object

A tracking number links a generated tracking code to an order or entity. It exposes the current tracking status, QR and barcode assets, console tracking URL, and owner type.

Attributes

`id`

string

optional

Public tracking number identifier.

`tracking_number`

string

optional

Generated tracking code.

`subject`

string

optional

Public ID of the owning order or entity.

`region`

string

optional

Region used for the tracking number.

`status`

string

optional

Latest human-readable status.

`status_code`

string

optional

Latest machine-readable status code.

`qr_code`

string

optional

QR code asset URL or data.

`barcode`

string

optional

Barcode asset URL or data.

`url`

string

optional

Tracking URL.

`type`

string

optional

Owner resource type.

`updated_at`

timestamp

optional

Timestamp when the tracking number was last updated.

`created_at`

timestamp

optional

Timestamp when the tracking number was created.

The
Tracking Number
object

```
{
  "id": "tracking_3Nf8Qw2YxM",
  "tracking_number": "FB-1001",
  "subject": "order_7YqM3KpL2n",
  "region": "US",
  "status": "Created",
  "status_code": "created",
  "qr_code": "https://api.fleetbase.io/qr/FB-1001",
  "barcode": "https://api.fleetbase.io/barcode/FB-1001",
  "url": "https://console.fleetbase.io/track-order/FB-1001",
  "type": "order",
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/tracking-numbers`

## [Create a Tracking Number](#create-a-tracking-number)

This endpoint allows you to retrieve a tracking-number object to view it's details.

Body parameters

`region`

string

required

Region code used when generating the tracking number.

`owner`

string

required

Order or entity ID that owns the tracking number.

`type`

enum

optional

Region granularity used when generating the tracking number. One of
`city`
,
`province`
,
`country`
.

`status`

enum

optional

Initial tracking number status. One of
`active`
,
`inactive`
.

POST
`/v1/tracking-numbers`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/tracking-numbers \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "region": "SG",
    "owner": "{{order_id}}"
}'
```

200

OK

```
{
  "id": "<string>",
  "name": "<string>",
  "type": "<string>",
  "latitude": "<string>",
  "longitude": "<string>",
  "status": "<string>",
  "updated_at": "<string>",
  "created_at": "<string>"
}
```

POST
`/v1/tracking-numbers/from-qr`

## [Decode Tracking Number QR](#decode-tracking-number-qr)

Decodes a tracking/entity/order QR code UUID and returns the matching resource.

Body parameters

`code`

string

required

QR code UUID to resolve into its matching order, entity, or tracking resource.

POST
`/v1/tracking-numbers/from-qr`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/tracking-numbers/from-qr \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "code": "{{qr_code}}"
}'
```

GET
`/v1/tracking-numbers/:id`

## [Retrieve a Tracking Number](#retrieve-a-tracking-number)

This endpoint allows you to retrieve a tracking-number object to view it's details.

GET
`/v1/tracking-numbers/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/tracking-numbers/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "id": "<string>",
  "name": "<string>",
  "type": "<string>",
  "latitude": "<string>",
  "longitude": "<string>",
  "status": "<string>",
  "updated_at": "<string>",
  "created_at": "<string>"
}
```

GET
`/v1/tracking-numbers`

## [Query Tracking Numbers](#query-tracking-numbers)

This endpoint allows you to query tracking-numbers you have created, it also provides paginated results on all the tracking-numbers in your Fleetbase.

Query parameters

`query`

string

optional

Search term matched against tracking number fields.

`limit`

integer

optional

Maximum number of tracking numbers to return.

`offset`

integer

optional

Number of tracking numbers to skip before returning results.

`sort`

string

optional

Sort expression for the tracking number query.

`owner`

string

optional

Filters tracking numbers by owner order or entity ID.

`status`

string

optional

Filters tracking numbers by latest status.

GET
`/v1/tracking-numbers`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/tracking-numbers?query=SG&limit=25&offset=0&sort=created_at \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "id": "<string>",
  "name": "<string>",
  "type": "<string>",
  "latitude": "<string>",
  "longitude": "<string>",
  "status": "<string>",
  "updated_at": "<string>",
  "created_at": "<string>"
}
```

DELETE
`/v1/tracking-numbers/:id`

## [Delete a Tracking Number](#delete-a-tracking-number)

Deletes a tracking number by ID.

DELETE
`/v1/tracking-numbers/:id`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/tracking-numbers/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "id": "<string>",
  "name": "<string>",
  "type": "<string>",
  "latitude": "<string>",
  "longitude": "<string>",
  "status": "<string>",
  "updated_at": "<string>",
  "created_at": "<string>"
}
```
