---
title: "Extending a Resource View"
url: https://fleetbase.io/docs/extension-development/recipes/extending-a-resource-view
module: extension-development
---

# Extending a Resource View

A complete example — add a filterable column with its own cell, a row action, a bulk action, a details button and a details menu item to the Fleet-Ops drivers views from a separate extension.

# Recipe: Extending a Resource View

This recipe builds a small
**Acme Safety**
extension. It scores each driver and adds to the Fleet-Ops driver views:

* a
  **Safety Score**
  column on the drivers table, with its own cell and a filter;
* a
  **Recalculate score**
  item in each driver row's menu;
* a
  **Recalculate scores**
  bulk action;
* a
  **Safety report**
  button in the driver details panel;
* a
  **Flag for coaching**
  item in that panel's "…" menu.

It assumes an extension scaffolded with
`flb scaffold`
(see
[Quickstart](https://fleetbase.io/docs/extension-development/getting-started/quickstart)
), whose console engine is
`@acme/safety-engine`
and whose API has a
`safety_scores`
table keyed by driver.

## 1. Register Everything in extension.js

```
// addon/extension.js
import { TableColumn, ResourceAction, ActionButton, ExtensionComponent } from '@fleetbase/ember-core/contracts';

const ENGINE = '@acme/safety-engine';

export default {
    setupExtension(app, universe) {
        const views = universe.getService('resource-view');

        // The column: rendered by our own cell, filterable by score band.
        views.register(
            'fleet-ops:driver:table:columns',
            new TableColumn({ id: 'acme-safety-score', label: 'Safety Score', width: 130 })
                .after('status')
                .withCellComponent(new ExtensionComponent(ENGINE, 'cell/safety-score'))
                .withFilter('acme_safety_band', 'filter/select', {
                    filterLabel: 'Safety score',
                    filterOptions: [
                        { label: 'Good (80+)', value: 'good' },
                        { label: 'Fair (50–79)', value: 'fair' },
                        { label: 'Poor (under 50)', value: 'poor' },
                    ],
                    filterOptionLabel: 'label',
                    filterOptionValue: 'value',
                })
        );

        // A row action, kept above Fleet-Ops' own Delete.
        views.register(
            'fleet-ops:driver:table:row-actions',
            new ResourceAction({ id: 'acme-recalculate', label: 'Recalculate score', icon: 'calculator', permission: 'acme-safety update score' })
                .withHandler((driver, ctx) => ctx.owner.lookup('service:acme-safety').recalculate([driver]))
        );

        // A bulk action: the selection is passed in.
        views.register(
            'fleet-ops:driver:table:bulk-actions',
            new ResourceAction({ id: 'acme-recalculate-selected', label: 'Recalculate scores', icon: 'calculator' })
                .withHandler((drivers, ctx) => ctx.owner.lookup('service:acme-safety').recalculate(drivers))
        );

        // A header button on the driver details panel.
        views.register(
            'fleet-ops:driver:details:actions',
            new ActionButton({ id: 'acme-safety-report', text: 'Safety report', icon: 'file-shield' })
                .withHandler((ctx) => ctx.owner.lookup('service:acme-safety').openReport(ctx.resource))
        );

        // An item in the panel's "…" menu, only for drivers who need it.
        views.register(
            'fleet-ops:driver:details:menu',
            new ResourceAction({ id: 'acme-flag-coaching', label: 'Flag for coaching', icon: 'flag' })
                .visibleWhen((driver, ctx) => ctx.owner.lookup('service:abilities').can('acme-safety update score'))
                .withHandler((driver, ctx) => ctx.owner.lookup('service:acme-safety').flag(driver))
        );
    },
};
```

## 2. Make a Service Available to Handlers

Handlers reach services through
`ctx.owner`
, which is the console's owner. Register your service with the host, so it can be looked up from there:

```
// addon/extension.js
import AcmeSafetyService from './services/acme-safety';

export default {
    setupExtension(app, universe) {
        universe.getService('registry').registerService('acme-safety', AcmeSafetyService);
        // …the registrations from step 1
    },
};
```

```
// addon/services/acme-safety.js
import Service, { inject as service } from '@ember/service';

export default class AcmeSafetyService extends Service {
    @service fetch;
    @service notifications;
    @service modalsManager;

    async recalculate(drivers) {
        await this.fetch.post('safety-scores/recalculate', { drivers: drivers.map((d) => d.id) }, { namespace: 'acme-safety/int/v1' });
        this.notifications.success(`Recalculating ${drivers.length} driver score(s).`);
    }

    async scoreFor(driver) {
        return this.fetch.get(`safety-scores/${driver.id}`, {}, { namespace: 'acme-safety/int/v1' });
    }

    openReport(driver) {
        this.modalsManager.show('modals/acme-safety-report', { title: `Safety report: ${driver.name}`, driver });
    }

    flag(driver) {
        return this.fetch.post(`safety-scores/${driver.id}/flag`, {}, { namespace: 'acme-safety/int/v1' });
    }
}
```

## 3. The Cell Component

The column has no
`valuePath`
, because the score lives in our API, not on the driver record. The cell loads it:

```
// addon/components/cell/safety-score.js
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default class CellSafetyScoreComponent extends Component {
    @service('acme-safety') safety;
    @tracked score = null;

    constructor() {
        super(...arguments);
        this.load.perform();
    }

    @task *load() {
        const { score } = yield this.safety.scoreFor(this.args.row);
        this.score = score;
    }
}
```

```
{{! addon/components/cell/safety-score.hbs }}
{{#if this.load.isRunning}}
    <Spinner />
{{else if (eq this.score null)}}
    <span class="text-gray-400">—</span>
{{else}}
    <Badge @status={{if (gte this.score 80) "success" (if (gte this.score 50) "warning" "danger")}}>{{this.score}}</Badge>
{{/if}}
```

The cell receives
`@row`
(the driver),
`@column`
and
`@value`
.

A cell that fetches its own data makes one request per row. For large tables, batch the requests, for example by collecting row ids for a short moment and loading them together, or have your API add the score to the driver's
`meta`
so a plain
`valuePath: 'meta.safety_score'`
is enough.

## 4. The API Side of the Filter

Choosing
**Good**
in the Filters menu requests
`GET /int/v1/drivers?acme_safety_band=good`
. Teach the drivers filter what that means with an expansion:

```
<?php
// server/src/Expansions/DriverFilterExpansion.php

namespace Acme\Safety\Expansions;

use Fleetbase\Build\Expansion;

class DriverFilterExpansion implements Expansion
{
    public static function target()
    {
        return \Fleetbase\FleetOps\Http\Filter\DriverFilter::class;
    }

    /** Handles ?acme_safety_band=good|fair|poor */
    public static function acmeSafetyBand()
    {
        return function ($band) {
            [$min, $max] = match ($band) {
                'good'  => [80, 101],
                'fair'  => [50, 80],
                default => [0, 50],
            };

            $this->builder->whereIn('uuid', function ($query) use ($min, $max) {
                $query->select('driver_uuid')
                    ->from('acme_safety_scores')
                    ->where('score', '>=', $min)
                    ->where('score', '<', $max);
            });
        };
    }
}
```

```
// server/src/Providers/AcmeSafetyServiceProvider.php
public function boot()
{
    parent::boot();
    $this->registerExpansionsFrom(__DIR__ . '/../Expansions');
}
```

The drivers table includes
`acme_safety_band`
in its query params automatically, because the column was registered in
`setupExtension`
. See
[Filterable Columns](https://fleetbase.io/docs/extension-development/resource-views/tables/filterable-columns)
.

## 5. Permissions

The row action declares
`permission: 'acme-safety update score'`
, so users without it see it disabled. Register the permission on the API side, as for any of your extension's abilities; see
[Service Provider](https://fleetbase.io/docs/extension-development/backend/service-provider)
. Menu items do not check
`permission`
, so the coaching item checks the ability in
`visibleWhen`
.

## Result

* **Drivers table:**
  a Safety Score column after Status; a Safety score filter in Filters;
  **Recalculate score**
  in each row's menu, above Delete;
  **Recalculate scores**
  under Bulk Actions.
* **Driver details panel**
  , routed or as a side panel: a
  **Safety report**
  button, and
  **Flag for coaching**
  in the "…" menu.

Nothing in Fleet-Ops changed. When Acme Safety is uninstalled, the additions go with it.

## Going Further

* Add to other engines with the same code: change the registry name. Look the names up in the
  [Registry Catalogue](https://fleetbase.io/docs/extension-development/resource-views/catalogue)
  .
* Add a
  **Safety**
  tab to the driver details by registering a
  `MenuItem`
  in
  `fleet-ops:driver:details:tabs`
  . See
  [Registering](https://fleetbase.io/docs/extension-development/resource-views/details/tabs)
  .
* Let other extensions add to
  *your*
  engine's views:
  [Making Views Extensible](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible)
  .

[Registering Notifications

Define notification classes that show up in user notification preferences and dispatch via mail, SMS, push, broadcast, and database channels.](https://fleetbase.io/docs/extension-development/recipes/registering-notifications)
[Building an Order Type

A complete example — an equipment rental order type for Fleet-Ops with its own lifecycle, its own form and details sections, hidden dispatch actions and validation, built from an order config, a configured lifecycle and an order presentation profile.](https://fleetbase.io/docs/extension-development/recipes/building-an-order-type)
