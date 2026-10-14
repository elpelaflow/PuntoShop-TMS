---
title: "Widget Service"
url: https://fleetbase.io/docs/extension-development/universe/widget-service
module: extension-development
---

# Widget Service

Register dashboards and widgets that show up on the Fleetbase home dashboard or your extension's own dashboard surface.

# Widget Service

The
**widget service**
(
`universe/widget-service`
) manages two registries used by the dashboard:

* **Dashboards**
  — named groups of widgets (
  `'dashboard'`
  is the built-in console home; you can register your own)
* **Widgets**
  —
  `Widget`
  descriptors made selectable on a dashboard, optionally auto-loaded as defaults

You'll most often add widgets to the built-in
`'dashboard'`
. You can also register your own dashboard for an extension-specific page.

## Resolving the Service

```
// addon/extension.js
import { Widget, ExtensionComponent } from '@fleetbase/ember-core/contracts';

export default {
    setupExtension(app, universe) {
        const widgetService = universe.getService('widget');
        // …
    },
};
```

## Registering Widgets on the Built-in Dashboard

The most common pattern — add one or more widgets to the console home dashboard. Widgets with
`default: true`
are also added to the default-widget list, so they appear automatically the first time a user lands on the dashboard.

```
// addon/extension.js
import { Widget, ExtensionComponent } from '@fleetbase/ember-core/contracts';

export default {
    setupExtension(app, universe) {
        const widgetService = universe.getService('widget');

        widgetService.registerWidgets('dashboard', [
            new Widget({
                id: 'fleet-ops-key-metrics',
                name: 'Fleet-Ops Metrics',
                description: 'Active vehicles, drivers, and live orders.',
                icon: 'truck',
                component: new ExtensionComponent(
                    '@fleetbase/fleetops-engine',
                    'widget/fleet-ops-key-metrics'
                ),
                grid_options: { w: 12, h: 7, minW: 8, minH: 7 },
                options: { title: 'Fleet-Ops Metrics' },
                default: true,
            }),
        ]);
    },
};
```

Real example:
[`packages/fleetops/addon/extension.js`](https://github.com/elpelaflow/PuntoShop-TMS/blob/main/packages/fleetops/addon/extension.js)
.

## Registering a New Dashboard

For extensions that ship their own dashboard surface (e.g. Ledger's
`/console/ledger`
overview), register the dashboard and then attach widgets to it.

```
widgetService.registerDashboard('ledger');
widgetService.registerWidgets('ledger', widgets);
```

Real example:
[`packages/ledger/addon/extension.js:185`](https://github.com/elpelaflow/PuntoShop-TMS/blob/main/packages/ledger/addon/extension.js#L185)
— Ledger registers its own dashboard, attaches its full widget set there, and additionally exposes a curated subset on the built-in
`'dashboard'`
.

## Methods

### registerDashboard(name, options?)

Registers a named dashboard.
`options`
are stored alongside the dashboard record and forwarded to whatever component renders it.

```
widgetService.registerDashboard('ledger', {
    title: 'Ledger Overview',
    icon: 'gauge-high',
});
```

### registerWidgets(dashboardName, widgets)

Adds widgets to a dashboard's pickable list. Widgets with
`default: true`
are
**also**
added to the default-widget list.

* `widgets`
  accepts a single
  `Widget`
  /object or an array
* Each widget is normalized via
  `Widget.toObject()`
  and stored under the key
  `${dashboardName}#${widget.id}`
* `id`
  (or the legacy alias
  `widgetId`
  ) is required; missing ids emit a warning

### registerDefaultWidgets(dashboardName, widgets)

Adds widgets directly to the default-widget list — they'll auto-load on first render even if they aren't in the pickable list. Use sparingly; most widgets should go through
`registerWidgets()`
with
`default: true`
.

### getWidgets(dashboardName)

Returns all widgets registered for the given dashboard.

### getDefaultWidgets(dashboardName)

Returns the auto-loaded subset.

### getWidget(dashboardName, widgetId)

Looks up a single widget.

### getDashboards() / getDashboard(name)

Returns the dashboard registry / a single dashboard record.

## The Widget Contract

`Widget`
accepts both an options object and a fluent-builder form. See
[Contracts →
`Widget`](https://fleetbase.io/docs/extension-development/reference/contracts#widget)
for the full property table.

| Property | Description |
| --- | --- |
| `id` | **Required.** Unique identifier (alias `widgetId` accepted) |
| `name` | Display name in the picker |
| `description` | Short description in the picker |
| `icon` | FontAwesome icon |
| `component` | An `ExtensionComponent` (string path, class, or full options) |
| `grid_options` | `{ w, h, minW, minH }` — passed through to `grid-stack` |
| `options` | Default options forwarded to the widget component |
| `category` | Picker category (default `'default'` ) |
| `default` | Auto-add to the dashboard's default-widget list |

```
new Widget({
    id: 'fleet-ops-key-metrics',
    name: 'Fleet-Ops Metrics',
    description: 'Active vehicles, drivers, and live orders.',
    icon: 'truck',
    component: new ExtensionComponent('@fleetbase/fleetops-engine', 'widget/fleet-ops-key-metrics'),
    grid_options: { w: 12, h: 7, minW: 8, minH: 7 },
    options: { title: 'Fleet-Ops Metrics' },
    default: true,
});
```

## Building the Widget Component

A widget component lives inside your engine — anywhere under
`addon/components/`
works. The
`ExtensionComponent`
reference is what crosses the engine boundary.

```
{{!-- addon/components/widget/fleet-ops-key-metrics.hbs --}}
<div class="widget">
    {{#if this.isLoading}}
        <Spinner />
    {{else}}
        <div class="text-2xl">{{this.metrics.activeOrders}}</div>
        <div class="text-xs text-secondary">Active transport orders</div>
    {{/if}}
</div>
```

```
// addon/components/widget/fleet-ops-key-metrics.js
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class FleetOpsKeyMetricsWidget extends Component {
    @service fetch;
    @tracked metrics = null;
    @tracked isLoading = true;

    constructor() {
        super(...arguments);
        this.load();
    }

    async load() {
        this.metrics = await this.fetch.get('fleet-ops/metrics');
        this.isLoading = false;
    }
}
```

## Deprecated Methods

The two façade shortcuts on
`UniverseService`
are still wired but emit deprecation warnings:

| Deprecated | Use instead |
| --- | --- |
| `universe.registerDashboardWidgets(widgets)` | `universe.getService('widget').registerWidgets('dashboard', widgets)` |
| `universe.registerDefaultDashboardWidgets(widgets)` | `universe.getService('widget').registerDefaultWidgets('dashboard', widgets)` |

## Source

| File | Description |
| --- | --- |
| `addon/services/universe/widget-service.js` | `WidgetService` |
| `addon/contracts/widget.js` | `Widget` contract |
| [`packages/fleetops/addon/extension.js`](https://github.com/elpelaflow/PuntoShop-TMS/blob/main/packages/fleetops/addon/extension.js) | Transport widgets on built-in dashboard |
| [`packages/ledger/addon/extension.js`](https://github.com/elpelaflow/PuntoShop-TMS/blob/main/packages/ledger/addon/extension.js) | Custom dashboard + widget set |

[Hook Service

Tap into platform lifecycle events using hooks to run logic at key points in the application — login, route transitions, console boot, and custom events you fire yourself.](https://fleetbase.io/docs/extension-development/universe/hook-service)
[Registry Service

Create registries, register components into other extensions' slots, and register cross-engine components, services, and helpers — via universe.getService('registry').](https://fleetbase.io/docs/extension-development/universe/registry-service)
