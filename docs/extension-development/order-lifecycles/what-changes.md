---
title: "What Changes"
url: https://fleetbase.io/docs/extension-development/order-lifecycles/what-changes
module: extension-development
---

Order Lifecycles

# What Changes

How Fleet-Ops' API and console behave for an order config with a configured lifecycle — creating, dispatching, updating activity, canceling, the details menu, the board and the flow editor — and what follows the dispatch lifecycle.

# What Changes

The lifecycle is applied by Fleet-Ops'
**internal API**
, the one the console uses (
`/int/v1/orders`
), and by the console itself.

**The public REST API (
`/v1/orders`
) and the Navigator app follow the dispatch lifecycle.**
They don't read
`meta.lifecycle`
: an order created through
`/v1/orders`
starts at
`created`
, and its
`dispatch`
and
`update-activity`
endpoints don't apply the lifecycle's rules. Create and move orders with a configured lifecycle from the console or your extension. See
[When to Use One](https://fleetbase.io/docs/extension-development/order-lifecycles#when-to-use-one)
.

## In the API

### Creating an Order

|  | Without a lifecycle | With a lifecycle |
| --- | --- | --- |
| **Status** | `created` , or the `status` sent | The `initial` code. A `status` sent is ignored |
| **First tracking status** | `CREATED` , "Order created" | The `initial` activity: its code as a tracking code ( `REQUESTED` ), its `status` and `details` text |
| **Dispatch** | Dispatched unless `dispatched: false` is sent | With `dispatch: false` : saved with `dispatched` and `adhoc` false, and never dispatched, whatever was sent |

### Dispatching

With
`dispatch: false`
:

* **Dispatch**
  (
  `PATCH /int/v1/orders/dispatch`
  ) returns an error: "Orders of this type are not dispatched."
* **Bulk dispatch**
  (
  `POST /int/v1/orders/bulk-dispatch`
  ) reports these orders as failed, and dispatches the rest.

### Updating Activity

With
`strict_transitions: true`
,
**Update activity**
(
`PATCH /int/v1/orders/update-activity/{id}`
) only accepts an activity that is:

1. in the config's flow;
2. listed in the current activity's
   `activities`
   ;
3. not after a terminal activity.

Anything else is rejected with a
`422`
: "This activity is not a permitted next step for the order."

When the activity is accepted, the API uses it
**as the flow defines it**
, not as the request sent it, so a client can't change an activity's label, its proof-of-delivery requirement or whether it completes the order.

Without
`strict_transitions`
, any activity is accepted, as for the dispatch lifecycle.

### Canceling and Completing

* **Cancel**
  moves the order to the
  `canceled`
  activity, and sets its status to that code, such as
  `cancelled`
  .
* The
  `completed`
  activity is the one that completes the order.

## In the Console

### The Order Details Menu

**Edit details**
,
**Update activity**
and
**Cancel order**
are disabled once the order is closed: its status is one of
`terminal`
, or the
`completed`
or
`canceled`
code.

### The Board

When the orders board is filtered to the config, its columns are the flow's activities:

* starting at
  `initial`
  and following the flow's arrows, breadth first;
* titled with each activity's
  `status`
  label;
* followed by any activities the walk doesn't reach, by
  `sequence`
  ;
* plus a column for any order status that isn't in the flow, so no order disappears.

No dispatch columns are added. A card can be dragged only to one of the order's next activities.

### The Order Config Editor

In
**Fleet-Ops → Operations → Order Config**
, for a config with a lifecycle:

* `created`
  ,
  `dispatched`
  and
  `started`
  aren't forced into the flow;
* the
  `initial`
  activity is the root: activities can be added after it, but it can't be removed;
* resetting the flow restores the config's saved flow, not the default dispatch flow.

## What Still Assumes the Dispatch Lifecycle

* The public REST API and the Navigator app (above).
* The orders list's
  **Active**
  status filter.
* The live map's active orders.
* Order metrics and dashboard counts.

See
[Server Reference](https://fleetbase.io/docs/extension-development/order-lifecycles/server-reference#limitations)
.

[Configuration

The meta.lifecycle keys — initial, completed, canceled, terminal, dispatch and strict\_transitions — with defaults, and the activity flow format a lifecycle works with.](https://fleetbase.io/docs/extension-development/order-lifecycles/configuration)
[Defining a Flow

Define an order type's flow and lifecycle in PHP, install the order config for each organization, and update it safely in later versions of your extension.](https://fleetbase.io/docs/extension-development/order-lifecycles/defining-a-flow)
