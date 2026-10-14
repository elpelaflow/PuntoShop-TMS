---
title: "Menu Items"
url: https://fleetbase.io/docs/extension-development/resource-views/details/menu-items
module: extension-development
---

Resource Views

Details Views

# Menu Items

Add an item to the "…" menu in another engine's details header with ResourceAction — the record it receives, visibility checks, placement above Delete, and why permission must be checked in the visibility check.

# Menu Items

A menu item is an entry in the "…" menu of a details view's header. It acts on the record the view shows.

```
import { ResourceAction } from '@fleetbase/ember-core/contracts';

universe.getService('resource-view').register(
    'fleet-ops:vehicle:details:menu',
    new ResourceAction({ id: 'acme-ping-tracker', label: 'Ping tracker', icon: 'satellite-dish' })
        .visibleWhen((vehicle) => Boolean(vehicle.meta?.acme_tracker_id))
        .withHandler((vehicle, ctx) => ctx.owner.lookup('service:fetch').post(`trackers/${vehicle.meta.acme_tracker_id}/ping`, {}, { namespace: 'acme/int/v1' }))
);
```

|  |  |
| --- | --- |
| **Slot** | `<extension>:<resource>:details:menu` |
| **Contract** | `ResourceAction` , from `@fleetbase/ember-core/contracts` |
| **Handler** | `fn(record, ctx)` |
| **Visibility check** | `isVisible(record, ctx)` , when the view renders |
| **Default spot** | Just above the built-in **Delete** item, or at the end |
| **Without the permission** | **Not checked** : use the visibility check |

Menu items use the same contract as
[row actions](https://fleetbase.io/docs/extension-development/resource-views/tables/row-actions)
; see that page for every option and method. In a menu, the item's text can be set with
`label`
or
`text`
.

## Where the Item Goes

* If the view's header has a "…" menu, your items join it.
* If it doesn't, a "…" menu is added for them.

In either case, items are placed like row actions: above
**Delete**
by default, or where
`before`
,
`after`
or
`index`
say.

**`permission`
is not checked for menu items.**
To limit who sees one, check the ability in the visibility check:

```
.visibleWhen((vehicle, ctx) => ctx.owner.lookup('service:abilities').can('acme ping tracker'))
```

## Examples

### Several Items Together

Register an array to add a group, with a divider in front of it:

```
views.register('fleet-ops:driver:details:menu', [
    new ResourceAction({ id: 'acme-divider', separator: true }).withPriority(1),
    new ResourceAction({ id: 'acme-flag', label: 'Flag for coaching', icon: 'flag' }).withPriority(2).withHandler(flag),
    new ResourceAction({ id: 'acme-history', label: 'Safety history', icon: 'clock-rotate-left' }).withPriority(3).withHandler(openHistory),
]);
```

### Opening a Modal for the Record

```
new ResourceAction({ id: 'acme-schedule-service', label: 'Schedule service…', icon: 'wrench' })
    .withHandler((vehicle, ctx) => {
        ctx.owner.lookup('service:modals-manager').show('modals/acme-schedule-service', {
            title: `Schedule service for ${vehicle.display_name}`,
            vehicle,
            acceptButtonText: 'Schedule',
        });
    });
```

### Order Details

Fleet-Ops' order details "…" menu has built-in items with ids, so you can place items among them:

```
views.register(
    'fleet-ops:order:details:menu',
    new ResourceAction({ id: 'acme-reprint', label: 'Reprint Acme label', icon: 'print' })
        .after('view-label')
        .withHandler((order, ctx) => reprint(order, ctx))
);
```

The ids are
`edit-order-details`
,
`update-activity`
,
`assign-driver`
or
`unassign-driver`
,
`view-label`
,
`listen-to-socket-channel`
,
`view-metadata`
,
`cancel`
and
`delete`
.

## Related

* [Header Buttons](https://fleetbase.io/docs/extension-development/resource-views/details/header-buttons)
* [Row Actions](https://fleetbase.io/docs/extension-development/resource-views/tables/row-actions)
  : every
  `ResourceAction`
  option.
* [Visibility and Permissions](https://fleetbase.io/docs/extension-development/resource-views/visibility-and-permissions)

[Header Buttons

Add a button to the header of another engine's details view with ActionButton — the record it acts on, visibility per record, dropdowns and your own components, and where details views appear.](https://fleetbase.io/docs/extension-development/resource-views/details/header-buttons)
[Tabs

Add a tab to another engine's details view with MenuItem — a component from your engine, rendered with the record, the routes it uses, the arguments it receives, and the details tabs alias.](https://fleetbase.io/docs/extension-development/resource-views/details/tabs)
