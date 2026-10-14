---
title: "Resource View Service"
url: https://fleetbase.io/docs/extension-development/universe/resource-view-service
module: extension-development
---

# Resource View Service

Register columns, row actions, bulk actions and buttons into any engine's table and details views, and merge them into your own — the full API of universe.getService('resource-view').

# Resource View Service

The
`resource-view`
service holds the
[resource view registries](https://fleetbase.io/docs/extension-development/resource-views)
: named slots in each engine's tables and details views that other extensions can add columns, actions and buttons to.

```
// addon/extension.js
export default {
    setupExtension(app, universe) {
        const views = universe.getService('resource-view');
    },
};
```

`getService`
also accepts
`'resourceView'`
,
`'resource-views'`
,
`'resource-view-service'`
and
`'universe/resource-view-service'`
. Inside an engine, the service is
`universe/resource-view-service`
. It is shared with the host, so every engine sees the same registries.

**Requires**
`@fleetbase/ember-core`
0.3.25 or later. In code that may run on an older console, look the service up with optional chaining, such as
`universe.getService('universe/resource-view-service')?.declare(…)`
. The
`@fleetbase/ember-ui`
helper
`lookupResourceView(owner)`
returns
`null`
when the service is missing.

## Registering

### register(registryName, items)

Register one item, or an array of items, into a slot. Returns
`true`
when every item was accepted.

```
views.register('fleet-ops:driver:table:columns', new TableColumn({ id: 'acme-score', label: 'Score', valuePath: 'meta.acme_score' }));
views.register('ledger:invoice:details:menu', [itemA, itemB]);
```

An item is rejected, with a debug message in the console, when:

* `registryName`
  does not follow
  `<extension>:<resource>:<table|details>:<slot>`
  , or uses a slot that surface does not have (see
  [Registry Names](https://fleetbase.io/docs/extension-development/resource-views/registry-names)
  );
* the item has no
  `id`
  ;
* it is a contract of the wrong kind for the slot, for example an
  `ActionButton`
  in
  `columns`
  .

Registering an id that is already in the slot replaces the earlier item. Items may be contracts or plain objects. Each is stored as a plain object, tagged with its kind.

### Shortcuts

Each takes
`(extension, resource, item)`
and builds the registry name for you:

| Method | Slot |
| --- | --- |
| `registerTableColumn` | `<extension>:<resource>:table:columns` |
| `registerRowAction` | `<extension>:<resource>:table:row-actions` |
| `registerBulkAction` | `<extension>:<resource>:table:bulk-actions` |
| `registerTableAction` | `<extension>:<resource>:table:actions` |
| `registerDetailsAction` | `<extension>:<resource>:details:actions` |
| `registerDetailsMenuItem` | `<extension>:<resource>:details:menu` |
| `registerDetailsTab` | `<extension>:<resource>:details:tabs` : a details **tab** , a `MenuItem` |

The same shortcuts are on the Universe facade, as
`universe.registerTableColumn(…)`
and so on, alongside
`universe.registerInResourceView(registryName, items)`
.

### unregister(registryName, id)

Remove an item. Returns
`true`
if one was removed.

## Reading

### get(registryName)

The items registered in a slot, in registration order. An invalid name returns an empty array.

### resourceRegistryNames(extension, resource)

The seven registry names for one resource:

```
views.resourceRegistryNames('iam', 'user');
// ['iam:user:table:columns', 'iam:user:table:row-actions', 'iam:user:table:bulk-actions',
//  'iam:user:table:actions', 'iam:user:details:actions', 'iam:user:details:menu',
//  'iam:user:details:tabs']
```

### The tabs Slot

`<extension>:<resource>:details:tabs`
is an alias. Details tabs are stored where they always have been, in the menu service's
`<extension>:component:<resource>:details`
registry, so tabs registered under either name are the same tabs.
`register`
,
`get`
,
`unregister`
and
`declare`
all accept the alias. Tabs must be
`MenuItem`
s (or plain objects), and are keyed by
`slug`
rather than
`id`
.

## Declaring (Engine Authors)

### declare(extension, resources)

Create every registry for the given resources, and return their names. Call it from your engine's
`setupExtension`
:

```
universe.getService('universe/resource-view-service')?.declare('acme', ['shipment', 'carrier']);
```

## Merging (Engine Authors)

The resource layouts merge for you when given
`@registry`
. These methods are for views that build their own lists. See
[Making Views Extensible](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible)
.

### merge(registryName, baseItems = [], context = {})

A view's built-in items with the slot's registered items merged in. Registered items are placed by
`before`
,
`after`
,
`index`
and
`priority`
, or at the slot's default spot. Their handlers are bound to the view context. Each registered item is a fresh copy, so changing it does not change the registry. When nothing is registered, or the name is invalid, it returns the built-in items as a plain array.

`context`
is merged with
`registry`
,
`extension`
,
`surface`
,
`resourceName`
,
`slot`
and
`owner`
, and handed to every handler. Getters on it stay getters.

### mergeSlot(prefix, slot, baseItems = [], context = {})

`merge()`
, addressed by a surface prefix and a slot:
`mergeSlot('acme:shipment:table', 'bulk-actions', items, ctx)`
.

### mergeRowActions(prefix, columns = [], context = {})

The columns, with registered row actions merged into the
`actions`
of the column whose
`cellComponent`
is
`table/cell/dropdown`
. Other columns are returned as they are.

## Filters

### queryParamsFor(extension, resource, baseQueryParams = [])

An index controller's query params, plus the
`filterParam`
of each filterable column registered for
`<extension>:<resource>:table`
. Use it for the controller's
`queryParams`
class field:

```
queryParams = views.queryParamsFor('acme', 'shipment', ['page', 'limit', 'sort', 'query']);
```

After this is called for a table, registering another filterable column for it logs a warning, because the controller's query params are already fixed. See
[Filterable Columns](https://fleetbase.io/docs/extension-development/resource-views/tables/filterable-columns)
.

## On ResourceActionService

Action services extending
`ResourceActionService`
get these, derived from
`initialize(modelName, { mountPrefix, registryResource, registryExtension })`
:

| Member | Description |
| --- | --- |
| `registryExtension` | `mountPrefix` without `console.` , unless `registryExtension` is passed |
| `registryResource` | The model name, without the `<extension>-` prefix, unless `registryResource` is passed |
| `tableRegistry` | `<extension>:<resource>:table` |
| `detailsRegistry` | `<extension>:<resource>:details` |
| `mergeRegistered(surface, slot, items, context)` | `mergeSlot()` for this resource; `surface` is `'table'` or `'details'` |
| `mergeRegisteredColumns(columns, context)` | Registered columns and row actions, merged into a table's columns |
| `queryParamsFor(baseQueryParams)` | `queryParamsFor()` for this resource's table |
| `resourceView` | The service, or `undefined` on an older ember-core |

## In @fleetbase/ember-ui

| Export | Description |
| --- | --- |
| `lookupResourceView(owner)` from `@fleetbase/ember-ui/utils/resource-view` | The service, or `null` |
| `mergeHeaderButtons(resourceView, prefix, buttons, context, { withMenu })` | Header buttons with the registered `actions` merged in. With `withMenu: true` , `menu` items are merged into the first dropdown button, or into a new "…" button |
| `<Layout::Resource::ActionButtons @buttons>` | Renders header buttons: plain buttons, dropdowns and components |
| `<Layout::Resource::BulkActions @actions>` | Renders a **Bulk Actions** dropdown |
| `@registry` on `<Layout::Resource::Tabular>` , `<Layout::Resource::TabularActions>` and `<Layout::Resource::Panel>` ; `registry` in `resourceContextPanel.open()` | Merges automatically |

## See Also

* [Resource Views](https://fleetbase.io/docs/extension-development/resource-views)
  : what you can add, with diagrams
* [Getting Started](https://fleetbase.io/docs/extension-development/resource-views/getting-started)
  : a first column and action, step by step
* [Columns](https://fleetbase.io/docs/extension-development/resource-views/tables/columns)
  ,
  [Row Actions](https://fleetbase.io/docs/extension-development/resource-views/tables/row-actions)
  ,
  [Bulk Actions](https://fleetbase.io/docs/extension-development/resource-views/tables/bulk-actions)
  ,
  [Toolbar Buttons](https://fleetbase.io/docs/extension-development/resource-views/tables/toolbar-buttons)
  ,
  [Header Buttons](https://fleetbase.io/docs/extension-development/resource-views/details/header-buttons)
  ,
  [Menu Items](https://fleetbase.io/docs/extension-development/resource-views/details/menu-items)
  ,
  [Tabs](https://fleetbase.io/docs/extension-development/resource-views/details/tabs)
  : every option, per element
* [Contracts](https://fleetbase.io/docs/extension-development/reference/contracts#tablecolumn)
  :
  `TableColumn`
  ,
  `ResourceAction`
  ,
  `ActionButton`
* [Registry Service](https://fleetbase.io/docs/extension-development/universe/registry-service)
  : the storage underneath

## Source

| File | Description |
| --- | --- |
| `addon/services/universe/resource-view-service.js` | The service |
| `addon/utils/resource-view-registry.js` | Name parsing and building |
| `addon/utils/merge-registered-items.js` | Placement and handler binding |
| `addon/contracts/table-column.js` , `resource-action.js` , `action-button.js` | The contracts |
| `ember-ui/addon/utils/resource-view.js` | `lookupResourceView` , `mergeHeaderButtons` |
