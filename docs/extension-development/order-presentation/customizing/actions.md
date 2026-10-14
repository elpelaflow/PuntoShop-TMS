---
title: "Actions"
url: https://fleetbase.io/docs/extension-development/order-presentation/customizing/actions
module: extension-development
---

Order Presentation

Customizing

# Actions

Hide Fleet-Ops' built-in order actions — dispatch, driver assignment, cancel, delete and more — from the orders table and the order details menu for your order type, with hidden.actions.

# Actions

`hidden.actions`
removes Fleet-Ops' built-in order actions, by id, from:

* **the orders table**
  : each row's "…" menu;
* **the order details view**
  : the header's "…" menu.

```
hidden: {
    actions: ['dispatch', 'assign-driver', 'unassign-driver', 'view-label'],
},
```

## Action Ids

| Id | Action | Orders table | Details menu |
| --- | --- | --- | --- |
| `view` | View order | ✓ |  |
| `dispatch` | Dispatch order | ✓ |  |
| `assign-driver` | Assign driver | ✓ | ✓ |
| `unassign-driver` | Unassign driver | ✓ | ✓ |
| `edit-order-details` | Edit details |  | ✓ |
| `update-activity` | Update activity |  | ✓ |
| `view-label` | View order label |  | ✓ |
| `listen-to-socket-channel` | Listen to socket channel |  | ✓ |
| `view-metadata` | View metadata |  | ✓ |
| `cancel` | Cancel order | ✓ | ✓ |
| `delete` | Delete order | ✓ | ✓ |

These are the same ids the order views use in their
[resource view registries](https://fleetbase.io/docs/extension-development/resource-views/catalogue/fleet-ops#order)
, so
`hidden.actions: ['cancel']`
and another extension's
`.before('cancel')`
refer to the same action.

Ids are matched exactly.
`assign-driver`
and
`unassign-driver`
are two actions: the menu shows one or the other depending on whether the order has a driver, so hide both if neither applies.

The details menu drops separators that hiding leaves at its start, its end, or next to each other.

## Examples

### An Order Type That Is Never Dispatched

```
hidden: {
    actions: ['dispatch', 'assign-driver', 'unassign-driver', 'view-label'],
},
```

### One That Can't Be Deleted from the Console

```
hidden: {
    actions: ['delete'],
},
```

### One Managed Entirely from Your Own Screens

```
hidden: {
    actions: ['dispatch', 'assign-driver', 'unassign-driver', 'edit-order-details', 'update-activity', 'cancel', 'delete'],
},
```

## Your Own Actions

Hiding applies to Fleet-Ops' built-in actions. To
**add**
an action for your order type, register it in the order views' resource view registries, and show it only for your orders:

```
import { ResourceAction } from '@fleetbase/ember-core/contracts';

universe.getService('resource-view').register(
    'fleet-ops:order:details:menu',
    new ResourceAction({ id: 'acme-extend-rental', label: 'Extend rental…', icon: 'calendar-plus' })
        .before('cancel')
        .visibleWhen((order) => order.order_config?.meta?.presentation_profile === 'acme-rental')
        .withHandler((order, ctx) => openExtendDialog(order, ctx))
);
```

The check reads the order config's
`meta`
directly: handlers run in the console's context, where Fleet-Ops'
`order-presentation`
service isn't available. See
[Menu Items](https://fleetbase.io/docs/extension-development/resource-views/details/menu-items)
and
[Row Actions](https://fleetbase.io/docs/extension-development/resource-views/tables/row-actions)
.

**Hiding an action isn't a permission.**
The action's API endpoint still works for anyone allowed to call it. To stop an order type being dispatched, or moved to activities outside its flow, give its config a
[configured lifecycle](https://fleetbase.io/docs/extension-development/order-lifecycles)
with
`dispatch: false`
and
`strict_transitions: true`
, which the API enforces.

[The Details View

Compose the order details view for your order type with details.sections — Fleet-Ops' native sections by name and your own — with the arguments your sections receive, refreshing after changes, and a summary with next-step buttons.](https://fleetbase.io/docs/extension-development/order-presentation/customizing/details-view)
[Drafts and Validation

Prepare a new order when a user switches it to your order type and clean up when they switch away, with prepare and release, and require your own fields before an order is saved, with order-creation validation rules.](https://fleetbase.io/docs/extension-development/order-presentation/customizing/drafts-and-validation)
