---
title: "Introduction"
url: https://fleetbase.io/docs/extension-development/order-lifecycles
module: extension-development
---

Order Lifecycles

# Introduction

A configured order lifecycle gives an order type its own activities — its own start, completion and cancellation, no dispatch, and only the transitions its flow allows — enforced by Fleet-Ops' API.

# Order Lifecycles

Every Fleet-Ops order follows the
**dispatch lifecycle**
by default: it is created, dispatched to a driver, started, and then completed or canceled. An order config's flow can add steps along the way, but
`created`
,
`dispatched`
and
`started`
are always there, and an order can be moved to any activity.

An order config can replace that with
**its own lifecycle**
, set in its
`meta.lifecycle`
:

![A rental flow: Requested, Reserved, With customer, Extended, Returned and Completed, with Cancelled reachable from Requested and Reserved; Requested is the initial activity, Completed and Cancelled are terminal](https://fleetbase.io/_next/static/media/rental-flow.2576e38c.svg)

```
{
    "initial": "requested",
    "completed": "completed",
    "canceled": "cancelled",
    "terminal": ["completed", "cancelled"],
    "dispatch": false,
    "strict_transitions": true
}
```

With this lifecycle, orders of the config:

* **start at Requested**
  , not Created;
* **are never dispatched**
  , so they never get a driver or reach the Navigator app;
* **move only along the flow's arrows**
  : from Requested, only to Reserved or Cancelled;
* **are closed**
  once they reach Completed or Cancelled.

The API enforces all of this. Configs without
`meta.lifecycle`
keep the dispatch lifecycle exactly as before.

## When to Use One

Use a configured lifecycle for order types
**managed from the console**
: rentals, loans, appointments, collections, approvals. Your team, or your extension, moves them along in Fleet-Ops.

Don't use one for orders
**a driver works in the Navigator app**
. Navigator knows the dispatch lifecycle: it expects
`created`
,
`dispatched`
and
`started`
, and offers the driver's next steps from them. An order type that needs drivers should keep the dispatch lifecycle and add its own steps to the flow instead.

## With a Presentation Profile

A lifecycle changes what an order
**does**
. An
[order presentation profile](https://fleetbase.io/docs/extension-development/order-presentation)
changes what the console
**shows**
for it: its form, details view and actions. Most order types with one have the other.

## Pages in This Section

| Page | Covers |
| --- | --- |
| [Configuration](https://fleetbase.io/docs/extension-development/order-lifecycles/configuration) | The `meta.lifecycle` keys, and the flow format |
| [What Changes](https://fleetbase.io/docs/extension-development/order-lifecycles/what-changes) | How the API and the console behave for a configured lifecycle |
| [Defining a Flow](https://fleetbase.io/docs/extension-development/order-lifecycles/defining-a-flow) | A complete flow in PHP, and installing the order config |
| [Moving Orders](https://fleetbase.io/docs/extension-development/order-lifecycles/moving-orders) | Advancing an order from the console, your engine and your server |
| [Server Reference](https://fleetbase.io/docs/extension-development/order-lifecycles/server-reference) | `OrderConfig` methods, and current limitations |

Configured lifecycles need
**Fleet-Ops 0.6.71**
or later.

[Troubleshooting

Why an order presentation profile doesn't apply, a section is missing or empty, a field or action still shows, or a value survives a type switch — and how to fix each.](https://fleetbase.io/docs/extension-development/order-presentation/reference/troubleshooting)
[Configuration

The meta.lifecycle keys — initial, completed, canceled, terminal, dispatch and strict\_transitions — with defaults, and the activity flow format a lifecycle works with.](https://fleetbase.io/docs/extension-development/order-lifecycles/configuration)
