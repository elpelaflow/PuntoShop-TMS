---
title: "Handlers and Context"
url: https://fleetbase.io/docs/extension-development/resource-views/handlers-and-context
module: extension-development
---

Resource Views

# Handlers and Context

What your click handlers and visibility checks receive — the target record or records, and the view context with the owner, the registry and the view's own state — and how to reach services from them.

# Handlers and Context

Actions and buttons run your code when they are clicked, and can run a check to decide whether they show. Both receive a
**context**
object,
`ctx`
, describing the view they are in.

## What Each Handler Receives

| Item | Click handler | Visibility check |
| --- | --- | --- |
| [Row action](https://fleetbase.io/docs/extension-development/resource-views/tables/row-actions) | `fn(row, ctx)` | `isVisible(row, ctx)` |
| [Bulk action](https://fleetbase.io/docs/extension-development/resource-views/tables/bulk-actions) | `fn(selectedRows, ctx)` | Not supported |
| [Toolbar button](https://fleetbase.io/docs/extension-development/resource-views/tables/toolbar-buttons) | `onClick(ctx)` | `isVisible(ctx)` |
| [Header button](https://fleetbase.io/docs/extension-development/resource-views/details/header-buttons) | `onClick(ctx)` | `isVisible(ctx)` |
| [Menu item](https://fleetbase.io/docs/extension-development/resource-views/details/menu-items) | `fn(record, ctx)` | `isVisible(record, ctx)` |
| Item in a button's dropdown | `fn(ctx.resource, ctx)` | `isVisible(ctx.resource, ctx)` |

You set them with the contract's methods:

```
new ResourceAction({ id: 'acme-sync', label: 'Sync' })
    .withHandler((row, ctx) => { /* … */ })   // sets fn
    .visibleWhen((row, ctx) => true);         // sets isVisible

new ActionButton({ id: 'acme-import', text: 'Import' })
    .withHandler((ctx) => { /* … */ })        // sets onClick
    .visibleWhen((ctx) => true);              // sets isVisible
```

## The Context

`ctx`
always has:

| Key | Value |
| --- | --- |
| `owner` | The console's application owner. `ctx.owner.lookup('service:…')` reaches any service the console has |
| `registry` | The full registry name the item was registered in, such as `fleet-ops:driver:table:row-actions` |
| `extension` | The name's first part, such as `fleet-ops` |
| `resourceName` | The name's second part, such as `driver` |
| `surface` | `table` or `details` |
| `slot` | The name's last part, such as `row-actions` |

Plus what the view supplies:

| View | Extra keys |
| --- | --- |
| Tables | `controller` : the index controller. `table` : the table component, once it has rendered. `getSelectedRows()` : the rows selected right now |
| Details panels and side panels | `resource` : the record shown. `panel` : the panel, once open |
| Developers details pages | `resource` , `controller` |
| IAM edit dialogs | `resource` |

Some keys are read
**when your handler runs**
, not when the view renders:
`table`
and
`panel`
only exist after the first render, so read them inside the handler rather than storing them.

## Reaching Services

`ctx.owner`
is the console's owner. Look services up from it:

```
.withHandler(async (order, ctx) => {
    const fetch = ctx.owner.lookup('service:fetch');
    const notifications = ctx.owner.lookup('service:notifications');

    await fetch.post('labels', { order: order.id }, { namespace: 'acme/int/v1' });
    notifications.success('Label sent to the printer.');
});
```

Services every extension can reach this way include
`fetch`
,
`notifications`
,
`modals-manager`
,
`store`
,
`current-user`
,
`abilities`
,
`intl`
and
`router`
.

**Services in your own engine are not in the console's owner.**
`ctx.owner.lookup('service:acme-labels')`
returns
`undefined`
if
`acme-labels`
only exists inside your engine. Register the service with the console first, from
`setupExtension`
, with
`universe.getService('registry').registerService('acme-labels', AcmeLabelsService)`
. See
[Registry Service](https://fleetbase.io/docs/extension-development/universe/registry-service)
. Or keep the handler self-contained, using only console services.

## Async Handlers

Handlers can be
`async`
. The view does not wait for them, so show your own feedback: a notification when the work is done, or a modal while it runs.

```
.withHandler(async (rows, ctx) => {
    const notifications = ctx.owner.lookup('service:notifications');
    try {
        await ctx.owner.lookup('service:fetch').post('exports', { ids: rows.map((row) => row.id) }, { namespace: 'acme/int/v1' });
        notifications.success(`${rows.length} records exported.`);
    } catch (error) {
        notifications.serverError(error);
    }
});
```

## Refreshing the View

After changing records, refresh what the view shows:

```
// A table: refresh the current route, which reloads its records
.withHandler(async (row, ctx) => {
    await doSomething(row);
    ctx.owner.lookup('service:router').refresh();
});

// A details view: reload the record
.withHandler(async (ctx) => {
    await doSomething(ctx.resource);
    await ctx.resource.reload();
});
```

[Placement

Control where your columns, actions and buttons appear among a view's own items — before or after another item, at a position, or by priority — and where they go when you don't say.](https://fleetbase.io/docs/extension-development/resource-views/placement)
[Visibility and Permissions

How each kind of item handles a permission and a visibility check — hidden, shown disabled, or left out — with examples of gating items on abilities, record state and user settings.](https://fleetbase.io/docs/extension-development/resource-views/visibility-and-permissions)
