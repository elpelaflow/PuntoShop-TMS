---
title: "Order Configs"
url: https://fleetbase.io/docs/api/fleetbase/order-configs
module: api
---

# Order Configs

An Order Config defines the activity flow that orders progress through (created → dispatched → enroute → completed, etc.). Each company has at least the system default `transport` config; bespoke configs can be defined for other operating models. Use these read-only endpoints to discover the configs available to the API credential's company and to drive UI such as status filters, activity labels, and progress timelines.

* [The OrderConfig object](#the-orderconfig-object)
* [Query Order Configs

  GET
  `/v1/order-configs`](#query-order-configs)
* [Retrieve an Order Config

  GET
  `/v1/order-configs`](#retrieve-an-order-config)

## The OrderConfig object

An OrderConfig defines the activity graph (state machine) used by orders of this type. Consumers read OrderConfigs to render status filter chips, activity labels, and progress UI driven by the canonical config rather than hardcoding their own status set. The `flow` field carries the full editable graph — including conditional logic, event hooks, and child-activity links — so integrations can both display and reason about state transitions.

Attributes

`id`

string

optional

Public order-config identifier. Prefixed
`order_config_`
.

`key`

string

optional

Short identifier (e.g.
`transport`
). Stable across companies for system configs.

`name`

string

optional

Human-readable name.

`namespace`

string

optional

Fully-qualified identifier (e.g.
`system:order-config:transport`
). Unique per company.

`description`

string

optional

Free-form description.

`tags`

array of strings

optional

Free-form tags.

`status`

string

optional

Config lifecycle status. Newly created configs default to
`private`
; system configs may be
`active`
.

`version`

string

optional

Semver-style schema version (e.g.
`0.0.1`
).

`flow`

object

optional

The activity graph as an object keyed by activity code. Each value is an
**Activity**
object — a node in the order's state machine. Activities are linked via their own
`activities`
field (an array of child activity codes), forming a directed graph from
`created`
through to a terminal state (
`complete: true`
). The well-known canonical codes are
`created`
,
`dispatched`
,
`started`
,
`enroute`
,
`completed`
, and
`canceled`
.

The map's key order reflects the order activities are declared in the underlying JSON —
**not**
graph progression. To walk the workflow, start from
`flow.created`
(or whichever activity has no inbound edges) and follow each activity's
`activities`
array. Treat each activity's
`code`
(and the map key) as the stable identifier; everything else is editable through the operator console.

`key`

string

optional

Canonical activity code. Mirrors the map key and the activity's
`code`
.

`code`

string

optional

Canonical activity code (e.g.
`created`
,
`dispatched`
,
`started`
,
`enroute`
,
`completed`
,
`canceled`
). Treat this as the stable identifier when rendering UI.

`status`

string

optional

Human-readable label for the activity (e.g.
`Driver Enroute`
).

`details`

string

optional

Long-form description of what this activity represents.

`color`

string

optional

Hex colour hint for status UI (e.g.
`#1f2937`
).

`sequence`

integer

optional

Editor-managed ordering hint, used by the operator UI when laying out the graph.

`complete`

boolean

optional

`true`
for terminal activities. The order is considered complete when it reaches an activity with
`complete: true`
. Multiple activities can be terminal (e.g.
`completed`
,
`canceled`
).

`activities`

array of strings

optional

Child activity codes — the activities reachable from this one. This is the graph edge list; an empty array marks a terminal (leaf) node.

`pod_method`

string

optional

Proof-of-delivery method required at this activity. One of
`scan`
,
`signature`
,
`photo`
, or
`null`
when no POD is configured.

`require_pod`

boolean

optional

Whether proof-of-delivery must be captured before the order can advance past this activity.

`logic`

array of objects

optional

Conditional logic gates evaluated before this activity is considered reachable. Each gate has:

* `type`
  (string) —
  `and`
  ,
  `or`
  ,
  `not`
  , or
  `if`
* `conditions`
  (array of objects) — each
  `\{ field, operator, value \}`
  , where
  `operator`
  is one of
  `exists`
  ,
  `in`
  /
  `has`
  ,
  `notIn`
  /
  `doesntHave`
  ,
  `contains`
  ,
  `beginsWith`
  ,
  `endsWith`
  , or a standard comparison (
  `=`
  ,
  `!=`
  ,
  `<`
  ,
  `>`
  ,
  `<=`
  ,
  `>=`
  )
  The default transport config carries an empty
  `logic`
  array (no gating).

`events`

array of strings

optional

Event names fired when this activity is entered (e.g. notification or webhook hooks). The default transport config carries an empty
`events`
array.

`actions`

array of objects

optional

Actions wired to this activity (reserved for editor-managed handlers). The default transport config carries an empty
`actions`
array.

`options`

array of objects

optional

Activity options exposed by the operator UI. The default transport config carries an empty
`options`
array.

`entities`

array of objects

optional

Entities (parcels, packages, line items) attached specifically to this activity. Most configs carry entities at the OrderConfig level rather than per-activity, so this is typically
`[]`
.

`internalId`

string

optional

UUID assigned by the order-config editor to identify this activity instance. Stable across edits and unrelated to the public
`id`
.

`created_at`

timestamp

optional

When the config was created.

`updated_at`

timestamp

optional

When the config was last updated.

The
OrderConfig
object

```
{
  "id": "order_config_A1b2C3d4E5",
  "key": "transport",
  "name": "Transport",
  "namespace": "system:order-config:transport",
  "description": "Default order configuration for transport",
  "tags": [
    "transport",
    "delivery"
  ],
  "status": "private",
  "version": "0.0.1",
  "flow": {
    "created": {
      "key": "created",
      "code": "created",
      "color": "#1f2937",
      "logic": [],
      "events": [],
      "status": "Order Created",
      "actions": [],
      "details": "New order was created.",
      "options": [],
      "complete": false,
      "entities": [],
      "sequence": 0,
      "activities": [
        "dispatched"
      ],
      "internalId": "aac819a0-4d3f-4543-b7fa-e50804df83f1",
      "pod_method": "scan",
      "require_pod": false
    },
    "enroute": {
      "key": "enroute",
      "code": "enroute",
      "color": "#1f2937",
      "logic": [],
      "events": [],
      "status": "Driver Enroute",
      "actions": [],
      "details": "Driver is en-route.",
      "options": [],
      "complete": false,
      "entities": [],
      "sequence": 0,
      "activities": [
        "completed"
      ],
      "internalId": "5422a0c3-8683-4cc2-a4b5-4d064067cd4d",
      "pod_method": "scan",
      "require_pod": false
    },
    "started": {
      "key": "started",
      "code": "started",
      "color": "#1f2937",
      "logic": [],
      "events": [],
      "status": "Order Started",
      "actions": [],
      "details": "Order has been started",
      "options": [],
      "complete": false,
      "entities": [],
      "sequence": 0,
      "activities": [
        "enroute"
      ],
      "internalId": "b68fad7c-b09d-4161-a01c-a9a95e7f09a8",
      "pod_method": "scan",
      "require_pod": false
    },
    "completed": {
      "key": "completed",
      "code": "completed",
      "color": "#1f2937",
      "logic": [],
      "events": [],
      "status": "Order Completed",
      "actions": [],
      "details": "Order has been completed.",
      "options": [],
      "complete": true,
      "entities": [],
      "sequence": 0,
      "activities": [],
      "internalId": "8406520c-3f61-447b-8a48-d225d0f062d6",
      "pod_method": "scan",
      "require_pod": false
    },
    "dispatched": {
      "key": "dispatched",
      "code": "dispatched",
      "color": "#1f2937",
      "logic": [],
      "events": [],
      "status": "Order Dispatched",
      "actions": [],
      "details": "Order has been dispatched.",
      "options": [],
      "complete": false,
      "entities": [],
      "sequence": 0,
      "activities": [
        "started"
      ],
      "internalId": "152fa650-34d0-45d8-8b4f-e5820bde4277",
      "pod_method": "scan",
      "require_pod": false
    }
  },
  "created_at": "2026-04-01T10:00:00.000000Z",
  "updated_at": "2026-04-01T10:00:00.000000Z"
}
```

GET
`/v1/order-configs`

## [Query Order Configs](#query-order-configs)

Lists OrderConfigs available to the company resolved from the API credential.

Query parameters

`limit`

integer

optional

Page size.

`offset`

integer

optional

Page offset.

`key`

string

optional

Filter by short key (e.g.
`transport`
).

`query`

string

optional

Free-text search across config fields.

GET
`/v1/order-configs`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/order-configs \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

GET
`/v1/order-configs`

## [Retrieve an Order Config](#retrieve-an-order-config)

Fetches a single OrderConfig. The
`{id}`
segment accepts any identifier supported by
`OrderConfig::resolveFromIdentifier`
—
`uuid`
,
`public_id`
,
`namespace`
, or short
`key`
. Use
`transport`
to retrieve the system default flow.

GET
`/v1/order-configs`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/order-configs \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```
