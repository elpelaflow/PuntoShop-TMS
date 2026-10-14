---
title: "Geofences"
url: https://fleetbase.io/docs/api/fleetbase/geofences
module: api
---

# Geofences

Geofences detect when tracked resources enter or leave defined geographic areas. Use geofence endpoints to monitor location-based events around depots, service areas, customer sites, and operational zones.

* [List Geofence Events

  GET
  `/v1/geofences/events`](#list-geofence-events)
* [Get Geofence Inventory

  GET
  `/v1/geofences/inventory`](#get-geofence-inventory)
* [Get Geofence Dwell Report

  GET
  `/v1/geofences/dwell-report`](#get-geofence-dwell-report)
* [Get Driver Geofence History

  GET
  `/v1/geofences/driver/:driverId/history`](#get-driver-geofence-history)

GET
`/v1/geofences/events`

## [List Geofence Events](#list-geofence-events)

List Geofence Events

Query parameters

`per_page`

integer

optional

Number of geofence event records to return per page.

`event_type`

string

optional

Filters geofence events by event type.

GET
`/v1/geofences/events`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/geofences/events?per_page=50&event_type=entered \
  -H "Authorization: Bearer flb_live_…"
```

GET
`/v1/geofences/inventory`

## [Get Geofence Inventory](#get-geofence-inventory)

Get Geofence Inventory

GET
`/v1/geofences/inventory`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/geofences/inventory \
  -H "Authorization: Bearer flb_live_…"
```

GET
`/v1/geofences/dwell-report`

## [Get Geofence Dwell Report](#get-geofence-dwell-report)

Get Geofence Dwell Report

Query parameters

`from`

timestamp

optional

Start of the dwell report time range.

`to`

timestamp

optional

End of the dwell report time range.

GET
`/v1/geofences/dwell-report`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/geofences/dwell-report?from={{from_datetime}}&to={{to_datetime}} \
  -H "Authorization: Bearer flb_live_…"
```

GET
`/v1/geofences/driver/:driverId/history`

## [Get Driver Geofence History](#get-driver-geofence-history)

Get Driver Geofence History

Query parameters

`per_page`

integer

optional

Number of geofence history records to return per page.

GET
`/v1/geofences/driver/:driverId/history`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/geofences/driver/:driverId/history?per_page=50 \
  -H "Authorization: Bearer flb_live_…"
```
