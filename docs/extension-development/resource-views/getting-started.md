---
title: "Getting Started"
url: https://fleetbase.io/docs/extension-development/resource-views/getting-started
module: extension-development
---

Resource Views

# Getting Started

Add a column to the Fleet-Ops drivers table, give it your own cell, place it where you want, and add an action to each row — step by step.

# Getting Started

This walkthrough adds a
**Safety Score**
to the Fleet-Ops drivers table: first as a plain column, then with a cell component of its own, then in the right position, and finally with a
**Recalculate score**
action in each driver's row menu.

It assumes an extension scaffolded with
`flb scaffold`
(see
[Quickstart](https://fleetbase.io/docs/extension-development/getting-started/quickstart)
), with the console engine
`@acme/safety-engine`
. Everything below goes in that engine.

### Find the registry

Every place you can add to has a
**registry name**
. For a column on the drivers table, it is:

```
fleet-ops:driver:table:columns
```

That reads as: the
**Fleet-Ops**
engine, the
**driver**
resource, its
**table**
view, the
**columns**
slot. The
[Registry Catalogue](https://fleetbase.io/docs/extension-development/resource-views/catalogue/fleet-ops)
lists the name of every slot in every view, and the ids of the columns already there.

### Register a column

Register from your extension's
`setupExtension`
hook, in
`addon/extension.js`
. Get the
`resource-view`
service from
`universe`
, and register a
`TableColumn`
under the registry name:

```
// addon/extension.js
import { TableColumn } from '@fleetbase/ember-core/contracts';

export default {
    setupExtension(app, universe) {
        const views = universe.getService('resource-view');

        views.register(
            'fleet-ops:driver:table:columns',
            new TableColumn({
                id: 'acme-safety-score',
                label: 'Safety Score',
                valuePath: 'meta.safety_score',
            })
        );
    },
};
```

* **`id`**
  is required, and must be unique in the slot. Prefix it with your extension's name.
* **`label`**
  is the column header.
* **`valuePath`**
  is where each row's value is read from. Here it reads
  `driver.meta.safety_score`
  .

Reload the console and open
**Fleet-Ops → Drivers**
. The
**Safety Score**
column is at the end of the table, just before the "…" column, showing each driver's
`meta.safety_score`
as text. It is also listed in the column picker, so users can hide it.

**Register in
`setupExtension`
.**
It runs once, when the console boots, before any engine's views are created. Registering later works for most items, but a filterable column must be registered here. See
[Filterable Columns](https://fleetbase.io/docs/extension-development/resource-views/tables/filterable-columns)
.

### Render your own cell

A plain value is often not enough. To render the score as a coloured badge, give the column a
**cell component**
from your own engine, with an
`ExtensionComponent`
:

```
import { TableColumn, ExtensionComponent } from '@fleetbase/ember-core/contracts';

views.register(
    'fleet-ops:driver:table:columns',
    new TableColumn({ id: 'acme-safety-score', label: 'Safety Score', valuePath: 'meta.safety_score' })
        .withCellComponent(new ExtensionComponent('@acme/safety-engine', 'cell/safety-score'))
);
```

`withCellComponent()`
is one of the contract's
**chain methods**
: each one sets an option and returns the column, so you can call several in a row. The same could be written as a
`cellComponent`
key in the constructor.
[Columns](https://fleetbase.io/docs/extension-development/resource-views/tables/columns)
lists every option and method.

Then create the component in your engine:

```
{{! addon/components/cell/safety-score.hbs }}
{{#if (eq @value undefined)}}
    <span class="text-gray-400">—</span>
{{else}}
    <Badge @status={{if (gte @value 80) "success" (if (gte @value 50) "warning" "danger")}}>{{@value}}</Badge>
{{/if}}
```

The cell receives the row's value as
`@value`
, the whole record as
`@row`
, and the column as
`@column`
. See
[Custom Cells](https://fleetbase.io/docs/extension-development/resource-views/tables/custom-cells)
.

### Place the column

By default, a registered column goes at the end. To put it after the
**Status**
column instead, place it with
`after()`
and the id of that column:

```
new TableColumn({ id: 'acme-safety-score', label: 'Safety Score', valuePath: 'meta.safety_score' })
    .withCellComponent(new ExtensionComponent('@acme/safety-engine', 'cell/safety-score'))
    .after('status');
```

Built-in ids are listed in the
[catalogue](https://fleetbase.io/docs/extension-development/resource-views/catalogue/fleet-ops#driver)
.
`before()`
,
`index`
and
`priority`
are the other ways to place an item; see
[Placement](https://fleetbase.io/docs/extension-development/resource-views/placement)
.

### Add a row action

Now add a
**Recalculate score**
item to each driver's "…" menu. Row menu items are
`ResourceAction`
s, registered into the
`row-actions`
slot:

```
import { TableColumn, ResourceAction, ExtensionComponent } from '@fleetbase/ember-core/contracts';

views.register(
    'fleet-ops:driver:table:row-actions',
    new ResourceAction({ id: 'acme-recalculate', label: 'Recalculate score', icon: 'calculator' })
        .withHandler((driver, ctx) => {
            const fetch = ctx.owner.lookup('service:fetch');
            return fetch.post(`safety-scores/${driver.id}/recalculate`, {}, { namespace: 'acme-safety/int/v1' });
        })
);
```

The handler receives the
**row's record**
and a
**context**
object,
`ctx`
.
`ctx.owner.lookup()`
reaches any of the console's services. See
[Handlers and Context](https://fleetbase.io/docs/extension-development/resource-views/handlers-and-context)
.

With no placement given, the item goes just above the built-in
**Delete**
item.

### Limit who sees it

Give the action a permission, so users without it see the item disabled, and hide it for drivers it does not apply to:

```
new ResourceAction({ id: 'acme-recalculate', label: 'Recalculate score', icon: 'calculator' })
    .withPermission('acme-safety update score')
    .visibleWhen((driver) => driver.status === 'active')
    .withHandler((driver, ctx) => recalculate(driver, ctx));
```

See
[Visibility and Permissions](https://fleetbase.io/docs/extension-development/resource-views/visibility-and-permissions)
for how each kind of item treats them.

## The Finished Registration

```
// addon/extension.js
import { TableColumn, ResourceAction, ExtensionComponent } from '@fleetbase/ember-core/contracts';

const ENGINE = '@acme/safety-engine';

export default {
    setupExtension(app, universe) {
        const views = universe.getService('resource-view');

        views.register(
            'fleet-ops:driver:table:columns',
            new TableColumn({ id: 'acme-safety-score', label: 'Safety Score', valuePath: 'meta.safety_score' })
                .withCellComponent(new ExtensionComponent(ENGINE, 'cell/safety-score'))
                .after('status')
        );

        views.register(
            'fleet-ops:driver:table:row-actions',
            new ResourceAction({ id: 'acme-recalculate', label: 'Recalculate score', icon: 'calculator' })
                .withPermission('acme-safety update score')
                .visibleWhen((driver) => driver.status === 'active')
                .withHandler((driver, ctx) => {
                    const fetch = ctx.owner.lookup('service:fetch');
                    return fetch.post(`safety-scores/${driver.id}/recalculate`, {}, { namespace: 'acme-safety/int/v1' });
                })
        );
    },
};
```

## Next Steps

* Make the column filterable:
  [Filterable Columns](https://fleetbase.io/docs/extension-development/resource-views/tables/filterable-columns)
  .
* Add to the driver's details view:
  [Header Buttons](https://fleetbase.io/docs/extension-development/resource-views/details/header-buttons)
  ,
  [Menu Items](https://fleetbase.io/docs/extension-development/resource-views/details/menu-items)
  and
  [Tabs](https://fleetbase.io/docs/extension-development/resource-views/details/tabs)
  .
* See every piece together in one extension:
  [Recipe: Extending a Resource View](https://fleetbase.io/docs/extension-development/recipes/extending-a-resource-view)
  .
