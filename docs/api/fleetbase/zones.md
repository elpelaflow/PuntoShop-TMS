---
title: "Zones"
url: https://fleetbase.io/docs/api/fleetbase/zones
module: api
---

# Zones

Zones define boundaries inside a service area for pricing, dispatch, and operational control. Use zones to model neighborhoods, delivery regions, restricted areas, or styled map overlays.

* [The Zone object](#the-zone-object)
* [Create a Zone

  POST
  `/v1/zones`](#create-a-zone)
* [Retrieve a zone

  GET
  `/v1/zones/:id`](#retrieve-a-zone)
* [Query Zones

  GET
  `/v1/zones`](#query-zones)
* [Update a Zone

  PUT
  `/v1/zones/:id`](#update-a-zone)
* [Delete a Zone

  DELETE
  `/v1/zones/:id`](#delete-a-zone)

## The Zone object

A zone represents a geofenced area inside a service area. It stores a center point, border geometry, display colors, geofence trigger settings, and lifecycle status.

Attributes

`id`

string

optional

Public zone identifier.

`name`

string

optional

Zone display name.

`description`

string

optional

Zone description.

`center`

object

optional

Center point for the zone.

`border`

object

optional

Zone border geometry.

`color`

string

optional

Fill color used when rendering the zone.

`stroke_color`

string

optional

Stroke color used when rendering the zone.

`status`

string

optional

Zone status.

`updated_at`

timestamp

optional

Timestamp when the zone was last updated.

`created_at`

timestamp

optional

Timestamp when the zone was created.

The
Zone
object

```
{
  "id": "zone_7YqM3KpL2n",
  "name": "Downtown",
  "description": "Downtown delivery zone",
  "center": {
    "latitude": 1.3521,
    "longitude": 103.8198
  },
  "border": [],
  "color": "#1f78ff",
  "stroke_color": "#0b4fc4",
  "status": "active",
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/zones`

## [Create a Zone](#create-a-zone)

Creates a zone inside a service area. Provide either a GeoJSON boundary or a center point with radius, and Fleetbase will store the zone for geofencing and service coverage checks.

Body parameters

`name`

string

required

Zone display name.

`service_area`

string

required

Service area ID the zone belongs to.

`border`

object

optional

Zone polygon border. Required on create unless a point location or latitude/longitude is supplied.

`location`

object

optional

Resolvable point used to create a circular zone.

`latitude`

number

optional

Decimal latitude for a circular zone. Required with
`longitude`
.

`longitude`

number

optional

Decimal longitude for a circular zone. Required with
`latitude`
.

`radius`

number

optional

Default:
`500`

Radius in meters when creating a circular zone.

`description`

string

optional

Zone description.

`color`

string

optional

Fill color used when rendering the zone.

`stroke_color`

string

optional

Stroke color used when rendering the zone.

`status`

enum

optional

Zone status. One of
`active`
,
`inactive`
.

`trigger_on_entry`

boolean

optional

Whether entering this zone should trigger geofence events.

`trigger_on_exit`

boolean

optional

Whether exiting this zone should trigger geofence events.

`dwell_threshold_minutes`

integer

optional

Minutes inside the zone before dwell behavior is triggered.

`speed_limit_kmh`

integer

optional

Speed limit in kilometers per hour for geofence events.

POST
`/v1/zones`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/zones \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Center of Singapore",
    "service_area": "{{service_area_id}}",
    "color":"#66e0ff",
    "stroke_color":"#00bfff",
    "border": {
        "type":"Polygon",
        "bbox":[103.867493,1.35085,103.912125,1.383113],
        "coordinates":[
            [
                [103.907661,1.362863],
                [103.892555,1.357714],
                [103.891525,1.353252],
                [103.883629,1.35085],
                [103.874702,1.351193],
                [103.870583,1.358744],
                [103.867493,1.368354],
                [103.870926,1.377621],
                [103.875732,1.38174],
                [103.886032,1.383113],
                [103.900452,1.383113],
                [103.909721,1.381397],
                [103.912125,1.374189],
                [103.907661,1.362863]
            ]
        ]
    }
}'
```

200

OK

```
{
  "id": "<string>",
  "service_area": "<string>",
  "name": "<string>",
  "description": "<string>",
  "coordinates": "<string>",
  "color": "<string>",
  "stroke_color": "<string>",
  "status": "<string>",
  "created_at": "<string>",
  "updated_at": "<string>"
}
```

GET
`/v1/zones/:id`

## [Retrieve a zone](#retrieve-a-zone)

Retrieves a single zone by ID. The response includes the zone geometry, display styling, and service area relationship.

GET
`/v1/zones/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/zones/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "id": "zone_bm37E57",
  "name": "Center of Singapore",
  "description": "<string>",
  "coordinates": [],
  "color": "<string>",
  "stroke_color": "<string>",
  "status": "active",
  "service_area": null,
  "updated_at": "2024-01-02T05:54:57.000000Z",
  "created_at": "2024-01-02T05:54:57.000000Z"
}
```

GET
`/v1/zones`

## [Query Zones](#query-zones)

Returns zones matching the supplied filters. Use this to find configured geofences by name or other query parameters.

Query parameters

`query`

string

optional

Search term matched against zone fields.

`limit`

integer

optional

Maximum number of zones to return.

`offset`

integer

optional

Number of zones to skip before returning results.

`sort`

string

optional

Sort expression for the zone query.

`service_area`

string

optional

Filters zones by service area ID.

GET
`/v1/zones`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/zones?name={{zone_name}} \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "id": "<string>",
  "service_area": "<string>",
  "name": "<string>",
  "description": "<string>",
  "coordinates": "<string>",
  "color": "<string>",
  "stroke_color": "<string>",
  "status": "<string>",
  "created_at": "<string>",
  "updated_at": "<string>"
}
```

PUT
`/v1/zones/:id`

## [Update a Zone](#update-a-zone)

You can update all properties of the Zone.

Body parameters

`name`

string

optional

Zone display name.

`service_area`

string

optional

Service area ID the zone belongs to.

`border`

object

optional

Zone polygon border.

`location`

object

optional

Resolvable point used to create a circular zone.

`latitude`

number

optional

Decimal latitude for a circular zone. Required with
`longitude`
.

`longitude`

number

optional

Decimal longitude for a circular zone. Required with
`latitude`
.

`radius`

number

optional

Default:
`500`

Radius in meters when updating a circular zone.

`description`

string

optional

Zone description.

`color`

string

optional

Fill color used when rendering the zone.

`stroke_color`

string

optional

Stroke color used when rendering the zone.

`status`

enum

optional

Zone status. One of
`active`
,
`inactive`
.

`trigger_on_entry`

boolean

optional

Whether entering this zone should trigger geofence events.

`trigger_on_exit`

boolean

optional

Whether exiting this zone should trigger geofence events.

`dwell_threshold_minutes`

integer

optional

Minutes inside the zone before dwell behavior is triggered.

`speed_limit_kmh`

integer

optional

Speed limit in kilometers per hour for geofence events.

PUT
`/v1/zones/:id`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/zones/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "color": "#ff00000"
}'
```

200

OK

```
{
  "id": "<string>",
  "service_area": "<string>",
  "name": "<string>",
  "description": "<string>",
  "coordinates": "<string>",
  "color": "<string>",
  "stroke_color": "<string>",
  "status": "<string>",
  "created_at": "<string>",
  "updated_at": "<string>"
}
```

DELETE
`/v1/zones/:id`

## [Delete a Zone](#delete-a-zone)

Use this endpoint to delete a zone.

DELETE
`/v1/zones/:id`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/zones/:id \
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
