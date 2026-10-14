---
title: "Vendors"
url: https://fleetbase.io/docs/api/fleetbase/vendors
module: api
---

# Vendors

Vendors represent external service providers, carriers, or partners that can support fulfillment. Use vendors to model third-party capacity, contact details, and service relationships.

* [The Vendor object](#the-vendor-object)
* [Create a Vendor

  POST
  `/v1/vendors`](#create-a-vendor)
* [Retrieve a Vendor

  GET
  `/v1/vendors/:id`](#retrieve-a-vendor)
* [Update a Vendor

  PUT
  `/v1/vendors/:id`](#update-a-vendor)
* [Query Vendors

  GET
  `/v1/vendors`](#query-vendors)
* [Delete a Vendor

  DELETE
  `/v1/vendors/:id`](#delete-a-vendor)

## The Vendor object

A vendor represents a third-party company or provider that can be assigned to FleetOps resources and facilitator workflows.

Attributes

`id`

string

optional

Public vendor identifier.

`internal_id`

string

optional

Optional internal identifier.

`business_id`

string

optional

Business identifier associated with the vendor.

`name`

string

optional

Vendor display name.

`email`

string

optional

Vendor email address.

`phone`

string

optional

Vendor phone number.

`logo_url`

string

optional

Vendor logo URL.

`photo_url`

string

optional

Vendor photo URL.

`place`

object

optional

Primary vendor place, when loaded.

`places`

array of objects

optional

Places associated with the vendor, when loaded.

`personnels`

array of objects

optional

Personnel contacts associated with the vendor, when loaded.

`country`

string

optional

Vendor country code.

`type`

string

optional

Vendor type.

`meta`

object

optional

Additional vendor metadata.

`status`

string

optional

Vendor lifecycle status.

`slug`

string

optional

URL-friendly vendor slug.

`website_url`

string

optional

Vendor website URL.

`updated_at`

timestamp

optional

Timestamp when the vendor was last updated.

`created_at`

timestamp

optional

Timestamp when the vendor was created.

The
Vendor
object

```
{
  "id": "vendor_8Qw2YxM3Nf",
  "internal_id": "VEND-1001",
  "business_id": null,
  "name": "ABC Corporation",
  "email": "abc@example.com",
  "phone": "1234567890",
  "logo_url": null,
  "photo_url": null,
  "place": null,
  "places": [],
  "personnels": [],
  "country": null,
  "type": "Supplier",
  "meta": {},
  "status": "active",
  "slug": "abc-corporation",
  "website_url": null,
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/vendors`

## [Create a Vendor](#create-a-vendor)

Creates a vendor for the current company. Vendors can be assigned to orders, vehicles, drivers, places, and facilitator workflows.

Body parameters

`name`

string

required

Vendor display name.

`type`

string

required

Vendor type.

`email`

string

optional

Vendor email address.

`phone`

string

optional

Vendor phone number.

`address`

string

optional

Place ID to use as the vendor's primary address.

`meta`

object

optional

Additional vendor metadata.

POST
`/v1/vendors`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/vendors \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
  "name": "ABC Corporation",
  "type": "Supplier",
  "email": "abc@example.com",
  "phone": "1234567890"
}'
```

200

OK

```
{
  "id": "<string>",
  "internal_id": "<string>",
  "name": "<string>",
  "email": "<string>",
  "phone_number": "<string>",
  "phone_country_code": "<string>",
  "address": "<string>",
  "type": "<string>",
  "slug": "<string>",
  "updated_at": "<string>",
  "created_at": "<string>"
}
```

GET
`/v1/vendors/:id`

## [Retrieve a Vendor](#retrieve-a-vendor)

This endpoint allows you to retrieve a vendor object to view it's details.

GET
`/v1/vendors/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/vendors/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "id": "<string>",
  "internal_id": "<string>",
  "name": "<string>",
  "email": "<string>",
  "phone_number": "<string>",
  "phone_country_code": "<string>",
  "address": "<string>",
  "type": "<string>",
  "slug": "<string>",
  "updated_at": "<string>",
  "created_at": "<string>"
}
```

PUT
`/v1/vendors/:id`

## [Update a Vendor](#update-a-vendor)

Updates a vendor's profile, primary address, type, contact fields, or metadata.

Body parameters

`name`

string

optional

Vendor display name.

`type`

string

optional

Vendor type.

`email`

string

optional

Vendor email address.

`phone`

string

optional

Vendor phone number.

`address`

string

optional

Place ID to use as the vendor's primary address.

`meta`

object

optional

Additional vendor metadata.

PUT
`/v1/vendors/:id`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/vendors/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "ABC Corporation",
    "type": "Supplier",
    "email": "abc@example.com",
    "phone": "1234567890"
}'
```

200

OK

```
{
  "id": "<string>",
  "name": "<string>",
  "internal_id": "<string>",
  "email": "<string>",
  "phone_number": "<string>",
  "phone_country_code": "<string>",
  "address": "<string>",
  "type": "<string>",
  "slug": "<string>",
  "created_at": "<string>",
  "updated_at": "<string>"
}
```

GET
`/v1/vendors`

## [Query Vendors](#query-vendors)

Returns vendors for the current company. Use search, pagination, and sort parameters to narrow the result set.

Query parameters

`id`

string

optional

Vendor ID filter used by this request example.

`query`

string

optional

Search term matched against vendor fields.

`limit`

integer

optional

Maximum number of vendors to return.

`offset`

integer

optional

Number of vendors to skip before returning results.

`sort`

string

optional

Sort expression for the vendor query.

GET
`/v1/vendors`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/vendors?id={{vendor_id}} \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "id": "<string>",
  "internal_id": "<string>",
  "name": "<string>",
  "email": "<string>",
  "phone_number": "<string>",
  "phone_country_code": "<string>",
  "address": "<string>",
  "type": "<string>",
  "slug": "<string>",
  "updated_at": "<string>",
  "created_at": "<string>"
}
```

DELETE
`/v1/vendors/:id`

## [Delete a Vendor](#delete-a-vendor)

Use this endpoint to delete a vendor.

DELETE
`/v1/vendors/:id`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/vendors/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "id": "<string>",
  "internal_id": "<string>",
  "name": "<string>",
  "email": "<string>",
  "phone_number": "<string>",
  "phone_country_code": "<string>",
  "address": "<string>",
  "type": "<string>",
  "slug": "<string>",
  "updated_at": "<string>",
  "created_at": "<string>"
}
```
