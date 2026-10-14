---
title: "Filterable Columns"
url: https://fleetbase.io/docs/extension-development/resource-views/tables/filterable-columns
module: extension-development
---

Resource Views

Table Views

# Filterable Columns

Make a registered column filterable end to end — the column's filter keys, how its filter param reaches the URL and the API, and the Filter expansion that applies it on the server.

# Filterable Columns

A registered column can be filterable, exactly like a built-in one. The table's
**Filters**
menu is built from its columns, so a filterable column brings its own filter input with it.

Making a filter actually filter takes three pieces:

1. **The column**
   declares a filter:
   `filterable`
   , a
   `filterParam`
   , and a
   `filterComponent`
   .
2. **The table's index controller**
   includes that param in its query params. The built-in engines do this already; see
   [below](#2-the-query-param)
   .
3. **The API**
   knows what the param means: a Filter expansion in your extension's server code.

## 1. The Column

```
// addon/extension.js
import { TableColumn } from '@fleetbase/ember-core/contracts';

export default {
    setupExtension(app, universe) {
        universe.getService('resource-view').register(
            'fleet-ops:driver:table:columns',
            new TableColumn({ id: 'acme-safety-score', label: 'Safety Score', valuePath: 'meta.safety_score' })
                .after('status')
                .withFilter('acme_safety_score', 'filter/select', {
                    filterLabel: 'Safety score',
                    filterOptions: [
                        { label: 'Good (80+)', value: 'good' },
                        { label: 'Needs attention', value: 'poor' },
                    ],
                    filterOptionLabel: 'label',
                    filterOptionValue: 'value',
                })
        );
    },
};
```

`withFilter(filterParam, filterComponent = 'filter/string', options = {})`
sets
`filterable: true`
, the param and the component, plus any other filter keys you pass. Writing them out as plain keys works the same:

```
new TableColumn({
    id: 'acme-safety-score',
    label: 'Safety Score',
    valuePath: 'meta.safety_score',
    filterable: true,
    filterParam: 'acme_safety_score',
    filterComponent: 'filter/string',
});
```

| Key | Description |
| --- | --- |
| `filterable` | `true` to show the column in the **Filters** menu |
| `filterParam` | The query param the filter writes. It goes into the URL and is sent to the API |
| `filterComponent` | The input. A built-in `filter/*` component, or an `ExtensionComponent` from your engine |
| `filterLabel` | Label in the Filters menu; defaults to `label` |
| `filterComponentPlaceholder` | Placeholder text |
| `filterOptions` , `filterOptionLabel` , `filterOptionValue` | Options for `filter/select` , `filter/multi-option` and `filter/radio` |
| `filterFetchOptions` , `model` , `modelNamePath` | For `filter/model` and `filter/model-multiple` , which search records |

Built-in filter components:
`filter/string`
,
`filter/select`
,
`filter/multi-option`
,
`filter/multi-input`
,
`filter/radio`
,
`filter/checkbox`
,
`filter/date`
,
`filter/range`
,
`filter/country`
,
`filter/model`
and
`filter/model-multiple`
.

**Prefix your param with your extension's name**
(
`acme_safety_score`
, not
`score`
). Every filter on a table shares one set of query params, and an unprefixed name can collide with a built-in filter or another extension's.

## 2. The Query Param

A filter only takes effect if the table's controller declares its param as a query param. The engines that expose resource view registries build their index controllers' query params with
`queryParamsFor()`
, which adds the
`filterParam`
of every filterable column registered for that table:

```
// Inside an engine, for reference: the drivers index controller
queryParams = this.driverActions.queryParamsFor(['page', 'limit', 'sort', 'query', 'status' /* … */]);
```

Your extension does nothing for this step, with one condition.
**Register the column in
`setupExtension`
.**
A controller's query params are read once, when the controller is created, which is when its route is first visited. A filterable column registered later, for example in
`onEngineLoaded`
or in response to a user action, is still shown, but its param is not a query param, and the console logs:

```
[resource-view] The filter "acme_safety_score" on "acme-safety-score" was registered after its table was set up, so it is not a query param. Register filter columns in setupExtension.
```

Every table listed in the
[Registry Catalogue](https://fleetbase.io/docs/extension-development/resource-views/catalogue)
does this, except Fleet-Ops fuel transactions.

## 3. The API: a Filter Expansion

With the param in the URL, the console sends it to the API with the table's request, for example
`GET /int/v1/drivers?acme_safety_score=good`
. Each resource's API filter class turns known params into query constraints, by calling the method with the param's name. Your extension adds a method for its param with an
[expansion](https://fleetbase.io/docs/extension-development/backend/expansions-and-observers#expansions)
that targets that filter class:

```
<?php

namespace Acme\Safety\Expansions;

use Fleetbase\Build\Expansion;

class DriverFilterExpansion implements Expansion
{
    /**
     * The filter class for the Fleet-Ops drivers table.
     */
    public static function target()
    {
        return \Fleetbase\FleetOps\Http\Filter\DriverFilter::class;
    }

    /**
     * Handles `?acme_safety_score=…`. The filter looks a param up by its name and by its
     * camelCase form, so `acme_safety_score` finds `acmeSafetyScore`.
     */
    public static function acmeSafetyScore()
    {
        return function ($value) {
            /** @var \Fleetbase\Http\Filter\Filter $this */
            $value === 'good'
                ? $this->builder->where('meta->safety_score', '>=', 80)
                : $this->builder->where('meta->safety_score', '<', 80);
        };
    }
}
```

Load it from your service provider, as with any expansion:

```
// server/src/Providers/AcmeSafetyServiceProvider.php
public function boot()
{
    parent::boot();
    $this->registerExpansionsFrom(__DIR__ . '/../Expansions');
}
```

Inside the closure,
`$this`
is the filter:
`$this->builder`
is the Eloquent query and
`$this->request`
is the request. The filter calls your method only when the param has a non-empty value.

### Finding the Filter Class

Each resource's filter class follows its model name:

| Engine | Namespace | Example |
| --- | --- | --- |
| Fleet-Ops | `Fleetbase\FleetOps\Http\Filter` | `DriverFilter` , `VehicleFilter` , `OrderFilter` , `WorkOrderFilter` |
| Ledger | `Fleetbase\Ledger\Http\Filter` | `InvoiceFilter` , `WalletFilter` , `TransactionFilter` |
| Core (IAM, Developers) | `Fleetbase\Http\Filter` | `UserFilter` , `GroupFilter` , `RoleFilter` , `PolicyFilter` , `ApiCredentialFilter` , `WebhookEndpointFilter` |

**Avoid range suffixes.**
A param ending in
`_after`
,
`_before`
,
`_from`
,
`_to`
,
`_min`
,
`_max`
,
`_start`
,
`_end`
,
`_gte`
,
`_lte`
,
`_greater`
or
`_less`
is treated as one end of a range and routed to a
`<column>Between`
method. Expansions cannot provide that method. Give your params a name without those endings.

## Sorting

Registered columns are
**not sortable**
unless you set
`sortable: true`
. Sorting sends
`sort=<param>`
, or
`sort=-<param>`
for descending, and the API orders by that database column. Only enable it when
`sortParam`
(or
`valuePath`
) is a real column on the resource's table:

```
new TableColumn({ id: 'acme-region', label: 'Region', valuePath: 'region', sortable: true, sortParam: 'region' });
```

Values in
`meta`
, or anything your extension computes, cannot be sorted this way.

## Your Own Filter Input

`filterComponent`
can be an
`ExtensionComponent`
. It receives the same arguments as the built-in filters (
`@value`
,
`@filter`
,
`@param`
,
`@options`
,
`@placeholder`
,
`@onChange`
,
`@onClear`
), and reports changes with
`@onChange(@filter, value)`
:

```
new TableColumn({ id: 'acme-score', label: 'Score', filterable: true, filterParam: 'acme_score' })
    .withFilter('acme_score', new ExtensionComponent('@acme/safety-engine', 'filter/score-range'));
```

```
// addon/components/filter/score-range.js, in @acme/safety-engine
import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class FilterScoreRangeComponent extends Component {
    // @value is the current value and @filter the column's filter. Hand @filter back
    // with every change, exactly as the built-in filter components do.
    @action update(event) {
        this.args.onChange(this.args.filter, event.target.value);
    }

    @action clear() {
        this.args.onClear(this.args.filter);
    }
}
```

## Checklist

* The column has
  `filterable`
  , a prefixed
  `filterParam`
  , and a
  `filterComponent`
* It is registered in
  `setupExtension`
* Your extension's server code has an expansion targeting the resource's filter class, with a method named after the param
* The service provider calls
  `registerExpansionsFrom()`
* The param does not end in a range suffix
