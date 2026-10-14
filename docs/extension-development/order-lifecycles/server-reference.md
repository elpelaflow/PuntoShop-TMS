---
title: "Server Reference"
url: https://fleetbase.io/docs/extension-development/order-lifecycles/server-reference
module: extension-development
---

Order Lifecycles

# Server Reference

The OrderConfig and Order methods that read a configured lifecycle, and the parts of Fleet-Ops that don't apply lifecycles yet.

# Server Reference

## OrderConfig

`Fleetbase\FleetOps\Models\OrderConfig`
reads the lifecycle with these methods. All of them work for configs without one too, returning the dispatch lifecycle's answer.

| Method | Returns |
| --- | --- |
| `lifecycle()` | `meta.lifecycle` , or `[]` |
| `hasConfiguredLifecycle()` | Whether `meta.lifecycle` is set |
| `getInitialActivity()` | The `initial` activity; without a lifecycle, the `created` activity |
| `getInitialStatusCode()` | `initial` , or `created` |
| `getCompletedActivity()` | The `completed` activity, falling back to the flow's `completed` |
| `getCanceledActivity()` | The `canceled` activity, falling back to the flow's `canceled` |
| `allowsDispatch()` | `false` only when `dispatch` is `false` (or `'false'` , `0` , `'0'` ) |
| `hasStrictTransitions()` | `strict_transitions` |
| `getTerminalActivityCodes()` | `terminal` plus the `completed` and `canceled` codes; without a lifecycle, `['completed', 'canceled']` |
| `isTerminalActivityCode($code)` | Whether `$code` is terminal |
| `canTransition($from, $to)` | Whether `$to` is listed in the `$from` activity's `activities` , and `$from` isn't terminal. Only the flow is consulted, whatever `strict_transitions` says |
| `getActivityByCode($code)` | The activity with that code, or `null` |

## Order

| Method | Returns |
| --- | --- |
| `config()` | The order's `OrderConfig` , or `null` |
| `getInitialTrackingStatus()` | The first tracking status for a new order with a lifecycle, as `['code', 'status', 'details']` , or `null` to use the default |

## Limitations

These parts of Fleet-Ops don't apply lifecycles yet:

| Part | Assumes |
| --- | --- |
| The public REST API ( `/v1/orders` ) | Orders start at `created` ; dispatch and activity updates follow the dispatch lifecycle |
| The Navigator app | The `created` , `dispatched` and `started` codes |
| The orders list's **Active** filter | The dispatch lifecycle's active codes |
| The live map's active orders | The dispatch lifecycle's active codes |
| Order metrics and dashboard counts | The dispatch lifecycle's codes |

Orders with a configured lifecycle may be missing from these, or counted differently. Keep them in mind if your order type's users rely on them.

## Source

| File |  |
| --- | --- |
| `server/src/Models/OrderConfig.php` | The lifecycle methods |
| `server/src/Http/Controllers/Internal/v1/OrderController.php` | Create, dispatch and update-activity |
| `server/src/Models/TrackingNumber.php` | The first tracking status |
