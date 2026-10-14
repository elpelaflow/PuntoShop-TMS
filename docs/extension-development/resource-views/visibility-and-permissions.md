---
title: "Visibility and Permissions"
url: https://fleetbase.io/docs/extension-development/resource-views/visibility-and-permissions
module: extension-development
---

Resource Views

# Visibility and Permissions

How each kind of item handles a permission and a visibility check — hidden, shown disabled, or left out — with examples of gating items on abilities, record state and user settings.

# Visibility and Permissions

You can limit an item in two ways:

* **`permission`**
  : an ability name, such as
  `acme-safety update score`
  . Users without it can't use the item.
* **A visibility check**
  (
  `isVisible`
  , set with
  `.visibleWhen()`
  ): a function that decides, per record or per view, whether the item shows at all.

Use
`permission`
for "who may", and a visibility check for "when it applies". They work together: an item can have both.

## What Each Item Does

| Item | Without the `permission` | Visibility check |
| --- | --- | --- |
| [Column](https://fleetbase.io/docs/extension-development/resource-views/tables/columns) | **Left out** : the column isn't in the table or the column picker | Not supported |
| [Row action](https://fleetbase.io/docs/extension-development/resource-views/tables/row-actions) | **Shown disabled** , with an "unauthorized" tooltip | `isVisible(row, ctx)` , checked for each row |
| [Bulk action](https://fleetbase.io/docs/extension-development/resource-views/tables/bulk-actions) | **Shown disabled** , with an "unauthorized" tooltip | Not supported: check the selection in the handler |
| [Toolbar button](https://fleetbase.io/docs/extension-development/resource-views/tables/toolbar-buttons) | **Shown disabled** | `isVisible(ctx)` , checked when the view renders |
| [Header button](https://fleetbase.io/docs/extension-development/resource-views/details/header-buttons) | **Shown disabled** | `isVisible(ctx)` , checked when the view renders |
| [Menu item](https://fleetbase.io/docs/extension-development/resource-views/details/menu-items) | **Not checked** : use a visibility check | `isVisible(record, ctx)` |
| [Tab](https://fleetbase.io/docs/extension-development/resource-views/details/tabs) | See [Menu Service](https://fleetbase.io/docs/extension-development/universe/menu-service) | — |

Showing an action disabled, rather than hiding it, tells users the feature exists and that they need access to it. If you'd rather hide it, check the ability in the visibility check instead.

## Permissions

A permission is an ability your extension declares on its API side; see
[Service Provider](https://fleetbase.io/docs/extension-development/backend/service-provider)
. The console checks it with the
`abilities`
service.

```
new ResourceAction({ id: 'acme-recalculate', label: 'Recalculate score' })
    .withPermission('acme-safety update score');

// The same, as a key
new ResourceAction({ id: 'acme-recalculate', label: 'Recalculate score', permission: 'acme-safety update score' });
```

## Visibility Checks

### Per Record

Row actions and menu items are checked against the record:

```
// Only for active drivers
new ResourceAction({ id: 'acme-recalculate', label: 'Recalculate score' })
    .visibleWhen((driver) => driver.status === 'active');

// Only for orders that have a driver
new ResourceAction({ id: 'acme-call-driver', label: 'Call driver' })
    .visibleWhen((order) => Boolean(order.driver_assigned));
```

### Per View

Buttons are checked once, when the view renders, against the context:

```
// Only on paid invoices
new ActionButton({ id: 'acme-send-to-erp', text: 'Send to ERP' })
    .visibleWhen((ctx) => ctx.resource.status === 'paid');

// Only when the user has turned the integration on
new ActionButton({ id: 'acme-import', text: 'Import from Acme' })
    .visibleWhen((ctx) => ctx.owner.lookup('service:current-user').getOption('acme.enabled') === true);
```

### Hiding Instead of Disabling

Check the ability inside the visibility check:

```
new ResourceAction({ id: 'acme-flag', label: 'Flag for coaching' })
    .visibleWhen((driver, ctx) => ctx.owner.lookup('service:abilities').can('acme-safety update score'));
```

This is also how to protect a
**menu item**
, which ignores
`permission`
.

## Keep Checks Fast

Visibility checks run while the view renders: once per row for row actions, which can be hundreds of times. Read what is already loaded, the record and services' current state, and don't fetch inside them. Load what you need beforehand, for example in a service your extension fills when it boots, and read that.

**Hiding an item is not access control.**
The API endpoint behind an action must check permissions itself. Visibility and permissions on items only shape what the console shows.
