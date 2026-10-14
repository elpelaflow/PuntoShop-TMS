---
title: "Query Params and Ids"
url: https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible/query-params-and-ids
module: extension-development
---

Resource Views

Making Your Views Extensible

# Query Params and Ids

Build your index controllers' query params with queryParamsFor() so registered filterable columns work, and give your built-in columns, actions and buttons stable ids for others to place against.

# Query Params and Ids

## Query Params

A filter only filters if its param is one of the index controller's query params. Build the list with
`queryParamsFor()`
, which adds the
`filterParam`
of every filterable column registered for the table:

```
// addon/controllers/shipments/index.js
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ShipmentsIndexController extends Controller {
    @service shipmentActions;

    queryParams = this.shipmentActions.queryParamsFor(['page', 'limit', 'sort', 'query', 'status', 'carrier']);

    @tracked page = 1;
    @tracked limit;
    @tracked sort = '-created_at';
    @tracked query;
    @tracked status;
    @tracked carrier;
}
```

It works as a class field: class fields run when the controller is created, which is after every extension's
`setupExtension`
has run, so every registered filter is known by then.

Without an action service, ask the resource view service directly:

```
import { getOwner } from '@ember/application';
import lookupResourceView from '@fleetbase/ember-ui/utils/resource-view';

queryParams = lookupResourceView(getOwner(this))?.queryParamsFor('acme', 'shipment', ['page', 'query']) ?? ['page', 'query'];
```

The API side of each filter, a Filter expansion for its param, belongs to the extension that registered the column; see
[Filterable Columns](https://fleetbase.io/docs/extension-development/resource-views/tables/filterable-columns)
.

## Stable Ids

Other extensions place their items
`before`
or
`after`
yours, by id. Give every built-in column, row action, bulk action and button an
`id`
, and keep it the same across releases: it is part of your engine's API.

```
get columns() {
    return [
        { id: 'tracking-number', label: 'Tracking #', valuePath: 'tracking_number', cellComponent: 'table/cell/anchor', action: this.shipmentActions.transition.view },
        { id: 'status', label: 'Status', valuePath: 'status', cellComponent: 'table/cell/status' },
        { id: 'created-at', label: 'Created', valuePath: 'createdAt', sortParam: 'created_at' },
        {
            id: 'row-actions',
            label: '',
            cellComponent: 'table/cell/dropdown',
            ddButtonText: false,
            ddButtonIcon: 'ellipsis-h',
            sticky: 'right',
            actions: [
                { id: 'view', label: 'View', fn: this.shipmentActions.transition.view },
                { id: 'edit', label: 'Edit', fn: this.shipmentActions.transition.edit },
                { separator: true },
                { id: 'delete', label: 'Delete', fn: this.shipmentActions.delete, class: 'text-red-500' },
            ],
        },
    ];
}
```

The built-in engines follow two rules. Following them too makes your ids guessable:

* **A column's id**
  is its
  `valuePath`
  , dasherized:
  `created_at`
  →
  `created-at`
  .
* **An action's id**
  is its handler's name, dasherized:
  `assignVehicle`
  →
  `assign-vehicle`
  .

Name your delete action
`delete`
. Registered row actions and menu items go above it by default.

## Documenting Your Registries

Other extension authors need your registry names and ids. List them in your extension's documentation, in the same shape as the
[Registry Catalogue](https://fleetbase.io/docs/extension-development/resource-views/catalogue)
: each resource, its names, and the ids in each slot.

## Next

[Custom Views →](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible/custom-views)
: merge registered items into views that don't use the resource layouts.

[Layouts

Pass @registry to Layout::Resource::Tabular, Layout::Resource::Panel, TabularActions and resource context side panels, so they merge registered columns, actions, buttons and menu items.](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible/layouts)
[Custom Views

Merge registered columns, actions, buttons and menu items into views you render yourself — a hand-built table, a page header, a dialog — and the context to pass to handlers.](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible/custom-views)
