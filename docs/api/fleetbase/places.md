---
title: "Places"
url: https://fleetbase.io/docs/api/fleetbase/places
module: api
---

# Places

Places represent physical locations used across routing, dispatch, contacts, stores, and orders. A place can be a street address, landmark, facility, or any coordinate-backed location Fleetbase can route to.

* [The Place object](#the-place-object)
* [Create a Place

  POST
  `/v1/places`](#create-a-place)
* [Query Places

  GET
  `/v1/places`](#query-places)
* [Search Places

  GET
  `/v1/places/search`](#search-places)
* [List all Places

  GET
  `/v1/places`](#list-all-places)
* [Retrieve a Place

  GET
  `/v1/places/:id`](#retrieve-a-place)
* [Update a Place

  PUT
  `/v1/places/:id`](#update-a-place)
* [Delete a Place

  DELETE
  `/v1/places/:id`](#delete-a-place)

## The Place object

A place represents a physical location used by FleetOps resources such as orders, payloads, vendors, contacts, and waypoints. It stores geocoded coordinates, address fields, ownership, contact details, and metadata.

Attributes

`id`

string

optional

Public place identifier.

`name`

string

optional

Display name for the place.

`location`

object

optional

Geospatial coordinates for the place.

`address`

string

optional

Formatted address for the place.

`avatar_url`

string

optional

Avatar URL associated with the place.

`street1`

string

optional

Primary street address.

`street2`

string

optional

Secondary street address.

`city`

string

optional

City or locality.

`province`

string

optional

State, province, or region.

`postal_code`

string

optional

Postal or ZIP code.

`neighborhood`

string

optional

Neighborhood or local area.

`district`

string

optional

District or administrative subdivision.

`building`

string

optional

Building name, number, or additional address detail.

`security_access_code`

string

optional

Access code or delivery instructions needed to enter the building.

`country`

string

optional

Country code.

`phone`

string

optional

Phone number associated with the place.

`owner`

object

optional

Contact or vendor resource that owns the place, when loaded.

`tracking_number`

object

optional

Tracking number associated with the place, when loaded.

`type`

string

optional

Place classification.

`meta`

object

optional

Additional place metadata.

`eta`

object

optional

Estimated arrival data when route ETA is requested.

`updated_at`

timestamp

optional

Timestamp when the place was last updated.

`created_at`

timestamp

optional

Timestamp when the place was created.

The
Place
object

```
{
  "id": "place_1A2b3C4d5E",
  "name": "Central Park",
  "location": {
    "latitude": 40.785091,
    "longitude": -73.968285
  },
  "address": "830 5th Ave, New York, NY 10065, USA",
  "avatar_url": null,
  "street1": "830 5th Ave",
  "street2": null,
  "city": "New York",
  "province": "New York",
  "postal_code": "10065",
  "neighborhood": "Manhattan",
  "district": "Midtown",
  "building": "Park Area",
  "security_access_code": null,
  "country": "US",
  "phone": "+12123106600",
  "type": "park",
  "meta": {},
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/places`

## [Create a Place](#create-a-place)

Creates a place for the current company. Provide structured address fields, a free-form
`address`
or
`street1`
value to geocode, or coordinates for Fleetbase to reverse geocode.

Body parameters

`name`

string

optional

Display name for the place. Required on create unless address, street, or coordinates are enough for Fleetbase to geocode the place.

`address`

string

optional

Address string to geocode into a place when structured address fields are not supplied.

`street1`

string

optional

Primary street address. Required on create unless address or coordinates are supplied.

`street2`

string

optional

Secondary street address.

`city`

string

optional

City or locality for the address.

`province`

string

optional

State, province, or region for the address.

`postal_code`

string

optional

Postal or ZIP code for the address.

`neighborhood`

string

optional

Neighborhood or local area for the address.

`district`

string

optional

District or administrative subdivision for the address.

`building`

string

optional

Building name, number, or additional address detail.

`security_access_code`

string

optional

Access code or delivery instructions needed to enter the building.

`country`

string

optional

Country code for the address.

`phone`

string

optional

Phone number associated with the place.

`location`

object

optional

Resolvable point used as the place location. Fleetbase accepts supported coordinate formats and reverse geocodes missing address fields.

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

`owner`

string

optional

Contact or vendor ID that owns the place.

`customer`

string

optional

Contact or vendor ID to assign as the place owner.

`contact`

string

optional

Contact or vendor ID to assign as the place owner.

`vendor`

string

optional

Vendor ID to assign as the place owner.

`type`

string

optional

Place classification.

`meta`

object

optional

Additional place metadata.

POST
`/v1/places`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/places \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
  "name": "Central Park",
  "street1": "830 5th Ave",
  "city": "New York",
  "province": "New York",
  "postal_code": "10065",
  "neighborhood": "Manhattan",
  "district": "Midtown",
  "building": "Park Area",
  "country": "US",
  "phone": "+12123106600",
  "type": "Park"
}'
```

Other ways to call this

* Create a Place using Coordinates
* Create a Place using Coordinates Array
* Create a Place using GeoJSON Point
* Create a Place using Street Address Only

GET
`/v1/places`

## [Query Places](#query-places)

Searches and filters places for the current organization. Use query and pagination parameters to find matching saved locations.

Query parameters

`query`

string

optional

Search term matched against place fields.

`limit`

integer

optional

Maximum number of places to return.

`offset`

integer

optional

Number of places to skip before returning results.

`sort`

string

optional

Sort expression for the place query.

`vendor`

string

optional

Vendor ID used to filter places owned by a vendor.

GET
`/v1/places`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/places?query={{place_name}}&limit=25&offset=<string>&sort=created_at \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

GET
`/v1/places/search`

## [Search Places](#search-places)

Searches places by free-form query and optional lat/lng locale context.

Query parameters

`query`

string

required

Free-form search text matched against place name and address fields.

`ll`

string

optional

Latitude/longitude context used to rank or localize search results.

`locale`

string

optional

Locale hint used for place search.

`limit`

integer

optional

Default:
`10`

Maximum number of matching places to return.

`geo`

boolean

optional

When true, enables geospatial search behavior.

`latitude`

number

optional

Latitude context for geospatial search.

`longitude`

number

optional

Longitude context for geospatial search.

GET
`/v1/places/search`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/places/search?query={{place_query}}&ll={{place_ll}}&locale={{locale}} \
  -H "Authorization: Bearer flb_live_…"
```

GET
`/v1/places`

## [List all Places](#list-all-places)

Returns a paginated list of places for the current organization. Places are sorted by creation date unless another sort order is provided.

Query parameters

`limit`

integer

optional

Maximum number of places to return.

`offset`

integer

optional

Number of places to skip before returning results.

`sort`

string

optional

Sort expression for the place list.

GET
`/v1/places`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/places?limit=25&offset=0&sort=created_at \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

GET
`/v1/places/:id`

## [Retrieve a Place](#retrieve-a-place)

This endpoint allows you to retrieve a place object to view it's details.

GET
`/v1/places/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/places/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

PUT
`/v1/places/:id`

## [Update a Place](#update-a-place)

Updates a place by setting the fields included in the request. Send address fields, coordinates, owner assignment, type, phone, or metadata to change only those values.

Body parameters

`name`

string

optional

Display name for the place.

`street1`

string

optional

Primary street address.

`street2`

string

optional

Secondary street address.

`city`

string

optional

City or locality for the address.

`province`

string

optional

State, province, or region for the address.

`postal_code`

string

optional

Postal or ZIP code for the address.

`neighborhood`

string

optional

Neighborhood or local area for the address.

`district`

string

optional

District or administrative subdivision for the address.

`building`

string

optional

Building name, number, or additional address detail.

`security_access_code`

string

optional

Access code or delivery instructions needed to enter the building.

`country`

string

optional

Country code for the address.

`phone`

string

optional

Phone number associated with the place.

`location`

object

optional

Resolvable point used as the place location.

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

`owner`

string

optional

Contact or vendor ID that owns the place.

`vendor`

string

optional

Vendor ID to assign as the place owner.

`type`

string

optional

Place classification.

`meta`

object

optional

Additional place metadata.

PUT
`/v1/places/:id`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/places/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "Central Park Edit",
    "street1": "830 5th Ave a ",
    "city": "New York",
    "province": "New York",
    "postal_code": "10065",
    "neighborhood": "Manhattan",
    "district": "Midtown",
    "building": "Park Area",
    "country": "US",
    "phone": "+12123106600",
    "type": "Park"
}'
```

200

OK

```
{
  "id": "place_n0voYdE",
  "name": "Central Park Edited",
  "location": {
    "type": "Point",
    "coordinates": [
      -73.9712519,
      40.7676307
    ]
  },
  "address": "CENTRAL PARK EDITED - 830 5TH AVE, NEW YORK, 10065, UNITED STATES",
  "street1": "830 5th Ave",
  "street2": null,
  "city": "New York",
  "province": "New York",
  "postal_code": "10065",
  "neighborhood": "Manhattan",
  "district": "Midtown",
  "building": "Park Area",
  "security_access_code": null,
  "country": "US",
  "phone": null,
  "owner": null,
  "type": "Park",
  "meta": [],
  "updated_at": "2023-12-27T07:43:57.000000Z",
  "created_at": "2023-12-27T07:25:36.000000Z"
}
```

DELETE
`/v1/places/:id`

## [Delete a Place](#delete-a-place)

Permanently deletes a place. It cannot be undone.

DELETE
`/v1/places/:id`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/places/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "id": "place_n0voYdE",
  "object": "place",
  "time": "2023-12-27T07:44:36.000000Z",
  "deleted": true
}
```
