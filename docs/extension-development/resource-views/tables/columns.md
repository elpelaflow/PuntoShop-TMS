---
title: "Columns"
url: https://fleetbase.io/docs/extension-development/resource-views/tables/columns
module: extension-development
---

Resource Views

Table Views

# Columns

Add a column to another engine's table with TableColumn — every option and chain method, the built-in cells you can use, placement, permissions, and where the column's data comes from.

# Columns

A registered column appears in the table like any built-in one. Users can hide it with the column picker, resize it, and, if you make it filterable, filter by it.

```
import { TableColumn } from '@fleetbase/ember-core/contracts';

universe.getService('resource-view').register(
    'fleet-ops:vehicle:table:columns',
    new TableColumn({ id: 'acme-odometer', label: 'Odometer', valuePath: 'meta.odometer_km', width: 120 }).after('plate-number')
);
```

|  |  |
| --- | --- |
| **Slot** | `<extension>:<resource>:table:columns` |
| **Contract** | `TableColumn` , from `@fleetbase/ember-core/contracts` |
| **Default spot** | Just before the row actions ("…") column |
| **Without the permission** | The column is left out |

## Creating a Column

Pass the options to the constructor, set them with chain methods, or mix both. These three are the same column:

```
new TableColumn({ id: 'acme-odometer', label: 'Odometer', valuePath: 'meta.odometer_km', after: 'plate-number' });

new TableColumn({ id: 'acme-odometer' }).withLabel('Odometer').withValuePath('meta.odometer_km').after('plate-number');

new TableColumn({ id: 'acme-odometer', label: 'Odometer' }).withValuePath('meta.odometer_km').after('plate-number');
```

Each chain method sets one option and returns the column, so calls can follow one another. A plain object with the same keys also works, but the contract checks that
`id`
is set as soon as you create it.

## Options

Prop

Type

`id`

string

`label
?`

string

`valuePath
?`

string

`cellComponent
?`

string | ExtensionComponent

`width
?`

number

`resizable
?`

boolean

`hidden
?`

boolean

`sticky
?`

'left' | 'right'

`cellClassNames
?`

string

`sortable
?`

boolean

`sortParam
?`

string

`filterable
?`

boolean

`filterParam
?`

string

`filterComponent
?`

string | ExtensionComponent

`permission
?`

string

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

Any other key is passed through to the column as it is, so options that built-in cells read, such as
`anchorText`
or
`humanize`
, work too.

## Methods

| Method | Sets | Example |
| --- | --- | --- |
| `withLabel(label)` | `label` | `.withLabel('Odometer')` |
| `withValuePath(path)` | `valuePath` | `.withValuePath('meta.odometer_km')` |
| `withCellComponent(component)` | `cellComponent` | `.withCellComponent(new ExtensionComponent('@acme/engine', 'cell/odometer'))` |
| `withFilter(param, component?, options?)` | `filterable: true` , `filterParam` , `filterComponent` (default `filter/string` ), and every key in `options` | `.withFilter('acme_odometer_min', 'filter/string')` |
| `before(id)` | `before` , clearing `after` | `.before('status')` |
| `after(id)` | `after` , clearing `before` | `.after('status')` |
| `withIndex(index)` | `index` | `.withIndex(1)` |
| `withPriority(priority)` | `priority` | `.withPriority(5)` |
| `withPermission(permission)` | `permission` | `.withPermission('acme view odometer')` |

## Where the Data Comes From

`valuePath`
can only read what is already on the record the table loaded. That leaves three options:

| Your data is | Use |
| --- | --- |
| A field the API already returns | `valuePath: 'field_name'` |
| Something your extension can store on the record's `meta` | `valuePath: 'meta.your_key'` , and write the value from your extension's server code |
| In your extension's own tables | A [custom cell](https://fleetbase.io/docs/extension-development/resource-views/tables/custom-cells) that loads it from your API with `@row.id` |

A cell that fetches its own data makes one request per visible row. For big tables, batch the requests in a service, or store a summary value in
`meta`
so
`valuePath`
can read it.

## Using a Built-in Cell

`cellComponent`
can name any of the console's cell components, and the column's keys configure it:

| `cellComponent` | Renders | Keys it reads |
| --- | --- | --- |
| `table/cell/base` (default) | The value as text, or `-` | `humanize: true` to humanize the value |
| `table/cell/status` | The value as a status badge |  |
| `table/cell/anchor` | The value as a link that runs a function | `action(row)` , `anchorText` , `anchorIcon` , `anchorClass` |
| `table/cell/link-to` | The value as a link to a route | `route` , `linkClass` , `linkIcon` |
| `table/cell/currency` | The value as money, in the row's `currency` | `currency` for a fixed currency |
| `table/cell/country` | A country name and flag from a country code |  |
| `table/cell/point` | Coordinates |  |

```
new TableColumn({ id: 'acme-tier', label: 'Tier', valuePath: 'meta.acme_tier', cellComponent: 'table/cell/status' });

new TableColumn({
    id: 'acme-contract',
    label: 'Contract',
    valuePath: 'meta.acme_contract_ref',
    cellComponent: 'table/cell/anchor',
    action: (vehicle) => openContract(vehicle),
});
```

## Examples

### A Hidden-by-Default Column

Useful for detail that only some users want:

```
new TableColumn({ id: 'acme-vin-check', label: 'VIN check', valuePath: 'meta.acme_vin_status', hidden: true, cellComponent: 'table/cell/status' });
```

### A Column Only Some Users Get

```
new TableColumn({ id: 'acme-cost', label: 'Cost per km', valuePath: 'meta.acme_cost_per_km', cellComponent: 'table/cell/currency' })
    .withPermission('acme view costs');
```

### Columns on Several Tables

Register the same kind of column on several resources by looping over them:

```
for (const resource of ['vehicle', 'trailer', 'equipment']) {
    views.registerTableColumn(
        'fleet-ops',
        resource,
        new TableColumn({ id: 'acme-asset-tag', label: 'Asset tag', valuePath: 'meta.acme_asset_tag', width: 110 })
    );
}
```

## Sorting

Registered columns are
**not sortable**
unless you set
`sortable: true`
. Sorting asks the API to order by
`sortParam`
(or
`valuePath`
), so only turn it on when that is a real database column of the resource's table:

```
new TableColumn({ id: 'acme-region', label: 'Region', valuePath: 'region', sortable: true, sortParam: 'region' });
```

Values in
`meta`
, or computed by your cell, can't be sorted this way.

## Related

* [Custom Cells](https://fleetbase.io/docs/extension-development/resource-views/tables/custom-cells)
  : render your own component in each cell.
* [Filterable Columns](https://fleetbase.io/docs/extension-development/resource-views/tables/filterable-columns)
  : add a filter, end to end.
* [Placement](https://fleetbase.io/docs/extension-development/resource-views/placement)
  :
  `before`
  ,
  `after`
  ,
  `index`
  and
  `priority`
  in detail.

[Visibility and Permissions

How each kind of item handles a permission and a visibility check — hidden, shown disabled, or left out — with examples of gating items on abilities, record state and user settings.](https://fleetbase.io/docs/extension-development/resource-views/visibility-and-permissions)
[Custom Cells

Render your own component in each cell of a registered column, from your own engine — the arguments it receives, loading data per row, and examples from a coloured badge to an inline action.](https://fleetbase.io/docs/extension-development/resource-views/tables/custom-cells)
