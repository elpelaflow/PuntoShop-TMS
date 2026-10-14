---
title: "Service Areas"
url: https://fleetbase.io/docs/api/fleetbase/service-areas
module: api
---

# Service Areas

Service areas define the geographic regions where a fleet, vendor, or transport service operates. Use service areas to constrain availability, pricing, routing, and dispatch behavior by region.

* [The Service Area object](#the-service-area-object)
* [Create a Service Area

  POST
  `/v1/service-areas`](#create-a-service-area)
* [Retrieve a Service Area

  GET
  `/v1/service-areas/:id`](#retrieve-a-service-area)
* [Query Service Areas

  GET
  `/v1/service-areas`](#query-service-areas)
* [Update a Service Area

  PUT
  `/v1/service-areas/:id`](#update-a-service-area)
* [Delete a Service Area

  DELETE
  `/v1/service-areas/:id`](#delete-a-service-area)

## The Service Area object

A service area defines an operating region. It stores a center point, border geometry, type, status, and optional loaded zones.

Attributes

`id`

string

optional

Public service area identifier.

`name`

string

optional

Service area display name.

`type`

string

optional

Service area type.

`center`

object

optional

Center point for the service area.

`border`

object

optional

Service area border geometry.

`zones`

array of objects

optional

Zones loaded with the service area.

`status`

string

optional

Service area status.

`updated_at`

timestamp

optional

Timestamp when the service area was last updated.

`created_at`

timestamp

optional

Timestamp when the service area was created.

The
Service Area
object

```
{
  "id": "service_area_4Mnp8Qx2Vz",
  "name": "Singapore",
  "type": "country",
  "center": {
    "latitude": 1.3521,
    "longitude": 103.8198
  },
  "border": [],
  "zones": [],
  "status": "active",
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/service-areas`

## [Create a Service Area](#create-a-service-area)

A service area is created by simply providing a city, province or country in which Fleetbase will reverse geocode into a service area.

If the service area cannot be reverse geocoded, Fleetbase will return an error.

Body parameters

`name`

string

required

Service area display name.

`country`

string

required

Country code or country name for the service area.

`type`

string

optional

Service area type.

`status`

enum

optional

Service area status. One of
`active`
,
`inactive`
.

`border`

object

optional

Service area polygon border. Required on create unless a point location or latitude/longitude is supplied.

`location`

object

optional

Resolvable point used to create a circular service area.

`latitude`

number

optional

Decimal latitude for a circular service area. Required with
`longitude`
.

`longitude`

number

optional

Decimal longitude for a circular service area. Required with
`latitude`
.

`radius`

number

optional

Default:
`500`

Radius in meters when creating a circular service area.

`parent`

string

optional

Parent service area ID.

`color`

string

optional

Fill color used when rendering the service area.

`stroke_color`

string

optional

Stroke color used when rendering the service area.

`trigger_on_entry`

boolean

optional

Whether entering this service area should trigger geofence events.

`trigger_on_exit`

boolean

optional

Whether exiting this service area should trigger geofence events.

`dwell_threshold_minutes`

integer

optional

Minutes inside the service area before dwell behavior is triggered.

`speed_limit_kmh`

integer

optional

Speed limit in kilometers per hour for geofence events.

POST
`/v1/service-areas`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/service-areas \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Singapore",
    "type": "city",
    "latitude": "1.3521",
    "longitude": "103.8198",
    "radius": "30000",
    "country": "SG",
    "status": "active"
}'
```

Other ways to call this

* Create a Service Area using GeoJSON Point

GET
`/v1/service-areas/:id`

## [Retrieve a Service Area](#retrieve-a-service-area)

This endpoint allows you to retrieve a service area object to view it's details.

GET
`/v1/service-areas/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/service-areas/:id \
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
`/v1/service-areas`

## [Query Service Areas](#query-service-areas)

Returns service areas matching the supplied filters. Use this to find configured operating regions by name or other query parameters.

Query parameters

`query`

string

optional

Search term matched against service area fields.

`limit`

integer

optional

Maximum number of service areas to return.

`offset`

integer

optional

Number of service areas to skip before returning results.

`sort`

string

optional

Sort expression for the service area query.

`country`

string

optional

Filters service areas by country.

GET
`/v1/service-areas`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/service-areas?name={{service_area_name}} \
  -H "Authorization: Bearer flb_live_…"
```

PUT
`/v1/service-areas/:id`

## [Update a Service Area](#update-a-service-area)

You are only able to update the service area status

Body parameters

`name`

string

optional

Service area display name.

`country`

string

optional

Country code or country name for the service area.

`type`

string

optional

Service area type.

`status`

enum

optional

Service area status. One of
`active`
,
`inactive`
.

`border`

object

optional

Service area polygon border.

`location`

object

optional

Resolvable point used to create a circular service area.

`latitude`

number

optional

Decimal latitude for a circular service area. Required with
`longitude`
.

`longitude`

number

optional

Decimal longitude for a circular service area. Required with
`latitude`
.

`radius`

number

optional

Default:
`500`

Radius in meters when updating a circular service area.

`parent`

string

optional

Parent service area ID.

`color`

string

optional

Fill color used when rendering the service area.

`stroke_color`

string

optional

Stroke color used when rendering the service area.

`trigger_on_entry`

boolean

optional

Whether entering this service area should trigger geofence events.

`trigger_on_exit`

boolean

optional

Whether exiting this service area should trigger geofence events.

`dwell_threshold_minutes`

integer

optional

Minutes inside the service area before dwell behavior is triggered.

`speed_limit_kmh`

integer

optional

Speed limit in kilometers per hour for geofence events.

PUT
`/v1/service-areas/:id`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/service-areas/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "status": "active"
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

DELETE
`/v1/service-areas/:id`

## [Delete a Service Area](#delete-a-service-area)

Use this endpoint to delete a service area, deleting a service area will also delete all of the zones within the service area.

DELETE
`/v1/service-areas/:id`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/service-areas/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{}
```
