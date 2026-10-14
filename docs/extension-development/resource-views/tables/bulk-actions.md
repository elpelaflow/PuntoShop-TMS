---
title: "Bulk Actions"
url: https://fleetbase.io/docs/extension-development/resource-views/tables/bulk-actions
module: extension-development
---

Resource Views

Table Views

# Bulk Actions

Add an item to a table's Bulk Actions menu with ResourceAction — run your handler on the selected rows, with options, examples and how to handle selections it doesn't apply to.

# Bulk Actions

A bulk action is an item in the
**Bulk Actions**
menu, which appears in the table header once at least one row is selected. Clicking it runs your handler with every selected row.

```
import { ResourceAction } from '@fleetbase/ember-core/contracts';

universe.getService('resource-view').register(
    'fleet-ops:order:table:bulk-actions',
    new ResourceAction({ id: 'acme-export', label: 'Send to Acme', icon: 'paper-plane' })
        .withHandler(async (orders, ctx) => {
            await ctx.owner.lookup('service:fetch').post('exports', { orders: orders.map((order) => order.id) }, { namespace: 'acme/int/v1' });
            ctx.owner.lookup('service:notifications').success(`${orders.length} orders sent to Acme.`);
        })
);
```

|  |  |
| --- | --- |
| **Slot** | `<extension>:<resource>:table:bulk-actions` |
| **Contract** | `ResourceAction` , from `@fleetbase/ember-core/contracts` |
| **Handler** | `fn(selectedRows, ctx)` |
| **Visibility check** | Not supported |
| **Default spot** | At the end of the menu |
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

`class
?`

string

`fn
?`

(selectedRows, ctx) => void

`permission
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

| Method | Sets |
| --- | --- |
| `withLabel(label)` | `label` |
| `withIcon(icon, prefix?)` | `icon` , and `iconPrefix` if given |
| `withHandler(fn)` | `fn` |
| `withPermission(permission)` | `permission` |
| `before(id)` , `after(id)` , `withIndex(index)` , `withPriority(priority)` | Placement |

`visibleWhen()`
is available on the contract, but the Bulk Actions menu doesn't use it: a bulk action is always listed.

## The Handler

`fn`
receives an
**array of the selected records**
, read when the item is clicked, then the
[view context](https://fleetbase.io/docs/extension-development/resource-views/handlers-and-context)
.

### Selections the Action Doesn't Apply To

Because a bulk action is always listed, check the selection yourself, and tell the user what you skipped:

```
.withHandler(async (orders, ctx) => {
    const notifications = ctx.owner.lookup('service:notifications');
    const eligible = orders.filter((order) => order.status === 'completed');

    if (eligible.length === 0) {
        return notifications.warning('Only completed orders can be invoiced.');
    }

    await invoice(eligible, ctx);

    const skipped = orders.length - eligible.length;
    notifications.success(`${eligible.length} invoiced${skipped ? `, ${skipped} skipped` : ''}.`);
});
```

### Asking for Confirmation

```
.withHandler((drivers, ctx) => {
    const modalsManager = ctx.owner.lookup('service:modals-manager');

    modalsManager.confirm({
        title: `Recalculate ${drivers.length} safety scores?`,
        body: 'Scores are recalculated from the last 90 days of trips.',
        acceptButtonText: 'Recalculate',
        confirm: async (modal) => {
            modal.startLoading();
            await recalculate(drivers, ctx);
            modal.done();
        },
    });
});
```

### Clearing the Selection Afterwards

`ctx.table`
is the table component; its selection can be cleared once the work is done:

```
.withHandler(async (rows, ctx) => {
    await archive(rows, ctx);
    ctx.table?.untoggleSelectAll?.();
    ctx.owner.lookup('service:router').refresh();
});
```

## Related

* [Row Actions](https://fleetbase.io/docs/extension-development/resource-views/tables/row-actions)
  : the same action, for one row.
* [Handlers and Context](https://fleetbase.io/docs/extension-development/resource-views/handlers-and-context)

[Row Actions

Add an item to the "…" menu on each row of another engine's table with ResourceAction — every option and method, the handler, per-row visibility, permissions, separators and tooltips.](https://fleetbase.io/docs/extension-development/resource-views/tables/row-actions)
[Toolbar Buttons

Add a button to another engine's table header with ActionButton — a plain button, a dropdown of actions, or your own component — with every option and method.](https://fleetbase.io/docs/extension-development/resource-views/tables/toolbar-buttons)
