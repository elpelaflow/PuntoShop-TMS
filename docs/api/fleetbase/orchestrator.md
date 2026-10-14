---
title: "Orchestrator"
url: https://fleetbase.io/docs/api/fleetbase/orchestrator
module: api
---

# Orchestrator

Orchestrator endpoints generate and commit FleetOps resource assignment plans. All resource identifiers accepted and returned by the consumable API are public IDs.
`POST /orchestrator/run` supports route-aware VROOM allocation, VROOM capacity-only allocation, native Fleetbase capacity-only allocation, driver assignment, route optimization, and multi-phase prior-assignment flows.
Capacity-only allocation is for clients who need to answer which vehicles can carry selected orders by weight, volume, pallet count, parcel count, skills, and task limits without relying on vehicle GPS positions. VROOM capacity-only allocation supports `vehicle\_packing` to prefer fewer, fuller vehicles.

* [Run Orchestrator

  POST
  `/v1/orchestrator/run`](#run-orchestrator)
* [Commit Orchestrator Plan

  POST
  `/v1/orchestrator/commit`](#commit-orchestrator-plan)

POST
`/v1/orchestrator/run`

## [Run Orchestrator](#run-orchestrator)

Runs an orchestration phase and returns a proposed assignment plan without committing changes. Use
`options.engine`
to force an engine:
`greedy`
and
`capacity`
are built in and need no external service, while
`vroom`
requires a reachable VROOM instance. Omitting
`options.engine`
uses the orchestrator engine configured in admin settings, which defaults to
`greedy`
.

For normal route-aware VROOM allocation, send
`options.engine: "vroom"`
and omit
`allocation_strategy`
or set it to
`route_aware`
. Vehicles must have usable positions because VROOM will solve against route coordinates.

For capacity-only VROOM allocation, send
`options.engine: "vroom"`
and
`options.allocation_strategy: "capacity_only"`
. This mode answers which vehicles can carry the selected orders by weight, volume, pallets, parcels, skills, and task limits without requiring vehicle locations. Use
`options.vehicle_packing: "minimize_vehicles"`
to bias VROOM toward filling feasible vehicles before opening another vehicle; use
`balanced`
or
`none`
to disable that packing bias.

For Fleetbase's deterministic built-in capacity allocation, send
`options.engine: "capacity"`
. This native engine is useful as a fallback and debugging baseline for capacity-only allocation without VROOM.

The consumable API accepts and returns public IDs only. Use
`order_ids`
,
`vehicle_ids`
,
`driver_ids`
,
`prior_assignments.*_id`
, and response
`*_id`
values as public IDs. Do not submit internal UUIDs.

POST
`/v1/orchestrator/run`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/orchestrator/run \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
  "mode": "assign_vehicles",
  "order_ids": ["{{order_id}}"],
  "vehicle_ids": ["{{vehicle_id}}"],
  "driver_ids": [],
  "prior_assignments": [],
  "options": {
    "engine": "greedy",
    "allocation_strategy": "route_aware",
    "geometry": false,
    "respect_capacity": true,
    "respect_skills": true,
    "return_to_depot": false
  }
}'
```

Other ways to call this

* Single-phase VROOM Allocation
* VROOM Capacity Only Allocation
* Native Capacity Allocation
* Multi-phase Prior Assignments

200

OK

```
{
  "assignments": [
    {
      "order_id": "order_7YqM3KpL2n",
      "vehicle_id": "vehicle_Q1w2E3r4T5",
      "driver_id": null,
      "sequence": 1,
      "arrival": 1778918400,
      "duration": 900,
      "distance": 4200
    },
    {
      "order_id": "order_8AkN4LqP9x",
      "vehicle_id": "vehicle_A9s8D7f6G5",
      "driver_id": null,
      "sequence": 1,
      "arrival": 1778919300,
      "duration": 780,
      "distance": 3600
    }
  ],
  "unassigned": [],
  "summary": {
    "engine": "vroom",
    "allocation_strategy": "route_aware",
    "cost": 7800,
    "routes": 2,
    "unassigned": 0,
    "duration": 1680,
    "distance": 7800
  }
}
```

POST
`/v1/orchestrator/commit`

## [Commit Orchestrator Plan](#commit-orchestrator-plan)

Commits a proposed orchestrator plan by creating manifests and applying vehicle and driver assignments to orders. Assignment records must use public resource IDs.

This endpoint is engine-agnostic: commit the
`assignments`
returned by route-aware VROOM, VROOM capacity-only, native capacity-only, or multi-phase orchestration runs. Do not submit internal UUIDs or database IDs.

Body parameters

`scheduled_date`

date

optional

Manifest scheduled date. Defaults to the current date when omitted.

`assignments`

array of objects

optional

Proposed assignment records to commit. All IDs are public resource IDs.

`order_id`

string

optional

Public order ID.

`vehicle_id`

string

optional

Public vehicle ID.

`driver_id`

string

optional

Public driver ID, when a driver is assigned.

`sequence`

integer

optional

Stop sequence for the order within the vehicle route.

`arrival`

integer

optional

Estimated arrival time as a Unix timestamp.

`duration`

integer

optional

Duration from the previous stop in seconds.

`distance`

integer

optional

Distance from the previous stop in meters.

`waypoint_sequence`

array of strings

optional

Optional ordered waypoint public IDs for multi-stop route updates.

POST
`/v1/orchestrator/commit`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/orchestrator/commit \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
  "scheduled_date": "2026-05-16",
  "assignments": [
    {
      "order_id": "{{order_id}}",
      "vehicle_id": "{{vehicle_id}}",
      "driver_id": "{{driver_id}}",
      "sequence": 1,
      "arrival": 1778918400,
      "duration": 900,
      "distance": 4200
    }
  ]
}'
```

Other ways to call this

* OK

200

OK

```
{
  "committed": [
    "order_7YqM3KpL2n"
  ],
  "failed": [],
  "manifests": [
    "manifest_P9qR8sT7uV"
  ]
}
```
