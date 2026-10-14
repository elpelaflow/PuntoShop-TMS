---
title: "Template Builder Service"
url: https://fleetbase.io/docs/ui/services/template-builder
module: ui
---

# Template Builder Service

The `template-builder` service lets extensions register Fleetbase model classes as queryable resource types in the TemplateQuery form.

# Template Builder Service

```
@service templateBuilder;
```

The
`template-builder`
service is a singleton extensions inject to register
**queryable resource types**
for the
[`<TemplateBuilder>`](https://fleetbase.io/docs/ui/builders/template-builder)
component's query form. Each extension registers the Fleetbase model classes it owns so the template builder knows what models can be queried and embedded as dynamic data.

This is what populates the resource-picker grid inside a template's "Add query" UI. Without registering, your models simply won't show up.

## Inject

```
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class MyExtensionComponent extends Component {
  @service templateBuilder;
}
```

## Registering Resource Types

The standard pattern is to register from an
**instance initializer**
in your extension so the registration happens once at boot:

```
// addon/instance-initializers/register-template-resources.js
export function initialize(appInstance) {
    const templateBuilder = appInstance.lookup('service:template-builder');
    templateBuilder.registerResourceTypes([
        { label: 'Order',   value: 'Fleetbase\\FleetOps\\Models\\Order',   icon: 'route' },
        { label: 'Driver',  value: 'Fleetbase\\FleetOps\\Models\\Driver',  icon: 'id-card' },
        { label: 'Vehicle', value: 'Fleetbase\\FleetOps\\Models\\Vehicle', icon: 'truck' },
    ]);
}

export default { initialize };
```

Each resource type object
**must**
have:

| Field | Type | Description |
| --- | --- | --- |
| `label` | string | Human-readable name shown in the picker grid |
| `value` | string | Fully-qualified PHP class name — used by the backend to resolve the model |
| `icon` | string | FontAwesome icon name (without the `fa-` prefix) |

## Public API

| Method | Description |
| --- | --- |
| `registerResourceTypes(types)` | Register one or more resource types. Duplicates (matched by `value` ) are silently ignored |
| `unregisterResourceTypes(values)` | Remove resource types by `value` — useful when an extension is torn down |
| `resourceTypes` | Getter — all currently registered resource types |

## Tracked State

| Property | Description |
| --- | --- |
| `_resourceTypes` | The internal array of registered resource types |

Use the public
`resourceTypes`
getter to read.

## How <TemplateBuilder> Uses It

The query form inside
`<TemplateBuilder>`
reads from
`templateBuilder.resourceTypes`
and merges with any types passed via the component's
`@resourceTypes`
argument — argument values take precedence (override).

This means:

* **Globally registered**
  resources are available in every template builder instance
* **Per-instance overrides**
  can replace or extend the picker for a specific use case

## Real-World Example

A Fleet-Ops-style registration that exposes the three core models:

```
// addon/instance-initializers/register-template-resources.js
export function initialize(appInstance) {
    const templateBuilder = appInstance.lookup('service:template-builder');
    if (!templateBuilder) return;

    templateBuilder.registerResourceTypes([
        { label: 'Order',     value: 'Fleetbase\\FleetOps\\Models\\Order',     icon: 'route' },
        { label: 'Driver',    value: 'Fleetbase\\FleetOps\\Models\\Driver',    icon: 'id-card' },
        { label: 'Vehicle',   value: 'Fleetbase\\FleetOps\\Models\\Vehicle',   icon: 'truck' },
        { label: 'Place',     value: 'Fleetbase\\FleetOps\\Models\\Place',     icon: 'location-dot' },
        { label: 'Service Rate', value: 'Fleetbase\\FleetOps\\Models\\ServiceRate', icon: 'dollar-sign' },
    ]);
}

export default { initialize };
```

After this initializer runs, opening any
`<TemplateBuilder>`
and clicking "Add query" will show all five resource types in the picker.

## See Also

* [`<TemplateBuilder>`](https://fleetbase.io/docs/ui/builders/template-builder)
  — the component that consumes this service

## Source

| File | Description |
| --- | --- |
| `addon/services/template-builder.js` | Service class |

[Resource Context Panel Service

The `resource-context-panel` service opens contextual detail overlays for any Fleetbase resource — single-content or tabbed, with route-sync and a stack of nested panels.](https://fleetbase.io/docs/ui/services/resource-context-panel)
[Formatting Helpers

Helpers for formatting bytes, currency, dates, durations, distances, file names, and humanizing strings.](https://fleetbase.io/docs/ui/helpers/formatting)
