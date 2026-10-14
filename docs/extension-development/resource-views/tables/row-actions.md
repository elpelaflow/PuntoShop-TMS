---
title: "Row Actions"
url: https://fleetbase.io/docs/extension-development/resource-views/tables/row-actions
module: extension-development
---

Resource Views

Table Views

# Row Actions

Add an item to the "…" menu on each row of another engine's table with ResourceAction — every option and method, the handler, per-row visibility, permissions, separators and tooltips.

# Row Actions

A row action is an item in the "…" menu at the end of each table row. Clicking it runs your handler with that row's record.

```
import { ResourceAction } from '@fleetbase/ember-core/contracts';

universe.getService('resource-view').register(
    'fleet-ops:order:table:row-actions',
    new ResourceAction({ id: 'acme-print-label', label: 'Print shipping label', icon: 'print' })
        .withHandler((order, ctx) => ctx.owner.lookup('service:fetch').post('labels', { order: order.id }, { namespace: 'acme/int/v1' }))
);
```

|  |  |
| --- | --- |
| **Slot** | `<extension>:<resource>:table:row-actions` |
| **Contract** | `ResourceAction` , from `@fleetbase/ember-core/contracts` |
| **Handler** | `fn(row, ctx)` |
| **Visibility check** | `isVisible(row, ctx)` , for each row |
| **Default spot** | Just above the built-in **Delete** item |
| **Without the permission** | Shown disabled, with an "unauthorized" tooltip |

## Options

Prop

Type

`id`

string

`label
?`

string

`icon
?`

string

`iconPrefix
?`

string

`iconClass
?`

string

`class
?`

string

`fn
?`

(row, ctx) => void

`isVisible
?`

(row, ctx) => boolean

`permission
?`

string

`disabled
?`

boolean

`helpText
?`

string

`separator
?`

boolean

`before
?`

string

`after
?`

string

`index
?`

number

`priority
?`

number

## Methods

| Method | Sets | Example |
| --- | --- | --- |
| `withLabel(label)` | `label` | `.withLabel('Print label')` |
| `withIcon(icon, prefix?)` | `icon` , and `iconPrefix` if given | `.withIcon('print')` |
| `withHandler(fn)` | `fn` | `.withHandler((row, ctx) => print(row))` |
| `visibleWhen(fn)` | `isVisible` | `.visibleWhen((row) => row.status !== 'canceled')` |
| `withPermission(permission)` | `permission` | `.withPermission('acme print label')` |
| `before(id)` , `after(id)` | Placement | `.before('delete')` |
| `withIndex(index)` , `withPriority(priority)` | Placement | `.withIndex(0)` |

## The Handler

`fn`
receives the
**row's record**
and the
[view context](https://fleetbase.io/docs/extension-development/resource-views/handlers-and-context)
:

```
.withHandler(async (order, ctx) => {
    const fetch = ctx.owner.lookup('service:fetch');
    const notifications = ctx.owner.lookup('service:notifications');

    try {
        await fetch.post('labels', { order: order.id }, { namespace: 'acme/int/v1' });
        notifications.success(`Label for ${order.tracking} sent to the printer.`);
    } catch (error) {
        notifications.serverError(error);
    }
});
```

The menu closes as soon as the item is clicked; it doesn't wait for your handler.

## Examples

### Only for Some Rows

```
new ResourceAction({ id: 'acme-reopen', label: 'Reopen', icon: 'rotate-left' })
    .visibleWhen((order) => order.status === 'canceled')
    .withHandler((order, ctx) => reopen(order, ctx));
```

### Opening a Modal

```
new ResourceAction({ id: 'acme-add-note', label: 'Add Acme note', icon: 'note-sticky' })
    .withHandler((vehicle, ctx) => {
        const modalsManager = ctx.owner.lookup('service:modals-manager');
        modalsManager.show('modals/acme-note', { title: `Note for ${vehicle.display_name}`, vehicle });
    });
```

The modal component (
`modals/acme-note`
) must be one the console can find. Register it from your engine; see
[Registry Service](https://fleetbase.io/docs/extension-development/universe/registry-service)
.

### A Group with a Divider

```
views.register('fleet-ops:vehicle:table:row-actions', [
    new ResourceAction({ id: 'acme-divider', separator: true }).withPriority(1),
    new ResourceAction({ id: 'acme-ping', label: 'Ping tracker', icon: 'satellite-dish' }).withPriority(2).withHandler(ping),
    new ResourceAction({ id: 'acme-history', label: 'Tracker history', icon: 'clock-rotate-left' }).withPriority(3).withHandler(history),
]);
```

All three go above
**Delete**
, in priority order: a divider, then your two items.

### First in the Menu

```
new ResourceAction({ id: 'acme-open', label: 'Open in Acme', icon: 'arrow-up-right-from-square' })
    .withIndex(0)
    .withHandler((row) => window.open(`https://acme.example.com/records/${row.public_id}`, '_blank'));
```

### Placed Next to a Built-in Item

```
views.register(
    'fleet-ops:driver:table:row-actions',
    new ResourceAction({ id: 'acme-assign-route', label: 'Assign Acme route', icon: 'route' })
        .after('assign-vehicle')
        .withHandler(assignRoute)
);
```

The built-in ids for each table's row menu are in the
[Registry Catalogue](https://fleetbase.io/docs/extension-development/resource-views/catalogue)
.

## Related

* [Bulk Actions](https://fleetbase.io/docs/extension-development/resource-views/tables/bulk-actions)
  : the same action, for many rows at once.
* [Menu Items](https://fleetbase.io/docs/extension-development/resource-views/details/menu-items)
  : the same action, in a details view.
