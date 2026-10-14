---
title: "Moving Orders"
url: https://fleetbase.io/docs/extension-development/order-lifecycles/moving-orders
module: extension-development
---

Order Lifecycles

# Moving Orders

Advance an order with a configured lifecycle — from the console, from your engine with the next-activity and update-activity endpoints, and from your server with the OrderConfig helpers.

# Moving Orders

## From the Console

**Update activity**
, in the order's menu or its activity section, offers the activities that follow the current one. On the board, a card can be dragged to one of the order's next activities.

## From Your Engine

Ask Fleet-Ops for the order's next activities, then move it to one by code. These are the console's internal endpoints:

```
// In a component or service of your engine
const next = await this.fetch.get(`orders/next-activity/${order.id}`);
// [{ code: 'reserved', status: 'Reserved', … }, { code: 'cancelled', status: 'Cancelled', … }]

await this.fetch.patch(`orders/update-activity/${order.id}`, { activity: { code: 'reserved' } });
await order.reload();
```

With
`strict_transitions`
, the API looks the code up in the flow and applies that activity, so the code is enough. A move the flow doesn't allow is rejected:

```
{ "error": "This activity is not a permitted next step for the order." }
```

The
[details view](https://fleetbase.io/docs/extension-development/order-presentation/customizing/details-view#next-step-buttons)
page shows a component that renders the next activities as buttons.

## From Your Server

Check a move with the order config's helpers before you make it:

```
$config = $order->config();

if ($config->canTransition($order->status, 'reserved')) {
    // …move the order, for example through your own service
}

$config->isTerminalActivityCode($order->status); // has it finished?
$config->getInitialActivity();                    // where new orders start
```

See
[Server Reference](https://fleetbase.io/docs/extension-development/order-lifecycles/server-reference)
.

## Canceling

Cancel through Fleet-Ops as usual:
**Cancel order**
in the console, or the cancel endpoint. The order moves to the lifecycle's
`canceled`
activity.

## After a Terminal Activity

Once an order reaches a terminal activity (one in
`terminal`
, or the
`completed`
or
`canceled`
code), it can't move again, and the console disables
**Edit details**
,
**Update activity**
and
**Cancel order**
for it.
