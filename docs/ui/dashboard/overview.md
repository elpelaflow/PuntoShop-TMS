---
title: "Overview"
url: https://fleetbase.io/docs/ui/dashboard/overview
module: ui
---

# Overview

How dashboards work in @fleetbase/ember-ui — the dashboard service, widgets, and widget registries.

# Dashboards

`@fleetbase/ember-ui`
ships a complete dashboard subsystem — a
[`dashboard`
service](https://fleetbase.io/docs/ui/dashboard/service)
for managing dashboards, a
`<Dashboard>`
component for rendering them, plus stat widgets and a Universe-backed widget registry that lets extensions contribute widgets to each other.

Most extension authors don't render
`<Dashboard>`
directly — the console hosts a dashboard page for each extension that supports them, driven by the service.

## How It Fits Together

```
┌──────────────────────────────────────────────────────┐
│  universe/widget-service                              │
│  ├── registerWidget('chart', { component, defaults })│
│  └── available widget types for the picker            │
└──────────────────────────────────────────────────────┘
              │
              ▼
┌──────────────────────────────────────────────────────┐
│  dashboard service                                    │
│  ├── loadDashboards()                                 │
│  ├── currentDashboard                                 │
│  ├── isEditingDashboard / isAddingWidget               │
│  └── selectDashboard / createDashboard / deleteDashboard │
└──────────────────────────────────────────────────────┘
              │
              ▼
┌──────────────────────────────────────────────────────┐
│  <Dashboard> component                                │
│  └── Renders currentDashboard's widgets in a grid     │
└──────────────────────────────────────────────────────┘
```

## Pages

Dashboard Service

Full API for loading, switching, creating, and editing dashboards.

[Dashboard Service →](https://fleetbase.io/docs/ui/dashboard/service)

## Contributing a Widget

Extensions register widgets to a dashboard from their
`addon/extension.js`
using the
`Widget`
contract from
`@fleetbase/ember-core/contracts`
and the Universe
`widget`
service:

```
// addon/extension.js
import { Widget, ExtensionComponent } from '@fleetbase/ember-core/contracts';

export default {
    setupExtension(app, universe) {
        const widgetService = universe.getService('widget');

        const widgets = [
            new Widget({
                id: 'fleet-ops-kpi-earnings-widget',
                name: 'Earnings (30d)',
                description: 'Total transport earnings over the last 30 days with trend.',
                icon: 'sack-dollar',
                component: new ExtensionComponent('@fleetbase/fleetops-engine', 'widget/kpi-earnings'),
                grid_options: { w: 3, h: 4, minW: 3, minH: 4 },
                options: { title: 'Earnings' },
                default: true,
            }),
        ];

        widgetService.registerWidgets('dashboard', widgets);
    },
};
```

| `Widget` field | Description |
| --- | --- |
| `id` | Unique widget identifier |
| `name` | Display name in the picker |
| `description` | Short description shown in the picker |
| `icon` | FontAwesome icon name |
| `component` | An `ExtensionComponent` pointing at the widget renderer in your engine |
| `grid_options` | Grid layout — `{ w, h, minW, minH }` columns/rows for `grid-stack` |
| `options` | Default options passed to the widget component |
| `default` | If `true` , the widget is added to the default dashboard automatically |

The first argument to
`registerWidgets()`
is the dashboard ID —
`'dashboard'`
for the default dashboard. Extensions that ship their own dashboards register their widgets against that dashboard's ID.

See real examples:

| Extension | Reference |
| --- | --- |
| Fleet-Ops — registers transport KPI and live fleet widgets | `packages/fleetops/addon/extension.js` |
| Ledger — registers financial dashboard and cash flow widgets | `packages/ledger/addon/extension.js` |
| IAM Engine — registers an IAM Metrics widget | `packages/iam-engine/addon/extension.js` |

## See Also

* [Dashboard Service](https://fleetbase.io/docs/ui/dashboard/service)
  — full API
* [Registry & Slots](https://fleetbase.io/docs/ui/registry/overview)
  — the broader registration model
* [Universe](https://fleetbase.io/docs/extension-development/universe)
  — the underlying registry system

## Source

| File | Description |
| --- | --- |
| `addon/services/dashboard.js` | Service class |
| `addon/components/dashboard.hbs` | Template |
| `addon/components/dashboard.js` | Class |
| `addon/components/widget/` | Widget subcomponents |
