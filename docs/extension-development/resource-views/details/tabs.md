---
title: "Tabs"
url: https://fleetbase.io/docs/extension-development/resource-views/details/tabs
module: extension-development
---

Resource Views

Details Views

# Tabs

Add a tab to another engine's details view with MenuItem — a component from your engine, rendered with the record, the routes it uses, the arguments it receives, and the details tabs alias.

# Tabs

A tab adds a page of your own to a record's details view, next to tabs such as
**Overview**
and
**Activity**
. It renders a component from your engine, with the record.

```
import { MenuItem, ExtensionComponent } from '@fleetbase/ember-core/contracts';

universe.getService('resource-view').register(
    'fleet-ops:driver:details:tabs',
    new MenuItem({
        title: 'Safety',
        slug: 'acme-safety',
        icon: 'shield-halved',
        route: 'management.drivers.index.details.virtual',
        component: new ExtensionComponent('@acme/safety-engine', 'driver-safety-tab'),
    })
);
```

|  |  |
| --- | --- |
| **Slot** | `<extension>:<resource>:details:tabs` |
| **Contract** | `MenuItem` , from `@fleetbase/ember-core/contracts` |
| **Keyed by** | `slug` |
| **Default spot** | After the view's own tabs |

## Options

Prop

Type

`title`

string

`slug
?`

string

`icon
?`

string

`route
?`

string

`component`

ExtensionComponent

`componentParams
?`

object

`priority
?`

number

`MenuItem`
has more options, used by menus elsewhere in the console; see
[Menu Service](https://fleetbase.io/docs/extension-development/universe/menu-service)
.

## The Route

In a routed details page, a tab is a link to the engine's
**virtual**
route for that view, which renders your component with the slug in the URL. These details views have one:

| Details view | `route` |
| --- | --- |
| Fleet-Ops orders | `operations.orders.index.details.virtual` |
| Fleet-Ops drivers | `management.drivers.index.details.virtual` |
| Fleet-Ops vehicles | `management.vehicles.index.details.virtual` |
| Fleet-Ops fleets | `management.fleets.index.details.virtual` |
| Fleet-Ops places | `management.places.index.details.virtual` |
| Fleet-Ops devices | `connectivity.devices.index.details.virtual` |
| Fleet-Ops sensors | `connectivity.sensors.index.details.virtual` |
| Ledger invoices | `billing.invoices.index.details.virtual` |

## Your Tab's Component

```
{{! addon/components/driver-safety-tab.hbs }}
<div class="p-4 space-y-4">
    <h3 class="text-lg font-semibold">Safety score: {{this.score}}</h3>
    <Table @rows={{this.incidents}} @columns={{this.columns}} />
</div>
```

| Argument | Value |
| --- | --- |
| `@resource` | The record |
| `@params` | The tab's `componentParams` |

The record is also passed under the resource's own name, such as
`@driver`
or
`@order`
. Prefer
`@resource`
, so one component can serve several views.

## The Alias

Tabs existed before resource view registries, under the name
`<extension>:component:<resource>:details`
, registered through the
[Menu Service](https://fleetbase.io/docs/extension-development/universe/menu-service)
. The
`details:tabs`
name is an
**alias**
for it:

```
// These two register into the same place
views.register('fleet-ops:driver:details:tabs', tab);
universe.getService('menu').registerMenuItem('fleet-ops:component:driver:details', tab);

// The shortcut
views.registerDetailsTab('fleet-ops', 'driver', tab);
```

Tabs registered either way appear together, and
`views.get('fleet-ops:driver:details:tabs')`
lists all of them. To remove one, unregister its
**slug**
:

```
views.unregister('fleet-ops:driver:details:tabs', 'acme-safety');
```

## Related

* [Virtual Routes](https://fleetbase.io/docs/extension-development/frontend/virtual-routes)
  : how a menu item's component is rendered.
* [Menu Service](https://fleetbase.io/docs/extension-development/universe/menu-service)

[Menu Items

Add an item to the "…" menu in another engine's details header with ResourceAction — the record it receives, visibility checks, placement above Delete, and why permission must be checked in the visibility check.](https://fleetbase.io/docs/extension-development/resource-views/details/menu-items)
[Overview

Every resource view registry the built-in engines declare — one page per engine, with each resource's registry names, built-in ids and a link to the source that wires it.](https://fleetbase.io/docs/extension-development/resource-views/catalogue)
