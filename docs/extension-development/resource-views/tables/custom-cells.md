---
title: "Custom Cells"
url: https://fleetbase.io/docs/extension-development/resource-views/tables/custom-cells
module: extension-development
---

Resource Views

Table Views

# Custom Cells

Render your own component in each cell of a registered column, from your own engine — the arguments it receives, loading data per row, and examples from a coloured badge to an inline action.

# Custom Cells

A column's
`cellComponent`
can be a component from
**your own engine**
. Wrap it in an
`ExtensionComponent`
, with your engine's package name and the component's path:

```
import { TableColumn, ExtensionComponent } from '@fleetbase/ember-core/contracts';

new TableColumn({ id: 'acme-safety-score', label: 'Safety Score', valuePath: 'meta.safety_score' })
    .withCellComponent(new ExtensionComponent('@acme/safety-engine', 'cell/safety-score'));
```

The component lives at
`addon/components/cell/safety-score.{js,hbs}`
in
`@acme/safety-engine`
. Your engine is loaded the first time a cell needs it, and cells render once it has.

## Arguments

| Argument | Value |
| --- | --- |
| `@value` | What the column's `valuePath` read off the row. `undefined` without a `valuePath` |
| `@row` | The row's record, such as the driver |
| `@column` | The column definition, including any extra keys you passed |

Extra keys on the column are a way to configure one cell component for several columns:

```
new TableColumn({ id: 'acme-score', label: 'Score', valuePath: 'meta.score', thresholds: [50, 80] })
    .withCellComponent(new ExtensionComponent(ENGINE, 'cell/score-badge'));
```

```
// addon/components/cell/score-badge.js
import Component from '@glimmer/component';

export default class CellScoreBadgeComponent extends Component {
    get status() {
        const [warning, good] = this.args.column.thresholds ?? [50, 80];
        const value = Number(this.args.value);
        return value >= good ? 'success' : value >= warning ? 'warning' : 'danger';
    }
}
```

```
{{! addon/components/cell/score-badge.hbs }}
<Badge @status={{this.status}}>{{or @value "—"}}</Badge>
```

## Examples

### A Badge from the Value

```
{{! addon/components/cell/safety-score.hbs }}
{{#if (eq @value undefined)}}
    <span class="text-gray-400">—</span>
{{else}}
    <Badge @status={{if (gte @value 80) "success" (if (gte @value 50) "warning" "danger")}}>{{@value}}</Badge>
{{/if}}
```

### Data Loaded per Row

When the value lives in your extension's API, load it in the cell. Use the row's id, and show something while it loads:

```
// addon/components/cell/contract-status.js
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default class CellContractStatusComponent extends Component {
    @service fetch;
    @tracked contract = null;

    constructor() {
        super(...arguments);
        this.load.perform();
    }

    @task *load() {
        try {
            this.contract = yield this.fetch.get(`contracts/for-vehicle/${this.args.row.id}`, {}, { namespace: 'acme/int/v1' });
        } catch {
            this.contract = null;
        }
    }
}
```

```
{{! addon/components/cell/contract-status.hbs }}
{{#if this.load.isRunning}}
    <Spinner />
{{else if this.contract}}
    <Badge @status={{this.contract.status}} />
{{else}}
    <span class="text-gray-400">No contract</span>
{{/if}}
```

**One request per row adds up.**
A table of 50 rows makes 50 requests. Collect the row ids in a service and load them in one request, or have your server write a summary value into the record's
`meta`
and use
`valuePath`
instead.

### An Inline Action

A cell can hold a button. Stop the click from also opening the row:

```
// addon/components/cell/ping-tracker.js
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default class CellPingTrackerComponent extends Component {
    @service fetch;
    @service notifications;

    @task *ping(event) {
        event?.stopPropagation();
        yield this.fetch.post(`trackers/${this.args.row.id}/ping`, {}, { namespace: 'acme/int/v1' });
        this.notifications.success(`Pinged ${this.args.row.name}.`);
    }
}
```

```
{{! addon/components/cell/ping-tracker.hbs }}
<Button @size="xs" @icon="satellite-dish" @text="Ping" @isLoading={{this.ping.isRunning}} @onClick={{perform this.ping}} />
```

## Built-in Cells

You don't always need your own component. See
[Using a Built-in Cell](https://fleetbase.io/docs/extension-development/resource-views/tables/columns#using-a-built-in-cell)
for the cells the console provides.

## Your Own Filter Input

A column's
`filterComponent`
can be an
`ExtensionComponent`
too. See
[Filterable Columns](https://fleetbase.io/docs/extension-development/resource-views/tables/filterable-columns#your-own-filter-input)
.

[Columns

Add a column to another engine's table with TableColumn — every option and chain method, the built-in cells you can use, placement, permissions, and where the column's data comes from.](https://fleetbase.io/docs/extension-development/resource-views/tables/columns)
[Filterable Columns

Make a registered column filterable end to end — the column's filter keys, how its filter param reaches the URL and the API, and the Filter expansion that applies it on the server.](https://fleetbase.io/docs/extension-development/resource-views/tables/filterable-columns)
