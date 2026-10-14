---
title: "Manifests"
url: https://fleetbase.io/docs/api/fleetbase/manifests
module: api
---

# Manifests

Manifests are produced by dispatch: `POST /orchestrator/commit` creates them from a plan. This folder is ordered after Orchestrator so it has one to address.
A manifest is a driver's route: an order-agnostic sequence of stops which may span several orders, or none the driver has seen as an order.
These endpoints are for the driver running the route. Creating, cancelling and deleting a manifest is dispatch work and is not part of the consumable API.

* [The Manifest object](#the-manifest-object)
* [Retrieve a Manifest

  GET
  `/v1/manifests/:id`](#retrieve-a-manifest)
* [Optimize a Manifest

  POST
  `/v1/manifests/:id/optimize`](#optimize-a-manifest)
* [Update a Manifest Stop

  PATCH
  `/v1/manifest-stops/:id`](#update-a-manifest-stop)

## The Manifest object

A route assigned to a driver for a day, made of ordered stops.

The
Manifest
object

```
{
  "id": "manifest_7KpQ2Rx9Vz",
  "status": "in_progress",
  "scheduled_date": "2026-08-23",
  "started_at": "2026-08-23T07:12:04.000000Z",
  "completed_at": null,
  "total_distance_m": 41200,
  "total_duration_s": 5400,
  "stop_count": 8,
  "completed_stops": 3,
  "pending_stops": 5,
  "driver_name": "Ron",
  "vehicle_name": "EAS-01",
  "notes": null,
  "updated_at": "2026-08-23T09:02:00.000000Z",
  "created_at": "2026-08-23T06:40:00.000000Z"
}
```

GET
`/v1/manifests/:id`

## [Retrieve a Manifest](#retrieve-a-manifest)

Retrieves a manifest with its stops, in the sequence they are to be driven.

Each stop carries its place inline — a route of twenty stops is one request, not twenty-one — along with its status, estimated and actual arrival, and the distance and duration from the previous stop.

GET
`/v1/manifests/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/manifests/:id \
  -H "Authorization: Bearer flb_live_…"
```

POST
`/v1/manifests/:id/optimize`

## [Optimize a Manifest](#optimize-a-manifest)

Re-sequences the stops a driver has not done yet, nearest first.

This is the driver's optimise, not the orchestrator's. The orchestrator allocates orders across a fleet and produces manifests; this reorders the stops of one manifest that is already assigned.

It is a nearest-neighbour walk over road distances: from the driver's position to the closest remaining stop, then the closest from there. That is usually a large improvement on an arbitrary order and is not guaranteed optimal.

Completed and skipped stops keep their place — a route already driven is not re-planned. A manifest with fewer than three stops still to do is returned unchanged, since there is no ordering to find.

Send
`latitude`
and
`longitude`
to start the walk from where the driver actually is. Without them it starts from the first stop still to do.

Body parameters

`latitude`

number

optional

The driver's current latitude. The walk starts here when both coordinates are given.

`longitude`

number

optional

The driver's current longitude.

POST
`/v1/manifests/:id/optimize`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/manifests/:id/optimize \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "latitude": 1.3521,
  "longitude": 103.8198
}'
```

PATCH
`/v1/manifest-stops/:id`

## [Update a Manifest Stop](#update-a-manifest-stop)

Marks a stop on a manifest as arrived, completed or skipped.

Status changes run through the manifest's own transitions rather than writing a column, so arrival and completion timestamps are recorded and a manifest completes itself when its last stop does.

Any other status is refused and changes nothing.

Body parameters

`status`

string

optional

One of
`arrived`
,
`completed`
or
`skipped`
. Anything else is refused.

`meta`

object

optional

Arbitrary metadata to store against the stop, such as a note left on arrival.

PATCH
`/v1/manifest-stops/:id`

curl

JavaScript

PHP

Python

```
curl -X PATCH https://api.fleetbase.io/v1/manifest-stops/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "status": "arrived"
}'
```
